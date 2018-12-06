# Auth Service Example - Front-End

Run with [back-end counterpart →](https://github.com/LukeAskew/auth-service-back-end)

## Features

- Secure password storage 🔒
- Sessions ⏳
- CSRF protection 🙅‍♂️
- OAuth 2.0 🎟

## Running the app

> **Note:** If you want to use the OAuth functionality you must provide client IDs as environment variables.

Create a `.env` file in the project root with the following, replacing `XXX` with your values:

```
REACT_APP_GITHUB_CLIENT_ID=XXX
REACT_APP_GOOGLE_CLIENT_ID=XXX
```

Run in development mode:

```
$ npm start
```

Run in production:

```
$ npm run serve
```

## Environment Variables

| Name | Description |
| --- | --- |
| `REACT_APP_API_URL` | Location of the back-end |
| `REACT_APP_GITHUB_CLIENT_ID` | Client ID from your Github App |
| `REACT_APP_GOOGLE_CLIENT_ID` | Client ID from your Google App |
| `REACT_APP_GOOGLE_REDIRECT_URL` | Callback URL for Google OAuth. Must be registered with your application. |

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
