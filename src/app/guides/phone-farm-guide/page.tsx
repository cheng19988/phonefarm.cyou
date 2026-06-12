import { permanentRedirect } from "next/navigation";

/** Legacy URL — canonical guide content lives at /phone-farm */
export default function PhoneFarmGuidePage() {
  permanentRedirect("/phone-farm");
}
