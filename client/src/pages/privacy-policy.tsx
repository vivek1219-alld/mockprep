import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { useLocation } from "wouter";

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: April 8, 2025</p>
          
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                At MockPrep.online ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="text-gray-700">
                Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree, you may not access or use our Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We may collect personally identifiable information, such as:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Academic background and interests</li>
                <li>Payment information</li>
                <li>Profile image</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
              <p className="text-gray-700 mb-4">
                We may also collect information about how the Service is accessed and used ("Usage Data"). This may include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li>Your computer's Internet Protocol address</li>
                <li>Browser type and version</li>
                <li>The pages of our Service that you visit</li>
                <li>The time and date of your visit</li>
                <li>Test performance and analytics</li>
                <li>Study patterns and progress</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To personalize your learning experience</li>
                <li>To provide you with news, special offers, and general information about other goods, services, and events that we offer</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Disclosure of Your Information</h2>
              <p className="text-gray-700 mb-4">
                We may disclose your personal information in the following situations:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li><span className="font-medium">Service Providers:</span> To trusted third parties who assist us in operating our website, conducting our business, or servicing you.</li>
                <li><span className="font-medium">Business Transfers:</span> In connection with a merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
                <li><span className="font-medium">Legal Requirements:</span> If required to do so by law or in response to valid requests by public authorities.</li>
                <li><span className="font-medium">Protection:</span> To protect and defend the rights or property of MockPrep.online.</li>
                <li><span className="font-medium">Safety:</span> To protect the personal safety of users of the Service or the public.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
              <p className="text-gray-700">
                While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. It is your responsibility to keep your account credentials secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Data Protection Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li>The right to access the personal information we have about you</li>
                <li>The right to rectify inaccurate personal information</li>
                <li>The right to erasure of your personal information</li>
                <li>The right to restrict processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-gray-700">
                To exercise any of these rights, please contact us at privacy@mockprep.online.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-700">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at privacy@mockprep.online.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;