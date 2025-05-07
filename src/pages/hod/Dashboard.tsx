
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, PieChart, Download, Filter } from "lucide-react";

const HodDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">HOD Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-1" /> Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-1" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">Total Faculty</h3>
          </div>
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-indigo-600">24</div>
            <p className="text-sm text-gray-500">Full-time faculty members</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">Active Courses</h3>
          </div>
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-indigo-600">18</div>
            <p className="text-sm text-gray-500">Currently running courses</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">Total Students</h3>
          </div>
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-indigo-600">482</div>
            <p className="text-sm text-gray-500">Across all batches</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">Pending Approvals</h3>
          </div>
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-red-600">5</div>
            <p className="text-sm text-gray-500">Require your attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Course Performance Overview</h3>
            <div className="flex items-center gap-2">
              <LineChart size={18} className="text-indigo-600" />
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Performance chart will be displayed here</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Faculty Workload Distribution</h3>
            <div className="flex items-center gap-2">
              <PieChart size={18} className="text-indigo-600" />
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Workload chart will be displayed here</p>
          </div>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="faculty">
            <TabsList className="mb-6">
              <TabsTrigger value="faculty">Faculty Summary</TabsTrigger>
              <TabsTrigger value="courses">Course Summary</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="faculty" className="space-y-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Faculty Overview</h3>
                <input 
                  type="text" 
                  placeholder="Search faculty" 
                  className="px-3 py-1 border rounded-md text-sm"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-2 text-left">Name</th>
                      <th className="border p-2 text-left">Designation</th>
                      <th className="border p-2 text-center">Courses</th>
                      <th className="border p-2 text-center">Teaching Hours</th>
                      <th className="border p-2 text-center">Students</th>
                      <th className="border p-2 text-center">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Dr. Robert Smith", designation: "Professor", courses: 2, hours: 12, students: 120, performance: 4.8 },
                      { name: "Prof. Jennifer Lee", designation: "Associate Professor", courses: 3, hours: 16, students: 145, performance: 4.6 },
                      { name: "Dr. Michael Chen", designation: "Assistant Professor", courses: 4, hours: 18, students: 180, performance: 4.2 },
                      { name: "Prof. Sarah Johnson", designation: "Professor", courses: 2, hours: 10, students: 90, performance: 4.9 },
                    ].map((faculty, i) => (
                      <tr key={i}>
                        <td className="border p-2">{faculty.name}</td>
                        <td className="border p-2">{faculty.designation}</td>
                        <td className="border p-2 text-center">{faculty.courses}</td>
                        <td className="border p-2 text-center">{faculty.hours}</td>
                        <td className="border p-2 text-center">{faculty.students}</td>
                        <td className="border p-2 text-center">
                          <div className="flex items-center justify-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              faculty.performance >= 4.5 ? "bg-green-100 text-green-800" : 
                              faculty.performance >= 4.0 ? "bg-blue-100 text-blue-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {faculty.performance}/5.0
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Course Status</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-1 border rounded-md text-sm">
                    <option>All Semesters</option>
                    <option>Semester 1</option>
                    <option>Semester 2</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Search course" 
                    className="px-3 py-1 border rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-2 text-left">Course Code</th>
                      <th className="border p-2 text-left">Course Name</th>
                      <th className="border p-2 text-left">Coordinator</th>
                      <th className="border p-2 text-center">Students</th>
                      <th className="border p-2 text-center">CIE Status</th>
                      <th className="border p-2 text-center">CO Attainment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { code: "CS101", name: "Introduction to Computing", coordinator: "Dr. Robert Smith", students: 60, cie: "Completed", co: 85 },
                      { code: "CS201", name: "Data Structures", coordinator: "Prof. Jennifer Lee", students: 55, cie: "In Progress", co: 78 },
                      { code: "CS301", name: "Algorithms", coordinator: "Dr. Michael Chen", students: 45, cie: "Pending", co: 0 },
                      { code: "CS401", name: "Database Systems", coordinator: "Prof. Sarah Johnson", students: 40, cie: "Completed", co: 82 },
                    ].map((course, i) => (
                      <tr key={i}>
                        <td className="border p-2">{course.code}</td>
                        <td className="border p-2">{course.name}</td>
                        <td className="border p-2">{course.coordinator}</td>
                        <td className="border p-2 text-center">{course.students}</td>
                        <td className="border p-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            course.cie === "Completed" ? "bg-green-100 text-green-800" : 
                            course.cie === "In Progress" ? "bg-blue-100 text-blue-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {course.cie}
                          </span>
                        </td>
                        <td className="border p-2 text-center">
                          {course.co > 0 ? (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  course.co >= 80 ? "bg-green-500" : 
                                  course.co >= 60 ? "bg-blue-500" : 
                                  "bg-yellow-500"
                                }`} 
                                style={{ width: `${course.co}%` }}>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="space-y-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Department Performance</h3>
                  <Button variant="outline" size="sm">
                    <BarChart size={16} className="mr-1" /> View Charts
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-medium mb-4">Student Performance</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Above 75%</span>
                          <span className="font-medium">210 students</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: "45%" }}>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>60% - 75%</span>
                          <span className="font-medium">180 students</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: "37%" }}>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Below 60%</span>
                          <span className="font-medium">92 students</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-amber-500 h-2 rounded-full" 
                            style={{ width: "18%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-medium mb-4">CO Attainment (Department)</h4>
                    <div className="space-y-3">
                      {["CO1", "CO2", "CO3", "CO4"].map((co, i) => (
                        <div key={co}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{co}</span>
                            <span className="font-medium">{75 + i * 2}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                75 + i * 2 >= 80 ? "bg-green-500" : 
                                75 + i * 2 >= 70 ? "bg-blue-500" : 
                                "bg-amber-500"
                              }`} 
                              style={{ width: `${75 + i * 2}%` }}>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HodDashboard;
