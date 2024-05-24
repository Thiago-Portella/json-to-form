// components/Button.js
export function createButton(text, ariaLabel, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', ariaLabel);
    button.addEventListener('click', onClick);
    return button;
}