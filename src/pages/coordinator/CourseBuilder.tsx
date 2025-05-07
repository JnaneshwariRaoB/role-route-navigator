
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Filter } from "lucide-react";

const CourseBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Course Builder</h1>
        <div className="flex gap-2">
          <Select defaultValue="2023-24">
            <Select.Trigger className="w-[160px]">
              <Select.Value placeholder="Academic Year" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="2023-24">2023-24</Select.Item>
              <Select.Item value="2024-25">2024-25</Select.Item>
            </Select.Content>
          </Select>
          <Select defaultValue="sem1">
            <Select.Trigger className="w-[120px]">
              <Select.Value placeholder="Semester" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="sem1">Semester 1</Select.Item>
              <Select.Item value="sem2">Semester 2</Select.Item>
            </Select.Content>
          </Select>
          <Button size="icon" variant="outline">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["CS101 - Introduction to Computing", "CS201 - Data Structures", "CS301 - Algorithms", "CS401 - Database Systems"].map((course, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">SEM {i + 1}</span>
                </div>
                <div>
                  <span className="text-xs">Last updated: 2 days ago</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-2">{course}</h3>
              <p className="text-sm text-gray-500 mb-4">Category: Core</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye size={16} className="mr-1" /> View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
          <h2 className="text-xl font-medium">CS101 - Introduction to Computing</h2>
          <div className="flex gap-4 mt-2 text-sm">
            <div>Credits: 4</div>
            <div>Hours: 4-0-2</div>
            <div>Exam: 70 Marks</div>
          </div>
        </div>

        <CardContent className="p-6">
          <Tabs defaultValue="outcomes">
            <TabsList className="mb-6">
              <TabsTrigger value="outcomes">Course Outcomes</TabsTrigger>
              <TabsTrigger value="plan">Course Plan</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="bloom">CO & Bloom's Level</TabsTrigger>
              <TabsTrigger value="targets">Course Targets</TabsTrigger>
              <TabsTrigger value="mapping">CO-PO Mapping</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="outcomes" className="space-y-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Course Outcomes</h3>
                <Button variant="outline">Edit</Button>
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">CO ID</th>
                    <th className="border p-2 text-left">Course Outcome</th>
                    <th className="border p-2 text-left">Bloom's Level</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "CO1", outcome: "Explain the fundamental concepts of computing and programming", level: "Level 2 - Understand" },
                    { id: "CO2", outcome: "Apply programming constructs to solve basic computational problems", level: "Level 3 - Apply" },
                    { id: "CO3", outcome: "Analyze algorithms for efficiency and correctness", level: "Level 4 - Analyze" },
                    { id: "CO4", outcome: "Design solutions for complex programming challenges", level: "Level 5 - Evaluate" }
                  ].map((co) => (
                    <tr key={co.id}>
                      <td className="border p-2">{co.id}</td>
                      <td className="border p-2">{co.outcome}</td>
                      <td className="border p-2">{co.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="bloom">
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Course Outcome & Bloom's Level</h3>
                  <Button variant="outline">Edit</Button>
                </div>

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">CO ID</th>
                      <th className="border p-2 text-left">Course Outcome</th>
                      <th className="border p-2 text-left">Bloom's Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "CO1", outcome: "Explain the fundamental concepts of computing and programming", level: "Level 2 - Understand" },
                      { id: "CO2", outcome: "Apply programming constructs to solve basic computational problems", level: "Level 3 - Apply" },
                      { id: "CO3", outcome: "Analyze algorithms for efficiency and correctness", level: "Level 4 - Analyze" },
                      { id: "CO4", outcome: "Design solutions for complex programming challenges", level: "Level 5 - Evaluate" }
                    ].map((co) => (
                      <tr key={co.id}>
                        <td className="border p-2">{co.id}</td>
                        <td className="border p-2">{co.outcome}</td>
                        <td className="border p-2">{co.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="plan">
              <h3 className="text-lg font-medium mb-4">Course Plan</h3>
              <p className="text-gray-500">Course plan content will be displayed here.</p>
            </TabsContent>
            
            <TabsContent value="feedback">
              <h3 className="text-lg font-medium mb-4">Feedback</h3>
              <p className="text-gray-500">Feedback content will be displayed here.</p>
            </TabsContent>
            
            <TabsContent value="targets">
              <h3 className="text-lg font-medium mb-4">Course Targets</h3>
              <p className="text-gray-500">Course targets content will be displayed here.</p>
            </TabsContent>
            
            <TabsContent value="mapping">
              <h3 className="text-lg font-medium mb-4">CO-PO Mapping</h3>
              <p className="text-gray-500">CO-PO mapping content will be displayed here.</p>
            </TabsContent>
            
            <TabsContent value="preview">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <p className="text-gray-500">Preview content will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseBuilder;
