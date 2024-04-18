import{createBrowserRouter,RouterProvider,} from "react-router-dom";
import App from "../App"
import Home from "../home/Home"
import Shop from "../shop/Shop"
import About from "../components/About"
const router = createBrowserRouter([{
    path:"/",
    element:<App/>,
    children: [
        {
            path:'/',
            ekement: <Home/>
        },
        {
            path:"/shop",
            element:<Shop/>
        },
        {
            path:"/about",
            element: <About/>
        }
    ]
}])

export default router