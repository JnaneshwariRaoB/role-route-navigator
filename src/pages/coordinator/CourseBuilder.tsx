
import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

const CourseBuilder = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("basic-info");

  // Basic information state
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [credits, setCredits] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  // Course Outcomes state
  const [courseOutcomes, setCourseOutcomes] = useState([
    { id: 1, text: "", bloomsLevel: "" }
  ]);

  // Course plan state
  const [coursePlan, setCoursePlan] = useState([
    { week: 1, topic: "", subtopics: "", activities: "" }
  ]);

  // Handler for adding new course outcome
  const handleAddCourseOutcome = () => {
    const newId = courseOutcomes.length > 0 
      ? Math.max(...courseOutcomes.map(co => co.id)) + 1 
      : 1;
    setCourseOutcomes([...courseOutcomes, { id: newId, text: "", bloomsLevel: "" }]);
    toast.success("New course outcome added");
  };

  // Handler for removing a course outcome
  const handleRemoveCourseOutcome = (id) => {
    if (courseOutcomes.length === 1) {
      toast.error("At least one course outcome is required");
      return;
    }
    setCourseOutcomes(courseOutcomes.filter(co => co.id !== id));
    toast.success("Course outcome removed");
  };

  // Handler for updating course outcome text
  const handleCourseOutcomeTextChange = (id, text) => {
    setCourseOutcomes(
      courseOutcomes.map(co => (co.id === id ? { ...co, text } : co))
    );
  };

  // Handler for updating blooms level
  const handleBloomsLevelChange = (id, bloomsLevel) => {
    setCourseOutcomes(
      courseOutcomes.map(co => (co.id === id ? { ...co, bloomsLevel } : co))
    );
  };

  // Handler for adding a new course plan week
  const handleAddCoursePlanWeek = () => {
    const newWeek = coursePlan.length > 0 
      ? Math.max(...coursePlan.map(week => week.week)) + 1 
      : 1;
    setCoursePlan([...coursePlan, { week: newWeek, topic: "", subtopics: "", activities: "" }]);
    toast.success("New week added to course plan");
  };

  // Handler for removing a week from course plan
  const handleRemoveCoursePlanWeek = (week) => {
    if (coursePlan.length === 1) {
      toast.error("At least one week is required in the course plan");
      return;
    }
    setCoursePlan(coursePlan.filter(plan => plan.week !== week));
    toast.success("Week removed from course plan");
  };

  // Handler for updating week topic
  const handleWeekTopicChange = (week, topic) => {
    setCoursePlan(
      coursePlan.map(plan => (plan.week === week ? { ...plan, topic } : plan))
    );
  };

  // Handler for updating week subtopics
  const handleWeekSubtopicsChange = (week, subtopics) => {
    setCoursePlan(
      coursePlan.map(plan => (plan.week === week ? { ...plan, subtopics } : plan))
    );
  };

  // Handler for updating week activities
  const handleWeekActivitiesChange = (week, activities) => {
    setCoursePlan(
      coursePlan.map(plan => (plan.week === week ? { ...plan, activities } : plan))
    );
  };

  // Handler for saving course
  const handleSaveCourse = () => {
    // Validate required fields
    if (!courseTitle || !courseCode || !credits) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate course outcomes
    const invalidOutcomes = courseOutcomes.some(co => !co.text || !co.bloomsLevel);
    if (invalidOutcomes) {
      toast.error("Please complete all course outcomes");
      return;
    }

    // Here you would typically save the data to your backend
    console.log({
      courseTitle,
      courseCode,
      credits,
      semester,
      department,
      description,
      courseOutcomes,
      coursePlan,
    });

    toast.success("Course saved successfully!");
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Course Builder</h1>
        <Button onClick={handleSaveCourse}>Save Course</Button>
      </div>

      <Tabs defaultValue="basic-info" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="course-outcomes">Course Outcomes & Bloom's Level</TabsTrigger>
          <TabsTrigger value="course-plan">Course Plan</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>
                Enter the basic information about the course.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="course-title">Course Title *</Label>
                  <Input
                    id="course-title"
                    placeholder="e.g., Introduction to Computer Science"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-code">Course Code *</Label>
                  <Input
                    id="course-code"
                    placeholder="e.g., CS101"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits *</Label>
                  <Input
                    id="credits"
                    placeholder="e.g., 4"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Semesters</SelectLabel>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                        <SelectItem value="3">Semester 3</SelectItem>
                        <SelectItem value="4">Semester 4</SelectItem>
                        <SelectItem value="5">Semester 5</SelectItem>
                        <SelectItem value="6">Semester 6</SelectItem>
                        <SelectItem value="7">Semester 7</SelectItem>
                        <SelectItem value="8">Semester 8</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Departments</SelectLabel>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="ee">Electrical Engineering</SelectItem>
                        <SelectItem value="me">Mechanical Engineering</SelectItem>
                        <SelectItem value="ce">Civil Engineering</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter course description here..."
                  className="min-h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic-info")}>
                Cancel
              </Button>
              <Button onClick={() => setActiveTab("course-outcomes")}>
                Next: Course Outcomes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Course Outcomes Tab */}
        <TabsContent value="course-outcomes">
          <Card>
            <CardHeader>
              <CardTitle>Course Outcomes & Bloom's Taxonomy Levels</CardTitle>
              <CardDescription>
                Define the expected outcomes of the course and their corresponding Bloom's taxonomy levels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courseOutcomes.map((outcome) => (
                <div key={outcome.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border p-4 rounded-md">
                  <div className="md:col-span-1 flex justify-center items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                      {outcome.id}
                    </div>
                  </div>
                  <div className="md:col-span-7 space-y-2">
                    <Label htmlFor={`co-${outcome.id}`}>Course Outcome (CO{outcome.id}) *</Label>
                    <Textarea
                      id={`co-${outcome.id}`}
                      placeholder="e.g., Define and explain fundamental concepts of computer science"
                      value={outcome.text}
                      onChange={(e) => handleCourseOutcomeTextChange(outcome.id, e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`bloom-${outcome.id}`}>Bloom's Level *</Label>
                    <Select 
                      value={outcome.bloomsLevel} 
                      onValueChange={(value) => handleBloomsLevelChange(outcome.id, value)}
                    >
                      <SelectTrigger id={`bloom-${outcome.id}`}>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Bloom's Taxonomy Levels</SelectLabel>
                          <SelectItem value="level1">Level 1 - Understand</SelectItem>
                          <SelectItem value="level2">Level 2 - Remember</SelectItem>
                          <SelectItem value="level3">Level 3 - Apply</SelectItem>
                          <SelectItem value="level4">Level 4 - Analyze</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-1 flex justify-center pt-8">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleRemoveCourseOutcome(outcome.id)}
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full border-dashed" 
                onClick={handleAddCourseOutcome}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Course Outcome
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic-info")}>
                Back: Basic Info
              </Button>
              <Button onClick={() => setActiveTab("course-plan")}>
                Next: Course Plan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Course Plan Tab */}
        <TabsContent value="course-plan">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Course Plan</CardTitle>
              <CardDescription>
                Define the weekly schedule, topics, and activities for the course.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {coursePlan.map((week) => (
                <div key={week.week} className="grid grid-cols-1 gap-4 border p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Week {week.week}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleRemoveCoursePlanWeek(week.week)}
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`topic-${week.week}`}>Main Topic</Label>
                    <Input
                      id={`topic-${week.week}`}
                      placeholder="e.g., Introduction to Algorithms"
                      value={week.topic}
                      onChange={(e) => handleWeekTopicChange(week.week, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`subtopics-${week.week}`}>Subtopics</Label>
                    <Textarea
                      id={`subtopics-${week.week}`}
                      placeholder="e.g., Algorithm complexity, Big O notation"
                      value={week.subtopics}
                      onChange={(e) => handleWeekSubtopicsChange(week.week, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`activities-${week.week}`}>Activities & Assessments</Label>
                    <Textarea
                      id={`activities-${week.week}`}
                      placeholder="e.g., Group discussion, Quiz on algorithm basics"
                      value={week.activities}
                      onChange={(e) => handleWeekActivitiesChange(week.week, e.target.value)}
                    />
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full border-dashed" 
                onClick={handleAddCoursePlanWeek}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Week
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("course-outcomes")}>
                Back: Course Outcomes
              </Button>
              <Button onClick={handleSaveCourse}>
                Save Course
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseBuilder;
