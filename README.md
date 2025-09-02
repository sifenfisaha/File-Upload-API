# File Upload & Authentication API

A backend service built with **Express**, **TypeScript**, and **MongoDB** that provides user authentication and file upload capabilities. Users can register, login, upload files, retrieve metadata, download files, and delete their files. Input validation is handled with **Zod**, and file uploads are managed with **Multer**.

## Features

- **Authentication**
  - User registration
  - User login

- **File Management**
  - Upload single or multiple files
  - Retrieve user’s files
  - Download files
  - Delete files

- **Validation**
  - Request body, query, and params validation using Zod

- **Security**
  - Routes protected with JWT-based authentication

## Tech Stack

- **Backend Framework**: Node.js + Express + TypeScript
- **Database**: MongoDB (for storing user and file metadata)
- **File Upload Middleware**: Multer
- **Validation**: Zod
- **Authentication**: JWT

## API Endpoints

### Authentication Endpoints

| Endpoint             | Method | Auth Required | Body                              | Description                | Response                   |
| -------------------- | ------ | ------------- | --------------------------------- | -------------------------- | -------------------------- |
| `/api/auth/register` | POST   | No            | JSON: `{ name, email, password }` | Register a new user        | `{ success, user, token }` |
| `/api/auth/login`    | POST   | No            | JSON: `{ email, password }`       | Login user and receive JWT | `{ success, user, token }` |

### File Endpoints

| Endpoint                    | Method | Auth Required | Body / Params                               | Description                                           | Response                     |
| --------------------------- | ------ | ------------- | ------------------------------------------- | ----------------------------------------------------- | ---------------------------- |
| `/api/file/upload`          | POST   | Yes           | `multipart/form-data` field `file`          | Upload a single file                                  | `{ success, file }`          |
| `/api/file/multiple-upload` | POST   | Yes           | `multipart/form-data` field `files` (max 5) | Upload multiple files                                 | `{ success, files }`         |
| `/api/file/me`              | GET    | Yes           | —                                           | Retrieve all files uploaded by the authenticated user | `{ success, files }`         |
| `/api/file/:id`             | GET    | Yes           | Path param `id` (24-char ObjectId)          | Get metadata of a specific file                       | `{ success, file }`          |
| `/api/file/:id/download`    | GET    | Yes           | Path param `id`                             | Download the actual file                              | File as attachment           |
| `/api/file/:id`             | DELETE | Yes           | Path param `id`                             | Delete a specific file (metadata + storage)           | `{ success, message, data }` |

## Validation

- Request body, params, and query validated using Zod.
- File uploads limited to images (`png`, `jpeg`, `pdf`) and PDFs.
- File size limit: 5MB per file.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/sifenfisaha/File-Upload-API.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with required environment variables:

```
PORT=5000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
```

4. Run the development server:

```bash
npm run dev
```

## Notes

- Uploaded files are stored locally in the `/uploads` folder.
- Only metadata is stored in MongoDB.
- All file routes are protected with JWT authentication.
- Future improvements can include cloud storage integration (AWS S3, Cloudinary) and additional file metadata.
