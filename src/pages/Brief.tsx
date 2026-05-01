import React from 'react';
import { Sparkles, Lock, Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useLocation } from 'react-router-dom';
import { IntelligenceBrief } from '../types';

export default function Brief() {
  const location = useLocation();
  const stateBrief = location.state?.brief as IntelligenceBrief | undefined;

  const defaultBrief: IntelligenceBrief = {
    id: 'default',
    referenceId: 'INTEL-2024-DACH-001',
    title: 'Strategic Expansion: DACH Region Analysis',
    date: 'October 24, 2024',
    description: 'A definitive assessment of market entry risks, competitive landscape synthesis, and executive next-steps for the 2024 fiscal roadmap.',
    category: 'Market Entry',
    confidentiality: 'INTERNAL_CONFIDENTIAL',
    narrativeSynthesis: [
      'The DACH region (Germany, Austria, Switzerland) represents a critical pivot point for our European expansion. Current market sentiment indicates a high barrier to entry for non-localized platforms, yet our core competitive advantage in data privacy alignment places us in a unique "Trust Tier."',
      'Preliminary synthesis of stakeholder interviews suggests that while regulatory compliance is the primary blocker, there is a distinct secondary gap in regionalized support infrastructure. Our roadmap must prioritize the establishment of a Frankfurt-based node to satisfy data sovereignty mandates.'
    ],
    talkingPoints: [
      { title: "Sovereignty First", content: "Every regional partner emphasized that \"Cloud Native\" must mean \"Europe Native\" for this specific expansion phase." },
      { title: "Price Elasticity", content: "The mid-market segment is showing 12% higher price sensitivity than our US benchmarks, requiring a tiered approach." },
      { title: "Legacy Inertia", content: "Transitioning incumbent firms will require a high-touch white-glove migration strategy over a 6-month window." },
      { title: "Talent Localization", content: "The hiring of a Regional Director with local network equity is deemed non-negotiable by the board." }
    ],
    metadata: {
      preparationDate: 'October 24, 2024',
      keyAttendees: ["Sarah Chen (CEO)", "Markus Weber", "Elena Rossi", "+2 Others"],
      classification: 'Internal Confidential'
    },
    risks: [
      { label: 'Regulatory Approval', intensityLabel: 'High Intensity', value: 85, color: 'bg-risk-red' },
      { label: 'Market Acceptance', intensityLabel: 'Moderate', value: 42, color: 'bg-risk-amber' },
      { label: 'Operational Readiness', intensityLabel: 'Low Risk', value: 18, color: 'bg-emerald-decision' },
    ],
    nextSteps: [
      { id: '1', task: 'Finalize regional board selection', completed: true },
      { id: '2', task: 'Draft GDPR compliance whitepaper', completed: true },
      { id: '3', task: 'Secure Frankfurt Data Center Lease', completed: false },
      { id: '4', task: 'Announce Series C expansion capital', completed: false },
      { id: '5', task: 'Regional Director Final Interviews', completed: false },
    ],
    visualIdentityPrompt: "A digital illustration of a bridge being built in a sunset, representing 'Project Infrastructure'"
  };

  const brief = stateBrief || defaultBrief;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(brief.visualIdentityPrompt);
    alert('Creative prompt copied to clipboard!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
      {/* Hero Header Section */}
      <div className="grid grid-cols-12 gap-6 mb-12 items-end">
        <div className="col-span-12 lg:col-span-8">
          <div className="font-label-caps text-on-primary-container mb-2 tracking-[0.1em]">Intelligence Brief</div>
          <h2 className="font-h1-display text-charcoal-primary mb-4 leading-tight">{brief.title}</h2>
          <p className="font-body-main text-on-surface-variant max-w-2xl">
            {brief.description}
          </p>
        </div>
        <div className="hidden lg:block lg:col-span-4 text-right">
          <button 
            onClick={() => alert('Feature coming soon: Archiving brief to persistent storage.')}
            className="bg-charcoal-primary text-white font-label-caps px-6 py-3 rounded-sm hover:bg-emerald-decision transition-colors uppercase tracking-widest active:scale-95 duration-150"
          >
            Finalize & Archive
          </button>
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Primary Briefing */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          {/* Visual Identity Anchor */}
          <div className="relative h-[320px] overflow-hidden rounded-sm border border-zinc-200 group">
            <img 
              src={brief.heroImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBEyY0fFUBfMmiXgiQPLGGAuwOO2kXRmPXMaW_nLl5sc2TAM5zVb--tNv22AO9tnHyaZ3H_fVCXp4w4mDabbGMWfkMaPY0g6iapyjxtHyt3v_PgMvb1ld0zqv1HoRVESxw3JdfnLgMES6TTjvIVmRzc_EuLLJMKN18vbqF_hYQI5AbHdFKcxU2zuPdIDgpVKV08uNzaosEWWQZuyXBCuajM3xYG88z5J67oUD1kcHpM2aBLVPynCerz_Ymi5Z3Mm_HKn4c-zdng95cx"} 
              className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-700 group-hover:scale-105"
              alt="Intel Visual"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white flex justify-between items-end w-[calc(100%-3rem)]">
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-[0.2em] mb-1 opacity-80">Reference ID</p>
                <p className="font-h2-module text-sm font-bold tracking-tight">{brief.referenceId}</p>
              </div>
              <button 
                onClick={handleCopyPrompt}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider transition-all"
                title={brief.visualIdentityPrompt}
              >
                <Copy className="size-3" />
                Creative Prompt
              </button>
            </div>
          </div>

          {/* Narrative Synthesis */}
          <section className="bg-paper-surface border border-zinc-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-label-caps text-on-primary-container tracking-widest">Narrative Synthesis</h3>
              <Sparkles className="size-5 text-zinc-300" />
            </div>
            <div className="space-y-4 font-body-main text-on-surface">
              {brief.narrativeSynthesis.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Key Talking Points */}
          <section className="bg-paper-surface border border-zinc-200 p-8 shadow-sm">
            <h3 className="font-label-caps text-on-primary-container tracking-widest mb-8">Key Talking Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brief.talkingPoints.map((point, i) => (
                <div key={i} className="border-l-2 border-zinc-900 pl-6">
                  <h4 className="font-h2-module text-base mb-2">{point.title}</h4>
                  <p className="font-body-meta text-on-surface-variant">{point.content}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Metadata & Risk */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          {/* Brief Metadata */}
          <section className="bg-surface-container-low border border-zinc-200 p-8">
            <h3 className="font-label-caps text-on-primary-container tracking-widest mb-6">Brief Metadata</h3>
            <div className="space-y-6">
              <div>
                <p className="font-label-caps text-[10px] text-zinc-400 mb-2">Preparation Date</p>
                <p className="font-body-meta font-medium">{brief.metadata.preparationDate}</p>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-zinc-400 mb-3">Key Attendees</p>
                <div className="flex flex-wrap gap-2">
                  {brief.metadata.keyAttendees.map((name) => (
                    <span key={name} className="px-3 py-1 bg-white border border-zinc-200 text-[11px] font-medium rounded-sm">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-zinc-400 mb-2">Classification</p>
                <div className="flex items-center gap-2 text-zinc-900">
                  <Lock className="size-3 fill-zinc-900" />
                  <span className="text-[11px] font-bold uppercase tracking-tighter">{brief.metadata.classification}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Radar */}
          <section className="bg-paper-surface border border-zinc-200 p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-label-caps text-on-primary-container tracking-widest">Risk Radar</h3>
                <div className={cn(
                  "h-2 w-2 rounded-full animate-pulse",
                  brief.risks.some(r => r.value > 70) ? "bg-risk-red" : "bg-risk-amber"
                )}></div>
              </div>
              <div className="space-y-6">
                {brief.risks.map((risk) => (
                  <div key={risk.label} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold uppercase">{risk.label}</span>
                      <span className={cn("font-bold uppercase", risk.color.replace('bg-', 'text-'))}>{risk.intensityLabel}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${risk.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={cn("h-full", risk.color)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-body-meta text-[11px] text-on-surface-variant italic">
                *Statistical delta identified in neural mapping. Risk indicators are predictive.
              </p>
            </div>
          </section>

          {/* Next Steps Checklist */}
          <section className="bg-paper-surface border border-zinc-200 p-8">
            <h3 className="font-label-caps text-on-primary-container tracking-widest mb-6">Decision Log & Next Steps</h3>
            <div className="space-y-4">
              {brief.nextSteps.map((step) => (
                <label key={step.id} className="flex items-start gap-4 cursor-pointer group">
                  <div className={cn(
                    "mt-0.5 size-4 rounded-sm border border-zinc-300 flex items-center justify-center transition-all",
                    step.completed ? "bg-emerald-decision border-emerald-decision" : "group-hover:border-zinc-900"
                  )}>
                    {step.completed && <Check className="size-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className={cn(
                    "font-body-meta text-sm transition-all",
                    step.completed ? "line-through text-zinc-400" : "text-zinc-700"
                  )}>
                    {step.task}
                  </span>
                </label>
              ))}
            </div>
            <button className="mt-8 w-full border border-dashed border-zinc-300 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 transition-all">
              + Add Action Item
            </button>
          </section>
        </div>
      </div>

      {/* Footer Archive Note */}
      <footer className="mt-20 border-t border-zinc-100 pt-8 flex justify-between items-center text-zinc-400 font-body-meta text-[11px] uppercase tracking-[0.2em]">
        <div>PostScript Intelligence System © 2024</div>
        <div className="flex gap-8">
          <button onClick={() => window.print()} className="hover:text-zinc-900 transition-colors">Print Brief</button>
          <a href="#" className="hover:text-zinc-900 transition-colors">Audit Trail</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Share Securely</a>
        </div>
      </footer>
    </motion.div>
  );
}
