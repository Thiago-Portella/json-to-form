import assert from 'assert';
import { JSDOM } from 'jsdom';
import { generateFormFields } from './components/formGenerator.js';
import { updateElementIds } from './components/EditableLink.js';
import RuntimeDatabase from './components/runtimeDatabase.js';

const dom = new JSDOM('<html><body><form id="jsonForm"></form><div id="LOG_LEVEL"></div></body></html>', { url: 'http://localhost' });

global.window = dom.window;
global.document = dom.window.document;

const form = document.getElementById('jsonForm');

generateFormFields({ objeto: { campo: 1 } }, form, '');

let link = form.querySelector('[data-key="objeto"]');
let container = link.closest('div');
updateElementIds(container, 'objeto', 'novoObjeto');

assert.ok(form.querySelector('[data-key="novoObjeto"]'), 'link do objeto nao atualizado');
assert.ok(form.querySelector('[data-toggle-name="novoObjeto"]'), 'botao do objeto nao atualizado');
assert.ok(form.querySelector('#novoObjeto__FIELD__campo'), 'input interno nao atualizado');

link = form.querySelector('[data-key="novoObjeto__FIELD__campo"]');
container = link.closest('div');
updateElementIds(container, 'novoObjeto__FIELD__campo', 'novoCampo');

assert.ok(form.querySelector('[data-key="novoObjeto__FIELD__novoCampo"]'), 'link do campo nao atualizado');
assert.ok(form.querySelector('#novoObjeto__FIELD__novoCampo'), 'input do campo nao atualizado');

console.log('Testes executados com sucesso');
