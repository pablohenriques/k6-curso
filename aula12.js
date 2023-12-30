import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 100,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.4'],
        http_req_duration: ['p(95) < 250']
    }
}

const baseurl = 'https://test-api.k6.io/'

export function setup() {
    const reqtoken = http.post(`${baseurl}/auth/token/login/`, {
        username: '0.623928106852582@gmail.com',
        password: 'user'
    })
    const token = reqtoken.json('access');
    return token
}

export default function(token) {

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }    
    const response = http.get(`${baseurl}/my/crocodiles`, params);

    check(response, {
        'status code 200': (r) => r.status === 200
    });
}
