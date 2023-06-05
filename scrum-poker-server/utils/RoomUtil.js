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
  const url = "https://redmine.tigra.hu/projects.json?limit=100";

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

async function fetchIssues(apiKey, projectId, queryId) {
  const url = `https://redmine.tigra.hu/issues.json?limit=100&project_id=${projectId}&query_id=${queryId}`;

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

async function fetchIssue(apiKey, id) {
  const url = `https://redmine.tigra.hu/issues/${id}.json?`;

  const response = await fetch(url, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(apiKey + ":")}`,
    },
  });
  if (response.status != 200) return [];
  const data = await response.json();

  return data.issue;
}

async function fetchQueries(apiKey, projectId) {
  const url = `https://redmine.tigra.hu/queries.json`;

  const response = await fetch(url, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(apiKey + ":")}`,
    },
  });
  if (response.status != 200) return [];
  const data = await response.json();

  return data.queries.filter((query) => {
    return query.project_id == projectId;
  });
}

module.exports = {
  generateRoomId: generateRoomId,
  fetchProjects: fetchProjects,
  fetchIssues: fetchIssues,
  fetchIssue: fetchIssue,
  fetchQueries: fetchQueries,
};
