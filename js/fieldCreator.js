function createFieldCreationSection(parentElement, parentKey = '') {
    const section = document.createElement('div');
    section.classList.add('field-creation-section');

    const typeSelect = document.createElement('select');
    typeSelect.innerHTML = `
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="object">Object</option>
        <option value="list">List</option>
    `;

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Nome do campo';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.addEventListener('click', () => {
        const fieldType = typeSelect.value;
        const fieldName = nameInput.value.trim();
        if (fieldName) {
            addFieldToForm(parentElement, parentKey, fieldName, fieldType);
            section.remove();
        } else {
            alert('Nome do campo não pode estar vazio');
        }
    });

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.addEventListener('click', () => {
        section.remove();
    });

    section.appendChild(typeSelect);
    section.appendChild(nameInput);
    section.appendChild(saveButton);
    section.appendChild(cancelButton);

    parentElement.appendChild(section);
}

function addFieldToForm(parentElement, parentKey, fieldName, fieldType) {
    const fieldContainer = document.createElement('div');
    const label = document.createElement('label');
    const fieldId = parentKey ? `${parentKey}__FIELD__${fieldName}` : fieldName;
    label.setAttribute('for', fieldId);
    label.innerHTML = `<a href="#" class="edit-link" data-key="${fieldId}">${fieldName}</a>`;
    fieldContainer.appendChild(label);

    let input;
    switch (fieldType) {
        case 'boolean':
            input = document.createElement('input');
            input.type = 'checkbox';
            input.id = fieldId;
            input.checked = false;
            break;
        case 'number':
            input = document.createElement('input');
            input.type = 'text';
            input.id = fieldId;
            input.value = 0;
            input.setAttribute('pattern', '[0-9]*\\.?[0-9]*');
            input.addEventListener('input', function handleInput() {
                input.value = input.value.replace(/[^0-9.]/g, '');
            });
            break;
        case 'object':
            input = document.createElement('div');
            input.id = fieldId;
            createToggleButton(fieldContainer, fieldName, fieldId, {});
            break;
        case 'list':
            input = document.createElement('div');
            input.id = fieldId;
            createArrayFields(fieldContainer, fieldName, fieldId, []);
            break;
        default:
            input = document.createElement('input');
            input.type = 'text';
            input.id = fieldId;
            input.value = '';
    }

    fieldContainer.appendChild(input);
    parentElement.appendChild(fieldContainer);
    createAddFieldButton(parentElement, parentKey);
}

function createAddFieldButton(parentElement, parentKey) {
    const addButton = document.createElement('button');
    addButton.textContent = `Criar novo campo em ${parentKey || 'root'}`;
    addButton.addEventListener('click', () => {
        createFieldCreationSection(parentElement, parentKey);
    });
    parentElement.appendChild(addButton);
}
