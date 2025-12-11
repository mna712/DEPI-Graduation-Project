import express from "express";
import { getStats } from "../controllers/dashboard/stats.js";
import { getRecentActivities } from "../controllers/dashboard/activities.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authRole.js";

const router = express.Router();

// Protect all dashboard routes with authentication and admin role
router.use(protect);
router.use(authorizeRoles("admin"));

router.get("/stats", getStats);
router.get("/activities", getRecentActivities);

export default router;
