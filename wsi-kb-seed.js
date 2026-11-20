// WSI Learning: starter SOP library, used only the first time the SOP Library opens.
// After that the library lives in WSI storage (the "kb" document) and is edited in the app.
window.WSI_KB_SEED = {
"v": 1,
"sections": [
{
"id": "payroll",
"name": "Payroll & Timekeeping",
"desc": "Hours, reports and payroll audits.",
"color": "#EE3826"
},
{
"id": "avionte",
"name": "Avionte How-To",
"desc": "Job orders, postings and system steps.",
"color": "#3B6FB6"
},
{
"id": "clients",
"name": "Client Accounts",
"desc": "Onboarding, profiles and onsite visits.",
"color": "#B4681E"
},
{
"id": "hr",
"name": "HR & Compliance",
"desc": "Privacy, accommodations and associate care.",
"color": "#5B7F3A"
}
],
"sops": [
{
"id": "seed-submitting-payroll-hours",
"sectionId": "payroll",
"title": "Submitting Payroll Hours",
"summary": "Gather prior-week hours, specialty pay and adjustments from the client and submit them to payroll on time.",
"tags": [
"payroll",
"hours",
"timecards",
"kronos",
"uattend"
],
"body": "",
"fileUrl": "submitting-payroll-hours.pdf",
"fileName": "submitting-payroll-hours.pdf",
"fileType": "application/pdf",
"text": "Submitting Payroll Hours\n\nSubmitting Payroll Hours\nObtain All Necessary Payroll Info from the Client:\n\n*If your client utilizes Kronos, uAttend, or Simple VMS, please refer to the separate\ntraining guides below for these platforms to review instructions on how to view time cards\nand run a payroll report*\n• Gather the following information (as applicable):\n• Prior week hours worked by associate\n• Specialty pay\n• Training hours to be paid out (Include the wage they’re paid out at if\ndifferent from standard pay rates, and notify payroll whether or not\nthese hours are billed to the client)\n• Show up pay (This can be included in the body of the email you\nsubmit to payroll listing the associate’s name and the number of\nshow up pay hours to be paid out)\n• Bonus payouts for attendance/milestones/holidays (Notify payroll if\nthese bonuses should have a different mark-up rate)\n• Deductions for unreturned uniforms, badges, tools, etc\n• ESTA time (added to branch spreadsheets)\nNote: *Payroll should be notified in advance of any upcoming pay rate, bonus, or mark-up\nchanges. Send an email to the payroll team ASAP once you’re aware of a change, and find\nout from the client if any changes are needed on the invoice (example: separate line items\nfor bonuses and how the client wants the bonus titled on the invoice).\n\nKronos Guide:\n\nKronos Training Guide\n\nuAttend Guide:\n\nUAttend Training Guide\n\nSimple VMS Guide:\n\nSimple VMS Training Guide",
"updatedAt": 1794700000000,
"updatedBy": "WSI"
},
{
"id": "seed-auditing-active-consultants",
"sectionId": "payroll",
"title": "Auditing Active Consultants & Missing Hours Reports",
"summary": "Run the Active Consultants and Missing Hours reports to catch associates who need terminating or are missing hours.",
"tags": [
"audit",
"reports",
"missing hours",
"terminations",
"payroll"
],
"body": "",
"fileUrl": "auditing-active-consultants.pdf",
"fileName": "auditing-active-consultants.pdf",
"fileType": "application/pdf",
"text": "Auditing Active Consultants and\nMissing Hours Reports\n\nAuditing Active Consultants Report\nPurpose of the Report\n\n• To identify any associates that are showing as active that need terminated or may\nbe missing hours, audit all assignments for accuracy and consistency.\n\nHow to Run the Report\n\n• Analyze → Active Consultants\n• Office: Enter applicable offices\n• Company: Enter applicable client name\n• Date Range: Enter applicable date range\n• When auditing for payroll, use last week’s pay period based on your\nclient (likely Mon-Sun, possibly Sun-Sat)\n\nWhat to Look For\n\n• Review applicants\n• Review applicant column to identify any terminated associates who are still\nshowing as actively staffed and end their assignments in Avionte as needed\n• For large clients, export to excel and add list of associates on\npayroll for the week, then remove duplicates\n• Start date\n• End date (confirm in 2099 or terminated)\n• End reason (disregard NCNS-1st day, cancel prior to start, etc.)\n• Audit assignments, including:\n• Rates: Sort by position to ensure that each rate aligns with the assignment\n• Pay rates\n• Markup %\n• Bill rates\n• OT: pay rate, markup %, bill rate\n• DT: pay rate, markup %, bill rate\n• Assignment: Should be the same across all assignments\n• Job owner (AM)\n• Commission user 1 (AM)\n• Timesheet approver (internal branch)\n• Client rep (business development)\n• Company office (should match position, if applicable)\n• Associate:\n• Talent status: Should be active unless terminated\n• Phone number: Should not be blank\n\nAuditing Active Consultants and\nMissing Hours Reports\n\nAuditing Missing Hours Report\nPurpose of the Report\n\n• The Missing Hours report provides a list of associate names that are currently\nshowing as staffed at a client that are showing as having worked zero hours the\nprior week. The intention of this audit is to identify any individuals whose\nassignments may need to be terminated in Avionte.\n\nHow to Access the Report\n\n• Each Branch Manager receives an automatic “push” report to their email every\nThursday showing Missing Hours for all clients. The Branch Manager will send this\nreport out every Thursday to their teams for Account Managers to audit for their\nindividual clients.",
"updatedAt": 1794700000000,
"updatedBy": "WSI"
},
{
"id": "seed-direct-hire-job-orders",
"sectionId": "avionte",
"title": "Direct Hire Job Orders in Avionte",
"summary": "Create or clone a direct hire job order from the company's Contacts page and fill in every required field.",
"tags": [
"avionte",
"job order",
"direct hire",
"clone"
],
"body": "",
"fileUrl": "direct-hire-job-orders.pdf",
"fileName": "direct-hire-job-orders.pdf",
"fileType": "application/pdf",
"text": "Direct Hire Job Orders in Avionte\n\nDirect Hire Job Orders in Avionte\nCreating a New Direct Hire Job Order\nA brand new direct hire job order must be created if you are creating a direct hire job order for the\nfirst time for a company or office within a company.\nIf you have a similar job already created under the same company office, you can choose to clone the job\norder instead of creating a new one.\nTo create a new direct hire job order:\nFrom the “Contacts” page of the Company profile, locate the correct “Office” and click “Create\nJob.”\n\nClient Information\n\nA fly out will appear prompting you to enter the details of the Job Order. Most of this information\nwill default based on the Contact and Company profile associated with the Job Order:\n• Company Name\n• Manager name - select the correct manager from the drop-down (make sure the office/dept. is\naccurate, as well)\n• Company Office - *select the correct location or department as this cannot be changed later and\nwill determine which invoice the job is included on*\n• Billing Contact - select correct Billing Contact or use Manager’s info\n• Address & Billing Address\n\nDirect Hire Job Orders in Avionte\n\nJob Details\n\n• Worksite Address - where associates will report to work each day (will show in the drop down if\nalready added as an option for that “office”\n• If you choose to create a NEW Worksite Address, another small fly out will appear\nto enter the information\n• Workers Comp Code - Select correct WC Code from drop-down. If the correct one is not\nshowing as an option, check to make sure it’s been entered at the Company level.\n\n• • • • • • • Job Type - Direct Hire (Permanent)\nJob Status - Open\nStart Date - Associate’s first day of work\nAvailable Positions - # of openings, this can be edited later in the Job Details page\nExpenses - None unless there are expenses associated to that job\nMark-up Percentage - 0% for direct hire roles\nMinimum/Maximum Salary - can be left blank unless you are hiring for a role that offers a\nsalary range\n\nDirect Hire Job Orders in Avionte\n\n• • • • • • • Target Salary - starting salary of role\nPlacement Fee Amount - enter flat fee based on agreed upon direct hire fee OR\nPlacement Fee % - enter fee %, hit tab to auto-populate placement fee amount\nJob Branch - your branch\nSales Rep - Sales Rep that brought on the business\nJob Owners - who is the AM for this position / needs to be notified of applicants\nJob ID - none\n\nPosition Title & Skills\n\n• Position Title - Job Title (including shift)\n\nDirect Hire Job Orders in Avionte\n\nJob Description & Notes\n\n• This section is not required, but a job description or job notes can be added to this section.\n\nNotification\n\n• Send a notification email to: No one (or select a specific user that needs to be notified that\nthe job has been created).\n• Do not send out a notification to the full branch as this will include outside\ndepartments.\n\nCreate Job\n• Click “Create Job” to create the job order!\n\nDirect Hire Job Orders in Avionte\n\nCloning a Job Order\nTo create a new job order that is\nsimilar to an existing job order, you\ncan clone the job rather than creating\na new one (anyone already hired to\nthe existing job order will not transfer\nto the new job order).\nFrom the job order you want to clone, click the “Create\nClone” or “+” button next to “Clones” on the top right of\nthe job order.\n• Select “Yes” to clone as a new job, and “No” to the\nremaining options.\nOnce the new job order is created, you can adjust job\norder details such as title, pay rate, and start date.\nBe sure the job order you’re cloning:\n• Belongs under the same office/department as the\njob you’re needing to create.\n• If this is not the case, you will need to\ncreate a new job using the steps above.\n• Has an up to date markup, salary, and other\n“Operations and Financials” information.\n• If information for the new job needs to be\ndifferent from the job you’re cloning, be\nsure to update this immediately after\ncloning the job and changing the title.\n\nDirect Hire Job Orders in Avionte\n\nStart Talent on Direct Hire Job Order\n• From the Talent Profile, select “Start Talent” from the Quick Actions menu.\n\n• A fly out will appear for you to select a job to staff them to. You can Search by job title,\ncompany, etc. to locate the job you wish to staff them to. Once you’ve located the job, click\non the circle under Select beside the correct job.\n\nFrom the flyout, enter the following information:\n• • • • • • • • • • • Start Date - Associate’s first day\nSalary - Final agreed annual salary for associate\nTalent Source - Use existing talent source\nDiscounts - 0\nPlacement Fee - Agreed upon placement fee with client OR\nPercentage - Calculates placement fee based on percentage of salary\nFlat Fees - 0\nSales Rep - Person who brought on the business (BD)\nRecruiter Rep - Person who invited the candidate in for the position\nPlacement Office - your branch/client branch\nPay Basis - N/A\n\nDirect Hire Job Orders in Avionte\n\n• Notes - Enter any notes about the position or first day\n• This section can also be used to @mention the payroll team to make them aware\nof a direct hire fee that needs to be added to the client’s invoice.\n• Example: @Payroll - please add $5,000 placement fee to Dunder Mifflin’s\nnext invoice\n• Notify - No one or add an individual user who needs to be notified within WSI\n• Click “Start Talent”\n\nDirect Hire Job Orders in Avionte\n\nEnding a Direct Hire Job Order\nDirect hire job orders should be kept open until one of the following occurs:\n1. The associate leaves the position OR\n2. The associate reaches the final date when WSI invoices the client\na. For example, if the contract is to bill the client 25% after the associates 1st day,\n25% at 30 days, 25% at 60 days, and 25% at 90 days, the assignment should be\nclosed out once we invoice the client the final 25% at the 90 day mark.\n\n• From the Hired Details, click the edit pencil next to the name of the associate whose\nassignment you need to end.\n\n• Under “Early Termination,” select “Yes.” This will cause the end date and reason for early\ntermination menus to appear.\n• If the associate leaves the position before our final billing date, enter their last\ndate worked and reason for leaving the job in these menus.\n• If the assignment is being closed due to the associate reaching the final billing\ndate with the client, enter the last date of billing (for example, their 90th day of\nemployment) as their end date and “Voluntary Quit - Hired by Company” for the\nearly termination reason.\n\n• In the Notes section, add any notes to payroll or clarifications regarding the end of the\nassignment.\n\nDirect Hire Job Orders in Avionte\n\n• Save your changes to close the assignment and add the notes to the Activities tab.",
"updatedAt": 1794700000000,
"updatedBy": "WSI"
},
{
"id": "seed-posting-jobs-avionte",
"sectionId": "avionte",
"title": "Posting Jobs Through Avionte",
"summary": "Clone a job order, title it for Indeed/Talroo, and publish the posting so it reaches job boards.",
"tags": [
"avionte",
"indeed",
"talroo",
"job posting",
"recruiting"
],
"body": "",
"fileUrl": "posting-jobs-avionte.pdf",
"fileName": "posting-jobs-avionte.pdf",
"fileType": "application/pdf",
"text": "Posting Jobs Through Avionte\n\nPosting Jobs through Avionte\nPosting Process\n1. Create job order: Start with a job order that does not have any associates staffed to\nit. The easiest way to do this is to clone an existing job for the client you’re wanting\nto post a job for.\n\n2. Title the job order\na. Title for jobs on Indeed/Talroo: DNU - Indeed/Talroo - Client name - Job\ntitle made public\ni. Adding “Indeed” to the title of the job order helps easily audit what\njobs should be visible on Indeed and sort by which jobs need to be\nreposted regularly.\nb. Title for jobs on website / other job boards only: DNU - Client name - Job\ntitle made public\n3. Top section of job order\na. Job owner: Can be removed to prevent email notifications for each\napplication.\nb. Branch: Should be the generic branch name for your branch\ni. E.g. “Grand Rapids, MI” not “Grand Rapids, MI (Roskam)”\n4. Pay rate: From the Operations and Financials widget of the job order, put the\nstarting pay for the position in the target pay field.\na. Note: Min and max pay fields will not pull through when posted\n5. Job description: From the Job Posting Status and Options widget of the job order,\nselect the + button to begin posting the job.\n\nPosting Jobs Through Avionte\n\na. From the Document Manager Folder drop down, select your branch. Then, in\nthe Document drop down, select the job description for the job you’d like to\npost.\ni. Note: If the job description you need is not available, email marketing\nto initiate a new job description.\nb. Confirm that the job description has all the correct details, making changes\nas needed.\ni. Remove any links to videos that may be included in job descriptions.\nii. If posting the job to Indeed, add your branch’s IND# code to the\nbottom of the job description.\niii. Do not copy and paste job descriptions in this box as formatting does\nnot carry through to job boards once posted.\n\nPosting Jobs Through Avionte\n\n6. Job posting details\na. Area: Once your job description looks correct, scroll down and enter the city,\nstate and zipcode where you want the job to be posted. This will pre-load\nwith information from the job order, you only need to change it if you’re\nposting the job in a different city.\nb. Job title: Write the job title as you’d like it to appear on our website/job\nboards. Job titles should not include additional keywords such as “no THC\ntesting,” pay rates, or shifts\n\n7. External job boards: Turn external job boards on by clicking the checkbox. All\nposted jobs will automatically go to our website, and can be added to additional job\nboards using this section.\n\na. Indeed posts: Select ALL check box options (Confirm that the IND# code has\nbeen added to the job description to sponsor the post)\nb. Website only posts: Select all checkboxes EXCEPT for Indeed. All job boards\naside from Indeed These platforms are free and pull from different websites\nto create more visibility for our posts.\n\nPosting Jobs Through Avionte\n\n8. Post job: Click the post job button to finalize the job post.\na. Note: Job posts will not immediately appear on the website or Indeed. These\nmay take up to a few hours to be visible. You will be able to see which job\nboards you selected from the job posting status and options widget.\n9. Toggles\na. Resume toggle: This toggle is used to determine if you’d like to require a\nresume for candidates to apply. This toggle should be “yes” for quick applies,\nand is oftentimes “no” for other posted jobs.\nb. Apply through Indeed: Toggle to “yes” if the job is being posted to Indeed.\n\nIf job is posted to website and free job boards only, it should look like this once complete:\n\nIf job is posted to Indeed in addition to the website and free job boards, it should look like\nthis once complete:\n\nPosting Jobs Through Avionte\n\nEdit Job Posting\nJob description / title / location: Click the eye icon from the job posting status and options widget,\nmake the necessary change, and save.\nPay rate: Update the target pay rate in the operations and financials widget of the job order. Then,\nclick the eye icon and make any change in the job description (even adding a space will work), and\nclick save to make the new pay rate pull through.\nNote: Making edits to a job post will not “repost” the job on Indeed or change the date it\ndisplays as being posted. This will only make the change.\n\nReposting Process\nWebsite / free job boards: If a job is only posted to our website and free job boards, it does not\nneed to be reposted. Jobs on our website do not show how long they have been active.\nIndeed: If a job is posted on Indeed, best practice is to repost these monthly. This ensures\nour jobs on Indeed do not appear out of date to job seekers based on how long it has been\nposted. To repost on Indeed, a new job order must be used each time in order for the\nposting date to be updated as any postings deleted and reposted to the same job order will\ndisplay the original date it was posted after reposting.\nNote: To remove a job post from Indeed but keep it posted on the website, job posts\nmust also be completely deleted in Avionte and reposted. Follow the same process\nlisted below to remove an Indeed post and repost to the website to avoid confusion\nwhen the job is later reposted to Indeed.\n1. Clone the job order: Use the job order you’d like to repost to create a duplicate job order.\n2. Close the previously used job order: Once a job order has been used for posting, it cannot\nbe used again. To more easily track which job orders have already been used, any job\norders that are being reposted should be closed with the status “Indeed Close.” Select this\nstatus from the drop down menu beneath the job title that defaults to “open” and confirm\nthat you’d like to close the job, which will remove all job postings as well.\n\n3. Post from the new job order: Follow the steps above to repost the job using the newly\ncreated job order.",
"updatedAt": 1794700000000,
"updatedBy": "WSI"
},
{
"id": "seed-new-client-onboarding",
"sectionId": "clients",
"title": "New Client Onboarding & Company Profile Maintenance",
"summary": "From prospecting and the discovery meeting through setting up and maintaining the company profile.",
"tags": [
"onboarding",
"new client",
"discovery meeting",
"company profile",
"business development"
],
"body": "",
"fileUrl": "new-client-onboarding.pdf",
"fileName": "new-client-onboarding.pdf",
"fileType": "application/pdf",
"text": "New Client Onboarding & Company\nProfile Maintenance\n\nNew Client Onboarding & Company\nProfile Maintenance\nProspecting\n• Business Development (BD) prospects and secures “Discovery Meeting” with potential client\n• From conversations leading up to the meeting getting set, BD should have a general idea of\nclient size, what they do, client needs, etc.\n\nDiscovery Meeting\n• Business Development and potential Account Manager (AM) present at discovery meeting\n• Discuss with potential client:\n• Staffing challenges\n• Pay rates\n• Shifts/break times\n• Facility tour\n• Workers comp/risk assessment\n• Job descriptions and requirements\n• Number of openings and seasonality\n• Tour facility\n• Details about associate’s first day\n• Additional solutions we could offer\n• Benefits upon hire in\n• PPE required\n• Additional info for successful placements\n• Ideal days to start associates and orientation process\n• Information needed on confirmations\n• Associate clock in/out process & timeclock needs\n• Any bonuses offered for temporary associates\n• BD handles negotiations and gets the contract signed\n\nUpon a Signed Contract\nAccount Manager Responsibilities\n\n• AM sends follow up email to client thanking them for their time and sharing contact info\n• AM creates orientation/assignment sheet and request roadmap from WSI marketing team\n• Collaboration with BM and BD to ensure all necessary info is included\n• AM sends job description to the WSI marketing team\n• AM creates company record in Avionte (for Kzoo and BC markets)\n• Reaches out to Tracie, Sarah Hoffman, and Training for WC code setup if needed\n• Once company record is created\n• AM creates company contacts in Avionte\n• AM creates job orders in Avionte\n\nNew Client Onboarding & Company\nProfile Maintenance\n\n• AM adds current openings to the Open Orders/Quick Info sheet for office\n• AM uploads notes from discovery meeting to company record via documents tab or adding\nactivity to contact profile in Avionte\n• AM presents to the team on their new client and the openings\n• Ensures the team is aware of shifts, requirements, pay rates, background/drug screening\npolicy, orientation process, and any additional details the team should know\n\nBusiness Development Responsibilities\n• BD creates company record in Avionte (for Detroit, Sturgis, GR, and Holland markets)\n• Reaches out to Jade to confirm what the WC code will be for this client\n• Reaches out to Tracie, Sarah Hoffman, and Training for WC code setup if needed\n• Uploads contract\n• BD addresses any questions regarding markups on bonuses or client referrals\n• All bonus/referral markups must be approved by Steve Beebe\n• Document any unique markups on Company Overview Tab in Avionte\n\nFollow Up Communication\nAM follows up with client for any missing information needed in Avionte Company Overview Tab: Payroll\nProcessing Details Template for Company Overview Tab in Avionte\n• AM sends email to payroll announcing new client with the overview details\n• Example email:\nHi, Payroll!\nExciting news out of BC - we have a new client! II Stanley, here is the company profilehttps://wks.myavionte.com/app/#/company/14836223/ We have our first candidate starting on Monday, so we\nwill have a payroll report starting the WB 11/24!\nI included this information in the overview tab, but figured I would get it all here as well\nWe will receive the\ntimesheets on Mondays and I will send them over to you. Invoices should be sent to ap@iistanleybc.com and\nJennifer_Bauer@Stanley-Electric.com, but any invoice inquiries should be sent to\njpinquiries@iistanleybc.com.\nPlease let me know if you have any questions at all!\n\nWhen updating information in the company overview tab:\n• Do not delete the outdated information, instead use the “strikethrough” tool to draw a line through\nthe outdated information (this keeps the data for historial tracking if needed)\n• Clearly note the new information using the data and bold text\n• Email payrollhrs@wsitalent.com to let them know that this tab has been updated and what\ninformation has changed\n\nNew Client Onboarding & Company\nProfile Maintenance\n\nFirst 30 Days of a New Client\nCommunication\nAM owns communication with client and cc’s BM/BD during the onboarding transition\n• BM/BD will determine when they can be removed from the cc’s\n\n30 Day Client Assessment\nCompleted by the BD, BM, and AM to discuss as a team for next steps:\n• Rate the client onboarding\n• What was successful? What were the roadblocks?\n• What could have gone better?\n• Key takeaways\n• Agree upon next steps with the client\n\nAccount Updates/Changes\nFrom time to time, changes occur with contacts, pay rates, policies, or other account details. When this\noccurs, the AM should conduct the steps below:\n\nHR Contact Change\n• Let your BM, BD, and team know\n• Update any internal documents that may contain this point of contact\n• Team quick info tab, onboarding documents, etc.\n• Update Avionte contact tab and open/filled job orders\n• Update Avionte company overview tab\n\nInvoice/Statement Contact Change\n• Alert the payroll team at payrollhrs@wsitalent.com\n• Update Avionte contact tab and open/filled job orders\n• Update Avionte company overview tab\n\nPayroll (Pay Rate, Markup, Overtime Rate, etc) Change\n• Let your BM, BD, and team know\n• Confirm the payroll and dates of effectiveness with the client in writing via email\n• Save the email confirmation from the client to a PDF and upload it to the company profile in\nAvionte\n• Alert the payroll team at payrollhrs@wsitalent.com\n• Alert the WSI marketing team if the change warrants a social medial announcement (work with your\nBM on this)\n• Update job descriptions and job posts on all job boards\n• Update any internal documents that may contain this payroll detail\n• Team quick info tab, onboarding documents, etc.\n\nNew Client Onboarding & Company\nProfile Maintenance\n\n• Update new and existing job orders (open & filled)\n• Confirm if the increased pay rate will be effective for existing associates and update these\nassignments as well once the new rate is effective\n\nPolicy Change\n• Let your BM, BD, and team know\n• Confirm the new policy and date of effectiveness with the client in writing via email\n• Save the email confirmation from the client to PDF and upload it to the company profile in\nAvionte\n• Alert the payroll team at payrollhrs@wsitalent.com, if applicable\n• Alert the WSI marketing team if the change warrants a social media announcement (work with your\nBM on this)\n• Update job descriptions and job posts on all job boards\n• Update any internal documents that may contain this policy\n• Team quick info tab, onboarding documents, etc.",
"updatedAt": 1794700000000,
"updatedBy": "WSI"
},
{
"id": "seed-onsite-visit",
"sectionId": "clients",
"title": "Guide to a Successful Onsite Visit",
"summary": "Shadow an onsite tour, learn the work environment and what to look for before you take over an account.",
"tags": [
"onsite",
"client visit",
"plant tour",
"account manager"
],
"body": "",
"fileUrl": "onsite-visit.pdf",
"fileName": "onsite-visit.pdf",
"fileType": "application/pdf",
"text": "Guide to a Successful Onsite Visit\n\nGuide to a Successful Onsite Visit\nShadow an Onsite Tour\n\n• Prior to taking over an account, shadow an Account Manager who takes you onsite\nto the client, introduces you to contacts and supervisors, and provides a detailed\nwalk through of the plant. Take notes! What to look for:\n• What is the work environment like?\n• Temperature, smells, size of the plant, cleanliness, employee attire\n• What type of work are our associates performing?\n• Are the associates operating machines, doing assembly or quality\ninspection work, are they operating a forklift and if so what kind, are\nthe positions physical or lighter duty, are the associates standing up\nor is sit down work offered, are they working independently or as\npart of a team?\n\nWhat to Bring With You\n\n• Ask your HR contact if they have a company Org Chart they could share that\nincludes photos of the supervisors so you’re able to identify them during visits.\n• Print out a roster of active associates and who they report to so you’re able to\nfollow up with the appropriate supervisor in person to ask how the associate is\nperforming on their team.\n• Referral cards to share with supervisors\n• If you own any WSI swag, supervisors and associates appreciate being able to\nrecognize you onsite by your WSI attire as a bonus\n\nFollow Ups with Supervisors\n\n• Know where your associates stand - do you need to chat with a supervisor about\nany concerns that were brought to your attention, attendance issues, performance\nconcerns, time off requests, etc.?\n• Have you emailed a supervisor and still not received a response back? Note this for\nyour visit and be sure to follow up with the supervisor in person\n\nFollow Ups with HR\n\n• Stop in to visit with your HR contacts to simply say hello and ask how their week is\ngoing or to touch base on any questions or items that may need addressed. Any\nform of face time with the client making our presence known is a win!\n• Has it been a minute since you’ve visited? Grab their favorite coffee on your way in\nto drop off as you say hello!\n\nAM Client Relationship Guide for additional resources on how to\n*Please visit the\nbuild relationships onsite and put your best foot forward as an Account Manager!",
"updatedAt": 1794700000000,
"updatedBy": "WSI"
},
{
"id": "seed-medical-document-privacy",
"sectionId": "hr",
"title": "Medical Document Privacy",
"summary": "Mark medical documents Private and Medical in Avionte and limit sharing to Front Office Admin.",
"tags": [
"medical",
"privacy",
"documents",
"avionte",
"hipaa"
],
"body": "",
"fileUrl": "medical-document-privacy.pdf",
"fileName": "medical-document-privacy.pdf",
"fileType": "application/pdf",
"text": "Medical Document Privacy\n\nMedical Document Privacy\nUploading Medical Documentation\n\nIf you are uploading any medical document, additional privacy steps will need to be taken when\nuploading the document to Avionte:\n\n1. Before uploading the document, change the document privacy to “Private” and the\ndocument type to “Medical.” Then select “Upload Document.”\n\n2. Once the document has been uploaded, select the “Change Sharing” button for the medical\ndocument.\n\n3. Select “Front Office Admin” from the “Shared Groups” list and click “Save.”\n\nUpdating the privacy settings in this way will allow the document to be viewed only by the person\nwho uploaded the document and the FOAs in each office. The document can also be accessed by\nHR and Training if needed by sharing with the Front Office Admin group.\n\nMedical Document Privacy\n\nSharing Medical Documentation with Clients\nWith the privacy that comes along with medical documentation, these documents cannot be\nshared with clients without explicit written consent from the associate. This consent must be:\n• Obtained with the client’s name specified (and re-completed if needed for a new client)\n• Completed voluntarily and as needed, not part of orientation for all associates\n• Signed and uploaded to the profile before sharing medical documentation\nTo obtain this consent, please use one of the following options:\n• Paper Form\n• Write the name of the client in the space provided before the associate signs the\nMedical Documentation Release to Client.pdf\nform:\n• Avionte Form\n• Select “Medical Documentation Release” from the e-signature drop down menu on\nthe onboarding tab.\n\n• Once you click send, you’ll receive a notice that the form must be pre-filled and\nasked if you’d like to be automatically logged out of Adobe once the form is sent. Be\nsure the box to automatically log out is NOT checked and click continue.\n\n• Prefill the document with the name of the client and click send, then continue at\nthe bottom of the screen.\n\n• The associate will need to login to their Avionte portal to complete the document.",
"updatedAt": 1794700000000,
"updatedBy": "WSI"
},
{
"id": "seed-associate-scenarios",
"sectionId": "hr",
"title": "Associate Scenarios: Nursing Mothers, Gender Identity & Accommodation",
"summary": "How to handle break time for nursing mothers, gender identity and reasonable accommodation requests.",
"tags": [
"accommodation",
"nursing mothers",
"gender identity",
"breaks",
"ada"
],
"body": "",
"fileUrl": "associate-scenarios.pdf",
"fileName": "associate-scenarios.pdf",
"fileType": "application/pdf",
"text": "Associate Scenarios\n\nAssociate Scenarios: Nursing mothers,\ngender identity, and reasonable accommodation\n• Extended Breaks or Lunch for Nursing Mothers\n• Although we can’t ask if they require time to pump, if you know that someone is\nreturning from maternity leave or just had a baby, you can ask,\n• “<Client’s name> provides you with one 30 minute lunch and two 15\nminute breaks. Is this acceptable or do you require any additional time\naway from the job?”\n• You will need to give the client a heads up if the associate discloses that they will\nneed this extra time away from the job to pump. There’s a chance you may also\nneed to educate the client on the “Break Times for Nursing Mothers” law, which:\n• Applies to all hourly employees\n• Employers are required to provide a place that is not a bathroom. It must\nbe completely private so that no one can see inside. This doesn’t have to\nbe a permanent space, it just needs to be made available as needed.\n• Requires a “reasonable” break time, recognizing how often and how\nmuch time is different for every mother. This takes into account set up,\npump time, and clean up.\n• The law does NOT require these breaks be paid, however, if the employer\nalready offers paid breaks and only pumps during this time, their time\nshould be paid as usual.\n• Go the extra mile: Check in on the associate to make sure that they have\nreceived proper accommodations at their worksite.\n\n• If you encounter a situation relating to gender identity:\n• Always use the associate’s preferred name and pronouns in conversation with or\npertaining to the associate.\n• Full legal names must be listed on the Avionte profile since this is their employee\nrecord, but can be updated once the associate provides proof of a name change.\n• Consult with WSI’s HR rep, your client’s HR rep, and work together to do your\nresearch. Laws are constantly changing and it’s crucial that you are up-to-date on\nany recent changes pertaining to the rights of all individuals.\n• Go the extra mile: Communicate the associate’s preferred name or pronouns to\nthe team by entering this information in their talent profile headline.\n\nAssociate Scenarios\n\n• How to communicate an associate’s request for reasonable accommodation\nto your client:\n• Remember that employees are not required to disclose their disability to an\nemployer except to request a job accommodation. An employee can tell their\nemployer about the disability at any time, it doesn’t have to be in the interview\nprocess. However, they are not covered by the protections of the ADA until they\ndisclose their disability.\n• It is WSI’s responsibility to ask if the candidate is able to perform the\nessential functions of the job with or without reasonable\naccommodation. However, it is the candidates responsibility to let us\nknow if accommodation is required.\n• Reasonable accommodations may include availability of a sign language\ninterpreter for orientation, the addition of flashing lights to an alarm, etc.\nAdditional examples can be found on the Job Accommodation Network\n(JAN).\n• Medical documentation supporting the accommodation request can only\nbe requested following the job offer.\n• We are only able to speak with the associate about any disability related inquiry,\naside from whether they can perform the essential functions of the job with or\nwithout reasonable accommodation, after they have been offered employment.\n• You may need to educate your client about their duty and responsibility to supply\nreasonable accommodation to an employee with a disability. Please reach out to\nyour manager for assistance with this conversation as needed and consult\nresources available through the Job Accommodation Network (JAN) and\nSearchable Online Accommodation Resource (SOAR).",
"updatedAt": 1794700000000,
"updatedBy": "WSI"
}
]
};
