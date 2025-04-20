import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const ExamUpdates = () => {
  const [_, setLocation] = useLocation();

  // Sample exam updates data
  const updates = [
    {
      id: 1,
      title: "JEE (Main) 2025 Registration Opens",
      date: "April 3, 2025",
      category: "jee",
      type: "registration",
      content: "The National Testing Agency (NTA) has opened the registration process for JEE Main 2025. Candidates can apply online through the official website until May 5, 2025.",
      link: "#",
      important: true
    },
    {
      id: 2,
      title: "NEET UG 2025 Application Form Released",
      date: "March 25, 2025",
      category: "neet",
      type: "registration",
      content: "The National Testing Agency (NTA) has released the application form for NEET UG 2025. The last date to apply is April 30, 2025.",
      link: "#",
      important: true
    },
    {
      id: 3,
      title: "JEE (Advanced) 2025 Eligibility Criteria Updated",
      date: "March 15, 2025",
      category: "jee",
      type: "criteria",
      content: "IIT Delhi, the organizing institute for JEE Advanced 2025, has updated the eligibility criteria. Candidates must now score in the top 2.5 lakh ranks in JEE Main to qualify for JEE Advanced.",
      link: "#",
      important: false
    },
    {
      id: 4,
      title: "CAT 2025 Exam Date Announced",
      date: "March 10, 2025",
      category: "cat",
      type: "dates",
      content: "The Indian Institutes of Management (IIMs) have announced that CAT 2025 will be conducted on November 30, 2025. Registration will begin in August 2025.",
      link: "#",
      important: true
    },
    {
      id: 5,
      title: "UPSC CSE 2025 Notification Expected Soon",
      date: "March 5, 2025",
      category: "upsc",
      type: "notification",
      content: "The Union Public Service Commission is expected to release the notification for Civil Services Examination 2025 by the end of April. Candidates are advised to start their preparation.",
      link: "#",
      important: false
    },
    {
      id: 6,
      title: "JEE (Main) 2025 Syllabus Changes",
      date: "February 28, 2025",
      category: "jee",
      type: "syllabus",
      content: "NTA has announced minor changes in the JEE Main 2025 syllabus. Some topics from Mathematics and Physics have been revised to align with the new NCERT curriculum.",
      link: "#",
      important: true
    },
    {
      id: 7,
      title: "NEET UG 2025 to be Conducted in 13 Languages",
      date: "February 20, 2025",
      category: "neet",
      type: "pattern",
      content: "NTA has announced that NEET UG 2025 will be conducted in 13 languages, adding Punjabi and Urdu to the list of available languages for the exam.",
      link: "#",
      important: false
    },
    {
      id: 8,
      title: "CAT 2025 to Include New Section on Data Interpretation",
      date: "February 15, 2025",
      category: "cat",
      type: "pattern",
      content: "The IIMs have announced a revised pattern for CAT 2025, with a new section focusing exclusively on Data Interpretation to test analytical skills.",
      link: "#",
      important: true
    },
    {
      id: 9,
      title: "JEE (Main) 2025 to be Conducted Four Times a Year",
      date: "February 10, 2025",
      category: "jee",
      type: "pattern",
      content: "NTA has confirmed that JEE Main 2025 will be conducted four times a year in January, April, July, and October. Candidates can appear in all sessions, with the best score being considered for ranking.",
      link: "#",
      important: false
    },
    {
      id: 10,
      title: "UPSC CSE 2025 to Have Revised Prelims Pattern",
      date: "February 5, 2025",
      category: "upsc",
      type: "pattern",
      content: "UPSC has indicated that the Civil Services Examination 2025 may have a revised pattern for Prelims, with more emphasis on current affairs and less on static portions.",
      link: "#",
      important: true
    },
  ];

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

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Exam Updates</h1>
              <p className="text-gray-600">Latest news and updates about entrance examinations</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" onClick={() => setLocation("/college-rankings")}>
                College Rankings
              </Button>
              <Button variant="outline" onClick={() => setLocation("/exam-syllabus")}>
                Exam Syllabus
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 w-full bg-gray-100 p-0 h-auto">
              <TabsTrigger className="py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white" value="all">All Updates</TabsTrigger>
              <TabsTrigger className="py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white" value="jee">JEE</TabsTrigger>
              <TabsTrigger className="py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white" value="neet">NEET</TabsTrigger>
              <TabsTrigger className="py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white" value="cat">CAT</TabsTrigger>
              <TabsTrigger className="py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white" value="upsc">UPSC</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-8">
              <div className="space-y-6">
                {updates.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            </TabsContent>
            
            {["jee", "neet", "cat", "upsc"].map((category) => (
              <TabsContent key={category} value={category} className="pt-8">
                <div className="space-y-6">
                  {updates
                    .filter((update) => update.category === category)
                    .map((update) => (
                      <UpdateCard key={update.id} update={update} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with MockPrep.online</h2>
            <p className="text-gray-700 mb-6">
              Subscribe to our newsletter to receive the latest updates about exam dates, application processes, and syllabus changes directly in your inbox.
            </p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <Button className="rounded-l-none">
                Subscribe
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

// Update card component
const UpdateCard = ({ update }: { update: any }) => {
  return (
    <Card className={`overflow-hidden transition-all ${update.important ? 'border-l-4 border-l-amber-500' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{update.title}</CardTitle>
            <CardDescription className="mt-1 flex items-center">
              <span className="text-gray-500">{update.date}</span>
              {update.important && (
                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-600 border-amber-200">
                  Important
                </Badge>
              )}
            </CardDescription>
          </div>
          <Badge className="capitalize">{update.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{update.content}</p>
      </CardContent>
      <CardFooter className="pt-3 flex justify-between border-t">
        <div className="flex items-center text-sm">
          <Badge variant="secondary" className="capitalize">
            {update.category === 'jee' ? 'JEE' : 
             update.category === 'neet' ? 'NEET' : 
             update.category === 'cat' ? 'CAT' : 'UPSC'}
          </Badge>
        </div>
        <Button variant="outline" size="sm">Read More</Button>
      </CardFooter>
    </Card>
  );
};

export default ExamUpdates;