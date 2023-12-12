export default class CreatedHTML {
  constructor(element) {
    if (typeof element === "string") {
      this.element = document.querySelector(element);
    }
    this.fieldsContainer = this.element.querySelector(".fields-container");
  }

  createLabel() {
    const label = document.createElement("label");
    label.classList.add("label");

    const ibputCheckbox = document.createElement("input");
    ibputCheckbox.setAttribute("type", "checkbox");
    ibputCheckbox.classList.add("checkbox");

    const spanFake = document.createElement("span");
    spanFake.classList.add("fake");

    label.appendChild(ibputCheckbox);
    label.appendChild(spanFake);

    return label;
  }

  createInformation(text, textAdditional) {
    const divInformation = document.createElement("div");
    divInformation.classList.add("information");

    const divMainInformation = document.createElement("div");
    divMainInformation.classList.add("main-information");
    divMainInformation.textContent = text;

    const divAdditionalInformation = document.createElement("div");
    divAdditionalInformation.classList.add("additional-information");
    divAdditionalInformation.classList.add("invisible");
    divAdditionalInformation.textContent = textAdditional;

    divInformation.appendChild(divMainInformation);
    divInformation.appendChild(divAdditionalInformation);

    return divInformation;
  }

  createButtons() {
    const divButtons = document.createElement("div");
    divButtons.classList.add("buttons");

    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("edit");

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("delete");

    divButtons.appendChild(buttonEdit);
    divButtons.appendChild(buttonDelete);

    return divButtons;
  }

  createdField(id, text, textAdditional) {
    const divField = document.createElement("div");
    divField.setAttribute("id", id);
    divField.classList.add("field");

    const label = this.createLabel();
    divField.appendChild(label);

    const information = this.createInformation(text, textAdditional);
    divField.appendChild(information);

    const buttons = this.createButtons();
    divField.appendChild(buttons);

    this.fieldsContainer.appendChild(divField);
  }
}
