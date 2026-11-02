# Tareeqi (طريقي)

**Report it. Repair it. Protect everyone.**
*Smarter Roads. Safer Lives.*

Tareeqi is a mobile-first web app that lets drivers in Egypt report road hazards in under a minute, confirm hazards reported by others, and follow each report until the road is repaired. This repository contains the working MVP, built for the ALX final project.

**Demo:** [https://tareeqi-mvp.vercel.app/]

---

## The problem

Damaged roads, broken signs, dead streetlights and flooding cause accidents every day. Drivers see these hazards but have no quick way to report them. Roads departments have no clear, ranked list of what needs fixing first. Nobody can see whether a report led to a repair.

## The solution

Tareeqi connects the people who see the hazards with the people who fix them:

1. **Report it:** pick the hazard, set the risk level, add a photo and drop a pin.
2. **Repair it:** reports reach the team responsible for that road, with the exact location and the number of drivers who confirmed it.
3. **Protect everyone:** other drivers see the alert and avoid it until it is fixed.

## Features

- **Report a problem:** six categories (pothole, damaged sign, streetlight, flooding, cracked road, other), three risk levels, optional photo and description.
- **Location picker:** tap the map to place the pin, or use the device's GPS. The street and district name are worked out from the pin.
- **Alerts map:** a schematic map of Greater Cairo showing the Nile, main roads and districts, with filters and tappable markers.
- **Report details:** photo, description, age of the report and a four-stage tracker (Reported, Verified, Assigned, Repaired).
- **Community confirmation:** each user can confirm a hazard once ("I see this too").
- **My reports:** every report you submitted, with its current status.
- **Authority mode:** a switch on the Profile tab that lets you move reports through the repair stages, simulating a roads department.
- **Live sync:** reports, confirmations and status changes appear for all users in real time (see "Data and sync" below).
- **Offline fallback:** if shared storage is unavailable, the app keeps working and saves data on the device.

## Tech stack

- Plain HTML, CSS and JavaScript in a single file, with no build step and no dependencies.
- Inline SVG for the map and icons.
- Google Fonts: Poppins (headings) and Inter (body).
- Photos are resized in the browser (about 560 px, JPEG) before saving.

## Running the app

1. Clone the repository.
2. Open `index.html` in a browser. On a laptop it appears inside a phone frame, and on a phone it fills the screen.

No installation or server is needed. For the best demo, open it on a phone or use your browser's device toolbar.

## Data and sync

The app has two storage modes:

| Mode | When | Behaviour |
|---|---|---|
| **Live sync** | Hosted on claude.ai as an artifact with the shared database enabled | Reports are shared in real time between all users who can write to it |
| **Offline mode** | Opened as a plain file or hosted anywhere else | Reports are saved in the browser's `localStorage` on that device only |

The app starts with six sample reports in Cairo and Giza. To reuse the app on another host, replace the storage code in the `render`/`patch`/`submit` functions with calls to your own backend (see the roadmap).

## Brand

| | |
|---|---|
| Midnight Navy | `#0B2D5B` |
| Technology Blue | `#0EA5E9` |
| Safety Orange | `#F97316` (warnings and alerts only) |
| Light Grey | `#E5E7EB` |

Typography: Poppins Bold for headings and the wordmark, Inter Regular and Semibold for text, buttons and labels.

Brand values: Safety, Speed, Community, Transparency, Innovation.

## Known limitations

- The map is drawn from approximate coordinates and is not a real map. Road names and positions are schematic.
- The sample reports, counts and street names are placeholder data.
- There are no user accounts. A user is identified by a generated ID, so confirmations can be gamed.
- Authority mode is a demo switch. In production, only verified roads authorities should be able to change a report's status.
- Photos are stored inside the report record, which suits a prototype but not production.
- GPS may be blocked when the app runs inside an embedded viewer. The map tap always works.
- English only for now.

## Roadmap

- [ ] Real backend (database, image storage, API)
- [ ] User accounts and phone verification
- [ ] Real map tiles with clustering and routing around hazards
- [ ] Verified accounts for governorates and roads authorities, with a dashboard and ranked repair queue
- [ ] Push notifications when a report changes status
- [ ] Arabic interface with right-to-left layout
- [ ] Duplicate detection and abuse reporting
- [ ] Public statistics page on repair times by district

## Team

- Me, Sama 

Built as part of the ALX program.
