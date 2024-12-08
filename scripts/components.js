"use strict";

export const openProjectModalForm = (formType) => {
  createProjectModalForm(formType);
  createModalOverlay("add");
};

const createModalOverlay = (actionType) => {
  const modalOverlay = document.createElement("div");
  modalOverlay.id = "modal-overlay";
  const baseClass = "modal-overlay";
  const opacityClass = actionType === "add" ? "opacity-50" : "opacity-10";
  const backgroundColorClass = actionType === "add" ? "bg-black" : "bg-red-500";
  modalOverlay.classList.add(baseClass, opacityClass, backgroundColorClass);
  document.body.appendChild(modalOverlay);
};

const createProjectModalForm = (formType) => {
  const form = document.createElement("form");
  form.id = "project-modal-form";
  form.classList.add("project-modal-form");
  form.appendChild(createModalFormTitle(formType));
  form.appendChild(createModalFormButtons(formType));
  document.body.appendChild(form);
};

const createModalFormTitle = (formType) => {
  const title = document.createElement("h2");
  title.classList.add("modal-form-title");
  title.textContent = formType === "add" ? "Add New Project" : "Edit Project";
  return title;
};

const createModalFormButtons = (formType) => {
  const container = document.createElement("div");
  container.id = "modal-form-buttons";
  container.classList.add("modal-form-buttons");
  container.innerHTML = `
  <button type="button" id="cancel-modal-button" class="button secondary-button">Cancel</button>
  <button type="submit" id="submit-modal-button" class="button primary-button">${
    formType === "add" ? "Add Project" : "Save Changes"
  }</button>
  `;
  return container;
};

