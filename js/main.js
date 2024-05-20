document.getElementById('generateForm').addEventListener('click', handleGenerateForm);
document.getElementById('updateJson').addEventListener('click', handleUpdateJson);

function handleGenerateForm() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        const form = document.getElementById('jsonForm');
        form.innerHTML = '';
        generateFormFields(jsonObject, form);
    } catch (e) {
        alert('JSON inválido');
    }
}

function handleUpdateJson() {
    const form = document.getElementById('jsonForm');
    const updatedJson = updateJsonFromForm(form);
    document.getElementById('jsonInput').value = JSON.stringify(updatedJson, null, 2);
}
