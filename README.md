# Communication Platform

This project is a communication platform that allows users to log in using Google OAuth, view their communication history, and send emails using the Postmarkapp.com API. It includes a backend microservice built with Node.js and a frontend application built with React.

## Features

- User authentication with Google OAuth
- Compose and send emails using the Postmarkapp.com API
- Integration with Postmarkapp.com for email delivery

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account and database URI
- Postmark account and API key
- Google OAuth credentials (Client ID and Client Secret)

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/smoke-2k3/communication-platform.git
    cd communication-platform/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_atlas_uri
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    JWT_SECRET=your_jwt_secret
    POSTMARK_API_KEY=your_postmark_api_key
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

4. Build frontend:

    ```bash
    npm run build
    ```

### Running the Application

1.
    ```bash
    cd backend
   node server.js
    ```
3. Open your browser and navigate to `http://localhost:3000` to access the frontend application.
4. Click the "Login with Google" button to log in using your Google account.

