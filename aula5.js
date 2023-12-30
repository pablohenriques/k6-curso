import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate < 0.01'], // reqs com erro abaixo de 1%
        // http_req_duration: ['p(95) < 200', 'p(90) < 400', 'p(99.9) < 2000'], // 95% das reqs abaixo de 200ms
        // http_req_duration: [{threshold: 'p(95) < 20', abortOnFail: true, delayAbortEval: '1s'}],
        http_req_duration: [{threshold: 'p(95) < 200', abortOnFail: true}],
        checks: ['rate > 0.9']
    }
}

export default function() {
    const response = http.get('https://test.k6.io/');

    check(response, {
        'status code 200': (r) => r.status === 200
    });
}

