import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    tags: {
        name: 'meu-test'
    },
    thresholds: {
        'http_req_duration{tipo:busca-todos}': ['p(95) < 500']
    }
}

export default function() {

    group('req_all_crocodiles', function() {
        const response1 = http.get('https://test-api.k6.io/public/crocodiles/', {
            tags: {
                tipo: "busca-todos"
            }
        });
        check(response1, {
            'status code 200 get all': (r) => r.status === 200
        });
    });
}
