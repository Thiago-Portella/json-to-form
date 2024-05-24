// components/CreateObjectField.js
import { createToggleButton } from './ToggleButton.js';
import { generateFormFields } from './formGenerator.js';

export function createObjectFields(parentElement, parentKey, value) {
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

    fieldContainer.appendChild(toggleButton);
    generateFormFields(value, nestedContainer, parentKey);
    fieldContainer.appendChild(nestedContainer);

    parentElement.appendChild(fieldContainer);
}