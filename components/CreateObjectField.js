// components/CreateObjectField.js
import RuntimeDatabase from './runtimeDatabase.js';
import { createToggleButton } from './ToggleButton.js';
import { generateFormFields } from './formGenerator.js';
import { logMessage } from './LogLevelComponent.js';

export function createObjectFields(parentElement, parentKey, value) {
    RuntimeDatabase.create(parentKey);
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('object-field-container');

    const toggleButton = createToggleButton('Expandir Objeto', parentKey, function handleToggle() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} objeto ${parentKey.split('__FIELD__').pop()}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });

    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';
    nestedContainer.addEventListener('click', (event) => {
        if (event.target.textContent === 'Deletar') {
            logMessage(`Campo removido de ${parentKey.split('__FIELD__').pop()}`);
        }
    });

    fieldContainer.appendChild(toggleButton);
    generateFormFields(value, nestedContainer, parentKey);
    logMessage(`Campos adicionados ao objeto ${parentKey.split('__FIELD__').pop()}`);
    fieldContainer.appendChild(nestedContainer);

    parentElement.appendChild(fieldContainer);
}