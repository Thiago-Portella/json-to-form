// main.js
import { initializeForm } from './components/FormInitializer.js';
import { logMessage } from './components/LogLevelComponent.js';
document.addEventListener('DOMContentLoaded', () => {
    logMessage('chamando função que inicializa o formulário, passando os ids dos campos html.');
    initializeForm('jsonInput', 'jsonForm', 'generateForm', 'updateJson');
});