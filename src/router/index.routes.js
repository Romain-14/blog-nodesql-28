// import express from "express"
//  const router = express().Router();
import { Router } from "express";

import { home, signin, signinView, signup, signupView } from "../controller/app.js";

import admin_routes from "./admin.routes.js";

const router = Router();

// ROUTE APP "VIEWS"
router.get("/", home); // http://localhost:9000/
router.get("/signin", signinView);
router.post("/signin", signin);

router.get("/signup", signupView);
router.post("/signup", signup);
// ...


// ROUTES du BACK-OFFICE
router.use("/admin", admin_routes );


export default router;