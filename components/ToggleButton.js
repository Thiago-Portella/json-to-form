// components/ToggleButton.js
export function createToggleButton(text, parentKey, onClick) {
    parentKey = parentKey.split('__FIELD__').pop();
    const button = document.createElement('button');
    button.textContent = `${text} ${parentKey}`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', button.textContent);
    button.addEventListener('click', onClick);
    return button;
}
