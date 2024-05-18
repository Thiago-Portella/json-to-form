document.getElementById('generateForm').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        const form = document.getElementById('jsonForm');
        form.innerHTML = '';
        generateFormFields(jsonObject, form);
        addNewFieldButton(form, jsonObject, '');
    } catch (e) {
        alert('JSON inválido');
    }
});

document.getElementById('updateJson').addEventListener('click', function() {
    const form = document.getElementById('jsonForm');
    const updatedJson = updateJsonFromForm(form);
    document.getElementById('jsonInput').value = JSON.stringify(updatedJson, null, 2);
});

function generateFormFields(jsonObject, parentElement, parentKey = '') {
    Object.keys(jsonObject).forEach(key => {
        const value = jsonObject[key];
        const fieldContainer = createFieldContainer(key, parentKey);

        if (typeof value === 'object' && !Array.isArray(value)) {
            createExpandableSection(fieldContainer, key, value, parentKey);
        } else if (Array.isArray(value)) {
            createExpandableList(fieldContainer, key, value, parentKey);
        } else {
            createInputField(fieldContainer, key, value, parentKey);
        }

        parentElement.appendChild(fieldContainer);
    });
}

function createFieldContainer(key, parentKey) {
    const fieldContainer = document.createElement('div');
    const label = document.createElement('label');
    const fieldId = parentKey ? `${parentKey}_${key}` : key;
    label.setAttribute('for', fieldId);
    label.textContent = key;
    fieldContainer.appendChild(label);
    return fieldContainer;
}

function createExpandableSection(fieldContainer, key, value, parentKey) {
    const toggleButton = createToggleButton(key);
    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';

    toggleButton.addEventListener('click', function() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} ${key}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });

    fieldContainer.appendChild(toggleButton);
    generateFormFields(value, nestedContainer, `${parentKey}_${key}`);
    fieldContainer.appendChild(nestedContainer);
    addNewFieldButton(nestedContainer, value, `${parentKey}_${key}`);
}

function createExpandableList(fieldContainer, key, value, parentKey) {
    const toggleButton = createToggleButton(key);
    const nestedContainer = document.createElement('div');
    nestedContainer.style.display = 'none';

    toggleButton.addEventListener('click', function() {
        const isExpanded = toggleButton.textContent === 'Recolher';
        toggleButton.textContent = isExpanded ? 'Expandir' : 'Recolher';
        toggleButton.setAttribute('aria-label', `${toggleButton.textContent} Lista ${key}`);
        nestedContainer.style.display = isExpanded ? 'none' : 'block';
    });

    fieldContainer.appendChild(toggleButton);
    value.forEach((item, index) => {
        const arrayFieldId = `${parentKey}_${key}_${index}`;
        const arrayLabel = document.createElement('label');
        arrayLabel.setAttribute('for', arrayFieldId);
        arrayLabel.textContent = `${key}[${index}]`;
        nestedContainer.appendChild(arrayLabel);

        if (typeof item === 'object') {
            createExpandableSection(nestedContainer, `${key}[${index}]`, item, `${parentKey}_${key}`);
        } else {
            createInputField(nestedContainer, `${key}[${index}]`, item, `${parentKey}_${key}`);
        }
    });
    fieldContainer.appendChild(nestedContainer);
    addNewFieldButton(nestedContainer, value, `${parentKey}_${key}`);
}

function createInputField(fieldContainer, key, value, parentKey) {
    const input = document.createElement('input');
    const fieldId = parentKey ? `${parentKey}_${key}` : key;
    input.id = fieldId;

    if (typeof value === 'boolean') {
        input.type = 'checkbox';
        input.checked = value;
        input.setAttribute('aria-label', `${key} ${value ? 'true' : 'false'}`);
        input.addEventListener('change', function() {
            input.setAttribute('aria-label', `${key} ${input.checked ? 'true' : 'false'}`);
        });
    } else if (typeof value === 'number') {
        input.type = 'text';
        input.value = value;
        input.setAttribute('pattern', '[0-9]*\\.?[0-9]*');
        input.addEventListener('input', function() {
            input.value = input.value.replace(/[^0-9.]/g, '');
        });
    } else {
        input.type = 'text';
        input.value = value;
    }

    fieldContainer.appendChild(input);
}

function createToggleButton(key) {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Expandir';
    toggleButton.setAttribute('type', 'button');
    toggleButton.setAttribute('aria-label', `Expandir ${key}`);
    return toggleButton;
}

function addNewFieldButton(parentElement, jsonObject, parentKey = '') {
    const addButton = document.createElement('button');
    addButton.textContent = `Adicionar Campo em ${parentKey || 'root'}`;
    addButton.setAttribute('type', 'button');
    addButton.addEventListener('click', function() {
        const newFieldKey = prompt('Digite o nome do novo campo:');
        if (newFieldKey) {
            const newFieldTypeContainer = document.createElement('div');
            const newFieldTypeLabel = document.createElement('label');
            newFieldTypeLabel.textContent = 'Escolha o tipo do novo campo:';
            const newFieldTypeSelect = document.createElement('select');
            const fieldTypeOptions = ['string', 'number', 'boolean', 'object', 'array'];
            fieldTypeOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                newFieldTypeSelect.appendChild(optionElement);
            });
            newFieldTypeContainer.appendChild(newFieldTypeLabel);
            newFieldTypeContainer.appendChild(newFieldTypeSelect);
            parentElement.appendChild(newFieldTypeContainer);

            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Confirmar';
            confirmButton.setAttribute('type', 'button');
            confirmButton.addEventListener('click', function() {
                const newFieldType = newFieldTypeSelect.value;
                let newFieldValue;
                switch (newFieldType) {
                    case 'string':
                        newFieldValue = '';
                        break;
                    case 'number':
                        newFieldValue = 0;
                        break;
                    case 'boolean':
                        newFieldValue = false;
                        break;
                    case 'object':
                        newFieldValue = {};
                        break;
                    case 'array':
                        newFieldValue = [];
                        break;
                    default:
                        alert('Tipo inválido!');
                        return;
                }
                jsonObject[newFieldKey] = newFieldValue;
                const newFieldContainer = document.createElement('div');
                generateFormFields({ [newFieldKey]: newFieldValue }, newFieldContainer, parentKey);
                parentElement.appendChild(newFieldContainer);
                parentElement.removeChild(newFieldTypeContainer);
                parentElement.removeChild(confirmButton);
                parentElement.appendChild(addButton); // Move the add button to the end
            });
            parentElement.appendChild(confirmButton);
        }
    });
    parentElement.appendChild(addButton);
}

function updateJsonFromForm(form) {
    const updatedJson = {};
    const elements = form.querySelectorAll('input');
    elements.forEach(element => {
        const keys = element.id.split('_');
        let current = updatedJson;
        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                if (element.type === 'checkbox') {
                    current[key] = element.checked;
                } else if (element.type === 'text' && element.getAttribute('pattern') === '[0-9]*\\.?[0-9]*') {
                    current[key] = element.value.includes('.') ? parseFloat(element.value) : parseInt(element.value);
                } else {
                    current[key] = element.value;
                }
            } else {
                if (!current[key]) {
                    current[key] = isNaN(keys[index + 1]) ? {} : [];
                }
                current = current[key];
            }
        });
    });
    return updatedJson;
}
