import React, { useState } from 'react';
import { 
  Search, ChevronDown, Bell, Plus, Menu, Settings, HelpCircle, 
  LayoutGrid, Star, User, Sparkles, RefreshCw, Minus, Maximize2,
  Filter, Columns, Calendar, Share2, ArrowUpDown, Search as SearchIcon,
  Folder, Building2, User2, AlertCircle, CheckCircle2, Circle, MoreHorizontal,
  Layout, Home, ChevronRight, Info, ChevronUp, Coffee, LocateFixed
} from 'lucide-react';
import { motion } from 'motion/react';
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

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-800 overflow-hidden select-none">
      {/* Sidebar - Precise match to image */}
      <aside className="w-12 bg-[#002B5B] flex flex-col items-center py-3 gap-4 shrink-0 z-50">
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
              <button className="flex items-center p-[1px] rounded-[4px] bg-gradient-to-br from-[#00E676] via-[#A033FF] to-[#0078BD] cursor-pointer group shadow-sm w-[68.95px] h-[28px] overflow-hidden shrink-0">
                <div className="flex items-center gap-[4px] pt-[6px] pb-[6px] pl-[4px] pr-[4px] bg-white rounded-[3px] w-full h-full transition-colors group-hover:bg-slate-50 justify-center">
                  <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[15.95px] h-4">
                      <defs>
                        <radialGradient id="star-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                          <stop offset="0%" stopColor="#0045AC" />
                          <stop offset="60%" stopColor="#00E676" />
                          <stop offset="100%" stopColor="#A033FF" />
                        </radialGradient>
                      </defs>
                      <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" fill="url(#star-grad)" />
                    </svg>
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
                            <tr key={row.id} className="h-10 border-b border-slate-100 hover:bg-slate-50 group">
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
    </div>
  );
}
