
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useRole } from "@/hooks/useRole";
import { toast } from "sonner";
import { UserCircle } from "lucide-react";

type Role = "coordinator" | "associator" | "hod";

const TopBar = () => {
  const { role, setRole } = useRole();

  const handleRoleChange = (value: string) => {
    if (value === "associator") {
      setTimeout(() => {
        window.location.href = "https://subject-insight-tool.lovable.app/";
      }, 10);
    } else if (value === "hod") {
      setTimeout(() => {
        window.location.href = "https://academic-role-navigator.lovable.app/hod/dashboard";
      }, 10);
    } else {
      // Internal route, set the state
      setRole(value as Role);
      toast.success(`Switched to ${value === "coordinator" ? "Course Coordinator" : "Course Associator"} role`);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 py-3 px-5 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-indigo-700">Academic Portal</h1>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <Select 
            value={role}
            onValueChange={handleRoleChange}
          >
            <SelectTrigger className="w-[200px] bg-white hover:bg-gray-50 transition-colors">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coordinator">Course Coordinator</SelectItem>
              <SelectItem value="associator">Course Associator</SelectItem>
              <SelectItem value="hod">HOD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors cursor-pointer">
            <UserCircle size={18} />
          </div>
          <span className="text-sm font-medium text-gray-700">User</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
