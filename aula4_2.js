import http from 'k6/http';
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '3s'
}

const contador = new Counter('quantidade_chamadas');
const medidor = new Gauge('tempo_bloqueado')
const avaliador = new Rate('requisicoes_sucesso')
const tendencia = new Trend('medias_chamadas');


export default function() {
    const response = http.get('https://test-api.k6.io/');
    contador.add(1); // contador de chamadas
    medidor.add(response.timings.blocked); // medidor tempo resposta
    avaliador.add(response.status === 200) // taxa sucesso requisicao
    tendencia.add(response.timings.waiting) // tendencia
}
