import { ZhContentStub, zhStubMetadata } from "@/components/ZhContentStub";

export const metadata = zhStubMetadata({
  title: "手机农场服务套餐",
  description: "手机农场入门、工作室与企业级配置套餐 — 远程控制、群控与部署支持。广州工厂 B2B。",
  path: "/services/packages",
  keywords: ["手机农场套餐", "phone farm package"],
});

export default function ZhPackagesPage() {
  return (
    <ZhContentStub
      heading="手机农场服务套餐"
      subtitle="入门 · 工作室 · 企业级"
      body="套餐包含远程配置时长、连线验收与首周运维支持。具体 USD 参考价与定制范围请询价。"
      enPath="/services/packages"
      enLabel="查看英文套餐页 →"
    />
  );
}
