import type { BoxState } from '../box';
import de from '../locales/de.json';
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
export type JobCategory =
  | 'maintenance'
  | 'configuration'
  | 'unknown'
  | 'device'
  | 'test'
  | 'control'
  | 'system'
  | 'troubleshooting'
  | 'schedule'
  | 'other';
export interface JobDescription {
  /**
   * The name of the job. Must be unique, because it is also used by the consumer to identify the job.
   */
  name: keyof typeof de.jobs.names;
  /**
   * The type of the job. This is used to identify the job in the frontend.
   */
  timeout: number;
  icon: string;
  category: JobCategory;
  isBatchable?: boolean;
  allowedBoxStates?: BoxState[] | null;
  caution?: keyof typeof de.jobs.cautions;
  isAdminOnly?: boolean;
  options?: JobDescriptionOption[];
  parameters?: JobDescriptionParameter[];
}
/**
 *
 */
export interface JobDescriptionOption {
  name: keyof typeof de.jobs.optionNames;
}

/**
 *
 */
export interface JobDescriptionParameter {
  type: string;
  name: string;
  onOption?: keyof (typeof de.jobs.optionNames)[];
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.operation = job.jobDocument.operation!;
  }
}

class JobDocument {
  operation?: keyof typeof de.jobs.names;
  isRestartNeeded?: boolean;
  images?: Array<string>;
  isForced?: boolean;
  command?: string;
  option?: keyof typeof de.jobs.optionNames;
  parameters?: Record<string, string>;
  url?: string;
  body?: string;
  httpMethod?: string;
  boxId?: string;
  amount?: number;
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

export const createNewJobConfiguration = (
  description: JobDescription | null,
  copyFromExisting: JobCreationConfiguration | null,
  boxId: string,
): JobCreationConfiguration | null => {
  if (!description) {
    return null;
  }
  const jc: JobCreationConfiguration = {
    template: description,
    document: {
      operation: description.name,
    },
    targets: [`arn:aws:iot:eu-central-1:311842024294:thing/${boxId}`],
    id: '',
  };
  if (description.options && description.options.length > 0) {
    jc.document.option = description.options[0].name;
  }
  if (description.parameters) {
    jc.document.parameters = {};
    const existingParameters = Object.keys(copyFromExisting?.document.parameters || {});
    for (const p of description.parameters) {
      if (existingParameters.includes(p.name) && copyFromExisting?.document.parameters)
        jc.document.parameters[p.name] = copyFromExisting.document.parameters[p.name];
    }
  }
  return jc;
};
