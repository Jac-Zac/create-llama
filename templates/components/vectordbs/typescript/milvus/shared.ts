import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const REQUIRED_ENV_VARS = [
  "MILVUS_ADDRESS",
  "MILVUS_USERNAME",
  "MILVUS_PASSWORD",
];

export function getMilvusClient() {
  const milvusAddress = process.env.MILVUS_ADDRESS;
  if (!milvusAddress) {
    throw new Error("MILVUS_ADDRESS environment variable is required");
  }
  return new MilvusClient({
    address: process.env.MILVUS_ADDRESS!,
    username: process.env.MILVUS_USERNAME,
    password: process.env.MILVUS_PASSWORD,
  });
}

export function checkRequiredEnvVars(opts?: { checkCollectionEnv?: boolean }) {
  const shouldCheckCollectionEnv = opts?.checkCollectionEnv ?? true; // default to true
  const requiredEnvVars = [...REQUIRED_ENV_VARS]; // create a copy of the array
  if (shouldCheckCollectionEnv) {
    requiredEnvVars.push("MILVUS_COLLECTION");
  }
  const missingEnvVars = requiredEnvVars.filter((envVar) => {
    return !process.env[envVar];
  });

  if (missingEnvVars.length > 0) {
    console.log(
      `The following environment variables are required but missing: ${missingEnvVars.join(
        ", ",
      )}`,
    );
    throw new Error(
      `Missing environment variables: ${missingEnvVars.join(", ")}`,
    );
  }
}
