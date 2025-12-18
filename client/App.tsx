import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import BusinessInfo from "./pages/BusinessInfo";
import Terms from "./pages/Terms";
import Complete from "./pages/Complete";
import HowThisWorks from "./pages/HowThisWorks";
import ChooseObjective from "./pages/ChooseObjective";
import CreateLoyaltyCard from "./pages/CreateLoyaltyCard";
import CreateInstantReward from "./pages/CreateInstantReward";
import CreateTriggeredReward from "./pages/CreateTriggeredReward";
import LoyaltyCardTemplates from "./pages/LoyaltyCardTemplates";
import InstantRewardTemplates from "./pages/InstantRewardTemplates";
import TriggeredRewardTemplates from "./pages/TriggeredRewardTemplates";
import LoyaltyCardPersonalization from "./pages/LoyaltyCardPersonalization";
import InstantRewardPersonalization from "./pages/InstantRewardPersonalization";
import TriggeredRewardPersonalization from "./pages/TriggeredRewardPersonalization";
import ComponentDocumentation from "./pages/ComponentDocumentation";
import TypographyDocumentation from "./pages/TypographyDocumentation";
import StyleGuide from "./pages/StyleGuide";
import RewardCampaigns from "./pages/RewardCampaigns";
import CampaignReview from "./pages/CampaignReview";
import CampaignSuccess from "./pages/CampaignSuccess";
import DatabaseDemo from "./pages/DatabaseDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/business-info" element={<BusinessInfo />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/how-this-works" element={<HowThisWorks />} />
          <Route path="/choose-objective" element={<ChooseObjective />} />
          <Route path="/create-loyalty-card" element={<CreateLoyaltyCard />} />
          <Route path="/create-instant-reward" element={<CreateInstantReward />} />
          <Route path="/create-triggered-reward" element={<CreateTriggeredReward />} />
          <Route path="/loyalty-card-templates" element={<LoyaltyCardTemplates />} />
          <Route path="/instant-reward-templates" element={<InstantRewardTemplates />} />
          <Route path="/triggered-reward-templates" element={<TriggeredRewardTemplates />} />
          <Route path="/loyalty-card-personalization" element={<LoyaltyCardPersonalization />} />
          <Route path="/instant-reward-personalization" element={<InstantRewardPersonalization />} />
          <Route path="/triggered-reward-personalization" element={<TriggeredRewardPersonalization />} />
          <Route path="/component-documentation" element={<ComponentDocumentation />} />
          <Route path="/typography-documentation" element={<TypographyDocumentation />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          <Route path="/reward-campaigns" element={<RewardCampaigns />} />
          <Route path="/campaign-review" element={<CampaignReview />} />
          <Route path="/campaign-success" element={<CampaignSuccess />} />
          <Route path="/database-demo" element={<DatabaseDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
