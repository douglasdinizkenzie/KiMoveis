import app from "./app";
import "dotenv/config";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database is connected!");
    app.listen(process.env.PORT!, () => {
      console.log(`Server is running on PORT ${process.env.PORT!}!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
