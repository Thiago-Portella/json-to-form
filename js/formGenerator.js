// js/formGenerator.js

function generateFormFields(jsonObject, parentElement, parentKey = '') {
    for (const key in jsonObject) {
        if (jsonObject.hasOwnProperty(key)) {
            const value = jsonObject[key];
            const fieldContainer = document.createElement('div');
            const label = document.createElement('label');
            const fieldId = parentKey ? `${parentKey}__FIELD__${key}` : key;
            label.setAttribute('for', fieldId);
            label.innerHTML = `<a href="#" class="edit-link" data-key="${fieldId}">${key}</a>`;
            fieldContainer.appendChild(label);

            if (typeof value === 'object' && !Array.isArray(value)) {
                createToggleButton(fieldContainer, key, fieldId, value);
            } else if (Array.isArray(value)) {
                createArrayFields(fieldContainer, key, fieldId, value);
            } else {
                createInputField(fieldContainer, fieldId, value, key);
            }

            parentElement.appendChild(fieldContainer);
        }
    }
    createAddFieldButton(parentElement, parentKey);
}

function createToggleButton(fieldContainer, key, fieldId, value) {
    const toggleButton = createButton('Expandir', `Expandir objeto ${key}`);
    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';

    toggleButton.addEventListener('click', function handleToggle() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} objeto ${key}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });

    fieldContainer.appendChild(toggleButton);
    generateFormFields(value, nestedContainer, fieldId);
    fieldContainer.appendChild(nestedContainer);
}

function createArrayFields(fieldContainer, key, fieldId, value) {
    const toggleButton = createButton('Expandir', `Expandir lista ${key}`);
    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';

    toggleButton.addEventListener('click', function handleToggle() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} lista ${key}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });

    fieldContainer.appendChild(toggleButton);
    fieldContainer.appendChild(nestedContainer);

    value.forEach((item, index) => {
        const arrayFieldContainer = document.createElement('div');
        const arrayLabel = document.createElement('label');
        const arrayFieldId = `${fieldId}__FIELD__${index}`;
        arrayLabel.setAttribute('for', arrayFieldId);
        arrayLabel.innerHTML = `<a href="#" class="edit-link" data-key="${arrayFieldId}">${key}[${index}]</a>`;
        arrayFieldContainer.appendChild(arrayLabel);

        if (typeof item === 'object') {
            createNestedArrayFields(arrayFieldContainer, key, index, item, arrayFieldId);
        } else {
            createInputField(arrayFieldContainer, arrayFieldId, item, `${key}[${index}]`);
        }

        nestedContainer.appendChild(arrayFieldContainer);
    });

    createAddFieldButton(nestedContainer, fieldId);
}

function createNestedArrayFields(nestedContainer, key, index, item, arrayFieldId) {
    const itemContainer = document.createElement('div');
    const itemToggleButton = createButton('Expandir', `Expandir objeto ${key}[${index}]`);
    const itemNestedContainer = document.createElement('div');
    itemNestedContainer.style.display = 'none';

    itemToggleButton.addEventListener('click', function handleToggle() {
        const isExpanded = itemToggleButton.textContent === 'Recolher';
        itemToggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        itemToggleButton.setAttribute('aria-label', `${itemToggleButton.textContent} objeto ${key}[${index}]`);
        itemNestedContainer.style.display = isExpanded ? 'none' : 'block';
    });

    itemContainer.appendChild(itemToggleButton);
    generateFormFields(item, itemNestedContainer, arrayFieldId);
    itemContainer.appendChild(itemNestedContainer);
    nestedContainer.appendChild(itemContainer);
}

function createInputField(fieldContainer, fieldId, value, key) {
    let input;
    if (typeof value === 'boolean') {
        input = document.createElement('input');
        input.type = 'checkbox';
        input.id = fieldId;
        input.checked = value;
        input.setAttribute('aria-label', `${key} ${value ? 'true' : 'false'}`);
        input.addEventListener('change', function handleChange() {
            input.setAttribute('aria-label', `${key} ${input.checked ? 'true' : 'false'}`);
        });
    } else if (typeof value === 'number') {
        input = document.createElement('input');
        input.type = 'text';
        input.id = fieldId;
        input.value = value;
        input.setAttribute('pattern', '[0-9]*\\.?[0-9]*');
        input.addEventListener('input', function handleInput() {
            input.value = input.value.replace(/[^0-9.]/g, '');
        });
    } else {
        input = document.createElement('input');
        input.type = 'text';
        input.id = fieldId;
        input.value = value;
    }
    fieldContainer.appendChild(input);
}

function createButton(text, ariaLabel) {
    const button = document.createElement('button');
    button.textContent = text;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', ariaLabel);
    return button;
}

function createAddFieldButton(parentElement, parentKey) {
    const addButton = document.createElement('button');
    addButton.textContent = `Criar novo campo em ${parentKey || 'root'}`;
    addButton.classList.add('add-field-button');
    addButton.type = 'button';
    addButton.dataset.parentKey = parentKey;
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey);
    });
    parentElement.appendChild(addButton);
}

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
    saveButton.type = 'button';
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
    cancelButton.type = 'button';
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
