import type { BoxState } from '../box';

/**
 * Helper function to create the base topic for a job.
 * @param thingName - The unique ID or thing name of the box.
 */
export function baseJobTopic(thingName: string) {
  return `$aws/things/${thingName}/jobs/`;
}

/**
 * Job descriptions are used to create remote jobs from the frontend.
 */
export interface JobDescription {
  /**
   * The name of the job. Must be unique, because it is also used by the consumer to identify the job.
   */
  name: string;
  /**
   * The type of the job. This is used to identify the job in the frontend.
   */
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
/**
 *
 */
export interface JobDescriptionOption {
  name: string;
  description: string;
}

/**
 *
 */
export interface JobDescriptionParameter {
  type: string;
  message: string;
  name: string;
  onOption?: string[];
}
export interface JobCreationConfiguration {
  document: JobDocument;
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
export const JOBTOPICS = {
  GET_ACCEPTED: 'get/accepted',
  GET: 'get',
  NOTIFY: 'notify-next',
  UPDATE: 'update',
  NEXT: '$next/get/accepted',
  QUEUED: '$next/get/queued',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
};

class JobRequest {
  status!: string;
  statusDetails: StatusDetails | undefined;
  jobId!: string;
  operation!: string;
  constructor(job: IJob) {
    this.status = job.status;
    this.statusDetails = job.statusDetails;
    this.jobId = job.jobId;
    this.operation = job.jobDocument.operation;
  }
}
enum JobOption {
  soft = 'soft',
  hard = 'hard',
  forced = 'forced',
  unpause = 'unpause',
  block = 'block',
  unblock = 'unblock',
  deviceshutdown = 'ShutDown',
  devicedisabled = 'Disabled',
  on = 'on',
  off = 'off',
  noAutostart = 'no-autostart',
  autostart = 'autostart',
  immediateRestart = 'immediate-restart',
}
class JobDocument {
  operation?: string;
  isRestartNeeded?: boolean;
  images?: Array<string>;
  isForced?: boolean;
  command?: string;
  option?: JobOption;
  parameters?: Record<string, string>;
  url?: string;
  body?: string;
  httpMethod?: string;
  boxId?: string;
  amount?: number;
  shadowCondition?: any;
  includeForTest?: string;
}
// details about the step we are currently in
class StatusDetails {
  progress: number | undefined;
  errorCode?: string;
  currentStep: string | undefined;
}

interface IJob {
  status: string;
  jobId: string;
  queuedAt: number;
  lastUpdatedAt: number;
  jobDocument: JobDocument;
  statusDetails: StatusDetails | undefined;
  Progress(progress: number, step: string): JobRequest;
  Succeed(message: string): JobRequest;
  Fail(reason: string, errorCode: string): JobRequest;
}
