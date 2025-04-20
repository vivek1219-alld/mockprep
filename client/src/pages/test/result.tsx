import { useContext, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { formatTimeSpent } from "@/lib/utils";

interface TestResultProps {
  attemptId: number;
}

const TestResult = ({ attemptId }: TestResultProps) => {
  const { user } = useContext(AuthContext);
  const [_, setLocation] = useLocation();
  const [questionFilter, setQuestionFilter] = useState("all");

  // Fetch test attempt details
  const { data, isLoading } = useQuery({
    queryKey: [`/api/test-attempts/${attemptId}`],
    enabled: !!attemptId,
  });

  // Fetch topic performance data
  const { data: topicPerformance = [] } = useQuery({
    queryKey: [`/api/users/${user?.id}/topic-performance`],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
        <Icons.clock className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading results...</span>
      </div>
    );
  }

  if (!data || !data.testAttempt || !data.test || !data.questions) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center p-6">
              <Icons.x className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Results Not Found</h2>
              <p className="text-slate-500 mb-4">
                The test results you're looking for don't exist or have been removed.
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

  const { testAttempt, test, questions } = data;
  const totalQuestions = questions.length;
  
  // Calculate stats
  const correctAnswers = testAttempt.answers && questions ? 
    testAttempt.answers.reduce((count, answer, index) => {
      const question = questions[index];
      return count + (question && answer === question.correctOption ? 1 : 0);
    }, 0) : 0;
  
  const incorrectAnswers = testAttempt.answers ? 
    testAttempt.answers.filter(a => a !== null).length - correctAnswers : 0;
  
  const unattemptedCount = totalQuestions - (testAttempt.answers ? 
    testAttempt.answers.filter(a => a !== null).length : 0);
  
  const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const incorrectPercentage = Math.round((incorrectAnswers / totalQuestions) * 100);
  const unattemptedPercentage = Math.round((unattemptedCount / totalQuestions) * 100);

  // Filter questions based on selection
  const filteredQuestions = questions.map((question, index) => {
    const userAnswer = testAttempt.answers ? testAttempt.answers[index] : null;
    const isCorrect = userAnswer === question.correctOption;
    const isIncorrect = userAnswer !== null && userAnswer !== question.correctOption;
    const isUnattempted = userAnswer === null;
    
    return {
      ...question,
      userAnswer,
      isCorrect,
      isIncorrect,
      isUnattempted,
      index
    };
  }).filter(q => {
    if (questionFilter === "all") return true;
    if (questionFilter === "correct") return q.isCorrect;
    if (questionFilter === "incorrect") return q.isIncorrect;
    if (questionFilter === "unattempted") return q.isUnattempted;
    return true;
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Test Results</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Icons.download className="mr-1 h-4 w-4" /> Download
          </Button>
          <Button size="sm">
            <Icons.share className="mr-1 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      {/* Result Summary Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">{test.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-white">{correctPercentage}%</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Your Score</p>
                <p className="text-lg font-semibold">{correctAnswers}/{totalQuestions}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-slate-700">65%</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Average Score</p>
                <p className="text-lg font-semibold">195/300</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-green-600">89%</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Top Score</p>
                <p className="text-lg font-semibold">267/300</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Correct Answers</p>
              <p className="text-lg font-semibold text-green-600">
                {correctAnswers} <span className="text-xs font-normal">({correctPercentage}%)</span>
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Incorrect Answers</p>
              <p className="text-lg font-semibold text-red-600">
                {incorrectAnswers} <span className="text-xs font-normal">({incorrectPercentage}%)</span>
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Unattempted</p>
              <p className="text-lg font-semibold text-slate-500">
                {unattemptedCount} <span className="text-xs font-normal">({unattemptedPercentage}%)</span>
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Time Taken</p>
              <p className="text-lg font-semibold">{formatTimeSpent(testAttempt.timeSpent || 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Topic-wise Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-lg font-semibold mb-4">Topic-wise Performance</h2>

          <div className="space-y-4">
            {topicPerformance.map((topic: any, index: number) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700 font-medium">{topic.name}</span>
                  <span className="text-sm font-medium">{topic.percentage}%</span>
                </div>
                <Progress value={topic.percentage} className="h-2.5 w-full bg-slate-200" />
                <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                  <span>Correct: {topic.correct}/{topic.total}</span>
                  <span>Time: {topic.timeSpent} mins</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-lg font-semibold mb-4">Recommendations</h2>

          <div className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <h3 className="font-medium text-primary mb-1">Focus on SHM</h3>
              <p className="text-sm text-slate-600">
                Your performance in Simple Harmonic Motion needs improvement. Try practicing more numerical problems in this area.
              </p>
            </div>

            <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
              <h3 className="font-medium text-green-600 mb-1">Strong in Newton's Laws</h3>
              <p className="text-sm text-slate-600">
                You're doing well in this topic. Review advanced applications to maintain your edge.
              </p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <h3 className="font-medium text-amber-600 mb-1">Time Management</h3>
              <p className="text-sm text-slate-600">
                You're spending too much time on Gravitation questions. Work on quick problem-solving techniques.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Suggested Practice Tests</h3>
              <div className="space-y-2">
                <a href="#" className="block p-2 bg-slate-50 rounded-lg hover:bg-slate-100 text-sm">
                  Simple Harmonic Motion - Practice Set
                </a>
                <a href="#" className="block p-2 bg-slate-50 rounded-lg hover:bg-slate-100 text-sm">
                  Rotational Dynamics - Advanced
                </a>
                <a href="#" className="block p-2 bg-slate-50 rounded-lg hover:bg-slate-100 text-sm">
                  Time Management Drill - Physics
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Review Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Question Review</h2>
          <div className="flex space-x-2">
            <Select value={questionFilter} onValueChange={setQuestionFilter}>
              <SelectTrigger className="w-[180px] text-sm h-9">
                <SelectValue placeholder="Filter questions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Questions</SelectItem>
                <SelectItem value="correct">Correct Only</SelectItem>
                <SelectItem value="incorrect">Incorrect Only</SelectItem>
                <SelectItem value="unattempted">Unattempted Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${
                  question.isCorrect 
                    ? "bg-green-500 text-white" 
                    : question.isIncorrect 
                      ? "bg-red-500 text-white" 
                      : "bg-slate-300 text-white"
                } flex items-center justify-center mr-3`}>
                  {question.isCorrect 
                    ? <Icons.check className="h-4 w-4" /> 
                    : question.isIncorrect 
                      ? <Icons.x className="h-4 w-4" /> 
                      : <Icons.help className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500">Question {question.index + 1}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-0.5 ${
                        question.isCorrect 
                          ? "bg-green-100 text-green-600" 
                          : question.isIncorrect 
                            ? "bg-red-100 text-red-600" 
                            : "bg-slate-100 text-slate-600"
                      } rounded-full`}>
                        {question.isCorrect 
                          ? "Correct" 
                          : question.isIncorrect 
                            ? "Incorrect" 
                            : "Unattempted"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {question.isCorrect ? "+4 points" : question.isIncorrect ? "-1 point" : "0 points"}
                      </span>
                    </div>
                  </div>

                  <div className="font-serif">
                    <p className="text-slate-800 mb-2">{question.text}</p>

                    <div className="ml-6 space-y-1 mt-3">
                      {question.options.map((option: string, optIndex: number) => {
                        const isUserAnswer = question.userAnswer === optIndex;
                        const isCorrectAnswer = question.correctOption === optIndex;
                        
                        return (
                          <div key={optIndex} className="flex items-center text-sm">
                            <div className={`w-5 h-5 ${
                              isCorrectAnswer 
                                ? "bg-green-100 text-green-600" 
                                : isUserAnswer && !isCorrectAnswer 
                                  ? "bg-red-100 text-red-600" 
                                  : ""
                            } rounded-full flex items-center justify-center mr-2`}>
                              {isCorrectAnswer 
                                ? <Icons.check className="h-3 w-3" /> 
                                : isUserAnswer && !isCorrectAnswer 
                                  ? <Icons.x className="h-3 w-3" /> 
                                  : null}
                            </div>
                            <span className="font-semibold mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                            <span className={`${
                              isCorrectAnswer 
                                ? "text-green-600 font-medium" 
                                : isUserAnswer && !isCorrectAnswer 
                                  ? "text-red-600" 
                                  : ""
                            }`}>
                              {option}
                            </span>
                            {isUserAnswer && (
                              <span className={`ml-2 text-xs ${
                                isCorrectAnswer 
                                  ? "bg-green-100 text-green-600" 
                                  : "bg-red-100 text-red-600"
                              } px-2 py-0.5 rounded-full`}>
                                Your Answer
                              </span>
                            )}
                            {isCorrectAnswer && !isUserAnswer && (
                              <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                Correct Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Solution</h4>
                    <p className="text-sm text-slate-700">{question.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredQuestions.length > 5 && (
          <div className="flex items-center justify-center mt-6">
            <Button>
              Load More Questions
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex justify-center mb-8">
        <Button variant="outline" className="mr-2" onClick={() => setLocation("/tests")}>
          Browse Tests
        </Button>
        <Button onClick={() => setLocation("/")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default TestResult;
