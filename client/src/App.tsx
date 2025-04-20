import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import HomePage from "@/pages/home-page";
import AboutUs from "@/pages/about-us";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CollegeRankings from "@/pages/college-rankings";
import ExamSyllabus from "@/pages/exam-syllabus";
import ExamUpdates from "@/pages/exam-updates";
import ExamPage from "@/pages/exam/[id]";
import TestInstructions from "@/pages/test/[id]/instructions";
import TestPage from "@/pages/test/[id]/take";
import TestResult from "@/pages/test/[id]/result";
import MainLayout from "@/layouts/main-layout";
import { useState, useEffect, createContext } from "react";

// User context to handle authentication
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  handleLogin?: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  handleLogin: undefined,
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useLocation();

  // Load user from localStorage on app init
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Flag to track if login is in progress
  const [isLoginRedirectPending, setIsLoginRedirectPending] = useState(false);
  
  // Handle login redirection
  const handleLogin = (userData: User) => {
    console.log("Login handler called with user:", userData);
    
    // Check if userData is valid
    if (!userData || !userData.id) {
      console.error("Invalid user data provided to handleLogin:", userData);
      return;
    }
    
    // Set the user in state
    setUser(userData);
    console.log("User data set in state:", userData);
    
    // Mark that we're in the middle of a login redirect
    setIsLoginRedirectPending(true);
    console.log("Login redirect pending set to true");
    
    // Delay the redirect to ensure state is updated
    setTimeout(() => {
      console.log("Navigating to dashboard after setting user");
      setLocation("/");
    }, 300);
  };
  
  // Reset the redirect pending state when location changes
  useEffect(() => {
    if (isLoginRedirectPending && location === "/") {
      setIsLoginRedirectPending(false);
    }
  }, [location, isLoginRedirectPending]);
  
  // Redirect to login if no user and trying to access protected routes
  useEffect(() => {
    console.log("Auth state changed:", { isLoading, user, location, isLoginRedirectPending });
    
    const isPublicRoute = 
      location === "/auth" || 
      location === "/home" || 
      location === "/login" || 
      location === "/register" ||
      location === "/about-us" ||
      location === "/privacy-policy" ||
      location === "/terms-of-service" ||
      location === "/college-rankings" ||
      location === "/exam-syllabus" ||
      location === "/exam-updates" ||
      location.startsWith("/exam/") ||
      location.startsWith("/test/");

    // Only redirect to login if:
    // 1. We're not in the process of logging in
    // 2. User is not logged in
    // 3. Not already on login/register/home page
    if (!isLoading && !user && !isLoginRedirectPending && !isPublicRoute) {
      console.log("No user detected, redirecting to login page");
      setLocation("/auth");
    } else if (!isLoading && user && !isLoginRedirectPending && 
        (location === "/login" || location === "/register" || location === "/auth")) {
      console.log("User is logged in but on auth page, redirecting to dashboard");
      setLocation("/");
    }
  }, [user, location, isLoading, isLoginRedirectPending, setLocation]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser, isLoading, handleLogin }}>
        <Switch>
          {/* Public routes */}
          <Route path="/home" component={HomePage} />
          <Route path="/auth" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          
          {/* Protected routes */}
          <Route path="/">
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </Route>
          
          {/* New public pages */}
          <Route path="/about-us" component={AboutUs} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/college-rankings" component={CollegeRankings} />
          <Route path="/exam-syllabus" component={ExamSyllabus} />
          <Route path="/exam-updates" component={ExamUpdates} />
          
          {/* Exam and test related routes */}
          <Route path="/exam/:id">
            {(params) => <ExamPage id={params.id} />}
          </Route>
          
          <Route path="/test/:id/instructions">
            {(params) => <TestInstructions id={params.id} />}
          </Route>
          
          <Route path="/test/:id/take">
            {(params) => <TestPage id={params.id} />}
          </Route>
          
          <Route path="/test/:id/result">
            {(params) => <TestResult id={params.id} />}
          </Route>
          
          <Route component={NotFound} />
        </Switch>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
