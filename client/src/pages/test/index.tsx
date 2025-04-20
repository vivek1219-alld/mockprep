import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useSearch } from "wouter";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AuthContext } from "@/App";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TestCardProps {
  id: number;
  name: string;
  description: string;
  duration: number;
  totalQuestions: number;
  examType: string;
  subject?: string;
}

const TestCard = ({
  id,
  name,
  description,
  duration,
  totalQuestions,
  examType,
  subject,
}: TestCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-primary rounded-full">
            {examType}
          </span>
          {subject && (
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-600 rounded-full">
              {subject}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-slate-500 mb-4">{description}</p>
        <div className="flex items-center text-xs text-slate-500 mb-4">
          <Icons.clock className="mr-1 h-3 w-3" />
          <span>{duration} minutes</span>
          <span className="mx-2">•</span>
          <Icons.helpCircle className="mr-1 h-3 w-3" />
          <span>{totalQuestions} questions</span>
        </div>
        <Link href={`/test/${id}/instructions`}>
          <Button className="w-full">Start Test</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const TestsPage = () => {
  const { user } = useContext(AuthContext);
  const [examTypeFilter, setExamTypeFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const search = useSearch();
  const examTypeId = new URLSearchParams(search).get("examType");

  useEffect(() => {
    if (examTypeId) {
      setExamTypeFilter(examTypeId);
    }
  }, [examTypeId]);

  // Fetch exam types
  const { data: examTypes = [] } = useQuery({
    queryKey: ["/api/exam-types"],
  });

  // Fetch subjects based on exam type filter
  const { data: subjects = [] } = useQuery({
    queryKey: ["/api/subjects", examTypeFilter],
    queryFn: async () => {
      if (examTypeFilter === "all") {
        return await (await fetch("/api/subjects")).json();
      }
      return await (
        await fetch(`/api/subjects?examTypeId=${examTypeFilter}`)
      ).json();
    },
  });

  // Fetch tests based on filters
  const { data: tests = [], isLoading } = useQuery({
    queryKey: ["/api/tests", examTypeFilter, subjectFilter],
    queryFn: async () => {
      let url = "/api/tests";
      const params = new URLSearchParams();
      
      if (examTypeFilter !== "all") {
        params.append("examTypeId", examTypeFilter);
      }
      
      if (subjectFilter !== "all") {
        params.append("subjectId", subjectFilter);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      return await (await fetch(url)).json();
    },
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Tests</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-full md:w-auto">
              <label className="text-sm font-medium mb-1 block">Exam Type</label>
              <Select
                value={examTypeFilter}
                onValueChange={(value) => {
                  setExamTypeFilter(value);
                  setSubjectFilter("all"); // Reset subject when exam type changes
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exam Types</SelectItem>
                  {examTypes.map((examType) => (
                    <SelectItem key={examType.id} value={examType.id.toString()}>
                      {examType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Select
                value={subjectFilter}
                onValueChange={setSubjectFilter}
                disabled={examTypeFilter === "all"}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="saved">Saved Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Icons.clock className="mr-2 h-6 w-6 animate-spin" />
              <span>Loading tests...</span>
            </div>
          ) : tests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test) => {
                const examType = examTypes.find((et) => et.id === test.examTypeId);
                const subject = test.subjectId
                  ? subjects.find((s) => s.id === test.subjectId)
                  : undefined;
                
                return (
                  <TestCard
                    key={test.id}
                    id={test.id}
                    name={test.name}
                    description={test.description}
                    duration={test.duration}
                    totalQuestions={test.totalQuestions}
                    examType={examType?.name || "Exam"}
                    subject={subject?.name}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
              <Icons.fileText className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">No tests found</h3>
              <p className="text-slate-500 mb-4">
                No tests match your current filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setExamTypeFilter("all");
                  setSubjectFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
            <Icons.bookmark className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No saved tests</h3>
            <p className="text-slate-500">
              You haven't saved any tests for later yet.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          {user ? (
            <CompletedTests userId={user.id} />
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-500">Please log in to view your completed tests.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CompletedTests = ({ userId }: { userId: number }) => {
  const { data: testAttempts = [], isLoading } = useQuery({
    queryKey: [`/api/users/${userId}/test-attempts`],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/test-attempts`);
      const attempts = await res.json();
      return attempts.filter((attempt: any) => attempt.isCompleted);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Icons.clock className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading your test history...</span>
      </div>
    );
  }

  if (testAttempts.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
        <Icons.check className="mx-auto h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-medium text-slate-800 mb-2">No completed tests</h3>
        <p className="text-slate-500 mb-4">
          You haven't completed any tests yet.
        </p>
        <Link href="/">
          <Button>Browse Available Tests</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {testAttempts.map((attempt: any) => (
        <Card key={attempt.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="p-5 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-primary rounded-full">
                    Test ID: {attempt.testId}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(attempt.endTime).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-medium text-lg">Test Result</h3>
                <div className="flex items-center text-sm text-slate-500 mt-1 mb-3">
                  <span>Score: {attempt.score || 0}%</span>
                  <span className="mx-2">•</span>
                  <span>Time: {Math.floor(attempt.timeSpent / 60)} minutes</span>
                </div>
                <Link href={`/test-attempt/${attempt.id}/result`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
              <div className="bg-slate-100 p-5 md:w-32 flex flex-row md:flex-col items-center justify-between md:justify-center md:h-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {attempt.score || 0}%
                  </div>
                  <div className="text-xs text-slate-500">Your Score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestsPage;
