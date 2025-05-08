
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
import { 
  Eye, 
  Edit, 
  Filter, 
  FileSpreadsheet, 
  FileText, 
  Table, 
  Save,
  Plus,
  X 
} from "lucide-react";
import { 
  Table as UITable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const CourseBuilder = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTarget, setIsAddingTarget] = useState(false);
  const [editedCourseOutcomes, setEditedCourseOutcomes] = useState([]);
  const [newTarget, setNewTarget] = useState({ level: "3", target: "", classTarget: "" });
  
  // Sample courses data
  const courses = [
    { 
      id: 1,
      code: "CS101",
      name: "Introduction to Computing",
      semester: 1, 
      credits: 4,
      category: "Core",
      outcomes: [
        { id: "CO1", description: "Explain the fundamental concepts of computing and programming", level: "Level 2 - Understand" },
        { id: "CO2", description: "Apply programming constructs to solve basic computational problems", level: "Level 3 - Apply" }
      ],
      lastUpdated: "2 days ago"
    },
    { 
      id: 2,
      code: "CS201",
      name: "Data Structures",
      semester: 2, 
      credits: 3,
      category: "Core",
      outcomes: [
        { id: "CO1", description: "Understand data structure concepts", level: "Level 2 - Understand" },
        { id: "CO2", description: "Apply data structures to solve problems", level: "Level 3 - Apply" }
      ],
      lastUpdated: "5 days ago"
    },
    { 
      id: 3,
      code: "CS301",
      name: "Algorithms",
      semester: 3, 
      credits: 4,
      category: "Core",
      outcomes: [
        { id: "CO1", description: "Analyze algorithm efficiency", level: "Level 4 - Analyze" },
        { id: "CO2", description: "Design efficient algorithms", level: "Level 5 - Evaluate" }
      ],
      lastUpdated: "1 week ago"
    },
    { 
      id: 4,
      code: "CS401",
      name: "Database Systems",
      semester: 4, 
      credits: 3,
      category: "Core",
      outcomes: [
        { id: "CO1", description: "Design database schemas", level: "Level 5 - Evaluate" },
        { id: "CO2", description: "Implement database solutions", level: "Level 3 - Apply" }
      ],
      lastUpdated: "2 weeks ago"
    }
  ];

  // Course targets
  const [courseTargets, setCourseTargets] = useState([
    { level: "3", target: "80%", classTarget: "75%" },
    { level: "2", target: "70%", classTarget: "65%" },
    { level: "1", target: "60%", classTarget: "55%" }
  ]);

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

  // Handle course selection
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setEditedCourseOutcomes(course.outcomes);
    setIsEditing(false);
  };

  // Handle editing course outcomes
  const handleEditOutcome = (index, field, value) => {
    const updatedOutcomes = [...editedCourseOutcomes];
    updatedOutcomes[index] = { ...updatedOutcomes[index], [field]: value };
    setEditedCourseOutcomes(updatedOutcomes);
  };

  // Handle saving edited outcomes
  const handleSaveOutcomes = () => {
    // In a real app, this would update the backend
    setIsEditing(false);
    // Show a success message
    alert("Course outcomes updated successfully!");
  };

  // Handle adding new target
  const handleAddTarget = () => {
    setCourseTargets([...courseTargets, newTarget]);
    setIsAddingTarget(false);
    setNewTarget({ level: "3", target: "", classTarget: "" });
  };

  // CIE marks data
  const [cieMarks, setCieMarks] = useState([
    { id: 1, usn: "CS001", name: "John Smith", test1: 18, test2: 19, test3: 20 },
    { id: 2, usn: "CS002", name: "Emily Johnson", test1: 20, test2: 18, test3: 19 },
    { id: 3, usn: "CS003", name: "Michael Brown", test1: 15, test2: 17, test3: 16 }
  ]);

  // Handle CIE mark update
  const handleUpdateMark = (studentId, test, value) => {
    const updatedMarks = cieMarks.map(student => 
      student.id === studentId ? { ...student, [test]: parseInt(value) || 0 } : student
    );
    setCieMarks(updatedMarks);
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
          <Button size="icon" variant="outline" className="hover:bg-gray-100 active:bg-gray-200 transition-colors">
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
              <h3 className="font-medium text-lg mb-1">{course.code} - {course.name}</h3>
              <div className="mb-2 flex justify-between">
                <p className="text-sm text-gray-500">Category: {course.category}</p>
                <p className="text-sm font-medium">Credits: {course.credits}</p>
              </div>
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Course Outcomes:</h4>
                <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                  {course.outcomes.slice(0, 2).map((outcome) => (
                    <li key={outcome.id}>{outcome.id}: {outcome.description.substring(0, 40)}...</li>
                  ))}
                  {course.outcomes.length > 2 && <li className="text-gray-500">+ {course.outcomes.length - 2} more</li>}
                </ul>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                  onClick={() => handleSelectCourse(course)}
                >
                  <Eye size={16} className="mr-1" /> View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                  onClick={() => {
                    handleSelectCourse(course);
                    setIsEditing(true);
                  }}
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCourse && (
        <Card className="mt-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
            <h2 className="text-xl font-medium">{selectedCourse.code} - {selectedCourse.name}</h2>
            <div className="flex gap-4 mt-2 text-sm">
              <div>Credits: {selectedCourse.credits}</div>
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
                <TabsTrigger value="cie">CIE</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="outcomes" className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Course Outcomes</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                    className="hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                  >
                    {isEditing ? <Save size={16} className="mr-1" /> : <Edit size={16} className="mr-1" />}
                    {isEditing ? "Save" : "Edit"}
                  </Button>
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
                    {isEditing ? (
                      editedCourseOutcomes.map((co, index) => (
                        <tr key={co.id}>
                          <td className="border p-2">
                            <Input 
                              value={co.id} 
                              onChange={(e) => handleEditOutcome(index, 'id', e.target.value)} 
                              className="w-full"
                            />
                          </td>
                          <td className="border p-2">
                            <Input 
                              value={co.description} 
                              onChange={(e) => handleEditOutcome(index, 'description', e.target.value)} 
                              className="w-full"
                            />
                          </td>
                          <td className="border p-2">
                            <Select 
                              value={co.level}
                              onValueChange={(value) => handleEditOutcome(index, 'level', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={co.level} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Level 1 - Remember">Level 1 - Remember</SelectItem>
                                <SelectItem value="Level 2 - Understand">Level 2 - Understand</SelectItem>
                                <SelectItem value="Level 3 - Apply">Level 3 - Apply</SelectItem>
                                <SelectItem value="Level 4 - Analyze">Level 4 - Analyze</SelectItem>
                                <SelectItem value="Level 5 - Evaluate">Level 5 - Evaluate</SelectItem>
                                <SelectItem value="Level 6 - Create">Level 6 - Create</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      selectedCourse.outcomes.map((co) => (
                        <tr key={co.id}>
                          <td className="border p-2">{co.id}</td>
                          <td className="border p-2">{co.description}</td>
                          <td className="border p-2">{co.level}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                
                {isEditing && (
                  <div className="flex justify-end mt-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="hover:bg-red-50 active:bg-red-100 transition-colors"
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveOutcomes}
                        className="hover:bg-green-600 active:bg-green-700 transition-colors"
                      >
                        <Save size={16} className="mr-1" /> Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bloom">
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium">Course Outcome & Bloom's Level</h3>
                    <Button 
                      variant="outline"
                      className="hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </Button>
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
                      {selectedCourse.outcomes.map((co) => (
                        <tr key={co.id}>
                          <td className="border p-2">{co.id}</td>
                          <td className="border p-2">{co.description}</td>
                          <td className="border p-2">{co.level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="targets">
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium">Course Targets</h3>
                    <Button 
                      variant="outline"
                      onClick={() => setIsAddingTarget(true)}
                      className="hover:bg-green-50 active:bg-green-100 transition-colors"
                    >
                      <Plus size={16} className="mr-1" /> Add Target
                    </Button>
                  </div>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Level</th>
                        <th className="border p-2 text-left">Set Target (%)</th>
                        <th className="border p-2 text-left">Class Target (%)</th>
                        <th className="border p-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseTargets.map((target, index) => (
                        <tr key={index}>
                          <td className="border p-2">{target.level}</td>
                          <td className="border p-2">{target.target}</td>
                          <td className="border p-2">{target.classTarget}</td>
                          <td className="border p-2 text-center">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                            >
                              <Edit size={14} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Target Dialog */}
                <Dialog open={isAddingTarget} onOpenChange={setIsAddingTarget}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Course Target</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Level</label>
                        <Select 
                          value={newTarget.level} 
                          onValueChange={(value) => setNewTarget({...newTarget, level: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Set Target (%)</label>
                        <Input 
                          type="text" 
                          value={newTarget.target}
                          onChange={(e) => setNewTarget({...newTarget, target: e.target.value})}
                          placeholder="e.g., 75%"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Class Target (%)</label>
                        <Input 
                          type="text" 
                          value={newTarget.classTarget}
                          onChange={(e) => setNewTarget({...newTarget, classTarget: e.target.value})}
                          placeholder="e.g., 70%"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddingTarget(false)}
                        className="hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddTarget}
                        className="hover:bg-indigo-600 active:bg-indigo-700 transition-colors"
                      >
                        Add Target
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="plan">
                <h3 className="text-lg font-medium mb-4">Course Plan</h3>
                <p className="text-gray-500">Course plan content will be displayed here.</p>
              </TabsContent>
              
              <TabsContent value="feedback">
                <h3 className="text-lg font-medium mb-4">Feedback</h3>
                <p className="text-gray-500">Feedback content will be displayed here.</p>
              </TabsContent>
              
              <TabsContent value="cie">
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium">CIE Marks Entry</h3>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="hover:bg-green-50 active:bg-green-100 transition-colors"
                      >
                        <FileSpreadsheet size={16} className="mr-1" /> Import
                      </Button>
                      <Button 
                        variant="outline"
                        className="hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                      >
                        <Save size={16} className="mr-1" /> Save Changes
                      </Button>
                    </div>
                  </div>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">USN</th>
                        <th className="border p-2 text-left">Student Name</th>
                        <th className="border p-2 text-center">Test 1 (20)</th>
                        <th className="border p-2 text-center">Test 2 (20)</th>
                        <th className="border p-2 text-center">Test 3 (20)</th>
                        <th className="border p-2 text-center">Average (Best 2)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cieMarks.map((student) => {
                        // Calculate best 2 average
                        const marks = [student.test1, student.test2, student.test3];
                        marks.sort((a, b) => b - a);
                        const average = ((marks[0] + marks[1]) / 2).toFixed(1);
                        
                        return (
                          <tr key={student.id}>
                            <td className="border p-2">{student.usn}</td>
                            <td className="border p-2">{student.name}</td>
                            <td className="border p-2 text-center">
                              <Input 
                                type="number" 
                                min="0" 
                                max="20" 
                                value={student.test1}
                                onChange={(e) => handleUpdateMark(student.id, 'test1', e.target.value)}
                                className="w-16 mx-auto text-center"
                              />
                            </td>
                            <td className="border p-2 text-center">
                              <Input 
                                type="number" 
                                min="0" 
                                max="20" 
                                value={student.test2}
                                onChange={(e) => handleUpdateMark(student.id, 'test2', e.target.value)}
                                className="w-16 mx-auto text-center"
                              />
                            </td>
                            <td className="border p-2 text-center">
                              <Input 
                                type="number" 
                                min="0" 
                                max="20" 
                                value={student.test3}
                                onChange={(e) => handleUpdateMark(student.id, 'test3', e.target.value)}
                                className="w-16 mx-auto text-center"
                              />
                            </td>
                            <td className="border p-2 text-center font-medium">{average}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="mapping">
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">CO-PO Mapping</h3>
                      <p className="text-sm text-gray-500">Mapping strength: 3 - Strong, 2 - Moderate, 1 - Weak, 0 - No mapping</p>
                    </div>
                    <div className="flex gap-2 sticky top-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                      >
                        <FileText size={16} /> Export PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                      >
                        <FileSpreadsheet size={16} /> Export Excel
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
                      >
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
      )}
    </div>
  );
};

export default CourseBuilder;
