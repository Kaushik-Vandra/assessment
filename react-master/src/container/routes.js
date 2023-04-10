import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "../components/auth";

const Layout = lazy(() => import("../components/layout"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const MyAccount = lazy(() => import("../pages/MyAccount"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const AddShipment = lazy(() => import("../pages/AddShipment"));
const AddShipmentForm = lazy(() => import("../pages/AddShipment/AddShipmentForm"));
const EditShipment = lazy(() => import("../pages/AddShipment/EditShipment"));
const ArticleManagement = lazy(() => import("../pages/ArticleManagement"));
const AddArticleForm = lazy(() => import("../pages/ArticleManagement/AddArticleForm"));
const EditArticle = lazy(() => import("../pages/ArticleManagement/EditArticle"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/add-shipment" element={<AddShipment />} />
        <Route path="/add-shipment/add" element={<AddShipmentForm />} />
        <Route path="/add-shipment/edit/:id" element={<EditShipment />} />
        <Route path="/article-management" element={<ArticleManagement />} />
        <Route path="/article-management/add" element={<AddArticleForm />} />
        <Route path="/article-management/edit/:id" element={<EditArticle />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Routing;
