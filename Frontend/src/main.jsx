import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContext } from './context/userContext.jsx'
import { DriverContext } from './context/driverContext.jsx'
import { AuthProvider } from './context/homeContext.jsx'
import { RideContext } from './context/rideContext.jsx'
import { SocketProvider } from './context/socketContext.jsx'

createRoot(document.getElementById('root')).render(
    <RideContext>
        <AuthProvider>
            <DriverContext>
                <UserContext>
                    <SocketProvider>
                        <App />
                    </SocketProvider>
                </UserContext>
            </DriverContext>
        </AuthProvider>
    </RideContext>
)
