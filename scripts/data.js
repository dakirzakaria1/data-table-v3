"use strict";

export let projectsArray = JSON.parse(
  localStorage.getItem("projectsArray")
) || [
  {
    id: 1,
    name: "Allosaurus web app",
    manager: "Leo Gouse",
    isSelected: false,
    isArchived: false,
    status: "On Hold",
    lastUpdated: "15 Mar 2021, 12:47 PM",
    resources: ["UX/UI Design", "Frontend"],
    timeLine: {
      start: "15 Mar 2021",
      end: "15 Aug 2021",
    },
    estimation: 100500,
  },
  {
    id: 2,
    name: "MicroRaptor website",
    manager: "Leo Gouse",
    isSelected: false,
    isArchived: false,
    status: "At Risk",
    lastUpdated: "11 Mar 2022, 12:47 PM",
    resources: ["UX/UI Design", "Frontend", "Backend", "Full Stack"],
    timeLine: {
      start: "11 Mar 2022",
      end: "15 Aug 2021",
    },
    estimation: 10000,
  },
  {
    id: 3,
    name: "Tarius landing page",
    manager: "Tatiana Dias",
    isSelected: false,
    isArchived: true,
    status: "On Hold",
    lastUpdated: "15 Mar 2021, 01:47 PM",
    resources: ["UX/UI Design"],
    timeLine: {
      start: "15 Mar 2021",
      end: "15 Aug 2023",
    },
    estimation: 40000,
  },
  {
    id: 4,
    name: "Rugops App",
    manager: "Leo Gouse",
    isSelected: false,
    isArchived: true,
    status: "At Risk",
    lastUpdated: "15 Mar 2024, 12:47 PM",
    resources: [
      "UX/UI Design",
      "Frontend",
      "Backend",
      "Full Stack",
      "Web Designer",
    ],
    timeLine: {
      start: "15 Mar 2024",
      end: "15 Aug 2021",
    },
    estimation: 105000,
  },
  {
    id: 5,
    name: "Erketu",
    manager: "Leo Gouse",
    isSelected: false,
    isArchived: true,
    status: "At Risk",
    lastUpdated: "15 Mar 2018, 12:47 PM",
    resources: ["UX/UI Design", "Frontend", "Backend"],
    timeLine: {
      start: "15 Mar 2018",
      end: "15 Aug 2019",
    },
    estimation: 100,
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
