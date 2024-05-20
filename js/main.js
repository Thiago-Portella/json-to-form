document.getElementById('generateForm').addEventListener('click', handleGenerateForm);
document.getElementById('updateJson').addEventListener('click', handleUpdateJson);

function handleGenerateForm() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        const form = document.getElementById('jsonForm');
        form.innerHTML = '';
        generateFormFields(jsonObject, form);
        addEditDeleteListeners();
    } catch (e) {
        alert('JSON inválido');
    }
}

function handleUpdateJson() {
    const form = document.getElementById('jsonForm');
    const updatedJson = updateJsonFromForm(form);
    document.getElementById('jsonInput').value = JSON.stringify(updatedJson, null, 2);
}

function addEditDeleteListeners() {
    document.querySelectorAll('.edit-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const key = event.target.dataset.key;
            const fieldContainer = event.target.closest('div');
            const editContainer = document.createElement('div');
            editContainer.innerHTML = `
                <input type="text" value="${key}" class="edit-key-input">
                <button type="button" class="save-key-btn">Salvar</button>
                <button type="button" class="delete-key-btn">Deletar</button>
            `;
            fieldContainer.appendChild(editContainer);

            editContainer.querySelector('.save-key-btn').addEventListener('click', function() {
                const newKey = editContainer.querySelector('.edit-key-input').value;
                event.target.textContent = newKey;
                event.target.dataset.key = newKey;
                updateFieldIds(fieldContainer, key, newKey);
                editContainer.remove();
            });

            editContainer.querySelector('.delete-key-btn').addEventListener('click', function() {
                fieldContainer.remove();
            });
        });
    });
}

function updateFieldIds(container, oldKey, newKey) {
    const elements = container.querySelectorAll(`[id^="${oldKey}"]`);
    elements.forEach(element => {
        const newId = element.id.replace(new RegExp(`^${oldKey}`), newKey);
        element.id = newId;
        if (element.tagName === 'LABEL') {
            element.setAttribute('for', newId);
        }
    });
}
