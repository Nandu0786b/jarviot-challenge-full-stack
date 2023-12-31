﻿# jarviot-challenge-full-stack

```markdown
# Node.js Project with Google Drive Integration

This is a Node.js project that provides user registration, authentication, and integration with Google Drive. Users can connect their Google Drive account, revoke access, and read their Drive content through this application.

## Installation

To install the required dependencies, run the following command:

```bash
npm install
```

## Running in Development

You can run the project in development mode using [Nodemon](https://nodemon.io/). This will automatically restart the server when you make changes to the code. To start the development server, run:

```bash
npm run dev
```

The server will be available at `http://localhost:3001`.

## API Endpoints

- Register a User:
  - `POST http://localhost:3001/v1/auth/register`

- User Login:
  - `POST http://localhost:3001/v1/auth/login`

- Connect User with Google Drive:
  - `GET http://localhost:3001/v1/drive/connect`

- Redirect URL After Successful Drive Authentication:
  - `GET http://localhost:3001/v1/drive/redirect`

- Revoke User's Previous Token:
  - `GET http://localhost:3001/v1/drive/revoke`

- Read User's Google Drive Content:
  - `GET http://localhost:3001/v1/drive/content`

## .env file:
 - `MONGO_URL=mongo server`
   
 - `PORT=3001`
   
 - `JWT_SECRET=jwt sign`
   
 - `YOUR_CLIENT_ID=from google`
   
 - `YOUR_CLIENT_SECRET=from google`
   
 - `YOUR_REDIRECT_URL=from google`
 
 - `User_mail_demo=nand@gmail.com`
 please use register user with the maintion user in the .env file ok 
## Usage

1. Register a user using the registration endpoint.

2. Log in with the registered user using the login endpoint.

3. Connect the user with Google Drive by visiting the `connect` endpoint. This will initiate the Google Drive authorization flow.

4. After successful authentication with Google Drive, you will be redirected to the `redirect` endpoint.

5. You can revoke the user's previous token at any time using the `revoke` endpoint.

6. To read the user's Google Drive content, visit the `content` endpoint. You will receive a list of files along with their details, including file name, MIME type, size, storage usage, total storage, and a random risk counter.

## Contributing

Feel free to contribute to this project by creating issues or submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
