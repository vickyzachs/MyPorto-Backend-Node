const { fetchDatabase } = require("../services/notionService");
const notionConfig = require("../config/notionConfig");
const transformProfile = require("../transform/profileTransform");
const { projectTransform } = require("../transform/projectTransform");

module.exports = async (req, res) => {
  try {
    console.log("API HIT");

    if (!process.env.NOTION_TOKEN) {
      throw new Error("Missing NOTION_TOKEN in Vercel env");
    }

    const profileRaw = await fetchDatabase(notionConfig.profileDbId);
    const projectRaw = await fetchDatabase(notionConfig.projectDbId);

    console.log("PROFILE RAW:", profileRaw);
    console.log("PROJECT RAW:", projectRaw?.length);

    const profile = profileRaw?.length
      ? transformProfile(profileRaw[0])
      : {};

    const projects = Array.isArray(projectRaw)
      ? projectRaw.map(projectTransform)
      : [];

    return res.status(200).json({
      profile,
      projects,
      version: Date.now(),
    });

  } catch (err) {
    console.error("CRASH ERROR:", err);

    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};