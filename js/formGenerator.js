function generateFormFields(jsonObject, parentElement, parentKey = '') {
    for (const key in jsonObject) {
        if (jsonObject.hasOwnProperty(key)) {
            const value = jsonObject[key];
            const fieldContainer = document.createElement('div');
            const label = document.createElement('label');
            const fieldId = parentKey ? `${parentKey}_${key}` : key;
            label.setAttribute('for', fieldId);
            label.textContent = key;
            fieldContainer.appendChild(label);

            if (typeof value === 'object' && !Array.isArray(value)) {
                createToggleButton(fieldContainer, key, fieldId, value, parentElement);
            } else if (Array.isArray(value)) {
                createArrayFields(fieldContainer, key, fieldId, value);
            } else {
                createInputField(fieldContainer, fieldId, value, key);
            }

            parentElement.appendChild(fieldContainer);
        }
    }
}

function createToggleButton(fieldContainer, key, fieldId, value, parentElement) {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Expandir';
    toggleButton.setAttribute('type', 'button');
    toggleButton.setAttribute('aria-label', `Expandir Objeto ${key}`);
    toggleButton.addEventListener('click', function() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} ${key}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });
    fieldContainer.appendChild(toggleButton);

    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';
    generateFormFields(value, nestedContainer, fieldId);
    fieldContainer.appendChild(nestedContainer);
}

function createArrayFields(fieldContainer, key, fieldId, value) {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Expandir';
    toggleButton.setAttribute('type', 'button');
    toggleButton.setAttribute('aria-label', `Expandir Lista ${key}`);
    toggleButton.addEventListener('click', function() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} Lista ${key}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });
    fieldContainer.appendChild(toggleButton);

    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';
    value.forEach((item, index) => {
        const arrayLabel = document.createElement('label');
        const arrayFieldId = `${fieldId}_${index}`;
        arrayLabel.setAttribute('for', arrayFieldId);
        arrayLabel.textContent = `${key}[${index}]`;
        nestedContainer.appendChild(arrayLabel);
        if (typeof item === 'object') {
            createNestedArrayFields(nestedContainer, key, index, item, arrayFieldId);
        } else {
            createInputField(nestedContainer, arrayFieldId, item, `${key}[${index}]`);
        }
    });
    fieldContainer.appendChild(nestedContainer);
}

function createNestedArrayFields(nestedContainer, key, index, item, arrayFieldId) {
    const itemContainer = document.createElement('div');
    const itemToggleButton = document.createElement('button');
    itemToggleButton.textContent = 'Expandir';
    itemToggleButton.setAttribute('type', 'button');
    itemToggleButton.setAttribute('aria-label', `Expandir Objeto ${key}[${index}]`);
    itemToggleButton.addEventListener('click', function() {
        const isExpanded = itemToggleButton.textContent === 'Recolher';
        itemToggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        itemToggleButton.setAttribute('aria-label', `${itemToggleButton.textContent} ${key}[${index}]`);
        itemNestedContainer.style.display = isExpanded ? 'none' : 'block';
    });
    itemContainer.appendChild(itemToggleButton);

    const itemNestedContainer = document.createElement('div');
    itemNestedContainer.style.display = 'none';
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
        input.addEventListener('change', function() {
            input.setAttribute('aria-label', `${key} ${input.checked ? 'true' : 'false'}`);
        });
    } else if (typeof value === 'number') {
        input = document.createElement('input');
        input.type = 'text';
        input.id = fieldId;
        input.value = value;
        input.setAttribute('pattern', '[0-9]*\\.?[0-9]*');
        input.addEventListener('input', function() {
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
