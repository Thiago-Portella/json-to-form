// components/FormInitializer.js
import { generateFormFields } from './formGenerator.js';
import { updateJsonFromForm } from './jsonUpdater.js';
import { logMessage } from './LogLevelComponent.js';

export function initializeForm(jsonInputId, formId, generateButtonId, updateButtonId) {
    const jsonInput = document.getElementById(jsonInputId);
    const form = document.getElementById(formId);
    const generateButton = document.getElementById(generateButtonId);
    const updateButton = document.getElementById(updateButtonId);
    logMessage('Obtidos  os botões do formulário');
    generateButton.addEventListener('click', () => {
        logMessage(`Botão para gerar formulário clicado, passando conteúdo json e id do formulário.`);
        handleGenerateForm(jsonInput, form);
        logMessage('conteúdo foi enviado.');
    });

    updateButton.addEventListener('click', () => {
        logMessage('Atualizando formulário, passando conteúdo do json antigo e id do formulário.');
        handleUpdateJson(jsonInput, form);
        logMessage('Conteúdo atualizado.');
    });
}

function handleGenerateForm(jsonInput, form) {
    try {
        logMessage('tentando obter conteúdo do json para gerar formulário.');
        const jsonObject = JSON.parse(jsonInput.value);
        logMessage('Conteúdo obtido com sucesso.');
        form.innerHTML = '';
        logMessage('Conteúdo do formulário apagado.');
        logMessage('Gerando novos campos no formulário. Enviando objeto json e formulário html.');
        generateFormFields(jsonObject, form);
    } catch (e) {
        alert('JSON inválido');
        logMessage('Erro ao tentar obter conteúdo do json: ' + e);
    }
}

function handleUpdateJson(jsonInput, form) {
    logMessage('Tentando atualizar o json. Enviando formulário.');
    const updatedJson = updateJsonFromForm(form);
    logMessage('Json atualizado obtido. Atualizando conteúdo do campo que contém o json');
    jsonInput.value = JSON.stringify(updatedJson, null, 2);
    logMessage('Conteúdo atualizado. Gerando novo formulário a partir do json atualizado.');
    handleGenerateForm(jsonInput, form);
    logMessage('Novo formulário gerado.');
}