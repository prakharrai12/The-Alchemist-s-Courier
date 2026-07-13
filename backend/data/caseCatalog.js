// WYRMVAULT — Canonical Case Catalog & Detective Mystery Content Schema (`§4, §6, §8`)
// Defines 24 distinct Victorian Guild mystery cases across 4 difficulty tiers.
// Every plaintext string is real in-fiction testimony, schedules, poison inventories, or ledgers
// establishing motive, alibi, opportunity, or timeline against a cast of 3-5 suspects.

export const CASE_SCHEMA_VERSION = "2.0.0";

export const CASE_CATALOG = [
  // ==========================================
  // TIER I: NOVICE SEALS (3 Suspects, 4 Chambers)
  // ==========================================
  {
    id: "CASE-001",
    title: "The Vanishing of Master Vane",
    tier: "NOVICE",
    era_flavor_line: "In the damp fog of the Obsidian Scriptorium, Senior Ledger-Keeper Vane vanished from his desk leaving an overturned inkwell and a locked brass vault door.",
    victim: {
      name: "Master Vane",
      role: "Senior Guild Ledger-Keeper",
      what_happened: "Disappeared during the midnight watch; his private vault key is missing and the ledger has torn pages."
    },
    suspects: [
      {
        id: "S1",
        name: "Scribe Silas",
        role: "Junior Archivist",
        motive: "Vane uncovered Silas embezzling guild gold from the sovereign account.",
        alibi: "Claims he was transcribing alchemical recipes in the North Tower from dusk until dawn.",
        opportunity_note: "Has master keys to the Scriptorium corridor."
      },
      {
        id: "S2",
        name: "Lady Kaelen",
        role: "Silk Merchant & Guild Patron",
        motive: "Vane refused to certify her imported foreign shipments as tax-exempt.",
        alibi: "States she attended the Grand Council banquet until two hours past midnight.",
        opportunity_note: "Was seen arguing with Vane at his desk early in the evening."
      },
      {
        id: "S3",
        name: "Warden Thorne",
        role: "Night Vault Guard",
        motive: "Owed Master Vane a heavy gambling debt from the subterranean dice tables.",
        alibi: "Insists he was patrolling the East Docks all night and never entered the Scriptorium.",
        opportunity_note: "Carries heavy iron lantern and knows every secret service passage."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Witness Account — A guard on the bridge observed midnight movement around the tower.",
        plaintext: "THE NORTH TOWER TRANSCRIBING ROOM WAS DARK AND LOCKED BY MIDNIGHT NO SCRIBE WAS INSIDE",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Scribe Silas's alibi; the North Tower room was dark and empty all night."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Torn Ledger Page — Recovered from beneath the floorboards of the clerk desk.",
        plaintext: "AUDIT NOTE SILAS FORGED SOVEREIGN EXCHANGE SEALS DEFICIT THREE HUNDRED GOLD PIECES VANE REPORTING AT DAWN",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: ["S2"],
          establishes: "motive"
        },
        summary: "Establishes Scribe Silas's desperate financial motive; Vane was preparing to expose his forgery at dawn."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Harbor Watch Log — Official check-in timestamps at the East Docks.",
        plaintext: "WARDEN THORNE SIGNED HARBOR CHECKPOINT EVERY HOUR FROM ELEVEN UNTIL FOUR DAWN VERIFIED BY CAPTAIN",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "timeline"
        },
        summary: "Rules out Warden Thorne; harbor logs confirm his continuous presence at the East Docks."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Scraps of Parchment — Found wedged inside the Scriptorium waste bin.",
        plaintext: "SILAS ORDERED THREE EXTRA PARCHMENT SACKS AND WAS SEEN CARRYING A HEAVY TRUNK TO THE CELLAR AT ONE AM",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "opportunity"
        },
        summary: "Establishes Scribe Silas's direct opportunity and disposal of the victim via heavy trunk."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Scribe Silas forged sovereign exchange seals and faced ruin when Vane finalized the audit. Silas lied about being in the North Tower (which was dark all night), struck Vane at midnight, and smuggled him into the cellar inside a heavy parchment trunk."
    }
  },
  {
    id: "CASE-002",
    title: "The Forged High Council Signet",
    tier: "NOVICE",
    era_flavor_line: "An urgent royal decree arrived bearing the High Council's wax seal, yet the alchemical scent of counterfeit cinnabar lingered on the crimson impression.",
    victim: {
      name: "High Council Signet Ring",
      role: "Imperial Authority Matrix",
      what_happened: "A counterfeit wax seal was used to release an impounded smuggling vessel from the Obsidian Pier."
    },
    suspects: [
      {
        id: "S1",
        name: "Engraver Corin",
        role: "Master Signet Engraver",
        motive: "Promised a fortune in foreign silver by illicit trade barons.",
        alibi: "Claims his workshop furnace was cold while he attended the evening liturgy at the Abbey.",
        opportunity_note: "Owns diamond engraving chisels capable of duplicating the Council crest."
      },
      {
        id: "S2",
        name: "Clerk Bertram",
        role: "Council Correspondence Courier",
        motive: "Sought promotion over his rivals by fabricating a diplomatic crisis.",
        alibi: "States he was sorting domestic mail pouches in the East Archive until midnight.",
        opportunity_note: "Handles the official wax melting spoons daily."
      },
      {
        id: "S3",
        name: "Alchemist Mira",
        role: "Guild Cinnabar Purveyor",
        motive: "Wanted to discredit Engraver Corin after a bitter dispute over pigment pricing.",
        alibi: "Was distilling sulfurous compounds in the High Laboratory under witness of two apprentices.",
        opportunity_note: "Has access to rare crimson resins and waxes."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Abbey Gate Register — The monk's entry log for the evening liturgy.",
        plaintext: "ENGRAVER CORIN DEPARTED THE ABBEY LITURGY EARLY AT NINE CLOCK CARRYING HIS LEATHER TOOL SATCHEL",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Engraver Corin's alibi; he left the liturgy early with his engraving tool satchel."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Chemical Inspection Report — Analysis of the counterfeit wax from the forged decree.",
        plaintext: "SEAL CONTAINS TRACES OF DIAMOND DUST AND BRASS SHAVINGS FROM AN ENGRAVING BENCH NOT ALCHEMICAL RESIN",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: ["S3"],
          establishes: "opportunity"
        },
        summary: "Rules out Alchemist Mira and points to Engraver Corin; the wax contains diamond dust from his chisels."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Smuggler's Bank Draft — Seized from the cabin of the released vessel.",
        plaintext: "PAY TO ENGRAVER CORIN TWO HUNDRED SILVER INGOTS UPON SAFE RELEASE OF THE SHIP FROM OBSIDIAN PIER",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: ["S2"],
          establishes: "motive"
        },
        summary: "Establishes Engraver Corin's direct financial motive and payoff by the smuggling syndicate."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Archive Security Roster — Verified by the East Archive Night Warden.",
        plaintext: "CLERK BERTRAM WAS LOCKED INSIDE THE EAST ARCHIVE FROM TEN UNTIL DAWN WITH ZERO KEY ACCESS",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Clerk Bertram who was locked securely inside the East Archive."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Engraver Corin accepted two hundred silver ingots from smugglers to forge the High Council signet. He left the Abbey early with his tool satchel and used his diamond chisels to press the counterfeit seal, leaving diagnostic diamond dust in the wax."
    }
  },
  {
    id: "CASE-003",
    title: "The Hemlock Chalice",
    tier: "NOVICE",
    era_flavor_line: "During the toast of the Autumnal Equinox, Grand Cipherist Orlo collapsed at the high table, his silver goblet smelling faintly of bitter almonds and nightshade.",
    victim: {
      name: "Grand Cipherist Orlo",
      role: "Head of the Cryptanalysis Chamber",
      what_happened: "Poisoned via a laced silver wine goblet just before presenting the new Vigenère cipher wheel."
    },
    suspects: [
      {
        id: "S1",
        name: "Apothecary Vespera",
        role: "Chief Botanical Distiller",
        motive: "Orlo threatened to ban her imported herbal tinctures as toxic narcotics.",
        alibi: "Claims she was tending the glasshouse orchids during the entire banquet.",
        opportunity_note: "Prepares the restorative tonics served at the high table."
      },
      {
        id: "S2",
        name: "Apprentice Lucian",
        role: "Orlo's Personal Cipher Assistant",
        motive: "Sought immediate promotion to Head Cipherist and authorship of the new cipher wheel.",
        alibi: "States he sat next to Orlo throughout the feast and never touched the wine flagon.",
        opportunity_note: "Handed Orlo the silver goblet directly before the toast."
      },
      {
        id: "S3",
        name: "Steward Malcor",
        role: "Master of Guild Feasts",
        motive: "Caught stealing rare vintages from the subterranean wine cellars.",
        alibi: "Was supervising the kitchen staff three floors below when the toast occurred.",
        opportunity_note: "Controls the decanting of all ceremonial wine flagons."
      }
    ],
    culprit: "S2",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Kitchen Inventory Log — Recorded by the Head Chef prior to the feast.",
        plaintext: "THE CEREMONIAL WINE FLAGON WAS TESTED BY STEWARD MALCOR AND WAS PURE AND UNPOISONED BEFORE SERVING",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "timeline"
        },
        summary: "Rules out Steward Malcor; the shared wine flagon was pure and unlaced before reaching the hall."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Glasshouse Attendance Slip — Verified by the Garden Overseer.",
        plaintext: "APOTHECARY VESPERA REMAINED IN THE ORCHID HOUSE WITH TWO GARDENERS ALL EVENING WITHOUT BREAK",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S1"],
          establishes: "alibi"
        },
        summary: "Rules out Apothecary Vespera whose presence in the orchid house is confirmed by two gardeners."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Personal Diary Fragment — Discovered hidden inside Lucian's desk drawer.",
        plaintext: "IF ORLO PRESENTS THE WHEEL TOMORROW MY THREE YEARS OF TOIL ARE ERASED HE MUST NOT SPEAK THE TOAST",
        clue_tags: {
          points_to_suspect_id: ["S2"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Apprentice Lucian's fierce resentment and determination to stop Orlo before the toast."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Toxicology Note — Chemical residue analysis from the rim of the silver goblet.",
        plaintext: "POISON WAS SMEARED UPON THE INNER RIM OF THE GOBLET BEFORE POURING EXACTLY WHERE LUCIANS THUMB HELD IT",
        clue_tags: {
          points_to_suspect_id: ["S2"],
          rules_out_suspect_id: [],
          establishes: "opportunity"
        },
        summary: "Proves Apprentice Lucian smeared the poison directly onto the goblet rim when handing it to Orlo."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S2"],
      explanation: "Apprentice Lucian murdered Grand Cipherist Orlo to steal credit for the new Vigenère cipher wheel. Because the wine flagon itself was pure, Lucian smeared hemlock and nightshade paste onto the inner rim of the silver goblet just as he handed it to his master."
    }
  },
  {
    id: "CASE-004",
    title: "The Theft of the Obsidian Egg",
    tier: "NOVICE",
    era_flavor_line: "When the morning bells chimed, the velvet pedestal in the Sanctum Sanctorum stood bare—the legendary Obsidian Dragon Egg had been spirited away through a locked steel grate.",
    victim: {
      name: "The Obsidian Dragon Egg",
      role: "Ancient Guild Relic",
      what_happened: "Stolen from the inner sanctum despite active runic wards and triple-locked iron gates."
    },
    suspects: [
      {
        id: "S1",
        name: "Engineer Jarek",
        role: "Sanctum Mechanism Caretaker",
        motive: "Faced crushing debt from failed brass clockwork inventions.",
        alibi: "Claims he was asleep in the dormitory across the courtyard from midnight to six.",
        opportunity_note: "Designed the combination cylinders for the Sanctum steel grate."
      },
      {
        id: "S2",
        name: "Archivist Elara",
        role: "Keeper of Ancient Relics",
        motive: "Wanted to transfer the egg to the Royal Museum for prestige.",
        alibi: "Was cataloging manuscripts in the library under constant lamp-light.",
        opportunity_note: "Holds the secondary pass-phrase to the runic ward."
      },
      {
        id: "S3",
        name: "Envoy Rael",
        role: "Foreign Diplomat & Collector",
        motive: "Offered ten thousand gold sovereigns to acquire the egg by any means necessary.",
        alibi: "States he was aboard his diplomatic galley docked at the West Pier all night.",
        opportunity_note: "Bribed multiple courtyard guards during his week-long visit."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Dormitory Night Watch — Check of the Engineer bunkbeds at two in the morning.",
        plaintext: "ENGINEER JAREKS BUNK WAS EMPTY AT TWO O CLOCK AND HIS HEAVY TOOL BELT WAS MISSING FROM THE PEG",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Engineer Jarek's alibi; his bed was empty at two in the morning and his tools missing."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Runic Ward Sensor — Diagnostic readout of the inner sanctum magical field.",
        plaintext: "RUNIC WARD WAS NEVER BREACHED OR DISPELLED THE GATE WAS OPENED USING THE MECHANICAL OVERRIDE CYLINDER",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: ["S2"],
          establishes: "opportunity"
        },
        summary: "Rules out Archivist Elara; the runic ward was bypassed using Engineer Jarek's mechanical override."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Diplomatic Pier Ledger — Recorded by the Port Authority Customs Officer.",
        plaintext: "ENVOY RAELS GALLEY REMAINED ANCHORED AT WEST PIER UNDER THREE ARMED CUSTOMS GUARDS WITHOUT VISITORS",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "timeline"
        },
        summary: "Rules out Envoy Rael whose ship was under continuous armed customs watch without visitors."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Smuggler's Pawn Ticket — Found dropped in the grease beneath Jarek's workbench.",
        plaintext: "ADVANCE PAID TO ENGINEER JAREK ONE THOUSAND SOVEREIGNS FOR DELIVERY OF THE OBSIDIAN EGG BEFORE DAWN",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Engineer Jarek's motive and direct receipt of a one thousand sovereign illicit advance."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Engineer Jarek exploited his intimate knowledge of the Sanctum gate's mechanical override cylinder to steal the Obsidian Egg for one thousand gold sovereigns. He slipped out of his dormitory bed at two in the morning while leaving the magical ward untouched."
    }
  },
  {
    id: "CASE-005",
    title: "The Treasonous Dispatch",
    tier: "NOVICE",
    era_flavor_line: "A confidential battle plan intended for the Northern Garrison was delivered instead into the hands of enemy mercenaries encamped in the Blackwood.",
    victim: {
      name: "Northern Garrison Dispatch #409",
      role: "Strategic Military Intelligence",
      what_happened: "Intercepted and rerouted via a switched wax seal and forged courier waybill."
    },
    suspects: [
      {
        id: "S1",
        name: "Courier Drake",
        role: "Senior Guild Relay Rider",
        motive: "Heavy debts owed to the Blackwood mercenary captain.",
        alibi: "Claims his saddlebag was stolen during a brief tavern rest at Crossroads Inn.",
        opportunity_note: "Carried Dispatch #409 alone across the Crossroads relay sector."
      },
      {
        id: "S2",
        name: "Postmaster Gideon",
        role: "Director of Guild Dispatch Sorters",
        motive: "Wanted to blame Courier Drake to justify replacing relay riders with automated pneumatic tubes.",
        alibi: "Was conducting an inventory audit inside the central sorting hall until midnight.",
        opportunity_note: "Applies the route labels before dispatch bags are sealed."
      },
      {
        id: "S3",
        name: "Clerk Fiona",
        role: "Intake Stamping Secretary",
        motive: "Bribed by foreign spies targeting the Northern Garrison.",
        alibi: "Departed the Scriptorium at five o'clock immediately after stamping the evening dispatches.",
        opportunity_note: "Sits next to the outgoing dispatch sorting bins."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Crossroads Inn Stable Boy Testimony — Eyewitness report from the relay station.",
        plaintext: "COURIER DRAKES SADDLEBAG WAS NEVER STOLEN HE DELIBERATELY HANDED THE POUCH TO A BLACKWOOD RIDER AT TEN",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Courier Drake's false robbery alibi; stable boy saw him hand the pouch to a Blackwood rider."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Sorting Hall Inspection — Audit of the central pneumatic tube ledger.",
        plaintext: "POSTMASTER GIDEON WAS WITH THREE INSPECTORS IN THE CENTRAL HALL AND NEVER TOUCHED POUCH FOUR HUNDRED NINE",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Postmaster Gideon who was accompanied by three inspectors in the central hall."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Intake Gate Stamp Log — Official departure timestamps.",
        plaintext: "CLERK FIONA DEPARTED AT FIVE AND POUCH FOUR HUNDRED NINE WAS SEALED AFTER SEVEN BY THE NIGHT SHIFT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "opportunity"
        },
        summary: "Rules out Clerk Fiona who departed two hours before Dispatch #409 was even sealed."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Mercenary Ledger — Recovered during a border skirmish.",
        plaintext: "PAID TO COURIER DRAKE FIFTY GOLD PIECES IN ADVANCE TO REROUTE THE NORTHERN BATTLE PLAN AT THE CROSSROADS",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Courier Drake's treasonous motive and advance payment from the mercenary captain."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Courier Drake committed treason by selling the Northern Garrison battle plans to Blackwood mercenaries to pay off his gambling debts. He fabricated a saddlebag robbery at the Crossroads Inn after deliberately handing over Dispatch #409."
    }
  },
  {
    id: "CASE-006",
    title: "The Scriptorium Election Scandal",
    tier: "NOVICE",
    era_flavor_line: "On the eve of the Grand Arch-Scribe election, the sealed brass ballot urn was found stuffed with counterfeit votes bearing forged wax signets.",
    victim: {
      name: "Grand Scriptorium Ballot Urn",
      role: "Guild Democratic Matrix",
      what_happened: "Tampered with via a hidden trapdoor inside the ballot pedestal to inject forty forged ballots."
    },
    suspects: [
      {
        id: "S1",
        name: "Candidate Vane",
        role: "Challenger for Grand Arch-Scribe",
        motive: "Was trailing by thirty votes in the preliminary tally and desperate for victory.",
        alibi: "Claims he spent the night celebrating with supporters at the Golden Griffin Tavern.",
        opportunity_note: "Had private access to the ballot hall during his evening candidate inspection."
      },
      {
        id: "S2",
        name: "Incumbent Arch-Scribe Oakhaven",
        role: "Current Guild Leader",
        motive: "Wanted to invalidate the entire election after realizing his challenger was gaining momentum.",
        alibi: "Was delivering the annual guild address in the Great Auditorium from seven to eleven.",
        opportunity_note: "Holds the official brass urn master key."
      },
      {
        id: "S3",
        name: "Clerk Barnaby",
        role: "Ballot Hall Watchman",
        motive: "Promised a lucrative post as Chief Archive Keeper by Candidate Vane upon his victory.",
        alibi: "States he fell asleep at his guard desk after drinking spiced tea at nine o'clock.",
        opportunity_note: "Guarded the ballot urn alone from midnight until sunrise."
      }
    ],
    culprit: "S3",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Tavern Patron Roster — Confirmed eyewitness account from the Golden Griffin.",
        plaintext: "CANDIDATE VANE REMAINED IN THE TAVERN PRIVATE DINING ROOM WITH SIX SENIOR PATRONS UNTIL THREE AM",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S1"],
          establishes: "alibi"
        },
        summary: "Rules out Candidate Vane personally; six senior patrons confirm he never left the tavern dining room."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Auditorium Stage Log — Recorded by the Master of Ceremonies.",
        plaintext: "ARCH SCRIBE OAKHAVEN SPOKE ON STAGE UNTIL ELEVEN AND WAS ESCORTED DIRECTLY TO HIS PRIVATE MANOR BY GUARDS",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Incumbent Oakhaven who was escorted home under armed guard after his public address."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Ballot Pedestal Inspection — Mechanical analysis of the trapdoor latch.",
        plaintext: "PEDESTAL TRAPDOOR WAS UNLOCKED FROM WITHIN BY CLERK BARNABY WHOSE FINGERPRINTS COATED THE HIDDEN LATCH",
        clue_tags: {
          points_to_suspect_id: ["S3"],
          rules_out_suspect_id: [],
          establishes: "opportunity"
        },
        summary: "Proves Clerk Barnaby unlocked the secret pedestal trapdoor to stuff the urn while on night watch."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Secret Contract — Found tucked inside Barnaby's uniform lining.",
        plaintext: "BARNABY TO RECEIVE CHIEF ARCHIVE KEEPER APPOINTMENT IMMEDIATELY AFTER STUFFING FORTY BALLOTS INTO THE URN",
        clue_tags: {
          points_to_suspect_id: ["S3"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Clerk Barnaby's corrupt agreement to stuff the ballots in exchange for promotion."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S3"],
      explanation: "Clerk Barnaby abused his solitary night watch over the ballot hall to stuff forty forged votes into the brass urn via the hidden pedestal trapdoor. He acted under a corrupt agreement to secure the Chief Archive Keeper appointment."
    }
  },

  // ==========================================
  // TIER II: ADEPT SEALS (4 Suspects, 4 Chambers)
  // ==========================================
  {
    id: "CASE-007",
    title: "The Smuggler's Wax",
    tier: "ADEPT",
    era_flavor_line: "Customs inspectors discovered crates of forbidden black lotus resin sealed with authentic imperial green wax smuggled through the West Dock.",
    victim: {
      name: "Imperial Green Wax Registry",
      role: "Customs & Excise Matrix",
      what_happened: "Stolen sovereign wax ingots were melted down to seal contraband cargo crates."
    },
    suspects: [
      {
        id: "S1",
        name: "Inspector Hallow",
        role: "Chief Customs Dockmaster",
        motive: "Received heavy bribes from the Black Lotus crime syndicate.",
        alibi: "Claims he was off-duty at his residence across the estuary from eight until morning.",
        opportunity_note: "Inspects and approves every crate passing through Warehouse Four."
      },
      {
        id: "S2",
        name: "Clerk Thaddeus",
        role: "Wax Storekeeper",
        motive: "Needed funds to pay off extortionists threatening his family.",
        alibi: "Was taking inventory inside the central vault with two junior clerks all afternoon.",
        opportunity_note: "Has keys to the green wax storage lockers."
      },
      {
        id: "S3",
        name: "Captain Vane",
        role: "Skipper of the Sea Serpent",
        motive: "Earns ten times standard freight rates for transporting black lotus resin.",
        alibi: "States he was drinking with his harbor pilot at the Anchor & Compass tavern.",
        opportunity_note: "His ship docked exactly beside Warehouse Four."
      },
      {
        id: "S4",
        name: "Engraver Cassian",
        role: "Customs Seal Stamp Maker",
        motive: "Resented Inspector Hallow for rejecting his wage increase petition.",
        alibi: "Was attending a guild guildmaster meeting at the Hall of Crafts.",
        opportunity_note: "Manufactures the heavy brass seal stamps used on crates."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Ferryman's Log — Passenger records across the estuary after dark.",
        plaintext: "INSPECTOR HALLOW NEVER CROSSED TO HIS RESIDENCE HE WAS SEEN ENTERING WAREHOUSE FOUR AT MIDNIGHT WITH A LANTERN",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Inspector Hallow's alibi; he never crossed the estuary and entered Warehouse Four at midnight."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Central Vault Audit — Inventory signature verification.",
        plaintext: "CLERK THADDEUS AND TWO JUNIOR CLERKS SIGNED VAULT LOGS EVERY HOUR NO WAX INGOTS MISSING FROM VAULT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Clerk Thaddeus whose continuous presence inside the secure vault is verified."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Crafts Hall Register — Verified attendance at the Guildmaster meeting.",
        plaintext: "ENGRAVER CASSIAN PRESENT AT CRAFTS HALL UNTIL MIDNIGHT AND HIS STAMP INVENTORY WAS FULLY ACCOUNTED FOR",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S4"],
          establishes: "alibi"
        },
        summary: "Rules out Engraver Cassian who attended the Crafts Hall meeting without discrepancy."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Syndicate Ledger Entry — Recovered from the Sea Serpent's hold.",
        plaintext: "INSPECTOR HALLOW PAID FIVE HUNDRED GOLD TO APPLIED GREEN WAX ON TWENTY BLACK LOTUS CRATES IN WAREHOUSE FOUR",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Inspector Hallow's bribe and personal application of the stolen green wax onto the crates."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Inspector Hallow accepted five hundred gold pieces from the Black Lotus syndicate to personally seal twenty contraband crates in Warehouse Four using imperial green wax he sequestered during customs seizures."
    }
  },
  {
    id: "CASE-008",
    title: "The Sabotaged Alchemical Furnace",
    tier: "ADEPT",
    era_flavor_line: "Just as the Grand Alchemical Crucible reached critical transmutation heat, the cooling valves fractured causing a blast that shattered the East Laboratory.",
    victim: {
      name: "Grand Alchemical Crucible #3",
      role: "Transmutation Apparatus",
      what_happened: "Cooling copper pipes were sawn halfway through and coated with sulfurous acid to induce explosion."
    },
    suspects: [
      {
        id: "S1",
        name: "Alchemist Balthazar",
        role: "Crucible Transmutation Director",
        motive: "His experimental formula was failing; an explosion covered his ruinous errors and secured insurance gold.",
        alibi: "Claims he left the laboratory two hours early to dine with the High Treasurer.",
        opportunity_note: "Has unrestricted access to the cooling valve chamber."
      },
      {
        id: "S2",
        name: "Apprentice Nadia",
        role: "Crucible Stoker & Valve Monitor",
        motive: "Reprimanded by Balthazar and denied her journeyman certification.",
        alibi: "Was collecting charcoal sacks from the basement depot with two porters when the blast occurred.",
        opportunity_note: "Checks the pressure gauges every thirty minutes."
      },
      {
        id: "S3",
        name: "Smith Goran",
        role: "Guild Copper & Brass Coppersmith",
        motive: "Sought a lucrative repair contract to replace all seven laboratory furnaces.",
        alibi: "States he was at the forge casting bronze bells until midnight.",
        opportunity_note: "Supplies and inspects the cooling pipes weekly."
      },
      {
        id: "S4",
        name: "Rival Master Vane",
        role: "Director of the West Laboratory",
        motive: "Wanted Balthazar's crucible destroyed so the High Council would fund his own laboratory.",
        alibi: "Was lecturing to twenty students in the West Amphitheater during the evening.",
        opportunity_note: "Visited the East Laboratory at four o'clock for a peer review."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Treasurer Dining Log — Verification of Balthazar's evening appointment.",
        plaintext: "BALTHAZAR ARRIVED AT DINNER AN HOUR LATE AT NINE WITH ACID BURNS UPON HIS LEATHER APRON AND GLOVES",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Alchemist Balthazar's alibi; he arrived an hour late with fresh acid burns upon his apron."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Amphitheater Class Roll — Student witness verification.",
        plaintext: "RIVAL MASTER VANE LECTURED CONTINUOUSLY IN WEST AMPHITHEATER FROM SIX UNTIL TEN BEFORE TWENTY WITNESSES",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S4"],
          establishes: "timeline"
        },
        summary: "Rules out Rival Master Vane whose evening lecture was witnessed by twenty students."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Basement Depot Receipt — Porter timestamp verification.",
        plaintext: "APPRENTICE NADIA LOADED CHARCOAL WITH TWO PORTERS FROM SEVEN UNTIL THE EXPLOSION OCCURRED AT EIGHT THIRTY",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "alibi"
        },
        summary: "Rules out Apprentice Nadia whose presence in the basement depot is verified by porters."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Insurance Claim Draft — Found on Balthazar's private writing desk.",
        plaintext: "BALTHAZAR FILED A FIVE THOUSAND GOLD PIECE CRUCIBLE DAMAGE CLAIM TWELVE HOURS BEFORE THE EXPLOSION OCCURRED",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Balthazar's insurance fraud motive; he pre-filed a five thousand gold damage claim."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Alchemist Balthazar deliberately sawed through his own crucible cooling pipes and coated them with acid to trigger a catastrophic explosion. His formula was a failure and he pre-filed a five thousand gold insurance claim twelve hours before the blast."
    }
  },
  {
    id: "CASE-009",
    title: "The Phantom Courier",
    tier: "ADEPT",
    era_flavor_line: "High Council correspondence across three relay sectors arrived sealed and unblemished, yet every financial draft enclosed inside had been replaced with blank slips of parchment.",
    victim: {
      name: "Sovereign Relay Pouches #12 through #18",
      role: "Financial Transit Matrix",
      what_happened: "Twelve hundred gold sovereigns in banker drafts were removed without breaking the wax seals."
    },
    suspects: [
      {
        id: "S1",
        name: "Relay Rider Kaelen",
        role: "Express Night Courier",
        motive: "Acquired an expensive country estate far beyond his official courier stipend.",
        alibi: "Claims he rode straight from sector station one to three without halting once.",
        opportunity_note: "Carries the mail pouches across the desolate moorland sector."
      },
      {
        id: "S2",
        name: "Stationmaster Orlo",
        role: "Relay Station Two Overseer",
        motive: "Faced imminent bankruptcy from failed mercantile investments in the East.",
        alibi: "Was repairing the stable roof with his groom during the courier's twenty-minute horse change.",
        opportunity_note: "Handles the pouches while fresh mounts are saddled."
      },
      {
        id: "S3",
        name: "Engraver Silas",
        role: "Master of Seal Replicas",
        motive: "Wanted to finance his secret laboratory in the lower catacombs.",
        alibi: "States he was inside his engraving shop in the capital all week under guild watch.",
        opportunity_note: "Invented a heated copper spatula capable of lifting wax seals intact."
      },
      {
        id: "S4",
        name: "Bank Clerk Elara",
        role: "Sovereign Draft Issuer",
        motive: "Sought to cover up a deficit inside the central bank treasury ledger.",
        alibi: "Was working inside the bank vault alongside two chief auditors when pouches were sealed.",
        opportunity_note: "Places the drafts inside the envelopes before they enter the courier pouches."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Moorland Toll-Gate Record — Checkpoint timestamps on the desolate road.",
        plaintext: "COURIER KAELEN HALTED FOR TWO HOURS AT THE ABANDONED MILL ON THE MOOR BETWEEN STATIONS ONE AND TWO",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Relay Rider Kaelen's non-stop riding alibi; he halted for two hours at an abandoned mill."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Bank Treasury Inspection — Verification of initial draft stuffing.",
        plaintext: "AUDITORS CONFIRMED ALL SOVEREIGN DRAFTS WERE PRESENT AND CORRECT WHEN POUCHES SEALED AT BANK VAULT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S4"],
          establishes: "timeline"
        },
        summary: "Rules out Bank Clerk Elara; chief auditors confirmed the drafts were present when pouches were sealed."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Relay Station Two Stable Log — Eyewitness verification of horse change.",
        plaintext: "STATIONMASTER ORLO REMAINED ON THE STABLE ROOF WITH HIS GROOM WHILST KAELEN KEPT HIS POUCH ON HIS BACK",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "opportunity"
        },
        summary: "Rules out Stationmaster Orlo; Kaelen kept the pouch strapped to his own back during horse change."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Abandoned Mill Discovery — Evidence recovered from the moorland hearth.",
        plaintext: "A HEATED COPPER SPATULA AND TWELVE HUNDRED SOVEREIGNS IN DRAFTS WERE HIDDEN INSIDE KAELENS SADDLE BLANKET",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "opportunity"
        },
        summary: "Establishes Kaelen's exact method; he used a heated copper spatula to lift seals at the abandoned mill."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Express Courier Kaelen halted for two hours at an abandoned mill on the moor where he used a heated copper spatula to lift the wax seals intact, remove twelve hundred sovereigns in banker drafts, and reseal the envelopes."
    }
  },
  {
    id: "CASE-010",
    title: "The Stolen Cipher Disk",
    tier: "ADEPT",
    era_flavor_line: "The newly engineered Brass Vigenère Multi-Disk, capable of breaking foreign military ciphers in seconds, vanished from the locked Cryptanalysis Vault.",
    victim: {
      name: "Brass Vigenère Multi-Disk Prototype",
      role: "Strategic Cryptographic Matrix",
      what_happened: "Removed from the reinforced steel safe inside the inner Cryptanalysis Chamber."
    },
    suspects: [
      {
        id: "S1",
        name: "Cryptanalyst Thorne",
        role: "Senior Codebreaker",
        motive: "Bribed by foreign military attaches to deliver the prototype before war breaks out.",
        alibi: "Claims he was deciphering naval intercepts in his study from nine until dawn.",
        opportunity_note: "Holds one of the two brass safe keys required to open the inner vault."
      },
      {
        id: "S2",
        name: "Warden Corin",
        role: "Chief Vault Security Officer",
        motive: "Sought to expose vault vulnerabilities to force the Council to double his security budget.",
        alibi: "Was conducting rounds across all four levels accompanied by two armed guards.",
        opportunity_note: "Holds the second brass safe key."
      },
      {
        id: "S3",
        name: "Smith Jarek",
        role: "Guild Precision Mechanist",
        motive: "Wanted to sell duplicate disks to rival commercial guilds across the border.",
        alibi: "States he was repairing clockwork mechanisms in the North Tower all evening.",
        opportunity_note: "Constructed the brass safe locks and knows the internal lever tolerances."
      },
      {
        id: "S4",
        name: "Apprentice Mira",
        role: "Thorne's Junior Assistant",
        motive: "Felt her mathematical contributions to the multi-disk were stolen by Thorne.",
        alibi: "Was asleep in the women's dormitory under verification of the dormitory matron.",
        opportunity_note: "Polishes the multi-disk each afternoon."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Study Surveillance Log — Night watch observation of Thorne's quarters.",
        plaintext: "CRYPTANALYST THORNE LEFT HIS STUDY WINDOW AJAR AT ELEVEN AND SLEPT OUT ACROSS THE ROOF TO THE VAULT TOWER",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Cryptanalyst Thorne's study alibi; he slipped out his window across the roof at eleven."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Security Patrol Ledger — Signed hourly guard check-ins.",
        plaintext: "WARDEN CORIN AND TWO ARMED GUARDS WERE VERIFIED AT THE WEST GATE EXACTLY WHEN THE SAFE ALARM WIRES WERE CUT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Warden Corin whose patrol at the West Gate coincided with the exact time alarm wires were cut."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Dormitory Matron Ledger — Nightly check-in verification.",
        plaintext: "APPRENTICE MIRA AND ALL JUNIOR CLERKS WERE LOCKED IN THE DORMITORY FROM TEN UNTIL DAWN WITHOUT INCIDENT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S4"],
          establishes: "alibi"
        },
        summary: "Rules out Apprentice Mira who was securely locked inside the women's dormitory."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Wax Impression Pad — Discovered hidden inside Thorne's study desk.",
        plaintext: "THORNE PRESSED WARDEN CORINS KEY INTO WAX DURING A COUNCIL BRIEFING AND CAST A DUPLEX KEY TO OPEN THE SAFE",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "opportunity"
        },
        summary: "Proves Thorne cast a duplicate of Corin's key using a wax impression taken during a briefing."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Senior Cryptanalyst Thorne betrayed the Guild by taking a wax impression of Warden Corin's safe key during a Council briefing. He cast a duplex key, slipped across the roof from his study at eleven, and stole the Prototype Multi-Disk to sell to foreign attaches."
    }
  },
  {
    id: "CASE-011",
    title: "The Gilded Quill Murder",
    tier: "ADEPT",
    era_flavor_line: "In the silent hours before dawn, Master Calligrapher Vesper was found slumped over his desk, pierced through the neck by his own solid-gold ceremonial quill.",
    victim: {
      name: "Master Calligrapher Vesper",
      role: "Head of the Imperial Treaty Engraving Hall",
      what_happened: "Stabbed cleanly through the carotid artery with a sharpened solid-gold ceremonial quill."
    },
    suspects: [
      {
        id: "S1",
        name: "Scribe Barnaby",
        role: "Senior Treaty Transcriber",
        motive: "Vesper discovered Barnaby altering border coordinates on the Western Treaty maps.",
        alibi: "Claims he was asleep in his lodgings three streets away during the murder.",
        opportunity_note: "Sits at the desk directly adjacent to Master Vesper."
      },
      {
        id: "S2",
        name: "Envoy Malcor",
        role: "Western Border Diplomat",
        motive: "Paid Barnaby ten thousand sovereigns to shift the treaty line to include his copper mines.",
        alibi: "Was attending a high-stakes card game at the Royal Club until three in the morning.",
        opportunity_note: "Visited the Engraving Hall at midnight to inspect the draft map."
      },
      {
        id: "S3",
        name: "Apprentice Silas",
        role: "Vesper's Quill Sharpener & Ink Boy",
        motive: "Beaten repeatedly by Vesper for minor ink blots on parchment sheets.",
        alibi: "States he was grinding lapis lazuli pigment in the cellar pigment workshop all night.",
        opportunity_note: "Sharpens the ceremonial gold quill every evening at eight."
      },
      {
        id: "S4",
        name: "Warden Gideon",
        role: "Engraving Hall Night Guard",
        motive: "Wanted to steal Vesper's private collection of diamond-tipped engraving styluses.",
        alibi: "Was patrolling the exterior gardens with his guard dog.",
        opportunity_note: "Controls all door bolts after ten o'clock."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Lodging House Landlady Testimony — Check of night entry bolts.",
        plaintext: "SCRIBE BARNABYS BED WAS UNSLEPT IN AND HIS BOOTS COATED IN FRESH SCRIPTORIUM INK AND WAX AT THREE AM",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Scribe Barnaby's alibi; his bed was unslept in and his boots coated in fresh Scriptorium ink."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Royal Club Card Room Roster — Verification of diplomatic attendance.",
        plaintext: "ENVOY MALCOR PLAYED CARDS CONTINUOUSLY BEFORE SIX ROYAL WITNESSES FROM TEN UNTIL FOUR IN THE MORNING",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Envoy Malcor personally; six royal witnesses confirm he played cards continuously at the club."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Cellar Pigment Workshop Log — Apprentice activity verification.",
        plaintext: "APPRENTICE SILAS GROUND LAPIS LAZULI ALONGSIDE THE MASTER PAINTER ALL NIGHT TO COMPLETE THE CHURCH FRESCO",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Apprentice Silas whose continuous work in the cellar workshop is confirmed by the Master Painter."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Treaty Map Examination — Discovered beneath Vesper's bloodstained blotting paper.",
        plaintext: "VESPERS WRITING NOTE RECORDED BARNABYS TREACHERY AND ORDERED HIS IMMEDIATE ARREST AT DAWN FOR HIGH TREASON",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Scribe Barnaby's lethal motive; Vesper had written an order for his arrest at dawn."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Scribe Barnaby murdered Master Calligrapher Vesper to prevent the discovery of his treasonous alterations to the Western Treaty maps. Facing arrest at dawn, Barnaby returned at three in the morning and drove the ceremonial gold quill into Vesper's neck."
    }
  },
  {
    id: "CASE-012",
    title: "The Dragon-Scale Robbery",
    tier: "ADEPT",
    era_flavor_line: "A locked armored transport chest arrived from the subterranean mines containing only lead weights—the rare Dragon-Scale armor plates forged for the Royal Guard had been swapped in transit.",
    victim: {
      name: "Armored Transport Chest #88",
      role: "Royal Guard Armory Supply",
      what_happened: "Fifty dragon-scale armor plates worth forty thousand sovereigns were replaced with lead weights."
    },
    suspects: [
      {
        id: "S1",
        name: "Warden Thorne",
        role: "Transport Caravan Commander",
        motive: "Conspired with rebel factions in the Eastern provinces to arm their insurgent knights.",
        alibi: "Claims he rode at the head of the caravan column without leaving his saddle from mine to fortress.",
        opportunity_note: "Carries the master brass key to Transport Chest #88."
      },
      {
        id: "S2",
        name: "Smith Goran",
        role: "Subterranean Mine Forge Overseer",
        motive: "Wanted to sell the dragon-scale plates on the black market to pay his foundry debts.",
        alibi: "Was supervising the night blast furnaces when the caravan departed the mine depot.",
        opportunity_note: "Packs and seals the iron chests inside the forge before loading."
      },
      {
        id: "S3",
        name: "Clerk Bertram",
        role: "Armory Intake Inspector",
        motive: "Sought to frame Thorne for negligence after being passed over for caravan command.",
        alibi: "Was logging weapons inside the fortress armory when the wagon arrived.",
        opportunity_note: "Weighs and unseals the chests upon arrival in the courtyard."
      },
      {
        id: "S4",
        name: "Driver Silas",
        role: "Caravan Wagon Teamster",
        motive: "Promised five hundred sovereigns by highwaymen to loosen the wagon tarpaulins.",
        alibi: "States he drove the draft oxen continuously without stopping from midnight to noon.",
        opportunity_note: "Sits directly on the driver bench three feet above the locked chest."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Mountain Pass Relay Log — Checkpoint observation at the summit gorge.",
        plaintext: "COMMANDER THORNE HALTED THE CARAVAN FOR AN HOUR INSIDE THE FOGGY GORGE AND DISMISSED THE REAR GUARDS",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Commander Thorne's continuous riding alibi; he halted the caravan inside a foggy gorge."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Mine Forge Weight Manifest — Verified by three independent guild weighers.",
        plaintext: "CHEST EIGHTY EIGHT WEIGHED EXACTLY TWO HUNDRED POUNDS OF PURE DRAGON SCALE UPON DEPARTURE FROM THE FORGE",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Smith Goran; three independent weighers verified the true plates were loaded at departure."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Fortress Courtyard Log — Intake weight check upon immediate wagon arrival.",
        plaintext: "CHEST EIGHTY EIGHT WEIGHED TWO HUNDRED POUNDS OF LEAD UPON ARRIVAL PROVING THE SWAP OCCURRED ON THE ROAD",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "timeline"
        },
        summary: "Rules out Clerk Bertram; the chest contained lead the instant it reached the fortress courtyard."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Rebel Dispatch Pouch — Intercepted by border scouts in the Eastern valley.",
        plaintext: "THORNE DELIVERED FIFTY DRAGON SCALE PLATES TO OUR COURIERS IN THE GORGE IN EXCHANGE FOR REBEL COMMAND TITLE",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Thorne's treasonous motive and transfer of the plates during his one-hour gorge halt."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Transport Caravan Commander Thorne committed treason by halting the wagon train inside a foggy mountain gorge, dismissing his rear guards, and using his master key to swap fifty dragon-scale plates for lead weights to arm Eastern rebel insurgents."
    }
  },

  // ==========================================
  // TIER III: MASTER SEALS (4 Suspects, 4 Chambers, Soft Cooldowns Enforced)
  // ==========================================
  {
    id: "CASE-013",
    title: "The Alchemist's Shadow",
    tier: "MASTER",
    era_flavor_line: "In the sealed Vault of Transmutation, the formula for the Philosopher's Stone was stolen from a glass display tube without triggering the surrounding kinetic ward.",
    victim: {
      name: "Philosopher's Stone Transmutation Formula",
      role: "Supreme Alchemical Secret",
      what_happened: "Removed from a vacuum-sealed glass cylinder inside a locked kinetic ward matrix."
    },
    suspects: [
      {
        id: "S1",
        name: "Arch-Alchemist Orlo",
        role: "Director of the Transmutation Chamber",
        motive: "His mental acuity was failing; he sold the formula to foreign emperors to secure a golden retirement.",
        alibi: "Claims he was in deep meditation inside the inner sanctum from dusk to dawn.",
        opportunity_note: "Designed the kinetic ward matrix and holds the frequency key."
      },
      {
        id: "S2",
        name: "Apprentice Kaelen",
        role: "Orlo's Chief Glassblower & Assistant",
        motive: "Sought to publish the formula under his own name in the Continental Journal of Alchemy.",
        alibi: "Was blowing laboratory condensers in the glass workshop until two in the morning.",
        opportunity_note: "Knows the acoustic resonance frequency of the glass display cylinder."
      },
      {
        id: "S3",
        name: "Warden Vespera",
        role: "High Vault Kinetic Guard",
        motive: "Offered a principality across the sea by foreign agents.",
        alibi: "States she was stationed outside the bronze vault door with two sentries all night.",
        opportunity_note: "Controls the kinetic ward power supply switches in the corridor."
      },
      {
        id: "S4",
        name: "Scholar Corin",
        role: "Visiting Hermetic Researcher",
        motive: "Believes the formula belongs to humanity and planned to scatter copies across the city.",
        alibi: "Was translating ancient scrolls in the guest library under watch of two archive clerks.",
        opportunity_note: "Visited the Transmutation Chamber during the afternoon tour."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Sanctum Meditation Monitor — Acoustic and thermal sensor readings.",
        plaintext: "ARCH ALCHEMIST ORLOS MEDITATION SANCTUM WAS EMPTY FROM ELEVEN UNTIL TWO AM WHEN THE FORMULA TUBE WAS OPENED",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Arch-Alchemist Orlo's meditation alibi; his sanctum was empty during the exact theft window."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Kinetic Ward Diagnostic — Power grid fluctuation record.",
        plaintext: "KINETIC WARD POWER SWITCHES WERE NEVER TOUCHED ORLO BYPASSED THE FIELD USING HIS PERSONAL HARMONIC TUNING FORK",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: ["S3"],
          establishes: "opportunity"
        },
        summary: "Rules out Warden Vespera; the ward was bypassed using Orlo's personal harmonic tuning fork."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Glass Workshop Attendance Log — Verified by the Master Glassmaker.",
        plaintext: "APPRENTICE KAELEN WAS BLOWING CONDENSERS CONTINUOUSLY ALONGSIDE FIVE CRAFTSMEN UNTIL THREE IN THE MORNING",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Apprentice Kaelen whose continuous glassblowing work was witnessed by five craftsmen."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Foreign Diplomatic Letter — Intercepted from a departing imperial galley.",
        plaintext: "ORLO TO RECEIVE FIFTY THOUSAND GOLD SOVEREIGNS AT THE WEST PIER UPON TRANSFERRING THE PHILOSOPHERS STONE SCROLL",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Orlo's corrupt motive and advance deal for fifty thousand gold sovereigns."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Arch-Alchemist Orlo betrayed his lifetime of research to secure fifty thousand gold sovereigns from foreign emperors. He left his meditation sanctum empty, used his personal harmonic tuning fork to bypass his own kinetic ward, and stole the Philosopher's Stone formula."
    }
  },
  {
    id: "CASE-014",
    title: "The Vault Keeper's Secret",
    tier: "MASTER",
    era_flavor_line: "In the deepest subterranean level of the Wyrmvault, the Grand Obsidian Door to the Royal Treasury was found unlocked without a scratch upon its seven brass tumblers.",
    victim: {
      name: "Royal Treasury Vault Level Nine",
      role: "Sovereign Gold Reserve",
      what_happened: "One hundred gold bars weighing four hundred pounds were removed cleanly from the deepest vault."
    },
    suspects: [
      {
        id: "S1",
        name: "Warden Malcor",
        role: "Chief Keeper of the Vault Level Nine",
        motive: "Blackmailed by underworld syndicates who kidnapped his daughter.",
        alibi: "Claims he was asleep in the guard barracks after completing his midnight inspection.",
        opportunity_note: "Holds the primary skeleton key to all seven brass tumblers."
      },
      {
        id: "S2",
        name: "Engineer Jarek",
        role: "Vault Lock Mechanism Inspector",
        motive: "Wanted to prove his new electromagnetic locks were superior by exposing the old brass tumblers.",
        alibi: "Was repairing hydraulic pump valves in Level Seven with three mechanists all night.",
        opportunity_note: "Knows exact tumbler tolerances and carries lockpicks."
      },
      {
        id: "S3",
        name: "Clerk Silas",
        role: "Gold Bullion Auditor",
        motive: "Sought to fund his escape to the southern colonies after embezzling from the copper account.",
        alibi: "States he was auditing bullion ledgers in the counting house until dawn.",
        opportunity_note: "Inspects the gold bar stacks inside Level Nine twice weekly."
      },
      {
        id: "S4",
        name: "Captain Thorne",
        role: "Subterranean Garrison Commander",
        motive: "Needed gold to pay off mercenary regiments threatening to mutiny.",
        alibi: "Was drilling guards in the upper courtyard during the midnight watch.",
        opportunity_note: "Carries the secondary pass-phrase to the elevator hoist."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Barracks Guard Check — Inspection of the Chief Keeper bed at one in the morning.",
        plaintext: "WARDEN MALCORS BED WAS STUFFED WITH BLANKETS AND HIS HEAVY KEY RING WAS MISSING FROM THE GUARD HOOK AT ONE AM",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Warden Malcor's barracks alibi; his bed was stuffed with blankets and his key ring gone."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Level Seven Hydraulic Log — Verification of pump repairs.",
        plaintext: "ENGINEER JAREK WORKED CONTINUOUSLY ON THE LEVEL SEVEN PUMPS WITH THREE MECHANISTS FROM TEN UNTIL DAWN",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Engineer Jarek whose continuous pump repair work is verified by three mechanists."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Counting House Guard Log — Auditor attendance verification.",
        plaintext: "CLERK SILAS WAS LOCKED INSIDE THE COUNTING HOUSE UNDER WATCH OF TWO SENTRIES AND NEVER ENTERED THE HOIST",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Clerk Silas who was locked inside the counting house under watch of two sentries."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Syndicate Ransom Note — Recovered from Malcor's private pocket ledger.",
        plaintext: "MALCOR MUST DELIVER ONE HUNDRED GOLD BARS TO THE SEWER GRATE AT TWO AM IF HE WISHES TO SEE HIS DAUGHTER ALIVE",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Malcor's tragic extortion motive and delivery of the gold to the sewer grate."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Warden Malcor unlocked the Level Nine Royal Treasury using his primary skeleton key to save his kidnapped daughter from an underworld syndicate. He stuffed his barracks bed with blankets at one in the morning and delivered one hundred gold bars to the sewer grate."
    }
  },
  {
    id: "CASE-015",
    title: "The Counterfeit Coinage",
    tier: "MASTER",
    era_flavor_line: "Thousands of newly minted gold sovereigns circulating through the Grand Exchange were discovered to contain lead cores plated in a micron of pure alchemical gold.",
    victim: {
      name: "Sovereign Mint Batch #701",
      role: "Imperial Currency Reserve",
      what_happened: "Five thousand pure gold sovereigns were secretly swapped for lead-cored replicas inside the Mint casting hall."
    },
    suspects: [
      {
        id: "S1",
        name: "Master Minter Corin",
        role: "Director of the Sovereign Mint",
        motive: "Pocketed the surplus pure gold bullion to fund his secret alchemical laboratory.",
        alibi: "Claims he was supervising the casting of silver shillings in the West Wing all afternoon.",
        opportunity_note: "Holds the master dies and bullion vault combinations."
      },
      {
        id: "S2",
        name: "Engraver Barnaby",
        role: "Chief Sovereign Die Cutter",
        motive: "Faced ruinous debts from silk imports and sought immediate wealth.",
        alibi: "Was engraving ceremonial medals inside his workshop under verification of two apprentices.",
        opportunity_note: "Manufactures the sovereign face dies."
      },
      {
        id: "S3",
        name: "Alchemist Elara",
        role: "Mint Bullion Assayer",
        motive: "Wanted to destroy Corin's reputation after he rejected her assay testing protocol.",
        alibi: "Was testing acid baths in the assay laboratory three floors above the casting hall.",
        opportunity_note: "Inspects and certifies each sovereign batch before release."
      },
      {
        id: "S4",
        name: "Warden Thorne",
        role: "Casting Hall Security Chief",
        motive: "Bribed by foreign currency manipulators attempting to crash the Guild economy.",
        alibi: "States he was inspecting perimeter gates during the casting of Batch #701.",
        opportunity_note: "Guards the bullion crucibles during pouring."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "West Wing Shilling Log — Check of casting supervision records.",
        plaintext: "MASTER MINTER CORIN WAS ABSENT FROM THE WEST WING FOR TWO HOURS DURING THE POURING OF BATCH SEVEN HUNDRED ONE",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Master Minter Corin's supervision alibi; he was absent during the exact pouring of Batch #701."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Workshop Apprentice Log — Engraver attendance verification.",
        plaintext: "ENGRAVER BARNABY REMAINED SEATED AT HIS BENCH CUTTING CEREMONIAL MEDALS UNDER WATCH OF TWO APPRENTICES ALL DAY",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Engraver Barnaby whose continuous medal engraving work was witnessed by two apprentices."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Assay Laboratory Record — Verification of chemical testing.",
        plaintext: "ALCHEMIST ELARA REPORTED LEAD ANOMALIES IN BATCH SEVEN HUNDRED ONE BUT HER REPORT WAS SUPPRESSED BY CORIN",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: ["S3"],
          establishes: "opportunity"
        },
        summary: "Rules out Alchemist Elara who actually reported the lead anomalies before Corin suppressed her report."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Private Laboratory Seizure — Audit of Corin's secret cellar workshop.",
        plaintext: "TWO HUNDRED POUNDS OF MISSING PURE GOLD BULLION WERE FOUND CAST INTO INGOTS INSIDE CORINS PRIVATE CELLAR VAULT",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Proves Corin's guilt; two hundred pounds of stolen pure gold bullion were found inside his private cellar."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Master Minter Corin abused his absolute authority over the Sovereign Mint to swap two hundred pounds of pure gold for lead-cored replicas during the casting of Batch #701. He suppressed Assayer Elara's anomaly reports and hoarded the stolen bullion inside his private cellar."
    }
  },
  {
    id: "CASE-016",
    title: "The Silent Scribe",
    tier: "MASTER",
    era_flavor_line: "In the quiet of the Secret Library, the only surviving parchment copy of the Covenant of the First Wyrm was found excised from its binding with a razor-sharp bookbinder's blade.",
    victim: {
      name: "Covenant of the First Wyrm Manuscript",
      role: "Ancient Foundation Charter",
      what_happened: "Fifty vellum leaves detailing the Guild's original dragon pact were sliced from their binding."
    },
    suspects: [
      {
        id: "S1",
        name: "Archivist Silas",
        role: "Keeper of the Secret Library",
        motive: "The Covenant revealed his family's ancestral nobility was fabricated from forged charters.",
        alibi: "Claims he was sorting manuscripts in the Outer Reading Room from noon to six.",
        opportunity_note: "Carries the only gold key to the Secret Library alcove."
      },
      {
        id: "S2",
        name: "Scribe Barnaby",
        role: "Master Bookbinder & Restorer",
        motive: "Offered ten thousand sovereigns by antiquarian collectors to deliver the original vellum.",
        alibi: "Was binding three heavy ledgers in the bindery workshop alongside two journeymen.",
        opportunity_note: "Uses razor-sharp bookbinder blades daily."
      },
      {
        id: "S3",
        name: "Scholar Mira",
        role: "Hermetic Historian",
        motive: "Wanted to prove the Guild was founded upon forbidden sorcery rather than lawful charter.",
        alibi: "States she was attending a public debate in the Great Hall all afternoon.",
        opportunity_note: "Had a three-hour research permit for the Secret Library."
      },
      {
        id: "S4",
        name: "Warden Corin",
        role: "Library Security Overseer",
        motive: "Sought to frame Silas after Silas reported Corin for drinking on night watch.",
        alibi: "Was inspecting perimeter locks on the outer grounds with his guard dog.",
        opportunity_note: "Can override library locks during security checks."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Reading Room Attendance Log — Check of Archivist Silas's afternoon desk.",
        plaintext: "ARCHIVIST SILAS WAS ABSENT FROM THE OUTER READING ROOM BETWEEN THREE AND FOUR WHEN THE ALCOVE ALARM FLICKERED",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Archivist Silas's reading room alibi; he was absent between three and four o'clock."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Bindery Workshop Log — Journeyman witness verification.",
        plaintext: "SCRIBE BARNABY WAS SEWING HEAVY LEDGERS CONTINUOUSLY IN THE BINDERY FROM NOON UNTIL SIX UNDER TWO WITNESSES",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Scribe Barnaby whose continuous bookbinding work was witnessed by two journeymen."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Great Hall Debate Record — Transcript of afternoon speakers.",
        plaintext: "SCHOLAR MIRA SPOKE ON STAGE AT THE GREAT HALL DEBATE AT THREE THIRTY EXACTLY WHEN THE MANUSCRIPT WAS CUT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Scholar Mira who was speaking publicly on stage when the manuscript was cut."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Cellar Furnace Inspection — Recovered from Silas's private quarters.",
        plaintext: "SILAS BURNED FIFTY VELLUM LEAVES IN HIS PRIVATE HEARTH TO ERASE PROOF THAT HIS ANCESTORS WERE SERFS AND FORGERS",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Silas's personal motive and the charred remains of the fifty vellum leaves inside his hearth."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Archivist Silas sliced the Covenant of the First Wyrm from its binding and burned the fifty vellum leaves inside his private hearth between three and four o'clock to destroy historical proof that his family's noble lineage was built upon serfdom and forged charters."
    }
  },
  {
    id: "CASE-017",
    title: "The Broken Ward",
    tier: "MASTER",
    era_flavor_line: "During the height of the solar eclipse, the protective obsidian ward protecting the high sanctum shattered, allowing shadowy thieves to plunder the Grand Reliquary.",
    victim: {
      name: "The Obsidian Sanctum Ward Matrix",
      role: "Magical & Mechanical Shielding",
      what_happened: "Shattered by a harmonic resonance device planted inside the ward control pillar."
    },
    suspects: [
      {
        id: "S1",
        name: "Engineer Corin",
        role: "Ward Pillar Maintenance Mechanist",
        motive: "Bribed twenty thousand gold sovereigns by the Black Talon thieves guild.",
        alibi: "Claims he was in the lower engine room adjusting steam valves during the eclipse.",
        opportunity_note: "Serviced the ward control pillar three hours before the eclipse."
      },
      {
        id: "S2",
        name: "Arch-Warden Orlo",
        role: "Sanctum Defense Commander",
        motive: "Wanted to prove the current ward was obsolete to force purchase of his own patented defense grid.",
        alibi: "Was on the high battlements observing the eclipse alongside the Guildmaster.",
        opportunity_note: "Holds the emergency ward shutdown keys."
      },
      {
        id: "S3",
        name: "Alchemist Kaelen",
        role: "Harmonic Crystal Tuner",
        motive: "Faced expulsion after illegal experiments with dark matter crystals.",
        alibi: "Was locked inside the crystal grinding lab with three apprentices from noon until three.",
        opportunity_note: "Calibrates the resonance frequencies of the ward crystals."
      },
      {
        id: "S4",
        name: "Scholar Elara",
        role: "Reliquary Artifact Cataloger",
        motive: "Conspired with foreign museums to acquire three ancient dragon crowns.",
        alibi: "Was taking tea in the scholars lounge with four visiting professors.",
        opportunity_note: "Has unrestricted entry to the Reliquary before ward activation."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Engine Room Valve Log — Check of mechanical attendance.",
        plaintext: "ENGINEER CORIN WAS NOT IN THE ENGINE ROOM DURING THE ECLIPSE HIS STEAM GAUGE WAS UNTENDED FOR ONE HOUR",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Engineer Corin's engine room alibi; his steam gauge was untended for an hour during the eclipse."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Battlement Observation Log — Eyewitness verification of command presence.",
        plaintext: "ARCH WARDEN ORLO STOOD ON THE HIGH BATTLEMENT WITH THE GUILDMASTER AND SIX SENTRIES THROUGHOUT THE ECLIPSE",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Arch-Warden Orlo whose continuous presence on the battlement is confirmed by the Guildmaster."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Crystal Lab Attendance — Verification of apprentice watch.",
        plaintext: "ALCHEMIST KAELEN REMAINED IN THE CRYSTAL GRINDING LAB UNDER WATCH OF THREE APPRENTICES AND NEVER ENTERED THE PILLAR",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Alchemist Kaelen who was verified inside the crystal grinding lab alongside three apprentices."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Pillar Inspection Report — Forensic examination of the shattered control pillar.",
        plaintext: "A BRASS CLOCKWORK RESONANCE TUNER BEARING ENGINEER CORINS TOOL MARK WAS WIRED DIRECTLY INTO THE PILLAR CRYSTAL",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "opportunity"
        },
        summary: "Proves Corin wired his own brass clockwork resonance tuner directly into the control pillar crystal."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Engineer Corin accepted twenty thousand gold sovereigns from the Black Talon thieves guild to plant a clockwork harmonic resonance tuner inside the ward control pillar during his morning maintenance check. The device shattered the obsidian ward exactly during the solar eclipse."
    }
  },
  {
    id: "CASE-018",
    title: "The Poisoned Parchment",
    tier: "MASTER",
    era_flavor_line: "When High Treasurer Malcor licked his finger to turn the crisp pages of the Annual Guild Financial Report, his tongue blackened and he collapsed from lethal arsenic contact poison.",
    victim: {
      name: "High Treasurer Malcor",
      role: "Director of Guild Finances & Taxation",
      what_happened: "Poisoned via arsenic paste brushed delicately onto the bottom right corner of ledger page forty-two."
    },
    suspects: [
      {
        id: "S1",
        name: "Scribe Silas",
        role: "Annual Report Transcriber",
        motive: "Page forty-two contained the audit exposing Silas's secret embezzlement of five thousand sovereigns.",
        alibi: "Claims he delivered the report at noon and spent the afternoon at the Scriptorium public script bench.",
        opportunity_note: "Transcribed and bound the entire fifty-page report."
      },
      {
        id: "S2",
        name: "Apothecary Vespera",
        role: "Guild Pigment & Ink Brewer",
        motive: "Malcor cancelled her contract to supply royal purple ink in favor of cheap foreign imports.",
        alibi: "Was conducting botanical distillation classes with six students from noon until five.",
        opportunity_note: "Supplies the special binding glues used on official reports."
      },
      {
        id: "S3",
        name: "Clerk Barnaby",
        role: "Malcor's Personal Secretary",
        motive: "Wanted to become High Treasurer upon Malcor's death.",
        alibi: "States he was sorting correspondence in the outer office when Malcor opened the report at three o'clock.",
        opportunity_note: "Placed the bound report onto Malcor's private desk at two o'clock."
      },
      {
        id: "S4",
        name: "Envoy Thorne",
        role: "Taxation Dispute Representative",
        motive: "Sought to eliminate Malcor to prevent a crippling fifty percent tariff on his merchant fleet.",
        alibi: "Was aboard his flagship at the harbor attending a captains council.",
        opportunity_note: "Visited Malcor's office at one o'clock while the desk was unattended."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Scriptorium Public Roll — Verification of Silas's afternoon bench presence.",
        plaintext: "SCRIBE SILAS LEFT THE PUBLIC BENCH AT ONE THIRTY AND WAS SEEN CARRYING AN INK BRUSH INTO MALCORS EMPTY OFFICE",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Scribe Silas's public bench alibi; he slipped into Malcor's empty office at one thirty with an ink brush."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Botanical Class Roster — Student attendance check.",
        plaintext: "APOTHECARY VESPERA LECTURED CONTINUOUSLY BEFORE SIX STUDENTS IN THE HERB GARDEN FROM NOON UNTIL FIVE O CLOCK",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Apothecary Vespera whose continuous afternoon lecture was witnessed by six students."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Secretary Desk Observation — Check of Barnaby's movements.",
        plaintext: "CLERK BARNABY SAT IN THE GLASS FRONTED OUTER OFFICE AND NEVER RE ENTERED MALCORS SANCTUM AFTER TWO O CLOCK",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Clerk Barnaby whose presence in the glass-fronted outer office is verified without re-entry."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Forensic Ledger Analysis — Examination of report page forty-two.",
        plaintext: "ARSENIC PASTE WAS APPLIED EXACTLY UPON THE EMBEZZLEMENT AUDIT FIGURE TO KILL MALCOR BEFORE HE READ THE TOTAL",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Proves Silas applied arsenic paste directly over the audit figure exposing his five thousand sovereign theft."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Scribe Silas brushed lethal arsenic contact poison onto the corner of page forty-two of the Annual Guild Financial Report to kill High Treasurer Malcor before he could read the audit exposing Silas's five thousand sovereign embezzlement."
    }
  },

  // ==========================================
  // TIER IV: ARCHON SEALS (5 Suspects, 4 Chambers, 0 Ward Whispers, Soft Cooldowns Enforced)
  // ==========================================
  {
    id: "CASE-019",
    title: "The Grand Archon's Conspiracy",
    tier: "ARCHON",
    era_flavor_line: "On the night of the Centennial Jubilee, Grand Archon Kaelen died instantly when the Coronation Crown was placed upon his brow—lethal lightning surged from a hidden runic capacitor inside the gold diadem.",
    victim: {
      name: "Grand Archon Kaelen",
      role: "Supreme Guild Sovereign",
      what_happened: "Killed during coronation by a concealed high-voltage runic capacitor wired into the interior diadem band."
    },
    suspects: [
      {
        id: "S1",
        name: "Arch-Alchemist Orlo",
        role: "High Council Vice-Chancellor",
        motive: "As next in line for the sovereign throne, Orlo inherits supreme authority over all seven guild vaults.",
        alibi: "Claims he stood on the cathedral dais beside the High Priest during the entire two-hour coronation mass.",
        opportunity_note: "Inspects and blesses the Coronation Crown inside the vestry thirty minutes before the ceremony."
      },
      {
        id: "S2",
        name: "Engineer Jarek",
        role: "Imperial Diadem Restorer & Goldsmith",
        motive: "Kaelen threatened to execute Jarek after discovering Jarek sold crown jewels to foreign monarchs.",
        alibi: "Was inside the cathedral organ loft tuning the brass pipes with two organists all evening.",
        opportunity_note: "Polished and adjusted the gold diadem bands inside his workshop all week."
      },
      {
        id: "S3",
        name: "Warden Thorne",
        role: "Commander of the Sovereign Guard",
        motive: "Conspired with military commanders to establish a martial junta over the civil Scriptorium.",
        alibi: "States he was commanding the perimeter guard ring outside the cathedral west gates.",
        opportunity_note: "Escorted the velvet crown casket from the treasury to the vestry."
      },
      {
        id: "S4",
        name: "Scribe Silas",
        role: "Keeper of the Coronation Liturgy",
        motive: "Wanted to avenge his brother who was banished by Kaelen for sedition.",
        alibi: "Was transcribing the jubilee attendance roll inside the north transept alongside three clerks.",
        opportunity_note: "Carried the velvet cushion bearing the crown to the altar."
      },
      {
        id: "S5",
        name: "Apothecary Vespera",
        role: "Royal Alchemical Purveyor",
        motive: "Kaelen seized her alchemical laboratories under royal eminent domain.",
        alibi: "Was attending the banquet preparation in the guild hall half a mile away.",
        opportunity_note: "Supplies the insulating resins used inside royal jewelry."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Vestry Inspection Log — Check of pre-ceremony vestry access.",
        plaintext: "ARCH ALCHEMIST ORLO EXPELLED THE GUARDS FROM THE VESTRY FOR TEN MINUTES AND WIRED THE CAPACITOR TO THE DIADEM BAND",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "opportunity"
        },
        summary: "Proves Arch-Alchemist Orlo expelled guards from the vestry and wired the capacitor into the diadem band."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Organ Loft Witness Roll — Verification of Engineer Jarek's location.",
        plaintext: "ENGINEER JAREK REMAINED IN THE ORGAN LOFT TUNING PIPES UNDER WATCH OF TWO ORGANISTS UNTIL AFTER THE FATAL SHOCK",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Engineer Jarek whose continuous presence in the organ loft is confirmed by two organists."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Perimeter Guard Log — Commander Thorne's station verification.",
        plaintext: "WARDEN THORNE WAS ON HORSEBACK AT THE WEST GATES IN VIEW OF FIFTY SOLDIERS FROM EIGHT UNTIL THE CATHEDRAL BELLS RANG",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Warden Thorne who commanded fifty soldiers on horseback at the west gates continuously."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Secret Succession Draft — Found hidden inside Orlo's cathedral missal.",
        plaintext: "ORLOS DECREE ASSUMING SUPREME SOVEREIGN AUTHORITY WAS PRE PRINTED TWELVE HOURS BEFORE KAELEN STEPPED UPON THE DAIS",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Orlo's pre-meditated sovereign coup; his succession decree was printed twelve hours early."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Arch-Alchemist Orlo orchestrated the sovereign coup to seize the Grand Archon throne. During his thirty-minute solo inspection inside the cathedral vestry, Orlo expelled the guards and wired a high-voltage runic capacitor directly into the interior band of the Coronation Crown."
    }
  },
  {
    id: "CASE-020",
    title: "The Eclipse Ritual",
    tier: "ARCHON",
    era_flavor_line: "In the subterranean Hall of Stars, the Sacred Astrolabe was smashed with a heavy brass mallet exactly when the planetary conjunction aligned to open the Celestial Vault.",
    victim: {
      name: "The Sacred Celestial Astrolabe",
      role: "Astronomical Vault Matrix",
      what_happened: "Smashed into brass fragments to permanently seal the Celestial Vault before the conjunction passed."
    },
    suspects: [
      {
        id: "S1",
        name: "Scholar Elara",
        role: "Chief Astrolabe Calculator",
        motive: "Discovered the Celestial Vault contained ancient weapons capable of incinerating the city.",
        alibi: "Claims she was taking star sights on the observatory roof from eleven until midnight.",
        opportunity_note: "Holds the primary bronze key to the Hall of Stars."
      },
      {
        id: "S2",
        name: "Envoy Malcor",
        role: "Visiting Foreign Astrologer",
        motive: "Offered one hundred thousand sovereigns by rival empires to deny the Guild celestial relics.",
        alibi: "Was lecturing on lunar eclipses in the West Lecture Hall before forty students.",
        opportunity_note: "Visited the Hall of Stars at ten o'clock."
      },
      {
        id: "S3",
        name: "Smith Goran",
        role: "Astrolabe Brass Caretaker",
        motive: "Sought to hide his accidental cracking of the central gears during yesterday's maintenance.",
        alibi: "Was operating the steam hoist in the basement forge three floors below.",
        opportunity_note: "Carries heavy brass mallets in his tool cart."
      },
      {
        id: "S4",
        name: "Warden Corin",
        role: "Observatory Security Officer",
        motive: "Wanted to steal the diamond bearing jewels from the astrolabe axis after the smash.",
        alibi: "States he was patrolling the spiral staircases between the second and fourth floors.",
        opportunity_note: "Has master skeleton keys to all observatory gates."
      },
      {
        id: "S5",
        name: "Alchemist Kaelen",
        role: "Starlight Lens Polish Director",
        motive: "Resented Scholar Elara for rejecting his optical lens formulas.",
        alibi: "Was distilling optical alcohol in the chem lab alongside two assistants.",
        opportunity_note: "Cleans the astrolabe lenses every evening at nine."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Observatory Roof Log — Check of roof access timestamps.",
        plaintext: "SCHOLAR ELARA CAME DOWN FROM THE ROOF AT ELEVEN FIFTEEN AND WAS SEEN CARRYING A HEAVY MALLET INTO THE HALL OF STARS",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Scholar Elara's roof alibi; she slipped down at eleven fifteen carrying a heavy brass mallet."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Lecture Hall Attendance Roll — Verification of public address.",
        plaintext: "ENVOY MALCOR SPOKE CONTINUOUSLY BEFORE FORTY STUDENTS IN THE WEST HALL FROM TEN UNTIL THE MIDNIGHT BELL CHIMED",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Envoy Malcor whose continuous public lecture was witnessed by forty students."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Basement Steam Hoist Log — Mechanist verification records.",
        plaintext: "SMITH GORAN OPERATED THE STEAM HOIST CONTINUOUSLY WITH THREE PORTERS FROM TEN UNTIL ONE IN THE MORNING",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Smith Goran whose continuous operation of the steam hoist is verified by porters."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Private Research Journal — Discovered hidden inside Elara's desk.",
        plaintext: "IF THE CELESTIAL VAULT OPENS THE APOCALYPSE WEAPON WILL DESTROY US ALL I MUST SMASH THE ASTROLABE TO SAVE HUMANITY",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Scholar Elara's noble yet destructive motive to save humanity from the apocalyptic weapon."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Scholar Elara smashed the Sacred Astrolabe with a heavy brass mallet at eleven fifteen to permanently seal the Celestial Vault. Her research uncovered that the celestial conjunction would release ancient apocalyptic weapons capable of incinerating the city."
    }
  },
  {
    id: "CASE-021",
    title: "The Treason of the Guildmaster",
    tier: "ARCHON",
    era_flavor_line: "The sovereign obsidian seal protecting the Guild's deepest defense reserves was found unlocked on the eve of the imperial siege without a single ward tripped.",
    victim: {
      name: "Sovereign Defense Reserve Vault",
      role: "Imperial Siege Defense Supply",
      what_happened: "Ten thousand pounds of black gunpowder and fifty dragon-fire cannons were surrendered to the besieging army."
    },
    suspects: [
      {
        id: "S1",
        name: "Guildmaster Oakhaven",
        role: "Supreme Commander of the Guilds",
        motive: "Agreed to surrender the defense vault to the besieging emperor in exchange for lifelong governorship of the province.",
        alibi: "Claims he was in the war council chamber presiding over defense planning from dusk to midnight.",
        opportunity_note: "Holds the supreme master seal and ward override codes."
      },
      {
        id: "S2",
        name: "General Thorne",
        role: "Commander of the Defense Battery",
        motive: "Resented the civilian guild leadership and wanted martial law proclaimed.",
        alibi: "Was inspecting the outer curtain wall artillery with three captains all night.",
        opportunity_note: "Has keys to the artillery hoist and magazine tunnels."
      },
      {
        id: "S3",
        name: "Archivist Vane",
        role: "Keeper of the Siege Maps",
        motive: "Bribed five hundred silver ingots by enemy intelligence scouts.",
        alibi: "Was sorting secret tunnels maps inside the subterranean archive under two clerks.",
        opportunity_note: "Knows every ventilation shaft into the reserve vault."
      },
      {
        id: "S4",
        name: "Alchemist Mira",
        role: "Gunpowder Quality Director",
        motive: "Sought to sell high-grade dragon-fire powder to southern trade princes.",
        alibi: "Was testing fuse burn rates inside the chemical magazine with two assistants.",
        opportunity_note: "Inspects the gunpowder barrels daily."
      },
      {
        id: "S5",
        name: "Clerk Barnaby",
        role: "Guildmaster's Personal Aide",
        motive: "Wanted to flee the besieged city with the Guildmaster's emergency gold chest.",
        alibi: "Was transcribing war council minutes inside the anteroom from eight until midnight.",
        opportunity_note: "Handles the Guildmaster's seal ring when it is cleaned."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "War Council Minutes — Check of Guildmaster attendance.",
        plaintext: "GUILDMASTER OAKHAVEN DISMISSED THE WAR COUNCIL EARLY AT TEN AND ENTERED THE RESERVE VAULT WITH HIS MASTER SEAL",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Guildmaster Oakhaven's war council alibi; he dismissed the council early and entered the vault."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Curtain Wall Artillery Log — Captain check-in verification.",
        plaintext: "GENERAL THORNE REMAINED UPON THE OUTER CURTAIN WALL WITH THREE CAPTAINS CONTINUOUSLY UNTIL THE SURRENDER BELL RANG",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out General Thorne whose continuous command upon the outer curtain wall is verified by three captains."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Subterranean Archive Log — Clerk attendance check.",
        plaintext: "ARCHIVIST VANE WAS LOCKED INSIDE THE SUBTERRANEAN ARCHIVE WITH TWO CLERKS ALL NIGHT WITHOUT KEY ACCESS TO THE VAULT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Archivist Vane who was locked inside the subterranean archive without key access."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Secret Treaty Parchment — Found inside Oakhaven's private safe.",
        plaintext: "OAKHAVEN TO BE CROWNED LIFELONG GOVERNOR BY THE EMPEROR IMMEDIATELY UPON SURRENDERING CANNONS AND POWDER AT MIDNIGHT",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Oakhaven's treasonous treaty with the besieging emperor in exchange for lifelong governorship."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Guildmaster Oakhaven committed supreme treason against the city on the eve of the siege. He dismissed the war council early at ten o'clock, used his master seal to unlock the defense vault without tripping alarms, and surrendered ten thousand pounds of gunpowder and fifty dragon-fire cannons to the besieging emperor to secure his appointment as lifelong governor."
    }
  },
  {
    id: "CASE-022",
    title: "The Obsidian Dagger",
    tier: "ARCHON",
    era_flavor_line: "During the secret conclave of the Seven High Councilors, Grand Inquisitor Vane was struck dead in the dark by an ancient obsidian sacrificial dagger plunged through the back of his velvet robes.",
    victim: {
      name: "Grand Inquisitor Vane",
      role: "Chief of Guild Internal Security",
      what_happened: "Assassinated in the dark during the brief extinguishing of the conclave candles using a ceremonial obsidian blade."
    },
    suspects: [
      {
        id: "S1",
        name: "Councilor Silas",
        role: "High Councilor of Trade",
        motive: "Vane had compiled a dossier proving Silas smuggled prohibited dark matter crystals into the harbor.",
        alibi: "Claims he remained seated at the south end of the conclave table during the candle blackout.",
        opportunity_note: "Sat three chairs to the left of Grand Inquisitor Vane."
      },
      {
        id: "S2",
        name: "Alchemist Kaelen",
        role: "High Councilor of Transmutation",
        motive: "Vane threatened to excommunicate Kaelen for performing forbidden necromantic transmutations.",
        alibi: "States he was holding Councilor Elara's hand during the entire two-minute blackout.",
        opportunity_note: "Sat directly across the round table from Vane."
      },
      {
        id: "S3",
        name: "Scholar Elara",
        role: "High Councilor of Archives",
        motive: "Wanted Vane's inquisitorial budget redirected to library restoration.",
        alibi: "Was holding Alchemist Kaelen's hand across the table when the lights went out.",
        opportunity_note: "Sat adjacent to Alchemist Kaelen."
      },
      {
        id: "S4",
        name: "Warden Corin",
        role: "High Councilor of Security",
        motive: "Sought supreme command of the Inquisition guards.",
        alibi: "Was standing by the locked bronze conclave doors with his sword drawn throughout the darkness.",
        opportunity_note: "Stood twenty feet from the table by the entry doors."
      },
      {
        id: "S5",
        name: "Scribe Barnaby",
        role: "Conclave Minute Keeper",
        motive: "Bribed fifty thousand sovereigns by foreign agents to eliminate the Grand Inquisitor.",
        alibi: "Was sharpening his transcription quills at the clerk desk in the corner when the candles flickered.",
        opportunity_note: "Sat ten feet behind Vane's high-backed chair."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Conclave Floor Inspection — Forensic examination of the velvet carpet.",
        plaintext: "COUNCILOR SILAS SLEPT FROM HIS CHAIR DURING THE BLACKOUT LEAVING FRESH WAX DRIPS FROM HIS SLEEVE BESIDE VANES CHAIR",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "opportunity"
        },
        summary: "Breaks Councilor Silas's seated alibi; his sleeve dropped fresh wax beside Vane's chair during the blackout."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Witness Handshake Verification — Confirmation of mutual touch.",
        plaintext: "ELARA AND KAELEN HELD HANDS FIRMLY ACROSS THE TABLE THROUGHOUT THE TWO MINUTE BLACKOUT NEITHER COULD HAVE STUCK VANE",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2", "S3"],
          establishes: "alibi"
        },
        summary: "Rules out both Alchemist Kaelen and Scholar Elara who held hands firmly across the table throughout."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Bronze Door Guard Log — Observation of Warden Corin.",
        plaintext: "WARDEN CORIN NEVER LEANED FROM THE BRONZE DOORS HIS HEAVY IRON GREAVES WERE HEARD STANDING FIRM BY THE ENTRYWAY",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S4"],
          establishes: "timeline"
        },
        summary: "Rules out Warden Corin whose heavy iron greaves were heard standing stationary by the bronze entry doors."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Inquisitorial Dossier #99 — Recovered from Vane's locked portfolio.",
        plaintext: "SILAS TO BE ARRESTED FOR HIGH TREASON AT DAWN FOR SMUGGLING DARK MATTER CRYSTALS VANE SIGNED THE WARRANT TODAY",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Silas's imminent ruin; Vane had signed his warrant for high treason and crystal smuggling today."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Councilor Silas assassinated Grand Inquisitor Vane during the two-minute conclave candle blackout using an ancient obsidian sacrificial dagger. Silas knew Vane had just signed a warrant for his arrest at dawn for smuggling prohibited dark matter crystals into the harbor."
    }
  },
  {
    id: "CASE-023",
    title: "The Lost Covenant",
    tier: "ARCHON",
    era_flavor_line: "In the sealed Vault of Founders, the golden reliquary containing the sacred ashes of Arch-Founder Malcor was found forced open and emptied on the eve of the Guild Centennial.",
    victim: {
      name: "Sacred Ashes of Arch-Founder Malcor",
      role: "Foundation Relic Reserve",
      what_happened: "Stolen and replaced with common wood ash inside the sealed gold reliquary."
    },
    suspects: [
      {
        id: "S1",
        name: "Archivist Elara",
        role: "Director of the Vault of Founders",
        motive: "Sought to sell the sacred ashes to foreign alchemists who believe founder ash grants immortality.",
        alibi: "Claims she was cataloging ancient seal impressions in the upper library from eight until midnight.",
        opportunity_note: "Holds the primary combination ring to the golden reliquary."
      },
      {
        id: "S2",
        name: "Warden Thorne",
        role: "Chief of Reliquary Security",
        motive: "Faced massive extortion debts to the Black Talon syndicate.",
        alibi: "Was conducting hourly checks of the exterior vault gates accompanied by two sentries.",
        opportunity_note: "Holds the secondary combination ring to the golden reliquary."
      },
      {
        id: "S3",
        name: "Scribe Barnaby",
        role: "Reliquary Restoration Specialist",
        motive: "Wanted to discredit Archivist Elara to take her position as Director.",
        alibi: "Was repairing gilded bindings inside the restoration workshop under verification of two clerks.",
        opportunity_note: "Polishes the gold reliquary every Friday evening."
      },
      {
        id: "S4",
        name: "Alchemist Orlo",
        role: "Visiting Transmutation Scholar",
        motive: "Needed founder ash to complete his experimental philosopher's stone tincture.",
        alibi: "States he was dining at the Guildmaster table in the Great Banquet Hall all evening.",
        opportunity_note: "Had a one-hour research permit for the Vault of Founders during the afternoon."
      },
      {
        id: "S5",
        name: "Engineer Jarek",
        role: "Vault Lock Caretaker",
        motive: "Resented the Guild for rejecting his hydraulic door designs.",
        alibi: "Was repairing the central boiler in the sub-basement with three stokers until one in the morning.",
        opportunity_note: "Carries precision lockpicks and mechanical bypass levers."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "Upper Library Attendance Log — Check of evening library presence.",
        plaintext: "ARCHIVIST ELARA LEFT THE UPPER LIBRARY AT TEN AND WAS SEEN CARRYING AN ASH SACK INTO THE VAULT OF FOUNDERS",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Archivist Elara's library alibi; she left at ten carrying an ash sack into the Vault of Founders."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Exterior Gate Guard Log — Verification of Warden Thorne's watch.",
        plaintext: "WARDEN THORNE SIGNED CHECKPOINTS EVERY HOUR AT THE EXTERIOR GATES WITH TWO SENTRIES AND NEVER ENTERED THE RELIQUARY",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Warden Thorne whose continuous presence at the exterior gates is verified by sentries."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Restoration Workshop Log — Clerk witness verification.",
        plaintext: "SCRIBE BARNABY SEWED GILDED BINDINGS CONTINUOUSLY IN THE WORKSHOP ALONGSIDE TWO CLERKS FROM EIGHT UNTIL MIDNIGHT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Scribe Barnaby whose continuous bookbinding work was witnessed by two clerks."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Smuggler Letter — Discovered hidden inside Elara's private writing desk.",
        plaintext: "ELARA TO RECEIVE ONE HUNDRED THOUSAND GOLD SOVEREIGNS UPON DELIVERING FOUNDER MALCORS ASHES TO THE FOREIGN GALLEY AT DAWN",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Elara's corrupt motive and deal for one hundred thousand gold sovereigns from foreign alchemists."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Archivist Elara abused her authority as Director of the Vault of Founders to steal the sacred ashes of Arch-Founder Malcor for one hundred thousand sovereigns from foreign alchemists. She slipped down from the upper library at ten o'clock carrying a sack of wood ash to replace the founder relics."
    }
  },
  {
    id: "CASE-024",
    title: "The Dragon's Awakening",
    tier: "ARCHON",
    era_flavor_line: "In the deepest abyss of the Wyrmvault, the Great Obsidian Seal restraining the Slumbering Dragon was found cracked by an alchemical thermal charge exactly twelve hours before the spring equinox.",
    victim: {
      name: "Great Obsidian Dragon Seal #1",
      role: "World Defense Ward Matrix",
      what_happened: "Cracked by a high-intensity alchemical thermal charge planted directly upon the primary ward keystone."
    },
    suspects: [
      {
        id: "S1",
        name: "Alchemist Balthazar",
        role: "Supreme Director of Ward Maintenance",
        motive: "Conspired with doomsday cultists who believe awakening the Dragon will cleanse the corrupt world.",
        alibi: "Claims he was in the High Laboratory distilling liquid sulfur from eight until midnight.",
        opportunity_note: "Holds the supreme frequency tuning wand required to approach the Great Seal without triggering alarms."
      },
      {
        id: "S2",
        name: "Engineer Corin",
        role: "Subterranean Thermal Inspector",
        motive: "Faced ruinous gambling debts and sought to loot the evacuated treasury when the city fled in terror.",
        alibi: "Was repairing steam conduits in Level Eight with four pipe-fitters all evening.",
        opportunity_note: "Carries high-intensity thermal drilling charges for mine expansion."
      },
      {
        id: "S3",
        name: "Warden Malcor",
        role: "Commander of the Deep Abyss Guard",
        motive: "Wanted to force the High Council to declare martial law and appoint him military governor.",
        alibi: "Was inspecting guard posts across Level Nine accompanied by three lieutenants continuously.",
        opportunity_note: "Controls the heavy iron blast doors leading into the Dragon Abyss."
      },
      {
        id: "S4",
        name: "Scholar Vane",
        role: "Chief Draconic Historian",
        motive: "Sought to observe a live dragon awakening to complete his twenty-volume encyclopedia of draconic biology.",
        alibi: "Was delivering a lecture on draconic runes inside the Great Amphitheater before fifty scholars.",
        opportunity_note: "Holds a Level Ten research permit for the Great Seal."
      },
      {
        id: "S5",
        name: "Apprentice Lucian",
        role: "Balthazar's Personal Laboratory Assistant",
        motive: "Resented Balthazar and wanted to sabotage his ward maintenance record to force his dismissal.",
        alibi: "Was washing glassware inside the chemical scullery under verification of the scullery master.",
        opportunity_note: "Prepares the thermal charges used in Balthazar's experiments."
      }
    ],
    culprit: "S1",
    evidence_letters: [
      {
        chamber_id: "Chamber 1",
        cipher_type: "TIER_I",
        expected_clue_type: "High Laboratory Audit — Check of Balthazar's evening distillation watch.",
        plaintext: "BALTHAZAR LEFT THE HIGH LAB AT TEN WITH A THERMAL CHARGE SACK AND PASSED THE ABYSS GATES USING HIS TUNING WAND",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "alibi"
        },
        summary: "Breaks Alchemist Balthazar's lab alibi; he left at ten carrying a thermal charge sack into the abyss."
      },
      {
        chamber_id: "Chamber 2",
        cipher_type: "TIER_I",
        expected_clue_type: "Level Eight Conduit Log — Mechanist attendance check.",
        plaintext: "ENGINEER CORIN WORKED CONTINUOUSLY ON THE LEVEL EIGHT PIPES WITH FOUR FITTERS FROM EIGHT UNTIL ONE IN THE MORNING",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S2"],
          establishes: "timeline"
        },
        summary: "Rules out Engineer Corin whose continuous steam conduit repair is verified by four pipe-fitters."
      },
      {
        chamber_id: "Chamber 3",
        cipher_type: "TIER_II",
        expected_clue_type: "Abyss Guard Inspection — Commander Malcor's watch log.",
        plaintext: "COMMANDER MALCOR REMAINED UPON LEVEL NINE WITH THREE LIEUTENANTS AND NEVER DESCENDED TO LEVEL TEN ALL NIGHT",
        clue_tags: {
          points_to_suspect_id: [],
          rules_out_suspect_id: ["S3"],
          establishes: "alibi"
        },
        summary: "Rules out Warden Malcor who remained on Level Nine accompanied by three lieutenants all evening."
      },
      {
        chamber_id: "Chamber 4",
        cipher_type: "TIER_II",
        expected_clue_type: "Cult Covenant Scroll — Seized from Balthazar's private altar.",
        plaintext: "BALTHAZAR TO CRACK THE GREAT SEAL AT ELEVEN SO THE DRAGONS FLAME MAY PURGE THE CORRUPT EMPIRE AND CLEANSE THE WORLD",
        clue_tags: {
          points_to_suspect_id: ["S1"],
          rules_out_suspect_id: [],
          establishes: "motive"
        },
        summary: "Establishes Balthazar's apocalyptic cult motive; his covenant pledged to crack the Great Seal to purge the empire."
      }
    ],
    solution_requirement: {
      required_clue_tags: ["S1"],
      explanation: "Alchemist Balthazar became a fanatic of a doomsday cult dedicated to cleansing the corrupt empire with dragon fire. He left his laboratory at ten o'clock, bypassed the abyss alarms using his supreme frequency tuning wand, and planted an alchemical thermal charge upon the primary keystone of the Great Obsidian Seal."
    }
  }
];

// Helper: Get random case by requested tier (`or fallback gracefully`)
export function getRandomCaseByTier(tier = "NOVICE") {
  const cleanTier = (tier || "NOVICE").toUpperCase();
  const matching = CASE_CATALOG.filter((c) => c.tier === cleanTier);
  if (matching.length > 0) {
    const idx = Math.floor(Math.random() * matching.length);
    return JSON.parse(JSON.stringify(matching[idx]));
  }
  // Fallback to any random case
  const idx = Math.floor(Math.random() * CASE_CATALOG.length);
  return JSON.parse(JSON.stringify(CASE_CATALOG[idx]));
}
