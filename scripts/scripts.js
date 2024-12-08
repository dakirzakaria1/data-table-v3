"use strict";

import { projectsArray, filterTabsArray } from "./data.js";
import { openProjectModalForm, createProjectNameCell } from "./components.js";

/* DOM elements */
const projectsCountElement = document.getElementById("projects-count");
const projectSearchInput = document.getElementById("project-search-input");
const createProjectButton = document.getElementById("create-project-button");
const filterTabsList = document.getElementById("filter-tabs-list");
const projectsWrapper = document.getElementById("projects-wrapper");

/* State Variables */
let currentSearchTerm = "";
let selectedFilter = "All";

/* Functions */
const updateProjectsCount = () => {
  projectsCountElement.textContent = projectsArray.length;
};
updateProjectsCount();

const filterProjectsByStatus = (status) => {
  switch (status) {
    case "All":
      return projectsArray;
    case "Archived":
      return projectsArray.filter((project) => project.isArchived);
    default:
      return projectsArray.filter((project) => project.status === status);
  }
};

const countFilteredProjects = (status) => filterProjectsByStatus(status).length;

const renderFilterTabs = () => {
  filterTabsList.innerHTML = "";
  filterTabsArray.forEach((status) => {
    const statusElement = document.createElement("li");
    statusElement.innerHTML = `  
    <button type="button" class="filter-tab ${
      status === selectedFilter ? "active" : ""
    }">
      ${status}<span>${countFilteredProjects(status)}</span>
    </button>
    `;
    filterTabsList.appendChild(statusElement);
    const filterTab = statusElement.querySelector(".filter-tab");
    filterTab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach((tab) => {
        tab.classList.remove("active");
      });
      filterTab.classList.add("active");
      selectedFilter = status;
      let filteredProjects = filterProjectsByStatus(status);
      renderProjects(filteredProjects);
      searchProjects(currentSearchTerm);
    });
  });
};
renderFilterTabs();

const searchProjects = (searchTerm) => {
  const filteredProjects = filterProjectsByStatus(selectedFilter);
  const searchedProjects = filteredProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm)
  );
  renderProjects(searchedProjects);
};

const renderProjects = (filteredProjects = projectsArray) => {
  let projectsToRender = filteredProjects;
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
renderProjects();

/* Event listeners */
projectSearchInput.addEventListener("input", () => {
  currentSearchTerm = projectSearchInput.value.trim().toLowerCase();
  searchProjects(currentSearchTerm);
});

createProjectButton.addEventListener("click", () => {
  openProjectModalForm("add");
});
