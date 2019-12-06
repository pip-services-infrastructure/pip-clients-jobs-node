# Client API (version 1) <br/> Jobs Microservices Client SDK for Node.js

Node.js client API for Jobs microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [IJobsClientV1 interface](#interface)
    - [addJob()](#operation1)
    - [addUniqJob()](#operation2)
    - [getJobs()](#operation3)
    - [getJobById()](#operation4)
    - [startJobById()](#operation5)
    - [startJobByType()](#operation6)
    - [extendJob()](#operation7)
    - [abortJob()](#operation8)
    - [completeJob()](#operation9)
    - [deleteJobById()](#operation10)
    - [deleteJobs()](#operation11)
* [JobsHttpClientV1 class](#client_http)
* [JobsDirectClientV1 class](#client_direct)
* [JobsNullClientV1 class](#client_null)

## <a name="interface"></a> IJobsClientV1 interface

If you are using Typescript, you can use IJobsClientV1 as a common interface across all client implementations. 
If you are using plain typescript, you shall not worry about IJobsClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```typescript
interface IJobsClientV1 {
    addJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    addUniqJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    getJobs(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<JobV1>) => void): void;
    getJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    startJobById(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    startJobByType(correlationId: string, jobType: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    extendJob(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    abortJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    completeJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobs(correlationId: string, callback?: (err: any) => void): void;
}
```

### <a name="operation1"></a> addJob(correlationId, newJob, callback)

Add new job.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- newJob: NewJobV1 - Initial params for create new job

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved created job

### <a name="operation2"></a> addUniqJob(correlationId, newJob, callback)

Add new job if not exist with same type and ref_id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- newJob: NewJobV1 - Initial params for create new job

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved created or exist job

### <a name="operation3"></a> getJobs(correlationId, filter, paging, callback)

Get jobs by filter

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: Object
  - id: string - (optional) unique job id
  - type: string - (optional) job type
  - ref_id: string - (optional) job reference object id

  - created: Date - (optional) created object timestamp 
  - created_from: Date - (optional) create object timestamp from interval
  - created_to: Date - (optional) create object timestamp to interval

  - started: Date - (optional) started object timestamp 
  - started_from: Date - (optional) started object timestamp from interval
  - started_to: Date - (optional) started object timestamp to interval

  - locked_until:Date - (optional) locked until object timestamp 
  - locked_from: Date - (optional) locked until object timestamp from interval
  - locked_to: Date - (optional) locked until object timestamp to interval

  - execute_until: Date - (optional) execute until object timestamp
  - execute_from: Date - (optional) execute until object timestamp from interval
  - execute_to: Date - (optional) execute until object timestamp to interval

  - completed: Date - (optional) completed object timestamp
  - completed_from: Date - (optional) completed object timestamp from interval
  - completed_to: Date - (optional) completed object timestamp to interval

  - retries: number - number of retries count
  - min_retries: number - minimum retries count (return all jobs where retries <= min_retires )
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<JobV1> - page with retrieved Jobs value sets

### <a name="operation4"></a> getJobById(correlationId, jobId, callback)

Get job by id

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- jobId: string - job id

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved exist job

### <a name="operation5"></a> startJobById(correlationId, jobId, timeout, callback)

Updates or create if not exist Jobs

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- jobId: string - job id for start
- timeout: number - maximum time for execute job

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved started job

### <a name="operation6"></a> startJobByType(correlationId, jobType, timeout, callback)

 Start fist free job by type

**Arguments:**
- correlationId: string - (optional) unique id that identifies distributed transaction
- jobType: string - job type for start
- timeout: number - maximum time for execute job

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved started job

### <a name="operation7"></a> extendJob(correlationId, jobId, timeout, callback)

Extend job execution limit on timeout value

**Arguments:**
- correlationId: string - (optional) unique id that identifies distributed transaction
- jobId: string - job id for extend
- timeout: number - extend time for execute job

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved extended job

### <a name="operation8"></a> abortJob(correlationId, jobId, callback)

Abort job

**Arguments:**
- correlationId: string - (optional) unique id that identifies distributed transaction
- jobId: string - job id for abort

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved aborted job

### <a name="operation9"></a> completeJob(correlationId, jobId, callback: (err: any, job: JobV1)

Complete job

**Arguments:**
- correlationId: string - (optional) unique id that identifies distributed transaction
- jobId: string - job id for complete

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved completed job

### <a name="operation10"></a> deleteJobById(correlationId, jobId, callback)

Delete job

**Arguments:**
- correlationId: string - (optional) unique id that identifies distributed transaction
- jobId: string - job id for delete

**Returns:**
- err: Error - occured error or null for success
- result: JobV1 - retrieved deleted job

### <a name="operation10"></a> deleteJobs(correlationId, callback)

Delete all jobs

**Arguments:**
- correlationId: string - (optional) unique id that identifies distributed transaction

**Returns:**
- err: Error - occured error or null for success

## <a name="client_http"></a> JobsHttpClientV1 class

JobsHttpClientV1 is a client that implements HTTP protocol

```typescript
class JobsHttpClientV1 extends CommandableHttpClient implements IJobsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    addJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    addUniqJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    getJobs(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<JobV1>) => void): void;
    getJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    startJobById(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    startJobByType(correlationId: string, jobType: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    extendJob(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    abortJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    completeJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobs(correlationId: string, callback?: (err: any) => void): void;
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_direct"></a> JobsDirectClientV1 class

JobsDirectClientV1 is a dummy client calls controller from the same container. 
It can be used in monolytic deployments.

```typescript
class JobsDirectClientV1 extends DirectClient<any> implements IJobsClientV1 {
    constructor();
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    addJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    addUniqJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    getJobs(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<JobV1>) => void): void;
    getJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    startJobById(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    startJobByType(correlationId: string, jobType: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    extendJob(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    abortJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    completeJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobs(correlationId: string, callback?: (err: any) => void): void;
}
```

## <a name="client_null"></a> JobsNullClientV1 class

JobsNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```typescript
class JobsNullClientV1 implements IJobsClientV1 {
    constructor();
    addJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    addUniqJob(correlationId: string, newJob: NewJobV1, callback: (err: any, job: JobV1) => void): void;
    getJobs(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<JobV1>) => void): void;
    getJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    startJobById(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    startJobByType(correlationId: string, jobType: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    extendJob(correlationId: string, jobId: string, timeout: number, callback: (err: any, job: JobV1) => void): void;
    abortJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    completeJob(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobById(correlationId: string, jobId: string, callback: (err: any, job: JobV1) => void): void;
    deleteJobs(correlationId: string, callback?: (err: any) => void): void; 
}
```