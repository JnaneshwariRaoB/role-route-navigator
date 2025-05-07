
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AssociatorHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Course Associator Dashboard</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">My Courses</h3>
          </div>
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-indigo-600">4</div>
            <p className="text-sm text-gray-500">Assigned courses for this semester</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">Upcoming Sessions</h3>
          </div>
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-indigo-600">8</div>
            <p className="text-sm text-gray-500">Sessions in next 7 days</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold">Pending Tasks</h3>
          </div>
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-indigo-600">3</div>
            <p className="text-sm text-gray-500">Assignments to evaluate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-lg font-medium mb-4">My Schedule</h2>
          <Card className="p-4">
            <div className="space-y-4">
              {[
                { time: "09:00 AM - 10:00 AM", course: "Introduction to Computing", batch: "CSE - A" },
                { time: "11:00 AM - 12:00 PM", course: "Data Structures", batch: "CSE - B" },
                { time: "02:00 PM - 03:00 PM", course: "Algorithms Lab", batch: "CSE - C" },
              ].map((session, i) => (
                <div key={i} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mr-4"></div>
                  <div>
                    <p className="font-medium">{session.time}</p>
                    <p className="text-sm text-gray-500">{session.course} • {session.batch}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Announcements</h2>
          <Card className="p-4">
            <div className="space-y-4">
              {[
                { title: "Mid-term Evaluation", text: "Submit mid-term evaluation reports by Friday" },
                { title: "Faculty Meeting", text: "Department meeting scheduled for May 15th" },
                { title: "Workshop", text: "Register for the upcoming AI workshop" },
              ].map((announcement, i) => (
                <div key={i} className="border-l-2 border-indigo-500 pl-3 py-1">
                  <p className="font-medium">{announcement.title}</p>
                  <p className="text-sm text-gray-500">{announcement.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssociatorHome;
