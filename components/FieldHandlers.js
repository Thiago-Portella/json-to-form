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
            const newValue = prompt('Editar valor:', fieldElement.value);
            if (newValue !== null) {
                fieldElement.value = newValue;
            }
        });
    });

    document.querySelectorAll('.delete-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const fieldId = link.dataset.key;
            const fieldElement = document.getElementById(fieldId);
            fieldElement.closest('div').remove();
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
        button.textContent = `Adicionar novo campo em ${parentKey || 'root'}`;
    });
}