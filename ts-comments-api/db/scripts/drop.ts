import "../../env/env";
import { client, collections } from "../db";
const NODE_ENV = process.env.NODE_ENV ?? "development";

export const drop = async () => {
  console.log(`Connecting to ${NODE_ENV} database`);
  await client.connect();
  console.log("Dropping database");

  await collections.comments.collection().drop();
  await client.close();
};

drop().then(() => process.exit());
