// components/EditableLink.js
export function createEditableLink(fieldId, text) {
    const link = document.createElement('a');
    link.href = '#';
    link.classList.add('edit-link');
    link.dataset.key = fieldId;
    link.textContent = text;
    return link;
}