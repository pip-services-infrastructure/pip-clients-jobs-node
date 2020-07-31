"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const JobV1_1 = require("../../data/version1/JobV1");
class JobsMemoryClientV1 {
    constructor(...items) {
        this._maxPageSize = 100;
        this._maxRetries = 10;
        this._items = items;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_2.FilterParams();
        let id = filter.getAsNullableString('id');
        let type = filter.getAsNullableString('type');
        let ref_id = filter.getAsNullableString('ref_id');
        let created = filter.getAsNullableDateTime('created');
        let created_from = filter.getAsNullableDateTime('created_from');
        let created_to = filter.getAsNullableDateTime('created_to');
        let started = filter.getAsNullableDateTime('started');
        let started_from = filter.getAsNullableDateTime('started_from');
        let started_to = filter.getAsNullableDateTime('started_to');
        let locked_until = filter.getAsNullableDateTime('locked_until');
        let locked_from = filter.getAsNullableDateTime('locked_from');
        let locked_to = filter.getAsNullableDateTime('locked_to');
        let execute_until = filter.getAsNullableDateTime('execute_until');
        let execute_from = filter.getAsNullableDateTime('execute_from');
        let execute_to = filter.getAsNullableDateTime('execute_to');
        let completed = filter.getAsNullableDateTime('completed');
        let completed_from = filter.getAsNullableDateTime('completed_from');
        let completed_to = filter.getAsNullableDateTime('completed_to');
        let retries = filter.getAsNullableInteger('retries');
        let min_retries = filter.getAsNullableInteger('min_retries');
        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (type != null && item.type != type)
                return false;
            if (ref_id != null && item.ref_id != ref_id)
                return false;
            if (created != null && item.created.getTime() != created.getTime())
                return false;
            if (created_from != null && item.created.getTime() < created_from.getTime())
                return false;
            if (created_to != null && item.created.getTime() > created_to.getTime())
                return false;
            if (started != null && (item.started == null || item.started.getTime() != started.getTime()))
                return false;
            if (started_from != null && (item.started == null || item.started.getTime() < started_from.getTime()))
                return false;
            if (started_to != null && (item.started == null || item.started.getTime() > started_to.getTime()))
                return false;
            if (locked_until != null && (item.locked_until == null || item.locked_until.getTime() != locked_until.getTime()))
                return false;
            if (locked_from != null && (item.locked_until == null || item.locked_until.getTime() < locked_from.getTime()))
                return false;
            if (locked_to != null && (item.locked_until == null || item.locked_until.getTime() > locked_to.getTime()))
                return false;
            if (execute_until != null && (item.execute_until == null || item.execute_until.getTime() != execute_until.getTime()))
                return false;
            if (execute_from != null && (item.execute_until == null || item.execute_until.getTime() < execute_from.getTime()))
                return false;
            if (execute_to != null && (item.execute_until == null || item.execute_until.getTime() > execute_to.getTime()))
                return false;
            if (completed != null && (item.completed == null || item.completed.getTime() != completed.getTime()))
                return false;
            if (completed_from != null && (item.completed == null || item.completed.getTime() < completed_from.getTime()))
                return false;
            if (completed_to != null && (item.completed == null || item.completed.getTime() > completed_to.getTime()))
                return false;
            if (retries != null && item.retries != retries)
                return false;
            if (min_retries != null && item.retries <= min_retries)
                return false;
            return true;
        };
    }
    // Add new job
    addJob(correlationId, newJob, callback) {
        let job = new JobV1_1.JobV1(newJob);
        this.create(correlationId, job, callback);
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob, callback) {
        let filter = pip_services3_commons_node_2.FilterParams.fromTuples('type', newJob.type, 'ref_id', newJob.ref_id);
        let paging = new pip_services3_commons_node_3.PagingParams();
        this.getPageByFilter(correlationId, filter, paging, (err, page) => {
            if (page.data.length > 0) {
                callback(err, page.data[0]);
            }
            else {
                let job = new JobV1_1.JobV1(newJob);
                this.create(correlationId, job, callback);
            }
        });
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging, callback) {
        this.getPageByFilter(correlationId, filter, paging, callback);
    }
    // Get job by Id
    getJobById(correlationId, jobId, callback) {
        this.getOneById(correlationId, jobId, callback);
    }
    // Start job
    startJobById(correlationId, jobId, timeout, callback) {
        let item = _.find(this._items, item => item.id == jobId);
        if (item == null) {
            if (callback)
                callback(null, null);
            return;
        }
        let now = new Date();
        if (item.completed == null && (item.locked_until == null || item.locked_until.getTime() <= now.getTime())) {
            item.started = now;
            item.locked_until = new Date(now.getTime() + timeout);
            item.retries++;
            if (callback)
                callback(null, item);
        }
        else {
            if (callback)
                callback(null, null);
        }
    }
    // Start job by type
    startJobByType(correlationId, jobType, timeout, callback) {
        let now = new Date();
        let item = _.find(this._items, (item) => {
            return item.type == jobType && item.completed == null && item.retries < this._maxRetries
                && (item.locked_until == null || item.locked_until.getTime() <= now.getTime());
        });
        if (item == null) {
            if (callback)
                callback(null, null);
            return;
        }
        item.started = now;
        item.locked_until = new Date(now.getTime() + timeout);
        item.retries++;
        if (callback)
            callback(null, item);
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout, callback) {
        let now = new Date();
        let update = pip_services3_commons_node_5.AnyValueMap.fromTuples('locked_until', new Date(now.getTime() + timeout));
        this.updatePartially(correlationId, jobId, update, callback);
    }
    // Abort job
    abortJob(correlationId, jobId, callback) {
        let update = pip_services3_commons_node_5.AnyValueMap.fromTuples('started', null, 'locked_until', null);
        this.updatePartially(correlationId, jobId, update, callback);
    }
    // Complete job
    completeJob(correlationId, jobId, callback) {
        let update = pip_services3_commons_node_5.AnyValueMap.fromTuples('started', null, 'locked_until', null, 'completed', new Date());
        this.updatePartially(correlationId, jobId, update, callback);
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId, callback) {
        this.deleteById(correlationId, jobId, callback);
    }
    // Remove all jobs
    deleteJobs(correlationId, callback) {
        this.deleteByFilter(correlationId, new pip_services3_commons_node_2.FilterParams, callback);
    }
    // Clean completed and expiration jobs
    cleanJobs(correlationId, callback) {
        let now = new Date();
        //this._logger.trace(correlationId, "Starting jobs cleaning...");
        async.series([
            (callback) => {
                this.deleteByFilter(correlationId, pip_services3_commons_node_2.FilterParams.fromTuples('min_retries', this._maxRetries), callback);
            },
            (callback) => {
                this.deleteByFilter(correlationId, pip_services3_commons_node_2.FilterParams.fromTuples('execute_to', now), callback);
            },
            (callback) => {
                this.deleteByFilter(correlationId, pip_services3_commons_node_2.FilterParams.fromTuples('completed_to', now), callback);
            },
        ], (err) => {
            callback(err);
        });
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        let filterJobs = this.composeFilter(filter);
        let jobs = _.filter(this._items, filterJobs);
        // Extract a page
        paging = paging != null ? paging : new pip_services3_commons_node_3.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;
        if (paging.total)
            total = jobs.length;
        if (skip > 0)
            jobs = _.slice(jobs, skip);
        jobs = _.take(jobs, take);
        let page = new pip_services3_commons_node_4.DataPage(jobs, total);
        callback(null, page);
    }
    create(correlationId, job, callback) {
        if (job == null) {
            if (callback)
                callback(null, null);
            return;
        }
        job = _.clone(job);
        job.id = job.id || pip_services3_commons_node_1.IdGenerator.nextLong();
        this._items.push(job);
        if (callback)
            callback(null, job);
    }
    getOneById(correlationId, jobId, callback) {
        let jobs = this._items.filter((x) => { return x.id == jobId; });
        let job = jobs.length > 0 ? jobs[0] : null;
        callback(null, job);
    }
    deleteById(correlationId, jobId, callback) {
        var index = this._items.map((x) => { return x.id; }).indexOf(jobId);
        var item = this._items[index];
        if (index < 0) {
            callback(null, null);
            return;
        }
        this._items.splice(index, 1);
        if (callback)
            callback(null, item);
    }
    //correlationId, new FilterParams, callback
    deleteByFilter(correlationId, filter, callback) {
        for (let index = this._items.length - 1; index >= 0; index--) {
            let job = this._items[index];
            if (this.composeFilter(filter)(job)) {
                this._items.splice(index, 1);
                break;
            }
        }
        callback(null);
    }
    updatePartially(correlationId, jobId, data, callback) {
        let index = this._items.map((x) => { return x.id; }).indexOf(jobId);
        if (index < 0) {
            callback(null, null);
            return;
        }
        let item = this._items[index];
        item = _.extend(item, data.getAsObject());
        this._items[index] = item;
        if (callback)
            callback(null, item);
    }
}
exports.JobsMemoryClientV1 = JobsMemoryClientV1;
//# sourceMappingURL=JobsMemoryClientV1.js.map