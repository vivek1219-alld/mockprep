import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  Clock, 
  FileText, 
  Award, 
  AlertTriangle, 
  ArrowLeft, 
  Home,
  Loader2
} from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

interface TestInstructionsProps {
  id: string;
}

// Get instructions based on exam type
const getInstructionsForExamType = (examTypeName: string) => {
  // Default instructions
  const defaultInstructions = [
    "Read all questions carefully before answering.",
    "You can navigate between questions freely during the test.",
    "You can mark questions for review and return to them later.",
    "You will receive a detailed analysis of your performance after submitting the test.",
    "Ensure you have a stable internet connection for the entire duration of the test."
  ];

  // Exam-specific instructions
  switch(examTypeName?.toLowerCase()) {
    case "iit jee":
    case "jee main":
      return [
        "The test consists of questions from Physics, Chemistry, and Mathematics.",
        "Each question carries 4 marks. For each incorrect answer, 1 mark will be deducted.",
        "Use the on-screen calculator provided for calculations. Physical calculators are not allowed.",
        ...defaultInstructions
      ];
    case "neet":
      return [
        "The test consists of questions from Physics, Chemistry, and Biology.",
        "Each question carries 4 marks. For each incorrect answer, 1 mark will be deducted.",
        "Multiple correct options may be possible for some questions.",
        ...defaultInstructions
      ];
    case "gate":
      return [
        "The test consists of both Multiple Choice Questions (MCQs) and Numerical Answer Type (NAT) questions.",
        "Different questions may carry different marks.",
        "For MCQs, negative marking applies; for NAT questions, there is no negative marking.",
        ...defaultInstructions
      ];
    case "upsc":
      return [
        "The test covers topics from General Studies, Current Affairs, and Optional Subjects.",
        "Read the questions carefully as they may require in-depth analysis.",
        "Time management is crucial - allocate time wisely to all sections.",
        ...defaultInstructions
      ];
    default:
      return defaultInstructions;
  }
};

const TestInstructions: React.FC<TestInstructionsProps> = ({ id }) => {
  const [_, setLocation] = useLocation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Fetch test data from API
  const { data: testData, isLoading, error } = useQuery({
    queryKey: [`/api/tests/${id}`],
    staleTime: 60000, // 1 minute
  });

  // If we couldn't fetch from API, fallback to sample data temporarily
  useEffect(() => {
    if (error) {
      console.error("Error fetching test data:", error);
    }
  }, [error]);

  // Generate instructions based on exam type if we have test data
  const instructions = testData?.examTypeName 
    ? getInstructionsForExamType(testData.examTypeName)
    : getInstructionsForExamType("default");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p>Loading test information...</p>
        </div>
      </div>
    );
  }

  // If test data is still not available after loading, use fallback data
  const testInfo = testData || {
    id: parseInt(id),
    title: "Mock Test",
    description: "Full-length mock test covering multiple subjects",
    duration: 180,
    questions: 30,
    subject: "General",
    examTypeName: "General",
    sections: [
      {
        name: "Section 1",
        questions: 30,
        marksPerQuestion: 4,
        negativeMarks: 1
      }
    ]
  };

  const handleStartTest = () => {
    if (termsAccepted) {
      setLocation(`/test/${id}/take`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl cursor-pointer" onClick={() => setLocation("/home")}>MockPrep.online</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setLocation("/")}>
                <Home className="h-5 w-5 mr-2" /> Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" className="pl-0" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{testInfo.title}</CardTitle>
                  <CardDescription className="mt-2">{testInfo.description}</CardDescription>
                </div>
                <Badge className="text-base px-3 py-1">{testInfo.subject}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Duration</span>
                  <span className="text-lg font-bold">{testInfo.duration} minutes</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Questions</span>
                  <span className="text-lg font-bold">{testInfo.questions} questions</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Total Marks</span>
                  <span className="text-lg font-bold">
                    {testInfo.sections.reduce((acc: number, section: any) => 
                      acc + section.questions * section.marksPerQuestion, 0
                    )}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-4">Test Sections</h3>
              <div className="space-y-4 mb-8">
                {testInfo.sections.map((section: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-primary">{section.name}</h4>
                    <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                      <div>
                        <span className="text-gray-500">Questions:</span> {section.questions}
                      </div>
                      <div>
                        <span className="text-gray-500">Marks per question:</span> +{section.marksPerQuestion}
                      </div>
                      <div>
                        <span className="text-gray-500">Negative marking:</span> -{section.negativeMarks}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-lg font-bold mb-4">Test Instructions</h3>
              <ul className="space-y-2 list-disc pl-5">
                {instructions.map((instruction: string, index: number) => (
                  <li key={index} className="text-gray-700">{instruction}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-6">
              <div className="flex items-start space-x-2 mb-6">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read and understood the instructions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    By checking this box, I agree to follow the test rules and guidelines.
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleStartTest}
                  disabled={!termsAccepted}
                >
                  Start Test
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h3 className="flex items-center text-lg font-bold text-yellow-800 mb-4">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Important Notes
            </h3>
            <ul className="space-y-2 list-disc pl-5 text-yellow-800">
              <li>Ensure you have a stable internet connection before starting the test.</li>
              <li>Do not refresh the page or close the browser during the test.</li>
              <li>If you face any technical issues, please contact our support team immediately.</li>
              <li>The timer will continue to run if you navigate away from the test page.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;