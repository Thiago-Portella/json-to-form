function updateJsonFromForm(form) {
    const updatedJson = {};
    const elements = form.querySelectorAll('input');
    elements.forEach(element => {
        const keys = element.id.split('__FIELD__');
        let current = updatedJson;
        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                current[key] = parseElementValue(element);
            } else {
                if (!current[key]) {
                    current[key] = isNaN(keys[index + 1]) ? {} : [];
                }
                current = current[key];
            }
        });
    });
    return updatedJson;
}

function parseElementValue(element) {
    if (element.type === 'checkbox') {
        return element.checked;
    } else if (element.type === 'text' && element.getAttribute('pattern') === '[0-9]*\\.?[0-9]*') {
        return element.value.includes('.') ? parseFloat(element.value) : parseInt(element.value);
    } else {
        return element.value;
    }
}
