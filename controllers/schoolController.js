import connection from "../config/db.js";
import { getDistance } from "../utils/distance.js";
import {
  schoolSchema,
  listSchoolsSchema,
} from "../validators/schoolValidator.js";
//API to add a new school to the database
export const addSchool = (req, res) => {
  const { error, value } = schoolSchema.validate(req.body, {
    convert: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  const { name, address, latitude, longitude } = value;
  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [name, address, latitude, longitude],
    (err, results) => {
      if (err) {
        console.error("Error adding school:", err);

        return res.status(500).json({
          success: false,
          message: "Error adding school",
        });
      }

      res.status(201).json({
        success: true,
        message: "School added successfully",
        schoolId: results.insertId,
      });
    },
  );
};
// API to fetch schools sorted by proximity based on user's latitude and longitude
export const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;
  const { error, value } = listSchoolsSchema.validate({ latitude, longitude });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  const userLat = parseFloat(value.latitude);
  const userLon = parseFloat(value.longitude);
  connection.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    const sortedSchools = results
      .map((school) => {
        const distance = getDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude,
        );

        return {
          ...school,
          distance: Number(distance.toFixed(2)),
        };
      })
      .sort((a, b) => a.distance - b.distance);
    res.json({
      success: true,
      message: "Schools fetched successfully",
      count: sortedSchools.length,
      schools: sortedSchools,
    });
  });
};
