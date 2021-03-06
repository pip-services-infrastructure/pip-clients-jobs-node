import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { JobsMemoryPersistence } from 'pip-services-jobs-node';
import { JobsController } from 'pip-services-jobs-node';
import { JobsHttpServiceV1 } from 'pip-services-jobs-node';

import { JobsHttpClientV1 } from '../../../src/clients/version1/JobsHttpClientV1';
import { JobsClientV1Fixture } from './JobsClientV1Fixture';

suite('JobsHttpClientV1', () => {
    let persistence: JobsMemoryPersistence;
    let controller: JobsController;
    let service: JobsHttpServiceV1;
    let client: JobsHttpClientV1;
    let fixture: JobsClientV1Fixture;

    setup((done) => {
        persistence = new JobsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new JobsController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new JobsHttpServiceV1();
        service.configure(httpConfig);

        client = new JobsHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('pip-services-jobs', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-jobs', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-jobs', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('pip-services-jobs', 'client', 'http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new JobsClientV1Fixture(client);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                client.open(null, done);
            });
        });
    });

    teardown((done) => {
        client.close(null, (err) => {
            service.close(null, (err) => {
                persistence.close(null, done);
            });    
        });
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Control test', (done) => {
        fixture.testControl(done);
    });

});