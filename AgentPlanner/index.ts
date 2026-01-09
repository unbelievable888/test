import { LLMClient } from "./LLMClient";
import { AgentPlanner } from "./AgentPlanner";
import { ExecutionEngine } from "./ExecutionEngine";

/**
 * 题目：设计多源数据路由与推理规划器
 * 数据分析Agent中，用户的请求往往涉及多模态信息的综合推理
 * 例如：“结合Q3财报PDF中的市场策略章节，分析数据库中Q3销售额下降的原因”
 * 请设计一个 Agent Planner 架构，能够将此复杂问题拆解为“文档检索(RAG)”和“数据库查询(Text2SQL)”两个子任务，
 * 并融合两者的结果生成最终回答
 */
const main = async () => {
  const client = new LLMClient();
  const planner = new AgentPlanner(client);
  const engine = new ExecutionEngine(client);

  const userQuery = "结合Q3财报PDF中的市场策略章节，分析数据库中Q3销售额下降的原因";
  
  const plan = await planner.createPlan(userQuery);
  console.log('1', plan);
  const finalAnswer = await engine.run(plan);
  console.log(finalAnswer);
  
}

main();