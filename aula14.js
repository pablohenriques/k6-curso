import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {

    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    },

    ext: {
        loadimpact: {
            projectID: '',
            name: 'PCO CURSO k6'
        }
    }

}

export default function() {
    const BASE_URL = `https://test-api.k6.io/public/crocodiles`

    const response = http.get(BASE_URL);
    check(response, {
        'status code 200 get all': (r) => r.status === 200
    });
    sleep(1);
    
}
