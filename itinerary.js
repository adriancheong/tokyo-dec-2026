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
    },
    {
      when: "26 Dec",
      nights: "5 nights",
      name: "Shiga Kogen Prince Hotel",
      map: "Shiga Kogen Prince Hotel",
      where: "Ski-in, ski-out. Which building is still to be confirmed",
      tel: "0269-34-3111",
    },
    {
      when: "31 Dec",
      nights: "2 nights",
      name: "Tokyo Marriott Hotel",
      map: "Tokyo Marriott Hotel Shinagawa",
      where: "Shinagawa, free shuttle from the Takanawa exit",
      tel: "03-5488-3911",
    },
  ],

  // The timed connections, surfaced at the top of the page.
  lockedTitle: "The four connections",
  locked: [
    {
      day: "Friday 25",
      time: "19:04",
      name: "Hakutaka 575, Tokyo to Nagano",
      note: "Arrives 20:40. Reserved seats go on sale on 25 November at 09:00 Singapore time.",
    },
    {
      day: "Saturday 26",
      time: "09:10",
      name: "Bus up, Nagano East Exit stop 23",
      map: "Nagano Station East Exit",
      note: "Can't be reserved — be in the queue by 08:40. Reaches the Prince at about 10:45.",
    },
    {
      day: "Thursday 31",
      time: "11:50",
      name: "Bus down from the Prince",
      note: "East building 11:50, South 11:51, West 11:52. Reaches Nagano Station at 13:39.",
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
            "Allow about an hour for immigration, bags and customs. Aim to be out by about 16:45.",
            "Filling in Visit Japan Web before flying gets you through immigration noticeably faster.",
          ],
        },
        {
          slot: "Then",
          name: "Haneda to Tokyo Station",
          map: "Tokyo Station",
          dish: "30–40 minutes, about ¥510 each",
          status: "travel",
          notes: [
            "Keikyu line to Shinagawa, then JR Yamanote or Keihin-Tohoku to Tokyo. The Tokyo Monorail to Hamamatsucho, then JR, works just as well.",
            "The Hokuriku Shinkansen starts at Tokyo Station, not Shinagawa.",
            "Collect both shinkansen tickets — tonight's and the one for 31 December — at a ticket machine, with the QR code from the booking email.",
            "Pick up an ekiben (station bento) for dinner on the train.",
          ],
        },
        {
          slot: "Shinkansen",
          time: "19:04",
          name: "Hakutaka 575, Tokyo to Nagano",
          jp: "はくたか575号",
          dish: "Arrives Nagano 20:40",
          status: "tobook",
          notes: [
            "Two reserved seats, on sale on 25 November at 09:00 Singapore time.",
            "It leaves three and a half hours after we land, so an hour's flight delay costs nothing.",
            "Out of the airport early? Switch at a Tokyo Station ticket machine to Kagayaki 515, 18:24 → 19:44, if seats remain. The first change is free.",
          ],
          fallback: {
            label: "If the flight is late, or 575 sells out",
            text:
              "In order: Asama 627, 19:32 → 21:11. Kagayaki 517, 20:00 → 21:19. Asama 633, 22:08 → 23:50, " +
              "the last train of the night. Change at a ticket machine before 19:04. Missed it altogether? " +
              "The ticket still works today in the unreserved cars of any later Hakutaka or Asama.",
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
          dish: "About an hour and a half, ¥3,000 each",
          status: "travel",
          notes: [
            "Stops at Prince Hotel West at 10:42, South at 10:44, East at 10:46. Get off at our building.",
            "The driver loads suitcases into the hold. Tell him our building in Japanese: プリンスホテル西館 (West), 南館 (South) or 東館 (East).",
            "Pay as we get off, by card, Suica or PayPay. At weekends and on holidays it takes no cash on board.",
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
          time: "About 10:45",
          name: "Drop the bags, pick up the gear, ride",
          status: "ride",
          notes: [
            "Check-in is from 15:00. Leave the bags at the front desk and get on the snow.",
            "Rental boards and boots reserved ahead for peak week — ask the Prince what it offers.",
          ],
          why: "Half a day on the snow before we've even checked in.",
        },
      ],
    },

    /* ── SUNDAY TO WEDNESDAY — RIDING ───────────────────────── */
    {
      dow: "Sunday",
      date: "27–30",
      month: "Dec",
      heading: "Sunday 27 to Wednesday 30 December",
      area: "Four full days on the snow",
      meals: [
        {
          slot: "Every day",
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
          slot: "Evenings",
          name: "Ichinose village",
          map: "Ichinose Shiga Kogen",
          jp: "一の瀬",
          status: "free",
          notes: [
            "Most of the resort's restaurants and bars are here.",
            "About ten minutes' walk from the West building. From the South or East, take the hotel shuttle.",
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
          time: "11:50",
          name: "Bus down from the Prince",
          jp: "長電バス",
          dish: "Reaches Nagano Station at 13:39",
          status: "travel",
          notes: [
            "East building 11:50, South 11:51, West 11:52. Be at our stop by about 11:35 — check-out mornings at a hotel this size bunch up.",
            "It starts a few stops up at Okushiga, so there should be seats when it reaches the Prince.",
            "Pay by card or Suica as we get off.",
          ],
          fallback: {
            label: "Earlier or later",
            text:
              "Packed and out by 09:35? The 09:50 bus reaches Nagano at 11:45 for Hakutaka 560, 12:26 → Tokyo about 13:52. " +
              "If the day slips: 14:05 (Nagano 15:54), 14:55 (16:44), 16:10 (17:59), 17:30 (19:19, the last). " +
              "Times are from the East building; South is a minute later, West two.",
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
            "Two reserved seats, on sale on 1 December at 09:00 Singapore time. Check the ticket says Tokyo (東京), not Ueno (上野).",
            "47 minutes after the bus is due — slack enough if the mountain road is slow.",
            "Stay on past Ueno to Tokyo, the last stop — the change for Shinagawa is there.",
          ],
          fallback: {
            label: "If 564 sells out, or the bus runs late",
            text:
              "In order: Asama 620, 14:29 → Tokyo 16:12 — it starts at Nagano, so it boards empty. " +
              "Asama 622, 15:25 → Tokyo 17:12. Kagayaki 510, 17:05 → Tokyo 18:28. " +
              "Skip Kagayaki 532 (13:58) and 534 (14:58): both are seasonal extras not yet confirmed for the 31st. " +
              "Missed the booked train? Take the unreserved cars of the next Asama.",
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
            "If the shinkansen ticket's destination reads 東京都区内 (Tokyo ward area), the ride to Shinagawa is already paid for. If not, tap Suica.",
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
      name: "Which building at the Prince",
      status: "tbc",
      notes: [
        "The booking says Standard Twin, 19 m², without naming a building. That size matches the West building's twins, so West is likely.",
        "Waiting on the hotel to confirm which building, and where to check in.",
        "It decides the bus stop — West 10:42 going up and 11:52 coming down; South 10:44 and 11:51; East 10:46 and 11:50.",
        "West is about ten minutes' walk from Ichinose village. East sits at the gondola, about thirty minutes' walk from the village.",
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
        { label: "Rental boards and boots", value: "By 17 Oct" },
        { label: "Check the 2026–27 bus details; book both legs if it now takes bookings", value: "20 Nov" },
        { label: "JR-EAST Train Reservation account, card saved", value: "24 Nov" },
        { label: "Shinkansen to Nagano — Hakutaka 575, 25 December", value: "25 Nov, 09:00" },
        { label: "Shinkansen to Tokyo — Hakutaka 564, 31 December", value: "1 Dec, 09:00" },
        { label: "Last day to change the Prince booking free", value: "8 Dec" },
        { label: "Last day to cancel Hotel Courtland free", value: "16 Dec" },
        { label: "Visit Japan Web, and Suica on the phone", value: "20 Dec" },
        { label: "Ask the Tokyo Marriott: shuttle and lounge hours over New Year, 4pm check-out", value: "20 Dec" },
        { label: "Collect both shinkansen tickets at Tokyo Station", value: "25 Dec" },
        { label: "Last day to cancel the Tokyo Marriott free", value: "28 Dec" },
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
    "A reserved ticket is tied to one train. Change it at a ticket machine before that train leaves — the first change is free. Miss it, and it still works the same day in the unreserved cars of a later Hakutaka or Asama.",
    "Kagayaki is the fastest service, but every seat is reserved and it runs less often. Hakutaka and Asama stop more and have unreserved cars. On this route all three cost the same, about ¥8,340 for a reserved seat.",
    "The Nagaden bus can't be reserved and takes no cash on board at weekends and on holidays. The 2026–27 timetable is due in November — recheck these times then.",
    "No car. The road up is a single-lane mountain road that ices over, the pass beyond Shiga Kogen is shut all winter, and there's no petrol station up there.",
    "JR adds year-end extra trains closer to the date, so recheck train times when booking.",
  ],
};
