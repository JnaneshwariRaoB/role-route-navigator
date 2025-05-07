
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const CoordinatorHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Course Coordinator Dashboard</h1>
        <div className="flex gap-2">
          <Select defaultValue="2023-24">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-24">2023-24</SelectItem>
              <SelectItem value="2024-25">2024-25</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="sem1">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sem1">Semester 1</SelectItem>
              <SelectItem value="sem2">Semester 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Visual Analytics</h2>
        <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-dashed border-2">
          <div className="flex items-center justify-center h-48">
            <p className="text-gray-500 text-lg font-medium">Coming Soon</p>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Broadcasts</h2>
        <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-dashed border-2">
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-lg font-medium">Coming Soon</p>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Student Achievements</h2>
        <div className="flex overflow-x-auto pb-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="p-4 min-w-[300px] max-w-[300px] flex-shrink-0">
              <h3 className="font-medium">Student {item}</h3>
              <p className="text-sm text-gray-500 mb-2">National Level Competition</p>
              <p className="text-sm">
                Achieved outstanding results in the annual technical showcase event with innovative projects.
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Financial Overview</h2>
          <Card className="p-6">
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full border-8 border-indigo-500 border-t-transparent animate-spin mx-auto mb-4"></div>
                <p className="text-gray-700">Grant allocation data loading...</p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Attendance Overview</h2>
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {["Data Structures", "Algorithms", "Database Systems", "Computer Networks"].map((subject, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-8 border-indigo-500 flex items-center justify-center">
                    <span className="text-lg font-bold">{75 + i * 5}%</span>
                  </div>
                  <p className="text-sm mt-2 text-center">{subject}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorHome;
