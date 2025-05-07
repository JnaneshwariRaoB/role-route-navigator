
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
import { CalendarDays, Check, Users, X } from "lucide-react";

const Attendance = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [attendanceDate, setAttendanceDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("9:30 - 10:30");
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("regular");

  // Mock data for subjects
  const subjects = [
    {
      id: "cs301",
      name: "Data Structures",
      section: "A",
      students: 60
    },
    {
      id: "cs302",
      name: "Database Management Systems",
      section: "B",
      students: 55
    },
    {
      id: "cs303",
      name: "Computer Networks",
      section: "A",
      students: 58
    }
  ];

  // Mock data for students
  const students = [
    { id: "1", usn: "1SI21CS001", name: "Aditya Sharma", attendance: 85 },
    { id: "2", usn: "1SI21CS002", name: "Bhavana Reddy", attendance: 78 },
    { id: "3", usn: "1SI21CS003", name: "Chetan Kumar", attendance: 92 },
    { id: "4", usn: "1SI21CS004", name: "Divya Prakash", attendance: 45 },
    { id: "5", usn: "1SI21CS005", name: "Esha Patil", attendance: 60 },
    { id: "6", usn: "1SI21CS006", name: "Farhan Ahmed", attendance: 88 },
    { id: "7", usn: "1SI21CS007", name: "Gayatri Nair", attendance: 72 },
    { id: "8", usn: "1SI21CS008", name: "Harish Verma", attendance: 65 },
    { id: "9", usn: "1SI21CS009", name: "Ishita Gupta", attendance: 40 },
    { id: "10", usn: "1SI21CS010", name: "Jayant Patel", attendance: 95 },
  ];

  // Filter students based on attendance
  const getFilteredStudents = () => {
    if (attendanceFilter === "below-50") {
      return students.filter(student => student.attendance < 50);
    } else if (attendanceFilter === "50-75") {
      return students.filter(student => student.attendance >= 50 && student.attendance <= 75);
    } else if (attendanceFilter === "above-75") {
      return students.filter(student => student.attendance > 75);
    }
    return students;
  };

  const filteredStudents = getFilteredStudents();

  // Initial attendance state
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    students.reduce((acc, student) => {
      acc[student.id] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  // Filter subjects based on academic year and semester
  const filteredSubjects = (academicYear && semester) ? subjects : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>

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
                  sem === 3 ? "rd" : "th"
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

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-1/2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {attendanceDate ? format(attendanceDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={attendanceDate}
                        onSelect={setAttendanceDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="w-full md:w-1/2">
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Class Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:30 - 10:30">9:30 - 10:30 AM</SelectItem>
                      <SelectItem value="10:30 - 11:30">10:30 - 11:30 AM</SelectItem>
                      <SelectItem value="11:30 - 12:30">11:30 - 12:30 PM</SelectItem>
                      <SelectItem value="1:30 - 2:30">1:30 - 2:30 PM</SelectItem>
                      <SelectItem value="2:30 - 3:30">2:30 - 3:30 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {subjects.find(s => s.id === selectedSubject)?.name} - Section {subjects.find(s => s.id === selectedSubject)?.section}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {attendanceDate ? format(attendanceDate, "EEEE, MMMM d, yyyy") : ""} • {selectedTime}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("regular")} className={activeTab === "regular" ? "bg-indigo-50 text-indigo-700" : ""}>
                      Regular Attendance
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("grace")} className={activeTab === "grace" ? "bg-indigo-50 text-indigo-700" : ""}>
                      Grace Attendance
                    </Button>
                  </div>
                </div>

                {activeTab === "regular" ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Attendance</label>
                      <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
                        <SelectTrigger className="w-full md:w-60">
                          <SelectValue placeholder="Filter Attendance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Students</SelectItem>
                          <SelectItem value="below-50">Below 50%</SelectItem>
                          <SelectItem value="50-75">Between 50% - 75%</SelectItem>
                          <SelectItem value="above-75">Above 75%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>USN</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Current Attendance</TableHead>
                              <TableHead className="text-center">Mark Present</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredStudents.map(student => (
                              <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.usn}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                      <div 
                                        className={`h-2.5 rounded-full ${
                                          student.attendance > 75 ? 'bg-green-500' : 
                                          student.attendance >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`} 
                                        style={{ width: `${student.attendance}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs font-medium">{student.attendance}%</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <button 
                                    className={`inline-flex items-center justify-center rounded-md w-10 h-10 ${
                                      attendance[student.id] 
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                    }`}
                                    onClick={() => toggleAttendance(student.id)}
                                  >
                                    {attendance[student.id] ? <Check size={16} /> : <X size={16} />}
                                  </button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <div className="mt-4 flex justify-end">
                      <Button>Submit Attendance</Button>
                    </div>
                  </>
                ) : (
                  <Card>
                    <CardContent className="py-6">
                      <div className="text-center text-gray-500">
                        Grace attendance functionality is currently unavailable.
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>Section {subject.section}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">{subject.students} students</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button onClick={() => setSelectedSubject(subject.id)}>
                        Take Attendance
                      </Button>
                      <Button variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <Card className="bg-gray-50 border border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <CalendarDays size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-center mb-4">
              Please select an Academic Year and Semester to view subject cards.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Attendance;
