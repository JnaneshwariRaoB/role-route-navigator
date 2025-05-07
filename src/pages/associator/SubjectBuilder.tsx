
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Book, CalendarDays } from "lucide-react";

const SubjectBuilder = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("course-outcome");
  const [activeModule, setActiveModule] = useState("module-1");

  // Mock data for subjects
  const subjects = [
    {
      id: "cs301",
      name: "Data Structures",
      code: "CS301",
      nbaCode: "NBA-CS-301",
      category: "Core",
      students: 60,
      type: "Theory",
      hours: {
        theory: 3,
        tutorial: 1,
        practical: 2,
        sda: 1
      },
      exam: {
        duration: 3,
        cie: 50,
        see: 50,
        total: 100
      },
      credits: 4
    },
    {
      id: "cs302",
      name: "Database Management Systems",
      code: "CS302",
      nbaCode: "NBA-CS-302",
      category: "Core",
      students: 55,
      type: "Theory/Drawing",
      hours: {
        theory: 3,
        tutorial: 1,
        practical: 0,
        sda: 1
      },
      exam: {
        duration: 3,
        cie: 50,
        see: 50,
        total: 100
      },
      credits: 3
    },
    {
      id: "cs303",
      name: "Computer Networks",
      code: "CS303",
      nbaCode: "NBA-CS-303",
      category: "Core",
      students: 58,
      type: "PBS",
      hours: {
        theory: 3,
        tutorial: 0,
        practical: 2,
        sda: 1
      },
      exam: {
        duration: 3,
        cie: 50,
        see: 50,
        total: 100
      },
      credits: 4
    }
  ];

  // Mock data for CO-PO mapping
  const courseOutcomes = [
    { id: "CO1", description: "Understand data structure concepts and algorithms", bloomLevel: "Level 2 - Understanding" },
    { id: "CO2", description: "Apply data structures to solve computing problems", bloomLevel: "Level 3 - Applying" },
    { id: "CO3", description: "Analyze the performance of algorithms", bloomLevel: "Level 4 - Analyzing" },
    { id: "CO4", description: "Evaluate different data structures for specific problems", bloomLevel: "Level 5 - Evaluating" },
    { id: "CO5", description: "Create efficient algorithms using appropriate data structures", bloomLevel: "Level 6 - Creating" }
  ];

  const programOutcomes = Array.from({ length: 12 }, (_, i) => `PO${i + 1}`);

  const coPoMapping = [
    [3, 2, 3, 1, 0, 0, 2, 0, 0, 0, 0, 0],
    [2, 3, 1, 2, 0, 1, 0, 0, 0, 0, 0, 0],
    [3, 1, 2, 3, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [2, 3, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0]
  ];

  // Calculate totals for CO-PO mapping
  const totals = Array.from({ length: 12 }, (_, colIndex) => 
    coPoMapping.reduce((sum, row) => sum + row[colIndex], 0)
  );

  // Calculate averages for CO-PO mapping
  const averages = totals.map(total => (total / courseOutcomes.length).toFixed(1));

  // Mock data for course targets
  const courseTargets = [
    { level: 3, targetPercentage: 40, classTargetPercentage: 35 },
    { level: 2, targetPercentage: 35, classTargetPercentage: 40 },
    { level: 1, targetPercentage: 25, classTargetPercentage: 25 },
  ];

  // Mock data for lesson plan
  const modules = [
    { id: "module-1", title: "Introduction to Data Structures", outcomes: ["CO1"], hours: 8 },
    { id: "module-2", title: "Arrays and Linked Lists", outcomes: ["CO1", "CO2"], hours: 10 },
    { id: "module-3", title: "Stacks and Queues", outcomes: ["CO2", "CO3"], hours: 8 },
    { id: "module-4", title: "Trees", outcomes: ["CO3", "CO4"], hours: 12 },
    { id: "module-5", title: "Graphs", outcomes: ["CO4", "CO5"], hours: 10 },
  ];

  const lessonPlanItems = [
    { topic: "Data Structure Types and Operations", mode: "Chalk and Talk", date: new Date(2024, 5, 10) },
    { topic: "Time and Space Complexity", mode: "PPT", date: new Date(2024, 5, 12) },
    { topic: "Array Implementation and Applications", mode: "Activity", date: new Date(2024, 5, 15) },
  ];

  // Helper function to get cell background color based on mapping value
  const getMappingCellColor = (value: number) => {
    switch(value) {
      case 3: return "bg-green-100";
      case 2: return "bg-purple-100";
      case 1: return "bg-pink-100";
      default: return "bg-gray-50";
    }
  };

  // Filter subjects based on academic year and semester
  const filteredSubjects = (academicYear && semester) ? subjects : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Subject Builder</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
          <Select value={academicYear} onValueChange={setAcademicYear}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022-2026">2022-2026</SelectItem>
              <SelectItem value="2023-2027">2023-2027</SelectItem>
              <SelectItem value="2024-2028">2024-2028</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {[3, 4, 5, 6, 7, 8].map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>{`${sem}${
                  sem === 3 ? "rd" : sem === 4 ? "th" : sem === 5 ? "th" : sem === 6 ? "th" : sem === 7 ? "th" : "th"
                } Semester`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {academicYear && semester ? (
        <>
          {selectedSubject ? (
            <div className="mb-6">
              <Button
                variant="outline"
                className="mb-4"
                onClick={() => setSelectedSubject(null)}
              >
                ← Back to Subjects
              </Button>

              {/* Subject details sections */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* General Info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">General Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">NBA Code:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.nbaCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Course Code:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Course Type:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Teaching Hours */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Teaching Hours (per week)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Theory:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.hours.theory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tutorial:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.hours.tutorial}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Practical:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.hours.practical}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">SDA:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.hours.sda}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Examination */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Examination Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration (hrs):</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.exam.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CIE Marks:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.exam.cie}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">SEE Marks:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.exam.see}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Marks:</span>
                        <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.exam.total}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Credits */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Course Credits</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center">
                    <div className="text-3xl font-bold text-indigo-700">
                      {subjects.find(s => s.id === selectedSubject)?.credits}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs for course sections */}
              <Tabs defaultValue="course-outcome" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="course-outcome">Course Outcome</TabsTrigger>
                  <TabsTrigger value="lesson-plan">Lesson Plan</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="course-books">Course Books</TabsTrigger>
                  <TabsTrigger value="assessment">Assessment Responses</TabsTrigger>
                </TabsList>

                {/* Course Outcome Tab */}
                <TabsContent value="course-outcome" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Outcomes</CardTitle>
                      <CardDescription>Course outcomes with their respective Bloom's Taxonomy levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>CO ID</TableHead>
                            <TableHead className="w-full">Description</TableHead>
                            <TableHead>Bloom's Level</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courseOutcomes.map((co) => (
                            <TableRow key={co.id}>
                              <TableCell className="font-medium">{co.id}</TableCell>
                              <TableCell>{co.description}</TableCell>
                              <TableCell>{co.bloomLevel}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Target</CardTitle>
                      <CardDescription>Target percentages for different course levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Level</TableHead>
                            <TableHead>Target Percentage</TableHead>
                            <TableHead>Class Target Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courseTargets.map((target) => (
                            <TableRow key={target.level}>
                              <TableCell className="font-medium">Level {target.level}</TableCell>
                              <TableCell>{target.targetPercentage}%</TableCell>
                              <TableCell>{target.classTargetPercentage}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>CO-PO Mapping</CardTitle>
                          <CardDescription>Mapping between course outcomes and program outcomes</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Export PDF</Button>
                          <Button variant="outline" size="sm">Export Excel</Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                      <div className="min-w-[800px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="sticky left-0 bg-white">CO ID</TableHead>
                              {programOutcomes.map((po) => (
                                <TableHead key={po}>{po}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {courseOutcomes.map((co, rowIndex) => (
                              <TableRow key={co.id}>
                                <TableCell className="font-medium sticky left-0 bg-white">{co.id}</TableCell>
                                {coPoMapping[rowIndex].map((value, colIndex) => (
                                  <TableCell 
                                    key={colIndex} 
                                    className={`text-center ${getMappingCellColor(value)}`}
                                  >
                                    {value > 0 ? value : ""}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                            <TableRow className="bg-yellow-50">
                              <TableCell className="font-medium sticky left-0 bg-yellow-50">Total</TableCell>
                              {totals.map((total, index) => (
                                <TableCell key={index} className="text-center font-medium">
                                  {total}
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow className="bg-yellow-50">
                              <TableCell className="font-medium sticky left-0 bg-yellow-50">Average</TableCell>
                              {averages.map((avg, index) => (
                                <TableCell key={index} className="text-center font-medium">
                                  {avg}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Lesson Plan Tab */}
                <TabsContent value="lesson-plan">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Modules</h3>
                        <div className="space-y-2">
                          {modules.map((module) => (
                            <div 
                              key={module.id}
                              className={`p-3 rounded-md cursor-pointer ${
                                activeModule === module.id ? 'bg-indigo-100 text-indigo-700' : 'bg-white hover:bg-gray-100'
                              }`}
                              onClick={() => setActiveModule(module.id)}
                            >
                              <div className="font-medium">{module.title}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {module.outcomes.join(", ")} • {module.hours} hours
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            {modules.find(m => m.id === activeModule)?.title}
                          </CardTitle>
                          <CardDescription>
                            Course Outcomes: {modules.find(m => m.id === activeModule)?.outcomes.join(", ")} • 
                            Hours: {modules.find(m => m.id === activeModule)?.hours}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Topic Name</TableHead>
                                <TableHead>Mode of Delivery</TableHead>
                                <TableHead>Date</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {lessonPlanItems.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.topic}</TableCell>
                                  <TableCell>
                                    <Select defaultValue={item.mode}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Chalk and Talk">Chalk and Talk</SelectItem>
                                        <SelectItem value="Activity">Activity</SelectItem>
                                        <SelectItem value="PPT">PPT</SelectItem>
                                        <SelectItem value="Case Study">Case Study</SelectItem>
                                        <SelectItem value="Peer-to-peer">Peer-to-peer</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                                          <CalendarDays className="mr-2 h-4 w-4" />
                                          {item.date ? format(item.date, "PPP") : "Select date"}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <Calendar
                                          mode="single"
                                          selected={selectedDate}
                                          onSelect={setSelectedDate}
                                          initialFocus
                                          className="p-3 pointer-events-auto"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell colSpan={3}>
                                  <Button variant="outline" className="w-full">
                                    + Add New Topic
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Assignments</CardTitle>
                        <Button>New Assignment</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        No assignments created yet.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Course Books Tab */}
                <TabsContent value="course-books">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Books</CardTitle>
                      <CardDescription>Reference and textbooks for this course</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>ISBN</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead className="w-20"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Textbook</TableCell>
                            <TableCell>Data Structures and Algorithms in Java</TableCell>
                            <TableCell>978-0672324536</TableCell>
                            <TableCell>Robert Lafore</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Reference</TableCell>
                            <TableCell>Introduction to Algorithms</TableCell>
                            <TableCell>978-0262033848</TableCell>
                            <TableCell>Thomas H. Cormen et al.</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={5}>
                              <Button variant="outline" className="w-full">
                                + Add New Book
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Assessment Responses Tab */}
                <TabsContent value="assessment">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assessment Responses</CardTitle>
                      <CardDescription>Student responses to assessment questions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Question</TableHead>
                            <TableHead>Responses</TableHead>
                            <TableHead className="w-20"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Explain the difference between arrays and linked lists</TableCell>
                            <TableCell>45 responses</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Implement a stack using an array</TableCell>
                            <TableCell>42 responses</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Describe the time complexity of binary search</TableCell>
                            <TableCell>38 responses</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {subject.code}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {subject.nbaCode}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {subject.category}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">{subject.students} students enrolled</span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => setSelectedSubject(subject.id)}
                    >
                      View Subject
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <Card className="bg-gray-50 border border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Book size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-center mb-4">
              Please select an Academic Year and Semester to view subject cards.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubjectBuilder;
