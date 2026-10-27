/* ──────────────────────────────────────────────────────────────
   THE ITINERARY.  This is the only file you need to edit.

   To change the site:  edit this file  →  commit  →  push.
   GitHub rebuilds the page in about a minute.

   status can be one of:
     "booked"   — reserved, time is fixed, shows a filled mark
     "tobook"   — not booked yet, needs doing
     "travel"   — getting from A to B
     "ride"     — on the snow
     "walkin"   — no reservation, just turn up
     "free"     — nothing planned, decide on the day
     "tbc"      — still being arranged

   Every field except `name` is optional. Leave anything out and
   the page simply won't render that line.

   `map` is a Google Maps search phrase: it turns the name into a
   map link. `place` (a Google place id) does the same, more exactly.
   ────────────────────────────────────────────────────────────── */

const TRIP = {
  city: "Shiga Kogen",
  dates: "25 December 2026 – 2 January 2027",
  standfirst:
    "Eight nights, two of us, built around the snow. Five nights ski-in, ski-out at the Prince, " +
    "one in Nagano on the way up and two in Tokyo on the way home. Two trains and two buses hold " +
    "it all together — they're the first thing below the flights.",

  flights: [
    {
      dir: "Out",
      code: "SQ632",
      route: "Singapore to Haneda",
      date: "Friday 25 December",
      depart: "08:05",
      arrive: "15:35",
    },
    {
      dir: "Back",
      code: "SQ635",
      route: "Haneda to Singapore",
      date: "Saturday 2 January, landing Sunday 3rd",
      depart: "22:55",
      arrive: "05:20",
    },
  ],

  // Every hotel, in date order. Shown at the top, under the dates.
  stays: [
    {
      when: "25 Dec",
      nights: "1 night",
      name: "Hotel Courtland",
      map: "Hotel Courtland Nagano",
      where: "Nagano, opposite the station's East Exit",
      cancel: "Free cancellation before 16 Dec — treat 15 Dec as the last safe day",
    },
    {
      when: "26 Dec",
      nights: "5 nights",
      name: "Shiga Kogen Prince Hotel",
      map: "Shiga Kogen Prince Hotel",
      where: "Most likely the West building. Ski-in, ski-out",
      cancel: "Free cancellation until 8 Dec",
      tel: "0269-34-3111",
    },
    {
      when: "31 Dec",
      nights: "2 nights",
      name: "Tokyo Marriott Hotel",
      map: "Tokyo Marriott Hotel Shinagawa",
      where: "Shinagawa, free shuttle from the Takanawa exit",
      cancel: "Free cancellation until 28 Dec, 23:59 Tokyo time",
      tel: "03-5488-3911",
    },
  ],

  // The timed connections, surfaced at the top of the page.
  lockedTitle: "The four connections",
  locked: [
    {
      day: "Friday 25",
      time: "18:24",
      name: "Kagayaki 515, Tokyo to Nagano",
      note: "Arrives 19:44. E-ticket on our Suicas — no ticket collection. Reserved seats go on sale on 25 November at 09:00 Singapore time.",
    },
    {
      day: "Saturday 26",
      time: "09:10",
      name: "Bus up, Nagano East Exit stop 23",
      map: "Nagano Station East Exit",
      note: "Can't be reserved — be in the queue by 08:40. Get off at Prince Hotel West, 10:42, the stop after Ichinose Diamond.",
    },
    {
      day: "Thursday 31",
      time: "11:52",
      name: "Bus down, from Prince Hotel West",
      note: "Stay on to the last stop, Nagano Station, 13:39.",
    },
    {
      day: "Thursday 31",
      time: "14:26",
      name: "Hakutaka 564, Nagano to Tokyo",
      note: "Arrives Tokyo 15:52 — stay on past Ueno. Reserved seats go on sale on 1 December at 09:00 Singapore time.",
    },
  ],

  days: [
    /* ── FRIDAY — ARRIVAL ───────────────────────────────────── */
    {
      dow: "Friday",
      date: "25",
      month: "Dec",
      area: "Haneda to Nagano",
      aside: "The last bus up the mountain leaves Nagano at 17:05, before we could reach it — so tonight is a Nagano hotel.",
      meals: [
        {
          slot: "Arrive",
          time: "15:35",
          name: "SQ632 lands at Haneda",
          map: "Haneda Airport Terminal 3",
          dish: "Terminal 3",
          status: "travel",
          notes: [
            "Simulated from SQ632's recent arrival times: out of arrivals by 16:11 typically, 16:41 at the 90th percentile.",
            "Filling in Visit Japan Web before flying gets you through immigration noticeably faster.",
          ],
        },
        {
          slot: "Then",
          name: "Tokyo Monorail, then JR to Tokyo Station",
          map: "Tokyo Station",
          dish: "Monorail to Hamamatsucho about 15 min, then JR about 5 min",
          status: "travel",
          notes: [
            "No ticket counter: the shinkansen tickets are e-tickets on our Suicas. Head straight for the Tokyo Monorail gates in the T3 arrival lobby (2nd floor). At Hamamatsucho, change to the JR Yamanote or Keihin-Tohoku line for Tokyo. Keikyu to Shinagawa, then JR, works just as well.",
            "Pay the Monorail and JR with Suica, about ¥700 each. Top each Suica up to ¥5,000 before landing — that covers this and tomorrow's ¥3,000 bus.",
            "With no counter stop, roughly: at Tokyo Station by about 16:41 typically, 17:11 at the 90th percentile.",
            "Follow the Shinkansen signs to platforms 20–23. At the shinkansen transfer gate, each of us taps our own phone; the gate prints a small slip with the car and seat. Keep it.",
            "On the train, check the clock. If we'll reach Tokyo Station by about 17:05, change to Kagayaki 513 (17:24 → 18:47) on the phone if seats remain. If we won't make Tokyo Station by about 18:05, change to a later reserved train — Asama 625 (18:40) or Hakutaka 575 (19:04) — before 18:20.",
            "Not worth switching to: Hakutaka 573 (18:04, gets in only 4 minutes sooner) or Asama 623 (17:40 → 19:24, 20 minutes sooner).",
            "Pick up an ekiben (station bento) for dinner on the train.",
          ],
        },
        {
          slot: "Shinkansen",
          time: "18:24",
          name: "Kagayaki 515, Tokyo to Nagano",
          jp: "かがやき515号",
          dish: "Arrives Nagano 19:44",
          status: "tobook",
          notes: [
            "Two reserved seats, D and E, as Shinkansen e-tickets — enter both Suica numbers when booking. On sale on 25 November at 09:00 Singapore time; about ¥8,450 each, paid in full by card when booking. Sold out? Book Hakutaka 573 (18:04 → 19:40), then Asama 625 (18:40 → 20:24).",
            "Be on the platform by 18:14. Your simulation put us there by 17:04 typically and 17:38 at the 90th percentile including the ticket counter, about a 98% chance; without the counter it's roughly 13–17 minutes earlier still.",
            "Changes are made on the phone, on JR-EAST Train Reservation, free, up to 4 minutes before departure. The Suica link carries over to the new train.",
            "At Nagano, take the East Exit (東口). Hotel Courtland is right opposite.",
          ],
          fallback: {
            label: "If we miss the 515",
            text:
              "No change needed: the ticket still works tonight in the unreserved cars of Asama 625 (18:40 → 20:24, cars 1–6), " +
              "Hakutaka 575 (19:04 → 20:40, cars 1–5), Asama 627 (19:32 → 21:11, cars 1–7), Hakutaka 577 (20:12 → 21:47, cars 1–5), " +
              "Asama 629 (20:36 → 22:16, cars 1–6) or Asama 631 (21:28 → 23:11, cars 1–6). Follow the 自由席 signs on the platform. " +
              "Not Kagayaki 517 (20:00) or 519 (21:04) — every seat is reserved.",
          },
        },
        {
          slot: "Night",
          name: "Hotel Courtland",
          map: "Hotel Courtland Nagano",
          jp: "ホテルコートランド",
          dish: "Superior Double, king bed, 21 m²",
          status: "booked",
          where: "Kurita 2142, Nagano — East Exit side",
          walk: "A minute from the East Exit, right opposite the station",
          notes: [
            "One night, 25 December. Free cancellation until 16 December.",
            "Check-in from 15:00, so arriving around 20:50 is fine. Check-out by 11:00.",
            "The hotel serves a buffet breakfast if we want one before the 08:40 bus queue.",
          ],
        },
      ],
    },

    /* ── SATURDAY — UP THE MOUNTAIN ─────────────────────────── */
    {
      dow: "Saturday",
      date: "26",
      month: "Dec",
      area: "Up the mountain",
      meals: [
        {
          slot: "Queue",
          time: "By 08:40",
          name: "Nagano Station East Exit, bus stop 23",
          map: "Nagano Station East Exit",
          status: "walkin",
          notes: [
            "A couple of minutes' walk from Hotel Courtland, which is right opposite the East Exit.",
            "The bus is first come, first served — no seat reservations. It's a Saturday at the start of Japan's year-end holidays, so this departure is the one most likely to fill.",
            "Queues here are orderly, not a scrum. If a bus fills before our turn, we wait for the next one.",
          ],
        },
        {
          slot: "Bus",
          time: "09:10",
          name: "Nagaden express bus to Shiga Kogen",
          jp: "長電バス 志賀高原線",
          dish: "1 hour 32 minutes to Prince Hotel West, ¥3,000 each",
          status: "travel",
          notes: [
            "Get off at Prince Hotel West (プリンスホテル西館), due 10:42. It's the stop outside the West building.",
            "On the way up: Sun Valley 10:22, Maruike, Yamanoeki and Hasuike about 10:28, Takamagahara 10:38, Ichinose Village 10:40, Ichinose Diamond 10:41 — then us. Once Ichinose comes up, get ready: West is a minute or two later.",
            "If it goes by, get off at the next stop, Prince Hotel South (10:44), and ring the front desk on 0269-34-3111. Don't ride on to Okushiga.",
            "The driver loads suitcases into the hold. Tell him as he does: \"Purinsu Hoteru, Nishi-kan\" (Prince Hotel, West building), so he knows to open it there.",
            "Pay ¥3,000 each as we get off, by Suica, a tapped credit card or PayPay. Each Suica needs at least ¥3,000 on it — top up the night before, since top-ups don't work between midnight and 5am Japan time.",
            "Suica short? Tap a contactless credit card instead (Visa, Mastercard, JCB, Amex). It's a Saturday, so the bus takes no cash on board.",
            "On the bus's display, our stop may show as 焼額山入口プリンスホテル西館前.",
            "The last stretch is a winding mountain road — sit near the front if either of us gets carsick.",
            "From this season the bus no longer stops at the Snow Monkey Park.",
          ],
          fallback: {
            label: "If the 09:10 is full",
            text:
              "Later buses that reach the Prince: 10:30 (about 12:15), 11:15 (about 12:50), 13:20 (about 14:55), " +
              "14:30 (about 16:15) and 17:05 (about 18:40, the last). The 08:15 Saturday bus and the 13:10 stop short at Yamanoeki.",
          },
        },
        {
          slot: "Then",
          time: "10:42",
          name: "Drop the bags, pick up the gear, ride",
          status: "ride",
          notes: [
            "Check-in is from 15:00. Leave the bags at the West building's front desk and get on the snow.",
            "Ask the front desk to confirm our building — and, while there, exactly where the West bus stop is for 31 December.",
            "Boards and boots are booked at the rental shop in the West building lobby — see below.",
            "While at the front desk, ask them to book Izakaya YAKEBI for 30 December, 18:30, for two — it only takes phone bookings.",
          ],
          why: "Half a day on the snow before we've even checked in.",
        },
        {
          slot: "Gear",
          name: "Board + boots rental",
          map: "Shiga Kogen Prince Hotel",
          status: "booked",
          where: "Shiga Kogen Prince West building rental shop (lobby), 08:00–17:00",
          tel: "0269-34-3111",
          notes: [
            "Booked for 26–30 December: two standard board-and-boots sets.",
            "Show the rental confirmation email at the counter, or give the booker's name.",
            "Ask for two helmets as well — they aren't part of the booking. Don't ride without one.",
            "Pay at the counter: ¥6,500 (S$53) per set per day, with 10% off for hotel guests — about ¥5,850 (S$48).",
            "Ask for the 10% hotel-guest discount when paying — say we're staying at the Prince. Don't assume it's applied automatically.",
            "Bring both passports — ID is required. Bring our own gloves, goggles and hats.",
            "Changes at the counter only. To cancel, email yoyaku-shigakogen@xraeb.co.jp or call 0269-34-3111 (08:00–17:00 Japan time) — a no-show without notice may be charged.",
          ],
        },
        {
          slot: "Dinner",
          time: "18:30",
          name: "Izakaya Time",
          jp: "たいむ 志賀高原店",
          map: "Izakaya Time Ichinose Shiga Kogen",
          dish: "Japanese izakaya — tempura, sashimi, hot pot, chirashi bowls, local sake",
          status: "tbc",
          where: "Hotel Dairoku 1F, Ichinose, 7149 Hirao, Yamanouchi",
          walk: "About 6–8 minutes from the West building",
          tel: "0269-34-3955",
          notes: [
            "Request sent by Instagram message (@timeshiga) on 27 October — awaiting a reply.",
            "Google 4.0★ (65 reviews), joint highest-rated izakaya in Ichinose. Some reviews mention small portions.",
            "About ¥5,000–8,000 (S$41–65) each, plus a reported ¥800 (S$7) seat charge each.",
            "Open 17:00–23:00, last order 22:00. Renovated in 2025, all table seating, English QR-code ordering.",
          ],
        },
      ],
    },

    /* ── SUNDAY — RIDING ────────────────────────────────────── */
    {
      dow: "Sunday",
      date: "27",
      month: "Dec",
      area: "A full day on the snow",
      meals: [
        {
          slot: "All day",
          name: "Shiga Kogen, straight from the door",
          map: "Yakebitaiyama Ski Area",
          jp: "志賀高原 焼額山",
          status: "ride",
          notes: [
            "All three Prince buildings are ski-in, ski-out on Yakebitaiyama.",
            "Shiga Kogen links around 19 ski areas — four days won't run out of terrain.",
          ],
        },
        {
          slot: "Dinner",
          time: "18:30",
          name: "Niku Izakaya Merge",
          jp: "肉IZAKAYA マージ",
          map: "肉IZAKAYAマージ 志賀高原",
          dish: "Meat izakaya — black wagyu, horse sashimi, pork katsu, wagyu stew, smoked oysters",
          status: "tbc",
          where: "Diamond Shiga 1F, Ichinose, 7149-16 Hirao, Yamanouchi",
          walk: "About 7–8 minutes from the West building",
          tel: "090-9502-2929",
          notes: [
            "Request sent by Instagram message (@niku_merge) on 27 October — awaiting a reply.",
            "Google 4.0★ (54 reviews). About ¥5,000–8,000 (S$41–65) each.",
            "Some dishes sell out. The entrance is a little hidden — look for the \"Gastro Pub\" sign.",
          ],
        },
      ],
    },

    /* ── MONDAY — RIDING ────────────────────────────────────── */
    {
      dow: "Monday",
      date: "28",
      month: "Dec",
      area: "A full day on the snow",
      meals: [
        {
          slot: "All day",
          name: "Shiga Kogen, straight from the door",
          map: "Yakebitaiyama Ski Area",
          status: "ride",
        },
        {
          slot: "Dinner",
          time: "18:30",
          name: "Yakiniku Otenma",
          jp: "和牛一頭買い 焼肉おてんま",
          map: "Yakiniku Otenma Hotel Japan Shiga",
          dish: "Shinshu wagyu yakiniku (whole-cow buying, smokeless grills), and shabu-shabu",
          status: "tbc",
          where: "Hotel Japan Shiga, Ichinose, 7149 Hirao, Yamanouchi",
          walk: "About 12–15 minutes from the West building",
          tel: "0269-34-2801",
          notes: [
            "Request sent by email to Hotel Japan Shiga on 27 October, together with 29 December — awaiting a reply.",
            "Google 3.8★ (57 reviews). Reviewers call it pricey: about ¥8,000–12,000 (S$65–98) each.",
            "Dinner 17:30–21:00, last order 20:00. Winter only, with irregular closures.",
            "Walk-ins can wait up to an hour at peak, so the booking matters.",
          ],
        },
      ],
    },

    /* ── TUESDAY — RIDING ───────────────────────────────────── */
    {
      dow: "Tuesday",
      date: "29",
      month: "Dec",
      area: "A full day on the snow",
      meals: [
        {
          slot: "All day",
          name: "Shiga Kogen, straight from the door",
          map: "Yakebitaiyama Ski Area",
          status: "ride",
        },
        {
          slot: "Dinner",
          time: "18:30",
          name: "Daruma Shokudo",
          jp: "だるま食堂",
          map: "だるま食堂 ホテルジャパン志賀",
          dish: "Hot pot — Shinshu apple-fed beef or local pork sukiyaki and shabu-shabu, wagyu hitsumabushi; burgers too",
          status: "tbc",
          where: "Hotel Japan Shiga, Ichinose, 7149 Hirao, Yamanouchi — same building as Otenma",
          walk: "About 12–15 minutes from the West building",
          tel: "0269-34-2801",
          notes: [
            "Request sent in the same email to Hotel Japan Shiga on 27 October — awaiting a reply. Second number: 080-6930-5479.",
            "Google 4.2★, from only 9 reviews. About ¥4,000–6,000 (S$33–49) each.",
            "Dinner 17:30–21:00, last order 20:00, with irregular closures.",
          ],
        },
      ],
    },

    /* ── WEDNESDAY — RIDING ─────────────────────────────────── */
    {
      dow: "Wednesday",
      date: "30",
      month: "Dec",
      area: "Last full day on the snow",
      meals: [
        {
          slot: "All day",
          name: "Shiga Kogen, straight from the door",
          map: "Yakebitaiyama Ski Area",
          status: "ride",
        },
        {
          slot: "Dinner",
          time: "18:30",
          name: "Izakaya YAKEBI",
          jp: "居酒屋YAKEBI",
          map: "居酒屋YAKEBI 志賀高原",
          dish: "Izakaya — Tateshina beef sukiyaki, seafood from Itoigawa, local sake; meat-free options",
          status: "tobook",
          where: "Prince Hotel, 2nd Gondola station 1F (South building side), Yakebitaiyama",
          walk: "About 10 minutes from the West building, or the free hotel shuttle",
          tel: "0269-34-3111",
          notes: [
            "Not booked yet — phone bookings only. Ask the Prince front desk to book it when we arrive on 26 December (the number is the Prince's main line).",
            "Google 3.8★ (79 reviews). From ¥4,000 (S$33) each; about ¥5,000–7,000 (S$41–57) with drinks. A free welcome sake is reported.",
            "Dinner 17:00–21:00, last order 20:30. This season's dates aren't published yet; last season dinner started on 13 December.",
          ],
        },
      ],
    },

    /* ── THURSDAY — DOWN THE MOUNTAIN ───────────────────────── */
    {
      dow: "Thursday",
      date: "31",
      month: "Dec",
      area: "Down the mountain, into Tokyo",
      aside: "No riding today — breakfast, a late-morning check-out, then the first bus and train after that.",
      meals: [
        {
          slot: "Bus",
          time: "11:52",
          name: "Bus down, from Prince Hotel West",
          jp: "長電バス",
          dish: "1 hour 47 minutes to Nagano Station, due 13:39",
          status: "travel",
          notes: [
            "Board at the Prince Hotel West stop, outside the West building. Be there by about 11:40 — check-out mornings at a hotel this size bunch up.",
            "It starts at Okushiga at 11:40 and calls at Prince Hotel East (11:50) and South (11:51) before us, so there should still be seats.",
            "Stay on to the last stop, Nagano Station (長野駅). On the way: Ichinose 11:55–11:57, Takamagahara 11:59, Yamanoeki and Hasuike 12:20, Sun Valley 12:22, then the long run down.",
            "Pay ¥3,000 each as we get off, by Suica or a tapped credit card. Top each Suica up to ¥4,000 the night before: the bus plus the JR hop to Shinagawa.",
          ],
          fallback: {
            label: "Earlier or later",
            text:
              "Packed and out by 09:40? The 09:52 bus reaches Nagano at 11:45 for Hakutaka 560, 12:26 → Tokyo about 13:52. " +
              "If the day slips: 14:07 (Nagano 15:54), 14:57 (16:44), 16:12 (17:59), 17:32 (19:19, the last). " +
              "Times are from the West stop.",
          },
        },
        {
          slot: "Shinkansen",
          time: "14:26",
          name: "Hakutaka 564, Nagano to Tokyo",
          jp: "はくたか564号",
          dish: "Arrives Tokyo 15:52",
          status: "tobook",
          notes: [
            "Two reserved seats, D and E, as Shinkansen e-tickets on our Suicas — just tap through the gate at Nagano. On sale on 1 December at 09:00 Singapore time; about ¥8,850 each (31 December is year-end peak, ¥400 over the usual fare), paid by card when booking. Sold out? Book Asama 620 (14:29 → 16:12).",
            "Check the ticket says Tokyo (東京), not Ueno (上野).",
            "Changes are made on the phone, on JR-EAST Train Reservation, up to 4 minutes before departure.",
            "47 minutes after the bus is due — slack enough if the mountain road is slow.",
            "Stay on past Ueno to Tokyo, the last stop — the change for Shinagawa is there.",
          ],
          fallback: {
            label: "If the bus runs late, or we miss it",
            text:
              "Bus late: no change needed — ride the unreserved cars of Asama 620 (14:29 → 16:12, cars 1–5; it starts at Nagano, so it boards empty), " +
              "Hakutaka 566 (15:22 → 16:52, cars 1–3) or Asama 622 (15:25 → 17:12, cars 1–5). " +
              "Missed the 11:52 bus: take the 14:07 (Nagano about 15:54), then the unreserved cars of Hakutaka 568 (16:20 → 17:52, cars 1–3) " +
              "or Asama 626 (16:25 → 18:12, cars 1–5). Skip Kagayaki 532 (13:58) and 534 (14:58): seasonal extras not confirmed for the 31st. " +
              "Asama 644 (15:03) isn't in the winter timetable either.",
          },
        },
        {
          slot: "Then",
          time: "About 16:00",
          name: "Tokyo Station to Shinagawa, then up to the hotel",
          map: "Shinagawa Station Takanawa Exit",
          dish: "JR, about 10 minutes, then the hotel shuttle",
          status: "travel",
          notes: [
            "Follow the signs from the shinkansen platforms to the JR Yamanote or Keihin-Tohoku line, bound for Shinagawa. It's a change inside the gates.",
            "The e-ticket covers the shinkansen only; Suica pays the JR ride to Shinagawa, about ¥200.",
            "At Shinagawa, leave by the Takanawa exit (高輪口) and turn left. The free shuttle to the hotel leaves from in front of Wing Takanawa EAST, about every 20 minutes, and takes about 5 minutes.",
            "No shuttle? Walk 10–13 minutes, or take a taxi from the rank outside the exit. At the hotel by about 16:30.",
          ],
        },
        {
          slot: "Night",
          name: "Tokyo Marriott Hotel",
          map: "Tokyo Marriott Hotel Shinagawa",
          jp: "東京マリオットホテル",
          dish: "Deluxe King, low floor — about 38 m²",
          status: "booked",
          where: "4-7-36 Kitashinagawa, Shinagawa-ku — in Gotenyama Garden",
          walk: "10–13 minutes from Shinagawa Station's Takanawa exit, or 5 minutes on the free shuttle",
          tel: "03-5488-3911",
          notes: [
            "Two nights, 31 December and 1 January. Free cancellation until 23:59 Tokyo time on 28 December.",
            "Check-in from 15:00, check-out by 12:00. Booked direct, so the Platinum benefits apply.",
            "Platinum: the Executive Lounge for both of us, with breakfast, and drinks and food in the evening. Take points as the welcome gift, since breakfast already comes with the lounge.",
            "Ask at check-in for 4pm late check-out on 2 January, and for the lounge hours over New Year.",
          ],
        },
        {
          slot: "Evening",
          name: "New Year's Eve at Sensō-ji",
          map: "Senso-ji",
          jp: "浅草寺",
          status: "free",
          notes: [
            "Crowds build towards midnight for the first temple visit of the year.",
            "From Shinagawa, take a Keikyu train bound for Asakusa, Oshiage, Aoto or Narita Airport. It runs straight through onto the Toei Asakusa line to Asakusa, about 25 minutes with no change.",
            "Late trains for New Year's Eve are announced in December, so check before heading out. The shuttle won't be running after midnight. Walk up from Shinagawa or take a taxi.",
            "The hotel lounge's evening spread is a good start to the night.",
          ],
        },
      ],
    },

    /* ── FRIDAY — NEW YEAR'S DAY ────────────────────────────── */
    {
      dow: "Friday",
      date: "1",
      month: "Jan",
      area: "Tokyo, a free day",
      meals: [
        {
          slot: "All day",
          name: "Nothing planned",
          status: "free",
          notes: [
            "Plenty of shops and restaurants close on New Year's Day, so check before setting out.",
            "The hotel's Executive Lounge does breakfast, and drinks and food in the evening — a fallback if dinner plans fall through.",
          ],
          why: "A whole spare day between the mountains and the flight — the reason for coming down on the 31st.",
        },
      ],
    },

    /* ── SATURDAY — FLYING HOME ─────────────────────────────── */
    {
      dow: "Saturday",
      date: "2",
      month: "Jan",
      area: "Flying home",
      meals: [
        {
          slot: "Check out",
          time: "By 12:00",
          name: "Check out of the Tokyo Marriott",
          status: "free",
          notes: [
            "As Platinum we can ask for 4pm. Even if not, the front desk keeps the bags for the rest of the day.",
            "The rest of the day is free.",
          ],
        },
        {
          slot: "Then",
          time: "Leave by 19:15",
          name: "Shuttle to Shinagawa, then Keikyu to Haneda",
          map: "Haneda Airport Terminal 3",
          dish: "About 15 minutes to Shinagawa, then about 15 minutes on the train",
          status: "travel",
          notes: [
            "With the bags, take the hotel shuttle or a taxi down to Shinagawa rather than walking.",
            "At Shinagawa, take a Keikyu train bound for Haneda Airport. The Airport Limited Express is the quickest.",
            "Terminal 3 has its own station; don't get off at Terminal 1·2.",
            "That puts us at the terminal around 19:50, about three hours before the flight.",
          ],
        },
        {
          slot: "Fly",
          time: "22:55",
          name: "SQ635 to Singapore",
          dish: "Lands 05:20 on Sunday 3 January",
          status: "travel",
        },
      ],
    },
  ],

  // Cards after the days, for anything not yet settled.
  // Set to null to hide the section entirely.
  floatingTitle: "Still to pin down",
  floating: [
    {
      name: "The Prince's West building — most likely, not confirmed",
      status: "tbc",
      notes: [
        "The South building only opens 4–18 December this season, so it's East or West.",
        "The booking is a 19 m² Standard Twin. That matches the West building's Twin D (19.2 m²); East's twins are 29 m².",
        "The hotel hasn't confirmed, and its booking email bounces. Confirm at the front desk on 26 December.",
        "If it turns out to be East: get off at Prince Hotel East, 10:46, going up, and board there at 11:50 coming down.",
      ],
    },
    {
      name: "Dinner backups",
      status: "tbc",
      notes: [
        "Requests for 26–29 December went out on 27 October. If any restaurant hasn't replied by about 3 November, phone it, or swap that night to the Hotel Ichinose buffet or a second visit to YAKEBI or Izakaya Time.",
        "Hotel Ichinose, Restaurant Victoria buffet — Japanese, Western and Chinese, with steak and tempura stations. ¥3,800 (S$31) each. Hotel rated Google 4.2★ (219 reviews). Non-guests must book ahead: 0269-34-2802 (08:00–20:00). About 12–15 minutes' walk.",
        "Prince West buffet (Restaurant Westside), in our building — ¥6,500 (S$53) each. The zero-effort fallback, though it can be noisy.",
        "Prince ramen corner, next to the West building — about ¥1,200 (S$10). A quick casual meal.",
      ],
    },
  ],

  refs: [
    {
      title: "Booking checklist",
      intro: "Shinkansen seats go on sale at 10:00 Japan time — 09:00 in Singapore — one month before travel.",
      rows: [
        { label: "Hotel by Nagano Station, 25 December — Hotel Courtland", value: "Booked" },
        { label: "Tokyo hotel, 31 December and 1 January — Tokyo Marriott", value: "Booked" },
        { label: "Rental boards and boots — Prince West building rental shop, 26–30 December", value: "Done" },
        { label: "Check the 2026–27 bus details; book both legs if it now takes bookings", value: "20 Nov" },
        { label: "JR-EAST Train Reservation account", value: "Done" },
        { label: "Shinkansen to Nagano — Kagayaki 515, 25 December, seats D+E, e-tickets with both Suica numbers", value: "25 Nov, 09:00" },
        { label: "Shinkansen to Tokyo — Hakutaka 564, 31 December, seats D+E, e-tickets with both Suica numbers", value: "1 Dec, 09:00" },
        { label: "Last day to change the Prince booking free", value: "8 Dec" },
        { label: "Last day to cancel Hotel Courtland free", value: "16 Dec" },
        { label: "Suica in Apple Wallet, both phones, Suica numbers noted", value: "Done" },
        { label: "Visit Japan Web", value: "20 Dec" },
        { label: "Ask the Tokyo Marriott: shuttle and lounge hours over New Year, 4pm check-out", value: "20 Dec" },
        { label: "Last day to cancel the Tokyo Marriott free", value: "28 Dec" },
      ],
    },
    {
      title: "What each leg costs, and how to pay",
      intro:
        "Per person. Each of us pays from our own Suica or card. Suica can't be topped up between midnight and 5am Japan time, " +
        "and needs data or Wi-Fi — so top up the night before. The Nagaden bus also takes a tapped credit card, so a low Suica won't strand us there.",
      rows: [
        { label: "Before landing, 25 Dec — top each Suica up to", value: "¥5,000" },
        { label: "Haneda to Tokyo Station — Monorail, then JR (Suica)", value: "About ¥700" },
        { label: "Kagayaki 515, 25 Dec — reserved, paid by card when booking", value: "About ¥8,450" },
        { label: "Bus up, 26 Dec — Suica, tapped card or PayPay; no cash", value: "¥3,000" },
        { label: "Night of 30 Dec — top each Suica up to", value: "¥4,000" },
        { label: "Bus down, 31 Dec — Suica or tapped card", value: "¥3,000" },
        { label: "Hakutaka 564, 31 Dec — reserved, year-end peak, paid by card when booking", value: "About ¥8,850" },
        { label: "Tokyo Station to Shinagawa — JR (Suica)", value: "About ¥200" },
        { label: "Shinagawa to Asakusa and back, New Year's Eve (Suica)", value: "About ¥900" },
        { label: "Shinagawa to Haneda Terminal 3, 2 Jan — Keikyu (Suica)", value: "About ¥350" },
        { label: "Shinkansen changed on the day — on the phone, free before departure", value: "No cost" },
      ],
    },
  ],

  phones: [
    { name: "Shiga Kogen Prince Hotel", tel: "0269-34-3111" },
    { name: "Shiga Kogen Tourism Association (buses)", tel: "0269-34-2404" },
    { name: "Tokyo Marriott Hotel", tel: "03-5488-3911" },
  ],

  footnotes: [
    "Each direction is its own shinkansen ticket. Year-end seats go fast, so book the minute they open.",
    "Shinkansen e-tickets, linked to each of our Suicas and paid in full by card when booking. Changes are free on JR-EAST Train Reservation up to 4 minutes before departure. Cancelling is free until 21:00 Japan time the day before, then ¥320 each.",
    "Miss a reserved train and the ticket still works the same day in the unreserved cars of any later Hakutaka or Asama — usually cars 1–4 on Hakutaka and 1–5 on Asama, though it varies by train, so follow the 自由席 signs. Not on Kagayaki, which has no unreserved cars. A reserved ticket can't be used on an earlier train without changing it first.",
    "Kagayaki is the fastest service, but every seat is reserved and it runs less often. Hakutaka and Asama stop more and have unreserved cars. On this route all three cost the same: about ¥8,450 for a reserved seat, ¥400 more in the New Year peak, and ¥7,920 unreserved (fares since JR East's March 2026 increase).",
    "The Nagaden bus can't be reserved and takes no cash on board at weekends and on holidays. The 2026–27 timetable is due in November — recheck these times then.",
    "No car. The road up is a single-lane mountain road that ices over, the pass beyond Shiga Kogen is shut all winter, and there's no petrol station up there.",
    "Train times checked on JR-EAST Train Reservation for the same weekdays in November. JR adds year-end extra trains closer to the date, so recheck when booking.",
  ],
};
