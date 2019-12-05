import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { JobV1 } from '../../data/version1/JobV1';
import { NewJobV1 } from '../../data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';
export declare class JobsNullClientV1 implements IJobsClientV1 {
    addJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    addUniqJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    getJobs(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<JobV1>) => void): void;
    getJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    startJobById(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    startJobByType(correlationId: string, jobType: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    extendJob(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    abortJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    completeJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobs(correlationId: string, callback?: (err: any) => void): void;
}
