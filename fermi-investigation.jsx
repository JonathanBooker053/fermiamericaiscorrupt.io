import { useState, useEffect, useRef, useCallback } from "react";

/* -------------------------------------------------------------
   FULL RESEARCH DATA - every entity from the investigation
------------------------------------------------------------- */
const NODE_DATA = {
  toby: {
    label: "Toby Neugebauer",
    sub: "CEO & Co-Founder, Fermi America",
    category: "person",
    flag: "HIGH RISK",
    flagColor: "#ef4444",
    icon: "👤",
    sections: [
      { title: "Background", items: [
        "Born: December 1, 1971",
        "Son of former U.S. Congressman Randy Neugebauer (TX-19, 2003-2017)",
        "Education: B.B.A. Finance, New York University",
        "Early career: Investment banker, Kidder Peabody & Co., Natural Resources Group",
        "Founded Windrock Capital (later sold to Macquarie Group)",
        "Co-founded Quantum Energy Partners (1998) with S. Wil VanLoh Jr.",
        "Resides in Dallas, TX; business interests in Puerto Rico",
        "Minority owner, Austin FC (MLS)",
      ]},
      { title: "Quantum Energy Partners", items: [
        "One of largest dedicated energy PE firms in the U.S.",
        "~$28 billion deployed across energy investments",
        "5 of first 6 funds ranked first quartile for net IRR",
        "Served as co-managing partner; board seats at Linn Energy, Legacy Reserves, others",
        "Later stepped back to advisory role on investment committee",
      ]},
      { title: "GloriFi (With Purpose Inc.) - BANKRUPT", items: [
        "Founded 2021: 'anti-woke' conservative-branded fintech / neobank",
        "Products included credit cards made from shell-casing material",
        "Backed by: Peter Thiel, Ken Griffin, Vivek Ramaswamy, Nick Ayers, Joe Lonsdale, Jeff Sprecher",
        "Raised ~$55M; SPAC merger LOI at $1.65B valuation",
        "Operated out of Neugebauer's 16,000 sq ft Dallas mansion modeled on White House",
        "Out-of-town employees slept in guest bedrooms",
        "WSJ investigation (Oct 10, 2022): allegations of on-the-job drinking after 5 PM",
        "P.F. Chang's incident (May 2022): police report filed; alleged threats to 'ruin my life using the government'",
        "March 2022: company ran out of cash, could not meet payroll by May 2022",
        "Proposed self-dealing transfer of technology to his own Animo Bancorp",
        "Removed independent directors Nick Ayers and Keri Findley via board manipulation",
        "Resigned as CEO October 17, 2022; company shut down November 21, 2022",
        "Filed Chapter 7 bankruptcy February 8, 2023 (Case No. 23-30246-MVL7, N.D. Texas)",
        "Assets at bankruptcy: $595,956 vs. $40M in liabilities",
      ]},
      { title: "Political Donations", items: [
        "$10M to Keep the Promise II (Ted Cruz Super PAC, April 9, 2015) - sole donor",
        "Withdrew $9M after Cruz dropped out",
        "$110,000+ to Rick Perry via Super PAC at Quantum's address",
        "Provided Perry private jet travel valued at $6,250",
        "$25,000 to Trump Victory; $28,000 via WinRed",
        "Total tracked contributions: >$19M across all entities",
      ]},
      { title: "Fermi America Stake & Compensation", items: [
        "Family trusts held ~28% of outstanding shares at IPO",
        "IPO peak value (~$36.99/share): ~$7.5B paper wealth",
        "Current value (~$5/share, March 31 2026): ~$900M - paper loss exceeding $5B",
        "Base salary: $500,000; performance bonus up to 200% ($1M max)",
        "Stock-based compensation: part of $132.7M total paid to <40 employees",
      ]},
      { title: "Active Legal Exposure", items: [
        "GloriFi bankruptcy trustee adversary proceeding: self-dealing, misrepresentation to investors",
        "4-day trial December 2024; 97-page court opinion issued",
        "Filed 140-page RICO complaint (May 2024) against Thiel, Griffin, Ramaswamy, Lonsdale, Ayers in DE/GA federal courts",
        "Attempt to convert GloriFi from Ch.7 to Ch.11 DENIED January 2025",
        "Named defendant in Lupia v. Fermi Inc. securities fraud class action",
        "Fermi's own SEC filing acknowledges GloriFi litigation may distract him",
      ]},
      { title: "Red Flags", items: [
        "⚠ Two companies; one bankrupt after <1 year of operation",
        "⚠ Bankruptcy trustee alleges 'complete disregard for corporate governance'",
        "⚠ Son (Noah) employed despite having only GloriFi on resume",
        "⚠ No data center, power generation, or nuclear experience",
        "⚠ Currently defending 3 simultaneous major litigation fronts",
        "⚠ $132.7M in SBC to <40 employees in pre-revenue company",
      ]},
    ],
  },

  rick: {
    label: "Rick Perry",
    sub: "Executive Chairman & Co-Founder, Fermi America",
    category: "person",
    flag: "REVOLVING DOOR",
    flagColor: "#f97316",
    icon: "👤",
    sections: [
      { title: "Biography", items: [
        "Born: March 4, 1950, Paint Creek, TX",
        "B.S. Animal Science, Texas A&M University (1972)",
        "U.S. Air Force officer, 1972-1977 (C-130 pilot)",
        "Texas State Representative 1984-1990",
        "Texas Agriculture Commissioner 1991-1999",
        "Lt. Governor of Texas, 1999-2000",
        "Governor of Texas: December 21, 2000 - January 20, 2015 (longest-serving TX governor)",
        "U.S. Secretary of Energy: March 2017 - December 2019",
      ]},
      { title: "Texas Governor Record - Energy & Controversies", items: [
        "Wind energy grew from 116 MW to >11,000 MW during his tenure",
        "Texas Enterprise Fund & Emerging Technology Fund: distributed >$900M",
        "~$16M from ETF went to firms backed by major Perry campaign donors (Dallas Morning News)",
        "Accepted $14.3M+ in campaign contributions from energy and natural resources companies",
        "Kelcy Warren (Energy Transfer Partners): $6M to pro-Perry Super PAC",
        "Harold Simmons (owned nuclear waste firm Waste Control Specialists): $1.2M in contributions",
        "2011 Presidential debate 'OOPS' moment: forgot DOE was the agency he'd abolish",
      ]},
      { title: "2014 Indictment", items: [
        "Indicted August 2014 on two felony counts",
        "Count 1: Abuse of official capacity (1st degree: 5-99 years)",
        "Count 2: Coercion of a public servant (3rd degree: 2-10 years)",
        "Charge: threatened then vetoed $7.5M funding for Public Integrity Unit",
        "Context: DA Rosemary Lehmberg refused to resign after DWI arrest",
        "Was fingerprinted and mugshot-photographed as sitting governor",
        "All charges ultimately DISMISSED on constitutional grounds (2015-2016)",
      ]},
      { title: "U.S. Secretary of Energy (2017-2019)", items: [
        "Confirmed despite initially planning to abolish the department he was named to run",
        "Authorized $3.7B in additional DOE loan guarantees for Vogtle nuclear plant (Georgia)",
        "Pushed total federal Vogtle exposure to $12B",
        "Vogtle later completed $17B over budget, 7 years late",
        "One of the 'Three Amigos' managing U.S.-Ukraine policy",
        "Recommended political ally Michael Bleyzer for Ukraine state gas company board",
        "Bleyzer received lucrative gas exploration deal weeks after recommendation",
        "Subpoenaed by House Democrats during Trump impeachment inquiry",
        "Defied congressional subpoena",
        "Announced resignation October 17, 2019 (one day before subpoena deadline)",
        "Claimed resignation unrelated to Ukraine investigation",
        "January 1, 2020: immediately rejoined board of Energy Transfer LP (Dakota Access Pipeline)",
      ]},
      { title: "Fermi America - Revolving Door Concerns", items: [
        "Co-founded Fermi America in January 2025 - 5 years after leaving DOE",
        "Fermi is in 'pre-approval' process with DOE Loan Programs Office",
        "Same loan program Perry oversaw as Energy Secretary",
        "Perry personally authorized Vogtle loan guarantees that failed spectacularly",
        "Now seeking similar guarantees for his own private nuclear project",
        "Former two-term TX governor; TCEQ operates under TX Governor's office",
        "TCEQ overruled its own public interest counsel to approve Fermi's 6 GW permit",
        "Stake at IPO peak: ~3% of shares ~ $500M (Forbes had him at $3M net worth in 2019)",
      ]},
      { title: "Red Flags", items: [
        "⚠ Secretary of Energy who authorized failed Vogtle loan now seeking Fermi loan",
        "⚠ Appointed to DOE by Trump; Fermi named for Trump; EOs benefit Fermi",
        "⚠ Defied congressional subpoena; revolving door from DOE to Energy Transfer same day",
        "⚠ History of donor-reward governance during Texas governorship",
        "⚠ Prior nuclear loan guarantee (Vogtle) went $17B over budget",
      ]},
    ],
  },

  noah: {
    label: "Noah Neugebauer",
    sub: "Co-Founder & EVP Commercials, Fermi America",
    category: "person",
    flag: "NEPOTISM",
    flagColor: "#f59e0b",
    icon: "👤",
    sections: [
      { title: "Background", items: [
        "Son of Toby Neugebauer (CEO of Fermi America)",
        "Age: approximately 23-25 years old (as of 2026)",
        "Education: B.S. Finance & Entrepreneurship, Wharton School, University of Pennsylvania",
        "High school: TASIS Dorado, Puerto Rico (elite private school)",
      ]},
      { title: "Professional History", items: [
        "Summer 2022: Analyst intern, Serengeti Asset Management (~3 months)",
        "Summer 2022: Analyst intern, 8VC (~3 months)",
        "Summer 2023: Analyst intern, Crestmoor Capital Partners (~3 months)",
        "2023-2024: Financial Analyst, GloriFi (With Purpose Inc.) - father's company",
        "GloriFi filed Chapter 7 bankruptcy during / shortly after his tenure",
        "Co-founded Clearcove Advisors (restructuring advisory); senior advisor: former Rep. Jeb Hensarling",
        "January 2025: Co-Founder, Fermi America; EVP Commercials",
      ]},
      { title: "Role at Fermi", items: [
        "Listed as 'Co-Founder' in all Fermi materials",
        "Responsible for tenant and commercial deal sourcing",
        "Has zero nuclear, data center, or power generation experience",
        "Not disclosed as Named Executive Officer in SEC filings (compensation not itemized)",
        "Compensation: part of $132.7M total SBC paid to <40 employees company-wide",
        "The failure to sign any tenant is, in part, a function of his commercial role",
      ]},
      { title: "Red Flags", items: [
        "⚠ Age 23-25; longest prior employment was at father's bankrupt company",
        "⚠ No commercial real estate, data center, or enterprise sales experience",
        "⚠ Only prior professional role at GloriFi, which ended in Chapter 7 bankruptcy",
        "⚠ Co-Founder title and equity stake appear primarily driven by family relationship",
        "⚠ Zero binding tenant agreements despite EVP Commercials title since Jan 2025",
      ]},
    ],
  },

  griffin: {
    label: "Griffin Perry",
    sub: "Co-Founder, Fermi America (no formal operational role)",
    category: "person",
    flag: "INSIDER STAKE",
    flagColor: "#f59e0b",
    icon: "👤",
    sections: [
      { title: "Background", items: [
        "Son of Rick Perry (Executive Chairman of Fermi America)",
        "Age: approximately 42-43 years old (as of 2026)",
        "Education: B.A. Economics & History, Vanderbilt University",
        "Additional studies: London School of Economics",
        "Previous career: UBS Wealth Management; Deutsche Bank",
      ]},
      { title: "Professional History", items: [
        "Co-founded Grey Rock Investment Partners (formerly Grey Rock Energy Partners)",
        "Grey Rock deployed >$1B in U.S. shale investments",
        "Serves as Co-Chairman, Granite Ridge Resources (NYSE: GRNT) - public E&P company",
        "Energy finance background is legitimate and independent of father",
        "Per Forbes reporting: 'doesn't have a formal role' at Fermi America despite co-founder title",
      ]},
      { title: "Equity Stake", items: [
        "Holds approximately 11-23% of Fermi America outstanding shares",
        "Estimated >130 million shares",
        "Value at IPO peak ($36.99/share): ~$2.3-4.8 billion",
        "Value at March 31, 2026 (~$5/share): ~$650M-1.15B",
        "Paper loss since IPO peak: $1.6B-$3.6B",
        "Enormous stake relative to absent operational role raises governance questions",
        "Became a billionaire on paper at IPO; now likely below that threshold",
      ]},
      { title: "Red Flags", items: [
        "⚠ Co-Founder with no formal role; compensation and role unclear",
        "⚠ Multi-billion dollar stake appears to reflect family relationship, not operational contribution",
        "⚠ Granite Ridge Resources involvement raises potential conflict-of-interest questions",
        "⚠ Father (Rick Perry) is Executive Chairman of same company",
      ]},
    ],
  },

  mesut: {
    label: "Mesut Uzman",
    sub: "Chief Nuclear Construction Officer, Fermi America / CEO, Fermi Nuclear LLC",
    category: "person",
    flag: "CREDIBLE",
    flagColor: "#10b981",
    icon: "👤",
    sections: [
      { title: "Credentials", items: [
        "B.S. Electrical Engineering, Anadolu University, Turkey",
        "M.S. Electrical Engineering, Ohio State University",
        "Six Sigma Black Belt, Westinghouse Electric",
        "Harvard Business School: Strategic Negotiations training",
        "20+ years nuclear industry experience",
      ]},
      { title: "Career History", items: [
        "Westinghouse Electric Company: AP1000 reactor technology, nuclear parts specialist -> engineering roles",
        "Invensys: Nuclear program management, China (8 reactors)",
        "Emirates Nuclear Energy Corporation (ENEC): VP of Engineering and Technical Services",
        "At ENEC: Oversaw engineering delivery for Barakah Nuclear Energy Plant (4 APR-1400 reactors, UAE)",
        "Barakah is one of the most successfully delivered large nuclear projects in the world",
        "Delivered on time and on budget - in stark contrast to U.S. Vogtle project",
        "August 2025: Named Chief Nuclear Construction Officer and CEO of Fermi Nuclear LLC",
        "March 2026: Addressed NRC Regulatory Information Conference on behalf of Fermi",
      ]},
      { title: "Assessment", items: [
        "Most credentialed nuclear professional at Fermi; credentials independently verifiable",
        "Barakah experience is genuine and highly relevant to AP1000 construction challenges",
        "No direct connection to U.S. Vogtle AP1000 project (only U.S. reference point)",
        "AP1000 (Westinghouse design) differs from APR-1400 (Korean design) he built at Barakah",
        "His presence is frequently cited by Fermi bulls as a key credibility signal",
        "His NRC conference appearance signals genuine regulatory engagement",
      ]},
    ],
  },

  sezin: {
    label: "Sezin Uzman",
    sub: "VP Nuclear Supply Chain & Compliance, Fermi America",
    category: "person",
    flag: "CREDIBLE",
    flagColor: "#10b981",
    icon: "👤",
    sections: [
      { title: "Background & Credentials", items: [
        "Wife of Mesut Uzman (Chief Nuclear Construction Officer at Fermi)",
        "20+ years nuclear industry experience",
        "Active in Women in Nuclear (WiN) Global - recognized industry leader",
      ]},
      { title: "Career History", items: [
        "2005: Began nuclear career at Westinghouse Electric as nuclear parts specialist",
        "Invensys: Corrective actions management for China's nuclear build program (8 reactors)",
        "Emirates Nuclear Energy Corporation (ENEC): Director of Procedures and Records Management",
        "At ENEC: Key role in Barakah Nuclear Plant documentation, compliance and quality assurance",
        "Barakah: 4 APR-1400 reactors; one of world's most successful recent nuclear builds",
        "August 2025: Named VP of Nuclear Supply Chain and Compliance, Fermi America",
        "Responsible for nuclear component procurement, supply chain, regulatory compliance",
      ]},
      { title: "Assessment", items: [
        "Genuine nuclear supply chain credentials from Westinghouse and Barakah experience",
        "Supply chain for AP1000 reactors is one of most complex procurement challenges in industry",
        "Her hiring of married couple into senior leadership at same company is a governance flag",
        "Concentrated family/spousal relationships within 44-person company is unusual",
      ]},
    ],
  },

  andy: {
    label: "Andy Beal",
    sub: "Billionaire Banker - Owner of Beal Bank USA (Fermi Lender)",
    category: "person",
    flag: "TRUMP ORBIT",
    flagColor: "#ef4444",
    icon: "👤",
    sections: [
      { title: "Biography", items: [
        "Full name: Daniel Andrew Beal",
        "Net worth: ~$10-15B (Forbes 2025: $12B); consistently among America's richest bankers",
        "Founded Beal Bank (now Beal Bank USA) in Plano, TX",
        "Known as a brilliant contrarian who makes massive macro bets",
        "Amateur poker player who famously challenged top pros in high-stakes games",
        "Eccentric autodidact: studies mathematics, particularly the 'Beal Conjecture' (number theory)",
        "Offers $1M prize for proof or disproof of Beal Conjecture",
      ]},
      { title: "Beal Bank Business Model", items: [
        "Described by former FDIC official as 'an FDIC-insured hedge fund'",
        "Specializes in distressed and opportunistic lending where mainstream banks will not go",
        "Built fortune buying power-generation bonds after Enron crisis",
        "Bought aircraft debt at pennies on dollar after 9/11",
        "Purchased commercial loans during 2008 financial collapse",
        "2022: Quadrupled bank assets from $7.5B to $32.6B by buying $21.2B in Treasury bonds",
        "bet on inflation spike proved correct; became one of most profitable bank trades in recent history",
        "2007: Beal Bank Nevada provided $500M loan to Trump Entertainment Resorts (bankrupt casino)",
        "Bank often operates where traditional lenders fear to tread",
      ]},
      { title: "Trump Political Connections", items: [
        "2016 Trump campaign: Served as economic policy advisor",
        "Created 'Save America From Its Government' pro-Trump Super PAC",
        "Contributed $3M+ to pro-Trump PACs and initiatives",
        "$350,000 to RallyPAC (pro-Trump)",
        "$2M to separate Trump Super PAC",
        "$1M toward Trump inaugural festivities",
        "2024 cycle: $1M+ to Turnout For America (pro-Trump)",
        "Trump at 2016 Dallas rally: 'We had some fantastic folks... like Andy Beal... one of the great business people'",
        "2007 direct business relationship: Beal Bank -> Trump Entertainment Resorts $500M loan",
      ]},
      { title: "Fermi Connection", items: [
        "CSG Investments (Beal Bank affiliate) provided Fermi $165M turbine facility (March 2026)",
        "Facility: Senior secured first lien delayed-draw term loan",
        "Collateral: 6 Siemens SGT-800-57 gas turbines",
        "Legal counsel: Davis Polk & Wardwell (lender); Vinson & Elkins (Fermi)",
        "Connection chain: Beal -> Trump donor/advisor -> Trump -> appointed Perry as Energy Sec. -> Perry co-founded Fermi -> Beal's bank lends to Fermi",
      ]},
      { title: "Red Flags / Significance", items: [
        "⚠ Beal Bank's presence at bottom of credit stack signals mainstream lenders still won't touch project",
        "⚠ Political connections create appearance of cronyism even if lending terms are commercial",
        "⚠ Distressed-lending specialist as Fermi's most recent lender is a market signal",
      ]},
    ],
  },

  trump: {
    label: "Donald Trump",
    sub: "U.S. President - Political Patron of Project Matador",
    category: "political",
    flag: "POLITICAL",
    flagColor: "#f97316",
    icon: "🏛",
    sections: [
      { title: "Role in Fermi / Project Matador", items: [
        "Project Matador officially named 'Donald J. Trump Advanced Energy and Intelligence Campus'",
        "Each of the 4 planned nuclear reactors individually named after him",
        "Fermi's first Instagram post featured footage of Biden sleeping alongside Trump + American flag",
        "May 2025 Executive Orders to 'quadruple nuclear capacity': directly benefit Fermi",
        "EOs reorganized NRC for faster approvals; gave Energy Secretary authority over reactor designs",
        "EOs invoked Defense Production Act for reactor fuel supply",
        "Fermi was first company selected for NRC's new streamlined permitting pilot program",
        "Interior Secretary Doug Burgum (chair of Trump's National Energy Dominance Council) publicly endorsed Fermi",
      ]},
      { title: "Connections to Fermi Leadership", items: [
        "Appointed Rick Perry as Secretary of Energy (2017); Perry now co-founded Fermi",
        "Publicly praised Andy Beal (Beal Bank lender) at 2016 Dallas rally",
        "CEO Neugebauer donated $53K+ to Trump campaigns/PACs",
        "Andy Beal donated $3M+ to Trump-aligned PACs; served as campaign economic advisor",
        "Neugebauer quote: 'There's no way we were going to do a large-scale, gas-powered AI campus in the Biden administration... Absolutely, the change in leadership made it possible'",
      ]},
      { title: "Policy Context", items: [
        "May 2025 nuclear EOs: first direct NRC restructuring since Reagan",
        "TCEQ (Texas regulatory) approved Fermi permit over objections of its own public interest counsel",
        "Texas's political alignment with Trump facilitated fast-track state approvals",
        "Fermi DOE loan application in pre-approval stage: DOE now politically aligned with project",
      ]},
    ],
  },

  randy: {
    label: "Randy Neugebauer",
    sub: "Father of Toby Neugebauer; Former U.S. Congressman (TX-19, 2003-2017)",
    category: "political",
    flag: "BACKGROUND",
    flagColor: "#64748b",
    icon: "🏛",
    sections: [
      { title: "Background", items: [
        "Served U.S. House of Representatives, Texas 19th District, 2003-2017",
        "Republican; member of House Financial Services Committee",
        "Retired from Congress in 2017 (did not seek re-election)",
        "Father of Toby Neugebauer (CEO/Co-Founder of Fermi America)",
        "Toby's political connections and donor relationships build on family political network",
        "Randy's congressional tenure overlapped with Toby's rise at Quantum Energy Partners",
        "No known direct involvement in Fermi America",
      ]},
    ],
  },

  fermi: {
    label: "Fermi America / Fermi Inc.",
    sub: "NASDAQ: FRMI - Development-stage energy REIT",
    category: "company_core",
    flag: "NO REVENUE",
    flagColor: "#ef4444",
    icon: "🏢",
    sections: [
      { title: "Corporate Overview", items: [
        "Incorporated: January 10, 2025 (Texas LLC)",
        "Structure: Real Estate Investment Trust (REIT)",
        "Must distribute 90%+ of taxable income to shareholders",
        "Ticker: NASDAQ: FRMI; also dual-listed on LSE",
        "IPO: October 1, 2025 at $21/share; raised $682.5M gross proceeds",
        "Day 1 close: $32.53 (+54.9%); peak: $36.99; as of March 31 2026: ~$5.09",
        "Market cap at IPO peak: ~$19.3B; current: ~$1.1B",
        "Headquarters: Dallas, TX (3401 Armstrong Avenue)",
        "Employees: approximately 44 (as of early 2026)",
      ]},
      { title: "Business Model", items: [
        "Purpose: Build private, behind-the-meter power generation + hyperscale data centers",
        "Intended tenants: AI hyperscalers unable to wait years in grid interconnection queues",
        "Model: Developer-landlord; builds powered shells and leases to tenants on triple-net leases",
        "Does NOT operate data centers; depends entirely on external hyperscaler customers",
        "Structured as REIT - creates tension with massive pre-revenue capital requirements",
        "REIT structure means limited ability to retain earnings for reinvestment",
      ]},
      { title: "Financial Position (FY2025)", items: [
        "Revenue: $0",
        "Net loss: $486.4M ($1.13 per share) - worse than analyst estimate of $366.5M",
        "Non-cash charges: 91.6% of total loss",
        "Stock-based compensation: $132.7M paid to <40 employees",
        "Cash position: $408.5M",
        "Total assets: $1.4B (primarily $935M in PP&E: turbines, equipment ordered)",
        "Equipment financing: $865M+ across 3 facilities",
        "Earnings announcement: March 30, 2026; stock fell 23% same day",
        "Revenue estimates fell 59%, EPS estimates fell 74% in 60 days before first earnings report",
      ]},
      { title: "What Is Actually Real", items: [
        "7,570 acres in Carson County, TX (99-year lease from Texas Tech University System)",
        "$935M in physical PP&E on balance sheet (turbines, equipment ordered)",
        "6 Siemens SGT-800 gas turbines ordered / shipping to campus",
        "TCEQ 6 GW Clean Air Permit approved (Feb 2026); 2nd 5 GW permit filed (Mar 2026)",
        "NRC Combined License Application (COLA) accepted for review (4 AP1000 reactors)",
        "NRC Environmental Impact Statement scoping began March 2026",
        "Site preparation construction activity documented on-site",
        "Engineering partnerships with Hyundai E&C, Westinghouse, Siemens, Doosan",
      ]},
      { title: "What Is NOT Real", items: [
        "Zero revenue (no customers, no operations)",
        "Zero signed definitive tenant leases",
        "Sole anchor tenant (Amazon/AWS) terminated agreement December 11, 2025",
        "99-year land lease has NOT technically commenced (requires 200 MW signed subtenant first)",
        "No binding offtake agreements of any kind",
        "Nuclear reactors: 2032 earliest for first unit, 2038 for all four",
        "$80-120B full buildout requires ~100x the cash currently on hand",
      ]},
      { title: "Analyst Coverage", items: [
        "9 analysts covering FRMI as of March 2026",
        "All 9 maintain Buy or Strong Buy ratings",
        "Consensus price target: ~$29 (480%+ upside from current price)",
        "Citizens analyst Greg Miller visited site; called progress 'building blocks of legitimacy'",
        "Stifel target: $29; Macquarie target: $25",
        "Simply Wall St fair value range: $2.89-$28.89 (massive divergence)",
        "Morningstar fair value estimate: $3.78",
      ]},
    ],
  },

  matador: {
    label: "Project Matador",
    sub: "Donald J. Trump Advanced Energy and Intelligence Campus - Carson County, TX",
    category: "company_core",
    flag: "PRE-REVENUE",
    flagColor: "#f59e0b",
    icon: "⚡",
    sections: [
      { title: "Official Name & Location", items: [
        "Official name: 'Donald J. Trump Advanced Energy and Intelligence Campus'",
        "Each of 4 planned nuclear reactors individually named after President Trump",
        "Location: Carson County, TX (Texas Panhandle), near Amarillo",
        "Adjacent to Department of Energy's Pantex nuclear weapons facility",
        "Site area: ~7,570 acres (5,800 acres active development)",
        "99-year ground lease from Texas Tech University System",
        "Lease does NOT formally begin until 200 MW subtenant signed + agreement executed",
        "Fermi must fund TTU System Excellence Fund up to $200M",
        "Must pay annual lease payments + % of appraised data center value",
      ]},
      { title: "Stated Scope (Total Vision)", items: [
        "Up to 17 GW of total power generation (proposed as world's largest private power grid)",
        "11 GW combined-cycle natural gas (from Siemens SGT-800 and F-class turbines)",
        "4.4 GW nuclear (4 x Westinghouse AP1000 pressurized water reactors)",
        "Solar and battery energy storage (unspecified capacity)",
        "Up to 18 million square feet of AI data center space",
        "Total estimated project cost: $70-120B",
        "For context: entire New York City electricity consumption is ~12 GW",
        "No single private entity has ever built anything near this scale",
      ]},
      { title: "Near-Term Plan (Gas Turbines)", items: [
        "Phase 1: ~2.3 GW natural gas generation + first data centers",
        "Target: 1 GW online by end of 2026 (Fermi's stated goal)",
        "6 Siemens SGT-800-57 turbines ordered; 2 GW of assets 'secured and shipping to campus'",
        "$865M+ in equipment financing secured for turbine acquisition",
        "TCEQ issued 6 GW Clean Air Permit (February 2026)",
        "Second 5 GW TCEQ permit filed March 2026 (upsizing to 17 GW total)",
        "Construction paused at times pending permit approvals",
      ]},
      { title: "Nuclear Plan (Long-Term)", items: [
        "4 x Westinghouse AP1000 pressurized water reactors",
        "Combined nuclear capacity: 4.4 GW",
        "NRC Combined License Application (COLA) filed June 2025; accepted for review",
        "Federal Register notice March 2026: NRC beginning Environmental Impact Statement scoping",
        "First reactor target: 2031-2032 (Fermi's optimistic timeline)",
        "All four reactors: targeting 2038",
        "AP1000 precedent (Vogtle, GA): $17B over budget, 7 years late",
        "Fermi is first company selected for NRC's new streamlined EIS pilot program (Trump EO)",
        "Partnered with Hyundai E&C (has built 24 Korean reactors on time and on budget)",
        "Hyundai partnership announced: deepened strategic agreement for AP1000 construction",
        "Doosan Enerbility contracted for long-lead nuclear components",
      ]},
      { title: "Regulatory Status", items: [
        "TCEQ: 6 GW Clean Air Permit APPROVED February 2026",
        "TCEQ received 279 public comments (majority opposing), 63 contested case hearing requests",
        "TCEQ's own Office of Public Interest Counsel RECOMMENDED granting contested case hearing",
        "TCEQ commissioners OVERRULED their own counsel; approved permit denying all hearing requests",
        "Second 5 GW TCEQ permit filed March 27, 2026",
        "NRC COLA: accepted for review; EIS scoping public comment period open",
        "DOE Loan Programs Office: pre-approval stage (no approval announced)",
        "Texas HB14 Advanced Nuclear Completion Fund: application submitted",
      ]},
      { title: "Local Government Deals", items: [
        "Carson County 10-year property tax abatement: $3/sq ft improvements + $2,500-$2,750/MW",
        "Carson County Foreign Trade Subzone designation (customs advantages)",
        "City of Amarillo 20-year water agreement: up to 2.5 million gallons/day at 2x taxpayer rate",
        "Former Mayor of Amarillo (Trent Sisemore) hired as Fermi community liaison",
        "Potential $16B in Texas sales tax exemptions on $300B projected investment",
      ]},
      { title: "Environmental Concerns", items: [
        "Location above Ogallala Aquifer - already depleting faster than it replenishes",
        "Proposed emissions: 23.5 million pounds of greenhouse gases annually",
        "That figure ~ 12% of all Texas power plant emissions in 2023",
        "Opposition groups: Panhandle Taxpayers for Transparency, 806 Data Center Resistance, Sierra Club TX, Public Citizen, MediaJustice",
        "Water agreement drew significant local opposition at Amarillo City Council meeting",
      ]},
      { title: "Competitive Landscape", items: [
        "Constellation Energy: largest U.S. nuclear fleet; signed 20-year deal with Meta for 1.1 GW",
        "Talen Energy: nuclear-adjacent data centers operating today",
        "Amazon: $500M invested in X-Energy SMR technology",
        "Microsoft: contracted to restart Three Mile Island",
        "Google: invested in Kairos Power molten salt reactors",
        "All competitors have either existing assets, binding contracts, or both",
        "Fermi has neither revenue nor tenants",
      ]},
    ],
  },

  glorifi: {
    label: "GloriFi (With Purpose Inc.)",
    sub: "BANKRUPT - Chapter 7, February 2023",
    category: "company_failed",
    flag: "BANKRUPT",
    flagColor: "#ef4444",
    icon: "💀",
    sections: [
      { title: "What Was GloriFi?", items: [
        "Founded 2021 by Toby Neugebauer and his wife Melissa",
        "Concept: 'anti-woke' conservative-branded fintech / neobank",
        "Products: Credit cards made from shell-casing material; bundled insurance, banking",
        "Marketing: 'OUR BILL OF RIGHTS IS NON-NEGOTIABLE'",
        "Target market: conservative Americans alienated by ESG-focused mainstream banks",
        "SPAC merger letter of intent: $1.65B valuation",
      ]},
      { title: "Investors", items: [
        "Peter Thiel (Founders Fund co-founder, Silicon Valley tech billionaire)",
        "Ken Griffin (Citadel hedge fund founder, ~$35B net worth)",
        "Vivek Ramaswamy (biotech entrepreneur, 2024 Republican presidential candidate)",
        "Nick Ayers (Mike Pence's former chief of staff, GOP strategist)",
        "Joe Lonsdale (Palantir co-founder, 8VC)",
        "Jeff Sprecher (CEO of ICE, parent company of NYSE)",
        "Total raised: approximately $55M",
      ]},
      { title: "The Collapse", items: [
        "March 2022: Neugebauer informed investors company had run out of cash",
        "May 2022: Board memo warned inability to meet payroll",
        "May 2022 P.F. Chang's incident: police report filed; alleged intoxicated threats",
        "WSJ investigation published October 10, 2022: drinking, volatile behavior allegations",
        "Operated out of Neugebauer's 16,000 sq ft Dallas mansion modeled on White House",
        "Out-of-town employees slept in guest bedrooms of the mansion",
        "October 2022: Independent directors (Nick Ayers, Keri Findley) pushed to remove Neugebauer as CEO",
        "Neugebauer expanded board with allies, removed Findley, engineered ouster of Ayers",
        "Proposed transferring technology to his wholly-owned Animo Bancorp (alleged self-dealing)",
        "GloriFi shut down November 21, 2022",
        "Filed Chapter 7 bankruptcy February 8, 2023 (N.D. Texas, Case 23-30246-MVL7)",
        "Assets: $595,956; Liabilities: $40,000,000",
      ]},
      { title: "Aftermath / Litigation", items: [
        "Bankruptcy Trustee: Scott M. Seidel - filed adversary proceeding vs. Neugebauer",
        "Allegations: self-dealing, misrepresentation to investors, deliberate cash crisis engineering",
        "4-day trial: December 2024; 97-page memorandum opinion issued",
        "$1.7B malpractice suit filed vs. Winston & Strawn LLP (Neugebauer's law firm)",
        "Suit alleges Winston & Strawn saw Neugebauer as 'cash cow' and facilitated self-dealing",
        "Parallel malpractice suit vs. Chapman & Cutler LLP",
        "Neugebauer counter-sued: 140-page RICO complaint (May 2024) vs. Thiel, Griffin, Ramaswamy, Lonsdale, Ayers, others",
        "RICO suit alleges they orchestrated WSJ story and sabotaged GloriFi",
        "Neugebauer's motion to convert from Ch.7 to Ch.11: DENIED January 2025",
        "All GloriFi litigation ongoing as Neugebauer leads Fermi America",
      ]},
    ],
  },

  amazon: {
    label: "Amazon / AWS",
    sub: "Departed Anchor Tenant - Triggered Class Action Lawsuit",
    category: "company_failed",
    flag: "DEPARTED",
    flagColor: "#ef4444",
    icon: "⚠",
    sections: [
      { title: "Role as Fermi's Anchor Tenant", items: [
        "Business Insider reporting identified Amazon/AWS as Fermi's unnamed 'First Tenant'",
        "Fermi never publicly confirmed tenant identity - kept confidential in all filings",
        "Tenant was described as 'investment-grade-rated' in IPO registration statement",
        "September 2025: Non-binding letter of intent announced alongside IPO filing",
        "November 4, 2025: Fermi announced '$150M Advance in Aid of Construction Agreement (AICA)'",
        "AICA described by Fermi as 'pivotal milestone'",
        "AICA terms: Tenant funds shared infrastructure in advance; repaid as rent credits over 6 years",
        "Full-recourse, clawback-eligible agreement",
        "Fermi listed 'Tenant Prepayments' as principal source of liquidity in Q3 2025 10-Q",
      ]},
      { title: "The Termination", items: [
        "Letter of intent had fixed exclusivity expiration: December 9, 2025",
        "AICA terminated: December 11, 2025 - two days after exclusivity expired",
        "No funds were ever drawn under the AICA",
        "Fermi disclosed termination via 8-K filing",
        "Stock reaction: crashed 33.8% in a single day (from ~$15 to ~$10.09)",
        "Fermi management characterized it as a 'mutual agreement to part ways'",
        "Context: Fermi had made no infrastructure spending commitments tied to the AICA",
      ]},
      { title: "Why It Matters", items: [
        "Amazon's departure revealed the entire business model rested on a single non-binding LOI",
        "Plaintiffs allege management knew of concentration risk but did not adequately disclose it",
        "The AICA's exclusivity expiration date (Dec 9) was not prominently disclosed at IPO",
        "Class action period: October 1 - December 11, 2025 (IPO through termination announcement)",
        "Fermi has had zero binding tenant agreements before or since",
        "As of March 31, 2026: Palantir reported to be in discussions (not confirmed)",
      ]},
      { title: "Amazon Context", items: [
        "Amazon is largest cloud computing company globally (AWS revenue: >$90B annually)",
        "Amazon separately invested $500M in X-Energy SMR nuclear technology",
        "Amazon would have multiple competing vendor options for AI power infrastructure",
        "Departure may reflect Amazon's preference for its own nuclear deals vs. third-party landlord",
        "No statement from Amazon about reasons for termination",
      ]},
    ],
  },

  quantum: {
    label: "Quantum Energy Partners",
    sub: "Energy-focused Private Equity - Co-founded by Toby Neugebauer",
    category: "company_other",
    flag: "PRIOR SUCCESS",
    flagColor: "#10b981",
    icon: "🏢",
    sections: [
      { title: "Overview", items: [
        "Founded 1998 by Toby Neugebauer and S. Wil VanLoh Jr.",
        "Headquartered in Houston, TX",
        "One of the largest dedicated energy-focused private equity firms in the U.S.",
        "~$28 billion deployed across energy investments to date",
        "5 of first 6 funds ranked in first quartile for net IRR among peers",
        "Invests across oil & gas E&P, midstream, energy services, power",
      ]},
      { title: "Neugebauer's Role", items: [
        "Co-Managing Partner: primary role from founding through ~2015-2018",
        "Board seats: Linn Energy, Legacy Reserves, and ~12 other portfolio companies",
        "Stepped back to advisory role on Quantum investment committee (years before Fermi)",
        "Quantum represents his legitimate, successful track record prior to GloriFi",
        "Bulls cite Quantum background as evidence Neugebauer understands energy investing",
        "Bears note: energy PE investing != building nuclear plants and data centers from scratch",
      ]},
    ],
  },

  greyrock: {
    label: "Grey Rock Investment Partners",
    sub: "Shale-focused Private Equity - Co-founded by Griffin Perry",
    category: "company_other",
    flag: "ACTIVE",
    flagColor: "#10b981",
    icon: "🏢",
    sections: [
      { title: "Overview", items: [
        "Founded by Griffin Perry (son of Rick Perry) and partners",
        "Focus: U.S. shale oil and gas investments (E&P and midstream)",
        "Deployed >$1 billion across shale investments",
        "Griffin Perry served as Co-Founder and Managing Director",
        "Successor entity / spin-out connects to Granite Ridge Resources (public company)",
        "Demonstrates Griffin's legitimate energy finance background, independent of his father",
      ]},
    ],
  },

  granite: {
    label: "Granite Ridge Resources",
    sub: "NYSE: GRNT - Non-operated E&P; Griffin Perry is Co-Chairman",
    category: "company_other",
    flag: "PUBLIC",
    flagColor: "#06b6d4",
    icon: "📈",
    sections: [
      { title: "Overview", items: [
        "NYSE-listed: GRNT",
        "Non-operated oil and gas exploration and production company",
        "Created from Grey Rock's non-operated mineral interests",
        "Griffin Perry serves as Co-Chairman of the board",
        "Public company role gives Griffin a legitimate independent board credential",
        "Potential conflicts: Griffin is simultaneously Co-Founder of Fermi America (no formal role)",
        "Dual roles across energy companies warrant governance scrutiny",
      ]},
    ],
  },

  banzai: {
    label: "Banzai Capital Group",
    sub: "Neugebauer Family Office",
    category: "company_other",
    flag: "PRIVATE",
    flagColor: "#64748b",
    icon: "🏢",
    sections: [
      { title: "Overview", items: [
        "Toby Neugebauer's personal/family investment vehicle",
        "Manages family wealth post-Quantum Energy Partners",
        "Puerto Rico based business interests run through this entity",
        "Not publicly disclosed in detail; referenced in Fermi SEC filings",
        "Family trusts holding Fermi equity may be managed through this structure",
        "GloriFi's Animo Bancorp (alleged self-dealing entity) was a separate Neugebauer entity",
      ]},
    ],
  },

  mufg: {
    label: "MUFG Bank",
    sub: "$500M Equipment Facility - Siemens Turbines",
    category: "finance",
    flag: "INSTITUTIONAL",
    flagColor: "#10b981",
    icon: "🏦",
    sections: [
      { title: "Who Is MUFG?", items: [
        "Mitsubishi UFJ Financial Group - Japan's largest bank; one of world's largest ($3.7T assets)",
        "MUFG's project finance division has ranked #1 in Americas mandated lead arranger tables for 10+ years",
        "One of the most credentialed project finance lenders globally",
        "Presence signals Fermi has at least passed MUFG's credit underwriting process",
      ]},
      { title: "Facility Terms", items: [
        "Amount: $500 million",
        "Announced: February 10, 2026",
        "Structure: Senior secured, non-recourse equipment loan",
        "Collateral: 3 Siemens Energy F-class gas turbines",
        "Rate: SOFR + 4.00% (approximately 8.3-8.5% all-in at announcement)",
        "That spread is roughly DOUBLE what investment-grade infrastructure projects command",
        "Maturity: 18 months",
        "LTV covenant: 65% for delivered equipment, 55% for undelivered",
        "Critical trigger: If Fermi fails to sign a 400 MW offtake agreement within 9 months, accelerated repayment required",
        "This is equipment lending, NOT project finance - lenders protected even if project fails",
      ]},
      { title: "What This Signals", items: [
        "MUFG lends against physical turbine assets with resale value, NOT Project Matador's success",
        "SOFR + 4% spread quantifies market's risk premium on Fermi - expensive money",
        "The 400 MW offtake trigger is effectively a gun to Fermi's head to sign a tenant",
        "If MUFG was confident in the project, pricing would be 100-200 bps lower",
        "MUFG's participation is meaningful but should not be read as endorsement of full vision",
      ]},
    ],
  },

  keystone: {
    label: "Keystone National Group",
    sub: "$200M Equipment Facility (with Cape Commercial Finance)",
    category: "finance",
    flag: "PRIVATE CREDIT",
    flagColor: "#10b981",
    icon: "🏦",
    sections: [
      { title: "Who Is Keystone?", items: [
        "Founded 2006; headquartered Salt Lake City, UT",
        "SEC-registered private credit firm specializing in equipment and asset-backed lending",
        "Deployed >$6 billion across 750+ transactions since founding",
        "Co-founders: John Earl (ex-Lehman Brothers) and Brandon Nielson",
        "Client base: pension funds, insurance companies, family offices",
        "2025: Acquired by Virtus Investment Partners (NYSE: VRTS) for up to $370M",
        "Acquisition validates institutional standing of the firm",
      ]},
      { title: "Facility Terms", items: [
        "Amount: $200 million equipment facility",
        "Announced: February 19, 2026",
        "Co-arranged with Cape Commercial Finance",
        "Collateral: High-voltage electrical equipment (breakers, transformers, substations, switchgear)",
        "Structure: Equipment warehouse facility for 2.3 GW Phase 1 buildout",
        "Initial draw announced same date as facility",
        "Specific terms (rate, maturity) not publicly disclosed",
      ]},
      { title: "Assessment", items: [
        "Mid-market private credit lender; legitimate but below MUFG tier",
        "Equipment focus (electrical infrastructure) aligns with Fermi's near-term build",
        "No known political connections to Perry-Neugebauer-Trump orbit",
        "Virtus acquisition provides institutional parent and oversight",
      ]},
    ],
  },

  cape: {
    label: "Cape Commercial Finance",
    sub: "Co-arranger of $200M Keystone Facility",
    category: "finance",
    flag: "SMALL FIRM",
    flagColor: "#f59e0b",
    icon: "🏦",
    sections: [
      { title: "Who Is Cape?", items: [
        "Jacksonville, Florida-based specialty finance company",
        "Founded June 2020 - relatively new firm",
        "Fewer than 25 employees",
        "Annual revenue: approximately $5.9 million",
        "Specializes in equipment financing for industrial and energy projects",
        "President and Chief Sales Officer: Micah Thompson",
        "Thompson spent 13 years at Siemens Financial Services prior to Cape",
        "Siemens Financial Services connection likely explains relationship to Fermi's Siemens turbine purchases",
      ]},
      { title: "Assessment", items: [
        "Small firm; co-arranger role likely sourced from Siemens relationship",
        "No significant track record on projects of Fermi's claimed scale",
        "No known political connections",
        "Presence as co-arranger alongside Keystone suggests origination role rather than balance sheet capacity",
      ]},
    ],
  },

  beal_bank: {
    label: "Beal Bank USA / CSG Investments",
    sub: "$165M Turbine Facility - Andy Beal's Distressed-Lending Bank",
    category: "finance",
    flag: "TRUMP-CONNECTED",
    flagColor: "#ef4444",
    icon: "🏦",
    sections: [
      { title: "Entity Structure", items: [
        "CSG Investments is an affiliate / subsidiary of Beal Bank USA",
        "Beal Bank USA: FDIC-insured bank headquartered in Plano, TX",
        "Privately owned: 100% controlled by Andy Beal",
        "Total assets: approximately $32.6 billion (after 2022 Treasury bond bet)",
        "Former FDIC official described it as 'an FDIC-insured hedge fund'",
        "Davis Polk & Wardwell: lender's legal counsel on Fermi facility",
        "Vinson & Elkins: Fermi's legal counsel on this transaction",
      ]},
      { title: "Facility Terms", items: [
        "Amount: $165 million",
        "Announced: March 27, 2026",
        "Structure: Senior secured first lien delayed-draw term loan",
        "Collateral: 6 Siemens SGT-800-57 gas turbines (2028 delivery)",
        "Draw schedule: Tied to turbine delivery milestones",
        "Purpose: Accelerate delivery of turbines for 2028 operation at Project Matador",
        "Rate and maturity: Not publicly disclosed",
      ]},
      { title: "Strategic Significance", items: [
        "Most recent addition to Fermi's debt stack - announced March 2026 after stock ~$5",
        "Beal Bank specializes in lending where mainstream banks will not - a market signal",
        "Physical turbine collateral protects Beal even if Fermi collapses",
        "Connection chain: Beal -> massive Trump donor/advisor -> Trump -> appointed Perry -> Perry co-founded Fermi -> Beal lends to Fermi",
        "Andy Beal praised by Trump at 2016 Dallas rally; served as campaign economic advisor",
        "2007 precedent: Beal Bank Nevada lent $500M to bankrupt Trump Entertainment Resorts",
        "Pattern suggests political relationships may have facilitated commercial relationship",
      ]},
    ],
  },

  virtus: {
    label: "Virtus Investment Partners",
    sub: "NYSE: VRTS - Acquired Keystone National Group (2025)",
    category: "finance",
    flag: "PUBLIC",
    flagColor: "#06b6d4",
    icon: "🏦",
    sections: [
      { title: "Overview", items: [
        "NYSE-listed asset management company (VRTS)",
        "Manages multi-boutique investment platform across multiple asset classes",
        "2025: Acquired Keystone National Group for up to $370M",
        "Acquisition validates Keystone's institutional standing",
        "No direct relationship with Fermi America beyond ownership of Keystone",
        "Acquisition price ($370M) vs. Keystone's $200M Fermi facility shows scale",
      ]},
    ],
  },

  hyundai: {
    label: "Hyundai Engineering & Construction (E&C)",
    sub: "Nuclear Construction Partner for Project Matador AP1000s",
    category: "partner",
    flag: "KEY PARTNER",
    flagColor: "#06b6d4",
    icon: "⚙",
    sections: [
      { title: "Track Record", items: [
        "Part of Hyundai Group (South Korea's largest conglomerate)",
        "Has built 24 South Korean nuclear reactors - on time and on budget",
        "South Korea's APR-1400 design is globally recognized as efficient nuclear construction",
        "UAE Barakah project (APR-1400): Hyundai E&C was construction lead with ENEC",
        "Mesut and Sezin Uzman both worked on Barakah under Hyundai E&C's construction leadership",
        "This Hyundai/Uzman connection is what makes the nuclear team credible",
      ]},
      { title: "Fermi Partnership", items: [
        "Announced: Strategic partnership to lead AP1000 reactor construction at Project Matador",
        "Subsequently 'deepened' - more formal agreement announced July 2025",
        "First time Hyundai E&C formally committed to U.S. nuclear construction",
        "Challenge: AP1000 (Westinghouse design) differs significantly from APR-1400 they built at Barakah",
        "Hyundai has no prior AP1000 construction experience",
        "Partnership is MOU/strategic in nature; no EPC contract signed",
      ]},
      { title: "Assessment", items: [
        "Most credible operational partner Fermi has for nuclear component",
        "Barakah success gives genuine confidence they can build on time and on budget",
        "AP1000 design differences mean learning curve still exists",
        "No signed, binding EPC contract yet - still early stage",
        "NRC licensing, permitting, and financing must all succeed before construction begins",
      ]},
    ],
  },

  siemens: {
    label: "Siemens Energy",
    sub: "Supplier: SGT-800 Gas Turbines (6 units ordered for Phase 1)",
    category: "partner",
    flag: "CONTRACTED",
    flagColor: "#10b981",
    icon: "⚙",
    sections: [
      { title: "Relationship with Fermi", items: [
        "Siemens Energy is one of world's largest power equipment manufacturers",
        "Fermi ordered 6 x Siemens SGT-800-57 gas turbines for Project Matador Phase 1",
        "SGT-800: Heavy-duty industrial gas turbine, ~50 MW per unit in simple cycle",
        "In combined cycle mode: higher efficiency, greater total output",
        "2028 target delivery date for the 6 turbines",
        "Turbines are the collateral for both the $500M MUFG facility and $165M Beal Bank facility",
        "Fermi also announced LOI for additional 1.1 GW of F-class generation equipment from Siemens",
        "F-class turbines are larger; target 2026 delivery for near-term power needs",
        "Siemens Energy and Fermi entered nuclear collaboration agreement alongside energy deal",
      ]},
      { title: "Cape Commercial Finance Connection", items: [
        "Cape Commercial Finance (co-arranger of $200M Keystone facility) was sourced via Siemens connection",
        "Cape's president spent 13 years at Siemens Financial Services before founding Cape",
        "Suggests Siemens Financial ecosystem is helping facilitate Fermi's financing stack",
      ]},
    ],
  },

  westinghouse: {
    label: "Westinghouse Electric",
    sub: "AP1000 Reactor Design - 4 Units Proposed at Project Matador",
    category: "partner",
    flag: "EARLY STAGE",
    flagColor: "#f59e0b",
    icon: "⚙",
    sections: [
      { title: "AP1000 Design", items: [
        "AP1000: Advanced Pressurized Water Reactor (PWR) developed by Westinghouse",
        "Passive safety systems: relies on gravity, convection, compressed gas - no active pumps needed",
        "NRC-certified design: only large nuclear reactor design certified in U.S.",
        "Four AP1000s proposed at Project Matador: ~1.1 GW each = 4.4 GW total",
        "Fermi has formal COLA (Combined License Application) filed with NRC for 4 units",
      ]},
      { title: "Vogtle Precedent (Critical Context)", items: [
        "ONLY AP1000s ever built in U.S.: Vogtle Units 3 & 4 in Waynesboro, Georgia",
        "Vogtle 3: Completed ~2023 - first new U.S. nuclear unit in 30 years",
        "Vogtle 4: Completed ~2024",
        "Vogtle total cost: approximately $35 billion for 2 units (~$17B over budget)",
        "Vogtle timeline: approximately 7 years behind schedule",
        "Original operator: Southern Nuclear (subsidiary of Southern Company)",
        "Taxpayer exposure: DOE loan guarantees authorized in part by Rick Perry as Energy Secretary",
        "Westinghouse filed Chapter 11 bankruptcy in 2017 during Vogtle construction",
        "Westinghouse was subsequently acquired by Brookfield Asset Management",
        "Vogtle experience reveals: U.S. nuclear construction regulatory, labor, and supply chain challenges",
      ]},
      { title: "Fermi Partnership Status", items: [
        "Fermi partnered with Westinghouse for AP1000 reactor supply",
        "Doosan Enerbility separately contracted for long-lead nuclear components",
        "NRC accepted Fermi COLA for formal review (first AP1000 COLA submitted since Vogtle)",
        "Environmental Impact Statement scoping begun March 2026",
        "Full NRC review takes ~4-6 years under normal circumstances",
        "Trump EO streamlining may reduce timeline - extent unclear",
      ]},
    ],
  },

  doosan: {
    label: "Doosan Enerbility",
    sub: "Long-Lead Nuclear Component Supplier",
    category: "partner",
    flag: "CONTRACTED",
    flagColor: "#10b981",
    icon: "⚙",
    sections: [
      { title: "Overview", items: [
        "South Korean industrial conglomerate; division focused on power equipment",
        "Major supplier of nuclear components globally (reactor pressure vessels, steam generators, etc.)",
        "Extensive experience supplying components for Korean APR-1400 reactors",
        "Also supplied components for UAE Barakah project",
        "Contracted by Fermi for long-lead nuclear components at Project Matador",
        "'Long-lead' items: Reactor pressure vessels, steam generators - 5-8 year lead times",
        "Ordering long-lead items is one of the few concrete early actions a nuclear developer can take",
        "Contract with Doosan demonstrates some credible early-stage nuclear intent",
      ]},
    ],
  },

  ttu: {
    label: "Texas Tech University System",
    sub: "99-Year Ground Lease - 7,570 Acres in Carson County, TX",
    category: "partner",
    flag: "CONDITIONAL",
    flagColor: "#f59e0b",
    icon: "🎓",
    sections: [
      { title: "The Lease Agreement", items: [
        "Texas Tech University System granted Fermi a 99-year ground lease",
        "Site: ~7,570 acres in Carson County, TX (Texas Panhandle)",
        "Adjacent to DOE's Pantex nuclear weapons facility - strategic site choice",
        "CRITICAL CONDITION: Lease does NOT formally begin until:",
        "  (1) Fermi signs agreement with a data center subtenant for at least 200 MW AND 200,000 sq ft",
        "  (2) Formal lease commencement agreement executed",
        "Without a signed tenant, the 99-year lease has not technically commenced",
        "Fermi must also fund TTU System Excellence Fund: up to $200M",
        "Annual lease payments: percentage of appraised data center value (escalating structure)",
      ]},
      { title: "Texas Tech Partnership (Broader)", items: [
        "Texas Tech University announced partnership with Fermi June 2025",
        "Partnership framed as 'world's largest Advanced Energy and Intelligence Campus'",
        "Academic research collaboration announced alongside land deal",
        "Texas Tech Nuclear Engineering program would benefit from proximity to campus",
        "Fermi and TTU presented jointly at American Nuclear Society conference",
        "Carson County Commissioner Court approved cooperation agreements Oct 2025",
      ]},
      { title: "Assessment", items: [
        "Land deal is real but has a crucial contingency: no tenant = no formal lease commencement",
        "TTU partnership provides legitimacy and academic cover",
        "The 200 MW / 200,000 sq ft threshold is achievable but requires Amazon replacement",
        "Land without a tenant agreement is a sunk cost for Fermi, not a business",
      ]},
    ],
  },

  enec: {
    label: "Emirates Nuclear Energy Corp. (ENEC)",
    sub: "UAE's Barakah Nuclear Plant - Prior Employer of Both Uzmans",
    category: "partner",
    flag: "REFERENCE",
    flagColor: "#06b6d4",
    icon: "⚙",
    sections: [
      { title: "ENEC Overview", items: [
        "Emirates Nuclear Energy Corporation: UAE government nuclear energy company",
        "Responsible for developing UAE's first nuclear power plant",
        "Project: Barakah Nuclear Energy Plant (Barakah, Abu Dhabi emirate)",
        "Technology: 4 x APR-1400 (Advanced Power Reactor, South Korean design)",
        "Construction partner: KEPCO (Korea Electric Power Corporation) and Hyundai E&C",
        "Unit 1: Commercial operation 2020; Units 2-4: progressively online through 2024",
        "Total capacity: ~5.6 GW - one of the largest nuclear projects globally in recent years",
        "Widely cited as a successful, on-schedule, near-on-budget nuclear build",
      ]},
      { title: "Uzman Family at ENEC", items: [
        "Mesut Uzman: VP of Engineering and Technical Services at ENEC",
        "Managed engineering delivery for all 4 Barakah units",
        "Sezin Uzman: Director of Procedures and Records Management at ENEC",
        "Managed documentation, compliance, and quality assurance for Barakah",
        "Both Uzmans held senior roles during the most complex phase of nuclear construction",
        "Their Barakah credentials are the strongest nuclear-specific experience in Fermi's leadership",
        "Key difference from Project Matador: Barakah used APR-1400 (Korean design), not AP1000 (Westinghouse)",
      ]},
    ],
  },

  doe: {
    label: "Dept. of Energy (DOE) - Loan Programs Office",
    sub: "Former Agency of Rick Perry; Now Processing Fermi Loan Application",
    category: "political",
    flag: "CONFLICT",
    flagColor: "#ef4444",
    icon: "🏛",
    sections: [
      { title: "The Revolving Door", items: [
        "Rick Perry: U.S. Secretary of Energy March 2017 - December 2019",
        "During tenure, Perry authorized $3.7B in additional DOE loan guarantees for Vogtle nuclear plant",
        "Vogtle went $17B over budget; federal taxpayer exposure reached $12B",
        "Perry left DOE December 2019",
        "January 2025 (5+ years later): Perry co-founded Fermi America",
        "Fermi is now in 'pre-approval' process with DOE Loan Programs Office",
        "Same office Perry oversaw as Secretary; same type of nuclear loan guarantee he previously authorized",
        "Current DOE political leadership is Trump-aligned - same political orbit as Perry and Fermi",
      ]},
      { title: "Loan Programs Office Context", items: [
        "DOE's Loan Programs Office (LPO) administers loan guarantees for energy projects",
        "Previous nuclear guarantee: Vogtle ($12B+ federal exposure) - turned into massive loss",
        "Fermi project cost estimate: $80-120B - would require enormous LPO commitment",
        "LPO has >$400B in lending authority after Inflation Reduction Act",
        "Trump administration has signaled support for nuclear energy broadly",
        "No formal loan application or approval has been publicly announced",
        "Perry's prior LPO authorization (Vogtle) is cautionary precedent",
      ]},
      { title: "Texas HB14", items: [
        "Texas HB14 Advanced Nuclear Completion Fund: state-level nuclear financing",
        "Fermi has applied for support under this program",
        "Texas political alignment with Trump and Fermi leadership facilitates state support",
      ]},
    ],
  },

  nrc: {
    label: "Nuclear Regulatory Commission (NRC)",
    sub: "COLA Accepted; Environmental Review Underway",
    category: "political",
    flag: "ACTIVE REVIEW",
    flagColor: "#06b6d4",
    icon: "🏛",
    sections: [
      { title: "Fermi's NRC Status", items: [
        "Fermi filed Combined License Application (COLA) for 4 AP1000 reactors: June 2025",
        "NRC accepted COLA for formal docketing: September 2025",
        "This is the first new AP1000 COLA accepted by NRC since Vogtle",
        "Federal Register notice March 2026: NRC initiating Environmental Impact Statement (EIS) scoping",
        "Fermi selected as FIRST company for NRC's new streamlined EIS pilot program",
        "Pilot program created by Trump May 2025 executive orders",
        "Under pilot: Applicant (Fermi) can prepare its own draft EIS - major timeline shortcut",
        "NRC staff reviews; public comment period open during scoping",
        "Full COLA review typically takes 4-6 years under normal procedures",
        "Streamlined process could reduce timeline - exact reduction unclear",
      ]},
      { title: "NRC Process Context", items: [
        "Normal NRC COLA review: Multi-year Safety Review + EIS + public hearings",
        "Trump EOs: Reorganized NRC for faster approvals; gave Energy Secretary design authority",
        "EOs invoked Defense Production Act for reactor fuel - supply chain support",
        "Critics: Streamlining NRC may compromise nuclear safety regulatory framework",
        "Proponents: Existing NRC process is unnecessarily slow for proven designs like AP1000",
      ]},
    ],
  },

  tceq: {
    label: "TCEQ - Texas Commission on Environmental Quality",
    sub: "6 GW Permit Approved; TCEQ Overruled Own Public Interest Counsel",
    category: "political",
    flag: "CONTROVERSIAL",
    flagColor: "#f97316",
    icon: "🏛",
    sections: [
      { title: "Permit History", items: [
        "TCEQ is the Texas state environmental regulatory agency",
        "Fermi filed initial 6 GW Clean Air Permit for Project Matador's natural gas generation",
        "Public comment period drew 279 submissions (majority opposing)",
        "63 formal requests for contested case hearing submitted",
        "21 requests for additional public meetings submitted",
        "TCEQ's own Office of Public Interest Counsel RECOMMENDED granting contested case hearing",
        "TCEQ commissioners OVERRULED their own public interest counsel",
        "Denied ALL 63 contested case hearing requests",
        "Denied all requests for additional public meetings",
        "6 GW Clean Air Permit APPROVED: February 2026",
        "Fermi filed SECOND 5 GW permit application: March 27, 2026 (total 17 GW)",
      ]},
      { title: "Political Context", items: [
        "TCEQ operates under the Texas Governor's office (Greg Abbott, Republican)",
        "Texas political leadership is closely aligned with Trump administration",
        "Rick Perry served as Texas Governor for 15 years; deep relationships with state regulators",
        "Decision to override public interest counsel drew criticism from environmental groups",
        "Public Citizen issued formal critique of TCEQ process",
        "Sierra Club Texas published analysis opposing permit",
      ]},
      { title: "Environmental Issues", items: [
        "Proposed emissions: 23.5 million pounds of greenhouse gases annually",
        "That figure ~ 12% of ALL Texas power plant emissions in 2023 - from a single campus",
        "Location above Ogallala Aquifer: already depleting faster than replenishment",
        "Water agreement: 2.5M gallons/day committed to Fermi",
        "Texas Panhandle is a water-scarce region dependent on the Ogallala",
        "Air quality concerns in Carson County (rural community with existing agricultural use)",
      ]},
    ],
  },

  cruz_pac: {
    label: "Keep the Promise II",
    sub: "Ted Cruz Super PAC - Toby Neugebauer's $10M Sole Donation",
    category: "political",
    flag: "POLITICAL",
    flagColor: "#f97316",
    icon: "🏛",
    sections: [
      { title: "The Donation", items: [
        "Keep the Promise II: Ted Cruz 2016 Presidential Campaign Super PAC",
        "Toby Neugebauer was the SOLE donor",
        "Amount: $10 million committed (April 9, 2015) - one of largest single-donor contributions of 2016 cycle",
        "Withdrawn: $9M returned after Cruz dropped out of race",
        "Net contribution: ~$1M ultimately deployed through the PAC",
        "Cruz represented Texas Congressional District adjacent to Neugebauer family's district (Randy Neugebauer)",
        "Donation reflects Neugebauer's Texas GOP network and ambitions for political influence",
      ]},
    ],
  },

  trump_pac: {
    label: "Trump Campaign / PACs",
    sub: "Multiple Donors Connected to Fermi - Neugebauer + Beal",
    category: "political",
    flag: "POLITICAL",
    flagColor: "#f97316",
    icon: "🏛",
    sections: [
      { title: "Toby Neugebauer Donations", items: [
        "$25,000 to Trump Victory (joint fundraising committee with RNC)",
        "$28,000+ via WinRed (Trump campaign online fundraising platform)",
        "Total direct Trump-related donations: $53,000+",
        "Plus: donated $110,000+ to Rick Perry Super PAC (Perry was pre-Trump GOP establishment)",
      ]},
      { title: "Andy Beal Donations", items: [
        "Served as economic policy advisor to Trump 2016 campaign",
        "Created 'Save America From Its Government' - pro-Trump Super PAC",
        "$350,000 to RallyPAC (pro-Trump)",
        "$2M to separate Trump Super PAC",
        "$1M toward Trump inaugural activities",
        "2024 cycle: $1M+ to Turnout For America (pro-Trump)",
        "Total Trump-related giving by Beal: $3M-$5M+",
      ]},
      { title: "Why This Matters", items: [
        "Trump's EOs directly benefit Fermi by streamlining NRC, accelerating nuclear approvals",
        "Trump personally endorsed the project via naming rights",
        "Trump appointees at DOE and DOE Loan Programs Office will decide on Fermi loan application",
        "The political donation -> political appointment -> regulatory benefit chain is unusually tight",
        "No quid pro quo has been alleged or proven; pattern warrants transparency scrutiny",
      ]},
    ],
  },

  lupia: {
    label: "Lupia v. Fermi Inc.",
    sub: "S.D.N.Y. No. 1:26-cv-00050 - Securities Fraud Class Action",
    category: "legal",
    flag: "ACTIVE LITIGATION",
    flagColor: "#ec4899",
    icon: "⚖",
    sections: [
      { title: "Case Overview", items: [
        "Filed: January 5, 2026 in U.S. District Court, Southern District of New York",
        "Case No.: 1:26-cv-00050",
        "Lead Plaintiff: Salvatore Lupia (purchased ~300 shares, Oct 22 - Nov 21, 2025, at $15.11-$19.96/share)",
        "Class Period: October 1, 2025 (IPO date) through December 11, 2025 (tenant termination)",
        "18 named defendants: Fermi Inc. + 8 officers/directors + 10 underwriters",
      ]},
      { title: "Named Defendants - Individuals", items: [
        "Toby Neugebauer (CEO)",
        "Miles Everson (CFO)",
        "Griffin Perry (Co-Founder)",
        "Jacobo Ortiz (Director)",
        "Marius Haas (Director)",
        "Rick Perry (Exec. Chairman)",
        "Cordel Robbin-Coker (Director)",
        "Lee McIntire (Director)",
      ]},
      { title: "Named Defendants - Underwriters", items: [
        "UBS Securities (lead; purchased 8.45M IPO shares)",
        "Evercore Group",
        "Cantor Fitzgerald & Co.",
        "Mizuho Securities USA",
        "Macquarie Capital (USA)",
        "Rothschild & Co.",
        "Stifel, Nicolaus & Co.",
        "Truist Securities",
        "Joh. Berenberg, Gossler & Co.",
        "Panmure Liberum",
      ]},
      { title: "Legal Claims", items: [
        "Count 1: Securities Act S.11 - False/misleading statements in IPO registration statement",
        "S.11 imposes STRICT LIABILITY: No proof of intent required for issuer",
        "S.11 requires underwriters prove they conducted adequate due diligence (high bar)",
        "Count 2: Securities Act S.15 - Control person liability",
        "Count 3: Exchange Act S.10(b) / Rule 10b-5 - Securities fraud (requires scienter)",
        "Count 4: Exchange Act S.20(a) - Control person liability for 10(b) claims",
      ]},
      { title: "Alleged Misrepresentations", items: [
        "IPO filing: 'In advanced discussions with a select group of foundational anchor tenants'",
        "IPO filing: Phase 1 'reverse-engineered based on direct demand signals from AI buyers'",
        "Nov 4, 2025: Described $150M AICA as a 'pivotal milestone'",
        "Q3 2025 10-Q: Listed 'Tenant Prepayments' as principal liquidity source",
        "Alleged failures: Did not disclose existential reliance on single unnamed counterparty",
        "Did not disclose exclusivity expiration date (December 9, 2025) - 2 days before termination",
        "Did not disclose that no funds had ever been drawn under the AICA",
        "Did not disclose absence of any other binding agreements",
      ]},
      { title: "Timeline of Events", items: [
        "Sep 2025: Non-binding LOI with anonymous 'investment-grade' tenant announced",
        "Oct 1, 2025: IPO at $21/share; raised $682.5M",
        "Oct 1, 2025: CLASS PERIOD BEGINS",
        "Nov 4, 2025: $150M AICA announced as 'pivotal milestone'",
        "Dec 9, 2025: LOI exclusivity period expires (not publicly disclosed)",
        "Dec 11, 2025: Tenant terminates AICA; Fermi discloses via 8-K",
        "Dec 11, 2025: CLASS PERIOD ENDS; stock crashes 33.8%",
        "Dec 2025: Hagens Berman announces investigation",
        "Jan 5, 2026: Lupia complaint filed",
        "Mar 6, 2026: Lead plaintiff motion deadline",
        "Mar 30, 2026: Q4 2025 earnings - stock falls 23% more; stock now ~$5",
      ]},
      { title: "Law Firms Involved", items: [
        "Hagens Berman Sobol Shapiro (first to announce; filed class action Jan 27, 2026)",
        "Glancy Prongay & Murray (filed initial Lupia complaint)",
        "Robbins Geller Rudman & Dowd (securities fraud specialists; largest in field)",
        "Bleichmar Fonti & Auld (BFA Law) - filed under Sec. Act claims",
        "Levi & Korsinsky",
        "DiCello Levitt",
        "Faruqi & Faruqi LLP",
        "Schall Law Firm",
        "DJS Law Group",
        "Gross Law Firm",
        "Pomerantz LLP",
        "13 law firms total announced investigations or filed",
      ]},
      { title: "Status & Outlook", items: [
        "Lead plaintiff motion deadline: March 6, 2026 (passed)",
        "Lead plaintiff appointment: Pending (not publicly announced as of March 31, 2026)",
        "No consolidated complaint filed yet",
        "No formal SEC investigation publicly announced (but Hagens Berman soliciting SEC whistleblowers)",
        "Damages pool: Large - stock down 76% from $21 IPO price",
        "S.11 strict liability against issuer + underwriters gives plaintiffs strong early posture",
        "Defense will argue: Risk disclosures in IPO prospectus were adequate; tenant situation was genuinely uncertain",
        "Expected motion to dismiss: Filed ~6 months after consolidated complaint",
        "Full trial: 2-4 years away if not settled",
      ]},
    ],
  },

  trustee: {
    label: "GloriFi Bankruptcy Trustee",
    sub: "Scott M. Seidel - Adversary Proceeding vs. Neugebauer (Self-Dealing)",
    category: "legal",
    flag: "ACTIVE LITIGATION",
    flagColor: "#ec4899",
    icon: "⚖",
    sections: [
      { title: "The Adversary Proceeding", items: [
        "Trustee: Scott M. Seidel, appointed in GloriFi Chapter 7 case",
        "GloriFi Case: No. 23-30246-MVL7, N.D. Texas Bankruptcy Court",
        "Adversary proceeding filed against Toby Neugebauer and related entities",
        "Core allegations: self-dealing transactions, misrepresentation to investors, deliberate cash crises",
        "Specific allegation: Proposed transfer of GloriFi technology to Animo Bancorp (Neugebauer's own company)",
        "Kirkland & Ellis (representing $20M+ noteholders) flagged transfer as self-interested",
        "Trustee's filing: Neugebauer had 'unyielding desire to exercise singular control at all costs'",
        "Trustee's filing: 'complete disregard and disdain for corporate governance'",
        "Attempted board manipulation: expanded board, removed opposing directors",
        "4-day trial: December 2024",
        "97-page Memorandum Opinion issued by bankruptcy court",
        "Outcome of trial: Not publicly available in detail as of March 31, 2026",
      ]},
      { title: "Scope of Claims", items: [
        "Breach of fiduciary duty",
        "Fraudulent transfer (technology to Animo Bancorp)",
        "Misrepresentation to investors",
        "Preferential payments to related parties",
        "Deliberate creation of cash crisis to engineer favorable transactions",
      ]},
      { title: "Relevance to Fermi", items: [
        "Fermi's own SEC IPO filings disclose this litigation as material risk",
        "Filing acknowledges it may distract Neugebauer and generate negative press",
        "Patterns alleged in GloriFi (self-dealing, family employment, cash crisis) have analogs at Fermi",
        "Noah Neugebauer (Toby's son) employed at GloriFi before Fermi; now EVP at Fermi",
        "Fermi's $132.7M SBC to <40 employees echoes GloriFi's lavish spending before bankruptcy",
      ]},
    ],
  },

  winston: {
    label: "Winston & Strawn LLP",
    sub: "$1.7B Malpractice Suit - Filed by GloriFi Bankruptcy Trustee",
    category: "legal",
    flag: "LITIGATION",
    flagColor: "#ec4899",
    icon: "⚖",
    sections: [
      { title: "The Lawsuit", items: [
        "Plaintiff: GloriFi bankruptcy estate (Trustee Scott M. Seidel)",
        "Defendant: Winston & Strawn LLP (major international law firm; ~900 lawyers globally)",
        "Demand: $1.7 billion in damages",
        "Filed: 2024 (specific date not in public record)",
        "Claim: Winston & Strawn served as GloriFi's law firm and allegedly facilitated Neugebauer's self-dealing",
        "Allegation: Firm saw Neugebauer as a 'cash cow' and prioritized its fees over client's interests",
        "Allegation: Firm helped Neugebauer remove independent directors Ayers and Findley",
        "Allegation: Firm assisted with self-interested board manipulations",
      ]},
      { title: "Parallel Suit", items: [
        "Similar malpractice suit filed against Chapman & Cutler LLP",
        "Multiple law firms implicated in GloriFi's governance failures",
        "These suits are part of bankruptcy estate's effort to maximize recovery for creditors",
        "Malpractice suits against major law firms are rare; $1.7B demand is extraordinary",
        "Winston & Strawn has denied all wrongdoing (expected response)",
      ]},
      { title: "Significance", items: [
        "Scale of allegations ($1.7B) reflects trustee's view of how much was lost through misconduct",
        "If partially successful, would establish legal record of governance failures under Neugebauer",
        "That record would be highly relevant to any Fermi investor litigation",
        "Case ongoing; no verdict or settlement as of March 31, 2026",
      ]},
    ],
  },

  rico: {
    label: "Neugebauer RICO Complaint",
    sub: "Toby Neugebauer as PLAINTIFF - vs. Thiel, Griffin, Ramaswamy, Lonsdale, Ayers et al.",
    category: "legal",
    flag: "FILED",
    flagColor: "#ec4899",
    icon: "⚖",
    sections: [
      { title: "The Complaint", items: [
        "Filed: May 2024",
        "Jurisdiction: Delaware and Georgia federal courts (separate actions)",
        "Plaintiff: Toby Neugebauer",
        "Named defendants (partial list):",
        "  - Peter Thiel (Founders Fund; GloriFi investor)",
        "  - Ken Griffin (Citadel; GloriFi investor)",
        "  - Vivek Ramaswamy (GloriFi investor; 2024 GOP presidential candidate)",
        "  - Joe Lonsdale (Palantir co-founder, 8VC; GloriFi investor)",
        "  - Nick Ayers (GloriFi board member / investor; Pence's former chief of staff)",
        "Length: 140 pages",
        "Core allegation: Defendants orchestrated the Wall Street Journal investigation to destroy GloriFi",
        "Secondary allegation: Defendants 'sabotaged' GloriFi after successful September 2022 launch",
        "Legal theory: RICO (Racketeer Influenced and Corrupt Organizations Act) - typically used for organized crime",
      ]},
      { title: "Context", items: [
        "RICO civil suit requires showing a 'pattern of racketeering activity' - very high bar",
        "Neugebauer essentially argues investors he brought in conspired to destroy his company",
        "Investors (Thiel, Griffin, etc.) counter that GloriFi failed due to Neugebauer's own mismanagement",
        "The WSJ investigation (Oct 10, 2022) reported drinking allegations sourced from company insiders",
        "Neugebauer claims the story was planted by investor conspirators",
        "Extraordinary situation: CEO suing investors who funded his own company using RICO",
        "Adds to the picture of governance chaos that ended GloriFi",
      ]},
      { title: "Status & Implications for Fermi", items: [
        "Status: Active litigation as of March 31, 2026",
        "Fermi's SEC filings acknowledge this litigation as a potential distraction to Neugebauer",
        "A RICO plaintiff who also faces a bankruptcy trustee's self-dealing suit is in extraordinary legal position",
        "Both sides of litigation (RICO plaintiff + trustee defendant) play out simultaneously",
        "Combined litigation burden on Neugebauer while running a pre-revenue company is significant",
      ]},
    ],
  },
};

// -- Edges (same as before but used for display) --------------
const EDGES = [
  { source: "toby", target: "noah", label: "Father -> Son", type: "family" },
  { source: "rick", target: "griffin", label: "Father -> Son", type: "family" },
  { source: "mesut", target: "sezin", label: "Husband <-> Wife", type: "family" },
  { source: "randy", target: "toby", label: "Father -> Son", type: "family" },
  { source: "toby", target: "fermi", label: "CEO & Co-Founder", type: "leadership" },
  { source: "rick", target: "fermi", label: "Executive Chairman", type: "leadership" },
  { source: "noah", target: "fermi", label: "EVP Commercials", type: "leadership" },
  { source: "griffin", target: "fermi", label: "Co-Founder", type: "leadership" },
  { source: "mesut", target: "fermi", label: "Chief Nuclear Const. Officer", type: "leadership" },
  { source: "sezin", target: "fermi", label: "VP Nuclear Supply Chain", type: "leadership" },
  { source: "fermi", target: "matador", label: "Developing", type: "core" },
  { source: "toby", target: "quantum", label: "Co-Founded / Co-Managing Partner", type: "career" },
  { source: "toby", target: "glorifi", label: "Founded / CEO -> bankrupt", type: "career" },
  { source: "noah", target: "glorifi", label: "Financial Analyst (prior role)", type: "career" },
  { source: "toby", target: "banzai", label: "Family Office", type: "career" },
  { source: "griffin", target: "greyrock", label: "Co-Founder / Managing Dir.", type: "career" },
  { source: "griffin", target: "granite", label: "Co-Chairman", type: "career" },
  { source: "mesut", target: "enec", label: "VP Engineering - Barakah", type: "career" },
  { source: "sezin", target: "enec", label: "Director Procedures & Records", type: "career" },
  { source: "toby", target: "cruz_pac", label: "$10M sole donor", type: "political_donation" },
  { source: "toby", target: "trump_pac", label: "$53K+ donations", type: "political_donation" },
  { source: "andy", target: "trump_pac", label: "$3M+ donations; Campaign economic advisor", type: "political_donation" },
  { source: "toby", target: "rick", label: "$110K+ pre-Fermi donations; private jet travel", type: "political_donation" },
  { source: "trump", target: "rick", label: "Appointed U.S. Energy Secretary (2017)", type: "political" },
  { source: "trump", target: "andy", label: "Economic advisor; praised at 2016 Dallas rally", type: "political" },
  { source: "trump", target: "fermi", label: "Campus named after; May 2025 EOs streamlined NRC", type: "political" },
  { source: "trump", target: "matador", label: "Campus officially named 'Donald J. Trump...'", type: "political" },
  { source: "rick", target: "doe", label: "Secretary of Energy 2017-2019", type: "revolving_door" },
  { source: "fermi", target: "doe", label: "Seeking DOE loan guarantee (pre-approval)", type: "revolving_door" },
  { source: "matador", target: "nrc", label: "COLA filed June 2025; EIS scoping March 2026", type: "regulatory" },
  { source: "matador", target: "tceq", label: "6GW permit approved Feb 2026; +5GW filed Mar 2026", type: "regulatory" },
  { source: "fermi", target: "mufg", label: "$500M (SOFR+4%); 3 Siemens F-class turbines", type: "financing" },
  { source: "fermi", target: "keystone", label: "$200M equipment facility; HV electrical gear", type: "financing" },
  { source: "keystone", target: "cape", label: "Co-arrangers on $200M facility", type: "financing" },
  { source: "keystone", target: "virtus", label: "Acquired by Virtus 2025 (~$370M)", type: "financing" },
  { source: "fermi", target: "beal_bank", label: "$165M; 6 SGT-800-57 turbines; 2028 delivery", type: "financing" },
  { source: "beal_bank", target: "andy", label: "Owned 100% by Andy Beal", type: "financing" },
  { source: "matador", target: "hyundai", label: "Deepened nuclear construction partnership Jul 2025", type: "partnership" },
  { source: "matador", target: "siemens", label: "6 SGT-800 + 1.1GW F-class LOI ordered", type: "partnership" },
  { source: "matador", target: "westinghouse", label: "4x AP1000 reactors; COLA filed", type: "partnership" },
  { source: "matador", target: "doosan", label: "Long-lead nuclear components contracted", type: "partnership" },
  { source: "matador", target: "ttu", label: "99-year lease; contingent on 200MW tenant", type: "partnership" },
  { source: "glorifi", target: "trustee", label: "Bankruptcy estate pursuing adversary claims", type: "legal" },
  { source: "trustee", target: "toby", label: "Self-dealing, misrepresentation allegations", type: "legal" },
  { source: "trustee", target: "winston", label: "$1.7B malpractice suit (filed 2024)", type: "legal" },
  { source: "toby", target: "rico", label: "PLAINTIFF - 140-page RICO complaint", type: "legal" },
  { source: "fermi", target: "lupia", label: "DEFENDANT - IPO securities fraud class action", type: "legal" },
  { source: "amazon", target: "fermi", label: "Departed anchor tenant (Dec 11, 2025)", type: "legal" },
  { source: "amazon", target: "lupia", label: "Termination triggered class action", type: "legal" },
];

const CAT_COLOR = {
  person: "#60a5fa",
  company_core: "#f59e0b",
  company_failed: "#ef4444",
  company_other: "#8b5cf6",
  finance: "#10b981",
  partner: "#06b6d4",
  political: "#f97316",
  legal: "#ec4899",
};

const CAT_LABEL = {
  person: "Key People",
  company_core: "Fermi Core",
  company_failed: "Failed/Departed",
  company_other: "Prior Companies",
  finance: "Lenders/Finance",
  partner: "Partners/Suppliers",
  political: "Political/Govt",
  legal: "Legal Actions",
};

const EDGE_COLOR = {
  family: "#fbbf24",
  leadership: "#60a5fa",
  core: "#f59e0b",
  career: "#a78bfa",
  political_donation: "#f97316",
  political: "#fb923c",
  revolving_door: "#ef4444",
  regulatory: "#06b6d4",
  financing: "#10b981",
  partnership: "#34d399",
  legal: "#ec4899",
};

const EDGE_LABEL = {
  family: "Family Tie",
  leadership: "Leadership",
  core: "Core Project",
  career: "Career / Prior Role",
  political_donation: "Political Donation",
  political: "Political Connection",
  revolving_door: "⚠ Revolving Door",
  regulatory: "Regulatory",
  financing: "Financing Deal",
  partnership: "Partnership",
  legal: "Legal Action",
};

// --- NODE IMPORTANCE WEIGHTS (1-10) -----------------------------------------
const NODE_WEIGHTS = {
  fermi:10, matador:9, toby:9, trump:8, rick:8,
  glorifi:7, lupia:7, amazon:6, doe:6, andy:6,
  noah:5, griffin:5, mesut:5, trustee:5, mufg:5,
  beal_bank:5, nrc:5, tceq:5, sezin:4, winston:4,
  rico:4, keystone:4, hyundai:4, westinghouse:4,
  siemens:4, ttu:4, quantum:4, trump_pac:4, cruz_pac:4,
  cape:3, virtus:3, greyrock:3, granite:3, banzai:3,
  randy:3, doosan:3, enec:3,
};
const weightToRadius = (id, isSel) => {
  const w = NODE_WEIGHTS[id] || 3;
  const base = 16 + (w / 10) * 22;
  return isSel ? base + 8 : base;
};

// --- SOURCES (cited from primary research) -----------------------------------
const NODE_SOURCES = {
  toby:[
    {label:"SEC S-11 Registration Statement (Fermi LLC, Sep 2025)",url:"https://www.sec.gov/Archives/edgar/data/2071778/000121390025085175/ea0252333-01.htm"},
    {label:"WSJ / Inkl: How GloriFi Collapsed (Oct 10, 2022)",url:"https://www.inkl.com/news/how-a-new-anti-woke-bank-stumbled"},
    {label:"Bloomberg Law: Anti-Woke Banking Startup Founder Sued by Bankruptcy Estate",url:"https://news.bloomberglaw.com/bankruptcy-law/anti-woke-banking-startup-founder-sued-by-bankruptcy-estate"},
    {label:"WFAA: Businessmen behind anti-woke Dallas bank locked in legal battle",url:"https://www.wfaa.com/article/money/billionaires-feud-bankrupt-anti-woke-dallas-bank/287-7cda5a3a-d081-48ac-ad4f-2ec326c84307"},
    {label:"Fortune: Rick Perry's AI power startup Fermi has $16B market cap-zero revenue (Oct 2025)",url:"https://fortune.com/2025/10/10/rick-perry-ai-power-startup-fermi-ipo-zero-revenue/"},
    {label:"Campaign Money: Toby Neugebauer - $19M+ in political contributions (2016 cycle)",url:"https://www.campaignmoney.com/political/contributions/toby-neugebauer.asp?cycle=16"},
    {label:"Ballotpedia: Keep the Promise Super PACs (sole $10M donor)",url:"https://ballotpedia.org/Keep_the_Promise_Super_PACs"},
    {label:"TX Bankruptcy Court: Memorandum Opinion, Adversary No. 24-3038",url:"https://www.txnb.uscourts.gov/sites/txnb/files/opinions/24-3038.pdf"},
    {label:"Daily Beast: Toby Neugebauer, CEO of Anti-Woke Bank GloriFi, Resigns",url:"https://www.thedailybeast.com/toby-neugebauer-ceo-of-anti-woke-bank-glorifi-resigns/"},
  ],
  rick:[
    {label:"Texas Tribune: Grand Jury Indicts Perry Over Integrity Unit Veto (Aug 2014)",url:"https://www.texastribune.org/2014/08/15/grand-jury-indicts-perry-abuse-authority/"},
    {label:"Texas Tribune: Court of Criminal Appeals Dismisses Perry Indictment (Feb 2016)",url:"https://www.texastribune.org/2016/02/24/texas-high-court-dismisses-rick-perry-indictments/"},
    {label:"NPR: Rick Perry To Resign As Trump's Energy Secretary (Oct 2019)",url:"https://www.npr.org/2019/10/17/593950148/energy-secretary-rick-perry-resigns"},
    {label:"E&E News: Rick Perry-led company eyes DOE loan for massive AI project",url:"https://www.eenews.net/articles/rick-perry-led-company-eyes-doe-loan-for-massive-ai-project/"},
    {label:"Washington Examiner: Rick Perry forks over $3.7B for ailing nuclear plant (Vogtle)",url:"https://www.washingtonexaminer.com/policy/energy/daily-on-energy-rick-perry-forks-over-3-7-billion-in-financing-for-ailing-nuclear-plant"},
    {label:"Truthout: Former Energy Secretary Perry Rejoins Board of Dakota Access Owner",url:"https://truthout.org/articles/former-energy-secretary-rick-perry-rejoins-board-of-dakota-access-owner/"},
    {label:"Governing: Rick Perry's Complicated Energy Legacy in Texas",url:"https://www.governing.com/archive/tt-rick-perry-energy-legacy.html"},
    {label:"ProPublica: Rick Perry's Texas Giveaways (ETF/donor patterns)",url:"https://www.propublica.org/article/rick-perrys-energy-grants-in-texas"},
    {label:"American Oversight: Rick Perry's Energy Industry Connections",url:"https://americanoversight.org/investigation/rick-perrys-energy-industry-connections-in-the-u-s-and-abroad/"},
  ],
  noah:[
    {label:"SEC S-11 Registration Statement (Fermi LLC, Sep 2025)",url:"https://www.sec.gov/Archives/edgar/data/2071778/000121390025085175/ea0252333-01.htm"},
    {label:"ZoomInfo: Noah Neugebauer - EVP Commercials at Fermi America",url:"https://www.zoominfo.com/p/Noah-Neugebauer/3889287831"},
    {label:"Clearcove Advisors: About Us",url:"https://www.clearcoveadvisors.com/about"},
    {label:"Data Center Dynamics: Fermi's Paradox (management team analysis)",url:"https://www.datacenterdynamics.com/en/opinions/fermis-paradox/"},
  ],
  griffin:[
    {label:"SEC S-11 Registration Statement (Fermi LLC, Sep 2025)",url:"https://www.sec.gov/Archives/edgar/data/2071778/000121390025085175/ea0252333-01.htm"},
    {label:"Grey Rock Energy Partners: Griffin Perry Leadership Page",url:"https://www.grey-rock.com/griffin-perry"},
    {label:"Granite Ridge Resources: Griffin Perry - Co-Chairman Bio",url:"https://www.graniteridge.com/bio/griffin-perry/"},
    {label:"Billionaire Reporter: Toby Neugebauer and Griffin Perry are new billionaires",url:"https://billionairereporter.com/toby-neugebauer-and-griffin-perry/"},
    {label:"Fortune: Rick Perry's AI power startup Fermi has $16B market cap (Oct 2025)",url:"https://fortune.com/2025/10/10/rick-perry-ai-power-startup-fermi-ipo-zero-revenue/"},
  ],
  mesut:[
    {label:"PR Newswire: Fermi Names Mesut & Sezin Uzman to Spearhead Nuclear Power Delivery (Aug 2025)",url:"https://www.prnewswire.com/news-releases/fermi-america-names-two-highly-successful-nuclear-developers-mesut-and-sezin-uzman-to-spearhead-nuclear-power-delivery-302528108.html"},
    {label:"The Org: Mesut Uzman - Advisor at Emirates Nuclear Energy Corporation",url:"https://theorg.com/org/emirates-nuclear-energy-corporation/org-chart/mesut-uzman"},
    {label:"PR Newswire: Mesut Uzman Addresses NRC Regulatory Information Conference 2026",url:"https://www.prnewswire.com/news-releases/fermi-america-chief-nuclear-construction-officer-mesut-uzman-addresses-nrc-regulatory-information-conference-2026-showcasing-project-matadors-position-as-americas-most-advanced-nuclear-build-302710904.html"},
  ],
  sezin:[
    {label:"PR Newswire: Fermi Names Mesut & Sezin Uzman to Spearhead Nuclear Power Delivery (Aug 2025)",url:"https://www.prnewswire.com/news-releases/fermi-america-names-two-highly-successful-nuclear-developers-mesut-and-sezin-uzman-to-spearhead-nuclear-power-delivery-302528108.html"},
    {label:"Accelerant Solutions: Introducing Sezin Uzman - Nuclear Industry Expert",url:"https://discoveraccelerant.com/meet-sezin-uzman-nuclear-industry-expert/"},
  ],
  andy:[
    {label:"Wikipedia: Andrew Beal",url:"https://en.wikipedia.org/wiki/Andrew_Beal"},
    {label:"CNBC: Pro-Trump super PAC backed solely by bank executive (Beal political donations)",url:"https://www.cnbc.com/2019/04/02/pro-trump-super-pac-used-donor-money-to-fund-right-wing-conspiracy-campaign.html"},
    {label:"PR Newswire: Fermi Secures $165M from CSG Investments / Beal Bank USA (Mar 2026)",url:"https://www.prnewswire.com/news-releases/fermi-america-secures-165-million-equipment-financing-facility-from-csg-investments-an-affiliate-of-beal-bank-usa-to-accelerate-delivery-of-six-sgt-800-gas-turbines-for-2028-delivery-at-project-matador-302727192.html"},
    {label:"Yahoo Finance: America's richest banker quadrupled his firm's assets (inflation bet)",url:"https://finance.yahoo.com/news/americas-richest-banker-quadrupled-firms-043545488.html"},
    {label:"NJ Today: Trump allies turn dust & political connections into multi-billion nuclear fortune",url:"https://njtoday.news/2025/12/04/trump-allies-turn-dust-political-connections-into-a-multi-billion-dollar-nuclear-fortune/"},
  ],
  trump:[
    {label:"Yahoo News: Trump signs executive orders to boost nuclear power, speed up approvals (May 2025)",url:"https://www.yahoo.com/news/trump-signs-executive-orders-boost-193853547.html"},
    {label:"Newsweek: Rick Perry Is Building an AI and Nuclear Colossus Named After Trump",url:"https://www.newsweek.com/rick-perry-is-building-an-ai-and-nuclear-colossus-named-after-trump-10771849"},
    {label:"Fermi America: Rick Perry's AI plan - A colossal nuclear campus in Trump's image",url:"https://fermiamerica.com/rick-perrys-ai-plan-a-colossal-nuclear-campus-in-trumps-image/"},
    {label:"NJ Today: Trump allies turn dust & political connections into multi-billion nuclear fortune",url:"https://njtoday.news/2025/12/04/trump-allies-turn-dust-political-connections-into-a-multi-billion-dollar-nuclear-fortune/"},
  ],
  randy:[
    {label:"Ballotpedia: Keep the Promise Super PACs",url:"https://ballotpedia.org/Keep_the_Promise_Super_PACs"},
    {label:"Wikipedia: Toby Neugebauer (references Randy Neugebauer as father)",url:"https://en.wikipedia.org/wiki/Toby_Neugebauer"},
  ],
  fermi:[
    {label:"SEC S-11 Registration Statement (Fermi LLC, filed Sep 8, 2025)",url:"https://www.sec.gov/Archives/edgar/data/2071778/000121390025085175/ea0252333-01.htm"},
    {label:"Fortune: Rick Perry's AI power startup Fermi has $16B market cap-zero revenue (Oct 2025)",url:"https://fortune.com/2025/10/10/rick-perry-ai-power-startup-fermi-ipo-zero-revenue/"},
    {label:"SignalBloom AI: Fermi Posts $486M Inaugural Loss on Non-Cash Charges (Mar 2026)",url:"https://www.signalbloom.ai/news/FRMI/fermi-posts-486m-inaugural-loss-on-non-cash-charges-races-to-build-ai-energy-hub"},
    {label:"Yahoo Finance: Fermi shares tumble after wider-than-expected loss (Mar 2026)",url:"https://finance.yahoo.com/markets/stocks/articles/fermi-shares-tumble-wider-expected-140500001.html"},
    {label:"Data Center Dynamics: Fermi's Paradox (detailed business model critique)",url:"https://www.datacenterdynamics.com/en/opinions/fermis-paradox/"},
    {label:"Haynes Boone: Advises Fermi America on Historic $682.5M IPO and $13.8B Dual Listing",url:"https://www.haynesboone.com/news/press-releases/fermi-america-historic-ipo-and-dual-listing"},
    {label:"Latitude Media: Is Fermi America's IPO all hype?",url:"https://www.latitudemedia.com/news/is-fermi-americas-ipo-all-hype/"},
  ],
  matador:[
    {label:"PR Newswire: World's Largest Private Grid - Fermi to File Additional 5GW Permit (Mar 2026)",url:"https://www.prnewswire.com/news-releases/worlds-largest-private-grid-fermi-america-to-file-additional-5gw-clean-air-permit-for-project-matador-with-the-texas-commission-on-environmental-quality-tceq-upsizing-campus-projections-to-17gw-of-private-power-302713405.html"},
    {label:"Federal Register: NRC EIS Notice - Project Matador AP1000 Units 1-4 (Mar 20, 2026)",url:"https://www.federalregister.gov/documents/2026/03/20/2026-05487/fermi-america-llc-dba-fermi-america-project-matador-advanced-energy-and-intelligence-campus-ap1000"},
    {label:"Texas Tech University: TTU System and Fermi America Announce World's Largest Advanced Energy Campus (Jun 2025)",url:"https://www.texastech.edu/stories/25-06-ttu-system-and-fermi-america-announce-partnership.php"},
    {label:"Sierra Club Texas: Project Matador - Massive AI Data Center Promises Pollution (Dec 2025)",url:"https://www.sierraclub.org/texas/blog/2025/12/project-matador-trump-ai-data-center-texas"},
    {label:"Public Citizen: TCEQ Dismisses Community Concerns in Approving the Trump Energy Campus",url:"https://www.citizen.org/news/tceq-dismisses-community-concerns-in-approving-the-donald-j-trump-advanced-energy-and-intelligence-campus-near-amarillo/"},
    {label:"MediaJustice: Stop Project Matador - Amarillo Data Center Fact Sheet",url:"https://mediajustice.org/wp-content/uploads/2025/10/Amarillo-Fermi-Data-Center-Fact-Sheet.pdf"},
    {label:"Carbon Credits: Project Matador - America's $90B Nuclear Power Solution",url:"https://carboncredits.com/project-matador-americas-90b-nuclear-power-solution-for-ai-semiconductors-and-data-centers/"},
  ],
  glorifi:[
    {label:"Bloomberg Law: Anti-Woke Banking Startup Founder Sued by Bankruptcy Estate",url:"https://news.bloomberglaw.com/bankruptcy-law/anti-woke-banking-startup-founder-sued-by-bankruptcy-estate"},
    {label:"Bloomberg Law: Winston & Strawn Sued in Anti-Woke Bank Startup Bankruptcy",url:"https://news.bloomberglaw.com/bankruptcy-law/winston-strawn-sued-in-anti-woke-banking-startup-bankruptcy"},
    {label:"WFAA: Do-or-die hearing in legal fight over remains of anti-woke bank GloriFi",url:"https://www.wfaa.com/article/news/local/glorifi-bank-hearing-dallas-texas/287-a507b2c6-26e7-4e49-8c67-0a37f1b0650a"},
    {label:"Banking Dive: Neobank GloriFi shuts down following turbulent launch",url:"https://www.bankingdive.com/news/neobank-glorifi-shuts-down-anti-woke-conservative-bank-esg/637197/"},
    {label:"Daily Beast: Toby Neugebauer, CEO of Anti-Woke Bank GloriFi, Resigns",url:"https://www.thedailybeast.com/toby-neugebauer-ceo-of-anti-woke-bank-glorifi-resigns/"},
    {label:"PR Newswire: Bankruptcy Trustee Joins Debt Holders of GloriFi to Pursue Alleged Saboteurs",url:"https://www.prnewswire.com/news-releases/bankruptcy-trustee-joins-debt-holders-of-glorifi-to-pursue-alleged-saboteurs-302203096.html"},
    {label:"TX Bankruptcy Court: Memorandum Opinion, Adversary No. 24-3038",url:"https://www.txnb.uscourts.gov/sites/txnb/files/opinions/24-3038.pdf"},
  ],
  amazon:[
    {label:"Data Center Dynamics: Fermi share price craters as tenant pulls back from $150M deal (Dec 2025)",url:"https://www.datacenterdynamics.com/en/news/fermi-share-price-craters-as-tenant-pulls-back-from-150m-texas-data-center-deal/"},
    {label:"DNYUZ: Mystery Solved - Amazon is the prospective tenant (Dec 2025)",url:"https://dnyuz.com/2025/12/17/mystery-solved-amazon-is-the-prospective-tenant-in-talks-with-data-center-developer-rocked-by-stock-plunge/"},
    {label:"Investing.com: Fermi Inc. tenant ends $150M construction funding agreement",url:"https://www.investing.com/news/sec-filings/fermi-inc-tenant-ends-150-million-construction-funding-agreement-at-project-matador-93CH-4405751"},
    {label:"SEC Form 8-K: Fermi Inc. - Tenant Contract Termination (Dec 11, 2025)",url:"https://www.sec.gov/Archives/edgar/data/0002071778/000121390025095832/ea0260052-8k_fermi.htm"},
  ],
  quantum:[
    {label:"Nebraska Investment Council Staff Memo: Quantum Energy Partners VII, LP",url:"https://nic.nebraska.gov/sites/default/files/doc/8.a.%20Staff%20Memo%20-%20Quantum.pdf"},
    {label:"Wikipedia: Toby Neugebauer (Quantum Energy Partners background)",url:"https://en.wikipedia.org/wiki/Toby_Neugebauer"},
  ],
  greyrock:[
    {label:"Grey Rock Energy Partners: Griffin Perry Leadership Page",url:"https://www.grey-rock.com/griffin-perry"},
    {label:"Energy Council: Podcast - Griffin Perry, Grey Rock Energy Partners",url:"https://energycouncil.com/articles/podcast-griffin-perry-co-founder-and-managing-director-grey-rock-energy-partners/"},
  ],
  granite:[
    {label:"Granite Ridge Resources: Griffin Perry - Co-Chairman Bio",url:"https://www.graniteridge.com/bio/griffin-perry/"},
    {label:"MarketScreener: Griffin Perry - Positions, Relations and Network",url:"https://www.marketscreener.com/insider/GRIFFIN-PERRY-A1OTNB/"},
  ],
  banzai:[
    {label:"SEC S-11 Registration Statement (Fermi LLC) - references Neugebauer family entities",url:"https://www.sec.gov/Archives/edgar/data/2071778/000121390025085175/ea0252333-01.htm"},
  ],
  mufg:[
    {label:"Stock Titan / SEC 8-K: Fermi lands $500M MUFG equipment loan to fund 11GW AI power campus",url:"https://www.stocktitan.net/sec-filings/FRMI/8-k-fermi-inc-reports-material-event-b3e5887fbc0e.html"},
    {label:"TipRanks: Fermi Secures $500M Facility for AI Data Center",url:"https://www.tipranks.com/news/company-announcements/fermi-secures-500-million-facility-for-ai-data-center"},
  ],
  keystone:[
    {label:"Yahoo Finance / PR Newswire: Fermi Makes Initial Draw on $200M Equipment Facility from Keystone National Group (Feb 2026)",url:"https://finance.yahoo.com/news/fermi-america-makes-initial-draw-213700797.html"},
    {label:"Virtus Investment Partners: Keystone National Group - Partner Page",url:"https://international.virtus.com/investment-partners/keystone-national-group"},
  ],
  cape:[
    {label:"BIS Profiles: Cape Commercial Finance LLC - Jacksonville, FL",url:"https://bisprofiles.com/fl/cape-commercial-finance-l20000170634"},
    {label:"ZoomInfo: Cape Commercial Finance - Company Overview",url:"https://www.zoominfo.com/c/cape-commercial-finance/557096820"},
  ],
  beal_bank:[
    {label:"PR Newswire: Fermi Secures $165M from CSG Investments / Beal Bank USA (Mar 2026)",url:"https://www.prnewswire.com/news-releases/fermi-america-secures-165-million-equipment-financing-facility-from-csg-investments-an-affiliate-of-beal-bank-usa-to-accelerate-delivery-of-six-sgt-800-gas-turbines-for-2028-delivery-at-project-matador-302727192.html"},
    {label:"Equipment Finance News: Fermi secures $165M equipment finance facility",url:"https://equipmentfinancenews.com/news/construction/fermi-secures-165m-equipment-finance-facility/"},
    {label:"Wikipedia: Andrew Beal (bank background and political connections)",url:"https://en.wikipedia.org/wiki/Andrew_Beal"},
  ],
  virtus:[
    {label:"Virtus Investment Partners: Keystone National Group - Partner Page",url:"https://international.virtus.com/investment-partners/keystone-national-group"},
  ],
  hyundai:[
    {label:"PR Newswire: Fermi Deepens Strategic Partnership with Hyundai E&C for AP1000 Nuclear Construction (Jul 2025)",url:"https://www.prnewswire.com/news-releases/fermi-america-deepens-strategic-partnership-with-hyundai-ec-to-lead-the-return-of-large-scale-nuclear-construction-in-the-us-with-project-matador-302685787.html"},
    {label:"Data Center Dynamics: Fermi's Paradox (Hyundai E&C track record analysis)",url:"https://www.datacenterdynamics.com/en/opinions/fermis-paradox/"},
  ],
  siemens:[
    {label:"Fermi America: Siemens Energy LOI - 1.1GW F-Class equipment and nuclear collaboration",url:"https://fermiamerica.com/fermi-america-siemens-energy-ai-campus-expansion/"},
    {label:"PR Newswire: Fermi Secures $165M for 6 SGT-800-57 Turbines (Mar 2026)",url:"https://www.prnewswire.com/news-releases/fermi-america-secures-165-million-equipment-financing-facility-from-csg-investments-an-affiliate-of-beal-bank-usa-to-accelerate-delivery-of-six-sgt-800-gas-turbines-for-2028-delivery-at-project-matador-302727192.html"},
  ],
  westinghouse:[
    {label:"ANS: Fermi America looks to go public as NRC accepts COLA for AP1000s (Sep 2025)",url:"https://www.ans.org/news/2025-09-10/article-7357/fermi-america-looks-to-go-public-as-nrc-accepts-cola-for-ap1000s/"},
    {label:"EIA: Plant Vogtle Unit 4 begins commercial operation (AP1000 precedent)",url:"https://www.eia.gov/todayinenergy/detail.php?id=61963"},
    {label:"Modern Power Systems: Vogtle AP1000 project - the end is in sight, at last",url:"https://www.modernpowersystems.com/analysis/vogtle-ap1000-project-the-end-is-in-sight-at-last-11194974/"},
    {label:"Federal Register: NRC EIS Notice - Project Matador AP1000 Units 1-4 (Mar 2026)",url:"https://www.federalregister.gov/documents/2026/03/20/2026-05487/fermi-america-llc-dba-fermi-america-project-matador-advanced-energy-and-intelligence-campus-ap1000"},
  ],
  doosan:[
    {label:"PR Newswire: Fermi Inks Historic Nuclear Deals - Hyundai E&C and Doosan Enerbility (Jul 2025)",url:"https://www.prnewswire.com/news-releases/fermi-america-inks-historic-nuclear-deals-ahead-of-president-trumps-seoul-visit-securing-lead-position-to-initiate-ap1000s-for-americas-nuclear-renaissance-302594935.html"},
  ],
  ttu:[
    {label:"Texas Tech University: TTU System and Fermi America Announce World's Largest Advanced Energy Campus (Jun 2025)",url:"https://www.texastech.edu/stories/25-06-ttu-system-and-fermi-america-announce-partnership.php"},
    {label:"Lubbock Lights: Texas Tech, Fermi team up on Project Matador near Pantex plant",url:"https://lubbocklights.com/texas-tech-fermi-team-up-on-project-matador-to-power-artificial-intelligence-near-pantex-plant-in-panhandle/"},
    {label:"ANS: Fermi America, Texas Tech share vision for massive power and data complex (Jun 2025)",url:"https://www.ans.org/news/2025-06-30/article-7159/fermi-america-texas-tech-share-vision-for-massive-power-and-data-complex/"},
    {label:"Amarillo Tribune: Carson County Commissioners approve agreements with Fermi America (Oct 2025)",url:"https://amarillotribune.org/2025/10/28/carson-county-commissioners-approve-agreements-with-fermi-america/"},
  ],
  enec:[
    {label:"The Org: Mesut Uzman - Advisor at Emirates Nuclear Energy Corporation",url:"https://theorg.com/org/emirates-nuclear-energy-corporation/org-chart/mesut-uzman"},
    {label:"PR Newswire: Fermi Names Mesut & Sezin Uzman (cites ENEC/Barakah experience)",url:"https://www.prnewswire.com/news-releases/fermi-america-names-two-highly-successful-nuclear-developers-mesut-and-sezin-uzman-to-spearhead-nuclear-power-delivery-302528108.html"},
  ],
  doe:[
    {label:"E&E News: Rick Perry-led company eyes DOE loan for massive AI project",url:"https://www.eenews.net/articles/rick-perry-led-company-eyes-doe-loan-for-massive-ai-project/"},
    {label:"Washington Examiner: Rick Perry forks over $3.7B in financing for ailing nuclear plant (Vogtle)",url:"https://www.washingtonexaminer.com/policy/energy/daily-on-energy-rick-perry-forks-over-3-7-billion-in-financing-for-ailing-nuclear-plant"},
    {label:"ThinkProgress: Perry made taxpayers invest in a $25B nuclear financial quagmire (Vogtle)",url:"https://archive.thinkprogress.org/perry-loan-guarantee-vogtle-d0772a872343/"},
  ],
  nrc:[
    {label:"ANS: Fermi America looks to go public as NRC accepts COLA for AP1000s (Sep 2025)",url:"https://www.ans.org/news/2025-09-10/article-7357/fermi-america-looks-to-go-public-as-nrc-accepts-cola-for-ap1000s/"},
    {label:"Federal Register: NRC EIS Notice - Project Matador AP1000 Units 1-4 (Mar 20, 2026)",url:"https://www.federalregister.gov/documents/2026/03/20/2026-05487/fermi-america-llc-dba-fermi-america-project-matador-advanced-energy-and-intelligence-campus-ap1000"},
    {label:"Daily Energy Insider: NRC seeks environmental comments on Fermi America project as part of new pilot program",url:"https://dailyenergyinsider.com/news/51619-nrc-seeks-environmental-comments-on-fermi-america-project-as-part-of-new-pilot-program/"},
  ],
  tceq:[
    {label:"NewsChannel 10: Fermi America receives nation's second-largest Clean Air Permit (Feb 2026)",url:"https://www.newschannel10.com/2026/02/25/fermi-america-receives-nations-second-largest-clean-air-permit-project-matador/"},
    {label:"Public Citizen: TCEQ Dismisses Community Concerns in Approving the Trump Energy Campus",url:"https://www.citizen.org/news/tceq-dismisses-community-concerns-in-approving-the-donald-j-trump-advanced-energy-and-intelligence-campus-near-amarillo/"},
    {label:"Sierra Club Texas: Project Matador - Massive AI Data Center Promises Pollution (Dec 2025)",url:"https://www.sierraclub.org/texas/blog/2025/12/project-matador-trump-ai-data-center-texas"},
    {label:"MyHighPlains: Fermi America pauses construction near Amarillo while waiting for TCEQ permits",url:"https://www.myhighplains.com/news/your-local-election-hq/amarillo-ai-data-center-project/fermi-america-pauses-construction-near-amarillo-while-waiting-for-tceq-permits/"},
  ],
  cruz_pac:[
    {label:"Ballotpedia: Keep the Promise Super PACs (sole $10M donor: Toby Neugebauer)",url:"https://ballotpedia.org/Keep_the_Promise_Super_PACs"},
    {label:"Campaign Money: Toby Neugebauer - $19M+ in political contributions (2016 cycle)",url:"https://www.campaignmoney.com/political/contributions/toby-neugebauer.asp?cycle=16"},
  ],
  trump_pac:[
    {label:"Campaign Money: Toby Neugebauer - $19M+ in political contributions (2016 cycle)",url:"https://www.campaignmoney.com/political/contributions/toby-neugebauer.asp?cycle=16"},
    {label:"CNBC: Pro-Trump super PAC backed solely by bank executive (Andy Beal donations)",url:"https://www.cnbc.com/2019/04/02/pro-trump-super-pac-used-donor-money-to-fund-right-wing-conspiracy-campaign.html"},
    {label:"NJ Today: Trump allies turn dust & political connections into multi-billion nuclear fortune",url:"https://njtoday.news/2025/12/04/trump-allies-turn-dust-political-connections-into-a-multi-billion-dollar-nuclear-fortune/"},
  ],
  lupia:[
    {label:"Lupia v. Fermi Inc. - Full Complaint (S.D.N.Y. No. 1:26-cv-00050, filed Jan 5, 2026)",url:"https://www.dandodiary.com/wp-content/uploads/sites/893/2026/01/Fermi-Complaint.pdf"},
    {label:"Hagens Berman: Fermi Inc. (FRMI) Securities Class Action - Firm Case Page",url:"https://www.hbsslaw.com/cases/fermi-inc-frmi-securities-class-action"},
    {label:"BFA Law (Bleichmar Fonti & Auld): Fermi Inc. Class Action Lawsuit",url:"https://www.bfalaw.com/cases/fermi-inc-class-action-lawsuit"},
    {label:"Robbins Geller Rudman & Dowd: Fermi Inc. Class Action Lawsuit - FRMI",url:"https://www.rgrdlaw.com/cases-fermi-inc-class-action-lawsuit-frmi.html"},
    {label:"Business Wire: Hagens Berman Investigating Fermi Inc. as Shares Tank 33% (Dec 2025)",url:"https://www.businesswire.com/news/home/20251223769454/en/Hagens-Berman-Investigating-Fermi-Inc.-FRMI-as-Shares-Tank-33-Amid-First-Tenant-Contract-Termination"},
    {label:"GuruFocus: Fermi Inc. Faces Federal Securities Fraud Allegations after Stock Drops 33%",url:"https://www.gurufocus.com/news/8671876/investor-reminder-fermi-inc-faces-federal-securities-fraud-allegations-after-stock-drops-33-contact-bfa-law-before-fridays-march-6-court-deadline-nasdaq-frmi"},
  ],
  trustee:[
    {label:"TX Bankruptcy Court: Memorandum Opinion, Adversary No. 24-3038 (GloriFi v. Neugebauer)",url:"https://www.txnb.uscourts.gov/sites/txnb/files/opinions/24-3038.pdf"},
    {label:"Bloomberg Law: Anti-Woke Banking Startup Founder Sued by Bankruptcy Estate",url:"https://news.bloomberglaw.com/bankruptcy-law/anti-woke-banking-startup-founder-sued-by-bankruptcy-estate"},
    {label:"PR Newswire: Bankruptcy Trustee Joins Debt Holders of GloriFi to Pursue Alleged Saboteurs",url:"https://www.prnewswire.com/news-releases/bankruptcy-trustee-joins-debt-holders-of-glorifi-to-pursue-alleged-saboteurs-302203096.html"},
  ],
  winston:[
    {label:"Bloomberg Law: Winston & Strawn Sued in Anti-Woke Bank Startup Bankruptcy",url:"https://news.bloomberglaw.com/bankruptcy-law/winston-strawn-sued-in-anti-woke-banking-startup-bankruptcy"},
    {label:"Texas Lawbook: Trustee for Bankrupt Financial Startup Sues Winston & Strawn",url:"https://texaslawbook.net/trustee-for-bankrupt-financial-startup-sues-winston-strawn/"},
    {label:"Above the Law: Anti-Woke Startup Suing Biglaw Firm Because Why The Hell Not",url:"https://abovethelaw.com/2025/09/anti-woke-startup-suing-biglaw-firm-because-why-the-hell-not/"},
  ],
  rico:[
    {label:"Bloomberg Law: Anti-Woke Banking Startup Founder Approved to Sue Investors (RICO context)",url:"https://news.bloomberglaw.com/bankruptcy-law/anti-woke-banking-startup-founder-approved-to-sue-investors"},
    {label:"WFAA: Businessmen behind anti-woke Dallas bank locked in legal battle",url:"https://www.wfaa.com/article/money/billionaires-feud-bankrupt-anti-woke-dallas-bank/287-7cda5a3a-d081-48ac-ad4f-2ec326c84307"},
    {label:"Wikipedia: Toby Neugebauer (references RICO litigation)",url:"https://en.wikipedia.org/wiki/Toby_Neugebauer"},
  ],
};

// Explicit home positions as fractions of [W, H]
const HOME_FRAC = {
  // CORE
  fermi:        [0.412, 0.343],
  matador:      [0.412, 0.486],
  // KEY PEOPLE
  toby:         [0.275, 0.338],
  rick:         [0.275, 0.486],
  mesut:        [0.346, 0.200],
  sezin:        [0.358, 0.636],
  noah:         [0.154, 0.205],
  griffin:      [0.129, 0.640],
  // POLITICAL / GOVERNMENT
  randy:        [0.100, 0.138],
  quantum:      [0.208, 0.105],
  cruz_pac:     [0.304, 0.092],
  trump:        [0.412, 0.089],
  trump_pac:    [0.550, 0.092],
  doe:          [0.554, 0.205],
  nrc:          [0.667, 0.305],
  tceq:         [0.608, 0.438],
  // PARTNERS & SUPPLIERS
  enec:         [0.842, 0.133],
  doosan:       [0.890, 0.252],
  westinghouse: [0.846, 0.373],
  hyundai:      [0.804, 0.476],
  siemens:      [0.846, 0.586],
  ttu:          [0.746, 0.676],
  // PRIOR COMPANIES
  banzai:       [0.073, 0.357],
  greyrock:     [0.073, 0.476],
  granite:      [0.073, 0.595],
  // FAILED / DEPARTED
  glorifi:      [0.237, 0.636],
  amazon:       [0.463, 0.629],
  // LEGAL ACTIONS
  rico:         [0.115, 0.741],
  trustee:      [0.292, 0.733],
  winston:      [0.408, 0.731],
  lupia:        [0.533, 0.741],
  // FINANCE row 1
  cape:         [0.087, 0.821],
  mufg:         [0.200, 0.821],
  keystone:     [0.317, 0.816],
  beal_bank:    [0.429, 0.821],
  andy:         [0.537, 0.821],
  // FINANCE row 2 (staggered)
  virtus:       [0.143, 0.890],
};
function initPos(nodes, W, H) {
  const out = {};
  nodes.forEach((n) => {
    const frac = HOME_FRAC[n.id];
    if (frac) {
      out[n.id] = { x: frac[0] * W, y: frac[1] * H, vx: 0, vy: 0 };
    } else {
      // Fallback for any node not explicitly placed
      out[n.id] = { x: W / 2 + (Math.random() - 0.5) * 120, y: H / 2 + (Math.random() - 0.5) * 120, vx: 0, vy: 0 };
    }
  });
  return out;
}

const NODES = Object.entries(NODE_DATA).map(([id, d]) => ({ id, label: d.label, sub: d.sub, category: d.category }));

export default function App() {
  const svgRef = useRef(null);
  const [dims, setDims] = useState({ w: 820, h: 620 });
  const [pos, setPos] = useState(null);
  const posRef = useRef(null);
  const animRef = useRef(null);
  const tickRef = useRef(0);
  const dragMovedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [sel, setSel] = useState(null);
  const [filterCat, setFilterCat] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [detailSection, setDetailSection] = useState(0);

  useEffect(() => {
    const upd = () => {
      const w = Math.min(window.innerWidth - 340, 1200);
      const h = Math.max(820, Math.min(1050, w * 0.875));
      setDims({ w, h });
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    const p = initPos(NODES, dims.w, dims.h);
    posRef.current = p;
    tickRef.current = 0;
    setPos({ ...p });
  }, [dims.w, dims.h]);

  useEffect(() => {
    if (!posRef.current) return;
    let alive = true;
    const run = () => {
      if (!alive || tickRef.current > 30) return;
      tickRef.current++;
      const p = posRef.current;
      const n2 = {};
      NODES.forEach((n) => { n2[n.id] = { ...p[n.id] }; });

      // Repulsion only — no edge attraction to avoid pulling nodes out of zones
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const a = NODES[i].id, b = NODES[j].id;
          const dx = n2[a].x - n2[b].x, dy = n2[a].y - n2[b].y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const rA = weightToRadius(a, false), rB = weightToRadius(b, false);
          const minSep = (rA + rB) * 3.0;
          const f = d < minSep
            ? Math.min(4000 / (d * d), 10)
            : Math.min(200 / (d * d), 1);
          n2[a].vx += (dx / d) * f; n2[a].vy += (dy / d) * f;
          n2[b].vx -= (dx / d) * f; n2[b].vy -= (dy / d) * f;
        }
      }

      // Very strong home-zone gravity — nodes snap to their positions
      NODES.forEach((n) => {
        const frac = HOME_FRAC[n.id];
        if (frac) {
          const homeX = frac[0] * dims.w;
          const homeY = frac[1] * dims.h;
          n2[n.id].vx += (homeX - n2[n.id].x) * 0.40;
          n2[n.id].vy += (homeY - n2[n.id].y) * 0.40;
        }
      });

      const mg = 90;
      NODES.forEach((n) => {
        if (dragging === n.id) return;
        n2[n.id].vx *= 0.55; n2[n.id].vy *= 0.55;
        n2[n.id].x = Math.max(mg, Math.min(dims.w - mg, n2[n.id].x + n2[n.id].vx));
        n2[n.id].y = Math.max(mg, Math.min(dims.h - mg, n2[n.id].y + n2[n.id].vy));
      });

      posRef.current = n2;
      setPos({ ...n2 });
      animRef.current = requestAnimationFrame(run);
    };
    animRef.current = requestAnimationFrame(run);
    return () => { alive = false; if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [dims.w, dims.h, dragging]);

  const getConn = (id) => {
    const ns = new Set(), ei = new Set();
    EDGES.forEach((e, i) => { if (e.source === id || e.target === id) { ns.add(e.source); ns.add(e.target); ei.add(i); } });
    return { ns, ei };
  };

  const { ns: cNs, ei: cEi } = sel ? getConn(sel) : { ns: new Set(), ei: new Set() };
  const vNodes = filterCat ? NODES.filter((n) => n.category === filterCat) : NODES;
  const vIds = new Set(vNodes.map((n) => n.id));
  const vEdges = EDGES.filter((e) => vIds.has(e.source) && vIds.has(e.target));

  const onMM = useCallback((e) => {
    if (!dragging || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    // Mark as a drag only if mouse moved more than 8px from where it started
    if (!dragMovedRef.current) {
      const dx = x - dragStartRef.current.x, dy = y - dragStartRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 8) dragMovedRef.current = true;
    }
    // Only reposition the node once we're sure this is a drag, not a click
    if (dragMovedRef.current) {
      posRef.current = { ...posRef.current, [dragging]: { ...posRef.current[dragging], x, y, vx: 0, vy: 0 } };
    }
  }, [dragging]);

  const selNode = sel ? NODE_DATA[sel] : null;
  const relEdges = sel ? EDGES.filter((e) => e.source === sel || e.target === sel) : [];

  if (!pos) return <div style={{ background: "#f4f6f9", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#8aa4bb", fontFamily: "monospace", fontSize: "12px" }}>INITIALIZING NETWORK...</div>;

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "monospace", color: "#1a2840" }}>
      {/* Header */}
      <div style={{ padding: "10px 16px", borderBottom: "1px solid #c8d6e5", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
        <div>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#b45309", letterSpacing: "0.08em" }}>FERMI AMERICA // PROJECT MATADOR</span>
          <span style={{ fontSize: "11px", color: "#4a6a85", marginLeft: "12px" }}>ENTITY RELATIONSHIP INTELLIGENCE MAP</span>
        </div>
        <div style={{ fontSize: "11px", color: "#4a6a85" }}>
          {NODES.length} ENTITIES - {EDGES.length} CONNECTIONS - AS OF 2026-03-31
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: "7px 16px", display: "flex", gap: "5px", flexWrap: "wrap", borderBottom: "1px solid #c8d6e5", background: "#ffffff" }}>
        <button onClick={() => { setFilterCat(null); setSel(null); }}
          style={{ padding: "3px 11px", fontSize: "11px", cursor: "pointer", letterSpacing: "0.06em", border: "1px solid " + (!filterCat ? "#b45309" : "#9ab0c4"), background: !filterCat ? "#b4530918" : "transparent", color: !filterCat ? "#b45309" : "#2a4560" }}>
          ALL
        </button>
        {Object.entries(CAT_LABEL).map(([c, l]) => (
          <button key={c} onClick={() => { setFilterCat(c === filterCat ? null : c); setSel(null); }}
            style={{ padding: "3px 11px", fontSize: "11px", cursor: "pointer", letterSpacing: "0.06em", border: "1px solid " + (filterCat === c ? CAT_COLOR[c] : "#9ab0c4"), background: filterCat === c ? CAT_COLOR[c] + "22" : "transparent", color: filterCat === c ? CAT_COLOR[c] : "#2a4560" }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* SVG canvas */}
        <div style={{ flex: 1, position: "relative" }}>
          <svg ref={svgRef} width={dims.w} height={dims.h}
            style={{ display: "block", cursor: dragging ? "grabbing" : "crosshair" }}
            onMouseMove={onMM}
            onMouseUp={() => { setDragging(null); }}
            onMouseLeave={() => { setDragging(null); dragMovedRef.current = false; }}
            onClick={() => { if (!dragMovedRef.current) setSel(null); dragMovedRef.current = false; }}>
            <defs>
              {Object.entries(EDGE_COLOR).map(([t, c]) => (
                <marker key={t} id={`a-${t}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <path d="M0,0 L0,10 L10,5z" fill={c} opacity="0.9" />
                </marker>
              ))}
            </defs>

            {/* Grid texture */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#dde6f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width={dims.w} height={dims.h} fill="url(#grid)" />

            {/* Zone labels - help the reader navigate the layout */}
            {[
              { label: "KEY PEOPLE", x: 0.05, y: 0.04, anchor: "start" },
              { label: "POLITICAL & GOVERNMENT", x: 0.50, y: 0.04, anchor: "middle" },
              { label: "PARTNERS & SUPPLIERS", x: 0.95, y: 0.04, anchor: "end" },
              { label: "PRIOR HISTORY", x: 0.05, y: 0.97, anchor: "start" },
              { label: "FINANCE & LENDERS", x: 0.38, y: 0.97, anchor: "middle" },
              { label: "LEGAL ACTIONS", x: 0.72, y: 0.97, anchor: "middle" },
            ].map((z, i) => (
              <text key={i}
                x={z.x * dims.w} y={z.y * dims.h}
                textAnchor={z.anchor}
                fontSize="9" fontWeight="bold" letterSpacing="0.12em"
                fill="#9ab8d0" opacity="0.6"
                style={{ pointerEvents: "none", userSelect: "none" }}>
                {z.label}
              </text>
            ))}

            {/* Edges */}
            {vEdges.map((edge, i) => {
              const s = pos[edge.source], t = pos[edge.target];
              if (!s || !t) return null;
              const orig = EDGES.indexOf(edge);
              const lit = sel && cEi.has(orig);
              const dim = sel && !lit;
              const c = EDGE_COLOR[edge.type] || "#9ab0c4";
              const dx = t.x - s.x, dy = t.y - s.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
              const R = 24;
              const x1 = s.x + (dx / d) * R, y1 = s.y + (dy / d) * R;
              const x2 = t.x - (dx / d) * (R + 11), y2 = t.y - (dy / d) * (R + 11);
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={c} strokeWidth={lit ? 3.5 : 1.8}
                    strokeOpacity={dim ? 0.06 : lit ? 1 : 0.45}
                    markerEnd={lit ? `url(#a-${edge.type})` : undefined}
                  />
                  {lit && d > 70 && (
                    <text x={(x1+x2)/2} y={(y1+y2)/2 - 5} textAnchor="middle"
                      fill={c} fontSize="10" fontWeight="bold" opacity="1"
                      stroke="#f4f6f9" strokeWidth="2.5" paintOrder="stroke fill"
                      style={{ pointerEvents: "none" }}>
                      {edge.label.length > 30 ? edge.label.slice(0, 28) + "..." : edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {vNodes.map((node) => {
              const p = pos[node.id];
              if (!p) return null;
              const nd = NODE_DATA[node.id];
              const isSel = sel === node.id;
              const isConn = sel && cNs.has(node.id);
              const isDim = sel && !isSel && !isConn;
              const c = CAT_COLOR[node.category] || "#1e3a4a";
              const R = weightToRadius(node.id, isSel);

              // Multi-line label: split at a space near the middle, max 2 lines
              const wrapLabel = (text) => {
                if (text.length <= 16) return [text];
                const mid = Math.floor(text.length / 2);
                let bp = text.lastIndexOf(" ", mid + 5);
                if (bp < 3) bp = text.indexOf(" ", mid - 5);
                if (bp < 0) bp = 16;
                return [text.slice(0, bp).trim(), text.slice(bp).trim()];
              };
              const labelLines = wrapLabel(node.label);
              const labelFontSize = isSel ? "12" : "11";
              const labelColor = isDim ? "#c8d6e5" : isSel ? c : "#1a2840";
              const lineHeight = 13;

              return (
                <g key={node.id} transform={`translate(${p.x},${p.y})`}
                  style={{ cursor: "pointer" }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    if (svgRef.current) {
                      const r = svgRef.current.getBoundingClientRect();
                      dragStartRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
                    }
                    dragMovedRef.current = false;
                    setDragging(node.id);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!dragMovedRef.current) {
                      setSel(node.id === sel ? null : node.id);
                      setDetailSection(0);
                    }
                    dragMovedRef.current = false;
                  }}>
                  {isSel && <circle r={R + 12} fill={c} opacity="0.12" />}
                  {isSel && <circle r={R + 6} fill="none" stroke={c} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.5" />}
                  <circle r={R} fill="#ffffff" stroke={c}
                    strokeWidth={isSel ? 2.5 : isConn ? 2 : 1.2}
                    opacity={isDim ? 0.2 : 1} />
                  {nd?.flag && (
                    <circle r={7} cx={R - 4} cy={-R + 4} fill={nd.flagColor} opacity={isDim ? 0.1 : 0.95} />
                  )}
                  {/* Node icon */}
                  <text y="1" textAnchor="middle" dominantBaseline="middle"
                    fontSize={isSel ? "15" : "13"} fill={c} opacity={isDim ? 0.2 : 1}
                    style={{ pointerEvents: "none" }}>{nd?.icon || "o"}</text>
                  {/* Multi-line node label */}
                  {labelLines.map((line, li) => (
                    <text key={li}
                      y={R + 15 + li * lineHeight}
                      textAnchor="middle"
                      fontSize={labelFontSize}
                      fontWeight={isSel ? "bold" : "600"}
                      fill={labelColor}
                      stroke="#f4f6f9"
                      strokeWidth="3"
                      paintOrder="stroke fill"
                      style={{ pointerEvents: "none" }}>
                      {line}
                    </text>
                  ))}
                  {/* Flag badge */}
                  {nd?.flag && !isDim && (
                    <text y={-R - 10} textAnchor="middle"
                      fontSize="8" fontWeight="bold"
                      fill={nd.flagColor}
                      stroke="#f4f6f9" strokeWidth="2.5" paintOrder="stroke fill"
                      opacity={isSel || isConn ? 1 : 0.75}
                      style={{ pointerEvents: "none" }}>
                      [{nd.flag}]
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side panel */}
        <div style={{ width: "320px", background: "#ffffff", borderLeft: "1px solid #c8d6e5", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          {selNode ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Node header */}
              <div style={{ padding: "12px 14px", borderBottom: "1px solid #c8d6e5", background: "#f0f4f8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "20px" }}>{selNode.icon}</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: CAT_COLOR[selNode.category], lineHeight: 1.3 }}>{selNode.label}</div>
                    <div style={{ fontSize: "10px", color: "#4a6a85", marginTop: "3px", lineHeight: 1.4 }}>{selNode.sub}</div>
                  </div>
                </div>
                {selNode.flag && (
                  <span style={{ fontSize: "10px", fontWeight: "bold", color: selNode.flagColor, border: `1px solid ${selNode.flagColor}`, padding: "2px 8px", letterSpacing: "0.08em" }}>
                    {selNode.flag}
                  </span>
                )}
              </div>

              {/* Section tabs */}
              <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid #c8d6e5", background: "#f0f4f8" }}>
                {selNode.sections.map((s, i) => (
                  <button key={i} onClick={() => setDetailSection(i)}
                    style={{ padding: "6px 11px", fontSize: "10px", cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.05em", border: "none", borderBottom: detailSection === i ? `2px solid ${CAT_COLOR[selNode.category]}` : "2px solid transparent", background: "transparent", color: detailSection === i ? CAT_COLOR[selNode.category] : "#4a6a85" }}>
                    {s.title.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Section content */}
              <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px", background: "#ffffff" }}>
                {selNode.sections[detailSection] && (
                  <div>
                    {selNode.sections[detailSection].items.map((item, i) => (
                      <div key={i} style={{ fontSize: "11px", color: item.startsWith("(!)") ? "#dc2626" : item.startsWith("-") ? "#9ab0c4" : "#1e3a55", padding: "4px 0", borderBottom: "1px solid #edf2f7", lineHeight: 1.6 }}>
                        {item.startsWith("  -") ? (
                          <span style={{ color: "#4a6a85" }}>{item}</span>
                        ) : item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related edges */}
              <div style={{ borderTop: "1px solid #c8d6e5", padding: "8px 14px", background: "#f0f4f8" }}>
                <div style={{ fontSize: "10px", color: "#4a6a85", letterSpacing: "0.08em", marginBottom: "6px", fontWeight: "bold" }}>
                  CONNECTIONS ({relEdges.length})
                </div>
                <div style={{ maxHeight: "160px", overflowY: "auto" }}>
                  {relEdges.map((e, i) => {
                    const oid = e.source === sel ? e.target : e.source;
                    const on = NODE_DATA[oid];
                    const out = e.source === sel;
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "5px", padding: "5px 7px", background: "#ffffff", borderLeft: `3px solid ${EDGE_COLOR[e.type]}`, cursor: "pointer", borderRadius: "0 3px 3px 0" }}
                        onClick={(ev) => { ev.stopPropagation(); setSel(oid); setDetailSection(0); }}>
                        <span style={{ fontSize: "10px", color: EDGE_COLOR[e.type], marginTop: "1px", flexShrink: 0 }}>{out ? "→" : "←"}</span>
                        <div>
                          <div style={{ fontSize: "10px", color: "#4a6a85" }}>{e.label}</div>
                          <div style={{ fontSize: "11px", color: on ? CAT_COLOR[on.category] : "#1e3a55", fontWeight: "bold" }}>{on?.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Sources */}
              {NODE_SOURCES[sel] && (
                <div style={{ borderTop: "1px solid #c8d6e5", padding: "8px 14px", background: "#f8fafc" }}>
                  <div style={{ fontSize: "10px", color: "#4a6a85", letterSpacing: "0.08em", marginBottom: "6px", fontWeight: "bold" }}>
                    SOURCES ({NODE_SOURCES[sel].length})
                  </div>
                  <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                    {NODE_SOURCES[sel].map((s, i) => (
                      <div key={i} style={{ marginBottom: "5px", padding: "4px 6px", background: "#ffffff", borderLeft: "2px solid #c8d6e5" }}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: "10px", color: "#1d6fa4", textDecoration: "none", lineHeight: 1.5, display: "block" }}
                          onMouseEnter={e => e.target.style.textDecoration = "underline"}
                          onMouseLeave={e => e.target.style.textDecoration = "none"}>
                          [{i + 1}] {s.label}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: "14px", flex: 1, background: "#ffffff" }}>
              <div style={{ fontSize: "11px", color: "#4a6a85", marginBottom: "18px", letterSpacing: "0.05em", lineHeight: 2 }}>
                SELECT ANY NODE TO VIEW<br />FULL RESEARCH DOSSIER
              </div>

              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", color: "#1e3a55", letterSpacing: "0.1em", marginBottom: "7px", fontWeight: "bold" }}>ENTITY TYPES</div>
                {Object.entries(CAT_COLOR).map(([c, col]) => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                    <div style={{ width: "10px", height: "10px", border: `1.5px solid ${col}`, flexShrink: 0, borderRadius: "2px" }} />
                    <span style={{ fontSize: "11px", color: "#2a4560" }}>{CAT_LABEL[c]}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", color: "#1e3a55", letterSpacing: "0.1em", marginBottom: "7px", fontWeight: "bold" }}>CONNECTION TYPES</div>
                {Object.entries(EDGE_COLOR).map(([t, c]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                    <div style={{ width: "16px", height: "2px", background: c, flexShrink: 0 }} />
                    <span style={{ fontSize: "11px", color: "#2a4560" }}>{EDGE_LABEL[t]}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: "10px", color: "#4a6a85", lineHeight: 2, borderTop: "1px solid #c8d6e5", paddingTop: "12px" }}>
                <div style={{ color: "#1e3a55" }}>NODES: {NODES.length}</div>
                <div style={{ color: "#1e3a55" }}>EDGES: {EDGES.length}</div>
                <div style={{ color: "#1e3a55" }}>DRAG NODES TO REPOSITION</div>
                <div style={{ color: "#1e3a55" }}>CLICK NODE IN PANEL TO NAVIGATE</div>
                <div style={{ marginTop: "8px", fontSize: "10px", color: "#6b8ca8", lineHeight: 1.6 }}>
                  Data sourced from SEC filings, court records, campaign finance disclosures, and investigative reporting through March 31, 2026.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
