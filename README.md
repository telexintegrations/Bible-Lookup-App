# Bible Lookup Integration for Telex.im

## 📖 Overview

The **Bible Lookup** integration provides a simple way to fetch Bible verses using the [Bible API](https://bible-api.com/). It allows users to retrieve scripture passages based on references posted in **Telex.im** channels. The integration uses the **King James Version (KJV)** by default and is designed for seamless integration with Telex.im, handling specific formatting issues automatically.

---

## 🚀 Features

- 🔍 **Reference-Based Lookup:** Fetch Bible passages by providing a scripture reference (e.g., `John 3:16`).
- ⚡ **Telex.im Compatible:** Processes Telex.im messages and extracts scripture references from formatted inputs.
- 🌐 **RESTful API Endpoints:** Multiple endpoints for direct lookups and integration specifications.
- 🔒 **CORS Support:** Enables secure cross-origin resource sharing.
- 💬 **KJV Translation:** Uses the King James Version for all Bible lookups.

---

## ⚙️ How It Works

### 📡 Endpoints

#### 1. **GET /lookup**  
Retrieve a Bible passage by reference.

- **Request Parameters:**
  - `reference` (string) — The scripture reference (e.g., `John 3:16`).
- **Example Request:**
  ```bash
  curl "http://localhost:3000/lookup?reference=John%203:16"
  ```
- **Example Response:**
  ```json
  {
    "message": "For God so loved the world, that he gave his only begotten Son..."
  }
  ```

---

#### 2. **POST /bible**  
Fetch a Bible passage from Telex.im formatted messages.

- **Request Body:**
  ```json
  {
    "message": "<p>John 3:16</p>"
  }
  ```
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/bible \
    -H "Content-Type: application/json" \
    -d '{"message": "<p>John 3:16</p>"}'
  ```
- **Example Response:**
  ```json
  {
    "message": "John 3:16: For God so loved the world, that he gave his only begotten Son..."
  }
  ```

---

#### 3. **GET /integration-spec**  
Returns the JSON specification required for Telex.im integration.

- **Example Request:**
  ```bash
  curl http://localhost:3000/integration-spec
  ```

- **Example Response:**
  ```json
   {
    "data": {
        "date": {
        "created_at": "2025-02-21",
        "updated_at": "2025-02-22"
    }, 
    "descriptions": {
        "app_description": "Automatically replaces Bible references with their passages/texts. \n Example format: Genesis 1:1, 1 John 2:1-3",
        "app_logo": "https://cdn2.iconfinder.com/data/icons/bible-books/154/search-for-text-bible-2048.png",
        "app_name": "Bible Lookup",
        "app_url": "https://hng12-stage3-telex-integration-bible-lookup-app.vercel.app",
        "background_color": "#000000"
    }...
  }
  ```

---

## 🛠️ Configuration for Telex.im

To integrate this service into your **Telex.im** channel:

### 🔌 **Step 1: Deploy the Server**
- Deploy your Node.js app on a hosting platform like **Heroku**, **Vercel**, or **AWS**.

### 🔗 **Step 2: Set Up Webhook in Telex.im**
- Go to your Telex.im channel settings.
- In your Telex.im Organization, Navigate to **Apps** > **Add new** 
- Add a new specified json integration link url or customize yours
- Click **Save**

### ⚡ **Step 3: Configure Trigger**
- Set the webhook to trigger when messages match a Bible reference pattern (e.g., `Book Chapter:Verse`) by toggling on the **Bible Lookup App**. Set the output to any channel of your choosing.

### ⚡ **Step 4: Configure Trigger**
- Trigger a response by going to the channel and typing your reference as "Book Chapter:verse(s)" [eg. John 3:16]
- N.B: No passage would be generated if the aforementioned pattern is not followed and the response will be returned as the input. Also, the pattern must be strictly adhered to as additional characters/spacing will cause the input to be returned without modification.

---


*(No external API keys are required as the integration uses the public [Bible API](https://bible-api.com/).)*

---

## 🏃 Running the Integration Locally

### ⬇️ **Install Dependencies**
```bash
npm install
```

### 🏃 **Start the Server**
```bash
npm run dev
```

The server will run on:  
```
http://localhost:3000
```

---

## 💡 How Telex.im Integration Works Internally

1. **Message Reception:** When a user posts a Bible reference in a Telex.im channel, Telex.im sends a POST request to `/bible`.

2. **Input Parsing:** The server uses the `extractText` function to remove HTML tags (like `<p>`) from the incoming message.

3. **Reference Lookup:** It queries `bible-api.com` with the extracted reference.

4. **Response Delivery:** The passage text is sent back to Telex.im in a clean, readable format.

---

## 🐛 Error Handling

- **400 Bad Request:** When the `reference` parameter is missing or invalid in `/lookup`.
- **500 Internal Server Error:** For issues fetching data from the Bible API.

Example error response:
```json
{
  "error": "Failed to fetch Bible verse"
}
```

---

## 🙌 Contribution

Feel free to open issues or submit pull requests for improvements, bug fixes, or new features.

### 🔨 Development Notes
- Code is written in **TypeScript** for type safety.
- Uses **Express.js** for API endpoints.
- **Axios** is used for HTTP requests.
- Handles **CORS** for cross-origin requests.


---


## Image

![telex-integration-bible-lookup](https://github.com/user-attachments/assets/02abb614-9917-430f-9efd-7b196c37dc49)

## 💬 Acknowledgments

- [Bible API](https://bible-api.com/) for providing free access to Bible texts.
- [Telex.im](https://telex.im/) for offering flexible integration options.

---

## ✉️ Support

For issues or questions, please contact [joseph.onumeguolor@gmail.com] or open an issue on the project repository.

---

✨ **Enjoy reading the Word!** ✨

