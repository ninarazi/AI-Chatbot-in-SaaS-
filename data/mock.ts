import { ProjectRow, Milestone, KPI } from '../types';

export const KPIS: KPI[] = [
  { count: 3, label: 'Projects', highlight: 'on Track', color: 'text-[#00E676]' },
  { count: 2, label: 'Performance', highlight: 'Critical', color: 'text-[#A033FF]' },
  { count: 3, label: 'Behind', highlight: 'Schedule', color: 'text-[#FFAB00]' },
];

export const MILESTONES: Milestone[] = [
  { id: '1', date: '08 Jun 2025', project: 'TurboRocket', type: 'milestone', color: '#00E676' },
  { id: '2', date: '05 Jul 2025', project: 'HyperStar', type: 'decision', color: '#0078BD' },
  { id: '3', date: '08 Jul 2025', project: 'TurboRocket', type: 'milestone', color: '#0078BD' },
  { id: '4', date: '29 Jul 2025', project: 'CyberDrive', type: 'milestone', color: '#A033FF' },
  { id: '5', date: '04 Oct 2025', project: 'HyperStar', type: 'decision', color: '#00E676' },
  { id: '6', date: '04 Oct 2025', project: 'HyperStar', type: 'milestone', color: '#00E676' },
  { id: '7', date: '12 Nov 2025', project: 'CyberDrive', type: 'decision', color: '#FF4081' },
  { id: '8', date: '22 Feb 2026', project: 'HyperStar', type: 'decision', color: '#FF4081' },
  { id: '9', date: '22 Feb 2026', project: 'HyperStar', type: 'milestone', color: '#A033FF' },
];

export const PROJECTS: ProjectRow[] = [
  {
    id: '1',
    name: 'Biofuels',
    projectId: '40002',
    status: 'Approved',
    leader: { name: 'Marco Pasti', avatar: 'https://i.pravatar.cc/150?u=marco' },
    totalRAG: 'Not Rated',
    location: 'Hannover',
    priority: 'Low',
    wsjf: 3.20,
  },
  {
    id: '2',
    name: 'Connected Car Platform',
    projectId: '40002',
    status: 'In Progress',
    leader: { name: 'Vivien Leser', avatar: 'https://i.pravatar.cc/150?u=vivien' },
    totalRAG: 'Red',
    location: 'Hannover',
    priority: 'Medium',
    wsjf: 4.08,
  },
  {
    id: '3',
    name: 'HyperStar',
    projectId: '10035',
    status: 'In Progress',
    leader: { name: 'Marco Pasti', avatar: 'https://i.pravatar.cc/150?u=marco' },
    totalRAG: 'Green',
    location: 'Hannover',
    priority: 'Medium',
    wsjf: 15.33,
  },
  {
    id: '4',
    name: 'Lightweight Materials',
    projectId: '32004',
    status: 'New',
    leader: { name: 'Navid Heidemann', avatar: 'https://i.pravatar.cc/150?u=navid' },
    totalRAG: 'Yellow',
    location: 'Hannover',
    priority: 'High',
  },
  {
    id: '5',
    name: 'Aurora',
    projectId: '10044',
    status: 'In Progress',
    leader: { name: 'Christoph Huber', avatar: 'https://i.pravatar.cc/150?u=christoph' },
    totalRAG: 'Yellow',
    location: 'Munich',
    priority: 'Low',
    wsjf: 1.77,
  },
  {
    id: '6',
    name: 'NextGen Battery',
    projectId: '22091',
    status: 'In Progress',
    leader: { name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    totalRAG: 'Green',
    location: 'Munich',
    priority: 'Medium',
    wsjf: 8.45,
  }
];
