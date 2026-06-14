import { ZhContentStub, zhStubMetadata } from "@/components/ZhContentStub";

export const metadata = zhStubMetadata({
  title: "手机农场部署流程",
  description:
    "从需求沟通到工厂生产、老化 QC、出口包装、远程配置与售后支持的手机农场六阶段部署流程。",
  path: "/deployment",
  keywords: ["手机农场部署", "phone farm deployment"],
});

export default function ZhDeploymentPage() {
  return (
    <ZhContentStub
      heading="手机农场部署流程"
      subtitle="六阶段：发现 → 报价 → 生产 → 出口 → 远程配置 → 售后"
      body="我们为海外 B2B 买家提供从 RFQ、形式发票到交付验收的完整流程。详见英文部署页时间表与检查清单。"
      enPath="/deployment"
      enLabel="查看英文部署页 →"
    />
  );
}
