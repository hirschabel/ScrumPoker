function generateRoomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (var i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}

async function fetchProjects(apiKey) {
  const url = "https://redmine.tigra.hu/projects.json?limit=1000";

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(apiKey + ":")}`,
    },
  });

  if (response.status != 200) return [];
  const data = await response.json();

  return data.projects;
}

async function fetchIssues(apiKey, projectId) {
  const url = `https://redmine.tigra.hu/issues.json?project_id=${projectId}`;

  const response = await fetch(url, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(apiKey + ":")}`,
    },
  });
  if (response.status != 200) return [];
  const data = await response.json();

  return data.issues;
}

module.exports = {
  generateRoomId: generateRoomId,
  fetchProjects: fetchProjects,
  fetchIssues: fetchIssues,
};
