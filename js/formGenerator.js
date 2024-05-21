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

    const newFieldButton = createNewFieldButton(parentKey);
    parentElement.appendChild(newFieldButton);
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

    const newFieldButton = createNewFieldButton(fieldId);
    nestedContainer.appendChild(newFieldButton);
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

function createNewFieldButton(parentKey) {
    const button = document.createElement('button');
    button.textContent = `Criar novo campo em ${parentKey}`;
    button.setAttribute('type', 'button');
    button.classList.add('create-field-btn');
    button.addEventListener('click', () => handleCreateNewField(parentKey));
    return button;
}

function handleCreateNewField(parentKey) {
    const parentElement = document.querySelector(`[data-key="${parentKey}"]`);
    const parentType = parentElement.dataset.type;

    if (parentType === 'object') {
        createNewObjectField(parentElement, parentKey);
    } else if (parentType === 'array') {
        createNewArrayField(parentElement, parentKey);
    }
}

function createNewObjectField(parentElement, parentKey) {
    const fieldType = prompt('Digite o tipo do novo campo (number, object, list, boolean, string):');
    const fieldName = prompt('Digite o nome do novo campo:');
    const fieldId = `${parentKey}__FIELD__${fieldName}`;
    let fieldValue;

    switch (fieldType) {
        case 'number':
            fieldValue = 0;
            break;
        case 'object':
            fieldValue = {};
            break;
        case 'list':
            fieldValue = [];
            break;
        case 'boolean':
            fieldValue = false;
            break;
        case 'string':
            fieldValue = '';
            break;
        default:
            alert('Tipo inválido!');
            return;
    }

    const fieldContainer = document.createElement('div');
    fieldContainer.dataset.key = fieldId;
    fieldContainer.dataset.type = fieldType === 'list' ? 'array' : fieldType;
    generateFormFields({ [fieldName]: fieldValue }, fieldContainer, parentKey);
    parentElement.insertBefore(fieldContainer, parentElement.querySelector('.create-field-btn'));
}

function createNewArrayField(parentElement, parentKey) {
    const existingFields = parentElement.querySelectorAll('[data-key^="' + parentKey + '"]');
    let fieldType = 'string';
    let fieldValue = '';

    if (existingFields.length > 0) {
        const lastField = existingFields[existingFields.length - 1];
        fieldType = lastField.dataset.type;
        switch (fieldType) {
            case 'number':
                fieldValue = 0;
                break;
            case 'object':
                fieldValue = {};
                break;
            case 'array':
                fieldValue = [];
                break;
            case 'boolean':
                fieldValue = false;
                break;
            case 'string':
                fieldValue = '';
                break;
        }
    } else {
        fieldType = prompt('Digite o tipo do novo campo (number, object, list, boolean, string):');
        switch (fieldType) {
            case 'number':
                fieldValue = 0;
                break;
            case 'object':
                fieldValue = {};
                break;
            case 'list':
                fieldValue = [];
                break;
            case 'boolean':
                fieldValue = false;
                break;
            case 'string':
                fieldValue = '';
                break;
            default:
                alert('Tipo inválido!');
                return;
        }
    }

    const fieldIndex = existingFields.length;
    const fieldId = `${parentKey}__FIELD__${fieldIndex}`;
    const fieldContainer = document.createElement('div');
    fieldContainer.dataset.key = fieldId;
    fieldContainer.dataset.type = fieldType === 'list' ? 'array' : fieldType;
    generateFormFields({ [fieldIndex]: fieldValue }, fieldContainer, parentKey);
    parentElement.insertBefore(fieldContainer, parentElement.querySelector('.create-field-btn'));
}
