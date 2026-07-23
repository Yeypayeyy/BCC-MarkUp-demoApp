import { Routes, Route, Navigate } from "react-router-dom";
import { RoleSwitcher } from "./components/RoleSwitcher";
import { ToastHost } from "./components/ui";

import Landing from "./pages/Landing";
import Discover from "./pages/Discover";
import DiscoverResult from "./pages/DiscoverResult";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";

import { CustomerLayout } from "./pages/customer/CustomerLayout";
import Overview from "./pages/customer/Overview";
import Project from "./pages/customer/Project";
import Documents from "./pages/customer/Documents";
import Copilot from "./pages/customer/Copilot";
import ActionPlan from "./pages/customer/ActionPlan";
import Sessions from "./pages/customer/Sessions";
import Resources from "./pages/customer/Resources";
import Profile from "./pages/customer/Profile";

import { AdminLayout } from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import OrderDetail from "./pages/admin/OrderDetail";
import Mentors from "./pages/admin/Mentors";
import AdminSchedule from "./pages/admin/Schedule";
import AdminResources from "./pages/admin/Resources";

import { MentorLayout } from "./pages/mentor/MentorLayout";
import MentorOverview from "./pages/mentor/Overview";
import MenteeDetail from "./pages/mentor/MenteeDetail";
import MentorReviews from "./pages/mentor/Reviews";
import MentorSchedule from "./pages/mentor/Schedule";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/result" element={<DiscoverResult />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/checkout/:slug" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<CustomerLayout />}>
          <Route index element={<Navigate to="/app/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="project/semleketep" element={<Project />} />
          <Route path="project/semleketep/documents" element={<Documents />} />
          <Route path="project/semleketep/copilot" element={<Copilot />} />
          <Route path="project/semleketep/action-plan" element={<ActionPlan />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="mentors" element={<Mentors />} />
          <Route path="schedule" element={<AdminSchedule />} />
          <Route path="resources" element={<AdminResources />} />
        </Route>

        <Route path="/mentor" element={<MentorLayout />}>
          <Route index element={<Navigate to="/mentor/overview" replace />} />
          <Route path="overview" element={<MentorOverview />} />
          <Route path="mentees/semleketep" element={<MenteeDetail />} />
          <Route path="reviews" element={<MentorReviews />} />
          <Route path="schedule" element={<MentorSchedule />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <RoleSwitcher />
      <ToastHost />
    </>
  );
}
