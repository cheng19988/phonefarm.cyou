/** Expanded bodies for help articles not yet in help-expanded.ts */
export const HELP_SUPPLEMENT: Record<string, string> = {
  "what-is-phone-farm": `What is a Phone Farm?

## Before You Start
A phone farm is not a pile of consumer phones on a desk. It is a factory-built chassis of real Android motherboards—without screens or batteries—sharing power, cooling, and a centralized USB or LAN control path. Cyou Phone Farm ships these boxes from Guangzhou for app QA testing, mobile device labs, and enterprise device fleet management.

## How It Differs from Emulators and Cloud Seats
Physical boards preserve SoC behavior, storage timing, and sensor paths that emulators approximate poorly. Cloud phone seats are useful for early experiments but add recurring cost and shared infrastructure. A real-device lab gives you hardware you can audit, label, and run long-duration stability tests on under your own network policy.

## Typical Configuration
A standard box holds twenty motherboard nodes in a 2U-style metal frame with adaptive PSU, quad-fan cooling, and documented USB port map. Control software on a dedicated PC handles mirroring, grouping, and batch APK deployment for internal testing.

## Troubleshooting Checklist
- Nodes not detected: re-seat USB, confirm powered hub, check ADB authorization on official ROM tiers.
- Uneven performance: compare thermal layout and fan dust; bottom slots may run warmer.
- Mixed Android versions in one group: separate groups by ROM branch before fleet operations.

## When to Contact Support
Message WhatsApp or Telegram with your node count, control method, and burn-in sheet serial if a node fails out of the box.

## Related Links
- /help/after-purchase-guide
- /help/usb-screen-projection
- /contact`,

  "single-device-single-ip": `Network Segmentation for Device Labs

## Before You Start
Enterprise test plans often require clear network boundaries between device groups. Document your lawful connectivity policy before scaling past one chassis. Cyou Phone Farm supplies hardware and topology guidance; your IT team owns routing contracts and compliance.

## Required Equipment
Managed router or firewall with VLAN support, documented DHCP pools, optional enterprise SD-WAN appliance, gigabit switch with port map, and control PC on wired Ethernet.

## Step-by-Step Instructions
1. Define device groups that mirror your test matrix (app branch, region, or build channel).
2. Assign each group a VLAN or documented routing policy approved by your security team.
3. Label nodes physically and in control software to match the policy map.
4. Run connectivity validation from each group before scheduling overnight QA.
5. Store the topology diagram in your CMDB for auditor review.

## Troubleshooting Checklist
- Cross-VLAN discovery fails: mirror tools may need Layer-2 adjacency—add a controlled relay or keep discovery VLAN flat.
- DHCP exhaustion: expand pools before adding the fortieth node.
- Asymmetric routing breaks lab tests: document hairpin rules on the firewall.

## When to Contact Support
Request a topology review from sales before multi-box expansion. Include destination country and target node count.

## Related Links
- /help/large-farm-network-deployment
- /help/router-dhcp-pool-limits`,

  "device-connection-video-guide": `Device Connection Video Guide

## Before You Start
First connection is easiest with one box, one control PC, and a powered USB hub on a dedicated host controller. Complete unboxing inspection before applying power to the full chassis.

## Required Equipment
Control PC (Windows recommended for most mirror tools), powered industrial USB hub, shielded USB cables under one meter, optional gigabit switch for LAN OTG path, and your chosen mirror or group-control suite.

## Step-by-Step Instructions
1. Inspect export carton, PSU label, and accessory checklist.
2. Connect PSU and cooling; wait for fan spin before USB data connection.
3. Attach hub to control PC; connect farm box data path to hub.
4. Open mirror tool; run device detection on a single node first.
5. Authorize ADB on official ROM tiers when prompted.
6. Label the node in software; repeat for remaining slots.
7. Optional: enable LAN OTG scan after USB baseline is stable.

## Troubleshooting Checklist
- No devices listed: swap hub port, try another root controller, disable USB selective suspend on Windows.
- Intermittent disconnect: cable length, hub power, or laptop controller overload.
- LAN scan empty: confirm OTG TCP step on official ROM boxes.

## When to Contact Support
Starter and Studio Pro packages include remote screenshare onboarding. Share your mirror tool name and OS version.

## Related Links
- /help/usb-screen-projection
- /help/otg-mode-connection-tutorial`,

  "usb-to-wifi-handoff": `USB Device to WiFi Connection

## Before You Start
USB-to-WiFi handoff drops the data cable after initial pairing. Use it when desk cable count is a constraint—not as the default for forty-node labs. Large farms should keep mirror paths on wired USB or LAN OTG where possible.

## Required Equipment
Enterprise access point or lab SSID with client isolation disabled for the farm VLAN, documented WiFi password, and mirror tool that supports LAN mode.

## Step-by-Step Instructions
1. Complete USB connection and authorization first.
2. Right-click the device in your mirror tool and select LAN/WiFi handoff.
3. Confirm the device receives an IP on the farm subnet.
4. Verify mirror stability for at least thirty minutes before removing USB.
5. Document which nodes are on WiFi versus wired for troubleshooting.

## Troubleshooting Checklist
- Mirror flapping: too many clients per AP or power save enabled—disable client power save on lab SSID.
- Voltage-related drops on large walls: reduce simultaneous WiFi handoffs; stage in waves.
- Consumer router limits: ordinary routers often handle only five to ten stable mirrors.

## When to Contact Support
Share AP model and node count if WiFi mirrors fail after topology review.

## Related Links
- /help/lan-otg-connection
- /help/large-farm-network-deployment`,

  "equipment-status-detection": `Equipment Status Detection

## Before You Start
Offline nodes in a twenty-node box are usually a connection issue—not a dead board. Use systematic detection before RMA.

## Required Equipment
Control software device panel, burn-in serial sheet from shipment, spare USB cable, and known-good hub port map.

## Step-by-Step Instructions
1. Open the device detection or status panel in your control suite.
2. Compare offline node IDs against the burn-in sheet slot numbers.
3. Re-seat USB at the hub and chassis pigtail for the affected slot.
4. Swap to a neighboring port to isolate hub versus board.
5. Cold-reboot a single node if the suite supports per-slot power cycle.
6. Log results before escalating.

## Troubleshooting Checklist
- Cluster offline after group sync: cancel sync, reconnect USB baseline first.
- Random scattered offline: hub controller reset—upgrade to powered industrial hub.
- Same slot fails after swap: note serial for RMA with photos.

## When to Contact Support
Send node serial, slot number, and a photo of hub port labels via WhatsApp or Telegram.

## Related Links
- /help/usb-screen-projection
- /contact`,

  "sync-control-batch-ops": `Sync Control & Batch Operations

## Before You Start
Sync control mirrors taps and gestures from a master window to selected devices. Group devices by identical ROM and resolution before enabling sync for QA scripts.

## Required Equipment
Grouped and labeled nodes, control suite with sync or master-window mode, and a canary device for new APK or gesture maps.

## Step-by-Step Instructions
1. Create device groups by app under test and Android branch.
2. Select the master node or floating master window per your tool.
3. Run a canary action on one device before fleet sync.
4. Enable one-click select or group sync for the target set.
5. Log failures per node ID for regression tracking.

[Image: /images/real-factory/box-shots/2025_10_25_11_33_IMG_0561.png|Multi-slot phone farm chassis for group control|Chassis with multiple motherboard trays — USB hub paths and group labels for sync control.]

## Troubleshooting Checklist
- Offset taps: mixed resolutions in one group—separate groups by device tier.
- Partial sync: some nodes in sleep or disconnected—refresh detection first.
- Script drift after OS update: re-record gestures on updated ROM branch.

## When to Contact Support
Group Control Onboarding service maps policies during Studio Pro packages.

## Related Links
- /help/batch-apk-install
- /services/packages`,

  "adb-scripts-shortcuts": `ADB Commands & Script Shortcuts

## Before You Start
ADB shortcuts speed provisioning without a full IDE. Map only repeatable, reviewed commands—avoid unlogged shell scripts on production QA pools.

## Required Equipment
Authorized ADB paths per node, control suite with script or shortcut panel, and timeout guards for long-running commands.

## Step-by-Step Instructions
1. List the five most frequent ADB actions your lab runs (install, clear data, grant permission, logcat pull, reboot).
2. Map each to a button during Group Control System Setup.
3. Test on one canary node with a sixty-second timeout.
4. Document shortcuts in your operator runbook.
5. Restrict destructive commands to admin operators.

## Troubleshooting Checklist
- Command hangs: USB bandwidth saturated—pause parallel file transfers.
- Unauthorized device: re-run ADB authorization on official ROM tiers.
- Inconsistent results: mixed Android versions in one group.

## When to Contact Support
Request Group Control Onboarding if you need chained scripts with rollback steps.

## Related Links
- /help/batch-apk-install
- /blog/bulk-apk-install-guide`,

  "router-dhcp-pool-limits": `Router DHCP Pool & Connection Limits

## Before You Start
Consumer routers default to small DHCP pools and low concurrent client limits. A twenty-node LAN OTG farm plus control PC can exhaust a /24 if pools are not planned.

## Required Equipment
Managed router or firewall, spreadsheet for IP map, gigabit switch, and optional VLAN-capable gear for multi-box sites.

## Step-by-Step Instructions
1. Count all farm nodes, control PCs, APs, and management interfaces.
2. Expand DHCP pool beyond defaults—reserve IPs for control workstations.
3. Document static leases for critical gear when required.
4. Enable per-port isolation only where your security policy demands it.
5. Test lease renewal after a full-box reboot storm.

## Troubleshooting Checklist
- New nodes get no IP: pool exhausted—expand before adding hardware.
- Intermittent LAN mirror loss: lease time too short—increase DHCP lease duration.
- Broadcast storm during scan: scan bounded subnet, not entire corporate LAN.

## When to Contact Support
Enterprise Deployment includes network BOM review for forty-plus nodes.

## Related Links
- /help/large-farm-network-deployment
- /deployment`,

  "samsung-farm-rom-guidance": `Samsung Farm ROM Update Guidance

## Before You Start
ROM tier affects ADB authorization, LAN mirroring speed, and app compatibility. Do not flash unknown images without factory guidance—document the shipped branch on your burn-in sheet.

## Required Equipment
Factory burn-in report, optional official ADB auth file set, USB baseline connection, and rollback plan before any fleet-wide change.

## Step-by-Step Instructions
1. Confirm ROM tier on the burn-in sheet (official versus optimized lab image).
2. For official ROM: place ADB auth files per Cyou instructions before fleet connect.
3. For optimized ROM: verify LAN mirroring flags match your control tool.
4. Test one node with target app matrix before wide rollout.
5. Keep previous ROM package archived for rollback.

## Troubleshooting Checklist
- ADB unauthorized on official tier: auth file path or USB debugging toggle.
- App crashes after ROM change: split APK or SDK floor mismatch—test canary first.
- Mixed tiers in one group: separate groups before batch APK install.

## When to Contact Support
Contact sales before requesting ROM branch changes on a live contract.

## Related Links
- /help/batch-apk-install
- /shop?category=samsung-box`,

  "motherboard-bios-xhci-note": `Workstation BIOS: USB/XHCI Notes

## Before You Start
Control PCs driving four or more high-density hubs can hit USB controller limits before the farm does. Size the workstation like infrastructure—not a casual laptop.

## Required Equipment
Desktop or workstation with multiple independent USB root controllers, powered hubs, and BIOS access for XHCI settings.

## Step-by-Step Instructions
1. Inventory how many hubs hang off each root controller (aim for two dense hubs per controller).
2. Enter BIOS and note XHCI hand-off and legacy USB settings.
3. If nodes drop in groups under load, try disabling problematic XHCI hand-off on older boards.
4. Prefer wired Ethernet for control PC network—avoid WiFi for discovery-heavy sessions.
5. Document BIOS version after a stable configuration is found.

## Troubleshooting Checklist
- Tree collapse under parallel install: reduce batch size or add second controller card.
- Laptop-only setup fails at thirty nodes: migrate to desktop workstation.
- Random port death: thermal or power issue on hub—replace with industrial powered unit.

## When to Contact Support
Share control PC specs when quoting farms above forty nodes.

## Related Links
- /guides/hardware-selection
- /contact`,
};
