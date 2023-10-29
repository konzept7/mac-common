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
  name: string;
  /**
   * The type of the job. This is used to identify the job in the frontend.
   */
  timeout: number;
  icon: string;
  category: JobCategory;
  isBatchable?: boolean;
  serverstates?: (BoxState | 'closed')[] | null;
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
}

/**
 *
 */
export interface JobDescriptionParameter {
  type: 'string' | 'number' | 'boolean' | 'serverstate' | 'date' | string;
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
  boxId: string;
  operation: string;
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

/**
 * Represents a job request.
 */
class JobRequest {
  /** The status of the job request. */
  status!: string;

  /** Details about the status of the job request. */
  statusDetails: StatusDetails | undefined;

  /** The ID of the job. */
  jobId!: string;

  /** The operation associated with the job. */
  operation!: string;

  /**
   * Creates a new instance of the `JobRequest` class.
   * @param job The job data.
   */
  constructor(job: IJob) {
    this.status = job.status;
    this.statusDetails = job.statusDetails;
    this.jobId = job.jobId;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.operation = job.jobDocument.operation!;
  }
}

/**
 * Represents a job document.
 */
class JobDocument {
  /** The operation associated with the job document. */
  operation?: string;

  /** Whether a restart is needed for the job. */
  isRestartNeeded?: boolean;

  /** The images associated with the job. */
  images?: Array<string>;

  /** Whether the job is forced. */
  isForced?: boolean;

  /** The command associated with the job. */
  command?: string;

  /** The option associated with the job. */
  option?: string;

  /** The parameters associated with the job. */
  parameters?: Record<string, string>;

  /** The URL associated with the job. */
  url?: string;

  /** The body associated with the job. */
  body?: string;

  /** The HTTP method associated with the job. */
  httpMethod?: string;

  /** The ID of the box associated with the job. */
  boxId?: string;

  /** The amount associated with the job. */
  amount?: number;

  /** The include for test associated with the job. */
  includeForTest?: string;
}

/**
 * Details about the status of a job.
 */
class StatusDetails {
  /** The progress of the job. */
  progress: number | undefined;

  /** The error code associated with the job, if applicable. */
  errorCode?: string;

  /** The current step of the job. */
  currentStep: string | undefined;
}

/**
 * Represents a job.
 */
interface IJob {
  /** The status of the job. */
  status: string;

  /** The ID of the job. */
  jobId: string;

  /** The timestamp when the job was queued. */
  queuedAt: number;

  /** The timestamp when the job was last updated. */
  lastUpdatedAt: number;

  /** The job document associated with the job. */
  jobDocument: JobDocument;

  /** Details about the status of the job. */
  statusDetails: StatusDetails | undefined;

  /**
   * Updates the progress and current step of the job.
   * @param progress The progress of the job.
   * @param step The current step of the job.
   */
  Progress(progress: number, step: string): JobRequest;

  /**
   * Marks the job as succeeded.
   * @param message The success message.
   */
  Succeed(message: string): JobRequest;

  /**
   * Marks the job as failed.
   * @param reason The reason for the failure.
   * @param errorCode The error code associated with the failure.
   */
  Fail(reason: string, errorCode: string): JobRequest;
}

/**
 * Creates a new job configuration.
 * @param description The job description.
 * @param copyFromExisting The existing job configuration to copy from.
 * @param boxId The ID of the box associated with the job.
 * @returns The new job configuration.
 */
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
