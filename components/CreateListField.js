// components/CreateListField.js
import { createToggleButton } from './ToggleButton.js';
import { createTextField } from './TextField.js';
import { createNumberField } from './NumberField.js';
import { createCheckboxField } from './CheckboxField.js';
import { createObjectFields } from './CreateObjectField.js';
import { createInputField } from './InputField.js';
import { createLabel } from './Label.js';
import { createFieldCreationSection } from './FieldCreationSection.js';

export function createListFields(parentElement, parentKey, value) {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('list-field-container');

    const displayName = parentKey.split('__FIELD__').join('.');
    const toggleButton = createToggleButton('Expandir Lista', parentKey, function handleToggle() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} lista ${displayName}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });

    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';

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
    });

    createAddFieldButton(nestedContainer, parentKey);

    parentElement.appendChild(fieldContainer);
}

function createAddFieldButton(parentElement, parentKey) {
    const addButton = document.createElement('button');
    addButton.type = 'button';
    const dottedPath = parentKey.split('__FIELD__').join('.');
    const displayName = dottedPath || 'root';
    addButton.textContent = `Adicionar novo campo em ${displayName}`;
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey);
    });
    parentElement.appendChild(addButton);
}
