
import React from "react";
import { useRole } from "@/hooks/useRole";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  ClipboardList, 
  LineChart, 
  Users, 
  MessageSquare,
  LayoutDashboard, 
  FileText,
  Book,
  CalendarDays,
  ClipboardCheck
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, isActive }: SidebarItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all",
        isActive 
          ? "bg-indigo-100 text-indigo-700" 
          : "hover:bg-gray-100 text-gray-700 hover:text-indigo-600"
      )}
      onClick={() => navigate(path)}
    >
      <Icon size={20} className={isActive ? "text-indigo-700" : "text-gray-500"} />
      <span className="font-medium">{label}</span>
    </div>
  );
};

const CoordinatorSidebar = ({ currentPath }: { currentPath: string }) => {
  return (
    <>
      <SidebarItem icon={Home} label="Home" path="/coordinator/home" isActive={currentPath === "/coordinator/home"} />
      <SidebarItem icon={BookOpen} label="Course Builder" path="/coordinator/course-builder" isActive={currentPath === "/coordinator/course-builder"} />
      <SidebarItem icon={ClipboardList} label="CIE" path="/coordinator/cie" isActive={currentPath === "/coordinator/cie"} />
      <SidebarItem icon={LineChart} label="CO Attainment" path="/coordinator/co-attainment" isActive={currentPath === "/coordinator/co-attainment"} />
    </>
  );
};

const AssociatorSidebar = ({ currentPath }: { currentPath: string }) => {
  return (
    <>
      <SidebarItem icon={Home} label="Home" path="/associator/home" isActive={currentPath === "/associator/home"} />
      <SidebarItem icon={Book} label="Subject Builder" path="/associator/subject-builder" isActive={currentPath === "/associator/subject-builder"} />
      <SidebarItem icon={Users} label="My Batches" path="/associator/batches" isActive={currentPath === "/associator/batches"} />
      <SidebarItem icon={CalendarDays} label="Attendance" path="/associator/attendance" isActive={currentPath === "/associator/attendance"} />
      <SidebarItem icon={ClipboardCheck} label="Lab Attendance" path="/associator/lab-attendance" isActive={currentPath === "/associator/lab-attendance"} />
      <SidebarItem icon={FileText} label="Assignments" path="/associator/assignments" isActive={currentPath === "/associator/assignments"} />
      <SidebarItem icon={ClipboardList} label="CIE" path="/associator/cie" isActive={currentPath === "/associator/cie"} />
      <SidebarItem icon={LineChart} label="CIE Evaluations" path="/associator/cie-evaluations" isActive={currentPath === "/associator/cie-evaluations"} />
    </>
  );
};

const HodSidebar = ({ currentPath }: { currentPath: string }) => {
  return (
    <>
      <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/hod/dashboard" isActive={currentPath === "/hod/dashboard"} />
      <SidebarItem icon={BookOpen} label="Course" path="/hod/course" isActive={currentPath === "/hod/course"} />
      <SidebarItem icon={FileText} label="Report" path="/hod/report" isActive={currentPath === "/hod/report"} />
      <SidebarItem icon={Users} label="Faculty Mapping" path="/hod/faculty-mapping" isActive={currentPath === "/hod/faculty-mapping"} />
    </>
  );
};

const Sidebar = () => {
  const { role } = useRole();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {role === "coordinator" && "Course Coordinator"}
          {role === "associator" && "Course Associator"}
          {role === "hod" && "Head of Department"}
        </h2>
        <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
      </div>

      <div className="flex flex-col gap-1">
        {role === "coordinator" && <CoordinatorSidebar currentPath={currentPath} />}
        {role === "associator" && <AssociatorSidebar currentPath={currentPath} />}
        {role === "hod" && <HodSidebar currentPath={currentPath} />}
      </div>
    </div>
  );
};

export default Sidebar;
