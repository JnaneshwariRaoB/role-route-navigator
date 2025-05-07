
import React from "react";
import { Select } from "@/components/ui/select";
import { useRole } from "@/hooks/useRole";

const TopBar = () => {
  const { role, setRole } = useRole();

  return (
    <div className="w-full bg-white border-b border-gray-200 py-3 px-5 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-indigo-700">Academic Portal</h1>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <Select 
            value={role}
            onValueChange={setRole}
          >
            <Select.Trigger className="w-[200px] bg-white">
              <Select.Value placeholder="Select Role" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="coordinator">Course Coordinator</Select.Item>
              <Select.Item value="associator">Course Associator</Select.Item>
              <Select.Item value="hod">HOD</Select.Item>
            </Select.Content>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            U
          </div>
          <span className="text-sm font-medium text-gray-700">User</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
