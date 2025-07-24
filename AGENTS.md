# Repository Overview

This project provides a web-based tool that converts JSON objects into editable HTML forms. It lets users view, modify and generate updated JSON from the form. The repository contains only client-side code written in **HTML**, **CSS**, and **JavaScript** using ES module syntax.

The main functionalities are:
- Parse a JSON string into a nested form structure (objects, arrays and primitive values).
- Allow editing each field via text/number/checkbox inputs.
- Expand or collapse objects and lists with accessible labels.
- Add or remove fields through UI controls.
- After editing, convert the form back to JSON.

## Project Structure

- **index.html** – Static HTML page with a textarea for JSON, buttons to generate or update the form, a `<form>` container and a log area.
- **main.js** – Entry point that waits for `DOMContentLoaded` and calls `initializeForm` from `components/FormInitializer.js`.
- **css/styles.css** – Styles for the page and form controls.
- **components/** – Collection of ES modules implementing all UI elements and helpers:
  - `Button.js` – Utility to create a `<button>` element (`createButton(text, onClick)`).
  - `CheckboxField.js` – Builds a checkbox input field.
  - `NumberField.js` – Builds an input restricted to numeric values.
  - `TextField.js` – Builds a standard text input field.
  - `InputField.js` – Chooses which of the above field types to create based on a value type and registers the id in `runtimeDatabase`.
  - `ToggleButton.js` – Creates buttons used to expand/collapse lists and objects with accessible labels.
  - `CreateObjectField.js` – Generates nested forms for object values.
  - `CreateListField.js` – Generates nested forms for array values and includes a helper to append new list entries.
  - `CreateEmptyListField.js` – Provides a button to add an item to an empty list.
  - `Label.js` – Produces a `<label>` element containing an editable link.
  - `EditableLink.js` – Builds a link that shows edit/delete controls for field names; uses `runtimeDatabase` to resolve ids.
  - `FieldCreationSection.js` – Interface for creating new fields (type selector, name input, Save/Cancel buttons).
  - `FieldHandlers.js` – Utility functions for attaching listeners to elements created above.
  - `formGenerator.js` – Core routine that walks a JSON object and builds the complete set of form elements recursively.
  - `jsonUpdater.js` – Reads the form inputs and recreates a JSON object.
  - `FormInitializer.js` – Coordinates form generation and update actions; uses `LogLevelComponent` for debug output.
  - `LogLevelComponent.js` – Simple in-browser logging facility.
  - `runtimeDatabase.js` – Tiny runtime key/value store (create/read/update/getAll) used to cache ids of fields.

## Known Issues

- `createButton` now accepts only `(text, onClick)`, but `FieldCreationSection.js` and `CreateEmptyListField.js` still call it with three parameters. The extra argument is ignored and may indicate outdated code.
- `FieldCreationSection.js` references `addFieldToForm` which is not defined anywhere in the current codebase, so adding new fields is likely broken.
- `CreateListField.js` uses `createFieldCreationSection` but lacks an import statement.
- `EditableLink.js` attempts `RuntimeDatabase.update(fieldId,)` without providing the new value. This will throw an error when executed.
- Many click handlers rely on the global `event` variable rather than receiving the event object as an argument.

## Usage

Open `index.html` in a browser. Enter a JSON document in the textarea and click **Gerar Formulário** to view the generated form. After editing, press **Atualizar JSON** to see the updated JSON in the textarea. The optional log area (#LOG_LEVEL) displays debug messages.

No server-side components or build steps are required. The project can be served with any static HTTP server.

