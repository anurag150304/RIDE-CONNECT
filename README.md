# RIDE-CONNECT

RIDE-CONNECT is a full-stack ride-sharing web application that connects drivers and passengers. It provides a seamless interface for users to book rides, and for drivers to manage their rides, with real-time distance calculations and route display using Google Maps API.

## Features

### **User Features**
- **User Signup and Login**: Secure authentication with password hashing.
- **Booking Rides**: Users can input pickup and drop-off locations to calculate routes and distances.
- **Dynamic Google Maps Integration**: Real-time route drawing and distance calculation.
- **Role-Based Routing**: Separate user access to specific routes like `user-home`, `user-login`, and `user-logout`.

### **Driver Features**
- **Driver Signup and Login**: Secure authentication with role-based access.
- **Driver Dashboard**: Access to `driver-home`, `driver-login`, and `driver-logout` for managing rides.

### **Common Features**
- **Help Page**: A dedicated section to assist users and drivers with common queries.
- **Professional 404 Page**: A customized and responsive page for undefined routes.

## Technologies Used

### **Frontend**
- **React**: For building the user interface.
- **Tailwind CSS**: For responsive and modern design.
- **React Router DOM**: For client-side routing with role-based access control.

### **Backend**
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for creating RESTful APIs.
- **bcrypt**: For secure password hashing.

### **Database**
- **MongoDB Atlas**: Cloud-based database for storing user and ride data.

### **Third-Party APIs**
- **Google Maps API**: For route drawing, distance calculation, and map rendering.

## Installation and Setup

### **Prerequisites**
Ensure you have the following installed on your machine:
- **Node.js**
- **MongoDB Atlas Cluster**
- **Google Maps API Key**

### **Steps to Run Locally**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/anurag150304/RIDE-CONNECT.git
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   cd Backend && pnpm install
   cd Frontend && pnpm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB Atlas Connection String>
   GOOGLE_MAPS_API_KEY=<Your Google Maps API Key>
   ```

4. **Run the Application**
   ```bash
   # Start the backend server
   cd Backend && pnpx nodemon server.js

   # Start the frontend server
   cd Frontend && pnpm run dev
   ```

5. **Access the Application**
   Open your browser and go to `https://ride-connect-amber.vercel.app`.

## Folder Structure

```
RIDE-CONNECT/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
├── .env
├── package.json
└── README.md
```

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**RIDE-CONNECT** aims to provide an efficient and seamless ride-sharing experience for both passengers and drivers. Happy coding!
