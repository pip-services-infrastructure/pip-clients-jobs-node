"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JobV1_1 = require("../../data/version1/JobV1");
class JobsNullClientV1 {
    // Add new job
    addJob(correlationId, newJob, callback) {
        let job = new JobV1_1.JobV1(newJob);
        callback(null, job);
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob, callback) {
        let job = new JobV1_1.JobV1(newJob);
        callback(null, job);
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging, callback) {
        callback(null, null);
    }
    // Get job by Id
    getJobById(correlationId, jobId, callback) {
        callback(null, null);
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId, callback) {
        callback(null, null);
    }
    // Start job by id
    startJobById(correlationId, jobId, timeout, callback) {
        callback(null, null);
    }
    // Start fist free job by type
    startJobByType(correlationId, jobType, timeout, callback) {
        callback(null, null);
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout, callback) {
        callback(null, null);
    }
    // Abort job
    abortJob(correlationId, jobId, callback) {
        callback(null, null);
    }
    // Complete job
    completeJob(correlationId, jobId, callback) {
        callback(null, null);
    }
    // Remove all jobs
    deleteJobs(correlationId, callback) {
        callback(null);
    }
}
exports.JobsNullClientV1 = JobsNullClientV1;
//# sourceMappingURL=JobsNullClientV1.js.map