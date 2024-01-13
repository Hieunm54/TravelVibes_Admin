import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "../enum/routes";
import NotFoundPage from "../pages/NotFound";
import { useDispatch } from "react-redux";
import { saveAdminLogInInfo } from "../store/actions/auth";
import AdminPage from "../pages/Admin";
import AdminEventsPage from "../pages/AdminEventList";

const routes = createBrowserRouter([
  {
    path: appRoutes.ADMIN,
    element: <AdminPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.ADMIN_EVENTS,
    element: <AdminEventsPage />,
    errorElement: <NotFoundPage />,
  },
]);

const Navigation = () => {
  const dispatch = useDispatch();

  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) {
    const admin = JSON.parse(localStorage.getItem("admin"));
    dispatch(saveAdminLogInInfo(adminToken, admin));
  }

  return <RouterProvider router={routes} />;
};

export default Navigation;
