import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Ray's Healthy Living" },
      {
        name: "description",
        content: "Ray's Healthy Living privacy policy and data protection information",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="section-y">
      <div className="container-rhl max-w-4xl">
        <SectionHeading 
          title="Privacy Policy"
          description="How we protect and handle your personal information"
        />
        
        <div className="prose prose-gray max-w-none">
          <div className="bg-card rounded-xl border border-border p-8 shadow-card">
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Personal information (name, email, phone number, address)</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support</li>
                <li>Send you promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience:
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-orange-800 mb-2">Essential Cookies</h3>
                <p className="text-sm text-orange-700 mb-2">Required for basic site functionality:</p>
                <ul className="text-sm text-orange-700 list-disc pl-4">
                  <li>Shopping cart and checkout functionality</li>
                  <li>User authentication and security</li>
                  <li>Site preferences and settings</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">Analytics Cookies</h3>
                <p className="text-sm text-blue-700 mb-2">Help us understand how you use our site:</p>
                <ul className="text-sm text-blue-700 list-disc pl-4">
                  <li>Page views and site navigation patterns</li>
                  <li>Popular products and content</li>
                  <li>Site performance and error tracking</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With service providers who help us operate our business</li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing</li>
                <li>Regular security audits and updates</li>
                <li>Restricted access to personal information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of promotional communications</li>
                <li>Disable cookies in your browser settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Cookie Management</h2>
              <p className="mb-4">
                You can control cookies through your browser settings. Please note that disabling 
                certain cookies may affect the functionality of our website.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Browser Settings:</strong> Most browsers allow you to view, delete, and block cookies. 
                  Consult your browser's help documentation for specific instructions.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 mb-2"><strong>Ray's Healthy Living</strong></p>
                <p className="text-sm text-green-700">70 Solomons Island Rd S</p>
                <p className="text-sm text-green-700">Prince Frederick, MD 20678</p>
                <p className="text-sm text-green-700">Phone: +1 (443) 432-3295</p>
                <p className="text-sm text-green-700">Email: info@rayshealthyliving.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Updates to This Policy</h2>
              <p className="text-sm text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new policy on our website. This policy was last 
                updated on January 1, 2025.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}