document.getElementById('generateForm').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        const form = document.getElementById('jsonForm');
        form.innerHTML = '';
        generateFormFields(jsonObject, form);
    } catch (e) {
        alert('JSON inválido');
    }
});

document.getElementById('updateJson').addEventListener('click', function() {
    const form = document.getElementById('jsonForm');
    const updatedJson = updateJsonFromForm(form);
    document.getElementById('jsonInput').value = JSON.stringify(updatedJson, null, 2);
});
