"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const JobsNullClientV1_1 = require("../clients/version1/JobsNullClientV1");
const JobsDirectClientV1_1 = require("../clients/version1/JobsDirectClientV1");
const JobsHttpClientV1_1 = require("../clients/version1/JobsHttpClientV1");
class JobsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-jobs", "factory", "client", "default", "1.0");
        this.ClientNullDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-jobs", "client", "null", "*", "1.0");
        this.ClientDirectDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-jobs", "client", "direct", "*", "1.0");
        this.ClientHttpDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-jobs", "client", "http", "*", "1.0");
        this.registerAsType(this.ClientNullDescriptor, JobsNullClientV1_1.JobsNullClientV1);
        this.registerAsType(this.ClientDirectDescriptor, JobsDirectClientV1_1.JobsDirectClientV1);
        this.registerAsType(this.ClientHttpDescriptor, JobsHttpClientV1_1.JobsHttpClientV1);
    }
}
exports.JobsClientFactory = JobsClientFactory;
//# sourceMappingURL=JobsClientFactory.js.map