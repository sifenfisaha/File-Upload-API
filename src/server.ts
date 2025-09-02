import app from "./app";
import { env } from "./config/env";
import { connectDb } from "./config/db";

connectDb(() => {
  app.listen(env.PORT, () => console.log(`server running on port ${env.PORT}`));
});
