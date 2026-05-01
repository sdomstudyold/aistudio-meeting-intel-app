export interface TalkingPoint {
  title: string;
  content: string;
}

export interface RiskFactor {
  label: string;
  intensityLabel: string;
  value: number; // 0-100
  color: string; // e.g. "bg-risk-red"
}

export interface NextStep {
  id: string;
  task: string;
  completed: boolean;
}

export interface BriefMetadata {
  preparationDate: string;
  keyAttendees: string[];
  classification: string;
}

export interface IntelligenceBrief {
  id: string;
  referenceId: string;
  title: string;
  date: string;
  description: string;
  category: string;
  confidentiality: string;
  heroImage?: string;
  narrativeSynthesis: string[];
  talkingPoints: TalkingPoint[];
  metadata: BriefMetadata;
  risks: RiskFactor[];
  nextSteps: NextStep[];
  visualIdentityPrompt: string;
}
