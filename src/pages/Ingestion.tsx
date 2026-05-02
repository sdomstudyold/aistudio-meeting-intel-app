import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Settings2, Info, Shield, Sparkles, Loader2, FileUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { synthesizeIntelligence } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore - Vite specific import
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker - Fallback to CDN if local fails
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker || `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function Ingestion() {
  const [title, setTitle] = useState('');
  const [confidentiality, setConfidentiality] = useState('INTERNAL_USE_ONLY');
  const [plannedContent, setPlannedContent] = useState('');
  const [actualContent, setActualContent] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState<string | null>(null);
  const navigate = useNavigate();

  const plannedFileInputRef = useRef<HTMLInputElement>(null);
  const actualFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, target: 'planned' | 'actual') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(target);
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item: any) => item.str)
            .join(' ');
          fullText += pageText + '\n';
        }
        text = fullText;
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        text = await file.text();
      } else {
        alert('Unsupported file type. Please upload a PDF or TXT file.');
        return;
      }

      if (target === 'planned') {
        setPlannedContent(text);
      } else {
        setActualContent(text);
      }
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Failed to read file. Please try again or paste content manually.');
    } finally {
      setIsProcessingFile(null);
      // Reset input value so the same file can be uploaded again if needed
      if (event.target) event.target.value = '';
    }
  };

  const handleSynthesize = async () => {
    if (!title || !plannedContent || !actualContent) {
      alert('Please provide a title and content for both planned and actual sources.');
      return;
    }

    setIsSynthesizing(true);
    try {
      const brief = await synthesizeIntelligence(title, confidentiality, plannedContent, actualContent);
      // Navigate to the brief page with the generated data
      navigate('/brief', { state: { brief } });
    } catch (error) {
      alert('Synthesis failed. Please check the console for details.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {isSynthesizing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center text-center p-6"
          >
            <Loader2 className="size-12 text-emerald-decision animate-spin mb-6" />
            <div className="font-label-caps text-zinc-900 mb-2">Neural Mapping in Progress</div>
            <p className="text-zinc-500 font-body-meta max-w-sm">
              Our analysis engine is synthesizing your artifacts into structured intelligence. This typically takes 5-10 seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="mb-12">
        <div className="text-emerald-decision font-label-caps mb-2">ARCHIVE INGESTION ENGINE</div>
        <h1 className="font-h1-display text-on-surface mb-2">Initialize Synthesis</h1>
        <p className="text-on-surface-variant font-body-meta max-w-2xl">
          Input your record artifacts to generate a definitive intelligence brief. Our neural engine maps planned objectives against actual outcomes to identify risks and decisions.
        </p>
      </div>

      {/* Bento Layout Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Input Zones */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Input Box 1 */}
            <div className="bg-white border border-border-subtle p-8 flex flex-col space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-zinc-50 flex items-center justify-center">
                    <UploadCloud className="size-5 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-h2-module text-sm">Meeting Agenda & Materials</h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">Agenda, briefs, or pre-event notes</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={plannedFileInputRef}
                    onChange={(e) => handleFileUpload(e, 'planned')}
                    accept=".pdf,.txt"
                    className="hidden"
                  />
                  <button
                    onClick={() => plannedFileInputRef.current?.click()}
                    disabled={isProcessingFile === 'planned'}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded text-[10px] font-bold uppercase transition-colors disabled:opacity-50"
                    title="Upload PDF or TXT"
                  >
                    {isProcessingFile === 'planned' ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <FileUp className="size-3" />
                    )}
                    Upload artifact
                  </button>
                </div>
              </div>
              <textarea 
                value={plannedContent}
                onChange={(e) => setPlannedContent(e.target.value)}
                placeholder="Paste the planned agenda or briefing notes here..."
                className="w-full h-48 bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-zinc-900 focus:bg-white text-sm py-4 px-4 transition-all resize-none font-body-meta"
              />
            </div>

            {/* Input Box 2 */}
            <div className="bg-white border border-border-subtle p-8 flex flex-col space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-zinc-50 flex items-center justify-center">
                    <FileText className="size-5 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-h2-module text-sm">Meeting Outcome</h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">Transcripts, minutes, or output files</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={actualFileInputRef}
                    onChange={(e) => handleFileUpload(e, 'actual')}
                    accept=".pdf,.txt"
                    className="hidden"
                  />
                  <button
                    onClick={() => actualFileInputRef.current?.click()}
                    disabled={isProcessingFile === 'actual'}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded text-[10px] font-bold uppercase transition-colors disabled:opacity-50"
                    title="Upload PDF or TXT"
                  >
                    {isProcessingFile === 'actual' ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <FileUp className="size-3" />
                    )}
                    Upload record
                  </button>
                </div>
              </div>
              <textarea 
                value={actualContent}
                onChange={(e) => setActualContent(e.target.value)}
                placeholder="Paste the actual meeting transcript or outcomes here..."
                className="w-full h-48 bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-zinc-900 focus:bg-white text-sm py-4 px-4 transition-all resize-none font-body-meta"
              />
            </div>
          </div>

          {/* Metadata Section */}
          <div className="bg-white border border-border-subtle p-8">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="size-5 text-zinc-400" />
              <h3 className="font-label-caps text-zinc-900">Metadata Analysis Configuration</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Brief Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q3 Strategic Alignment Summit" 
                  className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-zinc-900 focus:bg-white text-sm py-3 px-4 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Confidentiality</label>
                <select 
                  value={confidentiality}
                  onChange={(e) => setConfidentiality(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-zinc-900 focus:bg-white text-sm py-3 px-4 appearance-none"
                >
                  <option value="INTERNAL_USE_ONLY">INTERNAL_USE_ONLY</option>
                  <option value="RESTRICTED_ACCESS">RESTRICTED_ACCESS</option>
                  <option value="PUBLIC_RELEASE">PUBLIC_RELEASE</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status/Guidelines */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container border border-border-subtle p-6">
            <div className="font-label-caps text-zinc-900 mb-4 flex items-center justify-between">
              <span>SENSITIVITY ANALYSIS</span>
              <Info className="size-4" />
            </div>
            <div className="space-y-4">
              {[
                "Neural mapping compares planned vs. actual tokens for delta detection.",
                "Synthesis identifies key stakeholders and action items automatically.",
                "Risk Radar visualization is generated post-ingestion."
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-zinc-900 flex-shrink-0" />
                  <p className="text-sm text-zinc-600 leading-relaxed font-body-meta">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-video relative overflow-hidden group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBInjZBYYPyYZ1NkevUMu37lKkL1pmLd_ofj-fS-ze30vBLzI_Z8elg9NV3qUzijUgTBJEzCPnbxD0mktC3Hls5gKsAyqvIhFyiGXuGQm0CM5ZgwublWXV6xoTMf5OVLYazUfnadLaY2ubNKvLEd1tqoO5GHhQ6Sxw9IKxzMclb7NL9l_Uzasw4vJVlILJEqa2f6XMmBs7PQkOs2vezWpj30z_hM1kg-zndKZWTOz2JKsoe6mdE_ba-pNGeTCczaNZOcXGxsj1j-ABP" 
              alt="Processing Graphic" 
              className="object-cover w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-zinc-900/40 flex items-center justify-center p-6 text-center">
              <p className="text-white text-xs font-bold uppercase tracking-[0.2em]">Ready for neural mapping</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Action Footer */}
      <div className="mt-12 flex items-center justify-between py-8 border-t border-zinc-200">
        <div className="flex items-center gap-4 text-zinc-400">
          <Shield className="size-5 fill-zinc-400 text-transparent" />
          <span className="text-xs font-medium font-body-meta">End-to-end Encrypted Synthesis Tunnel</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setTitle('');
              setPlannedContent('');
              setActualContent('');
            }}
            className="px-8 py-4 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest"
          >
            Discard
          </button>
          <button 
            disabled={isSynthesizing}
            onClick={handleSynthesize}
            className="px-12 py-4 bg-charcoal-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-emerald-decision transition-all flex items-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSynthesizing ? 'Synthesizing...' : 'Synthesize'}
            {!isSynthesizing && <Sparkles className="size-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
