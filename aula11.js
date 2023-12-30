import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 50 },
        { duration: '2s', target: 50 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01'],
    }
}

const csvData = new SharedArray('ler_dados', function() {
    return papaparse.parse(open('./usuarios.csv'), {header: true}).data;
});

export default function() {
    const BASE_URL = `https://test-api.k6.io/`;

    const user = csvData[Math.floor(Math.random() * csvData.length)].email;
    const pass = 'user';

    console.log(user);

    const response = http.post(`${BASE_URL}/auth/token/login`, {
        "username": user,
        "password": pass
    });

    check(response, {
        'sucesso login usuario': (r) => r.status === 201,
        'token gerado': (r) => r.json('access') !== ''
    });

    sleep(1);
}
