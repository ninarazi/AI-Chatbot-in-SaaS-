import React, { useState } from 'react';
import { 
  Search, ChevronDown, Bell, Plus, Menu, Settings, HelpCircle, 
  LayoutGrid, Star, User, Sparkles, RefreshCw, Minus, Maximize2,
  Filter, Columns, Calendar, Share2, ArrowUpDown, Search as SearchIcon,
  Folder, Building2, User2, AlertCircle, CheckCircle2, Circle, MoreHorizontal,
  Layout, Home, ChevronRight, Info, ChevronUp, Coffee, LocateFixed,
  Paperclip, Send, ChevronLeft, ChevronsLeft, Pencil, Copy, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KPIS, MILESTONES, PROJECTS } from './data/mock';
import { ProjectRow, Milestone, KPI, ProjectStatus, RAGStatus, Priority } from './types';

// Helper to get RAG color
const getRAGColor = (status: RAGStatus) => {
  switch (status) {
    case 'Green': return 'bg-green-500';
    case 'Yellow': return 'bg-yellow-500';
    case 'Red': return 'bg-red-500';
    default: return 'bg-slate-300';
  }
};

const getStatusStyle = (status: ProjectStatus) => {
  switch (status) {
    case 'Approved': return 'bg-green-600/90 text-white';
    case 'In Progress': return 'bg-cyan-400 text-cyan-900 border border-cyan-300';
    case 'New': return 'bg-green-800 text-white';
    case 'On Hold': return 'bg-slate-400 text-white';
    case 'Proposed': return 'bg-blue-100 text-blue-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case 'High': return 'text-green-500';
    case 'Medium': return 'text-yellow-500';
    case 'Low': return 'text-orange-500';
    default: return 'text-slate-400';
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [submittedQuestion, setSubmittedQuestion] = useState<string | null>(null);

  const loadingMessages = [
    "Analyzing project data...",
    "Evaluating priority signals...",
    "Checking risk and dependencies..."
  ];

  React.useEffect(() => {
    let interval: any;
    if (isProcessing) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleSubmitQuestion = () => {
    const query = aiInput.trim();
    if (!query || isProcessing) return;
    
    setSubmittedQuestion(query);
    setIsProcessing(true);
    setAiResponse(null);
    setAiInput(''); // Clear input on submit as per standard chat behavior
    
    // Simulate AI response for the specific question with a realistic delay
    setTimeout(() => {
      // Guard if stopped manually or component unmounted
      setIsProcessing((currentProcessing) => {
        if (!currentProcessing) return false;

        const project = selectedProject || PROJECTS.find(p => p.name === 'Aurora');
        const questionLower = query.toLowerCase();

        if (questionLower.includes('priority') || questionLower.includes('risk')) {
          setAiResponse({
            title: "Citizen AI",
            summary: `The "${project?.name || 'Aurora'}" project is associated with several risks. Here are some of them:`,
            risks: [
              "1. Battery Supplier Bankruptcy: Risk of a key battery supplier declaring bankruptcy, affecting production costs and timelines. Status: To be Reviewed.",
              "2. Firmware Update Delays: Delays in firmware development could postpone the product launch. Status: Drafted.",
              "3. Talent Loss to Competitors: Skilled workers may leave for competitors, causing project delays. Status: To be Assessed.",
              "4. Currency Exchange Rate Fluctuations: Fluctuating currency rates could increase project costs. Status: Drafted.",
              "5. Data Breach in User Privacy: Unauthorized data access could compromise user privacy and harm brand reputation. Status: Drafted.",
              "6. New Emission Standards: New government regulations on emissions could require significant design changes. Status: Mitigated.",
              "7. Flooding blocks Production Line: A flooding blocks the production for at least 12 months. Status: To be Reviewed.",
              "8. Supply Chain Disruptions: The risk of interruptions or delays in the supply chain that can affect production schedules and lead to increased costs. Status: To be Assessed."
            ],
            suggestion: "Would you like me to prepare a detailed inform?"
          });
        } else {
          setAiResponse({
            title: "Citizen AI",
            summary: "I've analyzed the current project dashboard data for you.",
            insights: [
              "Project 'Aurora' is on track but requires risk review.",
              "Total RAG status for muni-location projects is Yellow.",
              "Next milestone (CyberDrive) is 12 Nov 2025."
            ],
            suggestion: "Should I double check the resource allocation?"
          });
        }
        return false;
      });
    }, 2500);
  };

  const handleStop = () => {
    setIsProcessing(false);
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-800 overflow-hidden select-none relative">
      {/* Sidebar - Precise match to image */}
      <aside className="w-12 bg-[#006199] flex flex-col items-center py-3 gap-4 shrink-0 z-50">
        <div className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded cursor-pointer transition-colors">
          <Menu className="w-5 h-5" />
        </div>
        <div className="w-8 h-8 flex items-center justify-center bg-[#0078BD] rounded cursor-pointer shadow-lg">
          <Coffee className="w-6 h-6 text-white" />
        </div>
        <div className="w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:bg-white/10 rounded cursor-pointer transition-colors mt-1">
          <LocateFixed className="w-6 h-6" />
        </div>
        <div className="mt-auto mb-20 w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:bg-white/10 rounded cursor-pointer transition-colors">
          <Settings className="w-5 h-5" />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-10 bg-white border-b border-slate-200 flex items-center px-4 justify-between shrink-0 z-40">
          <div className="flex items-center gap-5">
            <div className="w-8 h-8 flex items-center justify-center text-cplace-blue hover:bg-slate-50 rounded cursor-pointer">
              <Home className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 text-sm">
              <span className="hover:text-cplace-blue cursor-pointer">New</span>
              <div className="flex items-center gap-1 hover:text-cplace-blue cursor-pointer">
                <span>Workspaces</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-1 hover:text-cplace-blue cursor-pointer">
                <span>Recents</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-12">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-sm py-1 pl-3 pr-10 text-[13px] focus:outline-none focus:border-cplace-blue/50"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus:text-cplace-blue" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 text-slate-500 hover:bg-slate-100 rounded cursor-pointer relative">
              <LayoutGrid className="w-4 h-4" />
              <ChevronDown className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5" />
            </div>
            <div className="p-1.5 text-slate-500 hover:bg-slate-100 rounded cursor-pointer">
              <Star className="w-4 h-4" />
              <ChevronDown className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5" />
            </div>
            <div className="p-1.5 text-slate-500 hover:bg-slate-100 rounded cursor-pointer relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 border-2 border-white rounded-full"></span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#A033FF] flex items-center justify-center text-white text-[10px] font-bold border border-white shadow-sm cursor-pointer ml-1">
              NR
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto bg-white flex flex-col p-0">
          {/* Header Bar */}
          <div className="h-12 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 bg-[#F8FAFC]">
            <div className="flex items-center gap-3">
              <div className="p-1 text-slate-600">
                <Layout className="w-4.5 h-4.5" />
              </div>
              <h1 className="text-[17px] font-bold tracking-tight text-slate-800">Project Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 hover:text-cplace-blue cursor-pointer">Page Settings</span>
              <button 
                onClick={() => setIsAiSidebarOpen(true)}
                className="flex items-center p-[1px] rounded-[4px] bg-gradient-to-br from-[#00E676] via-[#A033FF] to-[#0078BD] cursor-pointer group shadow-sm w-[68.95px] h-[28px] overflow-hidden shrink-0"
              >
                <div className="flex items-center gap-[4px] pt-[6px] pb-[6px] pl-[4px] pr-[4px] bg-white rounded-[3px] w-full h-full transition-colors group-hover:bg-slate-50 justify-center">
                  <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                    <img 
                      src="/ai_icon.svg" 
                      alt="AI Icon" 
                      className="w-[15.95px] h-4" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[#0045AC] font-sans font-normal text-[16px] leading-[20px] whitespace-nowrap">Ask AI</span>
                </div>
              </button>
              <MoreHorizontal className="w-4.5 h-4.5 text-slate-400 cursor-pointer" />
            </div>
          </div>

          <div className="px-10 py-4 space-y-6">
            {/* KPI Cards */}
            <div className="flex items-center justify-between pr-20">
              {KPIS.map((kpi, idx) => (
                <div key={idx} className="flex items-baseline gap-4">
                  <span className={`text-[100px] font-black ${kpi.color} leading-none tracking-tighter`}>{kpi.count}</span>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-[28px] font-bold text-slate-700 leading-tight">{kpi.label}</span>
                    <span className={`text-[28px] font-black ${kpi.color} leading-tight`}>{kpi.highlight}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Section */}
            <section className="mt-2">
              <h2 className="text-center text-[18px] font-bold text-slate-800 mb-8">Upcoming Decision Milestones</h2>
              <div className="relative px-20">
                <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-slate-200 -translate-y-1/2 rounded-full"></div>
                
                <div className="relative h-48 flex items-center justify-between">
                  {MILESTONES.map((m, idx) => {
                    const isTop = idx % 2 === 0;
                    return (
                      <div key={m.id} className="relative flex flex-col items-center">
                        <div 
                          className={`absolute w-32 bg-white border border-slate-300 rounded shadow-sm p-1.5 px-3 z-10 ${isTop ? 'bottom-10' : 'top-10'}`}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }}></div>
                              <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight">
                                {m.date}
                              </span>
                            </div>
                            <span className="text-[12px] font-medium text-slate-500">{m.project}</span>
                          </div>
                        </div>

                        <div className={`w-[2px] h-8 bg-slate-200 absolute left-1/2 -translate-x-1/2 ${isTop ? 'bottom-0' : 'top-0'}`}></div>
                        <div 
                          className="w-4 h-4 rounded-full border-[4px] border-white shadow-sm z-20 relative ring-1 ring-slate-100" 
                          style={{ backgroundColor: m.color }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Actual Projects Table Container */}
            <div className="bg-[#f1f5f9] rounded-lg p-0 border border-slate-200 overflow-hidden">
              <header className="bg-[#f8fafc] px-4 h-10 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-cplace-blue">Actual Projects</h2>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-[#81B3D2] rounded-full text-white cursor-pointer"><RefreshCw className="w-3.5 h-3.5" /></div>
                  <div className="w-6 h-6 flex items-center justify-center bg-[#FFBC34] rounded-full text-white cursor-pointer"><Minus className="w-3.5 h-3.5" /></div>
                  <div className="w-6 h-6 flex items-center justify-center bg-[#51DB65] rounded-full text-white cursor-pointer"><Maximize2 className="w-3.5 h-3.5" /></div>
                </div>
              </header>

              <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded divide-x divide-slate-200 bg-white">
                    <button className="p-1.5 px-3 hover:bg-slate-50"><Filter className="w-4 h-4 text-slate-500" /></button>
                    <button className="p-1.5 px-3 hover:bg-slate-50"><Columns className="w-4 h-4 text-slate-500" /></button>
                    <button className="p-1.5 px-3 hover:bg-slate-50"><Calendar className="w-4 h-4 text-slate-500" /></button>
                    <button className="p-1.5 px-3 hover:bg-slate-50"><Share2 className="w-4 h-4 text-slate-500" /></button>
                    <button className="p-1.5 px-3 hover:bg-slate-50"><ArrowUpDown className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <div className="relative">
                    <input type="text" placeholder="" className="w-10 h-7 border border-slate-200 rounded bg-white" />
                    <Search className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="p-1.5 border border-slate-200 rounded bg-white cursor-pointer">
                  <Settings className="w-4 h-4 text-slate-500" />
                  <ChevronDown className="inline w-3 h-3 text-slate-400 ml-1" />
                </div>
              </div>

              <div className="overflow-x-auto bg-white">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-slate-200 h-9">
                      <th className="w-10 border-r border-slate-200 px-3 text-center">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300" />
                      </th>
                      <th className="px-3 border-r border-slate-200 text-left font-bold w-60">
                        <div className="flex items-center justify-between">
                          <span>Project</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-cplace-blue">1</span>
                            <div className="flex flex-col -space-y-1">
                              <ChevronUp className="w-2.5 h-2.5 text-slate-300" />
                              <ChevronDown className="w-2.5 h-2.5 text-cplace-blue" />
                            </div>
                          </div>
                        </div>
                      </th>
                      <th className="px-3 border-r border-slate-200 text-left font-bold w-24">
                        <div className="flex items-center justify-between">
                          <span>Project ID</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-3 border-r border-slate-200 text-left font-bold w-48">
                        <div className="flex items-center justify-between">
                          <span>Status</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-3 border-r border-slate-200 text-left font-bold w-56">
                        <div className="flex items-center justify-between">
                          <span>Project Leader</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-3 border-r border-slate-200 text-left font-bold w-32">
                        <div className="flex items-center justify-between">
                          <span>Total RAG</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-3 border-r border-slate-200 text-left font-bold w-40">
                        <div className="flex items-center justify-between">
                          <span>Location</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-3 border-r border-slate-200 text-left font-bold w-40">
                        <div className="flex items-center justify-between">
                          <span>Mgmt. Priority</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-3 text-left font-bold w-20">
                        <div className="flex items-center justify-between">
                          <span>WSJF</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Hannover', 'Munich'].map((loc, gIdx) => {
                      const rows = PROJECTS.filter(p => p.location === loc);
                      return (
                        <React.Fragment key={loc}>
                          <tr className="bg-[#f8fafc] h-9 border-b border-slate-200">
                            <td className="w-10 border-r border-slate-200"></td>
                            <td colSpan={8} className="px-3">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                  <span className="font-bold text-slate-800">Location:</span>
                                  <Building2 className="w-4 h-4 text-cplace-blue" />
                                  <span className="text-cplace-blue underline">{loc}</span>
                                </div>
                                <span className="text-slate-400 text-xs">({rows.length})</span>
                              </div>
                            </td>
                          </tr>
                          {rows.map(row => (
                            <tr 
                              key={row.id} 
                              onClick={() => setSelectedProject(row)}
                              className={`h-10 border-b border-slate-100 cursor-pointer transition-colors ${selectedProject?.id === row.id ? 'bg-cplace-blue/10' : 'hover:bg-slate-50'} group`}
                            >
                              <td className="w-10 border-r border-slate-100 text-center">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300" />
                              </td>
                              <td className="px-3 border-r border-slate-100">
                                <div className="flex items-center gap-2">
                                  <Folder className="w-4 h-4 text-cplace-blue fill-cplace-blue/10" />
                                  <span className="text-cplace-blue font-medium hover:underline cursor-pointer">{row.name}</span>
                                </div>
                              </td>
                              <td className="px-3 border-r border-slate-100 text-slate-500">{row.projectId}</td>
                              <td className="px-3 border-r border-slate-100">
                                <div className="w-full bg-slate-100 rounded-full h-[22px] relative overflow-hidden flex items-center border border-slate-200">
                                  <div 
                                    className={`h-full absolute left-0 top-0 rounded-full ${row.status === 'Approved' ? 'bg-[#2E7D32]' : row.status === 'In Progress' ? 'bg-[#4DD0E1]' : 'bg-[#1B5E20]'}`}
                                    style={{ width: '100%' }}
                                  ></div>
                                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-white uppercase tracking-wider">{row.status}</span>
                                </div>
                              </td>
                              <td className="px-3 border-r border-slate-100">
                                <div className="flex items-center gap-2">
                                  <img src={row.leader.avatar} className="w-6 h-6 rounded-full border border-slate-200" referrerPolicy="no-referrer" />
                                  <span className="text-cplace-blue hover:underline cursor-pointer">{row.leader.name}</span>
                                </div>
                              </td>
                              <td className="px-3 border-r border-slate-100">
                                <div className="flex items-center gap-2">
                                  <div className="w-2.5 h-5 bg-slate-800 rounded-sm relative overflow-hidden flex flex-col justify-end p-[1px]">
                                    <div className={`w-full ${getRAGColor(row.totalRAG)}`} style={{ height: '70%' }}></div>
                                  </div>
                                  <span className="text-slate-600 italic">Not Rated</span>
                                </div>
                              </td>
                              <td className="px-3 border-r border-slate-100">
                                <div className="flex items-center gap-1.5 text-cplace-blue">
                                  <Building2 className="w-3.5 h-3.5" />
                                  <span className="underline">{row.location}</span>
                                </div>
                              </td>
                              <td className="px-3 border-r border-slate-100">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${row.priority === 'High' ? 'bg-green-500' : row.priority === 'Medium' ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
                                  <span className="text-slate-600">{row.priority}</span>
                                </div>
                              </td>
                              <td className="px-3 text-right text-slate-500">{row.wsjf ? row.wsjf.toFixed(2) : ''}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="fixed bottom-10 left-0 bg-blue-500 text-white p-2 rounded-r-lg z-50 cursor-pointer shadow-lg">
        <Settings className="w-5 h-5" />
      </div>

      <div className="fixed right-6 bottom-32 w-12 h-12 bg-cplace-blue rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
        <HelpCircle className="w-6 h-6" />
      </div>

      {/* AI Companion Sidebar */}
      <AnimatePresence>
        {isAiSidebarOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[450px] bg-[#00207A] z-[100] shadow-2xl flex flex-col text-white"
          >
            {/* Top-right Branded Icon - Scale down after interaction */}
            <motion.img 
              layout
              src="/ai_icon.svg" 
              alt="AI Icon" 
              className={`absolute right-8 transition-all duration-500 pointer-events-none ${
                submittedQuestion ? 'top-4 w-12 h-12 opacity-40' : 'top-8 w-24 h-24 opacity-90'
              }`} 
              referrerPolicy="no-referrer"
            />

            {/* Sidebar Toggle/Close */}
            <div className="p-4 relative z-10">
              <button 
                onClick={() => setIsAiSidebarOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-2"
              >
                <span className="text-2xl">»</span>
              </button>
            </div>

            {/* AI Content and Input Area */}
            <div className={`flex-1 px-8 flex flex-col relative z-10 w-full overflow-hidden transition-all duration-500 ${
              submittedQuestion ? 'pt-2' : 'pt-20'
            }`}>
              <AnimatePresence mode="wait">
                {!submittedQuestion ? (
                  <motion.div 
                    key="initial"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-12"
                  >
                    <h2 className="text-[32px] font-bold leading-tight text-white mb-2">
                      Hello <span className="text-[#00E676]">Julia,</span>
                    </h2>
                    <p className="text-[32px] font-bold leading-tight text-white">How can I assist you today?</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="conversation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar pb-4"
                  >
                    {/* User Question Card */}
                    <div className="self-end w-full flex justify-end">
                      <div className="bg-white rounded-lg p-3 shadow-md border border-slate-100 flex gap-4 max-w-[90%] relative">
                        <div className="flex-1">
                          <div className="text-[13px] font-bold text-slate-900 mb-1">Julia Hillenkötter</div>
                          <div className="text-[13px] text-slate-600 leading-snug">
                            {submittedQuestion}
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 shrink-0">
                          <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-slate-50">
                            <img 
                              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julia" 
                              alt="Avatar" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex items-center gap-2.5 text-slate-400 pt-1">
                            <Pencil className="w-3.5 h-3.5 cursor-pointer hover:text-cplace-blue transition-colors" />
                            <Copy className="w-3.5 h-3.5 cursor-pointer hover:text-cplace-blue transition-colors" />
                          </div>
                        </div>
                        {/* Little tail/arrow could be added with absolute CSS if needed, but let's stick to clean card first */}
                      </div>
                    </div>

                    {/* AI Thinking/Response Area */}
                    <AnimatePresence mode="wait">
                      {isProcessing ? (
                        <motion.div 
                          key="thinking-card"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="bg-white rounded-xl shadow-2xl overflow-hidden text-slate-800 flex flex-col border border-white/20"
                        >
                          {/* Card Header: Citizen AI - Loading */}
                          <div className="bg-[#f8fafc] px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cplace-blue to-teal-400 p-[1px] shadow-sm">
                                <div className="bg-white w-full h-full rounded-[7.5px] flex items-center justify-center">
                                  <img src="/ai_icon.svg" className="w-6 h-6" alt="AI" />
                                </div>
                              </div>
                              <div className="flex flex-col -space-y-0.5">
                                <span className="font-bold text-[14px] text-slate-800">Citizen AI</span>
                                <motion.span 
                                  key={loadingStep}
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="text-[11px] text-cplace-blue font-semibold tracking-tight"
                                >
                                  {loadingMessages[loadingStep]}
                                </motion.span>
                              </div>
                            </div>
                            <div className="w-6 h-6 relative flex items-center justify-center">
                              <svg className="absolute inset-0 w-full h-full animate-spin text-cplace-blue" viewBox="0 0 24 24">
                                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Thinking Dots */}
                          <div className="p-8 flex flex-col items-center justify-center gap-4 min-h-[160px]">
                            <div className="flex gap-1">
                              {[0, 1, 2].map(i => (
                                <motion.div 
                                  key={i}
                                  animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 1, 0.3]
                                  }}
                                  transition={{ 
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                  }}
                                  className="w-2 h-2 bg-cplace-blue rounded-full"
                                />
                              ))}
                            </div>
                            <span className="text-xs text-slate-400 font-medium tracking-wide">Processing response...</span>
                          </div>
                        </motion.div>
                      ) : aiResponse && (
                        <motion.div 
                          key="response-card"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className="bg-white rounded-xl shadow-2xl overflow-hidden text-slate-800 flex flex-col border border-white/20 max-h-[60vh]"
                        >
                          {/* Card Header: Citizen AI - Final */}
                          <div className="bg-[#f8fafc] px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cplace-blue to-teal-400 p-[1px] shadow-sm">
                                <div className="bg-white w-full h-full rounded-[7.5px] flex items-center justify-center">
                                  <img src="/ai_icon.svg" className="w-6 h-6" alt="AI" />
                                </div>
                              </div>
                              <div className="flex flex-col -space-y-0.5">
                                <span className="font-bold text-[14px] text-slate-800">Citizen AI</span>
                              </div>
                            </div>
                            <Sparkles className="w-4 h-4 text-[#00E676]" />
                          </div>

                          {/* Response Content - Scrollable if too long */}
                          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
                            <p className="text-[14px] leading-relaxed text-slate-800">
                              {aiResponse.summary}
                            </p>
                            
                            {aiResponse.risks ? (
                              <div className="space-y-2">
                                {aiResponse.risks.map((riskStr: string, i: number) => {
                                  const match = riskStr.match(/^(\d+\.)\s+(.*?):\s+(.*)$/);
                                  if (match) {
                                    const [, num, title, rest] = match;
                                    return (
                                      <div key={i} className="flex items-start gap-2 text-[14px] leading-tight text-slate-800">
                                        <span className="text-[#0045AC] font-medium min-w-[20px]">{num}</span>
                                        <span>
                                          <span className="text-[#0045AC] font-medium">{title}:</span>
                                          <span className="ml-1 text-slate-700">{rest}</span>
                                        </span>
                                      </div>
                                    );
                                  }
                                  return <div key={i} className="text-[14px] text-slate-700">{riskStr}</div>;
                                })}
                              </div>
                            ) : aiResponse.insights && (
                              <div className="space-y-2">
                                {aiResponse.insights.map((insight: string, i: number) => (
                                  <div key={i} className="flex items-start gap-2 text-[14px] text-slate-500">
                                    <div className="w-1.5 h-1.5 bg-[#00E676] rounded-full mt-1.5 shrink-0" />
                                    <span>{insight}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {aiResponse.suggestion && (
                              <div className="pt-2">
                                <button 
                                  onClick={() => {/* Trigger next flow */}}
                                  className="text-[#A033FF] font-medium text-[15px] hover:underline cursor-pointer transition-all active:scale-[0.98]"
                                >
                                  {aiResponse.suggestion}
                                </button>
                              </div>
                            )}

                            {aiResponse.actions && (
                              <div className="flex flex-wrap gap-2 pt-2">
                                {aiResponse.actions.map((action: string, i: number) => (
                                  <button 
                                    key={i}
                                    className="px-3 py-1.5 bg-[#00207A] text-white text-[12px] font-medium rounded-full hover:bg-[#0030A0] transition-colors"
                                  >
                                    {action}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AI Interaction Icons - Outside card as per screenshot */}
                    {!isProcessing && aiResponse && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex items-center gap-3 px-1"
                      >
                        <Copy className="w-4 h-4 text-white/40 cursor-pointer hover:text-white transition-colors" />
                        <RefreshCw className="w-4 h-4 text-white/40 cursor-pointer hover:text-white transition-colors" />
                        <ThumbsUp className="w-4 h-4 text-white/40 cursor-pointer hover:text-white transition-colors" />
                        <ThumbsDown className="w-4 h-4 text-white/40 cursor-pointer hover:text-white transition-colors" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Input Area */}
              <div className="mt-auto mb-10 w-full relative">
                {/* Reasoning small text removed from here as it's now in the loading card header */}

                <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#00E676] via-[#A033FF] to-[#0078BD]">
                  <div className={`relative bg-[#F8FAFC] rounded-[7px] overflow-hidden group focus-within:ring-2 ring-white/20 transition-opacity ${isProcessing ? 'opacity-80' : ''}`}>
                    <textarea 
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmitQuestion();
                        }
                      }}
                      readOnly={isProcessing}
                      placeholder={isProcessing ? "Analyzing..." : "Type something..."}
                      className="w-full bg-transparent text-slate-800 rounded-lg p-3 pt-4 pr-12 h-24 resize-none focus:outline-none text-[15px] placeholder:text-slate-400"
                    />
                    <div className="absolute right-3 top-3">
                      {isProcessing ? (
                        <div className="relative w-7 h-7 flex items-center justify-center">
                          <svg className="absolute inset-0 w-full h-full animate-spin text-[#0078BD]" viewBox="0 0 24 24">
                            <circle 
                              className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none"
                            />
                            <path 
                              className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <button 
                            onClick={handleStop}
                            className="bg-slate-800 w-2.5 h-2.5 rounded-sm hover:scale-110 transition-transform active:scale-95 z-10"
                            title="Stop generation"
                          />
                        </div>
                      ) : (
                        <button 
                          onClick={handleSubmitQuestion}
                          className="w-5 h-5 flex items-center justify-center transition-transform active:scale-90"
                        >
                          <img 
                            src="/ai_icon.svg" 
                            alt="AI Icon" 
                            className="w-4 h-4" 
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      )}
                    </div>
                    <div className="absolute right-3 bottom-3 flex items-center gap-3">
                      <Paperclip className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
                      {!isProcessing && (
                        <button 
                          onClick={handleSubmitQuestion}
                          className="text-[#00207A] hover:text-[#0030A0]"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-white/50 text-center mb-6">
                All models can make mistakes. Always verify important information.
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
