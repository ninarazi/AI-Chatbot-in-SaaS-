
export type ProjectStatus = 'Approved' | 'In Progress' | 'New' | 'Proposed' | 'On Hold';
export type RAGStatus = 'Green' | 'Yellow' | 'Red' | 'Not Rated';
export type Priority = 'Low' | 'Medium' | 'High';

export interface ProjectRow {
  id: string;
  name: string;
  projectId: string;
  status: ProjectStatus;
  leader: {
    name: string;
    avatar: string;
  };
  totalRAG: RAGStatus;
  location: string;
  priority: Priority;
  wsjf?: number;
}

export interface Milestone {
  id: string;
  date: string;
  project: string;
  type: 'decision' | 'milestone';
  color: string;
  label?: string;
}

export interface KPI {
  count: number;
  label: string;
  color: string;
  highlight: string;
}
