import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground text-lg mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-primary rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
          >
            Return Home
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
