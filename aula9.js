import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data'

export const options = {

    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200'],
    }

}

const data = new SharedArray('leitura_json', function() {
    return JSON.parse(open('/dados.json')).crocodilos
});

export default function() {
    const crocodilo = data[Math.floor(Math.random() *data.length)].id
    console.log(crocodilo)
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`

    const response1 = http.get(BASE_URL);
    check(response1, {
        'status code 200 get all': (r) => r.status === 200
    });
    
}
