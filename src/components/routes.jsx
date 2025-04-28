import App from '../App.jsx';
import Home from './Home.jsx';
import Shop from './Shop.jsx';
import Checkout from './Checkout.jsx';

// Define routes for navigation
const routes = [
    {
    path: "/",
    element: <App />,
    children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "checkout", element: <Checkout /> },
    ]
    },
];
export default routes;