require("dotenv").config();
const fetch = require("node-fetch");

async function fetchDatabase(databaseId) {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("Missing NOTION_TOKEN");
  }

  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data.results;
}

module.exports = { fetchDatabase };