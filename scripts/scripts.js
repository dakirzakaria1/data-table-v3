"use strict";

import { projectsArray } from "./data.js";

/* DOM elements */
const projectsCountElement = document.getElementById("projects-count");

/* Functions */
const updateProjectsCount = () => {
  projectsCountElement.textContent = projectsArray.length;
};
updateProjectsCount();
