import { ZhContentStub, zhStubMetadata } from "@/components/ZhContentStub";

export const metadata = zhStubMetadata({
  title: "手机农场帮助中心",
  description:
    "手机农场机箱连接、USB/LAN 投屏、收货后运维、形式发票与 USDT 订购等帮助文档入口。广州工厂 B2B 支持。",
  path: "/help",
  keywords: ["手机农场帮助", "手机农场教程", "phone farm help"],
});

export default function ZhHelpPage() {
  return (
    <ZhContentStub
      heading="手机农场帮助中心"
      subtitle="连接、配置、物流与付款指南"
      body="详细操作文章目前以英文版为主（含截图与逐步说明）。中文销售支持可通过表单或 WhatsApp 获取一对一指导。"
      enPath="/help"
      enLabel="查看英文帮助中心 →"
    />
  );
}
