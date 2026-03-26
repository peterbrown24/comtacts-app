import { PageLayout } from "@/components/layout/PageLayout";
import { Mail, MessageCircle, HelpCircle } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

export default function Support() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">How can we help?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or reach out to our support team directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Contact Card */}
          <div className="bg-card border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center hover:border-primary/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Mail size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3">Email Support</h3>
            <p className="text-muted-foreground mb-6 flex-1">
              Our team usually responds within 24 hours during business days.
            </p>
            <a 
              href="mailto:support@comtacts.inc" 
              className="inline-flex items-center justify-center w-full px-6 py-3 font-medium text-white bg-primary rounded-xl hover:bg-blue-600 transition-colors"
            >
              support@comtacts.inc
            </a>
          </div>

          {/* In-App Support Card */}
          <div className="bg-card border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center hover:border-accent/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3">In-App Help</h3>
            <p className="text-muted-foreground mb-6 flex-1">
              Are you already using Comt@cts? You can report issues directly from the app settings.
            </p>
            <div className="w-full px-6 py-3 font-medium text-muted-foreground bg-secondary rounded-xl border border-white/5">
              Go to Profile &gt; Settings &gt; Report Issue
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-primary" size={28} />
            <h2 className="text-3xl font-display font-bold">Frequently Asked Questions</h2>
          </div>

          <Accordion.Root type="multiple" className="space-y-4">
            <FaqItem 
              value="item-1" 
              question="How do the Vendor (V) and Merchant (M) badges work?"
              answer="Badges are assigned by organization admins to quickly identify external partners. A 'V' badge indicates a Vendor or Supplier, while an 'M' badge indicates a Merchant or Client. This helps internal teams know exactly who they are communicating with."
            />
            <FaqItem 
              value="item-2" 
              question="What is included in the Premium subscription?"
              answer="The Premium subscription unlocks access to private contact details that are otherwise hidden. This includes direct mobile phone numbers and personal email addresses for contacts that have provided them. It's billed monthly through your App Store account."
            />
            <FaqItem 
              value="item-3" 
              question="Can I create new Team Channels?"
              answer="Standard users can view and join public channels. Channel creation is currently limited to organization administrators to keep the workspace organized. Please contact your manager to request a new channel."
            />
            <FaqItem 
              value="item-4" 
              question="How do I change my @handle?"
              answer="Your @handle is unique and generated when your account is created. To request a change to your handle, please contact your organization's IT admin or reach out to our support team."
            />
          </Accordion.Root>
        </div>
      </div>
    </PageLayout>
  );
}

// Custom FAQ Item Component using Radix UI
function FaqItem({ value, question, answer }: { value: string, question: string, answer: string }) {
  return (
    <Accordion.Item 
      value={value} 
      className="bg-card border border-white/5 rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-colors"
    >
      <Accordion.Header>
        <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
          <span className="font-semibold text-lg text-white group-hover:text-primary transition-colors">
            {question}
          </span>
          <span className="text-muted-foreground transform group-data-[state=open]:rotate-180 transition-transform duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
          {answer}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
