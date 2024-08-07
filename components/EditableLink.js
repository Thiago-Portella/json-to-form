// components/EditableLink.js
import RuntimeDatabase from './runtimeDatabase.js';

export function createEditableLink(fieldId, text) {
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

            const editButton = document.createElement('button');
            editButton.textContent = 'Trocar Nome';
            editButton.addEventListener('click', function firstClick () {
                const updatedFieldId = returnCorrectField(fieldId);
                const updatedText = updatedFieldId.split('__FIELD__').pop();
                const newName = prompt('Digite o novo nome do campo:', updatedText);
                if (newName) {
                    document.querySelectorAll(`[data-key=${updatedFieldId}]`).forEach(element => {
                    let newFieldId = newElementInfos(element, updatedFieldId, newName);
                        RuntimeDatabase.update(fieldId, )
                    });
                    buttonDiv.remove();
                }
                editButton.removeEventListener('click', firstClick);
            });

            buttonDiv.appendChild(deleteButton);
            buttonDiv.appendChild(editButton);
            link.parentNode.insertBefore(buttonDiv, link.nextSibling);
        }
    });

    return link;
}

function newElementInfos(element, oldFieldId, newName) {
    element.textContent = newName;
    element.setAttribute('aria-label', newName);
    const oldDataSetKeyEnd = oldFieldId.split('__FIELD__').pop();
    const newDataSetKey = oldFieldId.split(oldDataSetKeyEnd)[0] + newName;
    element.dataset.key = newDataSetKey;
    return newDataSetKey;
}

function returnCorrectField(fieldId) {
    return RuntimeDatabase.read(fieldId);
}