import AppHeader from "../components/Header/AppHeader";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function Applicant() {
  return (
    <div>
      <AppHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
