const LOG_ACTIVE = true;

export function logMessage(message) {
    if (LOG_ACTIVE) {
        const logDiv = document.getElementById('LOG_LEVEL');
        if (logDiv) {
            const stack = new Error().stack;
            const callerInfo = getCallerInfo(stack);
            logDiv.innerHTML += `<p>${message} - ${callerInfo}</p>`;
        }
    }
}

function getCallerInfo(stack) {
    const stackLines = stack.split('\n');
    // A linha 0 é "Error", a linha 1 é a função atual, a linha 2 é a função chamadora
    const callerLine = stackLines[2];
    const callerInfo = callerLine.match(/at (.+) \((.+):(\d+):(\d+)\)/);
    if (callerInfo) {
        const functionName = callerInfo[1];
        const fileName = callerInfo[2].split('/').pop(); // Pega apenas o nome do arquivo
        return `${functionName} in ${fileName}`;
    }
    return 'Unknown caller';
}