
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
import { Eye, Edit, Filter, FileSpreadsheet, FileText, Table } from "lucide-react";
import { 
  Table as UITable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const CourseBuilder = () => {
  // Sample CO data for the mapping table
  const courseOutcomes = [
    { id: "CO1", description: "Explain the fundamental concepts of computing and programming" },
    { id: "CO2", description: "Apply programming constructs to solve basic computational problems" },
    { id: "CO3", description: "Analyze algorithms for efficiency and correctness" },
    { id: "CO4", description: "Design solutions for complex programming challenges" }
  ];

  // Program outcomes (PO1 to PO12)
  const programOutcomes = Array.from({ length: 12 }, (_, i) => `PO${i + 1}`);

  // Sample mapping data (CO to PO mapping scores)
  const mappingData = {
    "CO1": [3, 2, 1, 0, 2, 3, 1, 0, 0, 2, 1, 0],
    "CO2": [2, 3, 2, 1, 0, 1, 3, 2, 0, 1, 0, 1],
    "CO3": [1, 2, 3, 3, 1, 0, 2, 1, 3, 0, 1, 0],
    "CO4": [0, 1, 2, 3, 3, 2, 0, 0, 1, 2, 3, 2]
  };

  // Calculate totals and averages for each PO
  const calculateTotals = () => {
    const totals = Array(12).fill(0);
    
    Object.values(mappingData).forEach((rowValues) => {
      rowValues.forEach((value, index) => {
        totals[index] += value;
      });
    });
    
    return totals;
  };

  const calculateAverages = (totals) => {
    const courseOutcomeCount = Object.keys(mappingData).length;
    return totals.map(total => (total / courseOutcomeCount).toFixed(2));
  };

  const totals = calculateTotals();
  const averages = calculateAverages(totals);

  // Get cell background color based on mapping score
  const getCellBackgroundColor = (score) => {
    switch (score) {
      case 3: return "bg-[#F2FCE2]"; // Light green for strong mapping
      case 2: return "bg-[#D6BCFA]"; // Light purple for moderate mapping
      case 1: return "bg-[#FFDEE2]"; // Light pink for weak mapping
      default: return "bg-gray-100"; // Gray for no mapping
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Course Builder</h1>
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
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">CO-PO Mapping</h3>
                    <p className="text-sm text-gray-500">Mapping strength: 3 - Strong, 2 - Moderate, 1 - Weak, 0 - No mapping</p>
                  </div>
                  <div className="flex gap-2 sticky top-0">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileText size={16} /> Export PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileSpreadsheet size={16} /> Export Excel
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Table size={16} /> Toggle View
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="overflow-x-auto">
                      <UITable>
                        <TableHeader className="sticky top-0 bg-white">
                          <TableRow>
                            <TableHead className="sticky left-0 z-10 bg-white min-w-[300px]" rowSpan={2}>Course Outcomes</TableHead>
                            <TableHead className="text-center font-bold bg-gray-50" colSpan={12}>Program Outcomes</TableHead>
                          </TableRow>
                          <TableRow>
                            {programOutcomes.map((po) => (
                              <TableHead key={po} className="text-center font-medium bg-gray-50 p-2 min-w-[70px]">{po}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courseOutcomes.map((co) => (
                            <TableRow key={co.id}>
                              <TableCell className="sticky left-0 bg-white z-10 border-r">
                                <div className="font-medium">{co.id}</div>
                                <div className="text-sm text-gray-500">{co.description}</div>
                              </TableCell>
                              {mappingData[co.id].map((score, index) => (
                                <TableCell 
                                  key={`${co.id}-${programOutcomes[index]}`} 
                                  className={`text-center font-medium ${getCellBackgroundColor(score)}`}
                                >
                                  {score > 0 ? score : "-"}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                          <TableRow className="bg-yellow-50">
                            <TableCell className="sticky left-0 bg-yellow-50 z-10 font-medium">Total</TableCell>
                            {totals.map((total, index) => (
                              <TableCell key={`total-${index}`} className="text-center font-medium bg-yellow-50">
                                {total}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow className="bg-yellow-50">
                            <TableCell className="sticky left-0 bg-yellow-50 z-10 font-medium">Average</TableCell>
                            {averages.map((avg, index) => (
                              <TableCell key={`avg-${index}`} className="text-center font-medium bg-yellow-50">
                                {avg}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </UITable>
                    </div>
                  </ScrollArea>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#F2FCE2]"></div>
                    <span className="text-sm">Strong mapping (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#D6BCFA]"></div>
                    <span className="text-sm">Moderate mapping (2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#FFDEE2]"></div>
                    <span className="text-sm">Weak mapping (1)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100"></div>
                    <span className="text-sm">No mapping (0)</span>
                  </div>
                </div>
              </div>
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
