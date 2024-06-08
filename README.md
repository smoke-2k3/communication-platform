# Communication Platform

This project is a communication platform that allows users to log in using Google OAuth, view their communication history, and send emails using the Postmarkapp.com API. It includes a backend microservice built with Node.js and a frontend application built with React.

## Features

- User authentication with Google OAuth
- View communication history (sent and received emails)
- Compose and send emails using the Postmarkapp.com API
- Integration with Postmarkapp.com for email delivery
- Email templates for onboarding, marketing, transactional, and engagement emails
- Email analytics (opens, clicks, unsubscribes)

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account and database URI
- Postmark account and API key
- Google OAuth credentials (Client ID and Client Secret)

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/communication-platform.git
    cd communication-platform/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    PORT=3000
    MONGO_URI=your_mongodb_atlas_uri
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    JWT_SECRET=your_jwt_secret
    POSTMARK_API_KEY=your_postmark_api_key
    ```

4. Start the backend server:

    ```bash
    npm start
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

3. Create a `.env` file in the `frontend` directory and add the following environment variable:

    ```env
    REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
    ```

4. Start the frontend application:

    ```bash
    npm start
    ```

### Running the Application

1. Open your browser and navigate to `http://localhost:3000` to access the frontend application.
2. Click the "Login with Google" button to log in using your Google account.
3. After logging in, you will be redirected to the dashboard where you can view your communication history and send emails.

## Directory Structure

