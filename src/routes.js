import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocalParking from "@material-ui/icons/LocalParking";
import Room from "@material-ui/icons/Room";
import BookOutlined from "@material-ui/icons/BookOutlined";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Add from "@material-ui/icons/Add";
import DashboardPage from "views/Dashboard/Dashboard.js";
import AdminProfile from "views/AdminProfile/AdminProfile.js";
import Parkings from "./Parkings/Parkings.js";
import AddorEdit from "./Parkings/AddorEdit.js"
import Réservations from "./Réservations/Réservations.js";
import UsersDetails from "./Users/UsersDetails.js";
import Maps from "./Maps/Maps";


const dashboardRoutes = [
  {
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Admin Profile",
    icon: Person,
    component: AdminProfile,
    layout: "/admin",
  },
  {
    path: "/parkings",
    name: "Parkings",
    icon: LocalParking,
    component: Parkings,
    layout: "/admin",
  },

  {
    path: "/réservations",
    name: "Réservations",
    icon: BookOutlined,
    component: Réservations,
    layout: "/admin",
  },
  {
    path: "/usersDetails",
    name: "UsersDetails",
    icon: PersonAdd,
    component: UsersDetails,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: Room,
    component: Maps,
    layout: "/admin",
  },
];

export default dashboardRoutes;
