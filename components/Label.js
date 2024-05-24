// components/Label.js
import { createEditableLink } from './EditableLink.js';

export function createLabel(fieldId, text) {
    const label = document.createElement('label');
    label.setAttribute('for', fieldId);
    const link = createEditableLink(fieldId, text);
    label.appendChild(link);
    return label;
}