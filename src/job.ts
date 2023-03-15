import type { BoxState } from './box';

export interface JobDescriptionParameter {
  type: string;
  message: string;
  name: string;
  onOption?: string[];
}
export interface JobDescriptionOption {
  name: string;
  description: string;
}
export interface JobDescription {
  name: string;
  value: string;
  label: string;
  timeout: string;
  description: string;
  isBatchable?: boolean;
  allowedBoxStates?: BoxState[] | null;
  caution?: string;
  isAdminOnly?: boolean;
  options?: JobDescriptionOption[];
  parameters?: JobDescriptionParameter[];
}
export interface JobCreationConfiguration {
  document: unknown;
  targets: string[];
  template: JobDescription;
  id: string;
}

export type JobStatus = 'SUCCEEDED' | 'FAILED' | 'IN_PROGRESS' | 'QUEUED' | 'CANCELED' | 'UNKNOWN';
export interface RunningJobDescription {
  id: string;
  lastUpdate: Date;
  status: JobStatus;
}
export interface CustomJobUpdate {
  status: JobStatus;
  statusDetails?: {
    progress?: number;
    currentStep?: string;
  };
  jobId: string;
  operation: string;
  timestamp: Date;
}
