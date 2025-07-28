// components/EditableLink.js
import RuntimeDatabase from './runtimeDatabase.js';

export function createEditableLink(fieldId, text, isIndex) {
    const link = document.createElement('a');
    link.href = '#';
    link.classList.add('edit-link');
    link.dataset.key = fieldId;
    link.textContent = text;

    link.addEventListener('click', function (event) {
        event.preventDefault();
        const existingDiv = link.nextElementSibling;
        if (existingDiv && existingDiv.classList.contains('edit-delete-buttons')) {
            existingDiv.remove();
        } else {
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('edit-delete-buttons');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.addEventListener('click', function () {
                if (confirm(`Deseja realmente deletar o campo ${text}?`)) {
                    link.closest('div').remove();
                }
            });
            
            if (isIndex === true) {
                const editButton = document.createElement('button');
                editButton.textContent = 'Trocar Nome';
                editButton.addEventListener('click', function firstClick() {
                    const currentId = returnCorrectField(fieldId);
                    const updatedFieldId = currentId;
                    const updatedText = currentId.split('__FIELD__').pop();
                    const newName = prompt('Digite o novo nome do campo:', updatedText);
                    if (newName) {
                        document.querySelectorAll(`[data-key=${updatedFieldId}]`).forEach(element => {
                            let newFieldId = updateElementIds(element.closest('div'), updatedFieldId, newName);
                            RuntimeDatabase.update(fieldId, newFieldId);
                        });
                        buttonDiv.remove();
                    }
                    editButton.removeEventListener('click', firstClick);
                });

                buttonDiv.appendChild(deleteButton);
                buttonDiv.appendChild(editButton);
            } else {
                buttonDiv.appendChild(deleteButton);
            }
            link.parentNode.insertBefore(buttonDiv, link.nextSibling);
        }
    });

    return link;
}

function updateElementIds(container, oldFieldId, newName) {
    const parentPath = oldFieldId.split('__FIELD__').slice(0, -1).join('__FIELD__');
    const newFieldId = `${parentPath}__FIELD__${newName}`;

    container.querySelectorAll('[data-key]').forEach(el => {
        if (el.dataset.key.startsWith(oldFieldId)) {
            el.dataset.key = el.dataset.key.replace(oldFieldId, newFieldId);
            if (el.textContent === oldFieldId.split('__FIELD__').pop()) {
                el.textContent = newName;
            }
        }
    });

    container.querySelectorAll('[id]').forEach(el => {
        if (el.id.startsWith(oldFieldId)) {
            el.id = el.id.replace(oldFieldId, newFieldId);
        }
    });

    container.querySelectorAll('label').forEach(label => {
        const forAttr = label.getAttribute('for');
        if (forAttr && forAttr.startsWith(oldFieldId)) {
            label.setAttribute('for', forAttr.replace(oldFieldId, newFieldId));
        }
    });

    updateRuntimeDatabaseIds(oldFieldId, newFieldId);
}

function updateRuntimeDatabaseIds(oldPrefix, newPrefix) {
    const entries = RuntimeDatabase.getAll();
    Object.keys(entries).forEach(key => {
        const value = entries[key];
        if (value.startsWith(oldPrefix)) {
            RuntimeDatabase.update(key, value.replace(oldPrefix, newPrefix));
        }
    });
}

function returnCorrectField(fieldId) {
    return RuntimeDatabase.read(fieldId);
}
