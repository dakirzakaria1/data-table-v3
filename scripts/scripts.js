"use strict";

import { projectsArray, filterTabsArray } from "./data.js";
import {
  openProjectModalForm,
  createProjectIdCell,
  createProjectNameCell,
  createProjectManagerCell,
  createProjectLastUpdatedCell,
  createProjectResourcesCell,
  createProjectTimeLineCell
} from "./components.js";

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
let rowsPerPage = JSON.parse(localStorage.getItem("rowsPerPage")) || 5;
rowsPerPageSelect.value = rowsPerPage;
let sortKey = "";
let sortOrder = "";

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
      filterTab.classList.add("active");
      selectedFilter = status;
      searchProjects(currentSearchTerm);
    });
  });
};
renderFilterTabs();

const searchProjects = (searchTerm) => {
  currentPage = 1;
  filteredProjects = filterProjectsByStatus(selectedFilter).filter((project) =>
    project.name.toLowerCase().includes(searchTerm)
  );
  if (sortOrder === "asc") {
    filteredProjects.sort((a, b) =>
      compareValues(a[sortKey], b[sortKey], true)
    );
  } else if (sortOrder === "desc") {
    filteredProjects.sort((a, b) =>
      compareValues(a[sortKey], b[sortKey], false)
    );
  } else {
    filteredProjects.sort((a, b) => compareValues(a.id, b.id, true));
  }
  renderProjects(filteredProjects, currentPage, rowsPerPage);
  updatePageInfo(currentPage, rowsPerPage, filteredProjects.length);
};

const test = () => {
  const projectManagerCell = document.createElement("td");
  return projectManagerCell;
};

const renderProjects = (filteredProjects, currentPage, rowsPerPage) => {
  projectsWrapper.innerHTML = "";
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredProjects.length);
  const projectsToRender = filteredProjects.slice(startIndex, endIndex);
  if (projectsToRender.length > 0) {
    projectsToRender.forEach((project) => {
      const projectRow = document.createElement("tr");
      projectRow.classList.add("project-row", "border-y", "border-[#E9EDF5]");
      projectRow.appendChild(createProjectIdCell(project.id));
      projectRow.appendChild(createProjectNameCell(project.name));
      projectRow.appendChild(createProjectManagerCell(project.manager));
      projectRow.appendChild(test());
      projectRow.appendChild(createProjectLastUpdatedCell(project.lastUpdated));
      projectRow.appendChild(createProjectResourcesCell(project.resources));
      projectRow.appendChild(createProjectTimeLineCell(project.timeLine));
      projectsWrapper.appendChild(projectRow);
    });
  } else {
    projectsWrapper.innerHTML = `<tr class="w-full"><td class="text-sm text-gray-900 py-3" colspan="100%">No projects found.</td></tr>`;
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
    totalPages === 0 || totalPages === currentPage
      ? "text-[#687182]"
      : "text-[#171C26]"
  }">${
    totalProjects === 0 ? 0 : currentPage
  }</span><span class="text-[#687182]">/${totalPages}</span>`;
  previousPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages || totalProjects === 0;
};
updatePageInfo(currentPage, rowsPerPage, filteredProjects.length);

const compareValues = (valA, valB, isAscending) => {
  if (typeof valA === "string" && typeof valB === "string") {
    return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
  } else if (Array.isArray(valA) && Array.isArray(valB)) {
    return isAscending ? valA.length - valB.length : valB.length - valA.length;
  } else if (typeof valA === "object" && typeof valB === "object") {
    const startA = new Date(valA.start);
    const startB = new Date(valB.start);
    if (startA.getTime() !== startB.getTime()) {
      return isAscending ? startA - startB : startB - startA;
    }
    const endA = new Date(valA.end);
    const endB = new Date(valB.end);
    return isAscending ? endA - endB : endB - endA;
  } else {
    return isAscending ? valA - valB : valB - valA;
  }
};

const sortProjectsByButton = () => {
  sortButtons.forEach((button) => {
    button.dataset.clickCount = "0";
    button.addEventListener("click", () => {
      sortButtons.forEach((btn) => {
        if (btn !== button) {
          btn.dataset.clickCount = "0";
          btn.dataset.active = "false";
          btn.dataset.order = "none";
          btn.setAttribute("aria-sort", "none");
        }
      });
      let clickCount = parseInt(button.dataset.clickCount, 10) + 1;
      button.dataset.clickCount = clickCount.toString();
      sortKey = button.dataset.sortKey;
      let sortedProjects;
      if (clickCount % 3 === 1) {
        button.dataset.active = "true";
        button.dataset.order = "asc";
        button.setAttribute("aria-sort", "ascending");
        sortOrder = "asc";
        sortedProjects = filteredProjects.sort((a, b) =>
          compareValues(a[sortKey], b[sortKey], true)
        );
      } else if (clickCount % 3 === 2) {
        button.dataset.order = "desc";
        button.setAttribute("aria-sort", "descending");
        sortOrder = "desc";
        sortedProjects = filteredProjects.sort((a, b) =>
          compareValues(a[sortKey], b[sortKey], false)
        );
      } else {
        button.dataset.clickCount = "0";
        button.dataset.active = "false";
        button.dataset.order = "none";
        button.setAttribute("aria-sort", "none");
        sortOrder = "";
        sortedProjects = filteredProjects.sort((a, b) =>
          compareValues(a.id, b.id, true)
        );
      }
      renderProjects(sortedProjects, currentPage, rowsPerPage);
    });
  });
};
sortProjectsByButton();

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
  rowsPerPage = parseInt(selectedValue, 10);
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
