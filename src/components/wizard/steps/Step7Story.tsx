import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Story } from "@/types/digitalTwin";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Step7StoryProps {
  data: Story;
  onChange: (data: Story) => void;
}

export const Step7Story = ({ data, onChange }: Step7StoryProps) => {
  const [themeInput, setThemeInput] = useState("");

  const handleChange = (field: keyof Story, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const addTheme = () => {
    if (themeInput.trim() && !data.themes.includes(themeInput.trim())) {
      handleChange("themes", [...data.themes, themeInput.trim()]);
      setThemeInput("");
    }
  };

  const removeTheme = (theme: string) => {
    handleChange("themes", data.themes.filter((t) => t !== theme));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Story & Narrative</h2>
        <p className="text-muted-foreground">What's the bigger picture behind what you do?</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Mission Statement</Label>
          <Textarea
            value={data.mission}
            onChange={(e) => handleChange("mission", e.target.value)}
            placeholder="What drives you? What are you building toward?"
            className="mt-1.5 min-h-[100px]"
          />
        </div>

        <div>
          <Label>Impact & Legacy</Label>
          <Textarea
            value={data.impact}
            onChange={(e) => handleChange("impact", e.target.value)}
            placeholder="What change do you want to create in the world?"
            className="mt-1.5 min-h-[100px]"
          />
        </div>

        <div>
          <Label>Recurring Themes</Label>
          <Input
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTheme())}
            placeholder="e.g., Innovation, Empowerment, Sustainability (press Enter)"
            className="mt-1.5"
          />
          <p className="text-sm text-muted-foreground mt-1">
            What patterns connect your work? What themes keep showing up?
          </p>
          {data.themes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {data.themes.map((theme) => (
                <Badge key={theme} variant="secondary">
                  {theme}
                  <button onClick={() => removeTheme(theme)} className="ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
