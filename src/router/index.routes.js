// import express from "express"
//  const router = express().Router();
import { Router } from "express";

import { home, signin } from "../controller/app.js";

import admin_routes from "./admin.routes.js";

const router = Router();

// ROUTE APP "VIEWS"
router.get("/", home); // http://localhost:9000/
router.get("/signin", signin);
// ...


// ROUTES du BACK-OFFICE
router.use("/admin", admin_routes );


export default router;