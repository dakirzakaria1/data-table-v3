"use strict";

export let projectsArray = JSON.parse(
  localStorage.getItem("projectsArray")
) || [
  {
    id: 1,
    name: "Allosaurus web app",
  },
  {
    id: 2,
    name: "MicroRaptor website",
  },
];
