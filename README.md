# RIDE-CONNECT System Architecture Overview

RIDE-CONNECT is a smart ride-hailing platform featuring a robust Node.js/Express backend and a modern React-based frontend. The system is designed for scalability, modularity, and real-time interactivity, supporting both user and driver experiences.

---

## High-Level Architecture Diagram

```mermaid
graph TD
  A[User/Driver Browser (Frontend - React)]
  B[Backend API (Node.js/Express)]
  C[Database (MongoDB)]
  D[Socket Server (Socket.io)]
  E[Map Services (External APIs)]

  A -- HTTP/REST --> B
  A -- WebSocket --> D
  B -- Mongo Queries --> C
  D -- Mongo Queries --> C
  B -- Map API Calls --> E
  D -- Real-time Events --> A
```

---

## System Components

### 1. Frontend (React + Vite + Tailwind)
- **Pages & Layouts:** User and driver home, authentication, help, etc.
- **Components:** Reusable UI (headers, footers, cards, live tracking, etc.).
- **Context Providers:** Manage state for users, drivers, rides, sockets, and authentication.
- **Route Protection:** Ensures only authenticated users/drivers access protected pages.
- **Live Tracking:** Real-time ride status and location updates via Socket.io.

### 2. Backend (Node.js/Express)
- **API Endpoints:** RESTful routes for users, drivers, rides, and map utilities.
- **Controllers & Services:** Business logic for authentication, ride management, and map integration.
- **Models:** Mongoose schemas for users, drivers, rides, and blacklisted tokens.
- **Authentication:** JWT-based, with token blacklisting for secure logout.
- **Socket Server:** Real-time communication for ride requests, status, and tracking.
- **Map Integration:** Geocoding, distance, and suggestion features via external APIs.

### 3. Database (MongoDB)
- Stores user, driver, ride, and session/token data.

### 4. Real-Time Communication (Socket.io)
- Enables live ride status, driver location updates, and instant notifications between frontend and backend.

### 5. External Map Services
- Used for address autocomplete, geocoding, and distance/time calculations.

---

## Main Flows

### User/Driver Authentication
- Registration and login via REST API.
- JWT tokens for session management.
- Route protection on both frontend and backend.

### Ride Request & Matching
- User requests a ride specifying pickup, destination, and vehicle type.
- Backend matches with available drivers and notifies via Socket.io.
- Real-time updates for ride status and driver location.

### Live Tracking
- Driver location is sent to backend via Socket.io.
- Frontend receives live updates for ride progress.

### Map & Fare Utilities
- Address suggestions, geocoding, and fare estimation via backend endpoints (integrating external map APIs).

---

*The following sections detail the backend API endpoints and usage.*

# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/users/login`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).



## `/users/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token## `/captains/register` Endpoint

### Description

Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters)
  - `lastname` (string, optional): Captain's last name
- `email` (string, required): Captain's email address (must be a valid email)
- `password` (string, required): Captain's password (minimum 6 characters)
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters)
  - `plate` (string, required): Vehicle plate number (minimum 3 characters)
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1)
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto')

### Example Response


## `/captains/register` Endpoint

### Description

Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters).
  - `lastname` (string, optional): Captain's last name (minimum 3 characters).
- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters).
  - `plate` (string, required): Vehicle plate number (minimum 3 characters).
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1).
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto').

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/login` Endpoint

### Description

Authenticates a captain using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/captains/login`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated captain.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.

## `/captains/logout` Endpoint

### Description

Logout the current captain and blacklist the token provided in cookie or headers.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie.

### Example Response

- `message` (string): Logout successfully.


## `/maps/get-coordinates` Endpoint

### Description

Retrieves the coordinates (latitude and longitude) for a given address.

### HTTP Method

`GET`

### Request Parameters

- `address` (string, required): The address for which to retrieve coordinates.

### Example Request

GET `/maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA`

### Example Response

```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

### Error Response

- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.

```json
{
  "message": "Coordinates not found"
}
```

## `/maps/get-distance-time` Endpoint

### Description

Retrieves the distance and estimated travel time between two locations.

### HTTP Method

`GET`

### Request Parameters

- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

### Example Request

```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

### Example Response

```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
```

### Error Response

- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.

```json
{
  "message": "No routes found"
}
```

## `/maps/get-suggestions` Endpoint

### Description

Retrieves autocomplete suggestions for a given input string.

### HTTP Method

`GET`

### Request Parameters

- `input` (string, required): The input string for which to retrieve suggestions.

### Example Request

```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

### Example Response

```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

### Error Response

- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.

```json
{
  "message": "Unable to fetch suggestions"
}
```

## `/rides/create` Endpoint

### Description

Creates a new ride with the provided information.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Request Body

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

### Example Response

- `ride` (object):
  - `user` (string): User ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Fare amount.
  - `status` (string): Ride status.
  - `duration` (number): Duration in seconds.
  - `distance` (number): Distance in meters.
  - `otp` (string): OTP for the ride.

### Error Response

- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.

```json
{
  "message": "Error message"
}
```


## `/rides/get-fare` Endpoint

### Description

Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization:

 Bear

er <token>`

### Request Parameters

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

### Example Request

```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

### Example Response

```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

### Error Response

- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.

```json
{
  "message": "Error message"
}
```