// 1. Incicializacao
import sleep from 'k6';

// 2. Configuracao
export const options = {
    vus: 1,
    duration: '10s'
}

// 3. Execucao ou codigo VU
export default function() {
    console.log('testando o k6');
    sleep(1);
}

// 4. Desmontagem
export function teardown(data) {
    console.log(data)
}