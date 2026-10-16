// WSI Learning — module content. To add a module, copy one object below and edit it.
// Lesson types: text, steps, flashcards, scenario, quiz, resources.
window.WSI_MODULES = [
{
  id: 'esta', title: 'Michigan Earned Sick Time Act (ESTA)', cat: 'Compliance', mins: 20, draft: true,
  summary: 'How sick time is earned, used and protected for WSI associates and internal staff.',
  lessons: [
    { type: 'text', title: 'What is ESTA?', mins: 4, video: 'ESTA overview',
      paras: [
        "Michigan's Earned Sick Time Act (ESTA) gives nearly every employee in the state the right to earn paid sick time and use it without fear of retaliation. That includes the associates WSI places at client sites and our internal team.",
        "In this module you'll learn how time is earned, what it can be used for, and how to respond when someone calls out sick."
      ],
      callouts: [
        { title: 'Who it covers', text: 'Full-time, part-time and temporary employees of Michigan employers.' },
        { title: 'Why it matters', text: 'Mishandling a sick call can be a violation even when it feels routine.', tone: 'red' }
      ] },
    { type: 'flashcards', title: 'Key numbers', mins: 3, intro: 'Tap each card to flip it. These are the numbers people ask about most.',
      cards: [
        ['Accrual', '1 : 30', 'At least 1 hour of paid sick time for every 30 hours worked.'],
        ['Large employers', '72 hours', 'Employers with 11+ employees: up to 72 paid hours a year can be used.'],
        ['Small employers', '40 hours', 'Employers with 10 or fewer: 40 paid hours a year.'],
        ['New hires', '120 days', 'Employers may require new employees to wait up to 120 days before using accrued time.'],
        ['Documentation', '3+ days', 'Reasonable documentation may be requested for absences over 3 consecutive days.'],
        ['Records', '3 years', 'Employers keep records of hours worked and sick time used for 3 years.']
      ] },
    { type: 'text', title: 'Qualifying reasons', mins: 3, paras: ['Earned sick time can be used for the employee or a family member, for any of these reasons:'],
      bullets: [
        ['Illness, injury or health condition', 'Physical or mental, including diagnosis, treatment and preventive care.'],
        ['Domestic violence or sexual assault', 'Medical care, counseling, relocation, legal services or victim services.'],
        ['Public health closures', "The workplace, or a child's school or care provider, closes due to a public health emergency."],
        ["School meetings about a child's health", "Meetings related to a child's health or disability, or the effects of domestic violence."]
      ],
      callouts: [{ title: 'Family member', text: 'Defined broadly: children, parents, spouses, grandparents, grandchildren, siblings, and anyone whose close association is the equivalent of a family relationship.' }] },
    { type: 'scenario', title: 'Scenario: the early call', mins: 4,
      outro: "You protected Maria's rights, kept the client informed without sharing medical details, and documented the time correctly.",
      steps: [
        { prompt: "6:40 a.m. Maria, an associate on second shift at a client warehouse, calls your line. Her son woke up with a fever and she can't come in today. She has 14 hours of sick time accrued. What do you do?",
          choices: [
            ["Remind her she needed to give 7 days' notice and mark it unexcused.", false, 'Unforeseeable absences only need notice as soon as practicable. A same-morning call is fine.'],
            ["Record the shift as ESTA sick time, thank her, and let the client know she's out today.", true, 'Caring for a sick child is a covered use, and she gave notice as soon as she could.'],
            ["Approve it only if she sends a doctor's note by end of day.", false, "A note can't be required for a single-day absence."]
          ] },
        { prompt: 'The following week Maria has been out four consecutive shifts recovering from surgery. The client asks whether she\'s "abusing the system." What\'s your next step?',
          choices: [
            ['Tell the client her medical details so they understand.', false, "Health information must be kept confidential. Share only that she's on approved leave."],
            ['Mark the fourth day as a no-call/no-show.', false, 'She notified us and has protected time. That would be retaliation.'],
            ["Reassure the client, keep details private, and ask Maria for reasonable documentation since she's out more than 3 consecutive days.", true, 'Documentation is allowed after 3+ consecutive days, and her health details stay private.']
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 5, questions: [
      { q: 'How quickly do employees earn sick time under ESTA?', o: ['1 hour per 40 hours worked', '1 hour per 30 hours worked', '8 hours per month', 'Only after 90 days'], a: 1, e: 'Employees accrue at least 1 hour for every 30 hours worked.' },
      { q: 'At a large employer (11+ employees), how many paid hours per year can an employee use?', o: ['24', '40', '72', 'Unlimited'], a: 2, e: 'Large employers must allow use of at least 72 paid hours per year.' },
      { q: 'Which of these is NOT a qualifying use of earned sick time?', o: ["A child's doctor appointment", 'A planned vacation', 'Counseling after domestic violence', 'A school closed by a public health emergency'], a: 1, e: 'Vacation is not a covered reason. The others are.' },
      { q: "An associate calls out sick for one day. Can we require a doctor's note?", o: ['Yes, always', 'Only if the client asks', 'No, only for absences over 3 consecutive days', 'Yes, but only for part-time staff'], a: 2, e: 'Documentation can be requested only after more than 3 consecutive days.' },
      { q: 'A client wants an associate removed for using ESTA time. What applies?', o: ['That is allowed for temps', 'Retaliation for using ESTA is prohibited', "It's fine after a warning", 'It depends on the client contract'], a: 1, e: 'Any adverse action for using protected sick time is retaliation.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'Michigan ESTA workplace poster', meta: 'Michigan LEO', href: 'https://www.michigan.gov/leo' },
      { title: 'WSI Earned Sick Time policy', meta: 'PDF · Internal', href: '#' }
    ] }
  ]
},
{
  id: 'posting-jobs', title: 'Posting Jobs Through Avionte', cat: 'Avionte', mins: 20,
  summary: 'Title, write and post a job to the WSI website, free job boards and Indeed, then edit and repost it the right way.',
  lessons: [
    { type: 'steps', title: 'Set up the job order', mins: 4, intro: 'Every post starts from a job order. Get these four things right before you write a word of the description.',
      steps: [
        { title: 'Create the job order', text: 'Start with a job order that does not have any associates staffed to it. The easiest way is to clone an existing job for the client.' },
        { title: 'Title the job order', text: 'Indeed/Talroo jobs: DNU - Indeed/Talroo - Client name - Job title made public. Website and other boards only: DNU - Client name - Job title made public.', note: 'Adding "Indeed" to the title makes it easy to audit which jobs should be on Indeed and which need reposting.' },
        { title: 'Top section', text: 'Job owner can be removed to prevent an email notification for every application. Branch should be the generic branch name.', note: 'Use "Grand Rapids, MI", not "Grand Rapids, MI (Roskam)".' },
        { title: 'Pay rate', text: 'In the Operations and Financials widget, put the starting pay in the target pay field.', note: 'Min and max pay fields will not pull through when posted.' }
      ] },
    { type: 'steps', title: 'Write and post', mins: 5,
      steps: [
        { title: 'Job description', text: 'In the Job Posting Status and Options widget, select +. Choose your branch in Document Manager Folder, then the job description in Document. Remove any video links. If posting to Indeed, add your branch\'s IND# code at the bottom.', note: "Don't paste descriptions into this box; formatting won't carry to job boards. If the description you need isn't there, email marketing." },
        { title: 'Posting details', text: 'Confirm the city, state and zip (pre-loaded from the job order). Write the job title as it should appear publicly.', note: 'No extra keywords like "no THC testing", pay rates or shifts in the title.' },
        { title: 'External job boards', text: 'Every post goes to the WSI website automatically. For Indeed posts select ALL checkboxes (with the IND# code in place). For website-only posts select every checkbox except Indeed; the others are free.' },
        { title: 'Post job', text: 'Click Post Job. Posts can take a few hours to appear on the website or Indeed.' },
        { title: 'Toggles', text: 'Resume toggle: "yes" for quick applies, often "no" otherwise. Apply through Indeed: "yes" if the job is posted to Indeed.' }
      ] },
    { type: 'steps', title: 'Edit and repost', mins: 4, intro: "Edits change a post but don't repost it. Indeed posts should be reposted monthly so they don't look stale.",
      steps: [
        { title: 'Edit description, title or location', text: 'Click the eye icon in the Job Posting Status and Options widget, make the change and save.' },
        { title: 'Edit pay rate', text: 'Update target pay in Operations and Financials, then open the eye icon, make any change to the description (even a space) and save so the new rate pulls through.' },
        { title: 'Repost to Indeed: clone', text: 'A new job order is needed each time. Clone the job order you want to repost.', note: 'Reposting on the same job order keeps the original posting date.' },
        { title: 'Close the old job order', text: 'Set its status to "Indeed Close". This removes all its postings.' },
        { title: 'Post from the new job order', text: 'Follow the posting steps again. Website and free-board posts never need reposting.' }
      ] },
    { type: 'scenario', title: 'Scenario: a stale Indeed post', mins: 3,
      outro: 'Right title, fresh posting date, and the old job order is closed out so it\'s easy to audit.',
      steps: [
        { prompt: 'You\'re posting a Forklift Operator role for Acme Foods on Indeed. What should the job order be titled?',
          choices: [
            ['Forklift Operator - $18/hr - 2nd shift', false, 'That is closer to a public title, and even there pay and shift don\'t belong.'],
            ['DNU - Indeed/Talroo - Acme Foods - Forklift Operator', true, 'Indeed jobs carry "Indeed/Talroo" in the title so they\'re easy to audit.'],
            ['DNU - Acme Foods - Forklift Operator', false, 'That format is for website and free boards only.']
          ] },
        { prompt: 'Five weeks later the Indeed post looks old to job seekers. What do you do?',
          choices: [
            ['Add a space to the description and save.', false, "Edits don't repost or change the posted date."],
            ['Delete the post and repost it from the same job order.', false, 'The same job order keeps the original posting date.'],
            ['Clone the job order, close the old one as "Indeed Close", and post from the clone.', true, 'A new job order gives the post a fresh date.']
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 4, questions: [
      { q: 'Where does the starting pay go so it shows on the post?', o: ['Min pay field', 'Max pay field', 'Target pay field', 'Job description'], a: 2, e: 'Only target pay pulls through; min and max do not.' },
      { q: 'What must be added to the description for an Indeed post?', o: ['The recruiter\'s phone number', "Your branch's IND# code", 'The pay range', 'A video link'], a: 1, e: 'The IND# code at the bottom sponsors the Indeed post.' },
      { q: 'Which public job title follows the guidelines?', o: ['Assembler - No THC Testing', 'Assembler $17/hr', 'Assembler', 'Assembler - 3rd Shift'], a: 2, e: 'Titles should not include keywords, pay rates or shifts.' },
      { q: 'For a website-only post, which job boards do you select?', o: ['None', 'All except Indeed', 'Indeed only', 'All of them'], a: 1, e: 'All the free boards, everything except Indeed.' },
      { q: 'How often should Indeed posts be reposted?', o: ['Weekly', 'Monthly', 'Quarterly', 'Never'], a: 1, e: 'Monthly, using a new job order each time.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'Posting Jobs Through Avionte (SOP)', meta: 'PDF · 7 pages', href: 'posting-jobs-avionte.pdf' }
    ] }
  ]
},
{
  id: 'direct-hire', title: 'Direct Hire Job Orders in Avionte', cat: 'Avionte', mins: 20,
  summary: 'Create or clone a direct hire job order, start talent on it, and close it out at the right time.',
  lessons: [
    { type: 'steps', title: 'Create a new direct hire job order', mins: 5, intro: 'Create a new job order the first time you place a direct hire for a company or office. If a similar job exists under the same office, you can clone it instead.',
      steps: [
        { title: 'Start from the company profile', text: 'On the Contacts page of the Company profile, find the correct Office and click Create Job.' },
        { title: 'Client information', text: 'Most fields default from the contact and company. Pick the correct manager and billing contact.', note: "Company Office can't be changed later and decides which invoice the job appears on." },
        { title: 'Job details', text: 'Worksite address, workers comp code, Job Type: Direct Hire (Permanent), Job Status: Open, start date, available positions, expenses none, markup 0%.', note: "If the WC code isn't listed, check that it's set at the company level." },
        { title: 'Salary and fees', text: 'Target salary is the starting salary. Enter either a flat Placement Fee Amount or a Placement Fee %, then tab to calculate. Min/max salary only if there\'s a range.' },
        { title: 'Ownership and title', text: 'Job Branch: your branch. Sales Rep: who brought on the business. Job Owners: the AM. Job ID: none. Position Title includes the shift.' },
        { title: 'Notify and create', text: 'Send notification to no one, or a specific user. Then click Create Job.', note: 'Never notify the full branch; it includes outside departments.' }
      ] },
    { type: 'flashcards', title: 'Field values to remember', mins: 3, intro: 'Tap each card to flip it.',
      cards: [
        ['Job type', 'Direct Hire', 'Set Job Type to Direct Hire (Permanent).'],
        ['Mark-up', '0%', 'Markup is 0% for direct hire roles.'],
        ['Company office', 'Locked', "Can't be changed later. It sets which invoice the job lands on."],
        ['Notification', 'No one', 'Or one specific user. Never the full branch.'],
        ['Discounts & flat fees', '0', 'Both are 0 when you start talent.'],
        ['Pay basis', 'N/A', 'Pay basis is N/A on a direct hire start.']
      ] },
    { type: 'steps', title: 'Clone, start talent, close out', mins: 5,
      steps: [
        { title: 'Clone a job order', text: 'On the job you want to copy, click Create Clone or + next to Clones. Choose Yes to clone as a new job and No to the rest. Then update title, pay and start date.', note: 'Only clone from the same office/department, with up-to-date Operations and Financials. People hired to the original don\'t transfer.' },
        { title: 'Start talent', text: 'From the Talent Profile, choose Start Talent in Quick Actions and select the job. Enter start date, final annual salary, existing talent source, placement fee or percentage, sales rep (BD), recruiter rep and placement office.' },
        { title: 'Tell payroll about the fee', text: 'Use Notes to @mention payroll so the fee is added to the invoice.', note: 'Example: @Payroll - please add $5,000 placement fee to Dunder Mifflin\'s next invoice.' },
        { title: 'Keep it open until…', text: 'The associate leaves, or WSI sends the client its final invoice. If billing is 25% at day 1, 30, 60 and 90, close it after the 90-day invoice.' },
        { title: 'End the assignment', text: 'In Hired Details, click the edit pencil next to the associate and set Early Termination to Yes. See the SOP for the remaining fields.' }
      ] },
    { type: 'scenario', title: 'Scenario: a new placement', mins: 3,
      outro: 'The fee reaches the invoice and the job order stays open for the full billing schedule.',
      steps: [
        { prompt: "Your candidate accepted a $62,000 offer at a 20% placement fee. You've started talent on the job order. How do you make sure the fee gets invoiced?",
          choices: [
            ['Add it under Flat Fees on the start.', false, 'Flat Fees stay at 0. The fee goes in Placement Fee or Percentage.'],
            ['@mention payroll in the Notes with the fee and client.', true, 'That flags the fee for the client\'s next invoice.'],
            ['Send a notification to the full branch.', false, 'Full-branch notifications reach outside departments.']
          ] },
        { prompt: 'The contract bills 50% on day 1 and 50% at 60 days. It\'s day 35 and the associate is doing well. Should you close the job order?',
          choices: [
            ['Yes, the placement is successful.', false, 'WSI still has an invoice to send.'],
            ['No, keep it open until the 60-day invoice goes out.', true, 'Close it once the final invoice is sent, or if the associate leaves.'],
            ['Close it and reopen it at day 60.', false, 'Keep it open through the final billing date.']
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 4, questions: [
      { q: 'What markup do you enter for a direct hire role?', o: ['0%', '25%', 'The client\'s standard markup', 'Leave it blank'], a: 0, e: 'Direct hire markup is 0%.' },
      { q: 'Which field cannot be changed after the job order is created?', o: ['Start date', 'Available positions', 'Company Office', 'Job description'], a: 2, e: 'Company Office is locked and sets the invoice.' },
      { q: 'Who should receive the job creation notification?', o: ['The full branch', 'No one, or a specific user', 'The client', 'Payroll'], a: 1, e: 'Never the full branch.' },
      { q: 'When can you clone instead of creating new?', o: ['Any time', 'When a similar job exists under the same office/department', 'Only for temp jobs', 'Only if someone is already hired to it'], a: 1, e: 'Cloning only works within the same office/department.' },
      { q: 'Who goes in Recruiter Rep when starting talent?', o: ['The BD rep', 'The branch manager', 'The person who invited the candidate in', 'Payroll'], a: 2, e: 'Sales Rep is BD; Recruiter Rep invited the candidate.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'Direct Hire Job Orders in Avionte (SOP)', meta: 'PDF', href: 'direct-hire-job-orders.pdf' }
    ] }
  ]
},
{
  id: 'client-onboarding', title: 'New Client Onboarding & Company Profile Maintenance', cat: 'Account management', mins: 25,
  summary: 'From discovery meeting to a set-up company profile, the first 30 days, and keeping account details current.',
  lessons: [
    { type: 'text', title: 'Prospecting and discovery', mins: 4,
      paras: [
        'Business Development (BD) prospects and secures a Discovery Meeting. By then BD should have a general idea of the client\'s size, what they do and what they need.',
        'BD and the potential Account Manager (AM) attend the meeting together. Topics to cover:'
      ],
      chips: ['Staffing challenges', 'Pay rates', 'Shifts and break times', 'Facility tour', 'Workers comp / risk assessment', 'Job descriptions and requirements', 'Openings and seasonality', "Associate's first day", 'Benefits upon hire-in', 'PPE required', 'Start days and orientation', 'Info needed on confirmations', 'Clock in/out and timeclock', 'Bonuses for temps', 'Additional solutions we could offer'],
      callouts: [{ title: 'After the meeting', text: 'BD handles negotiations and gets the contract signed.', tone: 'red' }] },
    { type: 'steps', title: 'Once the contract is signed', mins: 5,
      steps: [
        { title: 'AM: thank the client', text: 'Send a follow-up email thanking them for their time and sharing contact info.' },
        { title: 'AM: orientation and marketing', text: 'Create the orientation/assignment sheet with the BM and BD, request a roadmap from WSI marketing, and send marketing the job description.' },
        { title: 'Create the company record', text: 'AM creates it for Kzoo and BC markets. BD creates it for Detroit, Sturgis, GR and Holland, confirms the WC code with Jade, and uploads the contract.', note: 'Reach out to Tracie, Sarah Hoffman and Training for WC code setup if needed.' },
        { title: 'AM: contacts, jobs and notes', text: 'Create company contacts and job orders, add openings to the Open Orders/Quick Info sheet, and upload discovery meeting notes to the company record.' },
        { title: 'AM: present to the team', text: 'Cover shifts, requirements, pay rates, background/drug screening policy and the orientation process.' },
        { title: 'BD: special markups', text: 'Bonus and referral markups must be approved by Steve Beebe and documented on the Company Overview tab.' }
      ] },
    { type: 'flashcards', title: 'Who does what', mins: 3, intro: 'Tap each card to see who owns it.',
      cards: [
        ['Company record', 'Kzoo & BC', 'Account Manager creates it.'],
        ['Company record', 'Detroit, Sturgis, GR, Holland', 'Business Development creates it.'],
        ['WC code', 'Confirm', 'BD confirms the WC code with Jade.'],
        ['Bonus / referral markups', 'Approval', 'Approved by Steve Beebe.'],
        ['First 30 days', 'Client comms', 'AM owns it, cc\'ing the BM and BD.'],
        ['Overview tab updated', 'Tell payroll', 'Email payrollhrs@wsitalent.com with what changed.']
      ] },
    { type: 'steps', title: 'Follow-up, first 30 days, account changes', mins: 5,
      steps: [
        { title: 'Fill the Company Overview tab', text: 'Follow up with the client for anything missing, then email payroll announcing the new client with the overview details.' },
        { title: 'Update the tab the right way', text: "Don't delete outdated info. Strike it through, add the new info with the date in bold, and email payrollhrs@wsitalent.com.", note: 'Strikethrough keeps the history for tracking.' },
        { title: 'First 30 days', text: 'The AM owns client communication and cc\'s the BM/BD until they decide to drop off. BD, BM and AM then complete a 30-day assessment: what worked, roadblocks, takeaways and next steps.' },
        { title: 'Contact changes', text: 'HR contact: tell BM, BD and team, update internal docs, Avionte contacts, job orders and overview tab. Invoice contact: alert payroll, then update Avionte.' },
        { title: 'Payroll changes', text: 'Confirm the change and effective dates with the client in writing, save the email as a PDF to the company profile, alert payroll, update job descriptions, job posts, internal docs and job orders.', note: 'Loop in marketing, with your BM, if the change is worth announcing.' }
      ] },
    { type: 'scenario', title: 'Scenario: a pay rate change', mins: 3,
      outro: 'The change is documented in writing, the history is preserved, and payroll knows before the first paycheck.',
      steps: [
        { prompt: 'On a call, your client says they\'re raising the pay rate $1 an hour starting in two weeks. What do you do first?',
          choices: [
            ['Update all the job orders right away.', false, 'Confirm it in writing first.'],
            ['Ask for written confirmation with effective dates and save the email as a PDF to the company profile.', true, 'Written confirmation comes first, then payroll and updates.'],
            ['Mention it to payroll next time you talk.', false, 'Payroll needs it in writing, from the client, ASAP.']
          ] },
        { prompt: 'The Company Overview tab still shows the old rate. How do you update it?',
          choices: [
            ['Delete the old rate and type the new one.', false, 'Deleting loses the history.'],
            ['Strike through the old rate, add the new one with the date in bold, and email payrollhrs@wsitalent.com.', true, 'That keeps history and alerts payroll.'],
            ['Leave it and note the change in the job order.', false, 'The overview tab is where payroll looks.']
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 4, questions: [
      { q: 'Who creates the company record for a new Grand Rapids client?', o: ['Account Manager', 'Business Development', 'Payroll', 'Marketing'], a: 1, e: 'BD handles Detroit, Sturgis, GR and Holland.' },
      { q: 'Who must approve bonus or referral markups?', o: ['The AM', 'Jade', 'Steve Beebe', 'The client'], a: 2, e: 'Steve Beebe approves them; document them on the overview tab.' },
      { q: 'How do you update outdated info on the Company Overview tab?', o: ['Delete it', 'Strikethrough, add new info with the date in bold', 'Add a comment', 'Ask payroll to update it'], a: 1, e: 'Strikethrough keeps historical tracking.' },
      { q: 'Who owns client communication in the first 30 days?', o: ['BD', 'BM', 'AM, cc\'ing BM/BD', 'Marketing'], a: 2, e: 'The AM owns it; the BM/BD decide when to come off cc.' },
      { q: 'For a pay rate change, what gets saved to the company profile?', o: ['A PDF of the client\'s email confirmation', 'Call notes', 'The new job description', 'Nothing'], a: 0, e: 'Save the written confirmation as a PDF in Avionte.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'New Client Onboarding & Company Profile Maintenance (SOP)', meta: 'PDF', href: 'new-client-onboarding.pdf' },
      { title: 'Payroll Processing Details Template', meta: 'Company Overview tab', href: '#' }
    ] }
  ]
},
{
  id: 'payroll-hours', title: 'Submitting Payroll Hours', cat: 'Payroll', mins: 10,
  summary: 'What to collect from the client each week so payroll gets it right the first time.',
  lessons: [
    { type: 'text', title: 'What to gather from the client', mins: 3,
      paras: ['Each week, gather the following from the client (as applicable):'],
      bullets: [
        ['Prior week hours', 'Hours worked by each associate.'],
        ['Training hours', "Include the wage if it's different from the standard rate, and tell payroll whether the hours are billed to the client."],
        ['Show up pay', "List the associate's name and number of show up pay hours in the body of your email to payroll."],
        ['Bonus payouts', 'Attendance, milestone or holiday bonuses. Tell payroll if they carry a different markup.'],
        ['Deductions', 'Unreturned uniforms, badges, tools, etc.'],
        ['ESTA time', 'Added to branch spreadsheets.']
      ],
      callouts: [
        { title: 'Kronos, uAttend or Simple VMS?', text: 'Use the separate training guide for your client\'s platform to view time cards and run a payroll report.' },
        { title: 'Changes coming?', text: "Email payroll ASAP about upcoming pay rate, bonus or markup changes, and ask the client if the invoice needs changes, like separate bonus line items and how they're titled.", tone: 'red' }
      ] },
    { type: 'flashcards', title: 'Quick checks', mins: 2, intro: 'Tap each card to flip it.',
      cards: [
        ['Training hours', '2 things', 'The wage if different, and whether it\'s billed to the client.'],
        ['Show up pay', 'Email body', 'Name and number of hours, in your email to payroll.'],
        ['Bonuses', 'Markup?', 'Tell payroll if a bonus has a different markup.'],
        ['ESTA time', 'Spreadsheet', 'Add it to the branch spreadsheet.']
      ] },
    { type: 'scenario', title: 'Scenario: a holiday bonus', mins: 2,
      outro: 'Payroll has what it needs, and the invoice matches what the client expects.',
      steps: [
        { prompt: 'Your client is paying a $100 holiday bonus to every associate this week and wants it shown separately on the invoice. What do you do?',
          choices: [
            ['Add it to the hours report and let payroll figure it out.', false, 'Payroll needs to know the markup and invoice details in advance.'],
            ['Email payroll now with the bonus, its markup, and how the client wants it titled on the invoice.', true, 'Advance notice plus invoice details gets it right the first time.'],
            ["Wait until next week's submission.", false, 'Notify payroll as soon as you know.']
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 3, questions: [
      { q: 'Where do you report show up pay?', o: ['On the timecard', 'In the body of your email to payroll', 'In Avionte notes', 'On the branch spreadsheet'], a: 1, e: 'List the name and hours in your email to payroll.' },
      { q: 'Where does ESTA time go?', o: ['Branch spreadsheets', 'The job order', 'The client invoice', 'Nowhere'], a: 0, e: 'ESTA time is added to branch spreadsheets.' },
      { q: 'When should payroll hear about an upcoming markup change?', o: ['On the next invoice', 'ASAP, in advance', 'After the client approves the invoice', 'At month end'], a: 1, e: 'Email payroll as soon as you know.' },
      { q: 'What deductions should you collect?', o: ['Taxes', 'Unreturned uniforms, badges, tools', 'Late arrivals', 'Missed breaks'], a: 1, e: 'Collect deductions for unreturned items.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'Submitting Payroll Hours (SOP)', meta: 'PDF', href: 'submitting-payroll-hours.pdf' },
      { title: 'Kronos Training Guide', meta: 'Internal', href: '#' },
      { title: 'uAttend Training Guide', meta: 'Internal', href: '#' },
      { title: 'Simple VMS Training Guide', meta: 'Internal', href: '#' }
    ] }
  ]
},
{
  id: 'audits', title: 'Auditing Active Consultants and Missing Hours Reports', cat: 'Payroll', mins: 15,
  summary: 'Find associates who should be terminated or may be missing hours, and keep assignments accurate.',
  lessons: [
    { type: 'steps', title: 'Run the Active Consultants report', mins: 3, intro: 'Purpose: identify associates showing as active who need to be terminated or may be missing hours, and audit every assignment for accuracy and consistency.',
      steps: [
        { title: 'Open the report', text: 'Analyze → Active Consultants.' },
        { title: 'Set the filters', text: 'Enter the applicable Office, Company and Date Range.', note: "For payroll, use last week's pay period for your client (likely Mon–Sun, possibly Sun–Sat)." },
        { title: 'Review applicants', text: 'Find terminated associates still showing as actively staffed and end their assignments in Avionte.' },
        { title: 'Large clients', text: 'Export to Excel, add the list of associates on payroll for the week, and remove duplicates.' }
      ] },
    { type: 'text', title: 'What to audit', mins: 4, paras: ['Check each of these on every assignment:'],
      bullets: [
        ['Dates and end reasons', 'Start date; end date is 2099 or terminated; end reason (disregard NCNS-1st day, cancel prior to start, etc.).'],
        ['Rates', 'Sort by position so each rate matches: pay rate, markup %, bill rate, plus OT and DT pay, markup and bill.'],
        ['Assignment fields', 'Same across all assignments: job owner (AM), commission user 1 (AM), timesheet approver (internal branch), client rep (BD), company office.'],
        ['Associate', "Talent status active unless terminated; phone number isn't blank."]
      ] },
    { type: 'text', title: 'The Missing Hours report', mins: 2,
      paras: [
        'The Missing Hours report lists associates showing as staffed at a client who worked zero hours the prior week. Use it to find assignments that may need to be terminated in Avionte.'
      ],
      callouts: [{ title: 'Every Thursday', text: 'Each Branch Manager gets an automatic report by email showing Missing Hours for all clients, and sends it to their team for Account Managers to audit their own clients.', tone: 'red' }] },
    { type: 'scenario', title: 'Scenario: Thursday audit', mins: 3,
      outro: 'Assignments are accurate and nobody is staffed who shouldn\'t be.',
      steps: [
        { prompt: "Thursday's Missing Hours report shows Dana at your client with zero hours last week. The client says she quit on Tuesday. What do you do?",
          choices: [
            ['Leave it; she may come back.', false, 'The goal is to end assignments that should be terminated.'],
            ['End her assignment in Avionte with the correct end date and reason.', true, "That's exactly what the audit is for."],
            ['Delete her talent profile.', false, 'End the assignment; the profile is her record.']
          ] },
        { prompt: 'In the Active Consultants report, two Machine Operators at the same client have different bill rates. What next?',
          choices: [
            ['Sort by position and correct the assignment that doesn\'t match.', true, 'Rates should line up for each position.'],
            ['Ignore it; bill rates are payroll\'s job.', false, 'Rate accuracy is part of the AM audit.'],
            ['Average the two rates.', false, 'Match the correct rate for the position.']
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 3, questions: [
      { q: 'Where do you run the Active Consultants report?', o: ['Analyze → Active Consultants', 'Talent → Reports', 'Company → Overview', 'Payroll → Hours'], a: 0, e: 'Analyze → Active Consultants.' },
      { q: 'What date range do you use when auditing for payroll?', o: ['Last 30 days', "Last week's pay period for the client", 'Month to date', 'Year to date'], a: 1, e: "Use last week's pay period, usually Mon–Sun." },
      { q: 'Who is the Client rep on an assignment?', o: ['The AM', 'The internal branch', 'Business development', 'The associate'], a: 2, e: 'Client rep is business development.' },
      { q: 'When does the Missing Hours report arrive?', o: ['Monday', 'Every Thursday', 'Month end', 'On request'], a: 1, e: 'Branch Managers get it every Thursday.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'Auditing Active Consultants and Missing Hours Reports (SOP)', meta: 'PDF', href: 'auditing-active-consultants.pdf' }
    ] }
  ]
},
{
  id: 'medical-privacy', title: 'Medical Document Privacy', cat: 'Compliance', mins: 10,
  summary: 'Upload medical documents privately in Avionte and get written consent before sharing with a client.',
  lessons: [
    { type: 'steps', title: 'Uploading medical documentation', mins: 3, intro: 'Any medical document needs extra privacy steps when it goes into Avionte.',
      steps: [
        { title: 'Set privacy before uploading', text: 'Change document privacy to "Private" and document type to "Medical", then select Upload Document.' },
        { title: 'Change sharing', text: 'Once uploaded, select Change Sharing on the medical document.' },
        { title: 'Share with Front Office Admin', text: 'Select "Front Office Admin" from Shared Groups and click Save.', note: 'Only the uploader and each office\'s FOAs can view it. HR and Training can access it through the FOA group.' }
      ] },
    { type: 'text', title: 'Sharing with clients', mins: 3,
      paras: ['Medical documents cannot be shared with clients without explicit written consent from the associate. That consent must be:'],
      bullets: [
        ['Client-specific', "Obtained with the client's name specified, and re-completed for a new client."],
        ['Voluntary', 'Completed as needed, not as part of orientation for all associates.'],
        ['On file first', 'Signed and uploaded to the profile before anything is shared.']
      ],
      callouts: [
        { title: 'Paper form', text: 'Write the client\'s name on the Medical Documentation Release to Client form before the associate signs.' },
        { title: 'Avionte form', text: 'Onboarding tab → e-signature → Medical Documentation Release. Make sure auto-logout from Adobe is NOT checked, prefill the client name, and send. The associate completes it in their Avionte portal.' }
      ] },
    { type: 'scenario', title: 'Scenario: the client asks for a note', mins: 2,
      outro: 'The document stayed private until the associate gave written, client-specific consent.',
      steps: [
        { prompt: "A client asks for a copy of an associate's doctor's note. The associate signed a release last year for a different client. What do you do?",
          choices: [
            ['Send it; there\'s already a release on file.', false, 'Consent is client-specific and must be re-completed for a new client.'],
            ['Ask the associate to complete a new release naming this client, upload it, then share.', true, 'Signed, client-specific and on the profile before sharing.'],
            ['Summarize the note in an email instead.', false, 'Sharing the medical details still needs consent.']
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 2, questions: [
      { q: 'When do you set a medical document to Private?', o: ['After uploading', 'Before uploading', "Only if it's shared", 'Never'], a: 1, e: 'Set Private and Medical before you upload.' },
      { q: 'Which group should the document be shared with?', o: ['Everyone in the branch', 'Front Office Admin', 'The client', 'Payroll'], a: 1, e: 'Share with Front Office Admin.' },
      { q: 'Can the medical release be part of orientation for all associates?', o: ['Yes', 'No, it\'s voluntary and as needed', 'Only for new clients', 'Only in Avionte'], a: 1, e: "It's completed voluntarily, as needed." },
      { q: 'When sending the Avionte release form, the auto-logout box should be…', o: ['Checked', 'Not checked', "Doesn't matter", 'Removed'], a: 1, e: 'Make sure auto-logout is NOT checked.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'Medical Document Privacy (SOP)', meta: 'PDF', href: 'medical-document-privacy.pdf' },
      { title: 'Medical Documentation Release to Client', meta: 'PDF form · Internal', href: '#' }
    ] }
  ]
},
{
  id: 'associate-scenarios', title: 'Associate Scenarios: Nursing Mothers, Gender Identity, and Reasonable Accommodation', cat: 'Compliance', mins: 20,
  summary: 'How to handle three sensitive situations with associates and clients, respectfully and within the law.',
  lessons: [
    { type: 'text', title: 'Nursing mothers', mins: 4,
      paras: [
        "We can't ask whether someone needs time to pump. If you know someone is returning from maternity leave or just had a baby, you can ask:",
        '"<Client\'s name> provides you with one 30 minute lunch and two 15 minute breaks. Is this acceptable or do you require any additional time away from the job?"',
        "If the associate says they need extra time to pump, give the client a heads up. You may need to explain the Break Times for Nursing Mothers law:"
      ],
      bullets: [
        ['Applies to all hourly employees', ''],
        ['A private space that isn\'t a bathroom', 'No one can see inside. It doesn\'t have to be permanent, just available as needed.'],
        ['Reasonable break time', 'Different for every mother, including set up, pump time and clean up.'],
        ['Unpaid, unless…', "Breaks don't have to be paid, but if the employer already offers paid breaks and she pumps during them, that time is paid as usual."]
      ],
      callouts: [{ title: 'Go the extra mile', text: 'Check in with the associate to make sure they received proper accommodations at their worksite.', tone: 'red' }] },
    { type: 'text', title: 'Gender identity', mins: 3, paras: ['If you encounter a situation relating to gender identity:'],
      bullets: [
        ['Use preferred name and pronouns', 'In every conversation with or about the associate.'],
        ['Legal name in Avionte', 'The profile is the employee record, so it uses the full legal name. Update it once the associate provides proof of a name change.'],
        ['Consult HR', "Work with WSI's HR rep and your client's HR rep. Laws change often, so stay up to date."]
      ],
      callouts: [{ title: 'Go the extra mile', text: "Share the associate's preferred name or pronouns with the team by adding them to the talent profile headline.", tone: 'red' }] },
    { type: 'text', title: 'Reasonable accommodation', mins: 4,
      paras: ["Employees don't have to disclose a disability except to request an accommodation, and they can do so at any time. They aren't covered by ADA protections until they disclose."],
      bullets: [
        ["WSI's responsibility", 'Ask whether the candidate can perform the essential functions of the job, with or without reasonable accommodation.'],
        ["The candidate's responsibility", 'Let us know if an accommodation is required.'],
        ['Examples', 'A sign language interpreter for orientation, flashing lights added to an alarm. More on the Job Accommodation Network (JAN).'],
        ['After the offer only', 'Medical documentation, and any other disability-related questions, only after a job offer.']
      ],
      callouts: [{ title: 'Talking to the client', text: 'You may need to explain the client\'s duty to provide reasonable accommodation. Ask your manager for help, and use JAN and SOAR resources.' }] },
    { type: 'scenario', title: 'Scenario: three conversations', mins: 4,
      outro: 'Each associate was treated with respect, and each client got what it needed without overstepping.',
      steps: [
        { prompt: "Keisha is starting at a client next week, three months after having a baby. What's the right way to raise breaks?",
          choices: [
            ['"Will you need to pump at work?"', false, "We can't ask directly about pumping."],
            ['"The client provides one 30 minute lunch and two 15 minute breaks. Is this acceptable or do you require any additional time away from the job?"', true, 'This opens the door without asking directly.'],
            ["Don't bring it up and let the client handle it.", false, 'Asking the approved question helps you set up the client.']
          ] },
        { prompt: 'An associate tells you they go by Alex, not their legal name. What do you do in Avionte?',
          choices: [
            ['Change the legal name on the profile to Alex.', false, 'The legal name stays until proof of a name change.'],
            ['Keep the legal name, use Alex in every conversation, and add it to the talent profile headline.', true, 'Record accuracy plus respect for the associate.'],
            ['Nothing; it\'s personal.', false, 'Sharing the preferred name helps the whole team get it right.']
          ] },
        { prompt: "During an interview, before any offer, a candidate mentions they're hard of hearing. What can you ask?",
          choices: [
            ['Whether they can perform the essential functions of the job with or without reasonable accommodation.', true, "That's the only disability-related question before an offer."],
            ['For medical documentation of the condition.', false, 'Documentation can only be requested after a job offer.'],
            ['How severe the hearing loss is.', false, 'Disability-related questions wait until after an offer.']
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 4, questions: [
      { q: 'A lactation space must be…', o: ['A clean bathroom', 'Private and not a bathroom', 'A permanent room', 'Offsite'], a: 1, e: "Private, not a bathroom, and it doesn't have to be permanent." },
      { q: 'Must nursing breaks be paid?', o: ['Always', 'Never', 'Not required, unless she pumps during breaks that are already paid', 'Only for salaried staff'], a: 2, e: 'Paid breaks stay paid.' },
      { q: 'Which name goes on the Avionte profile?', o: ['Preferred name', 'Full legal name, until proof of a name change', 'Either', 'Initials only'], a: 1, e: 'The profile is the employee record.' },
      { q: 'When can medical documentation for an accommodation be requested?', o: ['At application', 'During the interview', 'After the job offer', 'Never'], a: 2, e: 'Only after the job offer.' },
      { q: 'Where can you find accommodation examples and guidance?', o: ['JAN and SOAR', 'Indeed', 'Avionte', 'The client handbook'], a: 0, e: 'The Job Accommodation Network and its SOAR tool.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'Associate Scenarios (SOP)', meta: 'PDF', href: 'associate-scenarios.pdf' },
      { title: 'Job Accommodation Network (JAN)', meta: 'askjan.org', href: 'https://askjan.org' },
      { title: 'Searchable Online Accommodation Resource (SOAR)', meta: 'askjan.org/soar', href: 'https://askjan.org/soar.cfm' }
    ] }
  ]
},
{
  id: 'onsite-visit', title: 'Guide to a Successful Onsite Visit', cat: 'Account management', mins: 12,
  summary: 'What to look for on a client tour, what to bring, and how to follow up with supervisors and HR while you are onsite.',
  lessons: [
    { type: 'text', title: 'Shadow an onsite tour', mins: 3,
      paras: ['Before you take over an account, shadow an Account Manager who takes you onsite to the client, introduces you to contacts and supervisors, and walks you through the plant in detail. Take notes! What to look for:'],
      bullets: [
        ['The work environment', 'Temperature, smells, size of the plant, cleanliness, employee attire.'],
        ['The work our associates do', 'Machines, assembly or quality inspection, forklift (and what kind), physical or lighter duty.'],
        ['How the work is set up', 'Standing or sit-down work, independent or part of a team.']
      ] },
    { type: 'flashcards', title: 'What to bring with you', mins: 2, intro: 'Tap each card to flip it.',
      cards: [
        ['From HR', 'Org chart', 'Ask your HR contact for an org chart with supervisor photos so you can recognize them onsite.'],
        ['Print', 'Roster', 'Active associates and who they report to, so you can follow up with the right supervisor in person.'],
        ['Hand out', 'Referral cards', 'Bring referral cards to share with supervisors.'],
        ['Bonus', 'WSI swag', 'Supervisors and associates appreciate recognizing you by your WSI attire.']
      ] },
    { type: 'text', title: 'Follow-ups while you are there', mins: 3,
      paras: ['Use the visit to close the loop in person.'],
      bullets: [
        ['Supervisors: know where your associates stand', 'Concerns brought to your attention, attendance issues, performance concerns, time off requests.'],
        ['Supervisors: unanswered emails', "If a supervisor hasn't replied to an email, note it and follow up in person."],
        ['HR: say hello', 'Stop in to ask how their week is going or touch base on open questions. Any face time that makes our presence known is a win.']
      ],
      callouts: [{ title: "Been a while since you've visited?", text: 'Grab their favorite coffee on your way in and drop it off as you say hello.', tone: 'red' }] },
    { type: 'scenario', title: 'Scenario: your first solo visit', mins: 2,
      outro: 'You showed up prepared, followed up in person, and made the most of your face time with the client.',
      steps: [
        { prompt: "You're heading to a client for your first solo visit. A supervisor hasn't answered your email about an associate's attendance. What do you bring and do?",
          choices: [
            ['Just stop by HR and head out.', false, 'Use the visit to follow up with supervisors too.'],
            ['Bring a printed roster with supervisors, the org chart and referral cards, and follow up with that supervisor in person.', true, "You'll know who to find, and you'll close the loop face to face."],
            ['Send another email from the parking lot.', false, "An unanswered email is exactly what to follow up on in person."]
          ] }
      ] },
    { type: 'quiz', title: 'Knowledge check', mins: 2, questions: [
      { q: 'What should you do before taking over an account?', o: ['Email the client an introduction', 'Shadow an AM on an onsite tour', 'Read the contract', 'Call each associate'], a: 1, e: 'Shadow an Account Manager who walks you through the plant and introduces you.' },
      { q: 'Why bring a roster of active associates?', o: ['For payroll', 'To follow up with the right supervisor in person', 'To hand out to HR', 'For badge access'], a: 1, e: 'It shows who each associate reports to.' },
      { q: 'What can you ask HR for to help identify supervisors?', o: ['Their phone list', 'An org chart with photos', 'The shift schedule', 'Badge photos of associates'], a: 1, e: 'An org chart with supervisor photos.' },
      { q: 'A supervisor never replied to your email. What now?', o: ['Escalate to your BM', 'Drop it', 'Note it and follow up in person on your visit', 'Email HR instead'], a: 2, e: 'Follow up in person while you are onsite.' }
    ] },
    { type: 'resources', title: 'Resources', mins: 1, items: [
      { title: 'Guide to a Successful Onsite Visit (SOP)', meta: 'PDF', href: 'onsite-visit.pdf' },
      { title: 'AM Client Relationship Guide', meta: 'Internal', href: '#' }
    ] }
  ]
}
];
