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

export const createProjectNameCell = (projectName) => {
  const cell = document.createElement("td");
  cell.classList.add("px-2.5", "py-3");
  cell.innerHTML = `
  <a href="#" target="_blank" class="text-indigo-500 text-sm font-medium hover:underline inline-flex items-center gap-2 group ">
    ${projectName}
    <svg width="13.999756" height="14.000000" viewBox="0 0 13.9998 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="hidden group-hover:block">
      <path id="icon" d="M7.75 0C7.33 0 7 0.33 7 0.75C7 1.16 7.33 1.5 7.75 1.5L11.43 1.5L6.46 6.46C6.17 6.76 6.17 7.23 6.46 7.53C6.76 7.82 7.23 7.82 7.53 7.53L12.49 2.56L12.49 6.25C12.49 6.66 12.83 7 13.24 7C13.66 7 13.99 6.66 13.99 6.25L13.99 0.75C13.99 0.33 13.66 0 13.24 0L7.75 0ZM6 2.25C6 1.83 5.66 1.5 5.25 1.5L2 1.5C0.89 1.5 0 2.39 0 3.5L0 12C0 13.1 0.89 14 2 14L10.5 14C11.6 14 12.5 13.1 12.5 12L12.5 8.75C12.5 8.33 12.16 8 11.75 8C11.33 8 11 8.33 11 8.75L11 12C11 12.27 10.77 12.5 10.5 12.5L2 12.5C1.72 12.5 1.5 12.27 1.5 12L1.5 3.5C1.5 3.22 1.72 3 2 3L5.25 3C5.66 3 6 2.66 6 2.25Z" fill="#868FA0" fill-opacity="1.000000" fill-rule="evenodd"/>
    </svg>
  </a>
  `;
  return cell;
};
