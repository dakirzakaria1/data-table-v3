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
  {
    id: 3,
    name: "Tarius landing page",
    isArchived: true,
    status: "On Hold",
  },
  {
    id: 4,
    name: "Rugops App",
    isArchived: true,
    status: "At Risk",
  },
  {
    id: 5,
    name: "Erketu",
    isArchived: true,
    status: "At Risk",
  },
  {
    id: 6,
    name: "Capricorn",
    isArchived: true,
    status: "At Risk",
  },
  {
    id: 7,
    name: "Sagittarius",
    isArchived: true,
    status: "At Risk",
  },
  {
    id: 8,
    name: "Gemini",
    isArchived: true,
    status: "At Risk",
  },
  {
    id: 9,
    name: "Pisces",
    isArchived: true,
    status: "At Risk",
  },
  {
    id: 10,
    name: "Taurus",
    isArchived: true,
    status: "At Risk",
  },
  {
    id: 11,
    name: "Osiris",
    isArchived: false,
    status: "On Hold",
  },
  {
    id: 12,
    name: "Horus",
    isArchived: false,
    status: "On Hold",
  },
  {
    id: 13,
    name: "Hathor",
    isArchived: false,
    status: "On Hold",
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
