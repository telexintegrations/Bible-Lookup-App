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
        // Input Validation
        if (!reference || typeof reference !== "string") {
            return res.status(400).json({ error: "Bible reference is required" });
        }
        // Fetch verse from Bible API
        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}?translation=kjv`;
        const response = await axios.get(apiUrl);
        // Return response    
        return res.json({
            message: response.data.text
    });
    // Error handling
    } catch (error: any) {
        console.error("Error fetching Bible verse:", error.message);
        return res.status(500).json({ error: "Failed to fetch Bible verse" });
    }
});


// JSON Endpoint
app.get("/integration-spec", (req: Request, res: Response) => {
    res.json(integrationSpec);
});


//function to fix input error from Telex
function extractText(input: string): string {
    // Use a regular expression to extract text within <p> tags that is not empty
    const matches = input.match(/<p>(.*?)<\/p>/g);
    if (!matches) return "";

    // Filter out empty paragraphs and join the non-empty ones
    return matches
    .map((tag) => tag.replace(/<\/?p>/g, "").trim())
    .filter((text) => text.length > 0)
    .join(" ");
};

// Posting to Telex
app.post("/bible", async (req: Request, res: Response) => {
const { message } = req.body;
const newMessage = extractText(message); // Fix using above fxn

try {
    // Fetch passage from bible-api.com
    const response = await axios.get(`https://bible-api.com/${encodeURIComponent(newMessage)}?translation=kjv`);
    const result = response.data.text;
    // Return response
    return res.json({message: result});
    // Error handling: returns original input
} catch (error) {
    return res.status(500).json({ error: "Error fetching Bible passage", message: message });
}
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


export default app;