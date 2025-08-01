// components/EditableLink.js
import RuntimeDatabase from './runtimeDatabase.js';
import { logMessage } from './LogLevelComponent.js';

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
            deleteButton.type = 'button';
            deleteButton.textContent = 'Deletar';
            deleteButton.setAttribute('type', 'button');
            deleteButton.addEventListener('click', function () {
                if (confirm(`Deseja realmente deletar o campo ${text}?`)) {
                    link.closest('div').remove();
                    logMessage(`Campo ${text} deletado`);
                }
            });
            
            if (isIndex === false) {
                const editButton = document.createElement('button');
                editButton.type = 'button';
                editButton.textContent = 'Trocar Nome';
                editButton.addEventListener('click', function firstClick(event) {
                    event.preventDefault();
                    const currentId = returnCorrectField(fieldId);
                    const updatedFieldId = currentId;
                    const updatedText = currentId.split('__FIELD__').pop();
                    const newName = prompt('Digite o novo nome do campo:', updatedText);
                    if (newName) {
                        document.querySelectorAll(`[data-key=${updatedFieldId}]`).forEach(element => {
                            let newFieldId = updateElementIds(element.closest('div'), updatedFieldId, newName);
                            RuntimeDatabase.update(fieldId, newFieldId);
                        });
                        logMessage(`Campo ${updatedText} renomeado para ${newName}`);
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
    const oldDisplayName = oldFieldId.split('__FIELD__').join('.');
    const newDisplayName = newFieldId.split('__FIELD__').join('.');

    container.querySelectorAll('[data-key]').forEach(el => {
        if (el.dataset.key.startsWith(oldFieldId)) {
            el.dataset.key = el.dataset.key.replace(oldFieldId, newFieldId);
            if (el.textContent === oldFieldId.split('__FIELD__').pop()) {
                el.textContent = newName;
            }
        }
    });

    container.querySelectorAll('[data-toggle-name]').forEach(btn => {
        const toggleName = btn.dataset.toggleName;
        if (toggleName && toggleName.startsWith(oldFieldId)) {
            btn.dataset.toggleName = toggleName.replace(oldFieldId, newFieldId);
            btn.textContent = btn.textContent.replace(oldDisplay, newDisplay);
            btn.setAttribute('aria-label', btn.textContent);
        }
    });

    container.querySelectorAll('[data-parent-key]').forEach(btn => {
        const parentKey = btn.dataset.parentKey;
        if (parentKey && parentKey.startsWith(oldFieldId)) {
            btn.dataset.parentKey = parentKey.replace(oldFieldId, newFieldId);
            btn.textContent = btn.textContent.replace(oldDisplay, newDisplay);
            btn.setAttribute('aria-label', btn.textContent);
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

    container.querySelectorAll('input[type="checkbox"]').forEach(input => {
        if (input.id && input.id.startsWith(oldFieldId)) {
            input.id = input.id.replace(oldFieldId, newFieldId);
            const labelName = newFieldId.split('__FIELD__').pop();
            input.setAttribute('aria-label', `${labelName} ${input.checked ? 'true' : 'false'}`);
    container.querySelectorAll('button[data-toggle-name]').forEach(button => {
        if (button.dataset.toggleName.startsWith(oldFieldId)) {
            button.dataset.toggleName = button.dataset.toggleName.replace(oldFieldId, newFieldId);
            button.textContent = button.textContent.replace(oldDisplayName, newDisplayName);
            button.setAttribute('aria-label', `${button.textContent} ${button.dataset.toggleType} ${newDisplayName}`);
        }
    });

    updateRuntimeDatabaseIds(oldFieldId, newFieldId);

    return newFieldId;
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
