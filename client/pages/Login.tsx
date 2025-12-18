import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "@/components/StatusBar";
import SplashGraphic from "@/components/SplashGraphic";
import { TextInput } from "@/components/ui/text-input";
import { CONTENT_TOKENS, updateUserName } from "@/lib/content-tokens";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TextButton } from "@/components/ui/text-button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract first name from email
    const emailPart = email.split('@')[0];
    // Handle common email formats like firstname.lastname or firstnamelastname
    const nameCandidate = emailPart.split('.')[0] || emailPart.split(/(?=[A-Z])/)[0] || emailPart;
    // Capitalize first letter
    const firstName = nameCandidate.charAt(0).toUpperCase() + nameCandidate.slice(1).toLowerCase();

    // Update the user name in content tokens
    updateUserName(firstName);

    navigate("/welcome");
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <div className="flex w-full max-w-md mx-auto h-screen flex-col justify-center items-start bg-[#F0F3FA] shadow-lg relative">
      {/* Container */}
      <div className="flex max-w-full flex-col justify-center items-center gap-0 flex-1 self-stretch rounded-none shadow-md relative">
        
        {/* Status Bar */}
        <StatusBar />
        
        {/* Two column layout */}
        <div className="flex flex-col justify-center items-start flex-1 self-stretch bg-white relative">
          
          {/* Top section with splash graphic */}
          <div className="flex h-[360px] flex-col items-center self-stretch relative">
            <div className="flex flex-col items-start flex-1 self-stretch bg-gray-400 relative">
              <SplashGraphic />
            </div>
          </div>
          
          {/* Bottom section with auth form */}
          <div className="flex flex-col justify-center items-center flex-1 self-stretch relative">
            <div className="flex max-w-[448px] w-full p-6 flex-col items-center justify-center flex-1 self-stretch relative">

              {/* Auth form */}
              <div className="flex flex-col items-center gap-6 self-stretch relative">
                
                {/* Title */}
                <div className="flex flex-col items-center gap-3 self-stretch relative">
                  <h1
                    className="text-center text-[#3A3A3A] text-[32px] font-bold leading-10"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {CONTENT_TOKENS.LOGIN.TITLE}
                  </h1>
                </div>
                
                {/* Form */}
                <form onSubmit={handleLogin} className="flex flex-col items-center gap-6 self-stretch relative">
                  
                  {/* Inputs */}
                  <div className="flex flex-col items-center gap-4 self-stretch relative">
                    
                    {/* Email field */}
                    <TextInput
                      type="email"
                      label={CONTENT_TOKENS.LOGIN.EMAIL_LABEL}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                    
                    {/* Password field */}
                    <TextInput
                      type="password"
                      label={CONTENT_TOKENS.LOGIN.PASSWORD_LABEL}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  
                  {/* CTA */}
                  <div className="flex flex-col items-center gap-2.5 self-stretch relative">
                    <PrimaryButton
                      type="submit"
                      disabled={!isFormValid}
                      className="w-full"
                    >
                      {CONTENT_TOKENS.LOGIN.SIGN_IN_BUTTON}
                    </PrimaryButton>
                  </div>
                  
                  {/* Forgot password link */}
                  <div
                    className={cn(typography({ variant: "body-regular" }), "w-full text-center")}
                  >
                    <span className="text-[#616161]">{CONTENT_TOKENS.LOGIN.FORGOT_PASSWORD_TEXT} </span>
                    <TextButton
                      type="button"
                      onClick={() => navigate("/welcome")}
                      className="p-0 h-auto font-bold hover:underline"
                    >
                      {CONTENT_TOKENS.LOGIN.FORGOT_PASSWORD_LINK}
                    </TextButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
