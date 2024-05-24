// components/TextField.js
export function createTextField(fieldId, value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = fieldId;
    input.value = value;
    return input;
}