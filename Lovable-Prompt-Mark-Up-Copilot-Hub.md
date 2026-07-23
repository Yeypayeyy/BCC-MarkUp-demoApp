# Master Prompt — Mark-Up Copilot Hub Frontend Mock

Copy everything below into Lovable.

---

Build a polished, responsive, frontend-only web application called **Mark-Up Copilot Hub**.

This is a high-fidelity interactive mock for a business case presentation, not a production application. It must convincingly demonstrate how Mark-Up transforms its current manual mentoring journey (Linktree → Google Form → WhatsApp → manual payment confirmation → manual mentor matching → manual scheduling and resource delivery) into one integrated digital experience.

## 1. Product concept

Mark-Up is an Indonesian mentoring platform that helps students prepare for:

- Business Case Competition (BCC)
- Business Plan Competition (BPC)
- Career preparation

The product has three connected capabilities:

1. **Guided Discovery**  
   An AI-assisted assessment identifies the user’s competition type, current preparation stage, main needs, deadline, and mentoring preference. It recommends the most relevant package and a mentor shortlist.

2. **Integrated Operations**  
   Booking, mock payment, onboarding, mentor assignment, scheduling, document delivery, and progress monitoring happen in one system. The admin remains in control of important operational decisions.

3. **Continuous Competition Copilot**  
   Between mentoring sessions, users can upload documents, receive mock AI analysis, turn findings into an action plan, practice Q&A, and track progress. Strategic feedback is validated by a human mentor.

The product principle must be clearly visible:

**AI menganalisis → Admin mengawasi → Mentor memvalidasi → Pelanggan memutuskan**

AI supports preparation and operational efficiency. It does not replace the mentor.

## 2. Scope and technical constraints

Build this as a frontend-only React application using:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons
- React Router

Important constraints:

- Do not connect Supabase.
- Do not build a real backend.
- Do not implement real authentication.
- Do not integrate a real payment gateway.
- Do not call a real AI API.
- Do not require environment variables.
- Use local mock data and localStorage only.
- All primary buttons and navigation items must work.
- Simulate loading, success, empty, error, and confirmation states.
- Use deterministic mock AI responses after a short 1–1.5 second loading state.
- Uploaded files are only represented in frontend state; do not actually upload them.
- The app should load with meaningful seeded data, never as a blank dashboard.
- Include a discreet **Demo Role Switcher** that lets the presenter switch between Customer, Admin, and Mentor views without logging in.

## 3. Visual direction

The UI should feel like a modern Indonesian edtech and mentoring platform: friendly, credible, youthful, structured, and presentation-ready.

Use this design system:

- Deep navy: `#102F73`
- Electric blue: `#3157D5`
- Magenta: `#C500C7`
- Purple: `#7B3FF2`
- Teal: `#218F91`
- Yellow accent: `#FFDB3D`
- Soft pink: `#F9E4F8`
- Light blue: `#EAF0FF`
- Light teal: `#E4F5F3`
- App background: `#F7F7FB`
- Main text: `#171923`
- Secondary text: `#667085`
- Border: `#E4E7EC`

Use **Plus Jakarta Sans** or **Inter**. Use rounded 16–20 px cards, soft shadows, clean borders, generous spacing, compact colored pills, and strong typographic hierarchy. Gradients may appear only as subtle highlights, not as the main background.

Create a simple Mark-Up logo mark from three diagonal rounded bars in blue, navy, and magenta, with a small yellow circle or upward arrow accent. Pair it with the wordmark **MARK-UP**. Do not use a robot illustration as the primary AI visual. Show AI through concrete recommendation and analysis cards marked with a sparkle icon.

The app must be:

- Desktop-first at 1440 px
- Fully responsive at tablet and mobile widths
- Accessible with visible focus states, semantic labels, good contrast, and buttons at least 44 px high on mobile
- Consistent across public, customer, admin, and mentor surfaces

## 4. Information architecture and routes

Create these connected routes.

### Public routes

- `/` — Landing page
- `/discover` — Five-step needs assessment
- `/discover/result` — AI recommendation result
- `/services` — Service catalog and comparison
- `/services/:slug` — Service detail
- `/checkout/:slug` — Checkout and scheduling preference
- `/payment-success` — Mock payment success and onboarding
- `/login` — Demo sign-in / role selection

### Customer app

- `/app/overview`
- `/app/project/semleketep`
- `/app/project/semleketep/documents`
- `/app/project/semleketep/copilot`
- `/app/project/semleketep/action-plan`
- `/app/sessions`
- `/app/resources`
- `/app/profile`

### Admin app

- `/admin/dashboard`
- `/admin/orders`
- `/admin/orders/MU-260723-021`
- `/admin/mentors`
- `/admin/schedule`
- `/admin/resources`

### Mentor app

- `/mentor/overview`
- `/mentor/mentees/semleketep`
- `/mentor/reviews`
- `/mentor/schedule`

Do not create orphan pages. Every route must be reachable through navigation or the primary demo flow.

## 5. Public landing page

Create a polished landing page with a sticky navigation bar.

Navigation:

- Logo
- Cari Program
- Cara Kerja
- Mentor
- Resource
- Masuk
- Primary CTA: **Temukan Programmu**

Hero copy:

Eyebrow:
**MENTORING FOR COMPETITION & CAREER**

Headline:
**Dari bingung mulai di mana sampai siap menghadapi juri.**

Supporting copy:
**Mark-Up membantu tim dan individu menemukan program yang tepat, belajar bersama mentor berpengalaman, dan menjaga progres tetap berjalan di antara sesi.**

Primary CTA:
**Temukan Programmu**

Secondary CTA:
**Lihat Semua Program**

Hero product preview:

- AI Recommendation card
- Upcoming mentoring card
- Progress ring
- Small action-plan checklist
- Badge: **Mentor-validated**

Below the hero, include:

1. Trust strip:
   - BCC & BPC mentoring
   - Mentor berpengalaman
   - Resource finalis
   - Dukungan antarsesi

2. Three capabilities:
   - Guided Discovery
   - Integrated Operations
   - Continuous Copilot

3. Five-step journey:
   - Temukan
   - Pesan
   - Persiapkan
   - Mentoring
   - Pantau Progres

4. Program categories:
   - Business Case Competition
   - Business Plan Competition
   - Career Mentoring

5. Featured packages

6. “How AI helps” section with three concrete outputs:
   - Rekomendasi program
   - Analisis awal dokumen
   - Action plan dan simulasi Q&A

   Add the clarification:
   **Keputusan strategis tetap divalidasi mentor.**

7. Testimonials with Indonesian student names and competition contexts. Keep claims realistic and do not invent major university logos.

8. FAQ accordion:
   - Apakah mentoring dilakukan secara online?
   - Apakah saya harus sudah punya ide?
   - Bagaimana mentor dipilih?
   - Apakah AI menggantikan mentor?
   - Apa yang terjadi jika tim lolos ke final?

9. Final CTA:
   **Belum yakin harus memilih program yang mana?**
   Button: **Mulai Asesmen Gratis**

## 6. Five-step Guided Discovery assessment

The assessment must feel like a core product experience, not a generic form.

Layout:

- Left: short contextual explanation and trust cue
- Right: assessment card
- Top: consistent five-segment progress bar
- Back button
- Continue button
- “Simpan dan lanjutkan nanti” text action

Steps:

### Step 1 — Tujuanmu

Question:
**Apa yang sedang kamu persiapkan?**

Options:

- Business Case Competition
- Business Plan Competition
- Career preparation
- Belum yakin

### Step 2 — Tahap persiapan

Question:
**Sejauh mana progresmu saat ini?**

Options:

- Baru mulai dan belum punya ide
- Sudah punya ide awal
- Sudah punya draft proposal
- Sedang revisi untuk submission
- Sudah lolos final dan perlu latihan pitching

### Step 3 — Kebutuhan utama

Allow up to three selections:

- Memahami guidebook
- Menentukan root cause
- Memilih framework
- Mematangkan solusi
- Review proposal
- Membuat pitch deck
- Latihan pitching
- Simulasi Q&A

### Step 4 — Konteks dan preferensi

Fields:

- Status: SMA / Mahasiswa / Lainnya
- Format: Individu / Tim
- Deadline: date input
- Preferensi waktu: weekday / weekend / flexible
- Budget:
  - Di bawah Rp150.000
  - Rp150.000–Rp250.000
  - Rp250.000–Rp350.000
  - Fleksibel

Status pendidikan is only recommendation context. Do not create separate SMA and university product lines.

### Step 5 — Ringkasan

Show a clean summary before analysis:

- Competition
- Current stage
- Top needs
- Deadline
- Format
- Budget

CTA:
**Analisis Kebutuhanku**

On click, show a 1.3-second analysis state with rotating copy:

- Memetakan tahap persiapan…
- Mencocokkan kebutuhan dengan cakupan program…
- Menyusun shortlist mentor…

Then navigate to `/discover/result`.

## 7. Recommendation result

Use the following seeded assessment:

- User: Faaid
- Team: Semleketep
- Competition: BCC
- Stage: Draft proposal
- Needs: root cause, solution validation, proposal review
- Deadline: 12 days
- Format: Team
- Budget: Rp150.000–Rp250.000

Primary result card:

Label:
**✦ REKOMENDASI UTAMA**

Package:
**Essential Sprint**

Match score:
**92% cocok**

Reason:
**Tim kamu sudah memiliki draft dan membutuhkan validasi problem–solution dalam waktu terbatas. Dua sesi fokus cukup untuk menajamkan analisis dan menyempurnakan solusi sebelum submission.**

Show “Why this fits”:

- Sesuai tahap: draft proposal
- Mencakup root cause dan solution review
- Masuk rentang budget
- Selesai sebelum deadline

Include:

- Price: Rp150.000/tim
- 2 sesi × 60 menit
- Bonus 1 sesi jika lolos final
- Tanya-jawab via WhatsApp

Primary CTA:
**Pilih Essential Sprint**

Secondary CTA:
**Bandingkan Program**

Also show:

- Alternative recommendation: Full-Throttle Coaching
- Three mentor shortlist cards
- One compact “Your mentoring journey” timeline
- Notice:
  **Rekomendasi AI dapat disesuaikan. Pilihan program tetap berada di tanganmu.**

Mentor shortlist:

1. **Nadia Putri** — BCC Strategy — FMCG, sustainability — available Saturday
2. **Raka Mahendra** — Problem Solving & Finance — available Wednesday
3. **Alya Ramadhani** — Pitching & Storytelling — available Sunday

## 8. Service catalog and real package content

Create tabs:

- Semua
- BCC
- BPC
- Career

Add filters:

- Individual / Team
- Stage
- Price
- Sessions

Add a comparison drawer. Users can compare up to three packages.

Use these exact offerings:

### BCC — Essential Sprint

- Rp150.000/tim
- 2 mentoring sessions, 60 minutes each
- Bonus 1 session if the team reaches the final
- WhatsApp Q&A
- Best for teams already registered and needing strategic assistance under a tight timeline
- Coverage:
  - Problem breakdown and framework-based analysis
  - Solution review and refinement

### BCC — Full-Throttle Coaching

- Rp195.000/tim
- 3 mentoring sessions, 60 minutes each
- Bonus 1 session if the team reaches the final
- WhatsApp Q&A
- Best for active competition teams that want a mature solution and presentation readiness
- Coverage:
  - Problem breakdown and framework-based analysis
  - Solution review and refinement
  - Pitching review and practice

### BCC — Bundling PowerPack

- Rp300.000/personal
- 3 individual mentoring sessions, 60 minutes each
- Access to 10 national finalist decks
- Access to 10 business case analysis frameworks
- WhatsApp Q&A
- Best for beginners learning BCC from zero with complete guidance and tools
- Coverage:
  - Identifying the main problem, symptoms, and root causes
  - Selecting a fit-to-case framework
  - Developing a strategic and realistic solution
  - Building an implementation plan

### BPC — Kickstart

- Rp200.000/person
- 2 individual mentoring sessions, 60 minutes each
- WhatsApp Q&A
- Best for beginners who do not yet have a competition idea
- Session 1: Ideation & Proposal Mapping
- Session 2: Pitching & Q&A Preparation

### BPC — Level-Up

- Rp250.000/team
- 2 team mentoring sessions, 60 minutes each
- Bonus 1 session if the team reaches the final
- WhatsApp Q&A
- Best for teams with an initial idea that need proposal refinement and pitching preparation
- Session 1: Proposal Deep Dive & Strategic Input
- Session 2: Customized Mentoring — Pitching / Proposal / Q&A

### 101 Career Mentoring

- Rp110.000/session
- 1 mentoring session, 60 minutes
- Free ATS CV template
- Exclusive modules and portfolio templates
- Free CV review
- Community access
- LinkedIn mutual network access
- Best for users who want to build a career in marketing from personal branding to CV and LinkedIn optimization

Each service card should show:

- Category
- Package name
- Ideal stage
- Team or individual
- Price
- Session count
- 2–3 key benefits
- CTA: **Lihat Detail**

## 9. Service detail page

Create a persuasive detail page for every package using route data.

Sections:

- Breadcrumb
- Category and stage pills
- Package name
- Short value proposition
- Price and format
- Session count
- Benefits
- Detailed curriculum / session breakdown
- “Best for” section
- What users receive
- Bonus if they reach the final
- Mentor examples
- FAQ
- Sticky purchase card

Buttons:

- **Pilih Program**
- **Tanya Admin**

The “Tanya Admin” button opens a mock WhatsApp-style modal but does not leave the app.

## 10. Checkout and mock onboarding

Checkout should use the selected package and show:

### Contact

- Full name
- Email
- WhatsApp number
- Team name
- Number of members

### Competition details

- Competition name
- Organizer
- Submission deadline
- Guidebook upload
- Current document upload

### Schedule preference

- Day preference
- Time preference
- Time zone: WIB

### Mentor preference

- Use recommended mentor
- Choose another mentor
- Let admin decide

### Order summary

For the seeded flow:

- Essential Sprint
- Rp150.000
- Platform fee: Rp0
- Total: Rp150.000

Payment options:

- Bank Transfer
- QRIS
- E-wallet

CTA:
**Bayar Rp150.000**

When clicked:

- Show a mock confirmation modal
- Simulate processing
- Set payment status to Paid
- Navigate to `/payment-success`

Payment success page:

- Success illustration or icon
- Order ID: **MU-260723-021**
- Status: **Pembayaran terverifikasi**
- Next steps:
  1. Lengkapi dokumen
  2. Admin mengonfirmasi mentor
  3. Pilih jadwal final
  4. Mulai persiapan
- CTA: **Masuk ke Workspace**

## 11. Customer dashboard

Use a left sidebar:

- Overview
- Project
- Sessions
- Resources
- Profile

Top bar:

- Greeting: **Selamat datang, Faaid 👋**
- Search
- Notification bell
- Avatar

Overview dashboard should include:

1. AI assessment summary:
   - Essential Sprint
   - 92% match
   - CTA: Lihat rekomendasi

2. Next session:
   - Nadia Putri
   - Saturday, 25 July 2026
   - 13.00–14.00 WIB
   - CTA: Lihat detail

3. Competition deadline:
   - 12 days remaining

4. Overall readiness score:
   - 64%

5. Progress journey:
   - Assessment — complete
   - Booking — complete
   - Preparation — active
   - Mentoring — upcoming
   - Final review — locked

6. Priority actions:
   - Upload latest proposal
   - Review root cause feedback
   - Confirm session schedule

7. Recent mentor note:
   **Fokus berikutnya: perkuat hubungan antara root cause dan solusi utama.**

8. Quick access:
   - Analyze Document
   - Ask Copilot
   - View Action Plan
   - Browse Resources

## 12. Project workspace

The project is:

- Team: Semleketep
- Competition: ISAC Mini Case Competition 2026
- Package: Essential Sprint
- Mentor: Nadia Putri
- Deadline: 4 August 2026

Project header:

- Readiness score
- Days remaining
- Session count
- Current phase

Tabs:

- Overview
- Documents
- Copilot
- Action Plan
- Mentor Notes

Project overview:

- Milestone timeline
- Team members
- Current blockers
- Latest document
- Mentor brief
- Activity history

## 13. Document analyzer

Documents page:

- Drag-and-drop upload area
- Accepted display types: PDF, DOCX, PPTX
- Seeded file: `Proposal_Semleketep_v2.pdf`
- File status: Analyzed
- Last updated date
- Version history

When **Analisis Dokumen** is clicked:

1. Show upload success
2. Show analysis loading skeleton
3. Display deterministic AI analysis

AI analysis result:

Overall readiness:
**64%**

Strong areas:

- Problem context is supported by relevant facts
- Proposed solution aligns with the competition theme
- Initial implementation stages are visible

Needs improvement:

- Root cause is still mixed with symptoms
- Link between root cause and solution is not explicit
- Financial assumptions need clearer justification
- Impact metrics are not yet measurable

Recommended next actions:

1. Rewrite the root-cause statement
2. Add a problem–solution linkage table
3. Define three measurable impact indicators
4. Prepare evidence for the financial assumptions

Each finding should have:

- Severity pill
- Page reference
- “Add to Action Plan” button
- “Ask Copilot” button

Add a persistent notice:
**Analisis AI adalah tinjauan awal. Validasi akhir dilakukan bersama mentor.**

## 14. Continuous Copilot

Create a two-column workspace:

- Left: conversation
- Right: context and action plan

Suggested prompts:

- Bantu bedakan symptom dan root cause
- Apakah solusi kami menjawab masalah utama?
- Buatkan simulasi pertanyaan juri
- Ringkas guidebook menjadi checklist

Seeded conversation:

User:
**Apa kelemahan utama proposal kami saat ini?**

Copilot:
**Kelemahan utamanya bukan pada ide, tetapi pada alur pembuktiannya. Proposal sudah menunjukkan masalah dan solusi, namun belum menjelaskan secara eksplisit mengapa solusi tersebut paling tepat untuk root cause yang dipilih.**

Then show three actions:

- Lihat evidence
- Tambahkan ke action plan
- Minta validasi mentor

Add a **Mock Q&A Mode**:

- Copilot asks one jury-style question at a time
- User selects or types an answer
- Show structured feedback:
  - Clarity
  - Evidence
  - Strategic depth
  - Delivery
- Button: **Kirim hasil ke mentor**

Make it clear that this is a frontend demo. Responses can be fixed or selected from mock datasets.

## 15. Action plan and progress

Display:

- Progress: **2 dari 4 selesai**
- Overall status: **On track**

Columns:

- To Do
- In Progress
- Need Mentor Review
- Done

Seeded tasks:

1. Separate symptoms from root cause — Done
2. Rewrite problem statement — Done
3. Build problem–solution linkage — In Progress
4. Define measurable impact indicators — Need Mentor Review

Each task:

- Priority
- Due date
- Source: AI / Mentor / Self
- Assignee
- Related document
- Comment count

Allow:

- Moving tasks between statuses
- Marking tasks complete
- Adding a task
- Opening task detail
- Requesting mentor validation

Mentor-validated items have a teal badge:
**Validated by Nadia**

## 16. Sessions and resources

Sessions page:

- Upcoming and completed tabs
- Session cards
- Calendar/list toggle
- Reschedule modal
- Session preparation checklist
- Mock join button
- Post-session notes and rating modal

Seeded sessions:

1. Problem & Analysis Review — Upcoming
2. Solution Refinement — Scheduled
3. Final Pitching Bonus — Locked until finalist status

Resources page:

- Search
- Category filters
- Saved resources
- Resource detail drawer

Categories:

- Guidebook Breakdown
- Business Frameworks
- Finalist Decks
- Pitching
- Q&A

Some resources should be locked with a package badge. PowerPack users get access to:

- 10 national finalist decks
- 10 business case analysis frameworks

## 17. Admin control tower

Admin sidebar:

- Dashboard
- Orders
- Mentors
- Schedule
- Resources

Admin dashboard should clearly communicate operational integration.

Metrics:

- 12 active orders
- 4 awaiting mentor confirmation
- 3 sessions today
- 2 documents awaiting review

Order workflow:

**Order masuk → Pembayaran → Admin approval → Mentor → Jadwal → Materi**

Show a table:

- Order ID
- Customer
- Package
- Payment
- Mentor
- Schedule
- Material delivery
- Overall status

Seeded highlighted order:

- MU-260723-021
- Tim Semleketep
- Essential Sprint
- Payment: Verified
- Mentor: Recommended
- Schedule: Preference received
- Materials: Pending
- Status: Needs admin approval

Filters:

- All
- Needs action
- Payment
- Mentor
- Scheduling
- Active
- Completed

## 18. Admin order detail

Create an operational order-detail screen for **MU-260723-021**.

Top:

- Customer and team
- Package
- Payment status
- Deadline
- Risk indicator

Main checklist:

1. Payment verified — complete
2. Customer brief summarized — complete
3. Mentor recommendation — waiting for admin approval
4. Schedule confirmation — pending
5. Resource distribution — pending

AI-generated customer brief:

**Tim Semleketep mengikuti BCC dengan draft proposal yang sudah tersedia. Fokus utama mereka adalah memisahkan root cause dari symptoms, memvalidasi solusi, dan menyelesaikan revisi dalam 12 hari.**

Admin controls:

- Approve recommended mentor
- Choose different mentor
- Confirm schedule
- Send onboarding message
- Release package resources
- Add internal note

When admin clicks **Approve Nadia Putri**:

- Update order state
- Show toast
- Unlock schedule confirmation
- Reflect the updated status in the customer dashboard

This interaction is important because it proves that AI recommends while the admin controls.

## 19. Mentor management and schedule

Mentor directory cards:

- Photo placeholder or initials
- Name
- Expertise
- Competition types
- Rating
- Active mentees
- Availability
- Capacity status

Mentors:

- Nadia Putri — BCC Strategy
- Raka Mahendra — Problem Solving & Finance
- Alya Ramadhani — Pitching & Storytelling
- Dimas Akbar — BPC Ideation

Admin schedule:

- Week calendar
- Session cards
- Conflict warning
- Mentor capacity indicator
- Reschedule action

## 20. Mentor workspace

Mentor overview:

- Today’s sessions
- Pending document reviews
- Mentees needing feedback
- Availability toggle

Mentee detail for Semleketep:

- Customer brief
- Competition deadline
- Package scope
- Readiness score
- Latest AI analysis
- Action plan
- Session history

Mentor actions:

- Validate an AI finding
- Add strategic note
- Request revision
- Mark task as reviewed
- Prepare session agenda

When the mentor validates a finding:

- Change its badge to **Mentor Validated**
- Add a timestamp and mentor name
- Reflect that state in the customer workspace

## 21. Demo interaction logic

Use a shared frontend store or context so state changes appear across roles.

Important demo sequence:

1. Landing page → click **Temukan Programmu**
2. Complete the assessment
3. Receive Essential Sprint recommendation
4. Open package detail
5. Checkout and complete mock payment
6. Enter customer workspace
7. Upload and analyze proposal
8. Add one AI finding to the action plan
9. Switch to Admin
10. Open order MU-260723-021
11. Approve Nadia Putri as mentor
12. Switch to Mentor
13. Validate the root-cause finding
14. Switch back to Customer
15. See the mentor-validated status and updated progress

Add a small **Reset Demo Data** action in the role switcher so the presenter can repeat the flow.

## 22. Component and state requirements

Create reusable components:

- AppShell
- PublicNavbar
- Sidebar
- Topbar
- RoleSwitcher
- PackageCard
- MentorCard
- StatusPill
- ProgressStepper
- ReadinessRing
- AIInsightCard
- MentorValidationBadge
- OrderWorkflow
- ActionPlanBoard
- SessionCard
- ResourceCard
- EmptyState
- LoadingSkeleton
- ConfirmationModal
- Toast

Include meaningful states:

- Default
- Hover
- Focus
- Selected
- Loading
- Success
- Locked
- Needs action
- Mentor validated
- Empty
- Error with retry

Use concise Indonesian UI copy. Avoid lorem ipsum. Avoid excessive marketing jargon. Do not show fake analytics charts that do not support the product story.

## 23. Final quality bar

The finished mock should make these messages obvious within 30 seconds:

1. Users no longer compare packages manually.
2. Customers can book, pay, schedule, receive resources, and monitor progress in one place.
3. AI provides recommendations and preparation support.
4. Admin controls mentor assignment and operations.
5. Mentors validate strategic feedback.
6. The service can handle more transactions without increasing manual work at the same rate.

Prioritize a cohesive, believable demo over excessive feature count. Make the landing page polished, the customer flow emotionally clear, and the admin order workflow operationally concrete.

At the end, ensure:

- Every route renders correctly
- Every main CTA works
- Mobile navigation works
- No dead buttons in the core demo
- No Supabase connection prompt
- No backend dependency
- No external API dependency
- Demo data persists in localStorage
- A reset-demo action restores the seeded state

