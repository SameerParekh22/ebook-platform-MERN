import{createBrowserRouter,RouterProvider,} from "react-router-dom";
import App from "../App"
import Home from "../home/Home"
import Shop from "../shop/Shop"
import About from "../components/About"
import Blog from "../components/Blog"
import Singlebook from "../components/SingleBook"
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ShoppingCart from "../components/ShoppingCart";
import Logout from "../components/Logout";
const router = createBrowserRouter([
    {
    path:"/",
    element:<App/>,
    children: [
        {
            path:'/',
            element: <Home/>
        },
        {
            path:"/shop",
            element:<Shop/>
        },
        {
            path:"/about",
            element: <About/>
        },
        {
            path:"/blog",
            element: <Blog/>
        },
        {
            path: "/book/:id",
            element: <Singlebook/>,
            loader: ({params}) => fetch(`http://localhost:8000/book/${params.id}`) 
            
        },
        {
            path: "/cart",
            element: <ShoppingCart />
        }
    ]
    },
    {
        path: "/admin/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: "/admin/dashboard",
                element: <PrivateRoute><Dashboard/></PrivateRoute> //here private routing was added so that whenever a user log in successfully then only they can access the dashboard screen
            },
            {
                path: "/admin/dashboard/upload",
                element:<UploadBook/>
            },
            {
                path: "/admin/dashboard/manage",
                element:<ManageBooks/>
            },
            {
                path: "/admin/dashboard/edit-books/:id",
                element:<EditBooks/>,
                loader: ({params}) => fetch(`http://localhost:8000/book/${params.id}`)
            }
        ]
    },
    {
        path: "sign-up",
        element: <Signup/>
    },
    {
        path: "login",
        element: <Login/>
    },
    {
        path: "logout",
        element: <Logout/>
    }
]);

export default router