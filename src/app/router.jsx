import { createBrowserRouter } from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import DashboardLayout from "./layouts/DashboardLayout"

import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"

import ProtectedRoute from "../components/ProtectedRoute"

import Customization from "../pages/Customization"
import PomodoroPage from "../pages/PomodoroPage"
import Settings from "../pages/Settings"

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "customization",
        element: <Customization />,
      },
      {
        path: "pomodoro",
        element: <PomodoroPage />,
      },
      {
        path: "settings",
        element: <Settings />,
      }
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
])