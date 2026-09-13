import app from "./app";
import { env_Constant } from "./constant/env.constant";
import connectToMongoDB from "./infrastructure/db/mongo.db.config";
import { connectRabbitMQ } from "./infrastructure/rabitmq/RabitMQ.connection";

import RabitMQ_Global_Consumer from "./infrastructure/rabitmq/RabitMQ_Global_Consumer";

app.listen(3000, "0.0.0.0", async () => {
  try {
    await connectToMongoDB();
    await connectRabbitMQ();

    await RabitMQ_Global_Consumer();

    console.log(`Server is running on port 3000`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
