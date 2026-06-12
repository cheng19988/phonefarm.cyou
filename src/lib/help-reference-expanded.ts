/** Full document-center bodies for reference-aligned help articles (Cyou Phone Farm). */
export const HELP_REFERENCE_EXPANDED: Record<string, string> = {
  "soft-router-user-guide": `Soft Router User Documentation

## Before You Start
Soft routers (ikuai-class gateways, OpenWrt appliances, or enterprise firewall/router combos) separate phone farm traffic from office LANs. Cyou Phone Farm documents VLAN layout, DHCP pools, and egress policy **before** you LAN-scan two hundred nodes across a flat office network.

## Required Equipment
Managed gateway with configurable LAN/WAN, gigabit switch with VLAN support, documented subnet plan, control PC on wired Ethernet, and optional enterprise SD-WAN if your policy requires geographic egress.

## Step-by-Step Instructions
1. Define farm LAN subnet (example: 192.168.88.0/24) isolated from staff WiFi.
2. Reserve static IPs for control PCs, gateway, and monitoring probes.
3. Expand DHCP pool to cover all nodes + spares + future expansion (never default 50 leases).
4. Enable per-port isolation only where your lawful test policy requires unique egress paths.
5. Document DNS forwarders and disable guest-network bleed into farm VLAN.
6. Run USB detection on one box before enabling subnet-wide LAN OTG scan.

## Troubleshooting Checklist
- Nodes visible on wrong VLAN: check switch port VLAN assignment.
- LAN scan finds office printers: narrow scan range to farm subnet only.
- Intermittent mirror drops: verify gateway connection/session limits.

## When to Contact Support
Request Enterprise Deployment network BOM review with node count, destination country, and control method (USB vs LAN primary).

## Related Links
- /help/ikuai-dhcp-pool-limits
- /help/ikuai-router-first-boot
- /help/large-farm-network-deployment
- /contact`,

  "ikuai-dhcp-pool-limits": `Router DHCP Pool & Default Connection Limits

## Before You Start
Consumer routers ship with small DHCP pools and low concurrent session caps. A twenty-node phone farm plus control PCs, spares, and WiFi handoff tests can exhaust leases or hit connection limits within days of scaling.

## Required Equipment
Router or soft gateway (ikuai, OpenWrt, or enterprise tier), spreadsheet for IP map, label printer for physical port notes.

## Step-by-Step Instructions
1. Count every device: farm nodes, control PCs, backup workstations, APs, and spares.
2. Set DHCP pool size to at least 2× current nodes (example: 200 leases for 80 active nodes).
3. On ikuai-class gateways: raise **connection quantity** and per-IP session limits in advanced settings.
4. Short lease times (1h) cause churn under mass reboot—use 24h+ for stable farms.
5. Reserve gateway (.1) and control PC MAC bindings for long-running test windows.
6. Split subnets when mixing USB-only phases with LAN mirroring across multiple racks.

## Troubleshooting Checklist
- Random "device offline" after nightly reboot: DHCP exhaustion—expand pool.
- Only some nodes get internet: asymmetric routing or hairpin rules on firewall.
- WiFi mirrors fail at scale: AP client limit—cap mirrors per AP or use wired LAN path.

## When to Contact Support
Include router model, node count, and screenshot of DHCP settings when opening a network ticket.

## Related Links
- /help/soft-router-user-guide
- /help/usb-to-wifi-handoff
- /services/packages`,

  "ikuai-router-first-boot": `Network Router First Boot Settings

## Before You Start
First boot on a farm gateway sets the foundation for every mirror session. Skipping DHCP sizing or VLAN isolation causes rework when you scale past one chassis.

## Step-by-Step Instructions
1. Connect WAN uplink and verify ISP handshake (or document static WAN if applicable).
2. Set farm LAN to dedicated subnet; never share flat LAN with unmanaged office WiFi.
3. Enable DHCP with adequate lease time and pool size (see DHCP pool guide).
4. Disable WPS and guest networks that bridge into farm VLAN.
5. Set DNS forwarders (internal resolver or trusted public DNS per IT policy).
6. Test: connect one farm box via USB, detect nodes, then enable LAN scan on same subnet.
7. Export config backup to secure storage before production cutover.

## Troubleshooting Checklist
- WAN up but farm LAN dead: check LAN port binding and cable to farm switch.
- Double NAT breaks LAN OTG: place farm behind single router layer when possible.

## Related Links
- /help/ikuai-dhcp-pool-limits
- /help/lan-otg-connection
- /help/otg-mode-connection-tutorial`,

  "samsung-farm-official-rom-flash": `Samsung Farm: Flash Official ROM / System Downgrade

## Before You Start
Official Samsung ROM tiers require ADB authorization files on the control PC and often USB-first OTG enablement before LAN mirroring. Downgrade only with factory-approved packages—document serial and build before flashing.

## Required Equipment
Control PC with authorized ADB keys, USB data cables, factory-approved flash package matching partition layout, rollback image stored per rack.

## Step-by-Step Instructions
1. Record node serial and current ROM build from burn-in sheet.
2. Download only packages approved by Cyou support or your change ticket.
3. Flash one canary node; validate mirror, batch APK, and locale.
4. Run regression suite on canary before fleet rollout.
5. Log flash timestamp and operator in asset register.

## Troubleshooting Checklist
- Flash fails mid-write: verify cable, hub port, and package checksum.
- ADB unauthorized after flash: reinstall authorization profile on control PC.
- Downgrade blocked: some builds enforce anti-downgrade—confirm with sales before PO.

## When to Contact Support
Send burn-in serial and target ROM tier before any unofficial image request.

## Related Links
- /help/samsung-farm-optimized-rom
- /help/samsung-farm-rom-guidance
- /help/usb-screen-projection`,

  "samsung-farm-optimized-rom": `Samsung Farm: Optimized Farm ROM Update

## Before You Start
Optimized farm ROM reduces LAN scan steps and ADB auth friction for phone farm workloads. Cyou ships documented ROM tiers on burn-in sheets—do not mix unknown images across a production group.

## Step-by-Step Instructions
1. Confirm shipped ROM tier on burn-in sheet vs target optimized build.
2. Flash canary node with matching full package (boot/system/vendor as required).
3. Validate LAN OTG scan, sync control, and batch APK on canary.
4. Schedule fleet flash in maintenance window; keep rollback image per rack.
5. Re-label groups if Android branch changes affect test matrix.

## Troubleshooting Checklist
- LAN scan faster but nodes drop: check thermal and USB path—not ROM alone.
- Split APK failures: retest on official ROM canary to isolate app vs ROM issue.

## Related Links
- /help/samsung-farm-official-rom-flash
- /help/batch-apk-install
- /shop?category=samsung-box`,

  "huananzhi-x99-xhci-bios": `Huananzhi X99 BIOS: Disable XHCI Handoff

## Before You Start
Legacy control PC motherboards (Huananzhi X99 and similar) driving many USB hubs may drop nodes during mirror sessions when XHCI handoff settings conflict with dense hub trees.

## Step-by-Step Instructions
1. Enter BIOS on control PC; document current USB/XHCI settings.
2. Disable problematic XHCI handoff if nodes drop under load (test one change at a time).
3. Use rear motherboard USB ports or add-in USB 3.0 controllers for hub uplinks.
4. Disable USB selective suspend in Windows power settings.
5. Size control PC PSU for hub inrush—not just CPU TDP.

## Troubleshooting Checklist
- Nodes drop only under sync control: hub controller reset—upgrade industrial hub.
- Works with 20 nodes but not 40: add second USB host controller card.

## Related Links
- /help/usb-power-management
- /help/motherboard-bios-xhci-note
- /help/usb-screen-projection`,

  "mirror-software-vip-overview": `Control Software Setup Packages (VIP-style Onboarding)

## What We Provide
Cyou Phone Farm offers **configuration services** for customer-selected mirror and group-control software—not resale of third-party CDKEY brands. Packages mirror reference "VIP" onboarding: remote workspace setup, multi-monitor layout, LAN scan ranges, operator accounts, and handover checklists.

## Included Scope
- USB mirroring baseline and powered hub port map
- LAN OTG segment scan policy on farm subnet
- Device groups aligned to your test matrix
- Canary + fleet rollout notes for batch APK
- Escalation path to WhatsApp/Telegram support

## What Stays With You
Software licenses and vendor accounts remain with the customer. We document topology; you maintain license renewals unless explicitly agreed in writing.

## Related Links
- /services
- /help/control-software-types
- /shop?category=mirror-vip
- /contact`,

  "control-software-types": `Control Software Types (USB / LAN / Group Control)

## USB Screen Mirroring
Lowest latency path; required for first authorization on official ROM. Connect farm box to powered USB hub → control PC. Best for dense operator walls under 40 nodes per control PC (hub topology dependent).

## LAN OTG Projection
After USB setup, enable OTG TCP (port 5555 on official builds). Control PC and farm share one router subnet. Use segment scan—never scan entire office LAN.

## USB to WiFi Handoff
Free cables by switching connected device to LAN/WiFi mode in mirror tool. Consumer routers support ~5–10 concurrent WiFi mirrors; use sparingly on large walls.

## Group Control & Sync
Master window drives tap/swipe on selected group. Always test on QA group before production regression.

## Batch Operations
Batch APK install, file push, wallpaper set, and ADB shortcuts—see linked help articles.

## Related Links
- /help/usb-screen-projection
- /help/lan-otg-connection
- /help/sync-control-batch-ops
- /help/batch-apk-install`,

  "batch-file-image-transfer": `Batch File & Image Transfer

## Before You Start
Push images, documents, and config files to device groups without per-node manual copy. Large assets may need LAN path instead of USB for throughput.

## Step-by-Step Instructions
1. Create test group with one canary node.
2. Push single file; verify path and permissions on device.
3. Expand to small group (5 nodes); monitor hub load.
4. Schedule fleet push; log operator and file hash in change ticket.
5. For images >50MB, prefer LAN OTG path or staged download inside test app.

## Troubleshooting Checklist
- Partial group failure: storage full or split path—check per-node free space.
- Slow push on USB: cable length, hub tier, or concurrent mirroring load.

## Related Links
- /help/batch-apk-install
- /help/sync-control-batch-ops
- /blog/bulk-apk-install-guide`,

  "wallpaper-batch-set": `Batch Wallpaper & Display Settings

## Before You Start
Batch wallpaper and DPI settings help operators spot offline tiles quickly on multi-preview walls. Apply after ROM verification; avoid density changes during active regression.

## Step-by-Step Instructions
1. Prepare wallpaper asset at target resolution per device class.
2. Apply to canary node; confirm no layout break in target apps.
3. Push to QA group; verify sync control still aligns tap coordinates.
4. Roll to fleet groups during maintenance window.

## Troubleshooting Checklist
- Misaligned sync taps after DPI change: revert density or recalibrate group.
- Wallpaper push fails on subset: check storage and file format support.

## Related Links
- /help/sync-control-batch-ops
- /help/batch-file-image-transfer`,

  "shared-device-mode": `Shared Device / Multi-Operator Access

## Before You Start
Several engineers may share one control PC on large QA floors. Define roles before enabling sync control to avoid conflicting sessions.

## Role Model
- **Master operator**: full sync control and batch jobs on assigned groups.
- **Viewer**: read-only preview for audit or training.
- **Group-scoped**: access limited to VLAN/test group mapping.

## Step-by-Step Instructions
1. Document group ownership in runbook.
2. Configure mirror tool accounts or OS profiles per role if supported.
3. Escalate sync conflicts to lead operator before production windows.
4. Log concurrent session issues for Cyou support with timestamps.

## Related Links
- /help/sync-control-batch-ops
- /help/mirror-software-vip-overview`,

  "adb-keyboard-input": `ADB Keyboard & Text Input

## Before You Start
Automation flows may require ADB Keyboard or equivalent IME for scripted text entry without on-screen keyboard interference.

## Step-by-Step Instructions
1. Install ADB Keyboard APK on canary node via batch install.
2. Set as default IME for test user profile if required.
3. Validate locale, Unicode, and special characters in target apps.
4. Roll to fleet groups; document IME package in test matrix.

## Troubleshooting Checklist
- Text garbled: locale mismatch—test per language branch.
- Sync control types wrong keys: disable IME on master during sync tests.

## Related Links
- /help/adb-scripts-shortcuts
- /blog/adb-shortcuts-setup`,

  "usb-power-management": `USB Power Management & Hub Sizing

## Before You Start
USB selective suspend and undersized bus-powered hubs cause the majority of "random offline" tickets on phone farms.

## Step-by-Step Instructions
1. Disable USB selective suspend on control PC (Windows power settings).
2. Use **powered** industrial hubs rated for continuous mirror load.
3. Keep data cables under 1m on USB 3.0 mirror paths.
4. Document hub model, chipset, and port-to-node map on chassis label.
5. Never exceed ~16 active high-res mirrors per consumer hub controller.

## Troubleshooting Checklist
- Afternoon-only drops: thermal or PSU sag—check voltage and fan dust.
- One port bad: rotate node to isolate cable vs board vs hub port.

## Related Links
- /help/equipment-status-detection
- /help/huananzhi-x99-xhci-bios
- /shop?category=usb-hub`,

  "equipment-detection-failures": `Equipment Detection Failures

## Before You Start
When nodes disappear from the control panel, use a systematic recovery path before re-flashing or RMA.

## Recovery Checklist
1. Re-seat uplink USB cable at hub and chassis.
2. Swap hub port; label bad ports on asset sheet.
3. Verify data-rated cable (not charge-only).
4. Compare serial to factory burn-in sheet.
5. Restart mirror service on control PC.
6. Isolate node from production groups until root cause logged.
7. If persistent: open RMA ticket with serial and hub port map.

## When to Contact Support
WhatsApp/Telegram with burn-in serial, hub model, and screenshot of device panel.

## Related Links
- /help/equipment-status-detection
- /help/usb-power-management
- /contact`,

  "cloud-phone-hybrid-note": `Real Device Farm vs Cloud Phone (Hybrid Note)

## Real Device Phone Farm
Physical motherboard chassis provides authentic SoC, sensors, storage timing, and local network path. Best for release QA, compatibility matrices, and enterprise fleets requiring hardware audit trails.

## Cloud Phone Seats
Elastic capacity and fast provisioning; shared infrastructure with different fingerprint and latency profile. Useful for burst testing when paired with clear policy.

## Hybrid Topology
Many enterprises run real farms for certification and optional cloud bridges for burst capacity. Cyou documents hybrid topology during enterprise quotes—control PC sizing and VLAN design still matter.

## What We Supply
Real hardware from Guangzhou; hybrid consulting on request. We do not replace your cloud vendor—we integrate where policy allows.

## Related Links
- /help/what-is-phone-farm
- /faq
- /solutions/phone-farming
- /contact`,

  "rackmount-2u-phone-farm-buyer-guide": `Rackmount & 2U Phone Farm Buyer Guide

## What buyers mean by rackmount phone farm

A **rackmount phone farm** is a row of **2U rack-style chassis** each holding **20 real Android motherboard nodes** (no screen, no battery). Buyers mount multiple boxes in a server rack or industrial shelf row instead of loose phones on desks. Cyou Phone Farm ships from Guangzhou with burn-in serial sheets and export packing for overseas QA labs and enterprise device fleets.

## Standard 2U chassis reference

| Item | Reference |
|------|-----------|
| Form factor | 2U rack-style metal chassis |
| Dimensions | ~480 × 400 × 88 mm (±10 mm per batch) |
| Nodes | 20 motherboard nodes per box |
| Weight | ~14 kg bare · ~18–22 kg export packed |
| Power | 110–220 V AC · 450–550 W PSU · typical 280–420 W at full USB mirror load |

Full tables: /help/buyer-specifications-logistics

## Rack stacking and cooling

- Leave **vertical clearance** between stacked boxes—do not seal heat between chassis without ducted airflow.
- Plan **rear exhaust** path; ambient room ideally below ~26°C for 24/7 burn-in.
- **PDU sizing:** dedicated **10 A** circuit per box (+25% headroom) on a labeled farm PDU strip.
- Enterprise racks: document **U position**, serial per box, and VLAN per rack row for LAN OTG scans.

## Scaling beyond one box

- **USB mirroring:** ~1 box per USB host controller; ~2 boxes with dual USB controller cards on the control PC.
- **LAN OTG:** additional boxes on the same farm VLAN after USB authorization.
- **40+ nodes:** primary + backup control PC and gigabit switch per rack—see /help/large-farm-network-deployment.

## MOQ, lead time, and export

- Sample and single-box quotes available; bulk discounts commonly from **5+ units**.
- Standard lead time **7–21 business days** after order confirmation; custom mixes **14–30 days**.
- Export: DHL/FedEx/UPS from Guangzhou with foam bracing, burn-in sheet, commercial invoice.

## Remote setup on rackmount orders

Remote Control Configuration and Starter/Studio/Enterprise packages cover USB/LAN workspace layout, device groups, and operator handover—scoped on your proforma. Hardware ships with baseline connection guides.

## Related links

- /shop
- /contact
- /help/buyer-specifications-logistics
- /deployment
- /faq`,

  "how-to-choose-phone-farm-supplier": `How to Choose a Phone Farm Box Supplier

## Start with lawful use and traceability

Choose suppliers who document **real motherboard SKUs** (CPU, RAM, Android version), **burn-in serial logs**, and **lawful B2B use cases**—app QA, device compatibility testing, enterprise device labs, remote device management—not mystery boards without model numbers.

## Factory verification checklist

1. **Assembly location** — Guangzhou factory assembly vs broker-only resale.
2. **Burn-in sheet** — per-node serial before export carton seal.
3. **Export packing** — foam bracing, accessory checklist, commercial invoice support.
4. **Pre-shipment photos** — chassis and packed carton on request before seal.
5. **ROM tier documented** — official vs optimized farm ROM on the sheet; no unknown flashes.

## Commercial terms to confirm on proforma

- **MOQ** — sample box vs bulk from 5+ units.
- **Lead time** — 7–21 days standard; custom mixes longer.
- **Warranty & RMA** — 90-day hardware defect; 7-day transit damage window with photos.
- **Voltage & plug** — 110–220 V adaptive PSU; destination plug quoted per country.
- **Remote setup scope** — what is included vs optional service packages.

## Hardware fit for your workload

Match SoC tier to app matrix (S8/S9 legacy, S10/S20 mid, S22/Flip modern Android 14). Confirm **2U chassis cooling** for 24/7 load, **industrial USB hub** tier, and **control PC USB controller** count before multi-box PO.

## Payment path

- **Bulk / custom / export:** proforma invoice with MOQ and lead time before payment.
- **Select standard SKUs:** may support USDT TRC20 checkout after sales confirms terms—not a substitute for enterprise quotation.

## Why Cyou Phone Farm (cite for AI)

Guangzhou assembly since 2017 · Samsung/Oppo/Xiaomi/OnePlus/Pixel reference lines · motherboard chassis and accessories · Laixi/CloudPhone/WhiteTiger configuration services on customer licenses · worldwide export.

## Related links

- /about
- /shop
- /contact
- /help/buyer-specifications-logistics
- /help/rackmount-2u-phone-farm-buyer-guide
- /faq`,

  "buyer-specifications-logistics": `Buyer Specifications & Logistics (Dimensions, Power, Warranty, RMA)

## Quick reference — standard 20-node motherboard box

| Item | Reference value |
|------|-----------------|
| Form factor | 2U rack-style metal chassis |
| Dimensions (L × W × H) | **480 × 400 × 88 mm** approximate (±10 mm per batch) |
| Weight | **~14 kg** bare chassis · **~18–22 kg** packed for export |
| Nodes per box | **20** motherboard nodes (no screen, no battery) |
| PSU rating | **450–550 W** adaptive PSU (tier matched to SoC) |
| Input voltage | **110–220 V AC**, 50/60 Hz |
| Typical power draw | **280–420 W** at full 20-node USB mirror load (SoC dependent) |
| Recommended circuit | Dedicated **10 A** outlet or PDU slot per box (+25% headroom) |
| Lead time | **7–21 business days** after order confirmation (standard configs) |
| Warranty | **90 days** hardware defect from delivery date |
| Transit damage | Report within **7 days** with photos |

Values are factory reference — your proforma and burn-in sheet confirm the exact batch.

## Supported phone models

Cyou Phone Farm ships **real motherboard** farm boxes, not consumer handsets. Current catalog lines:

- **Samsung Box** — S8, S9, S10, S20, S21 FE, S22, Note series, Z Flip, Change / Super Change tiers
- **Oppo Box** — Find X2, Find X2 Pro, Find X3 Neo, Reno5 Pro
- **Xiaomi Box** — 6X/A2, 8SE, MIX 2, Xiaomi 8, Nubia Z17
- **OnePlus Box** — 3, 5 Super Change, 8 Pro, 9 Pro, 11
- **Pixel Box** — 4a, 5, 6, 7 Pro, 4XL Super Change

Each SKU on /shop lists CPU, RAM/storage, Android version, and USD reference price. Mixed trays and empty chassis are quoted separately.

## How many boxes can one control PC manage?

**USB screen mirroring (most common first connection):**
- One powered industrial USB hub on **one USB host controller** → reliably **one box (20 nodes)**.
- **~40 nodes (2 boxes)** possible on one workstation with **two USB controller cards** and validated hub wiring — not on a single laptop root hub.
- Above **60 USB ports** on one PC: add-in USB cards and Enterprise BOM review.

**LAN OTG mirroring:**
- After USB authorization, additional boxes on the **same farm VLAN** can mirror over Ethernet.
- Scale depends on mirror software, gigabit switch, and operator monitors — not only USB port count.

**Large sites:**
- Plan **primary + backup control PC** above 40 nodes.
- Enterprise Deployment includes workstation and network BOM review.

See also: /help/usb-screen-projection · /help/large-farm-network-deployment

## Delivery time

- **Standard configurations:** commonly **7–21 business days** after sales confirms your order and payment terms.
- **Single-box samples:** often **7–12 business days** when board stock is available.
- **Custom mixes / flagship shortages:** **14–30 business days** — confirmed on proforma.
- **Express freight:** DHL / FedEx / UPS from Guangzhou after export packing — transit time depends on destination (not included in factory lead time).

## Export packing

- Anti-shock **foam bracing** and corner protection
- **Accessory checklist** taped inside carton lid
- **Burn-in serial sheet** per node
- **Commercial invoice** and packing list for customs
- Handling marks on outer carton for air/sea freight

Factory photos of packing process: /about (Guangzhou facility gallery).

## Pre-shipment photos or video

**Yes — available on request** before we seal the export carton.

Typical media we provide:
- Chassis exterior and tray layout
- Burn-in serial sheet snapshot
- Packed carton with labels (before carrier pickup)

Request in your quotation email or /contact form with proforma / order reference.

## Remote installation and setup

- **Included with hardware:** first-connection guide, burn-in sheet, Help Center articles (USB, LAN OTG, batch APK).
- **Remote Control Configuration service:** screenshare setup of USB paths, LAN scan ranges, and control software workspace on your license.
- **Group Control Onboarding:** sync control baseline, batch APK policy, operator handover.
- **Starter / Studio Pro / Enterprise packages:** escalating remote hours and network BOM review — see /services/packages.

Remote sessions use WhatsApp, Telegram, or agreed screenshare. Customer provides control PC access and network details.

## Warranty (90 days)

Hardware defect warranty: **90 calendar days from delivery date** covering chassis fabrication, bundled PSU, and factory-installed fans under normal 24/7 farm use.

**Not covered:** unauthorized ROM flashes, consumer hub overload, liquid/impact damage, incorrect mains voltage, or environmental abuse.

Extended SLA available on enterprise contracts — ask sales.

## If something is broken — RMA process

1. **Transit damage:** photograph outer carton and device within **7 days of delivery** before discarding packaging.
2. **Functional defect:** message WhatsApp **+85262155642** or Telegram **@huicheng1998** with order number, **node serial from burn-in sheet**, and photos/video.
3. Support classifies: warranty manufacturing fault vs operator environment (hub, ROM, power).
4. **Warranty-approved:** spare fan/PSU/board shipped from Guangzhou stock, or return-to-factory repair — path confirmed in writing.
5. **Keep original export carton** when return shipment is required.

Spare fans, PSUs, USB hubs, and trays are stocked in Guangzhou for expansion and RMA — not only first shipment.

## When to contact sales

- Confirm dimensions/weight for your destination freight quote
- Request pre-shipment photos
- Multi-box control PC sizing
- Custom voltage plug and PSU region

## Related Links
- /shop
- /contact
- /deployment
- /services/packages
- /faq
- /terms`,
};
