// components/CheckboxField.js
export function createCheckboxField(fieldId, value) {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = fieldId;
    input.checked = value;
    input.setAttribute('aria-label', `${fieldId} ${value ? 'true' : 'false'}`);
    input.addEventListener('change', function handleChange() {
        input.setAttribute('aria-label', `${fieldId} ${input.checked ? 'true' : 'false'}`);
    });
    return input;
}