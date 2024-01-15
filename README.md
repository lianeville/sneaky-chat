# Silly Chat

[Silly Chat](https://silly-chat-frontend.up.railway.app/) is a lightweight and fun chat application that allows users to engage in public and anonymous conversations without the hassle of creating an account. Embrace the spontaneity of chat sessions with a unique user experience that doesn't require any mandatory registrations.

## Features

-  **Anonymous Chats:** Dive into the world of Silly Chat without creating an account. Your sessions are identified by a user-seed stored in your local storage, and a random name is generated based on that seed for added anonymity.

-  **Light-Hearted Fun:** Silly Chat is designed for casual and light-hearted conversations. Break away from the norm and enjoy spontaneous interactions with others who are tired of the constant demand for account creation.

### Sessions

![Sessions](demo/dashboard.png)

### Randomize Name

![Randomize Name](demo/randomize-name.gif)

### Create Session

![Create Session](demo/session-create.gif)

### Chat Messages

![Chat Messages](demo/session-messages.gif)

## Tech Stack

-  **Frontend:** React, Vite, React-Redux
-  **Backend:** Express, Node.js
-  **Database:** MongoDB
-  **Websockets:** Socket.io
-  **Deployment:** Railway.app

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your system.

### To run locally:

-  Duplicate `api/.env.sample`
   -  Change file name to `.env`
   -  Replace placeholder mongoURI, PORT, dbName
-  Duplicate `app/.env.sample`
   -  Change file name to `.env`
   -  Replace placeholder VITE_DB_HOST
-  Run `./install.sh` to install dependencies
-  Run `npm start-dev` to start the frontend & backend
