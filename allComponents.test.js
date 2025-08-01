import assert from 'assert';
import { JSDOM } from 'jsdom';
import { createButton } from './components/Button.js';
import { createCheckboxField } from './components/CheckboxField.js';
import { createNumberField } from './components/NumberField.js';
import { createTextField } from './components/TextField.js';
import { createInputField } from './components/InputField.js';
import { createToggleButton } from './components/ToggleButton.js';
import { createLabel } from './components/Label.js';
import { createObjectFields } from './components/CreateObjectField.js';
import { createListFields } from './components/CreateListField.js';
import { createEmptyListField } from './components/CreateEmptyListField.js';
import { generateFormFields } from './components/formGenerator.js';
import { updateJsonFromForm } from './components/jsonUpdater.js';
import { updateElementIds } from './components/EditableLink.js';
import RuntimeDatabase from './components/runtimeDatabase.js';

const dom = new JSDOM('<html><body><form id="jsonForm"></form><div id="LOG_LEVEL"></div></body></html>', { url: 'http://localhost' });

global.window = dom.window;
global.document = dom.window.document;

const form = document.getElementById('jsonForm');

// Testes básicos dos utilitários de criação
const btn = createButton('Clique', () => {});
assert.strictEqual(btn.textContent, 'Clique');

const check = createCheckboxField('boolField', true);
check.dispatchEvent(new dom.window.Event('change'));
assert.ok(check.checked);

const num = createNumberField('numField', 5);
num.value = '123abc';
num.dispatchEvent(new dom.window.Event('input'));
assert.strictEqual(num.value, '123');

const text = createTextField('textField', 'abc');
assert.strictEqual(text.value, 'abc');

const inBool = createInputField('inputBool', false, 'boolean');
assert.strictEqual(inBool.type, 'checkbox');

const inNum = createInputField('inputNum', 3, 'number');
assert.strictEqual(inNum.type, 'text');

const inText = createInputField('inputText', 'x', 'string');
assert.strictEqual(inText.value, 'x');

const toggle = createToggleButton('Expandir Objeto', 'obj', () => {});
assert.ok(toggle.dataset.toggleName === 'obj');

const label = createLabel('textField', 'texto');
assert.ok(label.querySelector('a'));

// Testes de criação de campos complexos
createObjectFields(form, 'obj', { a: 1 });
createListFields(form, 'lista', [1, 2]);
createEmptyListField(form, 'vazia');

// Geração de formulário completa
generateFormFields({ s: '1', n: 2, b: false, obj: { c: 'd' }, lista: [3] }, form);

// Renomeação e banco de dados
updateElementIds(form, 'obj', 'novo');
RuntimeDatabase.create('teste', 'valor');
assert.strictEqual(RuntimeDatabase.read('teste'), 'valor');
RuntimeDatabase.update('teste', 'v2');
assert.strictEqual(RuntimeDatabase.getAll().teste, 'v2');

const updated = updateJsonFromForm(form);
assert.ok(updated.novo);

console.log('Todos os testes de componentes passaram');
