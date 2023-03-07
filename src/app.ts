import "express-async-errors";
import express, { Application } from "express";
import { usersRoutes } from "./routers/users.routes";
import { handleErrors } from "./errors";
import { loginRouters } from "./routers/login.routes";
import { categoriesRoutes } from "./routers/categories.routes";
import { RealEstatelRoutes } from "./routers/realEstates.routes";
import { schedulesRoutes } from "./routers/schedules.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRouters);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", RealEstatelRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrors);

export default app;
