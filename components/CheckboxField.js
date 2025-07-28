// components/CheckboxField.js
export function createCheckboxField(fieldId, value) {
    const name = fieldId.split('__FIELD__').pop();
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = fieldId;
    input.checked = value;
    input.setAttribute('aria-label', `${name} ${value ? 'true' : 'false'}`);
    input.addEventListener('change', function handleChange() {
        input.setAttribute('aria-label', `${name} ${input.checked ? 'true' : 'false'}`);
    });
    return input;
}