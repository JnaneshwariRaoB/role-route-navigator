
import React from "react";
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
import { ArrowLeft, Edit, Save, X, Download, Plus } from "lucide-react";

const CIE = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">CIE (Continuous Internal Evaluation)</h1>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["CIE 1", "CIE 2", "CIE 3", "Assignment 1", "Assignment 2"].map((cie, i) => (
          <Card key={i} className="overflow-hidden">
            <div className={`${i < 3 ? "bg-indigo-600" : "bg-purple-600"} p-3 text-white`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {i < 3 ? "EXAM" : "ASSIGNMENT"}
                  </span>
                </div>
                <div>
                  <span className="text-xs">Due: May {10 + i * 5}, 2024</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-2">{cie}</h3>
              <p className="text-sm text-gray-500 mb-4">20 Marks</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Sets
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <div className="bg-indigo-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-medium">CIE 1</h2>
              <div className="flex gap-4 mt-1 text-sm">
                <div>2023-24</div>
                <div>Semester 1</div>
                <div>20 Marks</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-white hover:bg-indigo-700">
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-indigo-700">
                <Edit size={16} className="mr-1" /> Edit
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-indigo-700">
                <Save size={16} className="mr-1" /> Save
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-indigo-700">
                <X size={16} className="mr-1" /> Cancel
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <Tabs defaultValue="structure">
            <TabsList className="mb-6">
              <TabsTrigger value="structure">CIE Structure</TabsTrigger>
              <TabsTrigger value="mapping">CO Mapping</TabsTrigger>
              <TabsTrigger value="marks">Marks Entry</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="structure" className="space-y-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">CIE Paper Structure</h3>
                <Button variant="outline">
                  <Plus size={16} className="mr-1" /> Add Question
                </Button>
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Q. No.</th>
                    <th className="border p-2 text-left">Question Title</th>
                    <th className="border p-2 text-left">CO Mapped</th>
                    <th className="border p-2 text-left">Marks</th>
                    <th className="border p-2 text-left">Bloom's Level</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { no: "1a", title: "Define computing fundamentals", co: "CO1", marks: 5, level: "Level 2" },
                    { no: "1b", title: "Explain program execution cycle", co: "CO1", marks: 5, level: "Level 2" },
                    { no: "2a", title: "Write a program for factorial calculation", co: "CO2", marks: 5, level: "Level 3" },
                    { no: "2b", title: "Debug the given program segment", co: "CO3", marks: 5, level: "Level 4" }
                  ].map((q, i) => (
                    <tr key={i}>
                      <td className="border p-2">{q.no}</td>
                      <td className="border p-2">{q.title}</td>
                      <td className="border p-2">{q.co}</td>
                      <td className="border p-2">{q.marks}</td>
                      <td className="border p-2">{q.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="mapping">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">CO Mapping</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {["CO1", "CO2", "CO3", "CO4"].map((co, i) => (
                    <div key={co} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">{co}</h4>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                        <div 
                          className={`h-4 rounded-full ${i === 0 || i === 1 ? "bg-green-500" : "bg-amber-500"}`} 
                          style={{ width: `${30 + i * 15}%` }}>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span>{30 + i * 15}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="marks">
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Marks Entry</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download size={16} className="mr-1" /> Download Template
                    </Button>
                    <Button variant="outline">
                      <Plus size={16} className="mr-1" /> Upload CSV
                    </Button>
                  </div>
                </div>

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">USN</th>
                      <th className="border p-2 text-left">Student Name</th>
                      <th className="border p-2 text-left">Q1a (5)</th>
                      <th className="border p-2 text-left">Q1b (5)</th>
                      <th className="border p-2 text-left">Q2a (5)</th>
                      <th className="border p-2 text-left">Q2b (5)</th>
                      <th className="border p-2 text-left">Total (20)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { usn: "CS001", name: "John Smith", q1a: 4, q1b: 3, q2a: 5, q2b: 4 },
                      { usn: "CS002", name: "Emily Johnson", q1a: 5, q1b: 4, q2a: 4, q2b: 5 },
                      { usn: "CS003", name: "Michael Brown", q1a: 3, q1b: 3, q2a: 4, q2b: 3 },
                      { usn: "CS004", name: "Sarah Davis", q1a: 5, q1b: 5, q2a: 5, q2b: 4 }
                    ].map((student, i) => (
                      <tr key={i}>
                        <td className="border p-2">{student.usn}</td>
                        <td className="border p-2">{student.name}</td>
                        <td className="border p-2">{student.q1a}</td>
                        <td className="border p-2">{student.q1b}</td>
                        <td className="border p-2">{student.q2a}</td>
                        <td className="border p-2">{student.q2b}</td>
                        <td className="border p-2 font-medium">
                          {student.q1a + student.q1b + student.q2a + student.q2b}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis">
              <h3 className="text-lg font-medium mb-4">Analysis</h3>
              <p className="text-gray-500 mb-4">Analysis of student performance and CO attainment will be displayed here.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Class Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average:</span>
                      <span className="font-medium">16.2 / 20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Highest:</span>
                      <span className="font-medium">19 / 20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest:</span>
                      <span className="font-medium">13 / 20</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-medium mb-2">CO Attainment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>CO1 (10 marks):</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CO2 (5 marks):</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CO3 (5 marks):</span>
                      <span className="font-medium">75%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Preview</h3>
                <Button variant="outline">
                  <Download size={16} className="mr-1" /> Download PDF
                </Button>
              </div>
              <div className="p-6 border rounded-lg bg-gray-50">
                <h3 className="text-xl font-bold mb-4 text-center">CIE 1 Report</h3>
                <div className="text-center mb-4">
                  <p className="text-gray-500">Course: CS101 - Introduction to Computing</p>
                  <p className="text-gray-500">Academic Year: 2023-24, Semester 1</p>
                </div>
                
                <p className="mb-4">
                  This is a preview of how the CIE report will appear when downloaded. The complete report will include
                  all questions, student marks, analysis, and CO attainment data.
                </p>
                
                <div className="text-center text-gray-500 italic">
                  [Full report content will be displayed here]
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <div className="bg-indigo-600 p-4 text-white">
          <h2 className="text-xl font-medium">Question Papers (Manage Sets)</h2>
        </div>

        <CardContent className="p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Course</th>
                <th className="border p-2 text-left">Set A</th>
                <th className="border p-2 text-left">Set B</th>
              </tr>
            </thead>
            <tbody>
              {[
                { course: "CS101 - Introduction to Computing", setA: true, setB: false },
                { course: "CS201 - Data Structures", setA: true, setB: true },
                { course: "CS301 - Algorithms", setA: false, setB: false }
              ].map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.course}</td>
                  <td className="border p-2">
                    <Button variant={item.setA ? "default" : "outline"} size="sm" className={item.setA ? "bg-amber-500 hover:bg-amber-600" : ""}>
                      {item.setA ? "View Set A" : <Plus size={16} />}
                    </Button>
                  </td>
                  <td className="border p-2">
                    <Button variant={item.setB ? "default" : "outline"} size="sm" className={item.setB ? "bg-amber-500 hover:bg-amber-600" : ""}>
                      {item.setB ? "View Set B" : <Plus size={16} />}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Course Overview</h3>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download size={16} className="mr-1" /> Download All PDFs
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { course: "CS101 - Introduction to Computing", session: "2023-24, Sem 1", date: "May 2, 2024" },
                { course: "CS201 - Data Structures", session: "2023-24, Sem 1", date: "May 5, 2024" }
              ].map((item, i) => (
                <Card key={i} className="p-4">
                  <h4 className="font-medium">{item.course}</h4>
                  <p className="text-sm text-gray-500 mb-2">{item.session} • Last updated: {item.date}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">View CO Attainment</Button>
                    <Button size="sm" variant="outline">
                      <Download size={16} className="mr-1" /> PDF
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CIE;
