"use strict";

export let projectsArray = JSON.parse(
  localStorage.getItem("projectsArray")
) || [
  {
    id: 1,
    name: "Allosaurus web app",
    isArchived: false,
    status: "On Hold",
  },
  {
    id: 2,
    name: "MicroRaptor website",
    isArchived: false,
    status: "At Risk",
  },
];

export let filterTabsArray = [
  "All",
  "At Risk",
  "On Hold",
  "Potential Risk",
  "On Track",
  "Archived",
];
