import Index from "views/Index.js";
import Profile from "components/Profile.js";
import Login from "components/Login.js";
import Clients from "components/Clients";
import Categories from "components/Categories";
import Staff from "components/Staff";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/staff",
    name: "Staff",
    icon: "fa-solid fa-user-check text-green",
    component: <Staff />,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "fa-solid fa-users text-yellow",
    component: <Clients />,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "fa-solid fa-layer-group",
    component: <Categories />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes;
