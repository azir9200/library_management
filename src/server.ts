
import config from "./app/config";
import mongoose from "mongoose";
import app from "./app";

async function main() {
  try {
    if (!config.database_url) {
      throw new Error("DATABASE_URL not found in environment variables");
    }

    await mongoose.connect(config.database_url);
    app.listen(config.port, () => {
      console.log(`✅ Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(`❌ Server error:`, error);
  }
}

main();
