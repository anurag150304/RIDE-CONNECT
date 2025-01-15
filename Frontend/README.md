# Frontend Documentation

## RIDE-CONNECT

This project is a smart Ride-Hailing platform, built using React and various other libraries. It includes features for user and driver authentication, ride requests, live tracking, and more.

## Routes

- `/`: Home page (protected)
- `/user-home`: User home page (protected)
- `/driver-home`: Driver home page (protected)
- `/user-signup`: User signup page
- `/driver-signup`: Driver signup page
- `/user-login`: User login page
- `/driver-login`: Driver login page
- `/user-logout`: User logout page
- `/driver-logout`: Driver logout page
- `/help`: Help page

## Components

### Reusable Components

- **authHeader.jsx**: Displays authentication options.
- **authString.jsx**: Displays authentication strings.
- **footer.jsx**: Footer component.
- **fourDigitInput.jsx**: Input component for four-digit codes.
- **header.jsx**: Header component.
- **LiveTracking.jsx**: Live tracking component.
- **main.jsx**: Main content component for the home page.
- **optionCard.jsx**: Card component for ride options.
- **rideRequestSection.jsx**: Section component for ride requests.
- **suggestionBox.jsx**: Suggestion box component.
- **suggestionCard.jsx**: Card component for suggestions.

### Context Providers

- **driverContext.jsx**: Context for driver data.
- **homeContext.jsx**: Context for authentication.
- **rideContext.jsx**: Context for ride data.
- **socketContext.jsx**: Context for socket connections.
- **userContext.jsx**: Context for user data.

### Page Components

- **authPages/driverAuth/**: Authentication pages for drivers.
  - `driverLogin.jsx`: Driver login page.
  - `driverLogout.jsx`: Driver logout page.
  - `driverSignup.jsx`: Driver signup page.
- **authPages/userAuth/**: Authentication pages for users.
  - `userLogin.jsx`: User login page.
  - `userLogout.jsx`: User logout page.
  - `userSignup.jsx`: User signup page.
- **layouts/**: Layout components for different pages.
  - `driverHome.jsx`: Driver home page.
  - `userHome.jsx`: User home page.
  - `help.jsx`: Help page.

### Utility Components

- **driverProtectWrapper.jsx**: Protects routes for drivers.
- **protectWrapper.jsx**: Protects general routes.
- **userProtectWrapper.jsx**: Protects routes for users.