let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { JobV1 } from '../../../src/data/version1/JobV1';
import { NewJobV1 } from '../../data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';

export class JobsHttpClientV1 extends CommandableHttpClient implements IJobsClientV1 {

    public constructor() {
        super('v1/jobs');
    }

    private fixJob(job: JobV1): JobV1 {
        if (job == null) return null;

        job.completed = DateTimeConverter.toNullableDateTime(job.completed);
        job.started = DateTimeConverter.toNullableDateTime(job.started);
        job.execute_until = DateTimeConverter.toDateTime(job.execute_until);
        job.locked_until = DateTimeConverter.toNullableDateTime(job.locked_until);
        job.created = DateTimeConverter.toDateTime(job.created);

        return job;
    }

    // Add new job
    public addJob(correlationId: string, newJob: NewJobV1,
        callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'add_job',
            correlationId,
            {
                new_job: newJob
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }
        );
    }

    // Add new job if not exist with same type and ref_id
    public addUniqJob(correlationId: string, newJob: NewJobV1,
        callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'add_uniq_job',
            correlationId,
            {
                new_job: newJob
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }

        );
    }

    // Get list of all jobs
    public getJobs(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<JobV1>) => void): void {
        this.callCommand(
            'get_jobs',
            correlationId,
            { 
                filter: filter, 
                paging: paging 
            },
            (err, page) => {
                if (page == null || page.data.length == 0) {
                    callback(err, page);
                    return;
                }

                page.data = _.map(page.data, (job) => this.fixJob(job));
                callback(err, page);
            }
        );
    }

    // Get job by Id
    public getJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'get_job_by_id',
            correlationId,
            {
                job_id: jobId
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }
        );
    }

    // Start job by id
    public startJobById(correlationId: string, jobId: string, timeout: number,
        callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'start_job_by_id',
            correlationId,
            {
                job_id: jobId,
                timeout: timeout
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }
        );
    }

    // Start fist free job by type
    public startJobByType(correlationId: string, jobType: string, timeout: number,
        callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'start_job_by_type',
            correlationId,
            {
                type: jobType,
                timeout: timeout
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }
        );
    }

    // Extend job execution limit on timeout value
    public extendJob(correlationId: string, jobId: string, timeout: number,
        callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'extend_job',
            correlationId,
            {
                job_id: jobId,
                timeout: timeout
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }
        );
    }
    // Abort job
    public abortJob(correlationId: string, jobId: string,
        callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'abort_job',
            correlationId,
            {
                job_id: jobId
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }
        );
    }

    // Complete job
    public completeJob(correlationId: string, jobId: string,
        callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'complete_job',
            correlationId,
            {
                job_id: jobId
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }
        );
    }

    // Delete job by Id
    public deleteJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void {
        this.callCommand(
            'delete_job_by_id',
            correlationId,
            {
                job_id: jobId
            },
            (err, job) => {
                callback(err, this.fixJob(job));
            }
        );
    }

    // Remove all jobs
    public deleteJobs(correlationId: string, callback?: (err: any) => void): void {
        this.callCommand(
            'delete_jobs',
            correlationId,
            null,
            callback
        );
    }

}