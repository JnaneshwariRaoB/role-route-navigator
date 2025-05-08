
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { toast } from "sonner";

const COAttainment = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Sample courses data
  const courses = [
    { 
      id: 1, 
      code: "CS101", 
      name: "Introduction to Computing", 
      semester: 1, 
      category: "Core",
      lastUpdated: "2 days ago"
    },
    { 
      id: 2, 
      code: "CS201", 
      name: "Data Structures", 
      semester: 2, 
      category: "Core",
      lastUpdated: "5 days ago"
    },
    { 
      id: 3, 
      code: "CS301", 
      name: "Algorithms", 
      semester: 3, 
      category: "Core",
      lastUpdated: "1 week ago"
    },
    { 
      id: 4, 
      code: "CS401", 
      name: "Database Systems", 
      semester: 4, 
      category: "Core",
      lastUpdated: "2 weeks ago"
    }
  ];

  // Handle course selection
  const handleViewAttainment = (course) => {
    setSelectedCourse(course);
    toast.success(`Viewing attainment for ${course.code} - ${course.name}`);
  };

  // Handle report download
  const handleDownloadReport = (course) => {
    toast.success(`Downloading report for ${course.code} - ${course.name}`);
    // In a real app, this would trigger a download
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">CO Attainment</h1>
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
          <Button 
            size="icon" 
            variant="outline"
            className="hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">SEM {course.semester}</span>
                </div>
                <div>
                  <span className="text-xs">Last updated: {course.lastUpdated}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-2">{course.code} - {course.name}</h3>
              <p className="text-sm text-gray-500 mb-4">Category: {course.category}</p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                  onClick={() => handleViewAttainment(course)}
                >
                  View CO Attainment
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                  onClick={() => handleDownloadReport(course)}
                >
                  <Download size={16} className="mr-1" /> Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCourse && (
        <Card className="mt-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium">{selectedCourse.code} - {selectedCourse.name}</h2>
                <div className="flex gap-4 mt-1 text-sm">
                  <div>2023-24</div>
                  <div>Semester {selectedCourse.semester}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/20 active:bg-white/30 transition-colors"
                  onClick={() => toast.success("Exporting PDF...")}
                >
                  <Download size={16} className="mr-1" /> Export PDF
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/20 active:bg-white/30 transition-colors"
                  onClick={() => toast.success("Exporting Excel...")}
                >
                  <Download size={16} className="mr-1" /> Export Excel
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <Tabs defaultValue="summary">
              <TabsList className="mb-6">
                <TabsTrigger value="summary">Summary View</TabsTrigger>
                <TabsTrigger value="breakdown">CO-wise Breakdown</TabsTrigger>
                <TabsTrigger value="students">Student List View</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">CO Target vs Attainment</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["CO1", "CO2", "CO3", "CO4"].map((co, i) => {
                    const target = 60 + i * 5;
                    const attained = 55 + i * 8;
                    const isTargetMet = attained >= target;
                    
                    return (
                      <Card key={co} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{co}</h4>
                          <span className={`text-sm ${isTargetMet ? "text-green-600" : "text-red-600"} font-medium`}>
                            {isTargetMet ? "Target Met" : "Target Not Met"}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Target: {target}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${target}%` }}>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Attained: {attained}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${isTargetMet ? "bg-green-500" : "bg-red-500"}`}
                                style={{ width: `${attained}%` }}>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <Card className="p-4 mt-6">
                  <h3 className="font-medium mb-3">CO-PO Mapping</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border p-2 text-left"></th>
                          <th className="border p-2 text-center">PO1</th>
                          <th className="border p-2 text-center">PO2</th>
                          <th className="border p-2 text-center">PO3</th>
                          <th className="border p-2 text-center">PO4</th>
                          <th className="border p-2 text-center">PO5</th>
                          <th className="border p-2 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {["CO1", "CO2", "CO3", "CO4"].map((co, i) => (
                          <tr key={co}>
                            <td className="border p-2 font-medium">{co}</td>
                            <td className="border p-2 text-center bg-purple-50">{i + 1}</td>
                            <td className="border p-2 text-center">{3 - (i % 2)}</td>
                            <td className="border p-2 text-center bg-purple-50">{i % 3 + 1}</td>
                            <td className="border p-2 text-center">{2 - (i % 2)}</td>
                            <td className="border p-2 text-center bg-purple-50">{i + 2}</td>
                            <td className="border p-2 text-center font-medium bg-yellow-50">{7 + i}</td>
                          </tr>
                        ))}
                        <tr className="bg-yellow-50">
                          <td className="border p-2 font-medium">Average</td>
                          <td className="border p-2 text-center font-medium">2.5</td>
                          <td className="border p-2 text-center font-medium">2.0</td>
                          <td className="border p-2 text-center font-medium">1.5</td>
                          <td className="border p-2 text-center font-medium">1.5</td>
                          <td className="border p-2 text-center font-medium">3.0</td>
                          <td className="border p-2 text-center font-medium">10.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="breakdown">
                <div className="space-y-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium">CO-wise Breakdown</h3>
                    <Select defaultValue="co1">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select CO" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="co1">CO1</SelectItem>
                        <SelectItem value="co2">CO2</SelectItem>
                        <SelectItem value="co3">CO3</SelectItem>
                        <SelectItem value="co4">CO4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">CO1: Explain the fundamental concepts of computing and programming</h4>
                    <p className="text-sm text-gray-500 mb-4">Bloom's Level: Level 2 - Understand</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Questions Mapped to CO1</h5>
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2 text-left">Assessment</th>
                              <th className="border p-2 text-left">Question</th>
                              <th className="border p-2 text-center">Marks</th>
                              <th className="border p-2 text-center">Avg. Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">CIE 1</td>
                              <td className="border p-2">Q1a</td>
                              <td className="border p-2 text-center">5</td>
                              <td className="border p-2 text-center">4.2</td>
                            </tr>
                            <tr>
                              <td className="border p-2">CIE 1</td>
                              <td className="border p-2">Q1b</td>
                              <td className="border p-2 text-center">5</td>
                              <td className="border p-2 text-center">3.8</td>
                            </tr>
                            <tr>
                              <td className="border p-2">CIE 2</td>
                              <td className="border p-2">Q2a</td>
                              <td className="border p-2 text-center">5</td>
                              <td className="border p-2 text-center">4.5</td>
                            </tr>
                          </tbody>
                          <tfoot className="bg-gray-50">
                            <tr>
                              <td className="border p-2 text-right font-medium" colSpan={2}>Total</td>
                              <td className="border p-2 text-center font-medium">15</td>
                              <td className="border p-2 text-center font-medium">12.5</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-2">Performance Distribution</h5>
                        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
                          <p className="text-gray-500">Histogram will be displayed here</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2">Remarks</h5>
                          <textarea 
                            className="w-full p-2 border rounded-md text-sm" 
                            rows={3}
                            defaultValue="Students have shown good understanding of fundamental concepts. Need to focus more on program execution cycle explanations."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="students">
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium">Student List View</h3>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Search by USN/Name" 
                        className="px-3 py-1 border rounded-md text-sm"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      >
                        <Filter size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border p-2 text-left sticky left-0 bg-gray-50 z-10">USN</th>
                          <th className="border p-2 text-left sticky left-20 bg-gray-50 z-10">Student Name</th>
                          <th className="border p-2 text-center">CO1</th>
                          <th className="border p-2 text-center">CO2</th>
                          <th className="border p-2 text-center">CO3</th>
                          <th className="border p-2 text-center">CO4</th>
                          <th className="border p-2 text-center">Total %</th>
                          <th className="border p-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { usn: "CS001", name: "John Smith", co1: 85, co2: 75, co3: 80, co4: 90, total: 82.5 },
                          { usn: "CS002", name: "Emily Johnson", co1: 95, co2: 85, co3: 88, co4: 92, total: 90 },
                          { usn: "CS003", name: "Michael Brown", co1: 70, co2: 65, co3: 72, co4: 68, total: 68.75 },
                          { usn: "CS004", name: "Sarah Davis", co1: 88, co2: 92, co3: 85, co4: 90, total: 88.75 },
                          { usn: "CS005", name: "David Wilson", co1: 78, co2: 80, co3: 75, co4: 82, total: 78.75 },
                        ].map((student, i) => (
                          <tr key={i}>
                            <td className="border p-2 sticky left-0 bg-white z-10">{student.usn}</td>
                            <td className="border p-2 sticky left-20 bg-white z-10">{student.name}</td>
                            <td className="border p-2 text-center">{student.co1}%</td>
                            <td className="border p-2 text-center">{student.co2}%</td>
                            <td className="border p-2 text-center">{student.co3}%</td>
                            <td className="border p-2 text-center">{student.co4}%</td>
                            <td className="border p-2 text-center font-medium">{student.total}%</td>
                            <td className="border p-2 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                student.total >= 80 ? "bg-green-100 text-green-800" : 
                                student.total >= 60 ? "bg-yellow-100 text-yellow-800" : 
                                "bg-red-100 text-red-800"
                              }`}>
                                {student.total >= 80 ? "Excellent" : 
                                 student.total >= 60 ? "Satisfactory" : 
                                 "Needs Improvement"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      Showing 5 of 45 students
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled
                        className="hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default COAttainment;
