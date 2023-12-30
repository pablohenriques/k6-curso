// default
import http from 'k6/http';
import { check } from 'k6';

// remoto
// import { AWSConfig, SecretsManagerClient } from 'https://jslib.k6.io/aws/0.11.0/aws.js';

// local
// import runTest from './myTest.js'

export const options = {
    vus: 1,
    duration: '3s'
}


export default function() {
    const response1 = http.get('https://test.k6.io/');

    check(response, {
        'status code 200': (r) => r.status === 200
    });
}