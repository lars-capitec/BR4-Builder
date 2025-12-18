import { useNavigate } from "react-router-dom";
import TemplateSelection from "./TemplateSelection";

export default function InstantRewardTemplates() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/create-instant-reward");
  };

  const handleNext = (templateId: string) => {
    console.log(`Selected instant reward template: ${templateId}`);
    // Navigate to personalization step for instant reward
    navigate("/instant-reward-personalization");
  };

  return (
    <TemplateSelection
      campaignType="instant-reward"
      onBack={handleBack}
      onNext={handleNext}
    />
  );
}
