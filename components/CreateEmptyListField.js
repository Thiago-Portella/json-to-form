// components/CreateEmptyListField.js
// UI helper for adding the first item to an empty list
import { createButton } from './Button.js';
import { createFieldCreationSection } from './FieldCreationSection.js';

export function createEmptyListField(parentElement, parentKey) {
    const dottedPath = parentKey.split('__FIELD__').join('.');
    const displayName = dottedPath || 'root';
    const addButton = createButton(`Adicionar novo item em ${displayName}`, (event) => {
        event.preventDefault();
        createFieldCreationSection(parentElement, parentKey, parentElement.dataset.itemType || null);
    });
    addButton.dataset.parentKey = parentKey;
    parentElement.appendChild(addButton);
}
