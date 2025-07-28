// components/FieldHandlers.js
import { createFieldCreationSection } from './FieldCreationSection.js';

export function addFieldCreationListeners() {
    document.querySelectorAll('.add-field-button').forEach(button => {
        button.addEventListener('click', function() {
            const parentKey = button.dataset.parentKey;
            const parentElement = button.closest('div');
            createFieldCreationSection(parentElement, parentKey);
        });
    });
}

export function addEditDeleteListeners() {
    document.querySelectorAll('.edit-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const fieldId = link.dataset.key;
            const fieldElement = document.getElementById(fieldId);
            const newFieldKey = prompt('Editar nome do campo:', fieldElement.value);
            if (newFieldKey !== null) {
                fieldElement.value = newFieldKey;
                updateFieldIds(document.getElementById('jsonForm'));
            }
        });
    });

    document.querySelectorAll('.delete-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const fieldId = link.dataset.key;
            const fieldElement = document.getElementById(fieldId);
            if (confirm(`Deseja realmente deletar o campo ${fieldId}?`)) {
                fieldElement.closest('div').remove();
                updateFieldIds(document.getElementById('jsonForm'));
            }
        });
    });
}

export function updateFieldIds(parentElement) {
    const elements = parentElement.querySelectorAll('[id]');
    elements.forEach((element, index) => {
        const newId = `${element.id.split('__FIELD__')[0]}__FIELD__${index}`;
        element.id = newId;
        const label = parentElement.querySelector(`label[for="${element.id}"]`);
        if (label) {
            label.setAttribute('for', newId);
        }
    });
}

export function updateButtonLabels(parentElement) {
    const buttons = parentElement.querySelectorAll('button');
    buttons.forEach(button => {
        const parentKey = button.dataset.parentKey;
        const displayName = parentKey ? parentKey.split('__FIELD__').pop() : 'root';
        button.textContent = `Adicionar novo campo em ${displayName}`;
    });
}