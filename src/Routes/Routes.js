import { useRoutes } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticatingRoutes";
import PublicRoutes from "./PublicRoutes";

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRoutes, PublicRoutes]);
}
