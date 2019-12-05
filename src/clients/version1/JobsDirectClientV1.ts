import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { JobV1 } from '../../../src/data/version1/JobV1';
import { NewJobV1 } from '../../../src/data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';

export class JobsDirectClientV1 extends DirectClient<any> implements IJobsClientV1 {
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('pip-services-jobs', 'controller', '*', '*', '1.0'));
    }
    
    // Add new job
    public addJob(correlationId: string, newJob: NewJobV1,
        callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.add_job');
        this._controller.addJob(correlationId, newJob, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Add new job if not exist with same type and ref_id
    public addUniqJob(correlationId: string, newJob: NewJobV1,
        callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.add_uniq_job');
        this._controller.addUniqJob(correlationId, newJob, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Get list of all jobs
    public getJobs(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<JobV1>) => void): void {
        let timing = this.instrument(correlationId, 'jobs.get_jobs');
        this._controller.getJobs(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    // Get job by Id
    public getJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.get_by_id_job');
        this._controller.getJobById(correlationId, jobId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Start job by id
    public startJobById(correlationId: string, jobId: string, timeout:number,
        callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.start_job_by_id');
        this._controller.startJobById(correlationId, jobId, timeout, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Start fist free job by type
    public startJobByType(correlationId: string, jobType: string, timeout: number,
        callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.start_job_by_type');
        this._controller.startJobByType(correlationId, jobType, timeout, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Extend job execution limit on timeout value
    public extendJob(correlationId: string, jobId: string, timeout:number,
        callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.extend_job');
        this._controller.extendJob(correlationId, jobId, timeout, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Abort job
    public abortJob(correlationId: string, jobId: string,
        callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.abort_job');
        this._controller.abortJob(correlationId, jobId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Complete job
    public completeJob(correlationId: string, jobId: string,
        callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.complete_job');
        this._controller.completeJob(correlationId, jobId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Delete job by Id
    public deleteJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void {
        let timing = this.instrument(correlationId, 'jobs.delete_job_by_id');
        this._controller.deleteJobById(correlationId, jobId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    // Remove all jobs
    public deleteJobs(correlationId: string, callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'jobs.delete_jobs');
        this._controller.deleteJobs(correlationId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

}