// components/Label.js
import { createEditableLink } from './EditableLink.js';

export function createLabel(fieldId, text, isIndex = false) {
    const label = document.createElement('label');
    label.setAttribute('for', fieldId);
    const link = createEditableLink(fieldId, text, isIndex);
    label.appendChild(link);
    return label;
}