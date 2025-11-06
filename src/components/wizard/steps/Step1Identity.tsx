  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import { Identity } from "@/types/digitalTwin";

  interface Step1IdentityProps {
    data: Identity;
    onChange: (data: Identity) => void;
  }

  export const Step1Identity = ({ data, onChange }: Step1IdentityProps) => {
    const handleChange = (field: keyof Identity, value: string) => {
      onChange({ ...data, [field]: value });
    };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Core Identity</h2>
          <p className="text-muted-foreground">Let's start with the essentials - who you are professionally.</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Alex Johnson"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Current Role / Professional Title *</Label>
            <Input
              id="role"
              value={data.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="e.g., Founder & CEO"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="tagline">Professional Tagline (Optional)</Label>
            <Input
              id="tagline"
              value={data.tagline}
              onChange={(e) => handleChange("tagline", e.target.value)}
              placeholder="e.g., Building smarter businesses through AI and automation"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="bio">Short Professional Bio *</Label>
            <Textarea
              id="bio"
              value={data.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="2-3 sentences about your professional background and focus"
              className="mt-1.5 min-h-[120px]"
              required
            />
            <p className="text-sm text-muted-foreground mt-1">Keep it concise and impactful.</p>
          </div>
        </div>
      </div>
    );
  };
