const fieldTypeSelect = document.getElementById('fieldType');
const noOfRadioButtonsContainer = document.getElementById(
  'noOfRadioButtonsContainer'
);
const noOfRadioButtons = document.getElementById('noOfRadioButtons');
const fieldRelatedContent = document.getElementById('fieldRelatedContent');
const addFieldButton = document.getElementById('addField');
const formPreview = document.getElementById('dynamicForm');

let formFields = [];

fieldTypeSelect.addEventListener('change', function () {
  fieldRelatedContent.innerHTML = '';

  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'text';

  switch (fieldTypeSelect.value) {
    case 'text':
      label.textContent = 'Enter Text Label:';
      input.placeholder = 'Enter Label for Text Field';
      noOfRadioButtonsContainer.style.display = 'none';
      break;

    case 'checkbox':
      label.textContent = 'Enter Checkbox Label:';
      input.placeholder = 'Enter Label for Checkbox';
      noOfRadioButtonsContainer.style.display = 'none';
      break;

    case 'radio':
      label.textContent = 'Enter Radio Group Label:';
      input.placeholder = 'Enter Label for Radio Buttons';
      noOfRadioButtonsContainer.style.display = 'block';
      break;
  }

  fieldRelatedContent.appendChild(label);
  fieldRelatedContent.appendChild(input);
});

// Function to update the Form Preview
function updateFormPreview() {
  formPreview.innerHTML = ''; // Clear existing preview
  formFields.forEach((field) => {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.classList.add('preview-field');

    const label = document.createElement('label');
    label.textContent = field.label;

    let input;
    if (field.type === 'radio') {
      const radioContainer = document.createElement('div');
      field.options.forEach((option) => {
        const radioWrapper = document.createElement('div');
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = field.label;
        radioInput.disabled = true;

        const radioLabel = document.createElement('span');
        radioLabel.textContent = option;

        radioWrapper.appendChild(radioInput);
        radioWrapper.appendChild(radioLabel);
        radioContainer.appendChild(radioWrapper);
      });
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(radioContainer);
    } else {
      input = document.createElement('input');
      input.type = field.type === 'checkbox' ? 'checkbox' : 'text';
      input.disabled = true;

      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);
    }

    formPreview.appendChild(fieldWrapper);
  });
}

addFieldButton.addEventListener('click', function () {
  const fieldLabel = fieldRelatedContent.querySelector('input').value.trim();

  if (!fieldLabel) {
    alert('Please enter a label!');
    return;
  }

  const fieldType = fieldTypeSelect.value;
  const newField = { type: fieldType, label: fieldLabel };

  if (fieldType === 'radio') {
    newField.options = [];
    const num = parseInt(noOfRadioButtons.value, 10);
    for (let i = 1; i <= num; i++) {
      newField.options.push(`Option ${i}`);
    }
  }

  formFields.push(newField);
  updateFormPreview();
});
