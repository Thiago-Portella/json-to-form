document.getElementById('createRootField').addEventListener('click', () => {
    const form = document.getElementById('jsonForm');
    createFieldCreationSection(form);
});

function addFieldCreationListeners() {
    document.querySelectorAll('.add-field-button').forEach(button => {
        button.addEventListener('click', function() {
            const parentKey = button.dataset.parentKey;
            const parentElement = button.closest('div');
            createFieldCreationSection(parentElement, parentKey);
        });
    });
}

function handleGenerateForm() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        const form = document.getElementById('jsonForm');
        form.innerHTML = '';
        generateFormFields(jsonObject, form);
        addEditDeleteListeners();
        addFieldCreationListeners();
    } catch (e) {
        alert('JSON inválido');
    }
}

function handleUpdateJson() {
    const form = document.getElementById('jsonForm');
    const updatedJson = updateJsonFromForm(form);
    document.getElementById('jsonInput').value = JSON.stringify(updatedJson, null, 2);
    handleGenerateForm(); // Recria o formulário a partir do JSON atualizado
}
