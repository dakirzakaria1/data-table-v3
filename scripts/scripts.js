"use strict";

import { projectsArray } from "./data.js";
import { openProjectModalForm, createProjectNameCell } from "./components.js";

/* DOM elements */
const projectsCountElement = document.getElementById("projects-count");
const projectSearchInput = document.getElementById("project-search-input");
const createProjectButton = document.getElementById("create-project-button");
const projectsWrapper = document.getElementById("projects-wrapper");

/* State Variables */
let currentSearchTerm = "";

/* Functions */
const updateProjectsCount = () => {
  projectsCountElement.textContent = projectsArray.length;
};
updateProjectsCount();

const searchProjects = (searchTerm) => {
  let searchedProjects = projectsArray.filter((project) =>
    project.name.toLowerCase().includes(searchTerm)
  );
  renderProjects(searchedProjects);
};

const renderProjects = (array) => {
  let projectsToRender = array;
  projectsWrapper.innerHTML = "";
  if (projectsToRender.length > 0) {
    projectsToRender.forEach((project) => {
      const projectRow = document.createElement("tr");
      projectRow.classList.add(
        "project-row",
        "odd:border-y",
        "odd:border-[#E9EDF5]",
        "px-2.5",
        "py-3"
      );
      projectRow.appendChild(createProjectNameCell(project.name));
      projectsWrapper.appendChild(projectRow);
    });
  } else {
    projectsWrapper.innerHTML = `<tr class="w-full"><td class="text-center text-sm text-gray-900 py-3" colspan="100%">No projects found.</td></tr>`;
  }
};
renderProjects(projectsArray);

/* Event listeners */
projectSearchInput.addEventListener("input", () => {
  currentSearchTerm = projectSearchInput.value.trim().toLowerCase();
  searchProjects(currentSearchTerm);
});

createProjectButton.addEventListener("click", () => {
  openProjectModalForm("add");
});
