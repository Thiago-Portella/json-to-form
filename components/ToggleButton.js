// components/ToggleButton.js
import { logMessage } from './LogLevelComponent.js';

export function createToggleButton(text, parentKey, onClick) {
    const displayName = parentKey.split('__FIELD__').join('.');
    const button = document.createElement('button');
    button.textContent = `${text} ${displayName}`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', button.textContent);
    const tipo = text.toLowerCase().includes('lista') ? 'lista' : 'objeto';
    button.dataset.toggleType = tipo;
    button.dataset.toggleName = parentKey;
    button.addEventListener('click', () => {
        onClick();
        const estado = button.textContent === 'Expandir' ? 'recolhido' : 'expandido';
        logMessage(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${parentKey} ${estado}`);
    });
    return button;
}
