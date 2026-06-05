export const HELP_EXPANDED: Record<string, string> = {
  "after-purchase-guide": `Instructions After Receiving Your Phone Farm

This guide covers the first operational steps after your Cyou Phone Farm chassis arrives from Guangzhou. It is written for enterprise QA teams, mobile app testing labs, and IT departments deploying remote device management at scale. Follow every section in order before you schedule production test runs or fleet-wide APK deployments.

Before You Start

Confirm that your receiving dock or lab has stable mains power rated for the PSU labels on each box. Cyou Phone Farm units ship with burn-in documentation; locate the serial sheet inside the packaging before you power on. Assign one control PC as the primary workstation and one backup PC if your deployment exceeds forty nodes. Download the latest mirror and group-control tools recommended in your purchase order confirmation. Verify that your network team has reserved DHCP space and documented VLAN plans if you ordered an Enterprise Deployment package. Do not connect all boxes simultaneously on the first day; staged rollout reduces troubleshooting noise and protects warranty evidence.

Required Equipment

You will need the Cyou Phone Farm box or rack with factory PSU and cabling, a Windows control PC with USB 3.0 ports or a dedicated USB controller card, powered USB hubs certified for continuous load, Ethernet cables if you plan LAN mirroring during week one, a label printer or asset tag system for node IDs, and the burn-in report PDF from Cyou support. Optional but recommended: a network switch with gigabit backplane, a cable tester, and a camera to photograph port layouts before you re-seat cables. Keep original packaging for RMA eligibility within the warranty window.

Step-by-step Instructions

1. Unbox each chassis on an ESD-safe bench. Compare the exterior serial label to the packing list and burn-in sheet. Photograph any transit damage and note it in your internal asset log before you apply power.

2. Place boxes with minimum clearance for airflow. Cyou Phone Farm racks expect front-to-back ventilation; do not stack consumer desk fans as a substitute for documented cooling clearance.

3. Connect one box to the control PC using a direct USB path first—avoid daisy-chaining on the initial detection pass. Use a powered hub only after the first node is recognized.

4. Apply mains power to a single box. Wait for boot indicators to stabilize per your model guide. On official Android builds, expect a longer first boot while system services initialize.

5. Launch device detection in your mirror tool. Confirm that the control PC lists exactly one new node with the serial that matches your burn-in sheet.

6. For official ROM tiers, complete ADB authorization when prompted. Place authorization files in the directory specified during Remote Control Configuration onboarding. Optimized ROM tiers from Cyou may skip this step; verify tier in the burn-in report.

7. Run a five-minute stability check: screen mirror refresh, rotation lock, and a simple tap script. Log pass or fail per node ID in your QA tracker.

8. Repeat steps 3 through 7 for each additional box, adding one unit at a time. After every fifth node, pause and verify hub temperature and voltage drop.

9. Create device groups that mirror your test plan—by app under test, OS branch, or regional proxy policy. Apply group labels before you invite additional operators to the control session.

10. Schedule a remote onboarding call with Cyou Phone Farm Guangzhou support if any node fails burn-in or if detection counts disagree with the packing list.

[Image placeholder: Unboxing layout with serial label and PSU rating callouts]

[Image placeholder: Single-box first USB connection diagram]

Common Problems

Packaging appears intact but a node never appears in detection. Often the control PC USB port shares bandwidth with a saturated controller; move to a dedicated card or rear motherboard port. Burn-in sheet lists a node as passed at factory yet mirror shows black screen—re-seat the internal USB bridge cable per rack service guide before opening a ticket. Multiple boxes power on but only one is visible: hub insufficient power or a reversed data-only cable on a charge-only lead. DHCP conflicts when you early-enable WiFi handoff: keep LAN mirroring on the same subnet as the control PC until network review is complete.

Troubleshooting Checklist

- Serial on chassis matches burn-in sheet and detection panel.
- PSU label voltage matches regional mains and breaker rating.
- USB cable is data-rated; hub is powered and not overheating.
- Only one new box added per detection cycle during rollout week.
- ADB authorization completed for official ROM tiers.
- Group labels applied before multi-operator access.
- Failed nodes photographed and isolated from production groups.
- Control PC clock and timezone correct for log correlation.

When to Contact Support

Contact Cyou Phone Farm support through Telegram or WhatsApp listed on your order when a node fails factory burn-in criteria, when serial counts do not match shipment documentation, when repeated USB re-seat does not restore detection after hub swap, or when you need a topology review before exceeding one rack on a single control PC. Include node serial, ROM tier, hub model, and photos of cabling. Enterprise customers with Deployment packages should request a network BOM review before connecting more than forty nodes to one subnet.

`,

  "usb-screen-projection": `USB Screen Projection Connection

USB screen projection is the default first-connection method for Cyou Phone Farm units in QA labs and enterprise remote device management environments. It offers the lowest latency mirror path and the most reliable authorization flow for official Android builds. This document explains how to connect factory boxes from Guangzhou over USB for app testing, scripted regression, and operator-led exploratory sessions.

Before You Start

Install the mirror and group-control suite version referenced in your onboarding email. Disable USB selective suspend on the control PC power plan—sleeping USB controllers drop active mirrors on large fleets. Close unrelated applications that enumerate USB devices, including some mobile backup tools and virtual machine hypervisors that grab controllers. Read the burn-in report to learn whether your shipment uses official ROM, which requires ADB file authorization, or optimized ROM, which may allow faster attach. Prepare a written port map before you connect more than sixteen cables; hunting ports later wastes shift time. Coordinate with facilities if your lab requires locked USB policies—document Cyou control PCs as approved test workstations. Brief operators that USB projection is the authoritative path for first authorization; LAN handoff comes only after this guide is satisfied.

Required Equipment

Cyou Phone Farm box with factory USB uplink, high-quality USB 3.0 data cables sized for your rack depth, powered USB hubs with per-port power budgeting suitable for continuous mirror load, a Windows control PC with available USB controllers, optional USB controller expansion card for deployments above thirty ports, and cable ties or rack cable combs for strain relief. Keep spare cables identical to the approved model in your BOM; mixed cable gauges cause voltage drop and intermittent disconnects during batch APK installs.

Step-by-step Instructions

1. Power off the farm box mains if your safety policy requires cold attach; otherwise connect USB first then mains per Cyou rack guide for your revision.

2. Run a USB cable from the box uplink port to a powered hub input, not a passive splitter. Passive splitters are not supported for mirror sessions.

3. Connect the hub uplink to the control PC using a port on a dedicated controller when available. Document port ID in your asset spreadsheet.

4. Apply mains power and wait for boot completion. Official builds may show a authorization prompt on first attach.

5. Open the mirror tool device panel. Select refresh or rescan. Confirm the node appears with expected serial and Android version.

6. For official ROM, follow Remote Control Configuration steps to place ADB keys. Re-scan after keys are installed. Optimized ROM boxes often attach without extra files—confirm in burn-in notes.

7. Start screen projection on the node. Verify frame rate is stable for sixty seconds while you open Settings and the target app under test.

8. Enable group control for the node only after single-device mirror is stable. Add the node to a QA group matching your sprint board.

9. When adding more boxes, attach one new USB path at a time and repeat detection. Cap simultaneous first-time authorizations to avoid dialog overlap on the control PC.

10. Export a connection log screenshot for your change-management ticket when USB projection is approved for production test windows.

[Image placeholder: USB connection diagram from farm box to powered hub to control PC]

[Image placeholder: Mirror tool device panel with serial highlighted]

Common Problems

Device flaps online and offline every few seconds: insufficient hub power or a failing cable. Mirror shows frozen frame while ADB still responds: restart projection service before you re-seat hardware. Authorization loop on official ROM: keys placed in wrong user profile directory on the control PC. PC detects a hub but zero phones: upstream port is charge-only or the hub is in a collapsed state—power-cycle hub with mains still on at the farm box. High CPU on control PC with few devices: reduce preview resolution in mirror settings for monitoring tiles, not for the active test node. Intermittent disconnect during batch file push: USB tree depth exceeded—reduce hops between box and host controller. New operators see duplicate device entries: stale ghost session from crashed mirror process—restart service and clear cached enumerations before retesting.

Troubleshooting Checklist

- USB selective suspend disabled on control PC.
- Data-rated cables; no passive splitters on mirror path.
- Powered hub below thermal warning threshold.
- Serial and Android version match burn-in sheet.
- ADB authorization completed for official ROM tier.
- One new box per detection cycle during initial wiring.
- Port map document updated for each physical attach.
- Spare cable swap tested before escalating to RMA.

When to Contact Support

Reach Cyou Phone Farm Guangzhou support when a node never authorizes after correct key placement, when factory burn-in passed but USB projection fails on three cable and hub combinations, when you plan to exceed sixty USB ports on one workstation and need controller BOM validation, or when mirror software version conflicts with your shipped ROM tier. Provide hub model, cable length, controller card SKU, and a short screen recording of the detection panel.

`,

  "lan-otg-connection": `LAN OTG Screen Projection

LAN OTG screen projection lets QA and enterprise mobility teams mirror Cyou Phone Farm devices over Ethernet or WiFi once TCP debugging is enabled on each node. This method reduces USB cable clutter, supports remote device management when operators work from a separate subnet with approved routing, and pairs with batch operations during regression suites. Use this guide after you understand USB-first stabilization for official ROM tiers.

Before You Start

Ensure the control PC and farm boxes share a single logical network during initial setup, typically the same router or VLAN with Layer-2 visibility. Document the IP subnet and reserve addresses if your IT policy prohibits dynamic DHCP for test infrastructure. Official Android builds from Cyou often require a one-time USB session to enable OTG TCP port 5555 before wireless or LAN scan succeeds. Optimized ROM tiers may ship with network mirroring pre-enabled; read the burn-in report before you skip USB steps. Disable client isolation on WiFi access points used for mirroring; isolation blocks station-to-station discovery. Confirm with security that mirror discovery traffic is permitted on the farm VLAN; blocking multicast or ADB ports produces empty scan results even when ICMP ping works. Schedule LAN rollout after business hours if the farm shares broadcast domain with corporate guest WiFi.

Required Equipment

Cyou Phone Farm chassis with active network interface, gigabit switch or router with sufficient DHCP pool, Ethernet drops or approved WiFi access points, control PC on the same subnet for discovery, USB cable for first-time OTG enablement on official ROM, mirror tool with LAN device scan and segment add features, and network diagram updated with farm rack locations. Enterprise deployments should use switches with storm control and documented port maps rather than consumer mesh WiFi.

Step-by-step Instructions

1. Complete USB detection for at least one node using the USB screen projection guide. Confirm mirror stability before you enable LAN mode.

2. On official ROM, run the OTG TCP 5555 shortcut or equivalent ADB command from your mirror tool while the USB session is active. Wait for confirmation that network debugging is listening.

3. Verify the node received an IP address via DHCP or static assignment. Ping the node from the control PC to confirm Layer-3 reachability.

4. Open the mirror tool LAN module. Choose Add LAN Device or segment scan per your software version.

5. Enter the subnet in CIDR notation if required, for example 192.168.10.0/24. Start scan during a maintenance window to avoid flooding shared office networks.

6. Match discovered devices to serial numbers by briefly highlighting each mirror tile and comparing serial overlays.

7. Add validated nodes to the same QA groups used during USB rollout. Keep group policy consistent so batch APK jobs target the correct fleet partition.

8. For multi-rack labs, repeat OTG enablement per box on official ROM before you rely on scan alone. Optimized ROM racks may allow batch enablement scripts—confirm with Cyou documentation for your tier.

9. After successful LAN attach, you may right-click a device and switch from USB to LAN/WiFi mode to free physical USB ports for additional first-time authorizations.

10. Log IP address, serial, and access point name in your configuration management database for audit trails.

[Image placeholder: LAN topology with router, switch, farm rack, and control PC]

[Image placeholder: Segment scan dialog with subnet field]

Common Problems

Scan returns zero devices while ping succeeds: mirror tool multicast blocked by firewall—allow the documented ports on the control PC. Devices appear with wrong serial mapping: duplicate IP from exhausted DHCP pool; expand pool and reserve control PC address. Frequent mirror drops on WiFi: too many concurrent mirrors per access point; cap per AP per Cyou guidance. Official ROM nodes vanish after reboot: OTG TCP not persisted—re-enable via USB after power events until your scripted startup policy is approved. Segment scan slow on /16 networks: narrow scan range to the farm VLAN only. Control PC on VPN splits subnets: disconnect VPN during discovery or use split-tunnel rules approved by IT. Switch port security rejects farm MACs: whitelist chassis OUIs or disable sticky MAC on lab ports.

Troubleshooting Checklist

- PC and farm on same subnet or routed with documented rules.
- Client isolation disabled on WiFi used for mirroring.
- OTG TCP 5555 enabled on official ROM after USB attach.
- DHCP pool sized for node count plus control PCs and switches.
- Serial verified after scan before group assignment.
- Firewall allows mirror tool discovery protocol.
- IP logged in CMDB with rack location.
- USB path still available for re-enable after firmware updates.

When to Contact Support

Contact Cyou Phone Farm support when official ROM devices refuse OTG enablement after correct USB authorization, when optimized ROM units lack network mirroring despite burn-in indicating enabled tier, when you need a VLAN design review for multi-site QA labs, or when scan storms trigger router CPU alerts on enterprise gear. Include subnet mask, AP model, ROM tier, and a list of serials that fail discovery while ping succeeds.

`,

  "otg-mode-connection-tutorial": `Tutorial: Connect Phone Farm in OTG Mode

OTG mode on Cyou Phone Farm devices exposes Android network debugging so mirror tools can attach over LAN or WiFi without a permanent USB cable. Enterprise app testing teams use OTG mode after initial USB stabilization to scale monitoring tiles across racks. Remote device management operators use it to reduce desk clutter while keeping session latency acceptable on gigabit LAN. This tutorial is sequential; do not skip USB verification on official ROM tiers.

Before You Start

Identify ROM tier for each rack using the Guangzhou burn-in report. Official builds require USB-first workflows; optimized builds may allow LAN-first in controlled lab VLANs only if your onboarding document explicitly permits it. Confirm that your mirror tool version includes OTG TCP 5555 shortcuts or scripted equivalents. Notify network operations before you enable debugging on more than twenty nodes in one scan window. Read the large farm network guide if you connect more than forty nodes to avoid DHCP and broadcast issues. Assign a single operator as OTG enablement lead during rollout week to keep logs consistent. Prepare a spreadsheet with columns for serial, ROM tier, OTG timestamp, IP, and handoff result. Enterprise change boards should treat OTG enablement as a configuration event, not a casual operator action.

Required Equipment

Cyou Phone Farm box, USB data cable for enablement session, control PC with mirror and ADB tooling, router or switch providing LAN addresses, optional WiFi access point with isolation disabled, burn-in report with ROM tier column, and internal checklist template for per-node OTG confirmation. Enterprise labs should provide a secondary control PC to validate discoveries independently.

Step-by-step Instructions

1. Connect the target box to the control PC via USB. Complete detection and projection per the USB screen projection guide.

2. Open the device context menu in the mirror tool. Locate Enable OTG, Network debugging, or TCP 5555 action—wording varies by suite version.

3. Execute the OTG enable action. On official ROM, accept the on-device debugging prompt if shown on the mirrored screen.

4. Open a terminal or built-in ADB console on the control PC. Run a status command to confirm that the device reports network debugging active when USB is still connected.

5. Note the device LAN IP from mirror overlay or ADB network props. Ping from control PC to confirm reachability.

6. Switch the mirror session to LAN mode using the handoff action if you need the USB port for another first-time authorization.

7. Disconnect USB data while keeping mains power on the farm box. Wait thirty seconds and refresh LAN device list.

8. Confirm projection continues with acceptable latency. Re-open the target test app to verify input injection still works for scripted QA.

9. Repeat steps 1 through 8 for the next official ROM node. Batch scripts may be used on optimized ROM only when Cyou support documents the command guardrails.

10. Record OTG status, IP, timestamp, and operator ID in your test log. Failed nodes return to USB-only queue for hardware inspection.

11. For racks entering production regression, add an automated pre-flight step that verifies OTG or USB attach before test suite execution begins.

12. Review weekly metrics: mean time to enable OTG, handoff failure rate, and count of nodes requiring USB re-auth after reboot.

[Image placeholder: OTG enable menu in mirror tool]

[Image placeholder: USB to LAN handoff sequence diagram]

Common Problems

OTG enable button greyed out: USB session not authorized on official ROM—complete key placement first. Debugging enables but IP is zero: DHCP exhausted or WiFi not associated—check link lights and pool size. Handoff succeeds then mirror black screens: firewall blocked ADB port on LAN—open documented TCP ports. Node reverts after reboot: expected on some official builds—automate re-enable in pre-test checklist. Multiple nodes show same IP: duplicate lease or rogue DHCP server on lab network—run isolated VLAN. Handoff works for one operator but not another: second PC lacks firewall rules or sits on guest VLAN—align Control Workstation policy. Scripted enablement partially succeeds: mixed ROM tiers in one rack—split groups before running batch commands.

Troubleshooting Checklist

- ROM tier confirmed from burn-in report.
- USB mirror stable before OTG enable.
- On-device debugging prompt accepted when shown.
- IP noted and ping successful from control PC.
- LAN mirror works after USB disconnect test.
- Input injection verified post-handoff.
- Per-node log entry completed.
- Optimized ROM batch scripts only if documented by Cyou.

When to Contact Support

Escalate to Cyou Phone Farm Guangzhou when official ROM nodes never show OTG enable after authorized USB session, when optimized ROM lacks documented batch enable despite sales confirmation, when repeated post-reboot failures threaten SLA on regression windows, or when you need scripted enablement reviewed for change control. Attach ROM build numbers, mirror tool version, and PCAP snippets only if your security policy permits. Enterprise customers may request a recorded OTG walkthrough during Starter or Studio Pro onboarding if your team trains new operators monthly.

`,

  "batch-apk-install": `Batch APK Installation

Batch APK installation lets QA engineers and mobile release managers deploy builds to many Cyou Phone Farm nodes in one controlled action. Use it for smoke tests, regression matrices, enterprise pilot rollouts, and staged beta distribution inside your private lab network. This guide assumes devices are grouped, mirrored, and authorized per USB and LAN connection documentation.

Before You Start

Test the APK on a single representative node before fleet push. Confirm CPU architecture, minimum SDK, signing certificate, and split APK requirements match the farm ROM tier. Verify storage headroom on sample devices using mirror file browsers or ADB shell df output. Align with change management: record version code, git hash, and target group names in your ticket. Ensure no concurrent firmware flash jobs overlap batch install windows. Read your mirror tool notes on whether installs run sequentially or parallel per host PC capability. Confirm enterprise MDM or security agents on the farm image permit sideload installs for your QA signing key. If the build under test requires backend feature flags, enable flags for the lab tenant before batch push to avoid false failure reports from the automation team.

Required Equipment

Signed APK or approved APK set including split bundles if applicable, control PC with group-control suite, Cyou Phone Farm nodes in Online state within target groups, USB or LAN mirror paths stable for the install duration, optional MDM or internal distribution manifest, and rollback APK version stored for emergency revert. Large enterprises should maintain a checksum file validated before each push. Provide a test account roster or SSO sandbox instructions if the app requires authenticated launch validation during smoke testing.

Step-by-step Instructions

1. Open the device manager and filter by group that represents your test cohort—for example Sprint 42 Android 14 matrix.

2. Select one canary device. Use single-device install to validate package compatibility and first-launch behavior.

3. Document canary results: launch success, critical path login, crash-free minutes, and logcat snippet if failures occur.

4. Clear failed canary issues before you proceed. Do not batch push a build that fails architecture or signature checks on one node.

5. Multi-select target devices using group checkboxes or one-click select on the left rail for fixed window layouts.

6. Open batch install from the group operations menu. Choose the APK file or drag the approved bundle into the dialog.

7. Confirm device count and version code in the summary modal. Mis-targeted groups are the primary source of production lab incidents.

8. Start installation. Monitor per-device status columns for Success, Failed, or Timeout states.

9. For failures, open detail panes to read incompatible split, insufficient storage, or install blocked by enterprise policy messages.

10. After completion, run a scripted launch or ping test across the group and export results CSV for your release dashboard.

11. Archive install logs with the release artifact in your internal repository for audit and rollback analysis.

12. If your pipeline supports it, trigger a smoke UI crawl on ten percent of successful nodes before marking the batch job complete.

[Image placeholder: Batch install dialog with device count summary]

[Image placeholder: Group selection rail with QA cohort highlighted]

Common Problems

Install fails on all nodes with signature error: wrong signing key versus installed profile—rebuild or use correct enterprise cert. Split APK missing config split: package only base APK—include all splits from build output. Timeouts on large groups: control PC disk or USB bandwidth saturated—batch in waves of twenty. App installs but does not launch headless: missing test account setup step—document in runbook not installer. Partial success in group: mixed ROM tiers in one group—separate groups by tier. Install hangs at zero percent: USB bandwidth saturated—pause other file transfers and retry in smaller waves. App version unchanged after success banner: package name collision with preloaded enterprise app—uninstall prior lab build on canary first.

Troubleshooting Checklist

- Canary install passed on representative node.
- Version code and git hash recorded in change ticket.
- Target group name double-checked before confirm.
- Storage headroom verified on lowest-capacity node sample.
- Split APK complete set selected if required.
- Install window clear of firmware flash jobs.
- Failure reasons exported for developer triage.
- Post-install launch script executed and logged.

When to Contact Support

Contact Cyou Phone Farm support when installs fail only on farm hardware but succeed on reference phones with identical APK, when mirror tool reports success but package absent after reboot across multiple nodes, when you need guidance on silent install policies for enterprise MDM coexistence, or when batch jobs stall above documented node limits on your control PC SKU. Provide APK version code, sample serials for pass and fail, and ROM tier list for the target group. Request a fleet install dry run review if you plan to push builds to more than one hundred nodes in a single change window.

`,

  "large-farm-network-deployment": `Recommended Network Plan for Large Phone Farms

Large Cyou Phone Farm deployments—forty nodes and beyond—require deliberate network architecture so QA automation, remote device management, and enterprise app testing stay stable under load. Consumer routers and mesh WiFi are insufficient for full-time mirroring across multiple racks. This plan aligns with Guangzhou factory guidance and Enterprise Deployment packages; adapt VLAN IDs and IP ranges to your corporate standards.

Before You Start

Inventory total node count, control PC count, mirror concurrency target, and per-site egress policy for app tests that require regional IP fidelity. Engage network operations early for switch port assignments and DHCP authority. Separate control traffic from general office WiFi to prevent broadcast storms during LAN scans. Document whether tests use USB-only phases, LAN OTG mirroring, or mixed handoff. Request a Cyou network BOM review if your purchase includes Enterprise Deployment hours. Map physical rack locations to switch port numbers before cables are dressed—retroactive labeling errors cause weeks of misrouted troubleshooting. Define recovery time objectives with QA leadership: how long can regression continue if one rack VLAN is offline during switch maintenance.

Required Equipment

Managed gigabit switches per rack with documented port maps, enterprise access points with adjustable client limits and isolation controls, router or firewall with expanded DHCP pools and optional VLAN routing, dedicated control PC workstations on wired Ethernet, UPS for switches and racks where power flicker is common, cable management with labeled Cat6 home runs, and logical network diagram maintained in your CMDB. Proxy or SD-WAN gear belongs in a documented egress layer—not ad hoc USB tethering.

Step-by-step Instructions

1. Split infrastructure into at least two VLANs: Farm Devices and Control Workstations. Keep Layer-2 discovery for mirror tools within the Farm VLAN unless your vendor documents routed discovery.

2. Size DHCP pools: assign one lease per node plus twenty percent headroom for replacements, plus static reservations for control PCs, switches, and AP management interfaces.

3. Dedicate one gigabit switch per rack or every forty ports, whichever is smaller. Uplink switches with LAG or single 10G if you aggregate multiple racks.

4. Place access points with ceiling mount line of sight to racks. Cap concurrent WiFi mirrors per AP according to mirror tool guidance—typically five to ten for consumer-grade APs, higher only with enterprise models Cyou validates.

5. Reserve IP segments for staging racks versus production regression racks so APK batch jobs do not cross-contaminate groups.

6. Enable DHCP snooping and storm control on managed switches to protect against mis-cabled loops during rack moves.

7. Configure DNS and NTP for farm VLAN so TLS-heavy app tests do not fail certificate validation due to clock skew.

8. Document proxy assignment per group if your test plan requires unique egress IP; align with single-device single-IP policies documented in the help center.

9. Schedule maintenance windows for firmware and ROM updates rack-by-rack, never site-wide at once.

10. Run an annual tabletop exercise with network and QA leads to rehearse failover if a core switch fails during release week.

11. Label patch panels with farm VLAN ID and rack ID so contractors do not cross-connect staging and production during moves.

12. Export switch configs after each change window and store alongside Cyou rack serial manifests for compliance audits.

[Image placeholder: Multi-rack VLAN diagram with Farm and Control segments]

[Image placeholder: AP placement overhead view for motherboard wall]

Common Problems

DHCP exhaustion after scale-up: pool left at consumer defaults—expand before adding the fortieth node. Broadcast storm during segment scan: scan bounded /24 instead of entire corporate /16. WiFi mirror flapping: too many devices per AP or power save enabled on test SSID—disable client power save for lab SSID. Cross-VLAN discovery fails: mirror tool expects Layer-2 adjacency—add controlled relay or keep discovery VLAN flat. Asymmetric routing breaks proxy tests: document hairpin rules on firewall. Control PC on WiFi while farm on wired VLAN: discovery jitter under load—wire all control workstations. Spanning tree reconvergence during power blip: enable portfast only on end-device ports per vendor best practice, never on inter-switch trunks without design review.

Troubleshooting Checklist

- VLAN diagram current in CMDB.
- DHCP pool utilization below eighty percent at peak.
- One gigabit switch boundary per rack documented.
- WiFi mirror count per AP within approved cap.
- Control PCs on wired Ethernet to Control VLAN.
- NTP synchronized on nodes and control PCs.
- Proxy map aligned with device groups.
- Staging and production IP ranges non-overlapping.
- Storm control enabled on managed switches.
- Enterprise BOM review completed with Cyou if applicable.

When to Contact Support

Engage Cyou Phone Farm Guangzhou for network BOM review before crossing forty nodes on one subnet, when mirror discovery fails only on enterprise gear after IT applies security ACLs, when you need recommended AP models for your ceiling height and rack density, or when planning multi-site replication of the same VLAN policy. Provide node count, switch models, DHCP pool sizes, and a sanitized network diagram. Enterprise Deployment customers should schedule a live working session before production cutover weekend.

`,
};
