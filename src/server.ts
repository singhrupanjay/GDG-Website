import app from "./app";
import { env_Constant } from "./constant/env.constant";
import connectToMongoDB from "./infrastructure/db/mongo.db.config";

app.listen(env_Constant.PORT, () => {
  connectToMongoDB();

  console.log(`Server is running on port ${env_Constant.PORT}`);
});
