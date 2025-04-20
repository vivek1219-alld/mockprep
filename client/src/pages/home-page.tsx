import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import React, { useContext } from "react";
import { AuthContext } from "@/App";
import { Icons, getIcon } from "@/components/icons";
import Footer from "@/components/footer";

const HomePage = () => {
  const [_, setLocation] = useLocation();
  const { user } = useContext(AuthContext);

  const examCategories = [
    {
      id: 1,
      name: "IIT JEE",
      description: "Engineering entrance exams preparation",
      icon: "graduation-cap",
      color: "bg-blue-500",
      route: "jee"
    },
    {
      id: 2,
      name: "NEET",
      description: "Medical entrance exams preparation",
      icon: "activity",
      color: "bg-green-500",
      route: "neet"
    },
    {
      id: 3,
      name: "CAT",
      description: "Management entrance exams preparation",
      icon: "briefcase",
      color: "bg-purple-500",
      route: "cat"
    },
    {
      id: 4,
      name: "UPSC",
      description: "Civil services exam preparation",
      icon: "landmark",
      color: "bg-amber-500",
      route: "upsc"
    },
  ];

  const features = [
    {
      title: "Realistic Mock Tests",
      description: "Experience tests designed to mirror the actual exams with accurate timing and question patterns.",
      icon: "file-text",
    },
    {
      title: "Detailed Analytics",
      description: "Track your progress with in-depth performance analysis across subjects and topics.",
      icon: "bar-chart-2",
    },
    {
      title: "Subject-wise Practice",
      description: "Focus on your weak areas with subject and topic specific practice tests.",
      icon: "book-open",
    },
    {
      title: "Performance Comparison",
      description: "See how you rank against other test-takers with our comparative analysis.",
      icon: "users",
    },
  ];

  // Redirect to dashboard if already logged in
  if (user) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                  <Icons.logo className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">MockPrep.online</span>
              </div>
              <button className="md:hidden" onClick={() => {}}>
                <Icons.arrowRight className="h-6 w-6" />
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 mt-4 md:mt-0">
              <div className="flex space-x-6">
                <button 
                  className="text-gray-600 hover:text-primary font-medium"
                  onClick={() => setLocation("/college-rankings")}
                >
                  College Rankings
                </button>
                <button 
                  className="text-gray-600 hover:text-primary font-medium"
                  onClick={() => setLocation("/exam-syllabus")}
                >
                  Exam Syllabus
                </button>
                <button 
                  className="text-gray-600 hover:text-primary font-medium"
                  onClick={() => setLocation("/exam-updates")}
                >
                  Exam Updates
                </button>
                <button 
                  className="text-gray-600 hover:text-primary font-medium"
                  onClick={() => setLocation("/about-us")}
                >
                  About Us
                </button>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setLocation("/auth")}
                >
                  Log In
                </Button>
                <Button
                  onClick={() => setLocation("/register")}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container px-4 py-16 mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ace Your Competitive Exams with MockPrep.online
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Prepare smarter with realistic mock tests, detailed analytics, and personalized feedback for IIT JEE, NEET, CAT, and UPSC exams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-blue-100"
                  onClick={() => setLocation("/register")}
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  //variant="outline"
                  className="bg-white text-primary hover:bg-blue-100"
                  onClick={() => setLocation("/auth")}
                >
                  Log In
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-3">
                        <Icons.logo className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-semibold text-lg text-gray-800">MockPrep.online</span>
                    //</div>
                    //<div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 bg-gray-100 rounded-md w-full"></div>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 bg-gray-100 rounded-md"></div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded-md"></div>
                      ))}
                    </div>
                    <div className="h-10 bg-primary/20 rounded-md w-1/3 ml-auto"></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-yellow-800 font-bold py-2 px-4 rounded-lg shadow-lg">
                  Start Preparing Now!
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {examCategories.map((category) => (
              <div 
                key={category.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => setLocation(`/exam/${category.route}`)}
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    {React.createElement(getIcon(category.icon), { className: "h-5 w-5 text-white" })}
                  </div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                </div>
                <p className="text-sm text-white/80 mb-2">{category.description}</p>
                <div className="flex items-center text-sm">
                  <span>View Tests</span>
                  <Icons.arrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
              <p className="text-gray-600">Questions</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-primary mb-2">500+</p>
              <p className="text-gray-600">Mock Tests</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-primary mb-2">50,000+</p>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-primary mb-2">92%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How MockPrep.online Helps You Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our platform is designed to provide the most effective preparation experience for competitive exams.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {React.createElement(getIcon(feature.icon), { className: "h-6 w-6 text-primary" })}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Prepare for Top Competitive Exams</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive mock tests and preparation material for all major competitive examinations in India.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examCategories.map((category) => (
              <div 
                key={category.id} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`${category.color} p-4 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                    {React.createElement(getIcon(category.icon), { className: "h-6 w-6 text-white" })}
                  </div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">100+ Tests</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setLocation(`/exam/${category.route}`)}
                    >
                      Start Preparing
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from students who achieved their dreams with MockPrep.online.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-bold">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">IIT Delhi, Computer Science</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The mock tests on MockPrep.online were incredibly similar to the actual JEE Advanced exam. The detailed analytics helped me identify and improve my weak areas."
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icons.star key={star} className="w-5 h-5" />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-bold">Rahul Verma</h4>
                  <p className="text-sm text-gray-500">AIIMS Delhi, MBBS</p>
                </div>
              </div>
              <p className="text-gray-600">
                "MockPrep's NEET test series was the key to my success. The subject-wise analytics and comparison with other test-takers really motivated me to improve."
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icons.star key={star} className="w-5 h-5" />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-bold">Amit Patel</h4>
                  <p className="text-sm text-gray-500">IIM Ahmedabad, MBA</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The CAT mock tests on MockPrep.online accurately simulated the pressure of the real exam. The performance insights were instrumental in my preparation strategy."
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icons.star key={star} className="w-5 h-5" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Preparation Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have achieved their dreams with MockPrep.online's comprehensive preparation platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => setLocation("/register")}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => setLocation("/login")}
            >
              Log In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;