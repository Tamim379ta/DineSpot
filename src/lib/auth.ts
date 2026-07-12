import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("dinespot");

const productionUrl = process.env.BETTER_AUTH_URL || "";
const origins = ["http://localhost:3000"];
if (productionUrl) origins.push(productionUrl);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "diner",
        input: true,
      },
    },
  },
  trustedOrigins: origins,
});