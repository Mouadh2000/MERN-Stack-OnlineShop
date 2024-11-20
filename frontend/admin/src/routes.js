import Dashboard from "components/Dashboard";
import Profile from "components/Profile.js";
import Login from "components/Login.js";
import Clients from "components/Clients";
import Categories from "components/Categories";
import Staff from "components/Staff";
import Animes from "components/Animes";
import Clothes from "components/Clothes";
import LuxeBath from "components/LuxeBath";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Dashboard />,
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
    path: "/animes",
    name: "Animes",
    icon: "fa-solid fa-palette text-red",
    component: <Animes />,
    layout: "/admin",
  },
  {
    path: "/clothes",
    name: "Clothes",
    icon: "fa-solid fa-shirt text-blue",
    component: <Clothes />,
    layout: "/admin",
  },
  {
    path: "/luxebath",
    name: "Bath Products",
    icon: "fa-solid fa-shower",
    component: <LuxeBath />,
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
