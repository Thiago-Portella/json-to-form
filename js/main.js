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
    handleGenerateForm(); // Recria o formulário a partir do JSON atualizado
}

function addEditDeleteListeners() {
    document.querySelectorAll('.edit-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const fullKey = event.target.dataset.key;
            const keyParts = fullKey.split('__FIELD__');
            const key = keyParts[keyParts.length - 1];
            const fieldContainer = event.target.closest('div');

            let editContainer = fieldContainer.querySelector('.edit-container');
            if (editContainer) {
                editContainer.remove();
                return;
            }

            editContainer = document.createElement('div');
            editContainer.classList.add('edit-container');
            editContainer.innerHTML = `
                <input type="text" value="${key}" class="edit-key-input">
                <button type="button" class="save-key-btn">Salvar</button>
                <button type="button" class="delete-key-btn">Deletar</button>
            `;
            fieldContainer.appendChild(editContainer);

            editContainer.querySelector('.save-key-btn').addEventListener('click', function() {
                const newKey = editContainer.querySelector('.edit-key-input').value;
                const newFullKey = fullKey.replace(key, newKey);
                event.target.textContent = newKey;
                event.target.dataset.key = newFullKey;
                updateFieldIds(fieldContainer, fullKey, newFullKey);
                updateButtonLabels(fieldContainer, fullKey, newFullKey);
                editContainer.remove();
            });

            editContainer.querySelector('.delete-key-btn').addEventListener('click', function() {
                if (confirm(`Você realmente deseja deletar o campo "${key}"?`)) {
                    fieldContainer.remove();
                }
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

function updateButtonLabels(container, oldKey, newKey) {
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('Expandir') || button.textContent.includes('Recolher')) {
            const ariaLabel = button.getAttribute('aria-label');
            const updatedLabel = ariaLabel.replace(oldKey, newKey);
            button.setAttribute('aria-label', updatedLabel);
            button.textContent = button.textContent.replace(oldKey, newKey);
        }
    });
}
