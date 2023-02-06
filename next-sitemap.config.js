const siteUrl = "https://www.ktra99.dev/";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  generateIndexSitemap: false
};