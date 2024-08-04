// main.js
import { initializeForm } from './components/FormInitializer.js';
document.addEventListener('DOMContentLoaded', () => {
    initializeForm('jsonInput', 'jsonForm', 'generateForm', 'updateJson');
});