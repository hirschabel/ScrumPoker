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

async function fetchProjects() {
  const url = "https://redmine.tigra.hu/projects.json?limit=1000";
  const apiKey = "";

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(apiKey + ":")}`,
    },
  });

  const data = await response.json();
  return data.projects;
}

module.exports = {
  generateRoomId: generateRoomId,
  fetchProjects: fetchProjects,
};
