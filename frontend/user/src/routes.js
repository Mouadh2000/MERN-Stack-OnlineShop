import Home from "./components/Home";
import MainShop from "./components/Shop/MainShop";
import About from "./components/About/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ShopDetails from "./components/Shop/ShopDetails";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <MainShop />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    requiresAuth: true,
  },
  {
    path: "/shop-details",
    element: <ShopDetails />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
];

export default routes;
