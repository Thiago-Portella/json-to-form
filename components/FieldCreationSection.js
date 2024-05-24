// components/FieldCreationSection.js
import { createButton } from './Button.js';

export function createFieldCreationSection(parentElement, parentKey = '') {
    const section = document.createElement('div');
    section.classList.add('field-creation-section');

    const typeSelect = createTypeSelect();
    const nameInput = createNameInput();
    const saveButton = createButton('Salvar', 'Salvar campo', () => {
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
    const cancelButton = createButton('Cancelar', 'Cancelar criação', () => {
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