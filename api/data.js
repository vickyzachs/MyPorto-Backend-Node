const notionConfig = require("../config/notionConfig");
const { fetchDatabase } = require("../services/notionService");
const { profileTransform } = require("../transform/profileTransform");
const { projectTransform } = require("../transform/projectTransform");

module.exports = async (req, res) => {
  try {
    console.log("Vercel /data hit");

    const profileRaw = await fetchDatabase(notionConfig.profileDbId);
    const projectRaw = await fetchDatabase(notionConfig.projectDbId);

    const profile = profileRaw?.length
      ? profileTransform(profileRaw[0])
      : {};

    const projects = Array.isArray(projectRaw)
      ? projectRaw.map(projectTransform)
      : [];

    const finalData = {
      profile,
      projects,
      version: Date.now(),
      lastUpdated: new Date().toISOString(),
    };

    return res.status(200).send("WORKING");

    // return res.status(200).json(finalData);

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({
      error: "failed to fetch data"
    });
  }
};