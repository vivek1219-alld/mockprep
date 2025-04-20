import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import TestCard from "@/components/test-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Define the props for the exam page
interface ExamPageProps {
  id: string;
}

const examData = {
  jee: {
    name: "JEE (Main & Advanced)",
    description: "Joint Entrance Examination for undergraduate engineering programs",
    banner: "bg-gradient-to-r from-blue-600 to-blue-400",
    categories: ["Free Tests", "Mock Tests", "Previous Year Papers", "Subject Tests"],
    mockTests: [
      {
        id: 1,
        title: "JEE Main 2025 Complete Mock Test - Set 1",
        description: "Full-length mock test with 90 questions covering Physics, Chemistry, and Mathematics",
        duration: 180,
        questions: 90,
        difficulty: "Medium",
        attempts: 2485,
        rating: 4.8,
        free: false
      },
      {
        id: 2,
        title: "JEE Main 2025 Complete Mock Test - Set 2",
        description: "Full-length mock test with updated pattern for JEE Main 2025",
        duration: 180,
        questions: 90,
        difficulty: "Medium-Hard",
        attempts: 1985,
        rating: 4.7,
        free: false
      },
      {
        id: 3,
        title: "JEE Advanced 2025 Mock Test - Set 1",
        description: "Comprehensive mock test for JEE Advanced with both Paper 1 and Paper 2",
        duration: 360,
        questions: 108,
        difficulty: "Hard",
        attempts: 1245,
        rating: 4.9,
        free: false
      },
      {
        id: 4,
        title: "JEE Main Physics - Mechanics",
        description: "Subject-specific test covering Mechanics for JEE Main preparation",
        duration: 60,
        questions: 30,
        difficulty: "Medium",
        attempts: 3560,
        rating: 4.6,
        free: true
      },
      {
        id: 5,
        title: "JEE Main Chemistry - Organic Chemistry",
        description: "Subject-specific test covering Organic Chemistry for JEE Main preparation",
        duration: 60,
        questions: 30,
        difficulty: "Medium",
        attempts: 3120,
        rating: 4.5,
        free: true
      },
      {
        id: 6,
        title: "JEE Main Mathematics - Calculus",
        description: "Subject-specific test covering Calculus for JEE Main preparation",
        duration: 60,
        questions: 30,
        difficulty: "Medium-Hard",
        attempts: 2890,
        rating: 4.7,
        free: true
      }
    ]
  },
  neet: {
    name: "NEET UG",
    description: "National Eligibility cum Entrance Test for undergraduate medical programs",
    banner: "bg-gradient-to-r from-green-600 to-green-400",
    categories: ["Free Tests", "Mock Tests", "Previous Year Papers", "Subject Tests"],
    mockTests: [
      {
        id: 1,
        title: "NEET UG 2025 Complete Mock Test - Set 1",
        description: "Full-length mock test with 180 questions covering Physics, Chemistry, and Biology",
        duration: 180,
        questions: 180,
        difficulty: "Medium",
        attempts: 3240,
        rating: 4.8,
        free: false
      },
      {
        id: 2,
        title: "NEET UG 2025 Complete Mock Test - Set 2",
        description: "Full-length mock test with updated pattern for NEET UG 2025",
        duration: 180,
        questions: 180,
        difficulty: "Medium-Hard",
        attempts: 2780,
        rating: 4.7,
        free: false
      },
      {
        id: 3,
        title: "NEET UG Biology - Human Physiology",
        description: "Subject-specific test covering Human Physiology for NEET UG preparation",
        duration: 60,
        questions: 50,
        difficulty: "Medium",
        attempts: 4120,
        rating: 4.9,
        free: true
      },
      {
        id: 4,
        title: "NEET UG Physics - Mechanics and Thermodynamics",
        description: "Subject-specific test covering Mechanics and Thermodynamics for NEET UG preparation",
        duration: 60,
        questions: 45,
        difficulty: "Medium",
        attempts: 3560,
        rating: 4.6,
        free: true
      },
      {
        id: 5,
        title: "NEET UG Chemistry - Inorganic Chemistry",
        description: "Subject-specific test covering Inorganic Chemistry for NEET UG preparation",
        duration: 60,
        questions: 45,
        difficulty: "Medium",
        attempts: 3120,
        rating: 4.5,
        free: true
      }
    ]
  },
  cat: {
    name: "CAT",
    description: "Common Admission Test for management programs at IIMs and other top B-schools",
    banner: "bg-gradient-to-r from-purple-600 to-purple-400",
    categories: ["Free Tests", "Mock Tests", "Previous Year Papers", "Section Tests"],
    mockTests: [
      {
        id: 1,
        title: "CAT 2025 Complete Mock Test - Set 1",
        description: "Full-length mock test with all sections - VARC, DILR, and QA",
        duration: 120,
        questions: 66,
        difficulty: "Medium",
        attempts: 2150,
        rating: 4.8,
        free: false
      },
      {
        id: 2,
        title: "CAT 2025 Complete Mock Test - Set 2",
        description: "Full-length mock test with updated pattern for CAT 2025",
        duration: 120,
        questions: 66,
        difficulty: "Medium-Hard",
        attempts: 1865,
        rating: 4.7,
        free: false
      },
      {
        id: 3,
        title: "CAT VARC Sectional Test",
        description: "Verbal Ability and Reading Comprehension sectional test for CAT preparation",
        duration: 40,
        questions: 24,
        difficulty: "Medium",
        attempts: 3240,
        rating: 4.6,
        free: true
      },
      {
        id: 4,
        title: "CAT DILR Sectional Test",
        description: "Data Interpretation and Logical Reasoning sectional test for CAT preparation",
        duration: 40,
        questions: 20,
        difficulty: "Hard",
        attempts: 2980,
        rating: 4.9,
        free: true
      },
      {
        id: 5,
        title: "CAT Quantitative Aptitude Sectional Test",
        description: "Quantitative Aptitude sectional test for CAT preparation",
        duration: 40,
        questions: 22,
        difficulty: "Medium-Hard",
        attempts: 3120,
        rating: 4.7,
        free: true
      }
    ]
  },
  upsc: {
    name: "UPSC CSE",
    description: "Civil Services Examination for various civil services of the Government of India",
    banner: "bg-gradient-to-r from-amber-600 to-amber-400",
    categories: ["Free Tests", "Mock Tests", "Previous Year Papers", "Subject Tests"],
    mockTests: [
      {
        id: 1,
        title: "UPSC Prelims 2025 Complete Mock Test - Set 1",
        description: "Full-length mock test for UPSC CSE Prelims with GS Paper I and CSAT",
        duration: 240,
        questions: 200,
        difficulty: "Medium",
        attempts: 1850,
        rating: 4.8,
        free: false
      },
      {
        id: 2,
        title: "UPSC Prelims 2025 Complete Mock Test - Set 2",
        description: "Full-length mock test with updated pattern for UPSC CSE Prelims 2025",
        duration: 240,
        questions: 200,
        difficulty: "Medium-Hard",
        attempts: 1565,
        rating: 4.7,
        free: false
      },
      {
        id: 3,
        title: "UPSC Prelims - Indian History Test",
        description: "Subject-specific test covering Indian History for UPSC CSE Prelims preparation",
        duration: 60,
        questions: 50,
        difficulty: "Medium",
        attempts: 2240,
        rating: 4.6,
        free: true
      },
      {
        id: 4,
        title: "UPSC Prelims - Indian Polity Test",
        description: "Subject-specific test covering Indian Polity for UPSC CSE Prelims preparation",
        duration: 60,
        questions: 50,
        difficulty: "Medium",
        attempts: 2180,
        rating: 4.9,
        free: true
      },
      {
        id: 5,
        title: "UPSC Prelims - Geography Test",
        description: "Subject-specific test covering Geography for UPSC CSE Prelims preparation",
        duration: 60,
        questions: 50,
        difficulty: "Medium",
        attempts: 2020,
        rating: 4.7,
        free: true
      }
    ]
  }
};

const ExamPage: React.FC<ExamPageProps> = ({ id }) => {
  const [_, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [exam, setExam] = useState<any>(null);

  useEffect(() => {
    // Get the exam data based on the ID
    if (Object.keys(examData).includes(id)) {
      setExam(examData[id as keyof typeof examData]);
    } else {
      // Redirect to home if exam doesn't exist
      setLocation("/home");
    }
  }, [id, setLocation]);

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icons.logo className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl cursor-pointer" onClick={() => setLocation("/home")}>MockPrep.online</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setLocation("/auth")}>
                Log In
              </Button>
              <Button onClick={() => setLocation("/register")}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className={`${exam.banner} text-white py-16`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{exam.name} Mock Tests</h1>
            <p className="text-xl opacity-90 mb-6">{exam.description}</p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-sm">Available Tests</div>
                <div className="text-2xl font-bold">{exam.mockTests.length}+</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-sm">Students Practicing</div>
                <div className="text-2xl font-bold">12,000+</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-sm">Success Rate</div>
                <div className="text-2xl font-bold">92%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 w-full bg-gray-100 p-0 h-auto">
              <TabsTrigger className="py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white" value="all">
                All Tests
              </TabsTrigger>
              {exam.categories.map((category: string, index: number) => (
                <TabsTrigger 
                  key={index} 
                  className="py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white" 
                  value={category.toLowerCase().replace(/\s+/g, '-')}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* All Tests Content */}
            <TabsContent value="all" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exam.mockTests.map((test: any) => (
                  <TestCard 
                    key={test.id} 
                    test={test} 
                    onTake={() => setLocation(`/test/${test.id}/instructions`)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            {/* Free Tests Content */}
            <TabsContent value="free-tests" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exam.mockTests
                  .filter((test: any) => test.free)
                  .map((test: any) => (
                    <TestCard 
                      key={test.id} 
                      test={test} 
                      onTake={() => setLocation(`/test/${test.id}/instructions`)} 
                    />
                  ))}
              </div>
            </TabsContent>
            
            {/* Mock Tests Content */}
            <TabsContent value="mock-tests" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exam.mockTests
                  .filter((test: any) => !test.free && test.title.includes("Complete Mock Test"))
                  .map((test: any) => (
                    <TestCard 
                      key={test.id} 
                      test={test} 
                      onTake={() => setLocation(`/test/${test.id}/instructions`)} 
                    />
                  ))}
              </div>
            </TabsContent>
            
            {/* Previous Year Papers Content */}
            <TabsContent value="previous-year-papers" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exam.mockTests
                  .filter((test: any) => test.title.includes("Previous Year") || Math.random() > 0.5)
                  .map((test: any) => (
                    <TestCard 
                      key={test.id} 
                      test={test} 
                      onTake={() => setLocation(`/test/${test.id}/instructions`)} 
                    />
                  ))}
              </div>
            </TabsContent>
            
            {/* Subject Tests Content */}
            <TabsContent value="subject-tests" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exam.mockTests
                  .filter((test: any) => 
                    test.title.includes("Physics") || 
                    test.title.includes("Chemistry") || 
                    test.title.includes("Biology") || 
                    test.title.includes("Mathematics") ||
                    test.title.includes("History") ||
                    test.title.includes("Polity") ||
                    test.title.includes("Geography") ||
                    test.title.includes("VARC") ||
                    test.title.includes("DILR") ||
                    test.title.includes("Quantitative")
                  )
                  .map((test: any) => (
                    <TestCard 
                      key={test.id} 
                      test={test} 
                      onTake={() => setLocation(`/test/${test.id}/instructions`)} 
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Exam Preparation Tips */}
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mt-12">
            <h2 className="text-2xl font-bold mb-4">Preparation Tips for {exam.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Study Strategy</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>Create a structured study plan covering all subjects</li>
                  <li>Focus on understanding concepts rather than memorization</li>
                  <li>Solve previous year question papers to understand the pattern</li>
                  <li>Take regular mock tests to gauge your preparation level</li>
                  <li>Analyze your performance and work on weak areas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Exam Day Tips</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>Get a good night's sleep before the exam</li>
                  <li>Reach the exam center at least an hour early</li>
                  <li>Read all instructions carefully before starting</li>
                  <li>Manage your time efficiently during the exam</li>
                  <li>Attempt questions you are confident about first</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button onClick={() => setLocation("/register")}>
                Start Your Preparation Today
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Test card component is now imported from separate file

export default ExamPage;