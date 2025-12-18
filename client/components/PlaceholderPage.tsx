import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backTo?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  backTo = "/welcome" 
}: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple-light to-brand-purple flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
          <Construction className="w-8 h-8 text-brand-purple" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
        <p className="text-white/80 mb-8">{description}</p>
        
        <div className="space-y-4">
          <p className="text-white/70 text-sm">
            This screen is coming soon! Continue prompting to have me build it out.
          </p>
          
          <Button
            onClick={() => navigate(backTo)}
            className="bg-white text-brand-purple hover:bg-gray-50 rounded-xl h-12 px-6 font-medium"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
