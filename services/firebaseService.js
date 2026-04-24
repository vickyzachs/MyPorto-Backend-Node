const admin = require("firebase-admin");
const serviceAccount = require("../firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

function sanitize(obj) {
  return JSON.parse(JSON.stringify(obj));
}

async function saveData({ profile, projects }) {
  console.log("🔥 FIREBASE WRITE START");

  console.log("PROFILE BEFORE SAVE:", profile);
  console.log("PROJECTS BEFORE SAVE:", projects?.length);

  const db = admin.firestore();

  const profileRef = db.collection("portfolio").doc("profile");
  const projectRef = db.collection("portfolio").doc("projects");

  await profileRef.set(profile);
  console.log("✅ PROFILE WRITTEN");

  await projectRef.set({
    items: projects,
    updatedAt: new Date().toISOString(),
  });

  console.log("✅ PROJECTS WRITTEN");
}

module.exports = { saveData };
