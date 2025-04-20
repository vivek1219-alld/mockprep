import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { useLocation } from "wouter";

const AboutUs = () => {
  const [_, setLocation] = useLocation();

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About MockPrep.online</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At MockPrep.online, our mission is to democratize education by providing high-quality, accessible test preparation resources to students across India. We believe that every student, regardless of their background or financial status, deserves access to premium quality practice materials that can help them succeed in competitive examinations.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2023 by a team of educators, technologists, and former top-ranking students, MockPrep.online was born out of a shared frustration with the existing test preparation landscape. We observed that while there were many resources available, few combined realistic exam simulation with sophisticated analytics and personalized learning paths.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Our Values</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><span className="font-medium">Excellence:</span> We strive for the highest quality in all our mock tests and learning resources.</li>
                  <li><span className="font-medium">Accessibility:</span> We believe quality education should be accessible to everyone.</li>
                  <li><span className="font-medium">Innovation:</span> We continuously improve our platform with the latest educational technology.</li>
                  <li><span className="font-medium">Integrity:</span> We are honest, transparent, and ethical in all our operations.</li>
                  <li><span className="font-medium">Student-centered:</span> We put students' needs and success at the center of everything we do.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Our Approach</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><span className="font-medium">Realistic Simulation:</span> Tests that mirror the actual exam experience.</li>
                  <li><span className="font-medium">Data-Driven Analysis:</span> Detailed performance metrics to identify strengths and weaknesses.</li>
                  <li><span className="font-medium">Personalized Learning:</span> Customized study plans based on individual performance.</li>
                  <li><span className="font-medium">Continuous Improvement:</span> Regular updates based on the latest exam patterns and student feedback.</li>
                  <li><span className="font-medium">Community Support:</span> Forums and discussion groups for peer learning and doubt resolution.</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Our team consists of experienced educators, IIT alumni, former UPSC toppers, and technology experts who are passionate about education. Together, we bring decades of experience in test preparation, educational psychology, and cutting-edge technology to create the most effective preparation platform for competitive exams.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">50,000+</p>
                <p className="text-gray-600">Active Students</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-gray-600">Mock Tests</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">10,000+</p>
                <p className="text-gray-600">Success Stories</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">92%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-2">Join Us in Our Mission</h2>
              <p className="text-gray-700 mb-4">
                We're constantly looking for talented educators, content creators, and technologists who share our passion for democratizing education. If you're interested in joining our team, please reach out to us at careers@mockprep.online.
              </p>
              <div className="flex justify-center">
                <Button onClick={() => setLocation("/register")}>
                  Get Started Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;