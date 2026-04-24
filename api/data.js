const { fetchDatabase } = require("../services/notionService");
const notionConfig = require("../config/notionConfig");

module.exports = async (req, res) => {
  try {
    const profileRaw = await fetchDatabase(notionConfig.profileDbId);

    return res.status(200).json({
      ok: true,
      count: profileRaw?.length || 0,
      sample: profileRaw?.[0] || null
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};