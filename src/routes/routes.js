import config from "../config";
import Brands from "../pages/Brands/Brands";
import Categories from "../pages/Categories/Categories";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Search from "../pages/Search/Search";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import ResetPassword from "../pages/VerifyEmail/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.productDetail, component: ProductDetail },
    { path: config.routes.register, component: Register },
    { path: config.routes.login, component: Login },
    { path: config.routes.shoppingCart, component: ShoppingCart },
    { path: config.routes.search, component: Search },
    { path: config.routes.categories, component: Categories },
    { path: config.routes.brands, component: Brands },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.verifyEmail, component: VerifyEmail },
    { path: config.routes.resetPassword, component: ResetPassword }
    // { path: config.routes.dashboard, component: Dashboard }
]

export { publicRoutes }