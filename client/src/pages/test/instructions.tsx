import { useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TestInstructionsProps {
  testId: number;
}

const TestInstructions = ({ testId }: TestInstructionsProps) => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  // Fetch test details
  const { data: test, isLoading } = useQuery({
    queryKey: [`/api/tests/${testId}`],
    enabled: !!testId,
  });

  // Fetch exam type for the test
  const { data: examTypes = [] } = useQuery({
    queryKey: ["/api/exam-types"],
    enabled: !!test,
  });

  const examType = examTypes.find((et) => test && et.id === test.examTypeId);

  const startTest = async () => {
    if (!user || !test) return;

    try {
      // Create a test attempt record
      const testAttemptData = {
        userId: user.id,
        testId: test.id,
        startTime: new Date(),
        isCompleted: false,
        answers: Array(test.totalQuestions).fill(null),
        markedForReview: [],
        timeSpent: 0
      };
      
      const res = await apiRequest("POST", "/api/test-attempts", testAttemptData);
      const testAttempt = await res.json();
      
      // Navigate to the test page
      setLocation(`/test/${testId}/take?attemptId=${testAttempt.id}`);
    } catch (error) {
      console.error("Error starting test:", error);
      toast({
        title: "Error",
        description: "Failed to start the test. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
        <Icons.clock className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading test details...</span>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center p-6">
              <Icons.x className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Test Not Found</h2>
              <p className="text-slate-500 mb-4">
                The test you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => setLocation("/tests")}>
                Browse Tests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Test Instructions</h1>
        <Button variant="outline" onClick={() => setLocation("/tests")}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back to Tests
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              {examType ? (
                <Icons.atom className="h-6 w-6 text-primary" />
              ) : (
                <Icons.fileText className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{test.name}</h2>
              <p className="text-slate-500">{test.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
              <Icons.clock className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-500">Duration</p>
                <p className="font-medium">{test.duration} minutes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
              <Icons.helpCircle className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-500">Questions</p>
                <p className="font-medium">{test.totalQuestions} questions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
              <Icons.zap className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-500">Passing Score</p>
                <p className="font-medium">50%</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Test Instructions</h3>
            <div className="space-y-3 text-slate-700">
              <p>Please read the following instructions carefully before starting the test:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>The test contains {test.totalQuestions} multiple-choice questions.</li>
                <li>You have {test.duration} minutes to complete the test.</li>
                <li>Each question has only one correct answer.</li>
                <li>There is no negative marking for wrong answers.</li>
                <li>You can mark questions for review and return to them later.</li>
                <li>Once you submit the test, you cannot retake it.</li>
                <li>Ensure you have a stable internet connection before starting.</li>
                <li>Do not refresh the page during the test as it may result in loss of answers.</li>
              </ol>
            </div>
          </div>

          <div className="mb-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-primary font-medium mb-2 flex items-center">
              <Icons.messageCircle className="h-5 w-5 mr-2" />
              Tips for Success
            </h3>
            <ul className="space-y-2 text-slate-700 pl-4">
              <li>Read each question carefully before answering.</li>
              <li>Manage your time efficiently - don't spend too long on difficult questions.</li>
              <li>Use the "Mark for Review" feature for questions you want to revisit.</li>
              <li>If unsure, eliminate obviously wrong options to improve your chances.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="agreement"
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label htmlFor="agreement" className="text-sm text-slate-700">
                I have read and understood all the instructions
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <Button size="lg" onClick={startTest}>
              Start Test
              <Icons.arrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestInstructions;
