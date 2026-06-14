import { ZhContentStub, zhStubMetadata } from "@/components/ZhContentStub";

export const metadata = zhStubMetadata({
  title: "隐私政策",
  description: "Cyou Phone Farm 网站隐私政策 — 联系表单与 B2B 询价数据处理说明。",
  path: "/privacy",
});

export default function ZhPrivacyPage() {
  return (
    <ZhContentStub
      heading="隐私政策"
      subtitle="网站数据与联系信息"
      body="完整法律文本请参阅英文隐私政策页面。我们仅将询价表单信息用于 B2B 销售沟通。"
      enPath="/privacy"
      enLabel="English privacy policy →"
    />
  );
}
