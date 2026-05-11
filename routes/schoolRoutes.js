import express from "express";
import { addSchool, listSchools } from "../controllers/schoolController.js";
const router = express.Router();
// Add new school
router.post("/addSchool", addSchool);
//Get list of schools sorted by distance from given location
router.get("/listSchools", listSchools);

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the School Management API",
  });
});
export default router;
