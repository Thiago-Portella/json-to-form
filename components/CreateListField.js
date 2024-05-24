// components/CreateListField.js
import { createToggleButton } from './ToggleButton.js';
import { createTextField } from './TextField.js';
import { createNumberField } from './NumberField.js';
import { createCheckboxField } from './CheckboxField.js';
import { createObjectFields } from './CreateObjectField.js';
import { createInputField } from './InputField.js';

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

    fieldContainer.appendChild(toggleButton);
    fieldContainer.appendChild(nestedContainer);

    value.forEach((item, index) => {
        const arrayFieldContainer = document.createElement('div');
        const arrayLabel = document.createElement('label');
        const arrayFieldId = `${parentKey}__FIELD__${index}`;
        arrayLabel.setAttribute('for', arrayFieldId);
        arrayLabel.innerHTML = `<a href="#" class="edit-link" data-key="${arrayFieldId}">${parentKey}[${index}]</a>`;
        arrayFieldContainer.appendChild(arrayLabel);

        let input;
        if (typeof item === 'object') {
            createObjectFields(arrayFieldContainer, `${parentKey}[${index}]`, item);
        } else {
            input = createInputField(arrayFieldId, item, typeof item);
            arrayFieldContainer.appendChild(input);
        }

        nestedContainer.appendChild(arrayFieldContainer);
    });

    createAddFieldButton(nestedContainer, parentKey);

    parentElement.appendChild(fieldContainer);
}

function createAddFieldButton(parentElement, parentKey) {
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.textContent = `Adicionar novo campo em ${parentKey || 'root'}`;
    addButton.addEventListener('click', () => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey);
    });
    parentElement.appendChild(addButton);
}