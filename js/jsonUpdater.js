function updateJsonFromForm(form) {
    const updatedJson = {};
    const elements = form.querySelectorAll('input');
    elements.forEach(element => {
        const keys = element.id.split('_');
        let current = updatedJson;
        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                if (element.type === 'checkbox') {
                    current[key] = element.checked;
                } else if (element.type === 'text' && element.getAttribute('pattern') === '[0-9]*\\.?[0-9]*') {
                    current[key] = element.value.includes('.') ? parseFloat(element.value) : parseInt(element.value);
                } else {
                    current[key] = element.value;
                }
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
