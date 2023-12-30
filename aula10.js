import http from 'k6/http';
import { check, sleep } from 'k6';

// carga com 10vus por 10s
// requisicoes com 95% de sucesso
// requisicoes com menos 1% de falha
// duracao de uma requisicao menor que 500ms (p(95) < 500)

export const options = {
    stages: [{ duration: '10s', target: 10 }],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
}

export default function() {
    const BASE_URL = `https://test-api.k6.io/`;

    const user = `${Math.random()}@gmail.com`;
    const pass = 'user';

    console.log(user+pass);

    const response = http.post(`${BASE_URL}/user/register`, {
        "username": user,
        "first_name": "crocodile",
        "last_name": "dino",
        "email": user,
        "password": pass
    });

    check(response, {'sucesso registro usuario': (r) => r.status === 201});

    sleep(1);
}
