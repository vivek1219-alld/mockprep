import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Home, 
  List, 
  ListOrdered 
} from "lucide-react";
import { Icons } from "@/components/icons";
import { TestTimer } from "@/components/test-timer";
import { QuestionNavigator } from "@/components/question-navigator";
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

interface TestPageProps {
  id: string;
}

// Mock test data
const getTestData = (id: string) => {
  // This would normally come from an API
  return {
    id: parseInt(id),
    title: "JEE Main 2025 Complete Mock Test - Set 1",
    duration: 180, // in minutes
    questions: [
      {
        id: 1,
        text: "A particle is moving in a circular path of radius r. What is the displacement after half a revolution?",
        options: [
          "Zero", 
          "πr", 
          "2r", 
          "2πr"
        ],
        correctAnswer: 2 // index of the correct option
      },
      {
        id: 2,
        text: "Which of the following is NOT a vector quantity?",
        options: [
          "Displacement", 
          "Velocity", 
          "Work", 
          "Force"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        text: "When a ball is thrown vertically upwards, which of the following remains constant during its motion?",
        options: [
          "Kinetic energy", 
          "Potential energy", 
          "Total mechanical energy", 
          "Velocity"
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        text: "In which of the following processes does the entropy of the system decrease?",
        options: [
          "Adiabatic expansion of a gas", 
          "Isothermal expansion of a gas", 
          "Adiabatic compression of a gas", 
          "Free expansion of a gas"
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        text: "Which of the following elements has the highest first ionization energy?",
        options: [
          "Lithium", 
          "Sodium", 
          "Potassium", 
          "Cesium"
        ],
        correctAnswer: 0
      },
      {
        id: 6,
        text: "The IUPAC name of CH₃-CH₂-CHO is:",
        options: [
          "Propanone", 
          "Propanal", 
          "Propanoic acid", 
          "Propanol"
        ],
        correctAnswer: 1
      },
      {
        id: 7,
        text: "The hybridization of carbon in benzene is:",
        options: [
          "sp", 
          "sp²", 
          "sp³", 
          "dsp²"
        ],
        correctAnswer: 1
      },
      {
        id: 8,
        text: "The value of ∫₀¹ x² dx is:",
        options: [
          "1/2", 
          "1/3", 
          "2/3", 
          "3/4"
        ],
        correctAnswer: 1
      },
      {
        id: 9,
        text: "If the position vectors of the points A, B and C are ā = 2î + 3ĵ − k̂, b̄ = î − ĵ + k̂ and c̄ = 3î − 4ĵ − 5k̂ respectively, then the area of the triangle ABC is:",
        options: [
          "5 square units", 
          "10 square units", 
          "15 square units", 
          "20 square units"
        ],
        correctAnswer: 1
      },
      {
        id: 10,
        text: "The domain of the function f(x) = log(x² - 4) is:",
        options: [
          "(-∞, -2) ∪ (2, ∞)", 
          "[-2, 2]", 
          "(-2, 2)", 
          "(-∞, -2] ∪ [2, ∞)"
        ],
        correctAnswer: 0
      }
    ]
  };
};

const TestPage: React.FC<TestPageProps> = ({ id }) => {
  const [_, setLocation] = useLocation();
  const [testData, setTestData] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [timeEnd, setTimeEnd] = useState(false);

  // Fetch test data
  const { data: test, isLoading: isTestLoading } = useQuery({
    queryKey: [`/api/tests/${id}`],
    staleTime: 60000, // 1 minute
    onSuccess: (data) => {
      console.log("Fetched test data:", data);
    },
    onError: (error) => {
      console.error("Error fetching test data:", error);
      // Fallback to local data if API fails
      const data = getTestData(id);
      setTestData(data);
      setAnswers(new Array(data.questions.length).fill(null));
    }
  });
  
  // Fetch test questions
  const { data: questions, isLoading: isQuestionsLoading } = useQuery({
    queryKey: [`/api/tests/${id}/questions`],
    staleTime: 60000, // 1 minute
    enabled: !!test, // Only fetch questions when test data is available
    onSuccess: (data) => {
      console.log("Fetched questions:", data);
    },
    onError: (error) => {
      console.error("Error fetching questions:", error);
    }
  });
  
  // Set test data and initialize answers once data is loaded
  useEffect(() => {
    if (test && questions) {
      // Create combined test data
      const combinedData = {
        ...test,
        questions: questions
      };
      
      setTestData(combinedData);
      setAnswers(new Array(questions.length).fill(null));
    }
  }, [test, questions]);

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleMarkQuestion = () => {
    if (markedQuestions.includes(currentQuestion)) {
      setMarkedQuestions(markedQuestions.filter(q => q !== currentQuestion));
    } else {
      setMarkedQuestions([...markedQuestions, currentQuestion]);
    }
  };

  const handleSubmitTest = async () => {
    try {
      // Submit test attempt to the server
      const testAttemptData = {
        testId: parseInt(id),
        userId: test?.userId || 1, // Fallback to user ID 1 if not available
        answers: answers,
        timeSpent: testData.duration * 60, // Convert minutes to seconds
        isCompleted: true
      };
      
      // Call API to save test attempt
      const response = await apiRequest("POST", "/api/test-attempts", testAttemptData);
      const savedAttempt = await response.json();
      
      console.log("Test submitted successfully:", savedAttempt);
      
      // Navigate to results page
      setLocation(`/test/${id}/result?attemptId=${savedAttempt.id}`);
    } catch (error) {
      console.error("Failed to submit test:", error);
      // Navigate to results page anyway as fallback
      setLocation(`/test/${id}/result`);
    }
  };

  const handleTimeEnd = () => {
    setTimeEnd(true);
    setShowSubmitDialog(true);
  };

  const answeredQuestions = answers.filter(answer => answer !== null).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">{testData.title}</span>
            </div>
            <TestTimer 
              durationInMinutes={testData.duration} 
              onTimeEnd={handleTimeEnd}
            />
            <Button 
              variant="destructive" 
              onClick={() => setShowSubmitDialog(true)}
            >
              Submit Test
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question navigator (sidebar) */}
          <div className="hidden lg:block">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Question Navigator</h3>
              <QuestionNavigator 
                totalQuestions={testData.questions.length}
                currentQuestion={currentQuestion}
                answeredQuestions={answers.map((a, i) => a !== null ? i : -1).filter(i => i !== -1)}
                markedQuestions={markedQuestions}
                onQuestionClick={setCurrentQuestion}
              />
              
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary rounded-sm mr-2"></div>
                    <span className="text-sm">Current</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                    <span className="text-sm">Answered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></div>
                    <span className="text-sm">Marked</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded-sm mr-2"></div>
                    <span className="text-sm">Unattempted</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Questions</span>
                  <span className="font-medium">{testData.questions.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Answered</span>
                  <span className="font-medium">{answeredQuestions}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Unattempted</span>
                  <span className="font-medium">{testData.questions.length - answeredQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Marked for Review</span>
                  <span className="font-medium">{markedQuestions.length}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Question and options */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Question {currentQuestion + 1}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkQuestion}
                >
                  {markedQuestions.includes(currentQuestion) ? (
                    <>
                      <Bookmark className="h-4 w-4 mr-2 fill-yellow-500" />
                      Marked for Review
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Mark for Review
                    </>
                  )}
                </Button>
              </div>
              
              <div className="mb-6">
                <p className="text-lg">{testData.questions[currentQuestion].text}</p>
              </div>
              
              <div className="space-y-4">
                {testData.questions[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      answers[currentQuestion] === index 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-start">
                      <div 
                        className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          answers[currentQuestion] === index 
                            ? 'border-primary text-primary' 
                            : 'border-gray-300'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="mt-0.5">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex space-x-3 lg:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSubmitDialog(true)}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Show mobile question navigator
                    }}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  onClick={() => setCurrentQuestion(Math.min(testData.questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === testData.questions.length - 1}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Submit test confirmation dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {timeEnd ? 'Time\'s Up!' : 'Submit Test?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {timeEnd ? (
                'Your allotted time for this test has ended. Your answers will be automatically submitted.'
              ) : (
                <>
                  You have answered {answeredQuestions} out of {testData.questions.length} questions.
                  {answeredQuestions < testData.questions.length && (
                    ` There are ${testData.questions.length - answeredQuestions} unanswered questions.`
                  )}
                  <br /><br />
                  Are you sure you want to submit the test? You won't be able to change your answers after submission.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {!timeEnd && (
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            )}
            <AlertDialogAction onClick={handleSubmitTest}>
              {timeEnd ? 'View Results' : 'Submit Test'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestPage;