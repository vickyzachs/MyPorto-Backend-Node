require("dotenv").config();

const notionConfig = {
  profileDbId: process.env.NOTION_PROFILE_DB_ID,
  projectDbId: process.env.NOTION_PROJECT_DB_ID,
};

if (!notionConfig.profileDbId || !notionConfig.projectDbId) {
  throw new Error("Missing Notion Database ID in .env");
}

module.exports = notionConfig;
