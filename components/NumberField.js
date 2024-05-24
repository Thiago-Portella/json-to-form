// components/NumberField.js
export function createNumberField(fieldId, value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = fieldId;
    input.value = value;
    input.setAttribute('pattern', '[0-9]*\\.?[0-9]*');
    input.addEventListener('input', function handleInput() {
        input.value = input.value.replace(/[^0-9.]/g, '');
    });
    return input;
}