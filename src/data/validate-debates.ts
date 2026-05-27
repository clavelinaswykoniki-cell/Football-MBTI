import { fixedMatchupDebates } from "./matchup-debates";

const matchups = [
  "pele-vs-maradona",
  "zidane-vs-r9",
  "ronaldinho-vs-kaka",
  "neymar-vs-mbappe",
  "beckham-vs-figo",
  "henry-vs-ibra",
  "haaland-vs-mbappe",
];

const forbiddenPhrases = [
  { phrase: "大罗夺得欧冠", error: "R9 has 0 Champions League titles." },
  { phrase: "大罗拿过欧冠", error: "R9 has 0 Champions League titles." },
  { phrase: "大罗的欧冠冠军", error: "R9 has 0 Champions League titles." },
  { phrase: "小罗伯纳乌帽子戏法", error: "Ronaldinho scored 2 goals, not a hat trick in 2005 Bernabeu." },
  { phrase: "小罗在伯纳乌帽子戏法", error: "Ronaldinho scored 2 goals, not a hat trick in 2005 Bernabeu." },
  { phrase: "卡卡2002世界杯主力", error: "Kaka was not a 2002 World Cup starter." },
  { phrase: "卡卡2002年世界杯主力", error: "Kaka was not a 2002 World Cup starter." },
  { phrase: "出场5次", error: "Kaka only had a brief appearance against Costa Rica." },
  { phrase: "欧冠淘汰赛10球", error: "Kaka scored 10 goals across full campaign, not knockout-only." },
  { phrase: "2019美洲杯冠军内马尔", error: "Neymar did not play in 2019 Copa America." },
  { phrase: "2019年美洲杯冠军内马尔", error: "Neymar did not play in 2019 Copa America." },
  { phrase: "2023转会皇马", error: "Mbappe joined Real Madrid in 2024." },
  { phrase: "2023年转会皇马", error: "Mbappe joined Real Madrid in 2024." },
  { phrase: "马拉多纳1986金球奖第二", error: "Maradona was ineligible for 1986 Ballon d'Or." },
  { phrase: "马拉多纳1986年金球奖第二", error: "Maradona was ineligible for 1986 Ballon d'Or." },
];

let failed = false;
const allIds = new Set<string>();

for (const mId of matchups) {
  console.log(`Checking matchup: ${mId}...`);
  const data = fixedMatchupDebates[mId];
  if (!data) {
    console.error(`❌ Missing data for matchup: ${mId}`);
    failed = true;
    continue;
  }

  const { main, bonus } = data;
  if (main.length !== 12) {
    console.error(`❌ Expected exactly 12 main topics, found: ${main.length}`);
    failed = true;
  }
  if (bonus.length !== 3) {
    console.error(`❌ Expected exactly 3 bonus topics, found: ${bonus.length}`);
    failed = true;
  }

  const allTopics = [...main, ...bonus];
  for (const topic of allTopics) {
    // Check stable unique id
    if (!topic.id) {
      console.error(`❌ Topic is missing ID in ${mId}`);
      failed = true;
    } else {
      if (allIds.has(topic.id)) {
        console.error(`❌ Duplicate topic ID found: ${topic.id}`);
        failed = true;
      }
      allIds.add(topic.id);
    }

    // Check title and emoji
    if (!topic.title) {
      console.error(`❌ Topic is missing title: ${JSON.stringify(topic)}`);
      failed = true;
    }
    if (!topic.emoji) {
      console.error(`❌ Topic is missing emoji: ${topic.id}`);
      failed = true;
    }

    // Check kobe structure (player A)
    if (!topic.kobe || !topic.kobe.claim || !topic.kobe.points || !topic.kobe.punchline) {
      console.error(`❌ Topic ${topic.id} is missing kobe/Player A structure`);
      failed = true;
    } else {
      if (topic.kobe.points.length !== 3) {
        console.error(`❌ Topic ${topic.id} kobe points length is not exactly 3`);
        failed = true;
      }
    }

    // Check lebron structure (player B)
    if (!topic.lebron || !topic.lebron.claim || !topic.lebron.points || !topic.lebron.punchline) {
      console.error(`❌ Topic ${topic.id} is missing lebron/Player B structure`);
      failed = true;
    } else {
      if (topic.lebron.points.length !== 3) {
        console.error(`❌ Topic ${topic.id} lebron points length is not exactly 3`);
        failed = true;
      }
    }

    // Precise phrase check
    const fullText = JSON.stringify(topic);
    for (const rule of forbiddenPhrases) {
      if (fullText.includes(rule.phrase)) {
        console.error(`❌ Factual rule violation in topic ${topic.id}: Contains "${rule.phrase}" - ${rule.error}`);
        failed = true;
      }
    }

    // Check Pele 1283 goals counts
    if (fullText.includes("1283")) {
      if (!fullText.includes("友谊赛") && !fullText.includes("非正式比赛") && !fullText.includes("非正式比赛、友谊赛与表演赛的广泛统计口径")) {
        console.error(`❌ Risk: "1283" goal figure found without clear broad-count labeling in topic ${topic.id}`);
        failed = true;
      } else {
        console.log(`ℹ️ Verified "1283" goal figure in topic ${topic.id} is correctly labeled with broad-count/friendlies.`);
      }
    }

    // Check Neymar 2019 Copa America honor count
    if (fullText.includes("2019") && fullText.includes("美洲杯") && mId === "neymar-vs-mbappe") {
      if (fullText.includes("夺冠") && !fullText.includes("因伤缺席") && !fullText.includes("未参赛") && !fullText.includes("缺席了")) {
        console.error(`❌ Risk: "2019 Copa America" treated as Neymar's honor in topic ${topic.id}`);
        failed = true;
      } else {
        console.log(`ℹ️ Verified 2019 Copa America reference in topic ${topic.id} is an attack point / correctly framed as missed/regret.`);
      }
    }
  }
}

if (failed) {
  console.error("❌ Validation FAILED!");
  process.exit(1);
} else {
  console.log("✅ All validations passed successfully!");
  process.exit(0);
}
