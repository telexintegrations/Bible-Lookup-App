import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { integrationSpec } from "./integrationSpec";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
           // reference: response.data.reference,
            //verses: response.data.verses,
            reference: response.data.text,
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


// Posting to Telex
app.post("/webhook", async (req: Request, res: Response) => {
    

    // validate input format
        
    try {
        const {message, settings } = req.body;
        if (!message || typeof message !== "string") {
            return res.status(400).json({ message: "Bible reference is required" });
        }
        // Fetch verse from Bible API
        const apiUrl = `https://bible-api.com/${encodeURIComponent(message)}?translation=kjv`;
        const response = await axios.get(apiUrl);
        return res.json({
           // reference: response.data.reference,
            //verses: response.data.verses,
            status: "success",
            message: response.data.text
    });
    } catch (error: any) {
        console.error("Error fetching Bible verse:", error.message);
        return res.status(500).json({ error: "Failed to fetch Bible verse" });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



export default app;