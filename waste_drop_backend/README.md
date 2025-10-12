# waste_drop_backend

Backend server for Waste Drop app. Handles file uploads and (placeholder) AI verification for waste clearing detection.

## Features
- File upload endpoint: `/api/upload` (POST, multipart/form-data, field: `file`)
- Placeholder AI verification logic (always returns `verified`)
- CORS enabled
- Uploaded files stored in `/uploads`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   ```
3. Upload files via POST `/api/upload` (field: `file`)

## To Integrate Real AI
- Replace logic in `controllers/verify.js` with your AI model or API call.
