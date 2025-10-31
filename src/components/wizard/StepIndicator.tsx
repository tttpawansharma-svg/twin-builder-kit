import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const StepIndicator = ({ currentStep, totalSteps, stepTitles }: StepIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  index < currentStep
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : index === currentStep
                    ? "bg-secondary text-secondary-foreground shadow-lg scale-110"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 hidden sm:block text-center max-w-[100px]",
                  index === currentStep ? "text-foreground font-semibold" : "text-muted-foreground"
                )}
              >
                {stepTitles[index]}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-1 flex-1 mx-2 transition-all duration-300 rounded",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
