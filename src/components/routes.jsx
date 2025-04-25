import App from '../App.jsx';
import Home from './Home.jsx';
import Shop from './Shop.jsx';

// Define routes for navigation
const routes = [
    {
    path: "/",
    element: <App />,
    children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "shop", element: <Shop /> },
    ]
    },
];
export default routes;