// src/routes.tsx or src/routes.jsx
import { Navigate, RouteObject } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";

// Coordinator pages
import CoordinatorHome from "@/pages/coordinator/Home";
import CourseBuilder from "@/pages/coordinator/CourseBuilder";
import CIE from "@/pages/coordinator/CIE";
import COAttainment from "@/pages/coordinator/COAttainment";

// Associator pages
import SubjectBuilder from "@/pages/associator/SubjectBuilder";
import Attendance from "@/pages/associator/Attendance";

// HOD pages
import HodDashboard from "@/pages/hod/Dashboard";

// 👇 Inline external redirect component
const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/coordinator/home" replace />,
      },

      // ✅ External Redirects
      {
        path: "hod", // when user clicks HOD section
        element: <ExternalRedirect to="https://academic-role-navigator.lovable.app/coordinator/home" />,
      },
      {
        path: "associator", // when user clicks Course Associator
        element: <ExternalRedirect to="https://subject-insight-tool.lovable.app/" />,
      },

      // ✅ Course Coordinator Routes
      {
        path: "coordinator/home",
        element: <CoordinatorHome />,
      },
      {
        path: "coordinator/course-builder",
        element: <CourseBuilder />,
      },
      {
        path: "coordinator/cie",
        element: <CIE />,
      },
      {
        path: "coordinator/co-attainment",
        element: <COAttainment />,
      },

      // ✅ Course Associator Routes (internal fallback if needed)
      {
        path: "associator/subject-builder",
        element: <SubjectBuilder />,
      },
      {
        path: "associator/batches",
        element: <div className="p-4">My Batches Page</div>,
      },
      {
        path: "associator/attendance",
        element: <Attendance />,
      },
      {
        path: "associator/lab-attendance",
        element: <div className="p-4">Lab Attendance Page</div>,
      },
      {
        path: "associator/assignments",
        element: <div className="p-4">Assignments Page</div>,
      },
      {
        path: "associator/cie",
        element: <div className="p-4">CIE Page</div>,
      },
      {
        path: "associator/cie-evaluations",
        element: <div className="p-4">CIE Evaluations Page</div>,
      },

      // ✅ HOD Routes (if used internally)
      {
        path: "hod/dashboard",
        element: <HodDashboard />,
      },
      {
        path: "hod/course",
        element: <div className="p-4">HOD Course Page</div>,
      },
      {
        path: "hod/report",
        element: <div className="p-4">HOD Report Page</div>,
      },
      {
        path: "hod/faculty-mapping",
        element: <div className="p-4">Faculty Mapping Page</div>,
      },
    ],
  },
];

export default routes;
