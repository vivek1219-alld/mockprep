import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CollegeRankings = () => {
  const [_, setLocation] = useLocation();

  // Sample college data
  const colleges = [
    {
      name: "Indian Institute of Technology (IIT), Bombay",
      rank: 1,
      location: "Mumbai, Maharashtra",
      category: "Engineering",
      rating: 4.9,
      acceptanceRate: "1.8%",
      features: ["Top Research", "Industry Connections", "High Placement"]
    },
    {
      name: "Indian Institute of Technology (IIT), Delhi",
      rank: 2,
      location: "New Delhi, Delhi",
      category: "Engineering",
      rating: 4.8,
      acceptanceRate: "2.1%",
      features: ["Research Excellence", "Global Recognition", "Innovation Hub"]
    },
    {
      name: "Indian Institute of Technology (IIT), Madras",
      rank: 3,
      location: "Chennai, Tamil Nadu",
      category: "Engineering",
      rating: 4.8,
      acceptanceRate: "2.0%",
      features: ["Entrepreneurship", "Industry 4.0", "Research Park"]
    },
    {
      name: "Indian Institute of Technology (IIT), Kanpur",
      rank: 4,
      location: "Kanpur, Uttar Pradesh",
      category: "Engineering",
      rating: 4.7,
      acceptanceRate: "2.3%",
      features: ["Aerospace", "VLSI", "Academic Excellence"]
    },
    {
      name: "Indian Institute of Technology (IIT), Kharagpur",
      rank: 5,
      location: "Kharagpur, West Bengal",
      category: "Engineering",
      rating: 4.7,
      acceptanceRate: "2.5%",
      features: ["Largest Campus", "Multi-disciplinary", "Oldest IIT"]
    },
    {
      name: "National Institute of Technology (NIT), Trichy",
      rank: 6,
      location: "Tiruchirappalli, Tamil Nadu",
      category: "Engineering",
      rating: 4.6,
      acceptanceRate: "3.2%",
      features: ["Top NIT", "Quality Education", "Strong Alumni"]
    },
    {
      name: "All India Institute of Medical Sciences (AIIMS), Delhi",
      rank: 1,
      location: "New Delhi, Delhi",
      category: "Medical",
      rating: 4.9,
      acceptanceRate: "0.1%",
      features: ["Premier Medical", "Research Excellence", "Cutting-edge Treatment"]
    },
    {
      name: "Christian Medical College (CMC)",
      rank: 2,
      location: "Vellore, Tamil Nadu",
      category: "Medical",
      rating: 4.8,
      acceptanceRate: "1.1%",
      features: ["Ethics-based", "Rural Healthcare", "Global Recognition"]
    },
    {
      name: "Indian Institute of Management (IIM), Ahmedabad",
      rank: 1,
      location: "Ahmedabad, Gujarat",
      category: "Management",
      rating: 4.9,
      acceptanceRate: "1.7%",
      features: ["Case-based Learning", "Top-tier Faculty", "Industry Leaders"]
    },
    {
      name: "Indian Institute of Management (IIM), Bangalore",
      rank: 2,
      location: "Bangalore, Karnataka",
      category: "Management",
      rating: 4.8,
      acceptanceRate: "1.9%",
      features: ["Innovation", "Entrepreneurship", "Tech Management"]
    }
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
              <h1 className="text-4xl font-bold mb-2">College Rankings 2025</h1>
              <p className="text-gray-600">Find the best colleges for your chosen field of study</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => setLocation("/exam-updates")}>
                Latest Exam Updates
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <Input placeholder="Search colleges..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="law">Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All India" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All India</SelectItem>
                    <SelectItem value="north">North India</SelectItem>
                    <SelectItem value="south">South India</SelectItem>
                    <SelectItem value="east">East India</SelectItem>
                    <SelectItem value="west">West India</SelectItem>
                    <SelectItem value="central">Central India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Rankings */}
          <div className="space-y-4">
            {colleges.map((college, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg text-primary font-bold">
                        #{college.rank}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{college.name}</h2>
                        <p className="text-gray-600">{college.location}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 font-medium">{college.rating}/5</span>
                          <span className="mx-2">•</span>
                          <span className="text-gray-600">Acceptance Rate: {college.acceptanceRate}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{college.category}</Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {college.features.map((feature, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline">
              Load More Colleges
            </Button>
          </div>
          
          <div className="mt-12 bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Prepare for College Entrance Exams</h2>
            <p className="text-gray-700 mb-4">
              Get ready for JEE, NEET, CLAT, CAT and other entrance exams with MockPrep.online's comprehensive test preparation platform. Access realistic mock tests, detailed analytics, and personalized study plans.
            </p>
            <div className="flex justify-center">
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

export default CollegeRankings;