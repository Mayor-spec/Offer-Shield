import { SampleScenario, AnalysisReport } from '../types/analyzer';

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'sample-scholarship',
    badge: 'Scholarship Scam',
    title: 'Global Merit Foundation Grant',
    subtitle: '$12,500 award with an urgent $85 advance processing fee',
    category: 'scholarship',
    text: `Subject: URGENT: Official Award Notice - 2026 Global Academic Excellence Merit Grant ($12,500 USD)

Dear Student,

We are pleased to notify you that your university profile has been selected by our Academic Review Council for the 2026 Global Academic Excellence Merit Grant in the amount of $12,500.00 USD. Your candidacy was ranked in the top 1% among 14,000 eligible college students.

To disburse these non-repayable funds directly to your university student bursar account within 48 business hours, our charter requires all recipients to remit a mandatory, fully-refundable accreditation & international ledger processing fee of $85.00 via Apple Gift Card, Zelle, or CashApp to: bursar-dispatch@global-merit-awards-bureau.org.

NOTICE: This grant reservation expires in 24 hours. Failure to remit the $85 verification fee by 5:00 PM EST today will lead to immediate and irreversible forfeiture to an alternate student on the waiting list.

Sincerely,
Dr. Arthur Sterling, Senior Comptroller
Global Merit Awards & Endowment Bureau
London & New York Secretariat`,
    report: {
      id: 'report-demo-scholarship',
      timestamp: Date.now(),
      inputText: `Subject: URGENT: Official Award Notice - 2026 Global Academic Excellence Merit Grant ($12,500 USD)...`,
      title: 'Global Academic Excellence Merit Grant',
      category: 'scholarship',
      riskLevel: 'high',
      riskLabel: 'High risk',
      score: 94,
      verdict: 'Severe Advance-Fee Fraud Indicators Detected. Legitimate educational scholarships never require recipients to pay an upfront processing fee to release award funds.',
      summary: 'This communication exhibits classic textbook traits of a 419 advance-fee scholarship scam targeting university students. It combines an unapplied-for cash prize, an artificial 24-hour urgency countdown, and an unusual demand for payment via irreversible consumer peer-to-peer payment channels.',
      isDemonstration: true,
      demoNotes: 'Demonstration analysis report calibrated to standard FTC, FBI IC3, and university registrar student employment fraud advisory databases.',
      evidence: [
        {
          id: 'ev-sch-1',
          phrase: 'mandatory, fully-refundable accreditation & international ledger processing fee of $85.00 via Apple Gift Card, Zelle, or CashApp',
          signal: 'Advance fee demand using non-reversible consumer channels',
          whyItMatters: 'Authentic grantmakers and collegiate financial aid offices deduct any legitimate admin costs from disbursements directly. They never demand upfront cash via gift cards, Zelle, or CashApp, which lack buyer protection.',
          sentiment: 'supports_suspicion',
          severity: 'critical'
        },
        {
          id: 'ev-sch-2',
          phrase: 'Failure to remit the $85 verification fee by 5:00 PM EST today will lead to immediate and irreversible forfeiture',
          signal: 'Artificial high-pressure urgency deadline',
          whyItMatters: 'Scammers impose severe short-fuse deadlines (24 hours or end-of-day) to prevent students from consulting their university financial aid counselor, parents, or verifying through accredited bureaus.',
          sentiment: 'supports_suspicion',
          severity: 'critical'
        },
        {
          id: 'ev-sch-3',
          phrase: 'your university profile has been selected... Your candidacy was ranked in the top 1% among 14,000 eligible college students',
          signal: 'Unsolicited award without prior application or submission',
          whyItMatters: 'Merit scholarships require rigorous applications, transcripts, essays, and direct student applications. Receiving an unexpected grant without applying is a prime indicator of wide-net phishing.',
          sentiment: 'supports_suspicion',
          severity: 'warning'
        },
        {
          id: 'ev-sch-4',
          phrase: 'Global Merit Awards & Endowment Bureau London & New York Secretariat',
          signal: 'Authoritative-sounding bureaucratic entity without educational registry',
          whyItMatters: 'Fraud syndicates invent names combining "Global", "Bureau", "Merit", and "Endowment" to mimic reputable non-profits and governmental institutions.',
          sentiment: 'supports_suspicion',
          severity: 'warning'
        },
        {
          id: 'ev-sch-5',
          phrase: 'disburse these non-repayable funds directly to your university student bursar account',
          signal: 'Legitimate financial terminology utilized',
          whyItMatters: 'The sender uses authentic collegiate vocabulary ("bursar account", "non-repayable") to foster a false sense of institutional legitimacy.',
          sentiment: 'weakens_suspicion',
          severity: 'info'
        }
      ],
      observedFacts: [
        'The text explicitly demands an upfront payment of $85.00.',
        'Payment is requested via consumer peer-to-peer apps (Zelle, CashApp, Apple Gift Cards).',
        'A strict 24-hour expiration forfeiture window is imposed.',
        'The email claims an award amount of $12,500.00 USD.'
      ],
      unverifiedClaims: [
        'The sender claims to represent an entity called "Global Merit Awards & Endowment Bureau".',
        'The sender claims that 14,000 college candidates were evaluated.',
        'The sender claims that the $85 fee is "fully refundable".',
        'The sender claims funds will be credited to the student bursar account within 48 hours.'
      ],
      nextSteps: [
        'Do not send any funds, gift cards, or personal banking info to the sender.',
        'Forward the email to your university financial aid office or campus IT security department (abuse@university.edu).',
        'Cross-check the foundation name against the official US Dept of Education or FAFSA-approved scholarship repositories.',
        'Mark the sender email address as spam and block subsequent outreach.'
      ]
    }
  },
  {
    id: 'sample-internship',
    badge: 'Internship Scam',
    title: 'Remote AI Research Intern ($48/hr)',
    subtitle: 'High pay, no interview, and advance check for IT equipment',
    category: 'internship',
    text: `Position: Remote Executive Assistant & AI Data Annotation Intern
Organization: Apex Global Cloud Innovations LLC
Compensation: $48.00 / hour (15-20 flexible hours per week)
Target: Open to all undergraduate & graduate college majors. No prior technical experience required.

Overview:
We were impressed by your candidate resume and have officially approved your direct onboarding into our Fall/Spring remote research cohort. No formal interview is required as this is an entry-level development pathway.

Equipment & Onboarding Procedure:
As a remote employee, you are entitled to a full corporate home-office suite (2025 MacBook Pro M4, dual 4K monitors, ergonomic desk chair, and secure hardware token). 

To expedite delivery, our accounting division is mailing a certified corporate cashier's check of $3,950.00 to your home address via FedEx Priority. Upon receipt:
1. Deposit the check via your mobile banking app.
2. Deduct $500.00 immediately as your first-week advance signing stipend.
3. Wire the remaining balance of $3,450.00 via Zelle or Bitcoin transfer to our authorized equipment procurement specialist on Telegram (@ApexLogisticsVendor) so they can dispatch your encrypted workstation today.

Please confirm your primary mailing address and mobile phone number to begin.`,
    report: {
      id: 'report-demo-internship',
      timestamp: Date.now(),
      inputText: `Position: Remote Executive Assistant & AI Data Annotation Intern...`,
      title: 'Apex Global Cloud Innovations LLC - Remote Intern',
      category: 'internship',
      riskLevel: 'high',
      riskLabel: 'High risk',
      score: 96,
      verdict: 'Dangerous Fake Check & Hardware Procurement Scam Detected. Depositing this check and forwarding money will leave you financially liable for thousands of dollars when the fake check bounces.',
      summary: 'This opportunity contains the definitive red flags of a counterfeit cashier check fraud ring. Unrealistic entry-level hourly pay ($48/hr for no experience), skipping formal interviews, and instructing the student to deposit an employer check and wire funds to a third-party vendor via Telegram.',
      isDemonstration: true,
      demoNotes: 'Demonstration analysis report calibrated to FBI IC3 Fake Check Scams and NACE (National Association of Colleges and Employers) recruiting ethics guidelines.',
      evidence: [
        {
          id: 'ev-int-1',
          phrase: 'accounting division is mailing a certified corporate cashier\'s check of $3,950.00... Deduct $500.00... Wire the remaining balance of $3,450.00',
          signal: 'Classic counterfeit overpayment / equipment check scam',
          whyItMatters: 'Banks are required by law to make check funds available within 1-2 days, but verifying the check actually takes weeks. When the fake check inevitably bounces, the bank deducts the entire $3,950 from your account, while the wired $3,450 is permanently stolen.',
          sentiment: 'supports_suspicion',
          severity: 'critical'
        },
        {
          id: 'ev-int-2',
          phrase: 'Wire the remaining balance... via Zelle or Bitcoin transfer to our authorized equipment procurement specialist on Telegram (@ApexLogisticsVendor)',
          signal: 'Off-platform, non-traceable payment method via messaging handle',
          whyItMatters: 'No legitimate corporate enterprise conducts equipment logistics or treasury transfers via personal Telegram handles or cryptocurrency addresses.',
          sentiment: 'supports_suspicion',
          severity: 'critical'
        },
        {
          id: 'ev-int-3',
          phrase: 'Compensation: $48.00 / hour... Open to all undergraduate & graduate college majors. No prior technical experience required.',
          signal: 'Disproportionately inflated wage for entry-level tasks',
          whyItMatters: 'Offering $48/hour with no interview or prerequisite experience is designed to induce excitement and override a student\'s natural skepticism.',
          sentiment: 'supports_suspicion',
          severity: 'warning'
        },
        {
          id: 'ev-int-4',
          phrase: 'No formal interview is required as this is an entry-level development pathway',
          signal: 'Bypassing standard collegiate hiring and screening protocol',
          whyItMatters: 'Legitimate employers never extend formal employment contracts and multi-thousand-dollar equipment budgets without at least a live video or in-person interview.',
          sentiment: 'supports_suspicion',
          severity: 'warning'
        },
        {
          id: 'ev-int-5',
          phrase: 'full corporate home-office suite (2025 MacBook Pro M4, dual 4K monitors...)',
          signal: 'Specific premium equipment itemization',
          whyItMatters: 'Listing high-end consumer technology creates a realistic commercial narrative that appeals directly to technology-focused students.',
          sentiment: 'weakens_suspicion',
          severity: 'info'
        }
      ],
      observedFacts: [
        'The sender offers $48/hr with no technical experience required.',
        'The sender promises a $3,950 check to be deposited into the applicant\'s personal account.',
        'The applicant is instructed to send $3,450 to a vendor via Telegram handle.',
        'No interview was conducted prior to the job offer.'
      ],
      unverifiedClaims: [
        'Apex Global Cloud Innovations LLC exists as an active employer entity.',
        'The $3,950 corporate cashier\'s check has legitimate funds backing it.',
        'The Telegram account "@ApexLogisticsVendor" is an authentic Apple IT vendor.',
        'A MacBook Pro will actually be shipped upon wiring funds.'
      ],
      nextSteps: [
        'Under no circumstances deposit any mailed or digital check from this contact.',
        'Never wire money or purchase hardware on behalf of an employer using personal accounts.',
        'Report this posting to your campus Career Center and Handshake/LinkedIn security teams.',
        'Cut off all communication immediately.'
      ]
    }
  },
  {
    id: 'sample-recruitment',
    badge: 'Recruitment Phishing',
    title: 'Telegram HR Healthcare Recruiter',
    subtitle: 'Urgent hiring requesting SSN and driver\'s license upfront',
    category: 'recruitment',
    text: `Hi there! Hope you are having a wonderful week.

I am Sarah Jenkins, Lead Executive Talent Partner at BioSphere MedTech Solutions Inc. I came across your candidate profile on our regional university recruitment database and your academic background is a perfect match for our new openings.

We are urgently onboarding three Junior Clinical Research Coordinators for our remote digital trials. 
- Rate: $42.50 per hour + health, dental, and 401(k)
- Hours: 20 hrs/week, fully flexible schedule around your classes

Due to tight regulatory filing deadlines for Q4, our hiring committee is conducting expedited same-day text interviews exclusively over Telegram.

Please install the Telegram app and connect immediately with our Senior Medical Director, Dr. Marcus Vance:
Handle: @MarcusVance_BioSphereHR
Interview Code: #MED-CARE-8842

Please have ready:
1. Front and back photo of your State Driver's License or Passport
2. Social Security Number (SSN) verification document
3. Voided check with routing and account number for payroll enrollment

He is waiting online right now to conduct your 15-minute text onboarding interview.`,
    report: {
      id: 'report-demo-recruitment',
      timestamp: Date.now(),
      inputText: `Hi there! Hope you are having a wonderful week. I am Sarah Jenkins...`,
      title: 'BioSphere MedTech Solutions - Junior Clinical Coordinator',
      category: 'recruitment',
      riskLevel: 'high',
      riskLabel: 'High risk',
      score: 89,
      verdict: 'Severe Identity Theft and Credential Harvesting Operation. Never share government identification or SSNs over third-party messaging apps like Telegram.',
      summary: 'This unsolicited outreach is engineered to extract comprehensive identity theft documentation (SSN, photo ID, bank routing details) under the guise of an expedited text-only Telegram interview with a prestigious healthcare entity.',
      isDemonstration: true,
      demoNotes: 'Demonstration analysis report calibrated to National Cyber Security Alliance (NCSA) and FTC Job Phishing guidance.',
      evidence: [
        {
          id: 'ev-rec-1',
          phrase: 'Front and back photo of your State Driver\'s License or Passport... Social Security Number (SSN) verification document',
          signal: 'Immediate high-sensitivity personal identity credential harvesting',
          whyItMatters: 'Legitimate employers only request SSNs and government IDs through encrypted I-9 compliance portals AFTER a formal written offer letter has been negotiated and signed, never before an interview.',
          sentiment: 'supports_suspicion',
          severity: 'critical'
        },
        {
          id: 'ev-rec-2',
          phrase: 'hiring committee is conducting expedited same-day text interviews exclusively over Telegram (@MarcusVance_BioSphereHR)',
          signal: 'Shifting official corporate communication to anonymous encrypted chat apps',
          whyItMatters: 'Scammers migrate victims to Telegram, Signal, or WhatsApp because phone numbers can be spoofed, accounts can be deleted without trace, and company IT administrators cannot monitor the exchange.',
          sentiment: 'supports_suspicion',
          severity: 'critical'
        },
        {
          id: 'ev-rec-3',
          phrase: 'Voided check with routing and account number for payroll enrollment',
          signal: 'Premature banking information collection',
          whyItMatters: 'Gathering bank routing numbers in conjunction with photo IDs enables threat actors to open fraudulent credit lines or compromise existing student bank accounts.',
          sentiment: 'supports_suspicion',
          severity: 'critical'
        },
        {
          id: 'ev-rec-4',
          phrase: 'He is waiting online right now to conduct your 15-minute text onboarding interview',
          signal: 'Urgency coercion and non-standard text-only interview format',
          whyItMatters: 'Professional medical/clinical trials require in-depth video or panel assessments, credential checks, and formal compliance onboarding.',
          sentiment: 'supports_suspicion',
          severity: 'warning'
        },
        {
          id: 'ev-rec-5',
          phrase: 'Rate: $42.50 per hour + health, dental, and 401(k) - Hours: 20 hrs/week, fully flexible schedule around your classes',
          signal: 'Student-tailored compensation and schedule promises',
          whyItMatters: 'Promising benefits that specifically cater to student class schedules builds trust and lowers vigilance.',
          sentiment: 'weakens_suspicion',
          severity: 'info'
        }
      ],
      observedFacts: [
        'The recruiter directs the applicant to Telegram for a text interview.',
        'The recruiter requests photos of driver\'s license/passport and SSN upfront.',
        'The recruiter asks for voided check routing details before any formal contract.',
        'The wage offered is $42.50/hour with flexible student hours.'
      ],
      unverifiedClaims: [
        'The sender Sarah Jenkins is employed by BioSphere MedTech Solutions Inc.',
        'BioSphere MedTech Solutions is running active clinical trials for students.',
        'The Telegram account "@MarcusVance_BioSphereHR" is a licensed physician/director.',
        'A legitimate job position will be granted after the 15-minute chat.'
      ],
      nextSteps: [
        'Never transmit your SSN, passport, or driver\'s license photos via Telegram.',
        'Search for BioSphere MedTech Solutions official website directly and check their /careers page.',
        'Contact the official HR department using verified corporate email or phone numbers, not Telegram.',
        'If you already sent documents, file a fraud alert with Experian, Equifax, and TransUnion immediately.'
      ]
    }
  }
];

export const AMBIGUOUS_SAMPLE: {
  title: string;
  badge: string;
  category: 'job_offer';
  subtitle: string;
  text: string;
} = {
  title: 'Campus Social Media Coordinator',
  badge: 'Ambiguous Offer',
  category: 'job_offer',
  subtitle: 'Vague company details, public Gmail contact, requires verification',
  text: `Position: Remote Student Social Media Assistant & Content Promoter
Organization: Quantum Pulse Digital Marketing Collective
Compensation: $22.00 / hour (8-12 hours per week, flexible)
Location: Remote (College students in US/Canada)

Job Overview:
Quantum Pulse is an independent creative collective expanding digital outreach. We are seeking energetic college students to curate TikTok clips, schedule Instagram posts, and engage with university student communities online.

Responsibilities:
- Create 3-5 short-form reels or graphics weekly showcasing partner educational apps.
- Monitor discussion forums and answer general questions about student productivity tools.
- Attend bi-weekly 30-minute sync meetings via Zoom.

Requirements:
- Active presence on social platforms (Instagram, TikTok, or Reddit).
- Reliable internet connection and personal laptop or smartphone.
- Strong written communication skills.

How to Apply:
Please submit a brief paragraph about your favorite social media campaigns and your Instagram/TikTok portfolio handle to talent.quantumpulse@gmail.com with subject line 'Student Promoter - [Your University Name]'. Shortlisted candidates will be invited for a 20-minute Zoom introductory call next Tuesday.`
};

export const BENCHMARK_LOW_RISK_SAMPLE: {
  title: string;
  text: string;
  report: AnalysisReport;
} = {
  title: 'On-Campus Library Student Assistant (Sample Low Risk)',
  text: `Position: Student Library Assistant - University Library Services
Department: Access Services & Circulation
Hourly Rate: $16.50/hr (Work-Study eligible, max 15 hrs/week during academic terms)
Application Deadline: October 30, 2026

Job Description:
The University Library is seeking dependable undergraduate students to join our circulation team. Duties include checking library books in and out, re-shelving materials according to Library of Congress classification, assisting patrons at the reference information desk, and opening/closing study halls.

Qualifications:
- Currently enrolled in a minimum of 6 credit hours at the University.
- Basic familiarity with campus library database and Microsoft Office.
- Punctuality and customer service orientation.

Application Process:
Apply directly through the official campus student portal at jobs.university.edu (Job ID #88412). Selected candidates will be invited for a 20-minute in-person interview with the Circulation Supervisor at the Main Library, Room 204. No fees or equipment purchases required. Formal I-9 identity verification occurs in-person at the Student Employment Center after hire.`,
  report: {
    id: 'report-demo-low-risk',
    timestamp: Date.now(),
    inputText: `Position: Student Library Assistant - University Library Services...`,
    title: 'University Library - Student Assistant Position',
    category: 'job_offer',
    riskLevel: 'low',
    riskLabel: 'Lower apparent risk',
    score: 14,
    verdict: 'Standard Campus Employment Indicators. Application is routed through official university infrastructure (.edu portal) with in-person supervisor interviews and no advance fee or equipment demands.',
    summary: 'The job posting follows conventional, transparent university student employment standards: realistic collegiate minimum wages ($16.50/hr), institutional application portal routing (jobs.university.edu), and explicit in-person I-9 processing at the Student Employment Center.',
    isDemonstration: true,
    demoNotes: 'Demonstration analysis report calibrated against standard collegiate on-campus student employment postings.',
    evidence: [
      {
        id: 'ev-low-1',
        phrase: 'Apply directly through the official campus student portal at jobs.university.edu (Job ID #88412)',
        signal: 'Official institutional portal and verifiable domain',
        whyItMatters: 'Routing job applications through verified university subdomains (.edu) ensures applications are governed by campus employment oversight.',
        sentiment: 'weakens_suspicion',
        severity: 'info'
      },
      {
        id: 'ev-low-2',
        phrase: 'Selected candidates will be invited for a 20-minute in-person interview with the Circulation Supervisor at the Main Library, Room 204',
        signal: 'Verifiable physical location and in-person supervisory interview',
        whyItMatters: 'Scammers refuse in-person meetings or official campus addresses. A specific physical office allows immediate independent confirmation.',
        sentiment: 'weakens_suspicion',
        severity: 'info'
      },
      {
        id: 'ev-low-3',
        phrase: 'Hourly Rate: $16.50/hr (Work-Study eligible, max 15 hrs/week during academic terms)',
        signal: 'Standard, realistic student wage aligned with campus policies',
        whyItMatters: 'Compensation aligns realistically with student assistant guidelines rather than an inflated $45-$60/hr bait rate.',
        sentiment: 'weakens_suspicion',
        severity: 'info'
      },
      {
        id: 'ev-low-4',
        phrase: 'Formal I-9 identity verification occurs in-person at the Student Employment Center after hire',
        signal: 'Compliant federal identity verification protocol',
        whyItMatters: 'Legitimate employers verify identities in person or via verified enterprise portals only AFTER hiring, never over social apps.',
        sentiment: 'weakens_suspicion',
        severity: 'info'
      }
    ],
    observedFacts: [
      'Application is hosted on an official .edu portal.',
      'Pay is $16.50/hr with a 15 hr/week cap matching work-study rules.',
      'Interview is scheduled in-person at a verifiable campus facility.',
      'Explicitly clarifies that no equipment purchase or fees exist.'
    ],
    unverifiedClaims: [
      'Always verify that the link points to your actual university domain before logging into student credentials.'
    ],
    nextSteps: [
      'Submit application through your authenticated university portal.',
      'Never send passwords or credentials if linked via an unexpected external email.',
      'Always confirm the job requisition number directly on the university student job portal.'
    ]
  }
};
