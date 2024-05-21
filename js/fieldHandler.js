document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.create-field-btn').forEach(button => {
        button.addEventListener('click', () => {
            const parentKey = button.dataset.key;
            handleCreateNewField(parentKey);
        });
    });
});
