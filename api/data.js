const notionConfig = require("../config/notionConfig");
const { fetchDatabase } = require("../services/notionService");
const { profileTransform } = require("../transform/profileTransform");
const { projectTransform } = require("../transform/projectTransform");

module.exports = async (req, res) => {
  try {
    console.log("Vercel /data hit");

<<<<<<< HEAD
    const profileRaw = await fetchDatabase(notionConfig.profileDbId);
    const projectRaw = await fetchDatabase(notionConfig.projectDbId);

    const profile = profileRaw?.length
      ? profileTransform(profileRaw[0])
      : {};

    const projects = Array.isArray(projectRaw)
      ? projectRaw.map(projectTransform)
      : [];

    res.status(200).json({
=======
    // fetch semua database
const profileRaw = await fetchDatabase(notionConfig.profileDbId);
const projectsRaw = await fetchDatabase(notionConfig.projectDbId);

    // transform
    const profile = transformProfile(profileRaw);
    const projects = projectsRaw.map(projectTransform);


    // gabungkan
    const finalData = {
>>>>>>> 2a66bc9 (config api data)
      profile,
      projects,
      version: Date.now(),
      lastUpdated: new Date().toISOString(),
<<<<<<< HEAD
    });
=======
    };

    // save ke firebase
    await saveData(finalData);

    res.json({ 
      status: "success",
      result: finalData
     });
>>>>>>> 2a66bc9 (config api data)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch data" });
  }
};