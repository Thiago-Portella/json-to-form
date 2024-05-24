// components/InputField.js
import { createTextField } from './TextField.js';
import { createNumberField } from './NumberField.js';
import { createCheckboxField } from './CheckboxField.js';

export function createInputField(fieldId, value, type) {
    let input;
    switch (type) {
        case 'boolean':
            input = createCheckboxField(fieldId, value);
            break;
        case 'number':
            input = createNumberField(fieldId, value);
            break;
        case 'string':
            input = createTextField(fieldId, value);
            break;
        default:
            input = createTextField(fieldId, value);
    }
    return input;
}