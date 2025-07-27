// components/CreateEmptyListField.js
import { createButton } from './Button.js';
import { createFieldCreationSection } from './FieldCreationSection.js';

export function createEmptyListField(parentElement, parentKey) {
    const addButton = createButton(`Adicionar novo item em ${parentKey || 'root'}`, (event) => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey);
    });
    parentElement.appendChild(addButton);
}
