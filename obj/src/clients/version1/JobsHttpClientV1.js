"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class JobsHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor() {
        super('v1/jobs');
    }
    fixJob(job) {
        if (job == null)
            return null;
        job.completed = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(job.completed);
        job.started = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(job.started);
        job.execute_until = pip_services3_commons_node_1.DateTimeConverter.toDateTime(job.execute_until);
        job.locked_until = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(job.locked_until);
        job.created = pip_services3_commons_node_1.DateTimeConverter.toDateTime(job.created);
        return job;
    }
    // Add new job
    addJob(correlationId, newJob, callback) {
        this.callCommand('add_job', correlationId, {
            new_job: newJob
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob, callback) {
        this.callCommand('add_uniq_job', correlationId, {
            new_job: newJob
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging, callback) {
        this.callCommand('get_jobs', correlationId, {
            filter: filter,
            paging: paging
        }, (err, page) => {
            if (page == null || page.data.length == 0) {
                callback(err, page);
                return;
            }
            page.data = _.map(page.data, (job) => this.fixJob(job));
            callback(err, page);
        });
    }
    // Get job by Id
    getJobById(correlationId, jobId, callback) {
        this.callCommand('get_job_by_id', correlationId, {
            job_id: jobId
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Start job by id
    startJobById(correlationId, jobId, timeout, callback) {
        this.callCommand('start_job_by_id', correlationId, {
            job_id: jobId,
            timeout: timeout
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Start first free job by type
    startJobByType(correlationId, jobType, timeout, callback) {
        this.callCommand('start_job_by_type', correlationId, {
            type: jobType,
            timeout: timeout
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout, callback) {
        this.callCommand('extend_job', correlationId, {
            job_id: jobId,
            timeout: timeout
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Abort job
    abortJob(correlationId, jobId, callback) {
        this.callCommand('abort_job', correlationId, {
            job_id: jobId
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Complete job
    completeJob(correlationId, jobId, callback) {
        this.callCommand('complete_job', correlationId, {
            job_id: jobId
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId, callback) {
        this.callCommand('delete_job_by_id', correlationId, {
            job_id: jobId
        }, (err, job) => {
            callback(err, this.fixJob(job));
        });
    }
    // Remove all jobs
    deleteJobs(correlationId, callback) {
        this.callCommand('delete_jobs', correlationId, null, callback);
    }
}
exports.JobsHttpClientV1 = JobsHttpClientV1;
//# sourceMappingURL=JobsHttpClientV1.js.map