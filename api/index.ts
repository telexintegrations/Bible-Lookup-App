import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { integrationSpec } from "./integrationSpec";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // CORS Handling
app.use(express.json()); // Middleware to parse JSON request bodies

// Bible Lookup Endpoint
app.get("/lookup", async (req: Request, res: Response) => {
    try {
        const { reference } = req.query;
        
        if (!reference || typeof reference !== "string") {
            return res.status(400).json({ error: "Bible reference is required" });
        }
        // Fetch verse from Bible API
        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}?translation=kjv`;
        const response = await axios.get(apiUrl);
    
        return res.json({
            message: response.data.text,
            translation: response.data.translation_id,
    });
    } catch (error: any) {
        console.error("Error fetching Bible verse:", error.message);
        return res.status(500).json({ error: "Failed to fetch Bible verse" });
    }
});


// JSON Endpoint
app.get("/integration-spec", (req: Request, res: Response) => {
    res.json(integrationSpec);
});


// Function to validate the Bible reference format
const isValidReference = (reference: string): boolean => {
    const regex = /^[A-Za-z ]+\s+\d+:\d+(-\d+)?$/;
    return regex.test(reference);
};
// Posting to Telex
app.post("/bible", async (req: Request, res: Response) => {
const { reference } = req.body;
  // Check if reference is provided
    if (!reference || typeof reference !== "string") {
    return res.status(400).json({ error: "Missing Bible reference in request body" });
}
  // Validate reference format
    if (!isValidReference(reference)) {
    return res.status(400).json({
        error: "Invalid format. Use 'Book Chapter:Verse' or 'Book Chapter:Verse-Verse' (e.g., 'John 3:16' or 'John 3:1-4')",
    });
}
try {
    // Fetch passage from bible-api.com
    const response = await axios.get(`https://bible-api.com/${encodeURIComponent(reference)}?translation=kjv`);
    return res.json(response.data);
} catch (error) {
    return res.status(500).json({ error: "Error fetching Bible passage" });
}
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


export default app;