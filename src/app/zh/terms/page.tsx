import { ZhContentStub, zhStubMetadata } from "@/components/ZhContentStub";

export const metadata = zhStubMetadata({
  title: "服务条款",
  description: "Cyou Phone Farm B2B 硬件销售、RFQ、形式发票与付款相关服务条款摘要。",
  path: "/terms",
});

export default function ZhTermsPage() {
  return (
    <ZhContentStub
      heading="服务条款"
      subtitle="B2B 硬件销售与 RFQ"
      body="完整条款请参阅英文版。批量订单以销售确认的形式发票与书面协议为准。"
      enPath="/terms"
      enLabel="English terms →"
    />
  );
}
