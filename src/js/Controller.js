import CommunicationServer from "./CommunicationServer";
import CreatedHTML from "./CreatedHTML";

export default class Controller {
  constructor(element) {
    if (typeof element === "string") {
      this.element = document.querySelector(element);
      this.createHtml = new CreatedHTML(element);
    }

    this.loader = this.element.querySelector(".loader");
    this.confirmDeletion = this.element.querySelector(".confirm-deletion");
    this.form = this.element.querySelector(".create-form");
    this.formUpdate = this.element.querySelector(".update-form");
    this.checkBox = this.element.querySelector(".checkbox");

    this.controllAllButtonClick = this.controllAllButtonClick.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.checkBoxSubmit = this.checkBoxSubmit.bind(this);

    this.drawingDOM();

    this.element.addEventListener("click", this.controllAllButtonClick);
    this.form.addEventListener("submit", this.formSubmit);
    this.element.addEventListener("change", this.checkBoxSubmit);
  }

  drawingDOM() {
    const fields = this.element.querySelector(".fields");
    this.loader.classList.remove("invisible");
    if (!fields) {
      ;(async () => {
        let fieldsResponse = await CommunicationServer.all();
        if (fieldsResponse) {
          for (let t of fieldsResponse) {
            this.createHtml.createdField(t.id, t.name, t.description);
          }
        }
        this.loader.classList.add("invisible");
      })();
    }
  }

  checkBoxSubmit(e) {
    if (e.target.classList.contains("checkbox")) {
      const id = e.target.closest(".field").id;
      const form = new FormData();
      form.set("status", e.target.checked);
      this.loader.classList.remove("invisible");
      ;(async () => {
        const res = await CommunicationServer.update(id, form);

        if (res.status != String(e.target.checked)) {
          console.log("ИЗМЕНЕНИЕ НЕ ПЕРЕДАЛОСЬ!!!");
        }
        this.loader.classList.add("invisible");
      })();
    }
  }

  deleteField(eventYesNo, id, event) {
    if (eventYesNo.target.classList.contains("yes")) {
      this.loader.classList.remove("invisible");
      ;(async () => {
        const res = await CommunicationServer.delete(id);
        if (res.status == "ok") {
          console.log("Delete el");
          event.target.closest(".field").remove();
        }
        this.loader.classList.add("invisible");
      })();
    }
    this.confirmDeletion.classList.add("invisible");
    this.confirmDeletion.removeEventListener(
      "click",
      this.listenerConfirmDeletion
    );
  }

  formSubmitUpdate(e, field) {
    e.preventDefault();
    const id = field.id;
    this.loader.classList.remove("invisible");
    ;(async () => {
      const formFildUpdate = new FormData(this.formUpdate);
      const res = await CommunicationServer.update(id, formFildUpdate);

      if (res.id) {
        field.querySelector(".main-information").textContent = res.name;
        field.querySelector(".additional-information").textContent =
          res.description;
        this.loader.classList.add("invisible");
      }
    })();

    this.formUpdate.reset();
    this.formUpdate.classList.add("invisible");
    this.formUpdate.removeEventListener("submit", this.listenerFormUpdate);
  }

  formSubmit(e) {
    e.preventDefault();

    this.loader.classList.remove("invisible");
    ;(async () => {
      const formFild = new FormData(this.form);
      const res = await CommunicationServer.create(formFild);
      this.createHtml.createdField(res.id, res.name, res.description);

      this.loader.classList.add("invisible");
    })();

    this.form.reset();
    this.form.classList.add("invisible");
  }

  controllAllButtonClick(e) {
    if (e.target.classList.contains("edit")) {
      const field = e.target.closest(".field");
      this.formUpdate.classList.remove("invisible");

      const name = field.querySelector(".main-information").textContent;
      const description = field.querySelector(
        ".additional-information"
      ).textContent;

      this.formUpdate.querySelector(".name").value = name;
      this.formUpdate.querySelector(".description").value = description;

      this.listenerFormUpdate = (event) => this.formSubmitUpdate(event, field);
      this.formUpdate.addEventListener("submit", this.listenerFormUpdate);
    }

    if (e.target.classList.contains("delete")) {
      this.confirmDeletion.classList.remove("invisible");

      this.id = e.target.closest(".field").id;
      this.listenerConfirmDeletion = (eventYesNo) =>
        this.deleteField(eventYesNo, this.id, e);

      this.confirmDeletion.addEventListener(
        "click",
        this.listenerConfirmDeletion
      );
    }

    if (e.target.classList.contains("add-button")) {
      this.form.classList.remove("invisible");
    }

    if (e.target.classList.contains("button-cansel")) {
      e.preventDefault();
      const needForm =
        e.target.closest(".update-form") || e.target.closest(".create-form");
      needForm.classList.add("invisible");
    }

    if (e.target.classList.contains("main-information")) {
      e.target
        .closest(".information")
        .querySelector(".additional-information")
        .classList.toggle("invisible");
    }
  }
}
