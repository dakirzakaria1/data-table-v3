"use strict";

import { projectsArray, filterTabsArray } from "./data.js";
import { openProjectModalForm, createProjectNameCell } from "./components.js";

/* DOM elements */
const projectsCountElement = document.getElementById("projects-count");
const projectSearchInput = document.getElementById("project-search-input");
const createProjectButton = document.getElementById("create-project-button");
const filterTabsList = document.getElementById("filter-tabs-list");
const projectsWrapper = document.getElementById("projects-wrapper");
const pageInfoElement = document.getElementById("page-info");
const rowsPerPageSelect = document.getElementById("rows-per-page-select");
const previousPageButton = document.getElementById("previous-page");
const nextPageButton = document.getElementById("next-page");
const currentPageElement = document.getElementById("current-page");
const sortButtons = document.querySelectorAll(".sort-button");

/* State Variables */
let currentSearchTerm = "";
let selectedFilter = "All";
let currentPage = 1;
let rowsPerPage = JSON.parse(localStorage.getItem("rowsPerPage")) || 10;
rowsPerPageSelect.value =
  rowsPerPage === projectsArray.length ? "all" : rowsPerPage;

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

let filteredProjects = filterProjectsByStatus(selectedFilter);

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
      sortButtons.forEach((btn) => {
        btn.dataset.clickCount = "0";
        btn.dataset.active = "false";
        btn.dataset.order = "none";
        btn.setAttribute("aria-sort", "none");
      });
      filterTab.classList.add("active");
      selectedFilter = status;
      currentPage = 1;
      filteredProjects = filterProjectsByStatus(status);
      searchProjects(currentSearchTerm);
      renderProjects(filteredProjects, currentPage, rowsPerPage);
      updatePageInfo(currentPage, rowsPerPage, filteredProjects.length);
    });
  });
};
renderFilterTabs();

const searchProjects = (searchTerm) => {
  currentPage = 1;
  filteredProjects = filterProjectsByStatus(selectedFilter).filter((project) =>
    project.name.toLowerCase().includes(searchTerm)
  );
  renderProjects(filteredProjects, currentPage, rowsPerPage);
  updatePageInfo(currentPage, rowsPerPage, filteredProjects.length);
};

const renderProjects = (
  filteredProjects,
  currentPage = 1,
  rowsPerPage = 10
) => {
  projectsWrapper.innerHTML = "";
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredProjects.length);
  const projectsToRender = filteredProjects.slice(startIndex, endIndex);
  if (projectsToRender.length > 0) {
    projectsToRender.forEach((project) => {
      const projectRow = document.createElement("tr");
      projectRow.classList.add(
        "project-row",
        "border-y",
        "border-[#E9EDF5]",
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
renderProjects(filteredProjects, currentPage, rowsPerPage);

const updatePageInfo = (currentPage, rowsPerPage, totalProjects) => {
  const startProject =
    totalProjects === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endProject = Math.min(currentPage * rowsPerPage, totalProjects);
  pageInfoElement.textContent = `${startProject}-${endProject} of ${totalProjects}`;
  const totalPages = Math.ceil(totalProjects / rowsPerPage);
  currentPageElement.innerHTML = `<span class="${
    totalPages === 0 ||
    (totalPages === currentPage && currentPage !== totalPages)
      ? "text-[#687182]"
      : "text-[#171C26]"
  }">${
    totalProjects === 0 ? 0 : currentPage
  }</span><span class="text-[#687182]">/${totalPages}</span>`;
  previousPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages || totalProjects === 0;
};
updatePageInfo(currentPage, rowsPerPage, filteredProjects.length);



/* Event listeners */
projectSearchInput.addEventListener("input", () => {
  currentSearchTerm = projectSearchInput.value.trim().toLowerCase();
  searchProjects(currentSearchTerm);
});

createProjectButton.addEventListener("click", () => {
  openProjectModalForm("add");
});

rowsPerPageSelect.addEventListener("change", (event) => {
  currentPage = 1;
  const selectedValue = event.target.value;
  rowsPerPage =
    selectedValue === "all"
      ? filteredProjects.length
      : parseInt(selectedValue, 10);
  localStorage.setItem("rowsPerPage", JSON.stringify(rowsPerPage));
  renderProjects(filteredProjects, currentPage, rowsPerPage);
  updatePageInfo(currentPage, rowsPerPage, filteredProjects.length);
});

previousPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProjects(filteredProjects, currentPage, rowsPerPage);
    updatePageInfo(currentPage, rowsPerPage, filteredProjects.length);
  }
});

nextPageButton.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderProjects(filteredProjects, currentPage, rowsPerPage);
    updatePageInfo(currentPage, rowsPerPage, filteredProjects.length);
  }
});
