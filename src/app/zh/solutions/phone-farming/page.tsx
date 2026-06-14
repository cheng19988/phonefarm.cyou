import { ZhContentStub, zhStubMetadata } from "@/components/ZhContentStub";

export const metadata = zhStubMetadata({
  title: "企业级手机农场解决方案",
  description:
    "面向企业 QA 实验室与设备农场的大规模 Android 主板机箱、机架扩展与远程运维解决方案。广州制造商。",
  path: "/solutions/phone-farming",
  keywords: ["企业手机农场", "phone farming solution", "手机农场解决方案"],
});

export default function ZhSolutionPage() {
  return (
    <ZhContentStub
      heading="企业级手机农场解决方案"
      subtitle="大规模真实设备实验室与机群运维"
      body="多机箱机架、混合品牌托盘、专用网络与远程运维支持。项目级 BOM 与 SLA 通过 RFQ 定制。"
      enPath="/solutions/phone-farming"
      enLabel="查看英文解决方案 →"
    />
  );
}
