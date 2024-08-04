// components/formGenerator.js
import { logMessage } from './LogLevelComponent.js';
import { createLabel } from './Label.js';
import { createInputField } from './InputField.js';
logMessage('input fields importado.');
import { createObjectFields } from './CreateObjectField.js';
import { createListFields } from './CreateListField.js';
import { createEmptyListField } from './CreateEmptyListField.js';
import { createButton } from './Button.js';
import { createFieldCreationSection } from './FieldCreationSection.js';

export function generateFormFields(jsonObject, parentElement, parentKey = '') {
    logMessage('generando campos del formulario.');
    for (const key in jsonObject) {
        logMessage(`generando campo ${key} del formulario.`);
        if (jsonObject.hasOwnProperty(key)) {
            logMessage('o campo tem uma propriedade.');
            const value = jsonObject[key];
            logMessage(`o valor do campo é ${value}`);
            const fieldContainer = document.createElement('div');
            const label = createLabel(`${parentKey}__FIELD__${key}`, key);
            fieldContainer.appendChild(label);

            let input;
            logMessage('Criando campo input');
            if (typeof value === 'boolean') {
                logMessage('Criando campo boolean');
                input = createInputField(`${parentKey}__FIELD__${key}`, value, 'boolean');
            } else if (typeof value === 'number') {
                logMessage('Criando campo number');
                input = createInputField(`${parentKey}__FIELD__${key}`, value, 'number');
            } else if (typeof value === 'string') {
                logMessage('Criando campo string');
                input = createInputField(`${parentKey}__FIELD__${key}`, value, 'string');
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                logMessage('Criando campo object');
                createObjectFields(fieldContainer, `${parentKey}__FIELD__${key}`, value);
            } else if (Array.isArray(value)) {
                logMessage('Criando campo array');
                if (value.length > 0) {
                    logMessage('Criando campo array com elementos');
                    createListFields(fieldContainer, `${parentKey}__FIELD__${key}`, value);
                } else {
                    logMessage('Criando campo array vazio');
                    createEmptyListField(fieldContainer, `${parentKey}__FIELD__${key}`);
                }
            }

            if (input) {
                logMessage('Adicionando campo input ao container');
                fieldContainer.appendChild(input);
            }

            parentElement.appendChild(fieldContainer);
        }
    }
    createAddFieldButton(parentElement, parentKey);
}

function createAddFieldButton(parentElement, parentKey) {
    logMessage('Criando botão de adicionar campo');
    const addButton = createButton(`Adicionar novo campo em ${parentKey || 'root'}`, () => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey);Element
    });
    parentElement.appendChild(addButton);
}