import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award,
  Check,
  Clock,
  FileQuestion,
  Home,
  Share2,
  Target,
  X,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTime, formatTimeSpent } from "@/lib/utils";

interface TestResultProps {
  id: string;
}

// Mock test result data
const getTestResult = (id: string) => {
  return {
    id: parseInt(id),
    title: "JEE Main 2025 Complete Mock Test - Set 1",
    score: 75,
    totalQuestions: 10,
    correctAnswers: 7,
    incorrectAnswers: 2,
    skippedQuestions: 1,
    timeSpent: 4530, // in seconds (1 hour, 15 minutes, 30 seconds)
    accuracy: 77.8, // percentage
    percentile: 86.5,
    subjects: [
      {
        name: "Physics",
        totalQuestions: 4,
        correctAnswers: 3,
        incorrectAnswers: 1,
        skippedQuestions: 0,
        accuracy: 75,
        timeSpent: 1845, // in seconds
      },
      {
        name: "Chemistry",
        totalQuestions: 3,
        correctAnswers: 2,
        incorrectAnswers: 1,
        skippedQuestions: 0,
        accuracy: 66.7,
        timeSpent: 1250, // in seconds
      },
      {
        name: "Mathematics",
        totalQuestions: 3,
        correctAnswers: 2,
        incorrectAnswers: 0,
        skippedQuestions: 1,
        accuracy: 100,
        timeSpent: 1435, // in seconds
      }
    ],
    questions: [
      {
        id: 1,
        text: "A particle is moving in a circular path of radius r. What is the displacement after half a revolution?",
        subject: "Physics",
        difficulty: "Medium",
        options: [
          "Zero", 
          "πr", 
          "2r", 
          "2πr"
        ],
        correctAnswer: 2, // index of the correct option
        userAnswer: 2,
        timeSpent: 45, // in seconds
        isCorrect: true
      },
      {
        id: 2,
        text: "Which of the following is NOT a vector quantity?",
        subject: "Physics",
        difficulty: "Easy",
        options: [
          "Displacement", 
          "Velocity", 
          "Work", 
          "Force"
        ],
        correctAnswer: 2,
        userAnswer: 2,
        timeSpent: 55,
        isCorrect: true
      },
      {
        id: 3,
        text: "When a ball is thrown vertically upwards, which of the following remains constant during its motion?",
        subject: "Physics",
        difficulty: "Medium",
        options: [
          "Kinetic energy", 
          "Potential energy", 
          "Total mechanical energy", 
          "Velocity"
        ],
        correctAnswer: 2,
        userAnswer: 2,
        timeSpent: 68,
        isCorrect: true
      },
      {
        id: 4,
        text: "In which of the following processes does the entropy of the system decrease?",
        subject: "Physics",
        difficulty: "Hard",
        options: [
          "Adiabatic expansion of a gas", 
          "Isothermal expansion of a gas", 
          "Adiabatic compression of a gas", 
          "Free expansion of a gas"
        ],
        correctAnswer: 2,
        userAnswer: 0,
        timeSpent: 90,
        isCorrect: false
      },
      {
        id: 5,
        text: "Which of the following elements has the highest first ionization energy?",
        subject: "Chemistry",
        difficulty: "Medium",
        options: [
          "Lithium", 
          "Sodium", 
          "Potassium", 
          "Cesium"
        ],
        correctAnswer: 0,
        userAnswer: 0,
        timeSpent: 60,
        isCorrect: true
      },
      {
        id: 6,
        text: "The IUPAC name of CH₃-CH₂-CHO is:",
        subject: "Chemistry",
        difficulty: "Medium",
        options: [
          "Propanone", 
          "Propanal", 
          "Propanoic acid", 
          "Propanol"
        ],
        correctAnswer: 1,
        userAnswer: 1,
        timeSpent: 45,
        isCorrect: true
      },
      {
        id: 7,
        text: "The hybridization of carbon in benzene is:",
        subject: "Chemistry",
        difficulty: "Hard",
        options: [
          "sp", 
          "sp²", 
          "sp³", 
          "dsp²"
        ],
        correctAnswer: 1,
        userAnswer: 3,
        timeSpent: 70,
        isCorrect: false
      },
      {
        id: 8,
        text: "The value of ∫₀¹ x² dx is:",
        subject: "Mathematics",
        difficulty: "Medium",
        options: [
          "1/2", 
          "1/3", 
          "2/3", 
          "3/4"
        ],
        correctAnswer: 1,
        userAnswer: 1,
        timeSpent: 85,
        isCorrect: true
      },
      {
        id: 9,
        text: "If the position vectors of the points A, B and C are ā = 2î + 3ĵ − k̂, b̄ = î − ĵ + k̂ and c̄ = 3î − 4ĵ − 5k̂ respectively, then the area of the triangle ABC is:",
        subject: "Mathematics",
        difficulty: "Hard",
        options: [
          "5 square units", 
          "10 square units", 
          "15 square units", 
          "20 square units"
        ],
        correctAnswer: 1,
        userAnswer: 1,
        timeSpent: 115,
        isCorrect: true
      },
      {
        id: 10,
        text: "The domain of the function f(x) = log(x² - 4) is:",
        subject: "Mathematics",
        difficulty: "Hard",
        options: [
          "(-∞, -2) ∪ (2, ∞)", 
          "[-2, 2]", 
          "(-2, 2)", 
          "(-∞, -2] ∪ [2, ∞)"
        ],
        correctAnswer: 0,
        userAnswer: null,
        timeSpent: 0,
        isCorrect: false,
        isSkipped: true
      }
    ],
    recommendedTests: [
      {
        id: 5,
        title: "JEE Main Physics Practice Test",
        description: "Focus on mechanics and electromagnetism",
        totalQuestions: 30,
        difficulty: "Medium"
      },
      {
        id: 7,
        title: "JEE Main Advanced Mathematics",
        description: "Focus on calculus and coordinate geometry",
        totalQuestions: 25,
        difficulty: "Hard"
      }
    ],
    weakAreas: [
      "Thermodynamics in Physics",
      "Organic Chemistry Nomenclature",
      "Coordinate Geometry"
    ]
  };
};

const SubjectPerformanceCard = ({ subject }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{subject.name}</CardTitle>
        <CardDescription className="text-xs">
          {subject.correctAnswers} out of {subject.totalQuestions} correct
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Accuracy</span>
              <span className="font-medium">{subject.accuracy}%</span>
            </div>
            <Progress value={subject.accuracy} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Time spent</span>
              <span className="font-medium">{formatTimeSpent(subject.timeSpent)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
            <div className="rounded-md bg-green-50 p-2">
              <div className="font-medium text-green-600">{subject.correctAnswers}</div>
              <div className="text-green-700">Correct</div>
            </div>
            <div className="rounded-md bg-red-50 p-2">
              <div className="font-medium text-red-600">{subject.incorrectAnswers}</div>
              <div className="text-red-700">Incorrect</div>
            </div>
            <div className="rounded-md bg-gray-50 p-2">
              <div className="font-medium text-gray-600">{subject.skippedQuestions}</div>
              <div className="text-gray-700">Skipped</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ScoreGauge = ({ score }) => {
  const color = score >= 75 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500";
  
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        className="w-32 h-32"
        viewBox="0 0 100 100"
      >
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        <circle
          className={color}
          strokeWidth="8"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          strokeDasharray={`${score * 2.51} 251`}
          strokeDashoffset="0"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-3xl font-bold ${color}`}>{score}</span>
        <span className="text-xs text-gray-500">out of 100</span>
      </div>
    </div>
  );
};

const DifficultyBadge = ({ difficulty }) => {
  const getColor = () => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColor()}`}>
      {difficulty}
    </span>
  );
};

const TestResult: React.FC<TestResultProps> = ({ id }) => {
  const [_, setLocation] = useLocation();
  const [resultData, setResultData] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const data = getTestResult(id);
    setResultData(data);
  }, [id]);
  
  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const handleGoToDashboard = () => {
    setLocation('/dashboard');
  };
  
  const handleShareResult = () => {
    // In a real app, this would share the result
    alert('Share functionality will be implemented here');
  };
  
  const handleRetakeTest = () => {
    setLocation(`/test/${id}/instructions`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">{resultData.title} - Results</span>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareResult}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                size="sm"
                onClick={handleRetakeTest}
              >
                Retake Test
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        {/* Score overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Test Performance</CardTitle>
              <CardDescription>
                Your overall performance in {resultData.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <ScoreGauge score={resultData.score} />
                  <div className="text-center space-y-1">
                    <div className="text-sm text-gray-500">Your Percentile</div>
                    <div className="text-2xl font-bold">{resultData.percentile}</div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Correct Answers</div>
                        <div className="text-lg font-semibold">{resultData.correctAnswers} out of {resultData.totalQuestions}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Incorrect Answers</div>
                        <div className="text-lg font-semibold">{resultData.incorrectAnswers} out of {resultData.totalQuestions}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <FileQuestion className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Skipped Questions</div>
                        <div className="text-lg font-semibold">{resultData.skippedQuestions} out of {resultData.totalQuestions}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Time Spent</div>
                        <div className="text-lg font-semibold">{formatTimeSpent(resultData.timeSpent)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Areas for Improvement</CardTitle>
              <CardDescription>
                Focus on these topics to improve your score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resultData.weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <Target className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Recommended Tests</h4>
                  {resultData.recommendedTests.map((test) => (
                    <div 
                      key={test.id} 
                      className="p-3 border border-gray-200 rounded-md hover:border-primary cursor-pointer transition-colors"
                      onClick={() => setLocation(`/test/${test.id}/instructions`)}
                    >
                      <div className="font-medium text-sm">{test.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{test.description}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{test.totalQuestions} questions</span>
                        <DifficultyBadge difficulty={test.difficulty} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Subject-wise performance */}
        <h2 className="text-xl font-bold mb-4">Subject-wise Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {resultData.subjects.map((subject, index) => (
            <SubjectPerformanceCard key={index} subject={subject} />
          ))}
        </div>
        
        {/* Question analysis */}
        <h2 className="text-xl font-bold mb-4">Question Analysis</h2>
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <div className="border-b px-6 py-2">
                <TabsList className="w-full justify-start gap-6">
                  <TabsTrigger value="all">All Questions</TabsTrigger>
                  <TabsTrigger value="correct">Correct ({resultData.correctAnswers})</TabsTrigger>
                  <TabsTrigger value="incorrect">Incorrect ({resultData.incorrectAnswers})</TabsTrigger>
                  <TabsTrigger value="skipped">Skipped ({resultData.skippedQuestions})</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14">#</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Your Answer</TableHead>
                      <TableHead>Correct Answer</TableHead>
                      <TableHead className="text-right">Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultData.questions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell className="font-medium">{question.id}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{question.text}</span>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-md">
                                <p>{question.text}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>{question.subject}</TableCell>
                        <TableCell>
                          <DifficultyBadge difficulty={question.difficulty} />
                        </TableCell>
                        <TableCell>
                          {question.userAnswer !== null ? (
                            <div className="flex items-center">
                              <span className={`flex items-center justify-center w-6 h-6 rounded-full border text-xs mr-2 ${
                                question.isCorrect 
                                  ? 'border-green-500 text-green-500' 
                                  : 'border-red-500 text-red-500'
                              }`}>
                                {String.fromCharCode(65 + question.userAnswer)}
                              </span>
                              {question.isCorrect ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-500">Skipped</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center justify-center w-6 h-6 rounded-full border border-green-500 text-green-500 text-xs">
                            {String.fromCharCode(65 + question.correctAnswer)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {question.timeSpent > 0 ? formatTime(question.timeSpent) : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="correct" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14">#</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Your Answer</TableHead>
                      <TableHead className="text-right">Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultData.questions
                      .filter(q => q.isCorrect)
                      .map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="font-medium">{question.id}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help">{question.text}</span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-md">
                                  <p>{question.text}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>{question.subject}</TableCell>
                          <TableCell>
                            <DifficultyBadge difficulty={question.difficulty} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-green-500 text-green-500 text-xs mr-2">
                                {String.fromCharCode(65 + question.userAnswer)}
                              </span>
                              <Check className="h-4 w-4 text-green-500" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {formatTime(question.timeSpent)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="incorrect" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14">#</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Your Answer</TableHead>
                      <TableHead>Correct Answer</TableHead>
                      <TableHead className="text-right">Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultData.questions
                      .filter(q => !q.isCorrect && !q.isSkipped)
                      .map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="font-medium">{question.id}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help">{question.text}</span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-md">
                                  <p>{question.text}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>{question.subject}</TableCell>
                          <TableCell>
                            <DifficultyBadge difficulty={question.difficulty} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-red-500 text-red-500 text-xs mr-2">
                                {String.fromCharCode(65 + question.userAnswer)}
                              </span>
                              <X className="h-4 w-4 text-red-500" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-green-500 text-green-500 text-xs">
                              {String.fromCharCode(65 + question.correctAnswer)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {formatTime(question.timeSpent)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="skipped" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14">#</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Correct Answer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultData.questions
                      .filter(q => q.isSkipped)
                      .map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="font-medium">{question.id}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help">{question.text}</span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-md">
                                  <p>{question.text}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>{question.subject}</TableCell>
                          <TableCell>
                            <DifficultyBadge difficulty={question.difficulty} />
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-green-500 text-green-500 text-xs">
                              {String.fromCharCode(65 + question.correctAnswer)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="mt-10 flex justify-center">
          <Button 
            size="lg"
            onClick={handleGoToDashboard}
          >
            <Award className="h-5 w-5 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;