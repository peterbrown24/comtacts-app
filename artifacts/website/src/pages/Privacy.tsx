import { PageLayout } from "@/components/layout/PageLayout";

export default function Privacy() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Effective Date: March 26, 2026</p>
        </div>

        <div className="prose prose-invert prose-blue max-w-none">
          <p className="lead text-xl text-gray-300">
            Comt@cts, Inc. ("we," "our," or "us") operates the Comt@cts mobile application (the "App"). 
            This Privacy Policy explains how we collect, use, and protect your information when you use our App.
          </p>
          <p>
            By using the App, you agree to the collection and use of information as described in this policy.
          </p>

          <h2 className="text-2xl font-display font-semibold mt-12 mb-6 border-b border-white/10 pb-2">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3 text-white">Account Information</h3>
          <p>When you use Comt@cts, we collect and store:</p>
          <ul>
            <li>Your name</li>
            <li>Email address (work and, if provided, personal)</li>
            <li>Phone number (work and, if provided, mobile)</li>
            <li>Job title and company name</li>
            <li>A unique Comt@ct handle</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-white">Contact Information</h3>
          <p>
            The App allows you to store and manage professional contact information for other individuals, 
            including their names, email addresses, phone numbers, job titles, and companies.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-white">Messages</h3>
          <p>
            We store the content of direct messages and channel messages you send and receive through the App 
            to provide the messaging service.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-white">Subscription Information</h3>
          <p>
            If you subscribe to our Premium tier, your purchase is processed through Apple's App Store. 
            We receive confirmation of your subscription status but do not collect or store your payment details. 
            Subscription management is handled by RevenueCat, our subscription infrastructure provider.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-white">Automatically Collected Information</h3>
          <p>
            We may collect basic usage data such as app launch events and error logs to maintain and improve 
            the App's performance.
          </p>

          <h2 className="text-2xl font-display font-semibold mt-12 mb-6 border-b border-white/10 pb-2">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain the App's core features (contacts, messaging, channels)</li>
            <li>Display your professional profile to other users within your organization</li>
            <li>Process and manage Premium subscriptions</li>
            <li>Improve the App's performance and user experience</li>
            <li>Respond to support requests</li>
          </ul>

          <h2 className="text-2xl font-display font-semibold mt-12 mb-6 border-b border-white/10 pb-2">Data Storage and Security</h2>
          <p>
            Your data is stored on secure servers. We use industry-standard security measures, including 
            encrypted connections (HTTPS/TLS), to protect your information during transmission and storage.
          </p>

          <h2 className="text-2xl font-display font-semibold mt-12 mb-6 border-b border-white/10 pb-2">Data Sharing</h2>
          <p className="font-medium text-white">We do not sell your personal information to third parties.</p>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> We use third-party services to operate the App, including cloud hosting and subscription management (RevenueCat). These providers access your data only to perform services on our behalf.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, or legal process.</li>
          </ul>

          <h2 className="text-2xl font-display font-semibold mt-12 mb-6 border-b border-white/10 pb-2">Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> the personal information we hold about you</li>
            <li><strong>Update</strong> your profile information through the App</li>
            <li><strong>Delete</strong> your account and associated data by contacting us</li>
            <li><strong>Opt out</strong> of any non-essential data collection</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the information below.</p>

          <h2 className="text-2xl font-display font-semibold mt-12 mb-6 border-b border-white/10 pb-2">Children's Privacy</h2>
          <p>
            The App is not intended for use by children under the age of 13. We do not knowingly collect 
            personal information from children under 13.
          </p>

          <h2 className="text-2xl font-display font-semibold mt-12 mb-6 border-b border-white/10 pb-2">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new policy within the App or through other appropriate channels. Your continued use of the App 
            after changes are posted constitutes your acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-display font-semibold mt-12 mb-6 border-b border-white/10 pb-2">Contact Us</h2>
          <p>If you have questions about this Privacy Policy or your data, please contact us at:</p>
          <p>
            <strong>Email:</strong> <a href="mailto:privacy@comtacts.inc" className="text-primary hover:text-blue-400">privacy@comtacts.inc</a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
