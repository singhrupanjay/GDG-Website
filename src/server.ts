import app from "./app";
import { env_Constant } from "./constant/env.constant";

app.listen(env_Constant.PORT, () => {
  console.log(`Server is running on port ${env_Constant.PORT}`);
});
