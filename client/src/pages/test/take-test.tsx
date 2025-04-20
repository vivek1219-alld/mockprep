import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { apiRequest } from "@/lib/queryClient";
import TestTimer from "@/components/test-timer";
import QuestionNavigator from "@/components/question-navigator";
import { useToast } from "@/hooks/use-toast";
import { formatTime } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TakeTestProps {
  testId: number;
}

const TakeTest = ({ testId }: TakeTestProps) => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const search = useSearch();
  const attemptId = new URLSearchParams(search).get("attemptId");
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch test details
  const { data: test, isLoading: isTestLoading } = useQuery({
    queryKey: [`/api/tests/${testId}`],
    enabled: !!testId,
  });

  // Fetch test questions
  const { data: questions = [], isLoading: isQuestionsLoading } = useQuery({
    queryKey: [`/api/tests/${testId}/questions`],
    enabled: !!testId,
  });

  // Fetch test attempt if attemptId is present
  const { data: testAttempt, isLoading: isAttemptLoading } = useQuery({
    queryKey: [`/api/test-attempts/${attemptId}`],
    enabled: !!attemptId,
    queryFn: async () => {
      const res = await fetch(`/api/test-attempts/${attemptId}`);
      if (!res.ok) throw new Error("Failed to fetch test attempt");
      const data = await res.json();
      return data.testAttempt;
    },
  });

  // Initialize answers and marked questions when test attempt loads
  useEffect(() => {
    if (testAttempt) {
      if (testAttempt.answers) {
        setAnswers(testAttempt.answers);
      }
      if (testAttempt.markedForReview) {
        setMarkedForReview(testAttempt.markedForReview);
      }
      if (testAttempt.timeSpent) {
        setTimeSpent(testAttempt.timeSpent);
      }
    } else if (questions.length > 0) {
      // Initialize answers array when questions load
      setAnswers(Array(questions.length).fill(null));
    }
  }, [testAttempt, questions]);

  // Timer effect to track time spent
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Periodically save test progress
  useEffect(() => {
    const saveProgress = async () => {
      if (attemptId && user) {
        try {
          await apiRequest("PUT", `/api/test-attempts/${attemptId}`, {
            answers,
            markedForReview,
            timeSpent,
          });
        } catch (error) {
          console.error("Error saving progress:", error);
        }
      }
    };

    // Save progress every 30 seconds
    const saveInterval = setInterval(saveProgress, 30000);

    return () => {
      clearInterval(saveInterval);
      // Save progress when component unmounts
      saveProgress();
    };
  }, [attemptId, answers, markedForReview, timeSpent, user]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const toggleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    const index = newMarkedForReview.indexOf(currentQuestionIndex);
    
    if (index === -1) {
      // Add to marked for review
      newMarkedForReview.push(currentQuestionIndex);
    } else {
      // Remove from marked for review
      newMarkedForReview.splice(index, 1);
    }
    
    setMarkedForReview(newMarkedForReview);
  };

  const handleSaveAndExit = async () => {
    if (attemptId) {
      try {
        await apiRequest("PUT", `/api/test-attempts/${attemptId}`, {
          answers,
          markedForReview,
          timeSpent,
          isCompleted: false,
        });
        
        toast({
          title: "Progress Saved",
          description: "Your test progress has been saved. You can resume later.",
        });
        
        setLocation("/tests");
      } catch (error) {
        console.error("Error saving progress:", error);
        toast({
          title: "Error",
          description: "Failed to save your progress. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmitTest = async () => {
    if (attemptId) {
      try {
        await apiRequest("PUT", `/api/test-attempts/${attemptId}`, {
          answers,
          markedForReview,
          timeSpent,
          isCompleted: true,
          endTime: new Date(),
        });
        
        toast({
          title: "Test Submitted",
          description: "Your test has been submitted successfully.",
        });
        
        setLocation(`/test-attempt/${attemptId}/result`);
      } catch (error) {
        console.error("Error submitting test:", error);
        toast({
          title: "Error",
          description: "Failed to submit your test. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleTimeEnd = () => {
    toast({
      title: "Time's Up!",
      description: "Your test time has expired. Submitting your answers now.",
      variant: "destructive",
    });
    
    handleSubmitTest();
  };

  if (isTestLoading || isQuestionsLoading || isAttemptLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="text-center">
          <Icons.clock className="mx-auto h-10 w-10 text-primary animate-spin mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loading Test</h2>
          <p className="text-slate-500">Please wait while we prepare your test.</p>
        </div>
      </div>
    );
  }

  if (!test || !questions.length || !attemptId) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="text-center max-w-md mx-auto p-6">
          <Icons.x className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Test Not Available</h2>
          <p className="text-slate-500 mb-6">
            The test you're looking for is not available or has been removed.
          </p>
          <Button onClick={() => setLocation("/tests")}>Browse Tests</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isMarkedForReview = markedForReview.includes(currentQuestionIndex);
  const answeredQuestions = answers.reduce((count, answer) => 
    count + (answer !== null ? 1 : 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Test Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{test.name}</h1>
            <p className="text-sm text-slate-500 mt-1">{test.description}</p>
          </div>
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <TestTimer 
              durationInMinutes={test.duration} 
              onTimeEnd={handleTimeEnd}
              initialSeconds={test.duration * 60 - timeSpent}
            />
            
            <Button 
              variant="destructive" 
              onClick={() => setShowSubmitDialog(true)}
            >
              Submit Test
            </Button>
          </div>
        </div>
      </div>

      {/* Test Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="mb-4 pb-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm font-medium">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMarkForReview}
                    className={isMarkedForReview ? "text-indigo-600" : "text-slate-500"}
                  >
                    <Icons.flag className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="font-serif">
                <p className="text-lg text-slate-800 mb-4">{currentQuestion.text}</p>
                {currentQuestion.diagram && (
                  <div className="bg-slate-50 p-3 rounded-lg mb-3">
                    <img 
                      src={currentQuestion.diagram} 
                      alt="Question Diagram" 
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 font-serif">
              {currentQuestion.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="answer"
                    checked={answers[currentQuestionIndex] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="w-5 h-5 text-primary focus:ring-primary border-slate-300"
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="flex-1 py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
                <Icons.chevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="hidden lg:block">
            <QuestionNavigator
              totalQuestions={questions.length}
              currentQuestion={currentQuestionIndex}
              answeredQuestions={answers
                .map((answer, index) => (answer !== null ? index : -1))
                .filter((index) => index !== -1)}
              markedQuestions={markedForReview}
              onQuestionClick={setCurrentQuestionIndex}
            />

            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                className="w-full px-4 py-2 bg-blue-100 text-primary hover:bg-blue-200 border-blue-200"
                onClick={() => setShowExitDialog(true)}
              >
                <Icons.eye className="mr-2 h-4 w-4" />
                View Instructions
              </Button>

              <Button
                variant="outline"
                className="w-full px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
                onClick={() => setShowExitDialog(true)}
              >
                <Icons.save className="mr-2 h-4 w-4" />
                Save & Exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">{answeredQuestions}/{questions.length}</span> answered
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowExitDialog(true)}
          >
            Save & Exit
          </Button>
          
          <Button 
            size="sm"
            onClick={() => setShowSubmitDialog(true)}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save and Exit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be saved and you can resume the test later. Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveAndExit}>
              Save & Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answeredQuestions} out of {questions.length} questions.
              <br />
              Time spent: {formatTime(timeSpent)}
              <br /><br />
              Are you sure you want to submit the test? You won't be able to change your answers after submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitTest}>
              Submit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TakeTest;
