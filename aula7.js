import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        'http_req_duration{group:::req_one_crocodile}': ['p(95) < 500']
    }
}

export default function() {

    group('req_all_crocodiles', function() {
        const response1 = http.get('https://test-api.k6.io/public/crocodiles/');
        check(response1, {
            'status code 200 get all': (r) => r.status === 200
        });
    });

    group('req_one_crocodile', function() {
        const response2 = http.get('https://test-api.k6.io/public/crocodiles/1/');
        check(response2, {
            'status code 200 get id': (r) => r.status === 200
        });
    });
}
