# Visão Geral do Repositório

Este projeto fornece uma ferramenta web que converte objetos JSON em formulários HTML editáveis. Ela permite que os usuários visualizem, modifiquem e gerem JSON atualizado a partir do formulário. O repositório contém apenas código do lado do cliente escrito em **HTML**, **CSS** e **JavaScript** usando a sintaxe do módulo ES.

As principais funcionalidades são:
- Analisar uma string JSON em uma estrutura de formulário aninhada (objetos, arrays e valores primitivos).
- Permitir a edição de cada campo por meio de entradas de texto/número/caixa de seleção.
- Expandir ou recolher objetos e listas com rótulos acessíveis.
- Adicionar ou remover campos por meio de controles de interface do usuário.
- Após a edição, converter o formulário novamente para JSON.

## Estrutura do Projeto

- **index.html** – Página HTML estática com uma área de texto para JSON, botões para gerar ou atualizar o formulário, um contêiner `<form>` e uma área de log.

- **main.js** – Ponto de entrada que aguarda `DOMContentLoaded` e chama `initializeForm` de `components/FormInitializer.js`.
- **css/styles.css** – Estilos para os controles de página e formulário.
- **components/** – Coleção de módulos ES que implementam todos os elementos e auxiliares da interface do usuário:
- `Button.js` – Utilitário para criar um elemento `<button>` (`createButton(text, onClick)`).
- `CheckboxField.js` – Cria um campo de entrada de caixa de seleção.
- `NumberField.js` – Cria uma entrada restrita a valores numéricos.
- `TextField.js` – Cria um campo de entrada de texto padrão.
- `InputField.js` – Escolhe qual dos tipos de campo acima criar com base em um tipo de valor e registra o ID em `runtimeDatabase`.
- `ToggleButton.js` – Cria botões usados para expandir/recolher listas e objetos com rótulos acessíveis.
- `CreateObjectField.js` – Gera formulários aninhados para valores de objetos.
- `CreateListField.js` – Gera formulários aninhados para valores de array e inclui um auxiliar para anexar novas entradas de lista.
- `CreateEmptyListField.js` – Fornece um botão para adicionar um item a uma lista vazia.
- `Label.js` – Produz um elemento `<label>` contendo um link editável.
 - `EditableLink.js` – Cria um link que exibe controles de edição/exclusão para nomes de campos; utiliza `runtimeDatabase` para resolver IDs. A função `updateElementIds` também atualiza botões de expansão criados por `ToggleButton.js`.
- `FieldCreationSection.js` – Interface para criar novos campos (seletor de tipo, entrada de nome, botões Salvar/Cancelar).
- `FieldHandlers.js` – Funções utilitárias para anexar ouvintes aos elementos criados acima.
- `formGenerator.js` – Rotina principal que percorre um objeto JSON e constrói o conjunto completo de elementos do formulário recursivamente.
- `jsonUpdater.js` – Lê as entradas do formulário e recria um objeto JSON.
- `FormInitializer.js` – Coordena as ações de geração e atualização do formulário; utiliza `LogLevelComponent` para saída de depuração.
- `LogLevelComponent.js` – Recurso simples de registro no navegador.
- `runtimeDatabase.js` – Pequeno repositório de chave/valor em tempo de execução (criar/ler/atualizar/obterTudo) usado para armazenar em cache os IDs dos campos.

## Uso

Abra `index.html` em um navegador. Insira um documento JSON na área de texto e clique em **Gerar Formulário** para visualizar o formulário gerado. Após a edição, clique em **Atualizar JSON** para ver o JSON atualizado na área de texto. A área de log opcional (#LOG_LEVEL) exibe mensagens de depuração.

Não são necessários componentes do lado do servidor nem etapas de compilação. O projeto pode ser servido com qualquer servidor HTTP estático.

## Instruções sobre comunicação

-Sempre que uma mudança for feita na estrutura do projeto, tais quais: Criar novos arquivos, modificar funcionalidades mencionadas aqui, deletar / ajustar trechos de lógica de funcionamento relevantes, etc. Você deve ajustar esse arquivo como apropriado.
- Sua comunicação em mensagens de log, comentários de código, mensagens de commits e prs, deve ser feita em português do Brasil.