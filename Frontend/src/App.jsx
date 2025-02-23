import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/layouts/Home';
import { UserSignup } from './pages/authPages/userAuth/userSignup';
import { UserLogin } from './pages/authPages/userAuth/userLogin';
import { UserLogout } from './pages/authPages/userAuth/userLogout';
import { DriverSignup } from './pages/authPages/driverAuth/driverSignup';
import { DriverLogin } from './pages/authPages/driverAuth/driverLogin';
import { DriverLogout } from './pages/authPages/driverAuth/driverLogout';
import { Help } from './pages/layouts/help';
import { UserProtectWrapper } from './utils/userProtectWrapper';
import { DriverProtectWrapper } from './utils/driverProtectWrapper';
import { UserHome } from './pages/layouts/userHome';
import { DriverHome } from './pages/layouts/driverHome';
import { ProtectWrapper } from './utils/protectWrapper';
import { PageNotFound } from './components/pageNotFound';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <ProtectWrapper><Home /></ProtectWrapper> },
    { path: '/user-home', element: <UserProtectWrapper allowedRole={"user"}><UserHome /></UserProtectWrapper> },
    { path: '/driver-home', element: <DriverProtectWrapper allowedRole={"driver"}><DriverHome /></DriverProtectWrapper> },
    { path: '/user-signup', element: <ProtectWrapper><UserSignup /></ProtectWrapper> },
    { path: '/driver-signup', element: <ProtectWrapper><DriverSignup /></ProtectWrapper> },
    { path: '/user-login', element: <ProtectWrapper><UserLogin /></ProtectWrapper> },
    { path: '/driver-login', element: <ProtectWrapper><DriverLogin /></ProtectWrapper> },
    { path: '/user-logout', element: <UserProtectWrapper allowedRole={"user"}><UserLogout /></UserProtectWrapper> },
    { path: '/driver-logout', element: <DriverProtectWrapper allowedRole={"driver"}><DriverLogout /></DriverProtectWrapper> },
    { path: '/help', element: <Help /> },
    { path: '*', element: <PageNotFound /> }
  ]);
  return (<RouterProvider router={router} />)
}

export default App;