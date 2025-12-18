import { useNavigate } from "react-router-dom";
import TemplateSelection from "./TemplateSelection";

export default function TriggeredRewardTemplates() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/create-triggered-reward");
  };

  const handleNext = (templateId: string) => {
    console.log(`Selected triggered reward template: ${templateId}`);
    // Navigate to personalization step for triggered reward
    navigate("/triggered-reward-personalization");
  };

  return (
    <TemplateSelection
      campaignType="triggered-reward"
      onBack={handleBack}
      onNext={handleNext}
    />
  );
}
