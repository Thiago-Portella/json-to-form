document.getElementById('generateForm').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        const form = document.getElementById('jsonForm');
        form.innerHTML = '';
        generateFormFields(jsonObject, form);
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
            } else if (Array.isArray(value)) {
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
                    } else {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.id = arrayFieldId;
                        input.value = item;
                        nestedContainer.appendChild(input);
                    }
                });
                fieldContainer.appendChild(nestedContainer);
            } else if (typeof value === 'boolean') {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = fieldId;
                checkbox.checked = value;
                checkbox.setAttribute('aria-label', `${key} ${value ? 'true' : 'false'}`);
                checkbox.addEventListener('change', function() {
                    checkbox.setAttribute('aria-label', `${key} ${checkbox.checked ? 'true' : 'false'}`);
                });
                fieldContainer.appendChild(checkbox);
            } else if (typeof value === 'number') {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = fieldId;
                input.value = value;
                input.setAttribute('pattern', '[0-9]*\\.?[0-9]*');
                input.addEventListener('input', function() {
                    input.value = input.value.replace(/[^0-9.]/g, '');
                });
                fieldContainer.appendChild(input);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = fieldId;
                input.value = value;
                fieldContainer.appendChild(input);
            }

            parentElement.appendChild(fieldContainer);
        }
    }
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
