// components/CreateListField.js
import { createToggleButton } from './ToggleButton.js';
import { createTextField } from './TextField.js';
import { createNumberField } from './NumberField.js';
import { createCheckboxField } from './CheckboxField.js';
import { createObjectFields } from './CreateObjectField.js';
import { createInputField } from './InputField.js';
import { createLabel } from './Label.js';
import { createFieldCreationSection } from './FieldCreationSection.js';
import { logMessage } from './LogLevelComponent.js';

export function createListFields(parentElement, parentKey, value) {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('list-field-container');

    const toggleButton = createToggleButton('Expandir Lista', parentKey, function handleToggle() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} lista ${parentKey.split('__FIELD__').pop()}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });

    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';
    if (value.length > 0) {
        const firstItem = value[0];
        let itemType;
        if (Array.isArray(firstItem)) {
            itemType = 'list';
        } else if (typeof firstItem === 'object') {
            itemType = 'object';
        } else {
            itemType = typeof firstItem;
        }
        nestedContainer.dataset.itemType = itemType;
    } else {
        nestedContainer.dataset.itemType = '';
    }
    nestedContainer.addEventListener('click', (event) => {
        if (event.target.textContent === 'Deletar') {
            logMessage(`Item removido de ${parentKey.split('__FIELD__').pop()}`);
        }
    });

    fieldContainer.appendChild(toggleButton);
    fieldContainer.appendChild(nestedContainer);

    value.forEach((item, index) => {
        const arrayFieldContainer = document.createElement('div');
        const arrayFieldId = `${parentKey}__FIELD__${index}`;
        const arrayLabel = createLabel(arrayFieldId, `${index}`, true);
        arrayFieldContainer.appendChild(arrayLabel);

        let input;
        if (typeof item === 'object') {
            createObjectFields(arrayFieldContainer, arrayFieldId, item);
        } else {
            input = createInputField(arrayFieldId, item, typeof item);
            arrayFieldContainer.appendChild(input);
        }

        nestedContainer.appendChild(arrayFieldContainer);
        logMessage(`Item ${index} adicionado em ${parentKey.split('__FIELD__').pop()}`);
    });

    createAddFieldButton(nestedContainer, parentKey);

    parentElement.appendChild(fieldContainer);
}

function createAddFieldButton(parentElement, parentKey) {
    const addButton = document.createElement('button');
    addButton.type = 'button';
    const displayName = parentKey ? parentKey.split('__FIELD__').pop() : 'root';
    addButton.textContent = `Adicionar novo campo em ${displayName}`;
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        logMessage(`Adicionar novo item em ${displayName}`);
        createFieldCreationSection(parentElement, parentKey, parentElement.dataset.itemType || null);
    });
    parentElement.appendChild(addButton);
}
