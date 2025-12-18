import { useNavigate } from "react-router-dom";
import TemplateSelection from "./TemplateSelection";

export default function LoyaltyCardTemplates() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/create-loyalty-card");
  };

  const handleNext = (templateId: string) => {
    console.log(`Selected loyalty card template: ${templateId}`);
    // Navigate to personalization step for loyalty card
    navigate("/loyalty-card-personalization");
  };

  return (
    <TemplateSelection
      campaignType="loyalty-card"
      onBack={handleBack}
      onNext={handleNext}
    />
  );
}
