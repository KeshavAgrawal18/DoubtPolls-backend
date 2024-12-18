import http from "http";
import app from "./app.js";
import connectToDatabase from "./src/db/conection.js";

const PORT = process.env.PORT || 3000;

// Create the HTTP server
const server = http.createServer(app);

// Start the server after connecting to the database
const startServer = async () => {
  try {
    await connectToDatabase();
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

startServer();
