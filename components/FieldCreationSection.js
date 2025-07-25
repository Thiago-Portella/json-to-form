// components/FieldCreationSection.js
import { createButton } from './Button.js';
import { createLabel } from './Label.js';
import { createInputField } from './InputField.js';
import { createObjectFields } from './CreateObjectField.js';
import { createListFields } from './CreateListField.js';

export function createFieldCreationSection(parentElement, parentKey = '') {
    const section = document.createElement('div');
    section.classList.add('field-creation-section');

    const typeSelect = createTypeSelect();
    const nameInput = createNameInput();
    const saveButton = createButton('Salvar', (event) => {
        event.preventDefault();
        const fieldType = typeSelect.value;
        const fieldName = nameInput.value.trim();
        if (fieldName) {
            addFieldToForm(parentElement, parentKey, fieldName, fieldType);
            section.remove();
        } else {
            alert('Nome do campo não pode estar vazio');
        }
    });
    const cancelButton = createButton('Cancelar', () => {
        section.remove();
    });

    section.appendChild(typeSelect);
    section.appendChild(nameInput);
    section.appendChild(saveButton);
    section.appendChild(cancelButton);

    parentElement.appendChild(section);
}

function createTypeSelect() {
    const typeSelect = document.createElement('select');
    typeSelect.innerHTML = `
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="object">Object</option>
        <option value="list">List</option>
    `;
    return typeSelect;
}

function createNameInput() {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Nome do campo';
    return nameInput;
}

export function addFieldToForm(parentElement, parentKey, fieldName, fieldType) {
    const container = document.createElement('div');
    const fieldId = parentKey ? `${parentKey}__FIELD__${fieldName}` : fieldName;
    const label = createLabel(fieldId, fieldName);
    container.appendChild(label);

    let input;
    switch (fieldType) {
        case 'boolean':
            input = createInputField(fieldId, false, 'boolean');
            break;
        case 'number':
            input = createInputField(fieldId, 0, 'number');
            break;
        case 'string':
            input = createInputField(fieldId, '', 'string');
            break;
        case 'object':
            createObjectFields(container, fieldId, {});
            break;
        case 'list':
            createListFields(container, fieldId, []);
            break;
        default:
            input = createInputField(fieldId, '', 'string');
    }

    if (input) {
        container.appendChild(input);
    }

    parentElement.appendChild(container);
}
