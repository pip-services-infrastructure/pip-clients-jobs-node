import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';
import { JobV1 } from '../../../src/data/version1/JobV1';
import { IJobsClientV1 } from './IJobsClientV1';
import { IJobsController } from '../../../src/logic/IJobsController';
import { NewJobV1 } from '../../../src/data/version1/NewJobV1';
export declare class JobsDirectClientV1 extends DirectClient<IJobsController> implements IJobsClientV1 {
    constructor();
    addJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    addUniqJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    getJobs(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<JobV1>) => void): void;
    startJob(correlationId: string, job: JobV1, callback: (err: any, job: JobV1) => void): void;
    extendJob(correlationId: string, job: JobV1, callback: (err: any, job: JobV1) => void): void;
    abortJob(correlationId: string, job: JobV1, callback: (err: any, job: JobV1) => void): void;
    compleateJob(correlationId: string, job: JobV1, callback: (err: any, job: JobV1) => void): void;
    getJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobs(correlationId: string, callback?: (err: any) => void): void;
}