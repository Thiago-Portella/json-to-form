// components/ToggleButton.js
export function createToggleButton(text, parentKey, onClick) {
    const displayName = parentKey.split('__FIELD__').join('.');
    const button = document.createElement('button');
    button.textContent = `${text} ${displayName}`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', button.textContent);
    button.addEventListener('click', onClick);
    return button;
}
