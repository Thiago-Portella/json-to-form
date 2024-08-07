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
        const label = createLabel(`${parentKey}__FIELD__${key}`, key);
            fieldContainer.appendChild(label);

            let input;
            if (typeof value === 'boolean') {
                input = createInputField(`${parentKey}__FIELD__${key}`, value, 'boolean');
            } else if (typeof value === 'number') {
                input = createInputField(`${parentKey}__FIELD__${key}`, value, 'number');
            } else if (typeof value === 'string') {
                input = createInputField(`${parentKey}__FIELD__${key}`, value, 'string');
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                createObjectFields(fieldContainer, `${parentKey}__FIELD__${key}`, value);
            } else if (Array.isArray(value)) {
                if (value.length > 0) {
                    createListFields(fieldContainer, `${parentKey}__FIELD__${key}`, value);
                } else {
                    createEmptyListField(fieldContainer, `${parentKey}__FIELD__${key}`);
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
    const addButton = createButton(`Adicionar novo campo em ${parentKey || 'root'}`, () => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey);Element
    });
    parentElement.appendChild(addButton);
}