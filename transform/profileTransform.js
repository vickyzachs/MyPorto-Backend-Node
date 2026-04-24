function transformProfile(data) {
  const item = data[0];

  return {
    name: item.properties.Name.title[0]?.plain_text || "",
    role: item.properties.Role.rich_text[0]?.plain_text || "",
    introduction: item.properties.Introduction.rich_text[0]?.plain_text || "",
    linkedin: item.properties.LinkedIn.rich_text[0]?.plain_text || "",
    github: item.properties.Github.rich_text[0]?.plain_text || "",
    discord: item.properties.Discord.rich_text[0]?.plain_text || "",
    x: item.properties.X.rich_text[0]?.plain_text || "",
    instagram: item.properties.Instagram.rich_text[0]?.plain_text || ""
  };
}

module.exports = transformProfile;