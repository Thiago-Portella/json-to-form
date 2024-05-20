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

    value.forEach((item, index) => {
        const arrayLabel = document.createElement('label');
        const arrayFieldId = `${fieldId}__FIELD__${index}`;
        arrayLabel.setAttribute('for', arrayFieldId);
        arrayLabel.innerHTML = `<a href="#" class="edit-link" data-key="${arrayFieldId}">${key}[${index}]</a>`;
        fieldContainer.appendChild(arrayLabel);
        if (typeof item === 'object') {
            createNestedArrayFields(fieldContainer, key, index, item, arrayFieldId);
        } else {
            createInputField(fieldContainer, arrayFieldId, item, `${key}[${index}]`);
        }
    });

    fieldContainer.appendChild(nestedContainer);
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
