import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();
const app = express();
// Parses JSON data from request body
app.use(express.json());
// Parses URL-encoded data from request body
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/", schoolRoutes);
// 404 middleware (must be last)
app.use(notFound);
// Global error handling middleware
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
