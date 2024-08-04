// components/EditableLink.js
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
            editButton.addEventListener('click', function () {
                const newName = prompt('Digite o novo nome do campo:', text);
                if (newName) {
                    console.log(fieldId);
                    document.querySelectorAll(`[data-key=${fieldId}]`).forEach(element => {
                        element.textContent = newName;
                        element.setAttribute('aria-label', newName);
                        element.dataset.key = newDataSetKey(fieldId, newName);
                    });
                    buttonDiv.remove();
                }
            });

            buttonDiv.appendChild(deleteButton);
            buttonDiv.appendChild(editButton);
            link.parentNode.insertBefore(buttonDiv, link.nextSibling);
        }
    });

    return link;
}

function newDataSetKey(current, newKey) {
    const oldDataSetKeyEnd = current.split('__FIELD__').pop();
    const newDataSetKey = current.split(oldDataSetKeyEnd)[0] + newKey;
    return newDataSetKey;
}