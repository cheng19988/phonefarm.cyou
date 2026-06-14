import { ZhContentStub, zhStubMetadata } from "@/components/ZhContentStub";

export const metadata = zhStubMetadata({
  title: "手机农场配置服务 — 远程投屏与群控",
  description:
    "广州工厂提供的手机农场远程控制配置、群控系统、部署 commissioning 与工程师远程安装服务。",
  path: "/services",
  keywords: ["手机农场配置", "群控配置", "远程投屏服务"],
});

export default function ZhServicesPage() {
  return (
    <ZhContentStub
      heading="手机农场配置服务"
      subtitle="远程投屏 · 群控系统 · 部署 commissioning"
      body="我们在交付时配置 USB 投屏、LAN OTG 或 WiFi 切换，并可按套餐提供屏幕共享安装。服务范围与价格请通过 RFQ 确认。"
      enPath="/services"
      enLabel="查看英文服务详情 →"
    />
  );
}
