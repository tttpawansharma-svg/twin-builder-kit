  import { useState, useEffect } from "react";
  import { Button } from "@/components/ui/button";
  import { Card } from "@/components/ui/card";
  import { StepIndicator } from "./wizard/StepIndicator";
  import { Step1Identity } from "./wizard/steps/Step1Identity";
  import { Step2Business } from "./wizard/steps/Step2Business";
  import { Step3Experience } from "./wizard/steps/Step3Experience";
  import { Step4Education } from "./wizard/steps/Step4Education";
  import { Step5Skills } from "./wizard/steps/Step5Skills";
  import { Step6Personality } from "./wizard/steps/Step6Personality";
  import { Step7Story } from "./wizard/steps/Step7Story";
  import { Step8Networking } from "./wizard/steps/Step8Networking";
  import { Step9Links } from "./wizard/steps/Step9Links";
  import { DigitalTwinProfile } from "@/types/digitalTwin";
  import { ChevronLeft, ChevronRight, Download, Sparkles, Loader2, Crown, Building2, User } from "lucide-react";
  import { toast } from "sonner";
  import { useDigitalTwin } from "@/contexts/DigitalTwinContext";
  import { useAuth } from "@/contexts/AuthContext";

  const INITIAL_DATA: DigitalTwinProfile = {
    identity: { name: "", role: "", tagline: "", bio: "" },
    businesses: [{ name: "", role: "", description: "", link: "", products: [], duration: "" }],
    experience: [{ company: "", role: "", duration: "", key_projects: [] }],
    education: [{ institution: "", degree: "", year: "" }],
    skills: {
      list: [],
      coreDomains: "",
      signatureStrengths: "",
    },
    personality: {
      traits: [],
      leadership_style: "",
      decision_style: "",
      tone: "",
      archetype: "",
      values: [],
    },
    story: { mission: "", impact: "", themes: [] },
    networking: { audience: "", intent: "", boundaries: [] },
    links: { linkedin: "", website: "", portfolio: "", socials: [] },
  };

  const STEP_TITLES = [
    "Identity",
    "Business",
    "Experience",
    "Education",
    "Skills",
    "Personality",
    "Story",
    "Networking",
    "Links",
  ];

  export const DigitalTwinWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<DigitalTwinProfile>(INITIAL_DATA);
    const [showOutput, setShowOutput] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { saveDigitalTwin, digitalTwin, loadDigitalTwin, isLoading } = useDigitalTwin();
    const { user } = useAuth();

    const totalSteps = 9;

    const handleNext = async () => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await handleComplete();
      }
    };
useEffect(() => {
  if (digitalTwin) {
    // Remove backend-only fields (_id, createdAt, etc.) before loading into form
    const { _id, isActive, createdAt, lastUpdated, ...profileData } = digitalTwin;

    // Merge safely with initial structure to ensure no undefined sections
    setData({
      ...INITIAL_DATA,
      ...profileData,
    });
  } else {
    setData(INITIAL_DATA);
  }
}, [digitalTwin]);

    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const handleComplete = async () => {
      setIsSaving(true);
      try {
        await saveDigitalTwin(data);
        setShowOutput(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("Digital Twin Profile Complete!", {
          description: "Your professional persona has been generated and saved.",
        });
      } catch (error) {
        console.error('Failed to save digital twin:', error);
      } finally {
        setIsSaving(false);
      }
    };

    const downloadJSON = () => {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `digital-twin-${data.identity.name.replace(/\s+/g, "-").toLowerCase()}.json`;
      a.click();
      toast.success("Profile Downloaded", { description: "JSON file saved successfully." });
    };

    const generatePersona = () => {
      const persona = `You are the digital twin of ${data.identity.name}, ${data.identity.role}${
        data.businesses[0]?.name ? ` at ${data.businesses[0].name}` : ""
      }.

  ${data.identity.bio}

  You understand their entire ecosystem including:
  ${data.businesses.map((b) => `- ${b.name} (${b.role}): ${b.description}`).join("\n")}

  Personality: ${data.personality.traits.join(", ")} | ${data.personality.tone} tone
  Leadership: ${data.personality.leadership_style}
  Values: ${data.personality.values.join(", ")}

  Mission: ${data.story.mission}

  You represent them professionally in conversations, staying authentic, strategic, and human.`;

      return persona;
    };

    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
              <User className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Loading Your Digital Twin</h3>
              <p className="text-muted-foreground">Preparing your professional persona...</p>
            </div>
          </div>
        </div>
      );
    }

    if (showOutput) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-3">Digital Twin Complete</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your professional persona is ready to represent you in the digital world
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">AI Persona Initialization</h2>
                    <p className="text-sm text-muted-foreground">Copy this prompt to initialize your AI assistant</p>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {generatePersona()}
                </div>
              </Card>

              <Card className="p-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Complete Profile Data</h2>
                    <p className="text-sm text-muted-foreground">Full JSON structure for integration</p>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl overflow-auto max-h-96">
                  <pre className="text-xs text-slate-700">{JSON.stringify(data, null, 2)}</pre>
                </div>
              </Card>
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <Button 
                onClick={downloadJSON} 
                className="px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Download className="w-5 h-5 mr-3" />
                Download JSON Profile
              </Button>
              <Button
                onClick={() => {
                  setShowOutput(false);
                  setCurrentStep(0);
                }}
                variant="outline"
                className="px-8 py-6 text-base font-semibold border-2 hover:bg-slate-50 transition-colors duration-200"
              >
                Create Another Twin
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Digital Twin Architect
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Build an intelligent professional persona that speaks, thinks, and connects like you
            </p>
            
            {digitalTwin && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium text-sm">
                  📋 Editing existing digital twin profile
                </span>
              </div>
            )}
          </div>

          <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitles={STEP_TITLES} />

            <div className="mt-12 mb-8">
              {currentStep === 0 && (
                <Step1Identity data={data.identity} onChange={(identity) => setData({ ...data, identity })} />
              )}
              {currentStep === 1 && (
                <Step2Business data={data.businesses} onChange={(businesses) => setData({ ...data, businesses })} />
              )}
              {currentStep === 2 && (
                <Step3Experience data={data.experience} onChange={(experience) => setData({ ...data, experience })} />
              )}
              {currentStep === 3 && (
                <Step4Education data={data.education} onChange={(education) => setData({ ...data, education })} />
              )}
              {currentStep === 4 && (
                <Step5Skills data={data.skills} onChange={(skills) => setData({ ...data, skills })} />
              )}
              {currentStep === 5 && (
                <Step6Personality
                  data={data.personality}
                  onChange={(personality) => setData({ ...data, personality })}
                />
              )}
              {currentStep === 6 && <Step7Story data={data.story} onChange={(story) => setData({ ...data, story })} />}
              {currentStep === 7 && (
                <Step8Networking
                  data={data.networking}
                  onChange={(networking) => setData({ ...data, networking })}
                />
              )}
              {currentStep === 8 && <Step9Links data={data.links} onChange={(links) => setData({ ...data, links })} />}
            </div>

            <div className="flex justify-between items-center pt-8 mt-8 border-t border-slate-200">
              <Button 
                onClick={handleBack} 
                variant="outline" 
                disabled={currentStep === 0}
                className="px-6 py-3 h-auto font-semibold border-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous Step
              </Button>
              
              <div className="text-center flex-1 mx-8">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <div className="w-32 h-1 bg-slate-200 rounded-full mx-auto mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleNext} 
                className="px-8 py-3 h-auto font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-200 min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : currentStep === totalSteps - 1 ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Complete Profile
                  </>
                ) : (
                  <>
                    Next Step
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Your data is securely stored and only used to generate your professional digital twin
            </p>
          </div>
        </div>
      </div>
    );
  };