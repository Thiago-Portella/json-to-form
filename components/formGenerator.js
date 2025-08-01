// components/formGenerator.js
import { createLabel } from './Label.js';
import { createInputField } from './InputField.js';
import { createObjectFields } from './CreateObjectField.js';
import { createListFields } from './CreateListField.js';
import { createEmptyListField } from './CreateEmptyListField.js';
import { createButton } from './Button.js';
import { createFieldCreationSection } from './FieldCreationSection.js';

export function generateFormFields(jsonObject, parentElement, parentKey = '') {
    for (const key in jsonObject) {
        if (jsonObject.hasOwnProperty(key)) {
            const value = jsonObject[key];
            const fieldContainer = document.createElement('div');
            const fieldId = parentKey ? `${parentKey}__FIELD__${key}` : key;
            const label = createLabel(fieldId, key);
            fieldContainer.appendChild(label);

            let input;
            if (typeof value === 'boolean') {
                input = createInputField(fieldId, value, 'boolean');
            } else if (typeof value === 'number') {
                input = createInputField(fieldId, value, 'number');
            } else if (typeof value === 'string') {
                input = createInputField(fieldId, value, 'string');
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                createObjectFields(fieldContainer, fieldId, value);
            } else if (Array.isArray(value)) {
                if (value.length > 0) {
                    createListFields(fieldContainer, fieldId, value);
                } else {
                    createEmptyListField(fieldContainer, fieldId);
                }
            }

            if (input) {
                fieldContainer.appendChild(input);
            }

            parentElement.appendChild(fieldContainer);
        }
    }
    createAddFieldButton(parentElement, parentKey);
}

function createAddFieldButton(parentElement, parentKey) {
    const dottedPath = parentKey.split('__FIELD__').join('.');
    const displayName = dottedPath || 'root';
    const addButton = createButton(`Adicionar novo campo em ${displayName}`, (event) => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey);
    });
    addButton.dataset.parentKey = parentKey;
    parentElement.appendChild(addButton);
}
