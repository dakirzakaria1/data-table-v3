"use strict";

import { projectsArray } from "./data.js";
import { openProjectModalForm } from "./components.js";

/* DOM elements */
const projectsCountElement = document.getElementById("projects-count");
const projectSearchInput = document.getElementById("project-search-input");
const createProjectButton = document.getElementById("create-project-button");

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
  console.table(searchedProjects);
};

/* Event listeners */
projectSearchInput.addEventListener("input", () => {
  currentSearchTerm = projectSearchInput.value.trim().toLowerCase();
  searchProjects(currentSearchTerm);
});

createProjectButton.addEventListener("click", () => {
  openProjectModalForm("add");
});
