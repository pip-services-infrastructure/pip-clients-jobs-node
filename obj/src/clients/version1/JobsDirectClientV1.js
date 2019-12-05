"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class JobsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-jobs', 'controller', '*', '*', '1.0'));
    }
    // Add new job
    addJob(correlationId, newJob, callback) {
        let timing = this.instrument(correlationId, 'jobs.add_job');
        this._controller.addJob(correlationId, newJob, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob, callback) {
        let timing = this.instrument(correlationId, 'jobs.add_uniq_job');
        this._controller.addUniqJob(correlationId, newJob, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'jobs.get_jobs');
        this._controller.getJobs(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    // Get job by Id
    getJobById(correlationId, jobId, callback) {
        let timing = this.instrument(correlationId, 'jobs.get_by_id_job');
        this._controller.getJobById(correlationId, jobId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Start job by id
    startJobById(correlationId, jobId, timeout, callback) {
        let timing = this.instrument(correlationId, 'jobs.start_job_by_id');
        this._controller.startJobById(correlationId, jobId, timeout, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Start fist free job by type
    startJobByType(correlationId, jobType, timeout, callback) {
        let timing = this.instrument(correlationId, 'jobs.start_job_by_type');
        this._controller.startJobByType(correlationId, jobType, timeout, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout, callback) {
        let timing = this.instrument(correlationId, 'jobs.extend_job');
        this._controller.extendJob(correlationId, jobId, timeout, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Abort job
    abortJob(correlationId, jobId, callback) {
        let timing = this.instrument(correlationId, 'jobs.abort_job');
        this._controller.abortJob(correlationId, jobId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Complete job
    completeJob(correlationId, jobId, callback) {
        let timing = this.instrument(correlationId, 'jobs.complete_job');
        this._controller.completeJob(correlationId, jobId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId, callback) {
        let timing = this.instrument(correlationId, 'jobs.delete_job_by_id');
        this._controller.deleteJobById(correlationId, jobId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    // Remove all jobs
    deleteJobs(correlationId, callback) {
        let timing = this.instrument(correlationId, 'jobs.delete_jobs');
        this._controller.deleteJobs(correlationId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
}
exports.JobsDirectClientV1 = JobsDirectClientV1;
//# sourceMappingURL=JobsDirectClientV1.js.map