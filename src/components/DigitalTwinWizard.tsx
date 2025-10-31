import { useState } from "react";
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
import { ChevronLeft, ChevronRight, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

const INITIAL_DATA: DigitalTwinProfile = {
  identity: { name: "", role: "", tagline: "", bio: "" },
  businesses: [{ name: "", role: "", description: "", link: "", products: [], duration: "" }],
  experience: [{ company: "", role: "", duration: "", key_projects: [] }],
  education: [{ institution: "", degree: "", year: "" }],
  skills: [],
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

  const totalSteps = 9;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowOutput(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Digital Twin Profile Complete!", {
        description: "Your professional persona has been generated.",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (showOutput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-secondary" />
              <h1 className="text-3xl font-bold">Digital Twin Complete</h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">AI Persona Initialization</h2>
                <div className="bg-muted/50 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap">
                  {generatePersona()}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Complete Profile (JSON)</h2>
                <div className="bg-muted/50 p-6 rounded-lg overflow-auto max-h-[400px]">
                  <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={downloadJSON} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download JSON
                </Button>
                <Button
                  onClick={() => {
                    setShowOutput(false);
                    setCurrentStep(0);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Create Another
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Digital Twin Architect
          </h1>
          <p className="text-muted-foreground text-lg">
            Build an intelligent professional persona that speaks, thinks, and connects like you
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitles={STEP_TITLES} />

          <div className="mt-8">
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

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button onClick={handleBack} variant="outline" disabled={currentStep === 0}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext} className="min-w-[120px]">
              {currentStep === totalSteps - 1 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
