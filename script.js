const automatoDiv = document.getElementById('automato');
const rule = [0, 0, 0, 1, 1, 1, 1, 0]; // Regra do padrão 30

function generateAutomato() {
    const width = automatoDiv.clientWidth / 10;
    let currentState = Array.from({ length: width }, (_, i) => i === Math.floor(width / 2) ? 1 : 0);
    let rowIndex = 0;

    function generateRow() {
        if (rowIndex >= 50) return; // Stop generating after 50 rows

        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        for (let j = 0; j < currentState.length; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.style.backgroundColor = currentState[j] ? '#000' : '#fff';
            rowDiv.appendChild(cellDiv);
        }

        automatoDiv.appendChild(rowDiv);
        currentState = getNextState(currentState);
        rowIndex++;

        setTimeout(generateRow, 500); // 500 milliseconds delay
    }

    generateRow();
}

function getNextState(currentState) {
    const nextState = [];

    for (let i = 0; i < currentState.length; i++) {
        const left = i === 0 ? currentState[currentState.length - 1] : currentState[i - 1];
        const center = currentState[i];
        const right = i === currentState.length - 1 ? currentState[0] : currentState[i + 1];

        const index = (left << 2) | (center << 1) | right;
        nextState.push(rule[index]);
    }

    return nextState;
}

generateAutomato();
