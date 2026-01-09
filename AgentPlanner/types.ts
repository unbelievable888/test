
export enum TaskTool {
  Text2SQL = 'Text2SQL',
  RAG = 'RAG',
  Final_Synthesis = 'Final_Synthesis'
}

export interface AnalysisTask {
  id: number;
  tool: TaskTool;
  description: string;
  subQuery: string;
  dependencies: number[];
}

export interface ExecutionPlan {
  planId: string;
  tasks: AnalysisTask[];
}
