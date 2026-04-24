function projectTransform(item) {
  if (!item?.properties) return {};

  const p = item.properties;

  return {
    name: p?.Name?.title?.[0]?.plain_text || "",
    projectType: p?.["Project Type"]?.select?.name || "",
    role: p?.Role?.rich_text?.[0]?.plain_text || "",
    description: p?.Description?.rich_text?.[0]?.plain_text || "",
    thumbnail: p?.Thumbnail?.rich_text?.[0]?.plain_text || "",
    videoPreview: p?.["Video Preview"]?.rich_text?.[0]?.plain_text || "",
    sourceVideoPreview: p?.["Source Video Preview"]?.rich_text?.[0]?.plain_text || "",
    videoPreviewUrl: p?.["Video Preview URL"]?.rich_text?.[0]?.plain_text || "",
    liveDemo: p?.["Live Demo"]?.select?.name || "",
    liveDemoUrl: p?.["Live Demo Url"]?.rich_text?.[0]?.plain_text || "",
    createdTime: item?.created_time || "",
  };
}

module.exports = { projectTransform };