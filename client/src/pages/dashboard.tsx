import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AuthContext } from "@/App";
import ExamCategoryCard from "@/components/exam-category-card";
import ActivityItem from "@/components/activity-item";
import UpcomingTestCard from "@/components/upcoming-test-card";
import SubjectPerformanceCard from "@/components/subject-performance-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [timeframe, setTimeframe] = useState("all");
  
  // Fetch exam types
  const { data: examTypes = [] } = useQuery({
    queryKey: ["/api/exam-types"],
  });
  
  // Fetch recent activity
  const { data: recentActivity = [] } = useQuery({
    queryKey: [`/api/users/${user?.id}/recent-activity`],
    enabled: !!user,
  });
  
  // Fetch upcoming tests
  const { data: upcomingTests = [] } = useQuery({
    queryKey: [`/api/users/${user?.id}/upcoming-tests`],
    enabled: !!user,
  });
  
  // Fetch user stats
  const { data: userStats } = useQuery({
    queryKey: [`/api/users/${user?.id}/stats`],
    enabled: !!user,
  });
  
  // Fetch subject performance
  const { data: subjectPerformance = [] } = useQuery({
    queryKey: [`/api/users/${user?.id}/subject-performance`],
    enabled: !!user,
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button asChild>
          <Link href="/exam/jee">
            <div className="flex items-center">
              <Icons.plus className="mr-1 h-4 w-4" /> New Test
            </div>
          </Link>
        </Button>
      </div>

      {/* Recent Activity Card */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button variant="link" className="text-primary p-0 h-auto" asChild>
              <Link href="/activity-history">
                View All
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => {
                let iconInfo = {
                  icon: "file-text",
                  bg: "bg-blue-100",
                  color: "text-primary",
                };
                
                if (activity.isCompleted) {
                  if (activity.score && activity.score > 75) {
                    iconInfo = {
                      icon: "check",
                      bg: "bg-green-100",
                      color: "text-green-600",
                    };
                  }
                } else {
                  iconInfo = {
                    icon: "book",
                    bg: "bg-amber-100",
                    color: "text-amber-600",
                  };
                }
                
                const description = activity.isCompleted
                  ? `Completed with ${activity.score}% score`
                  : "Started but not completed";
                
                return (
                  <ActivityItem
                    key={index}
                    icon={iconInfo.icon}
                    iconBg={iconInfo.bg}
                    iconColor={iconInfo.color}
                    title={activity.test.name}
                    date={activity.endTime || activity.startTime}
                    description={description}
                    testId={activity.test.id}
                  />
                );
              })
            ) : (
              <p className="text-center text-slate-500 py-4">No recent activity found</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Exam Categories */}
      <h2 className="text-xl font-semibold mb-4">Exam Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {examTypes.map((category, index) => (
          <ExamCategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            icon={category.icon}
            testCount={24} // This should come from the API in a real app
            colorClass={
              index === 0
                ? "blue"
                : index === 1
                ? "green"
                : index === 2
                ? "amber"
                : "indigo"
            }
          />
        ))}
      </div>

      {/* Performance & Upcoming Tests Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Overview Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Performance Overview</h2>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px] h-8 text-sm border border-slate-200 bg-white">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-64 w-full">
            {/* Placeholder for Chart */}
            <div className="h-full w-full bg-slate-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icons.chartLine className="mx-auto h-12 w-12 text-slate-300 mb-2" />
                <p className="text-slate-400 text-sm">Performance chart will appear here</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-slate-500">Tests Taken</p>
              <p className="text-xl font-semibold text-slate-800">
                {userStats?.testsTaken || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500">Avg. Score</p>
              <p className="text-xl font-semibold text-green-600">
                {userStats?.avgScore ? Math.round(userStats.avgScore) : 0}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500">Completion</p>
              <p className="text-xl font-semibold text-primary">
                {userStats?.completion ? Math.round(userStats.completion) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Tests Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Tests</h2>
            <Button variant="link" className="text-primary p-0 h-auto" asChild>
              <Link href="/upcoming-tests">
                View All
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {upcomingTests.length > 0 ? (
              upcomingTests.map((test, index) => {
                // In a real app, would get from the API
                const daysFromNow = index + 1;
                const colorClasses = ["blue", "green", "amber"];
                
                return (
                  <UpcomingTestCard
                    key={test.id}
                    id={test.id}
                    name={test.name}
                    examType={examTypes.find(et => et.id === test.examTypeId)?.name || "Exam"}
                    examTypeIcon={examTypes.find(et => et.id === test.examTypeId)?.icon || "book"}
                    duration={test.duration}
                    totalQuestions={test.totalQuestions}
                    daysFromNow={daysFromNow}
                    badgeColorClass={colorClasses[index % colorClasses.length]}
                  />
                );
              })
            ) : (
              <p className="text-center text-slate-500 py-4">No upcoming tests found</p>
            )}
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {subjectPerformance.length > 0 ? (
          subjectPerformance.map((subject) => (
            <SubjectPerformanceCard
              key={subject.name}
              name={subject.name}
              icon={subject.icon}
              accuracy={Math.round(subject.accuracy)}
              completion={Math.round(subject.completion)}
            />
          ))
        ) : (
          Array(4).fill(0).map((_, index) => (
            <SubjectPerformanceCard
              key={index}
              name={["Physics", "Chemistry", "Mathematics", "Biology"][index]}
              icon={["atom", "flask", "square-root-alt", "dna"][index]}
              accuracy={[72, 68, 75, 81][index]}
              completion={[85, 79, 82, 90][index]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
