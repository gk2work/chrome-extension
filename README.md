# Angular Chrome Extension - Student Dashboard

A Chrome Extension built with Angular 14 that implements a login flow and student management dashboard using Manifest V3.

## Features

- Login form with validation
- Session management using Chrome's storage API
- Student list display after successful login
- Detailed student information view
- Angular Router for navigation between views
- HttpClient for API calls
- Mock API responses for development and testing
- Mobile-friendly responsive design

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.css
│   │   │   ├── student-list/
│   │   │   │   ├── student-list.component.ts
│   │   │   │   ├── student-list.component.html
│   │   │   │   └── student-list.component.css
│   │   │   ├── student-detail/
│   │   │   │   ├── student-detail.component.ts
│   │   │   │   ├── student-detail.component.html
│   │   │   │   └── student-detail.component.css
│   │   │   └── shared/
│   │   │       └── loading/
│   │   │           └── loading.component.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── student.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── manifest.json
│   ├── index.html
│   ├── styles.css
│   ├── main.ts
│   └── polyfills.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd angular-chrome-extension
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build:extension
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` directory

## Development

To start the development server:
```bash
npm start
```

To build for production:
```bash
npm run build:extension
```

## Customizing API Endpoints

1. Update the API URL in the environment files:
   - `src/environments/environment.ts` for development
   - `src/environments/environment.prod.ts` for production

2. Modify the services to connect to your actual API endpoints:
   - `src/app/services/auth.service.ts` for authentication
   - `src/app/services/student.service.ts` for student data

3. Update the mock data or remove it once you have a working API.

## Authentication

The extension uses a token-based authentication system:

1. User enters credentials in the login form
2. The auth service sends a request to the API
3. On successful login, the token is stored in Chrome's storage
4. The auth interceptor adds the token to all API requests
5. Protected routes use AuthGuard to verify authentication

## Notes

- The extension uses Angular Router with the `useHash` strategy for better compatibility with Chrome extensions
- Angular's HttpClient is used for API calls with proper error handling
- The extension includes mock data for development without requiring an actual backend
- The AuthInterceptor automatically handles 401 errors by redirecting to login
- The popup dimensions are set to 350x450 pixels
- For demonstration purposes, the login works with the credentials: "demo" / "password"