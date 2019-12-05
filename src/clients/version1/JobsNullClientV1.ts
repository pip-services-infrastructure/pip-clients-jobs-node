import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { JobV1 } from '../../data/version1/JobV1';
import { NewJobV1 } from '../../data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';

export class JobsNullClientV1 implements IJobsClientV1 {
    // Add new job
    public addJob(correlationId: string, newJob: NewJobV1,
        callback: (err: any, job: JobV1) => void): void {
        let job = new JobV1(newJob);
        callback(null, job);
    }

    // Add new job if not exist with same type and ref_id
    public addUniqJob(correlationId: string, newJob: NewJobV1,
        callback: (err: any, job: JobV1) => void): void {
        let job = new JobV1(newJob);
        callback(null, job);
    }

    // Get list of all jobs
    public getJobs(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<JobV1>) => void): void {
        callback(null, null);
    }

    // Get job by Id
    public getJobById(correlationId: string, jobId: string,
        callback: (err: any, job: JobV1) => void): void {
        callback(null, null);
    }

    // Delete job by Id
    public deleteJobById(correlationId: string, jobId: string,
        callback: (err: any, job: JobV1) => void): void {
        callback(null, null);
    }

    // Start job by id
    public startJobById(correlationId: string, jobId: string, timeout: number,
        callback: (err: any, job: JobV1) => void): void {
        callback(null, null);
    }

    // Start fist free job by type
    public startJobByType(correlationId: string, jobType: string, timeout: number,
        callback: (err: any, job: JobV1) => void): void {
        callback(null, null);
    }

    // Extend job execution limit on timeout value
    public extendJob(correlationId: string, jobId: string, timeout: number,
        callback: (err: any, job: JobV1) => void): void {
        callback(null, null);
    }

    // Abort job
    public abortJob(correlationId: string, jobId: string,
        callback: (err: any, job: JobV1) => void): void {
        callback(null, null);
    }

    // Complete job
    public completeJob(correlationId: string, jobId: string,
        callback: (err: any, job: JobV1) => void): void {
        callback(null, null);
    }

    // Remove all jobs
    public deleteJobs(correlationId: string, callback?: (err: any) => void): void {
        callback(null);
    }

}