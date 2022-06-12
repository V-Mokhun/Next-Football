const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || "";
};

export const API_URL = getEnvVar("API_URL");
export const API_KEY = getEnvVar("API_KEY")
