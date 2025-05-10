import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import * as Collapsible from "@radix-ui/react-collapsible"
import { Circle } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { MoreVertical, Copy, Mail, Github, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Pagination } from "@/components/ui/pagination"
import { Link } from "react-router-dom"
import { useRole } from "@/hooks/useRole";

// Removing the imports that are causing errors:
// import { usePagination } from "@/hooks/use-pagination"
// import { InputWithButton } from "@/components/ui/input-with-button"
// import { CommandMenu } from "@/components/ui/command-menu"
// import { DataTable } from "@/components/ui/data-table"
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
// import { FileTree } from "@/components/ui/file-tree"
// import { Kbd } from "@/components/ui/kbd"
// import { Icons } from "@/components/icons"

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'inProgress' | 'completed';
}

interface Student {
  id: string;
  name: string;
  usn: string;
  email: string;
  phone: string;
}

// New interface for Course Outcomes
interface CourseOutcome {
  id: string;
  description: string;
  bloomLevel: string;
}

const SubjectBuilder = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Task 1', description: 'Description for Task 1', status: 'open' },
    { id: '2', title: 'Task 2', description: 'Description for Task 2', status: 'inProgress' },
    { id: '3', title: 'Task 3', description: 'Description for Task 3', status: 'completed' },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', usn: '1CG20CS001', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: '2', name: 'Jane Smith', usn: '1CG20CS002', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { id: '3', name: 'Alice Johnson', usn: '1CG20CS003', email: 'alice.johnson@example.com', phone: '555-123-4567' },
  ]);

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({ title: '', description: '', status: 'open' });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({ name: '', usn: '', email: '', phone: '' });
  const [isStudentEditDialogOpen, setIsStudentEditDialogOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isDeleteStudentDialogOpen, setIsDeleteStudentDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [isBatchDialogOpen, setIsBatchDialogOpen] = useState(false);
  const [newBatch, setNewBatch] = useState({ name: '', description: '' });
  const [batches, setBatches] = useState([
    { id: '1', name: 'Batch 1', description: 'Description for Batch 1' },
    { id: '2', name: 'Batch 2', description: 'Description for Batch 2' },
  ]);
  const [isEditBatchDialogOpen, setIsEditBatchDialogOpen] = useState(false);
  const [editedBatch, setEditedBatch] = useState<any | null>(null);
  const [isDeleteBatchDialogOpen, setIsDeleteBatchDialogOpen] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState<string | null>(null);
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', code: '', description: '' });
  const [subjects, setSubjects] = useState([
    { id: '1', name: 'Subject 1', code: 'SUB001', description: 'Description for Subject 1' },
    { id: '2', name: 'Subject 2', code: 'SUB002', description: 'Description for Subject 2' },
  ]);
  const [isEditSubjectDialogOpen, setIsEditSubjectDialogOpen] = useState(false);
  const [editedSubject, setEditedSubject] = useState<any | null>(null);
  const [isDeleteSubjectDialogOpen, setIsDeleteSubjectDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: new Date() });
  const [assignments, setAssignments] = useState([
    { id: '1', title: 'Assignment 1', description: 'Description for Assignment 1', dueDate: new Date() },
    { id: '2', title: 'Assignment 2', description: 'Description for Assignment 2', dueDate: new Date() },
  ]);
  const [isEditAssignmentDialogOpen, setIsEditAssignmentDialogOpen] = useState(false);
  const [editedAssignment, setEditedAssignment] = useState<any | null>(null);
  const [isDeleteAssignmentDialogOpen, setIsDeleteAssignmentDialogOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState<Date | null>(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<{ [studentId: string]: boolean }>({});
  const [isEditAttendanceDialogOpen, setIsEditAttendanceDialogOpen] = useState(false);
  const [editedAttendanceDate, setEditedAttendanceDate] = useState<Date | null>(new Date());
  const [editedAttendanceRecords, setEditedAttendanceRecords] = useState<{ [studentId: string]: boolean }>({});
  const [isCieDialogOpen, setIsCieDialogOpen] = useState(false);
  const [newCie, setNewCie] = useState({ title: '', description: '', totalMarks: 100 });
  const [cies, setCies] = useState([
    { id: '1', title: 'CIE 1', description: 'Description for CIE 1', totalMarks: 100 },
    { id: '2', title: 'CIE 2', description: 'Description for CIE 2', totalMarks: 100 },
  ]);
  const [isEditCieDialogOpen, setIsEditCieDialogOpen] = useState(false);
  const [editedCie, setEditedCie] = useState<any | null>(null);
  const [isDeleteCieDialogOpen, setIsDeleteCieDialogOpen] = useState(false);
  const [cieToDelete, setCieToDelete] = useState<string | null>(null);
  const [isCieEvaluationDialogOpen, setIsCieEvaluationDialogOpen] = useState(false);
  const [selectedCie, setSelectedCie] = useState<any | null>(null);
  const [cieEvaluations, setCieEvaluations] = useState<{ [studentId: string]: number }>({});
  const [isEditCieEvaluationDialogOpen, setIsEditCieEvaluationDialogOpen] = useState(false);
  const [editedCieEvaluations, setEditedCieEvaluations] = useState<{ [studentId: string]: number }>({});
  const [isLabAttendanceDialogOpen, setIsLabAttendanceDialogOpen] = useState(false);
  const [labAttendanceDate, setLabAttendanceDate] = useState<Date | null>(new Date());
  const [labAttendanceRecords, setLabAttendanceRecords] = useState<{ [studentId: string]: boolean }>({});
  const [isEditLabAttendanceDialogOpen, setIsEditLabAttendanceDialogOpen] = useState(false);
  const [editedLabAttendanceDate, setEditedLabAttendanceDate] = useState<Date | null>(new Date());
  const [editedLabAttendanceRecords, setEditedLabAttendanceRecords] = useState<{ [studentId: string]: boolean }>({});
  const [isTimeTableDialogOpen, setIsTimeTableDialogOpen] = useState(false);
  const [timeTable, setTimeTable] = useState([
    { id: '1', day: 'Monday', time: '9:00 AM', subject: 'Subject 1' },
    { id: '2', day: 'Tuesday', time: '10:00 AM', subject: 'Subject 2' },
  ]);
  const [isEditTimeTableDialogOpen, setIsEditTimeTableDialogOpen] = useState(false);
  const [editedTimeTable, setEditedTimeTable] = useState<any | null>(null);
  const [isDeleteTimeTableDialogOpen, setIsDeleteTimeTableDialogOpen] = useState(false);
  const [timeTableToDelete, setTimeTableToDelete] = useState<string | null>(null);
  const [newTimeTable, setNewTimeTable] = useState({ day: '', time: '', subject: '' });
  const [isSyllabusDialogOpen, setIsSyllabusDialogOpen] = useState(false);
  const [syllabus, setSyllabus] = useState([
    { id: '1', topic: 'Topic 1', description: 'Description for Topic 1' },
    { id: '2', topic: 'Topic 2', description: 'Description for Topic 2' },
  ]);
  const [isEditSyllabusDialogOpen, setIsEditSyllabusDialogOpen] = useState(false);
  const [editedSyllabus, setEditedSyllabus] = useState<any | null>(null);
  const [isDeleteSyllabusDialogOpen, setIsDeleteSyllabusDialogOpen] = useState(false);
  const [syllabusToDelete, setSyllabusToDelete] = useState<string | null>(null);
  const [newSyllabus, setNewSyllabus] = useState({ topic: '', description: '' });
  const [isResourcesDialogOpen, setIsResourcesDialogOpen] = useState(false);
  const [resources, setResources] = useState([
    { id: '1', name: 'Resource 1', link: 'http://example.com/resource1' },
    { id: '2', name: 'Resource 2', link: 'http://example.com/resource2' },
  ]);
  const [isEditResourcesDialogOpen, setIsEditResourcesDialogOpen] = useState(false);
  const [editedResources, setEditedResources] = useState<any | null>(null);
  const [isDeleteResourcesDialogOpen, setIsDeleteResourcesDialogOpen] = useState(false);
  const [resourcesToDelete, setResourcesToDelete] = useState<string | null>(null);
  const [newResources, setNewResources] = useState({ name: '', link: '' });
  const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'Notification 1', date: new Date() },
    { id: '2', message: 'Notification 2', date: new Date() },
  ]);
  const [isEditNotificationsDialogOpen, setIsEditNotificationsDialogOpen] = useState(false);
  const [editedNotifications, setEditedNotifications] = useState<any | null>(null);
  const [isDeleteNotificationsDialogOpen, setIsDeleteNotificationsDialogOpen] = useState(false);
  const [notificationsToDelete, setNotificationsToDelete] = useState<string | null>(null);
  const [newNotifications, setNewNotifications] = useState({ message: '', date: new Date() });
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [settings, setSettings] = useState({ theme: 'light', notificationsEnabled: true });
  const [isEditSettingsDialogOpen, setIsEditSettingsDialogOpen] = useState(false);
  const [editedSettings, setEditedSettings] = useState<any | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john.doe@example.com', role: 'Teacher' });
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any | null>(null);
  const [isGradesDialogOpen, setIsGradesDialogOpen] = useState(false);
  const [grades, setGrades] = useState([
    { id: '1', student: 'John Doe', subject: 'Subject 1', grade: 'A' },
    { id: '2', student: 'Jane Smith', subject: 'Subject 2', grade: 'B' },
  ]);
  const [isEditGradesDialogOpen, setIsEditGradesDialogOpen] = useState(false);
  const [editedGrades, setEditedGrades] = useState<any | null>(null);
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false);
  const [analytics, setAnalytics] = useState({ attendanceRate: 90, averageGrade: 'B' });
  const [isEditAnalyticsDialogOpen, setIsEditAnalyticsDialogOpen] = useState(false);
  const [editedAnalytics, setEditedAnalytics] = useState<any | null>(null);
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const [supportTickets, setSupportTickets] = useState([
    { id: '1', subject: 'Support Ticket 1', status: 'Open' },
    { id: '2', subject: 'Support Ticket 2', status: 'Closed' },
  ]);
  const [isEditSupportDialogOpen, setIsEditSupportDialogOpen] = useState(false);
  const [editedSupport, setEditedSupport] = useState<any | null>(null);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState([
    { id: '1', message: 'Feedback 1', date: new Date() },
    { id: '2', message: 'Feedback 2', date: new Date() },
  ]);
  const [isEditFeedbackDialogOpen, setIsEditFeedbackDialogOpen] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState<any | null>(null);
  const [isResourcesCategoriesDialogOpen, setIsResourcesCategoriesDialogOpen] = useState(false);
  const [resourcesCategories, setResourcesCategories] = useState([
    { id: '1', name: 'Category 1', description: 'Description for Category 1' },
    { id: '2', name: 'Category 2', description: 'Description for Category 2' },
  ]);
  const [isEditResourcesCategoriesDialogOpen, setIsEditResourcesCategoriesDialogOpen] = useState(false);
  const [editedResourcesCategories, setEditedResourcesCategories] = useState<any | null>(null);
  const [isEventsDialogOpen, setIsEventsDialogOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: '1', title: 'Event 1', date: new Date() },
    { id: '2', title: 'Event 2', date: new Date() },
  ]);
  const [isEditEventsDialogOpen, setIsEditEventsDialogOpen] = useState(false);
  const [editedEvents, setEditedEvents] = useState<any | null>(null);
  const [isForumsDialogOpen, setIsForumsDialogOpen] = useState(false);
  const [forums, setForums] = useState([
    { id: '1', title: 'Forum 1', description: 'Description for Forum 1' },
    { id: '2', title: 'Forum 2', description: 'Description for Forum 2' },
  ]);
  const [isEditForumsDialogOpen, setIsEditForumsDialogOpen] = useState(false);
  const [editedForums, setEditedForums] = useState<any | null>(null);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', message: 'Message 1', sender: 'John Doe', date: new Date() },
    { id: '2', message: 'Message 2', sender: 'Jane Smith', date: new Date() },
  ]);
  const [isEditChatDialogOpen, setIsEditChatDialogOpen] = useState(false);
  const [editedChat, setEditedChat] = useState<any | null>(null);
  const [isFilesDialogOpen, setIsFilesDialogOpen] = useState(false);
  const [files, setFiles] = useState([
    { id: '1', name: 'File 1', size: '1MB', date: new Date() },
    { id: '2', name: 'File 2', size: '2MB', date: new Date() },
  ]);
  const [isEditFilesDialogOpen, setIsEditFilesDialogOpen] = useState(false);
  const [editedFiles, setEditedFiles] = useState<any | null>(null);
  const [isLinksDialogOpen, setIsLinksDialogOpen] = useState(false);
  const [links, setLinks] = useState([
    { id: '1', name: 'Link 1', url: 'http://example.com/link1' },
    { id: '2', name: 'Link 2', url: 'http://example.com/link2' },
  ]);
  const [isEditLinksDialogOpen, setIsEditLinksDialogOpen] = useState(false);
  const [editedLinks, setEditedLinks] = useState<any | null>(null);
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([
    { id: '1', title: 'Event 1', date: new Date() },
    { id: '2', title: 'Event 2', date: new Date() },
  ]);
  const [isEditCalendarDialogOpen, setIsEditCalendarDialogOpen] = useState(false);
  const [editedCalendar, setEditedCalendar] = useState<any | null>(null);
  const [isAnnouncementsDialogOpen, setIsAnnouncementsDialogOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([
    { id: '1', title: 'Announcement 1', date: new Date() },
    { id: '2', title: 'Announcement 2', date: new Date() },
  ]);
  const [isEditAnnouncementsDialogOpen, setIsEditAnnouncementsDialogOpen] = useState(false);
  const [editedAnnouncements, setEditedAnnouncements] = useState<any | null>(null);
  const [isPollsDialogOpen, setIsPollsDialogOpen] = useState(false);
  const [polls, setPolls] = useState([
    { id: '1', question: 'Poll 1', options: ['Option 1', 'Option 2'] },
    { id: '2', question: 'Poll 2', options: ['Option 3', 'Option 4'] },
  ]);
  const [isEditPollsDialogOpen, setIsEditPollsDialogOpen] = useState(false);
  const [editedPolls, setEditedPolls] = useState<any | null>(null);
  const [isQuizzesDialogOpen, setIsQuizzesDialogOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([
    { id: '1', title: 'Quiz 1', questions: ['Question 1', 'Question 2'] },
    { id: '2', title: 'Quiz 2', questions: ['Question 3', 'Question 4'] },
  ]);
  const [isEditQuizzesDialogOpen, setIsEditQuizzesDialogOpen] = useState(false);
  const [editedQuizzes, setEditedQuizzes] = useState<any | null>(null);
  const [isAssignmentsSubmissionsDialogOpen, setIsAssignmentsSubmissionsDialogOpen] = useState(false);
  const [assignmentsSubmissions, setAssignmentsSubmissions] = useState([
    { id: '1', student: 'John Doe', assignment: 'Assignment 1', submissionDate: new Date() },
    { id: '2', student: 'Jane Smith', assignment: 'Assignment 2', submissionDate: new Date() },
  ]);
  const [isEditAssignmentsSubmissionsDialogOpen, setIsEditAssignmentsSubmissionsDialogOpen] = useState(false);
  const [editedAssignmentsSubmissions, setEditedAssignmentsSubmissions] = useState<any | null>(null);
  const [isAttendanceReportsDialogOpen, setIsAttendanceReportsDialogOpen] = useState(false);
  const [attendanceReports, setAttendanceReports] = useState([
    { id: '1', student: 'John Doe', attendanceRate: 90 },
    { id: '2', student: 'Jane Smith', attendanceRate: 80 },
  ]);
  const [isEditAttendanceReportsDialogOpen, setIsEditAttendanceReportsDialogOpen] = useState(false);
  const [editedAttendanceReports, setEditedAttendanceReports] = useState<any | null>(null);
  const [isCieReportsDialogOpen, setIsCieReportsDialogOpen] = useState(false);
  const [cieReports, setCieReports] = useState([
    { id: '1', student: 'John Doe', cieScore: 80 },
    { id: '2', student: 'Jane Smith', cieScore: 90 },
  ]);
  const [isEditCieReportsDialogOpen, setIsEditCieReportsDialogOpen] = useState(false);
  const [editedCieReports, setEditedCieReports] = useState<any | null>(null);
  const [isCoPoMappingDialogOpen, setIsCoPoMappingDialogOpen] = useState(false);
  const [coPoMapping, setCoPoMapping] = useState([
    { id: '1', co: 'CO1', po: 'PO1', mapping: 3 },
    { id: '2', co: 'CO2', po: 'PO2', mapping: 2 },
  ]);
  const [isEditCoPoMappingDialogOpen, setIsEditCoPoMappingDialogOpen] = useState(false);
  const [editedCoPoMapping, setEditedCoPoMapping] = useState<any | null>(null);
  const [isCourseOutcomesDialogOpen, setIsCourseOutcomesDialogOpen] = useState(false);
  const [courseOutcomes, setCourseOutcomes] = useState<CourseOutcome[]>([
    { id: 'CO1', description: 'Describe the fundamental principles', bloomLevel: 'Level 2 - Remember' }
  ]);
  
  const [newCourseOutcome, setNewCourseOutcome] = useState<Omit<CourseOutcome, 'id'>>({
    description: '',
    bloomLevel: 'Level 2 - Remember'
  });
  
  const [isCourseOutcomeDialogOpen, setIsCourseOutcomeDialogOpen] = useState(false);
  const [isEditCourseOutcomeDialogOpen, setIsEditCourseOutcomeDialogOpen] = useState(false);
  const [editedCourseOutcome, setEditedCourseOutcome] = useState<CourseOutcome | null>(null);
  const [isDeleteCourseOutcomeDialogOpen, setIsDeleteCourseOutcomeDialogOpen] = useState(false);
  const [courseOutcomeToDelete, setCourseOutcomeToDelete] = useState<string | null>(null);

  // Bloom's Taxonomy levels
  const bloomLevels = [
    'Level 1 - Understand',
    'Level 2 - Remember',
    'Level 3 - Apply',
    'Level 4 - Analyze'
  ];

  const handleAddCourseOutcome = () => {
    if (!newCourseOutcome.description.trim()) {
      toast.error('Please provide a description for the Course Outcome');
      return;
    }

    const nextId = `CO${courseOutcomes.length + 1}`;
    setCourseOutcomes([...courseOutcomes, { 
      ...newCourseOutcome, 
      id: nextId
    }]);
    
    setNewCourseOutcome({
      description: '',
      bloomLevel: 'Level 2 - Remember'
    });
    
    setIsCourseOutcomeDialogOpen(false);
    toast.success(`Course Outcome ${nextId} added successfully`);
  };

  const handleEditCourseOutcome = () => {
    if (!editedCourseOutcome) return;
    
    if (!editedCourseOutcome.description.trim()) {
      toast.error('Please provide a description for the Course Outcome');
      return;
    }

    setCourseOutcomes(courseOutcomes.map(co => 
      co.id === editedCourseOutcome.id ? editedCourseOutcome : co
    ));
    
    setIsEditCourseOutcomeDialogOpen(false);
    toast.success(`Course Outcome ${editedCourseOutcome.id} updated successfully`);
  };

  const handleDeleteCourseOutcome = () => {
    if (!courseOutcomeToDelete) return;
    
    setCourseOutcomes(courseOutcomes.filter(co => co.id !== courseOutcomeToDelete));
    setIsDeleteCourseOutcomeDialogOpen(false);
    toast.success(`Course Outcome removed successfully`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Subject Builder</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Outcomes & Bloom's Level Card */}
        <Card>
          <CardHeader>
            <CardTitle>Course Outcome & Bloom's Level</CardTitle>
            <CardDescription>
              Define course outcomes and their corresponding Bloom's taxonomy levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Course Outcomes</h3>
                <Dialog open={isCourseOutcomeDialogOpen} onOpenChange={setIsCourseOutcomeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add CO
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Course Outcome</DialogTitle>
                      <DialogDescription>
                        Define a new course outcome and select its Bloom's taxonomy level.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="co-description">Description</Label>
                        <Textarea
                          id="co-description"
                          placeholder="Enter course outcome description"
                          value={newCourseOutcome.description}
                          onChange={(e) => setNewCourseOutcome({
                            ...newCourseOutcome,
                            description: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bloom-level">Bloom's Taxonomy Level</Label>
                        <Select 
                          value={newCourseOutcome.bloomLevel}
                          onValueChange={(value) => setNewCourseOutcome({
                            ...newCourseOutcome,
                            bloomLevel: value
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a level" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloomLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsCourseOutcomeDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCourseOutcome}>
                        Add Course Outcome
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              {courseOutcomes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CO ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Bloom's Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseOutcomes.map((outcome) => (
                      <TableRow key={outcome.id}>
                        <TableCell className="font-medium">{outcome.id}</TableCell>
                        <TableCell>{outcome.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{outcome.bloomLevel}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditedCourseOutcome(outcome);
                                setIsEditCourseOutcomeDialogOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                setCourseOutcomeToDelete(outcome.id);
                                setIsDeleteCourseOutcomeDialogOpen(true);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center p-4 border rounded-md bg-muted/50">
                  <p className="text-muted-foreground">No course outcomes defined yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Other cards would go here */}
      </div>
      
      {/* Dialog for editing course outcome */}
      <Dialog open={isEditCourseOutcomeDialogOpen} onOpenChange={setIsEditCourseOutcomeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Outcome</DialogTitle>
            <DialogDescription>
              Update the course outcome and its Bloom's taxonomy level.
            </DialogDescription>
          </DialogHeader>
          {editedCourseOutcome && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-co-id">CO ID</Label>
                <Input
                  id="edit-co-id"
                  value={editedCourseOutcome.id}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-co-description">Description</Label>
                <Textarea
                  id="edit-co-description"
                  placeholder="Enter course outcome description"
                  value={editedCourseOutcome.description}
                  onChange={(e) => setEditedCourseOutcome({
                    ...editedCourseOutcome,
                    description: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-bloom-level">Bloom's Taxonomy Level</Label>
                <Select 
                  value={editedCourseOutcome.bloomLevel}
                  onValueChange={(value) => setEditedCourseOutcome({
                    ...editedCourseOutcome,
                    bloomLevel: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloomLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditCourseOutcomeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCourseOutcome}>
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <AlertDialog 
        open={isDeleteCourseOutcomeDialogOpen} 
        onOpenChange={setIsDeleteCourseOutcomeDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the course outcome. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteCourseOutcomeDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourseOutcome} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubjectBuilder;
