import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { useLocation } from "wouter";

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: April 8, 2025</p>
          
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using MockPrep.online (the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
              </p>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. We will always post the most current version on our website. By continuing to use the Service after changes become effective, you agree to be bound by the revised terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                MockPrep.online provides an online platform for test preparation, including mock tests, analytics, performance tracking, and educational resources for various competitive examinations in India.
              </p>
              <p className="text-gray-700">
                We do not guarantee that our Service will always be available, uninterrupted, secure, or error-free. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="text-gray-700 mb-4">
                You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              <p className="text-gray-700">
                We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms of Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Content and Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on the Service, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of MockPrep.online or its content suppliers and is protected by international copyright laws.
              </p>
              <p className="text-gray-700 mb-4">
                You may not modify, reproduce, distribute, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service, except as generally and ordinarily permitted through the Service according to these Terms of Service.
              </p>
              <p className="text-gray-700">
                You retain ownership of any content you submit to the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Using the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Sharing your account credentials with others or allowing others to access your account</li>
                <li>Attempting to decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Service</li>
                <li>Copying, distributing, or disclosing any part of the Service in any medium, including without limitation by any automated or non-automated "scraping"</li>
                <li>Using automated means, including spiders, robots, crawlers, data mining tools, or the like to download data from the Service</li>
                <li>Interfering with, or attempting to interfere with, the proper working of the Service or any activities conducted on the Service</li>
                <li>Bypassing any measures we may use to prevent or restrict access to the Service</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Some aspects of the Service may be provided for a fee. You will be required to select a payment plan and provide accurate information regarding your payment method.
              </p>
              <p className="text-gray-700 mb-4">
                By submitting such payment information, you automatically authorize us to charge all fees incurred through your account to any such payment instruments.
              </p>
              <p className="text-gray-700">
                All payments are non-refundable except as specifically provided in these Terms of Service or as required by applicable law.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="text-gray-700">
                If you wish to terminate your account, you may simply discontinue using the Service, or contact us at support@mockprep.online.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at legal@mockprep.online.
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

export default TermsOfService;