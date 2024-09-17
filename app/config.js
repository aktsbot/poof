const env = process.env;

const config = {
  port: env.POOF_PORT || 3027,
  appName: env.POOF_APP_NAME || "Poof",
  basePath: env.POOF_BASE_PATH || "/poof", // expecting poof to be hosted in sub-path of a domain like https://app.com/poof
};

export default config;
