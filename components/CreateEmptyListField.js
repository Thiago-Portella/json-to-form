// components/CreateEmptyListField.js
import { createButton } from './Button.js';
import { createFieldCreationSection } from './FieldCreationSection.js';

export function createEmptyListField(parentElement, parentKey) {
    parentElement.dataset.itemType = '';
    const displayName = parentKey ? parentKey.split('__FIELD__').pop() : 'root';
    const addButton = createButton(`Adicionar novo item em ${displayName}`, (event) => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey, parentElement.dataset.itemType || null);
    });
    parentElement.appendChild(addButton);
}
