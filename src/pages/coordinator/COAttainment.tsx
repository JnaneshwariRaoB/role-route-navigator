
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const COAttainment = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Sample subjects data
  const subjects = [
    { id: 1, code: "CS101", name: "Introduction to Computing" },
    { id: 2, code: "CS201", name: "Data Structures" },
    { id: 3, code: "CS301", name: "Algorithms" },
    { id: 4, code: "CS401", name: "Database Systems" },
  ];

  // Sample CO attainment data
  const coAttainmentData = {
    directAttainment: [
      { co: "CO1", test1: 85, test2: 78, assignment: 90, avg: 84.3 },
      { co: "CO2", test1: 72, test2: 80, assignment: 85, avg: 79.0 },
      { co: "CO3", test1: 76, test2: 82, assignment: 78, avg: 78.7 },
      { co: "CO4", test1: 90, test2: 88, assignment: 92, avg: 90.0 },
    ],
    indirectAttainment: [
      { co: "CO1", feedbackScore: 4.2 },
      { co: "CO2", feedbackScore: 3.9 },
      { co: "CO3", feedbackScore: 4.0 },
      { co: "CO4", feedbackScore: 4.5 },
    ],
    overallAttainment: [
      { co: "CO1", direct: 84.3, indirect: 84.0, overall: 84.2 },
      { co: "CO2", direct: 79.0, indirect: 78.0, overall: 78.7 },
      { co: "CO3", direct: 78.7, indirect: 80.0, overall: 79.1 },
      { co: "CO4", direct: 90.0, indirect: 90.0, overall: 90.0 },
    ],
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    toast.success(`${subject.code} - ${subject.name} selected`);
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
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card 
            key={subject.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleSelectSubject(subject)}
          >
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-1">{subject.code} - {subject.name}</h3>
              <div className="mt-4">
                <Button 
                  className="w-full hover:bg-indigo-600 active:bg-indigo-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    handleSelectSubject(subject);
                  }}
                >
                  View CO Attainment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSubject && (
        <Card className="mt-8">
          <div className="bg-indigo-600 p-4 text-white">
            <h2 className="text-xl font-medium">
              CO Attainment for {selectedSubject.code} - {selectedSubject.name}
            </h2>
          </div>

          <CardContent className="p-6">
            <Tabs defaultValue="direct">
              <TabsList className="mb-6">
                <TabsTrigger value="direct">Direct Attainment</TabsTrigger>
                <TabsTrigger value="indirect">Indirect Attainment</TabsTrigger>
                <TabsTrigger value="overall">Overall Attainment</TabsTrigger>
                <TabsTrigger value="visualize">Visualize</TabsTrigger>
              </TabsList>

              <TabsContent value="direct" className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Direct CO Attainment</h3>
                
                <ScrollArea className="h-full">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Course Outcome</th>
                          <th className="border p-2 text-center">Test 1 (%)</th>
                          <th className="border p-2 text-center">Test 2 (%)</th>
                          <th className="border p-2 text-center">Assignment (%)</th>
                          <th className="border p-2 text-center">Average (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coAttainmentData.directAttainment.map((row, i) => (
                          <tr key={i}>
                            <td className="border p-2">{row.co}</td>
                            <td className="border p-2 text-center">{row.test1}</td>
                            <td className="border p-2 text-center">{row.test2}</td>
                            <td className="border p-2 text-center">{row.assignment}</td>
                            <td className="border p-2 text-center font-medium">{row.avg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>

                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    className="hover:bg-indigo-600 active:bg-indigo-700 transition-colors"
                    onClick={() => toast.success("Direct CO Attainment data generated!")}
                  >
                    Generate Report
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="indirect" className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Indirect CO Attainment (Feedback)</h3>
                
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Course Outcome</th>
                      <th className="border p-2 text-center">Feedback Score (Out of 5)</th>
                      <th className="border p-2 text-center">Percentage (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coAttainmentData.indirectAttainment.map((row, i) => (
                      <tr key={i}>
                        <td className="border p-2">{row.co}</td>
                        <td className="border p-2 text-center">{row.feedbackScore}</td>
                        <td className="border p-2 text-center">{(row.feedbackScore / 5 * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    className="hover:bg-indigo-600 active:bg-indigo-700 transition-colors"
                    onClick={() => toast.success("Indirect CO Attainment data exported!")}
                  >
                    Export Data
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="overall" className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Overall CO Attainment</h3>
                
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Course Outcome</th>
                      <th className="border p-2 text-center">Direct Attainment (%)</th>
                      <th className="border p-2 text-center">Indirect Attainment (%)</th>
                      <th className="border p-2 text-center">Overall Attainment (%)</th>
                      <th className="border p-2 text-center">Attainment Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coAttainmentData.overallAttainment.map((row, i) => {
                      let level;
                      if (row.overall >= 85) level = 3;
                      else if (row.overall >= 75) level = 2;
                      else level = 1;
                      
                      return (
                        <tr key={i}>
                          <td className="border p-2">{row.co}</td>
                          <td className="border p-2 text-center">{row.direct}</td>
                          <td className="border p-2 text-center">{row.indirect}</td>
                          <td className="border p-2 text-center font-medium">{row.overall}</td>
                          <td className="border p-2 text-center font-medium">{level}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    className="hover:bg-indigo-600 active:bg-indigo-700 transition-colors"
                    onClick={() => toast.success("Overall CO Attainment report generated!")}
                  >
                    Generate Report
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="visualize" className="space-y-4">
                <h3 className="text-lg font-medium mb-4">CO Attainment Visualization</h3>
                
                <div className="p-6 border rounded-lg bg-gray-50 text-center">
                  <p className="text-gray-500">Visualization charts will be displayed here.</p>
                  <p className="text-gray-500 mt-2">Charts would show the attainment levels for each CO graphically.</p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    className="hover:bg-indigo-600 active:bg-indigo-700 transition-colors"
                    onClick={() => toast.success("Visualization data refreshed!")}
                  >
                    Refresh Data
                  </Button>
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
