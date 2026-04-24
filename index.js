require("dotenv").config();
const express = require("express");

const { fetchDatabase } = require("./services/notionService");
const { saveData } = require("./services/firebaseService");

const notionConfig = require("./config/notionConfig");

const transformProfile = require("./transform/profileTransform");
const { projectTransform } = require("./transform/projectTransform");

const app = express();
const PORT = 3000;

app.get("/sync", async (req, res) => {
  try {
    console.log("Sync started...");
    

    // fetch semua database
const profileRaw = await fetchDatabase(notionConfig.profileDbId);
const projectsRaw = await fetchDatabase(notionConfig.projectDbId);

    // transform
    const profile = transformProfile(profileRaw);
    const projects = projectsRaw.map(projectTransform);


    // gabungkan
    const finalData = {
      profile,
      projects,
      version: Date.now(),
      lastUpdated: new Date().toISOString(),
    };

    // save ke firebase
    await saveData(finalData);

    res.json({ 
      status: "success",
      result: finalData
     });
     
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "sync failed", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
