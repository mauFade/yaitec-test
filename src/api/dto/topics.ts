export interface TopicRequestInterface {
  topics: string[];
  language: string;
}

export interface TopicResponseInterface {
  task_id: string;
  message: string;
  status: string;
  files_processed: number;
}

export interface NewstellerStatusResponse {
  task_id: string;
  status: string;
  result: {
    status: string;
    content: string;
    error: string | null;
  } | null;
  error: string | null;
}
