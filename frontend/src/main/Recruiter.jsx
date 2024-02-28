import RecHeader from "../components/Header/RecHeader";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function Recruiter() {
  return (
    <div>
      <RecHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
