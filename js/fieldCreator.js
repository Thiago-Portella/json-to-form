function createNewFieldButton(parentKey) {
    const button = document.createElement('button');
    button.textContent = `Criar novo campo em ${parentKey}`;
    button.setAttribute('type', 'button');
    button.classList.add('create-field-btn');
    button.addEventListener('click', () => handleCreateNewField(parentKey));
    return button;
}

function handleCreateNewField(parentKey) {
    const parentElement = document.querySelector(`[data-key="${parentKey}"]`);
    const parentType = parentElement.dataset.type;

    if (parentType === 'object') {
        createNewObjectField(parentElement, parentKey);
    } else if (parentType === 'array') {
        createNewArrayField(parentElement, parentKey);
    }
}

function createNewObjectField(parentElement, parentKey) {
    const fieldType = prompt('Digite o tipo do novo campo (number, object, list, boolean, string):');
    const fieldName = prompt('Digite o nome do novo campo:');
    const fieldId = `${parentKey}__FIELD__${fieldName}`;
    let fieldValue;

    switch (fieldType) {
        case 'number':
            fieldValue = 0;
            break;
        case 'object':
            fieldValue = {};
            break;
        case 'list':
            fieldValue = [];
            break;
        case 'boolean':
            fieldValue = false;
            break;
        case 'string':
            fieldValue = '';
            break;
        default:
            alert('Tipo inválido!');
            return;
    }

    const fieldContainer = document.createElement('div');
    fieldContainer.dataset.key = fieldId;
    fieldContainer.dataset.type = fieldType === 'list' ? 'array' : fieldType;
    generateFormFields({ [fieldName]: fieldValue }, fieldContainer, parentKey);
    parentElement.insertBefore(fieldContainer, parentElement.querySelector('.create-field-btn'));
}

function createNewArrayField(parentElement, parentKey) {
    const existingFields = parentElement.querySelectorAll('[data-key^="' + parentKey + '"]');
    let fieldType = 'string';
    let fieldValue = '';

    if (existingFields.length > 0) {
        const lastField = existingFields[existingFields.length - 1];
        fieldType = lastField.dataset.type;
        switch (fieldType) {
            case 'number':
                fieldValue = 0;
                break;
            case 'object':
                fieldValue = {};
                break;
            case 'array':
                fieldValue = [];
                break;
            case 'boolean':
                fieldValue = false;
                break;
            case 'string':
                fieldValue = '';
                break;
        }
    } else {
        fieldType = prompt('Digite o tipo do novo campo (number, object, list, boolean, string):');
        switch (fieldType) {
            case 'number':
                fieldValue = 0;
                break;
            case 'object':
                fieldValue = {};
                break;
            case 'list':
                fieldValue = [];
                break;
            case 'boolean':
                fieldValue = false;
                break;
            case 'string':
                fieldValue = '';
                break;
            default:
                alert('Tipo inválido!');
                return;
        }
    }

    const fieldIndex = existingFields.length;
    const fieldId = `${parentKey}__FIELD__${fieldIndex}`;
    const fieldContainer = document.createElement('div');
    fieldContainer.dataset.key = fieldId;
    fieldContainer.dataset.type = fieldType === 'list' ? 'array' : fieldType;
    generateFormFields({ [fieldIndex]: fieldValue }, fieldContainer, parentKey);
    parentElement.insertBefore(fieldContainer, parentElement.querySelector('.create-field-btn'));
}
