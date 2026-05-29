export type Side = "playerA" | "playerB";

export interface Vote {
  topicId: string;
  winner: Side;
}

export interface JudgeRequest {
  votes: Vote[];
  side: Side;
  playerAScore: number;
  playerBScore: number;
  nameA?: string;
  nameB?: string;
}

export interface PersonalityProfile {
  type: string;
  emoji: string;
  traits: string[];
  decisionStyle: string;
  inRelationship: string;
  atWork: string;
  spiritAnimal: string;
}

export interface JudgeResponse {
  verdict: string;
  analysis: string;
  confidence: number;
  prescription: string;
  challenge: string;
  fanFiction: string;
  personality: PersonalityProfile;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function vv(votes: Vote[], id: string): Side | undefined {
  return votes.find((x) => {
    const tid = x.topicId;
    if (tid === id) return true;
    if (tid.endsWith("_" + id)) return true;
    
    // Semantic alias mappings for custom matchups and prefixed fixed matchups
    if (id === "mvp" && (tid.endsWith("_individual") || tid.endsWith("_peak") || tid.endsWith("_data"))) return true;
    if (id === "finals" && (tid.endsWith("_club") || tid.endsWith("_teammates") || tid.endsWith("_clutch"))) return true;
    if (id === "loyalty" && (tid.endsWith("_club") || tid.endsWith("_career"))) return true;
    if (id === "mentality" && (tid.endsWith("_style") || tid.endsWith("_tactics") || tid.endsWith("_leadership"))) return true;
    if (id === "iconic" && (tid.endsWith("_influence") || tid.endsWith("_today") || tid.endsWith("_style"))) return true;
    
    return false;
  })?.winner;
}

function resolveNames(data: JudgeRequest): { nameA: string; nameB: string } {
  return {
    nameA: data.nameA?.trim() || "梅西",
    nameB: data.nameB?.trim() || "C罗",
  };
}

function analyzePersonality(data: JudgeRequest): PersonalityProfile {
  const { votes, side } = data;
  const { nameA, nameB } = resolveNames(data);
  const totalRounds = votes.length;
  const loyalty = totalRounds > 0
    ? votes.filter((x) => x.winner === side).length / totalRounds
    : 0;

  const emotionalIds = ["mentality", "loyalty", "clutch", "iconic"];
  const dataIds = ["mvp", "finals", "rings", "goat"];

  const emotionalKobe = emotionalIds.filter((id) => vv(votes, id) === "playerA").length;
  const dataLebron = dataIds.filter((id) => vv(votes, id) === "playerB").length;
  const emotionalLebron = emotionalIds.filter((id) => vv(votes, id) === "playerB").length;
  const dataKobe = dataIds.filter((id) => vv(votes, id) === "playerA").length;

  const isEmotionalVoter = emotionalKobe >= 3 || emotionalLebron >= 3;
  const isDataVoter = dataLebron >= 3 || dataKobe >= 3;
  const isSplitBrain = emotionalKobe >= 3 && dataLebron >= 3;

  if (loyalty >= 1.0) {
    return {
      type: "纯血结晶 / 原教旨主义护法",
      emoji: "🛡️",
      traits: ["立场坚定到偏执", "黑白分明不接受灰色地带", "一旦认定就死磕到底", "讨厌「客观分析」这四个字"],
      decisionStyle: "你做决定只需要0.1秒。不是因为你想得快，是因为你根本不想。选了就不回头，对错都不重要。",
      inRelationship: "你是那种吵架绝不认错的人。不是觉得自己对，是觉得认错等于背叛自己。你的伴侣可能已经习惯了——或者已经跑了。",
      atWork: "你要么是团队里最忠诚的战士，要么是最顽固的阻力。老板喜欢你的执行力，但恨你的「我不听我不听」。",
      spiritAnimal: side === "playerA" ? `一只只认一个主人的牧羊犬——忠诚、敏捷、不讲理（${nameA}模式）` : `一头只走直线的公牛——方向明确，沿途碾碎所有障碍物（${nameB}模式）`,
    };
  }

  if (loyalty <= 0.3) {
    return {
      type: "顶级串子 / 卧底型黑粉",
      emoji: "🦊",
      traits: ["嘴上一套心里一套", "善于自我欺骗", "内心想法和外在表达永远不同步", "朋友圈和实际生活是两个人"],
      decisionStyle: "你总是先选一个立场，然后用行动证明自己选错了。不是犹豫，是你享受自相矛盾的快感。",
      inRelationship: "你是那种嘴上说「我不在乎」但翻对方手机翻到凌晨3点的人。口是心非是你的母语。",
      atWork: "你会在会议上支持A方案，然后私下执行B方案。不是坏，是你真诚地相信自己两个想法都是对的。",
      spiritAnimal: "一只嘴里叼着鱼但眼睛盯着肉的猫——永远觉得另一个选择更好",
    };
  }

  if (isSplitBrain) {
    return {
      type: "理性与感性分裂型",
      emoji: "🧠💔",
      traits: ["白天靠逻辑活着晚上靠感情活着", "Excel和诗集都在你桌上", "做决定时左脑和右脑在打架", "朋友觉得你理性但你自己知道你多感性"],
      decisionStyle: "你买东西会比价三天，然后在最后一秒因为「感觉对了」买了最贵的那个。你的理性是装出来的，内心住着一个文艺青年。",
      inRelationship: "你会用数据分析对方适不适合自己，然后爱上一个完全不符合标准的人。你的择偶标准和实际选择之间隔了一个银河系。",
      atWork: "你做PPT用数据，但做决策靠直觉。老板以为你是数据驱动型人才，其实你是玄学驱动型。",
      spiritAnimal: "一只戴着眼镜看数据报表但会在月圆之夜嚎叫的狼——表面学者，内心野兽",
    };
  }

  if (isEmotionalVoter && !isDataVoter) {
    return {
      type: "感性至上型人格",
      emoji: "❤️‍🔥",
      traits: ["做决定全凭感觉", "故事比数据更能说服你", "容易被热血瞬间打动", "看比赛会哭的那种球迷"],
      decisionStyle: "你从不看说明书。感觉对了就下单，感觉不对数据再好也没用。你的人生是一部即兴剧。",
      inRelationship: "你是那种看了一眼就知道「是ta了」的人。也是那种三天后觉得「不是ta了」的人。感情来得快去得也快，像夏天的暴雨。",
      atWork: "你是团队里最有激情的人，也是最容易被一句鸡汤激励到加班到凌晨的人。老板最喜欢在你面前画饼。",
      spiritAnimal: "一只看见蝴蝶就追的金毛——热情、忠诚、但容易被分散注意力",
    };
  }

  if (isDataVoter && !isEmotionalVoter) {
    return {
      type: "数据原教旨主义者",
      emoji: "📊",
      traits: ["没有数据不开口", "感情对你来说是噪音", "Excel是你的圣经", "别人觉得你冷血但你觉得自己理性"],
      decisionStyle: "你买个奶茶都要看大众点评评分。超过4.5才考虑。低于4.0直接pass。你的人生是一个不断优化的算法。",
      inRelationship: "你可能维护过一个Excel表格来追踪约会对象的优缺点。或者你没有，但你心里有一个。你的爱情观是：匹配度>85%才值得投入。",
      atWork: "你是会议里那个说「数据呢？」的人。所有人讨论感觉的时候你在看报表。你不是不合群，你只是活在另一个维度。",
      spiritAnimal: "一只用声呐精确定位猎物的蝙蝠——高效、精准、但在阳光下有点社恐",
    };
  }

  if (loyalty >= 0.4 && loyalty <= 0.6) {
    return {
      type: "永恒纠结型人格",
      emoji: "⚖️",
      traits: ["优柔寡断但自称「全面考虑」", "永远在权衡利弊", "菜单翻三遍还是点老样子", "所有选择题对你来说都是开放题"],
      decisionStyle: "你点外卖平均用时17分钟。不是因为选择多，是因为你能给每个选项找到等量的优缺点。你的大脑是一台永远输出50:50的天平。",
      inRelationship: "你是那种被问「你爱我多少」会回答「要看从哪个维度衡量」的人。你不是不爱，是你把爱情也变成了一道辩论题。",
      atWork: "你的邮件里「on the other hand」出现的频率比你的名字还高。老板问你「行不行」你永远回答「各有利弊」。",
      spiritAnimal: "一只在两棵树之间反复横跳的松鼠——两边都有坚果，但你永远吃不到",
    };
  }

  if (loyalty >= 0.7) {
    return {
      type: "有底线的偏执狂",
      emoji: "🎯",
      traits: ["有立场但不盲目", "95%的时间跟着感觉走剩下5%靠理性刹车", "被说服很难但不是不可能", "嘴上不承认但心里知道对面有道理"],
      decisionStyle: "你做选择很快，但偶尔会在深夜质疑自己。第二天醒来又觉得自己是对的。你的决策模式是：坚持→小动摇→更坚持。",
      inRelationship: "你是那种嘴硬心软的伴侣。吵架时寸步不让，但会偷偷改掉对方说的那个问题。你的爱是行动不是语言。",
      atWork: "你有主见但不固执——至少你自己这么认为。同事可能有不同看法。但你确实是那种关键时刻能拍板的人。",
      spiritAnimal: "一只老鹰——有明确的狩猎方向，偶尔会被气流带偏，但最终总能抓到猎物",
    };
  }

  return {
    type: "混沌中立型人格",
    emoji: "🌀",
    traits: ["没有人能预测你的下一步", "包括你自己", "你的人生座右铭是「看情况」", "自由散漫但偶尔爆发惊人的判断力"],
    decisionStyle: "你的决策树不是树，是一团毛线。但神奇的是你总能从混乱中找到出路——只是事后没人能解释你是怎么找到的。",
    inRelationship: "跟你谈恋爱像坐过山车——刺激、不可预测、偶尔让人想吐。但下车之后还想再坐一次。",
    atWork: "你是团队里的「X因素」。好的时候是奇兵，坏的时候是bug。老板不知道该提拔你还是开除你。",
    spiritAnimal: "一只章鱼——八条腿同时往八个方向走，但最后总能到达目的地",
  };
}

function generatePrescription(data: JudgeRequest, loyalty: number): string {
  const { votes, side } = data;
  const { nameA, nameB } = resolveNames(data);
  const sideName = side === "playerA" ? nameA : nameB;
  const otherName = side === "playerA" ? nameB : nameA;

  if (loyalty >= 1.0) {
    return pick([
      `【处方】强制观看${otherName}的生涯高燃混剪100遍，如果中途试图砸碎屏幕或发出「Factos 👍」的嘲讽，请自觉去医院精神科挂号。`,
      `【处方】建议立刻拔掉网线，远离所有懂球帝和虎扑战区。你的结晶纯度已达危险值，再冲浪容易引发赛博火拼。`,
      `【处方】找一张${otherName}的海报贴在床头，每天早晚各鞠躬一次并大喊「${otherName}也是神，不再散步，King Sunday」。坚持一周，治愈你的偏执狂。`,
    ]);
  }

  if (loyalty <= 0.3) {
    return pick([
      `【处方】别装了，把微信头像换成${otherName}吧。承认自己是串子并不丢人，丢人的是串得这么明显。`,
      `【处方】去${sideName}的超话发一句「${sideName}确实不如${otherName}」，感受一下被自己人献祭的快感。`,
    ]);
  }

  if (vv(votes, "clutch") === "playerA" && vv(votes, "goat") === "playerB") {
    return `【处方】把「逆境看${nameB}」和「绝杀看${nameA}」的标签撕碎重组。建议反复横跳观看大巴黎时期欧冠和尤文时期欧冠，看看谁更早回家。`;
  }

  if (side === "playerA" && vv(votes, "rings") === "playerB") {
    return `【处方】去重温一遍世界杯颁奖典礼，看着那件金边黑袍，问问自己：散步怎么了？到底什么才叫真正的「大满贯」？`;
  }

  if (side === "playerB" && vv(votes, "mentality") === "playerA") {
    return `【处方】既然你承认${nameA}的精神属性，那建议你在下次深蹲或者做引体向上时，大喊一句「Siuuu」的同时，想想${nameA}被踢倒后默默爬起来的样子。`;
  }

  if (loyalty >= 0.4 && loyalty <= 0.6) {
    return pick([
      `【处方】别端水了，建议去知乎回答《如何评价${nameA}和${nameB}谁更强？》，写一篇1万字的长文把两边各打50大板，享受被双方粉丝混合双打的至高礼遇。`,
      `【处方】买一件一半阿根廷一半葡萄牙的拼接球衣穿上街，看看是你先被极端球迷打，还是先被保安带走。`,
    ]);
  }

  return pick([
    `【处方】把这个诊断报告发到你的朋友圈，配文「我是客观理性的懂球帝」。倒数五个数，看看评论区有几个骂你的。`,
    `【处方】立刻去开一局 FIFA 或实况足球，用${nameA}给${nameB}传球，感受一下只存在于游戏里的世纪大和解。`,
  ]);
}

function generateChallenge(data: JudgeRequest, loyalty: number): string {
  const { votes, side } = data;
  const { nameA, nameB } = resolveNames(data);
  const sideName = side === "playerA" ? nameA : nameB;
  const otherName = side === "playerA" ? nameB : nameA;

  if (loyalty >= 1.0) {
    return `如果${sideName}本人站在你面前说「${otherName}在某些方面确实比我强」，你会改变想法吗？还是你觉得你比${sideName}更了解${sideName}？`;
  }

  if (vv(votes, "clutch") === "playerA" && vv(votes, "finals") === "playerB") {
    return `你觉得关键时刻更强的人，大赛决赛表现反而不如对手——那「关键球强」到底指什么？联赛绝杀而已？决赛不算关键？`;
  }

  if (vv(votes, "skill") === "playerA" && vv(votes, "mvp") === "playerB") {
    return `技术更好的球员金球更少——这是说足球界瞎了，还是说技术好不等于踢得好？如果技术好但拿不到金球，那练技术图什么？`;
  }

  if (vv(votes, "loyalty") === "playerA" && vv(votes, "goat") === "playerB") {
    return `更忠诚的球员不是更伟大的球员——那忠诚在足球里有什么用？你是不是在说，跳槽豪门是更聪明的选择？`;
  }

  if (vv(votes, "mentality") === "playerA" && vv(votes, "goat") === "playerB") {
    return `精神力最强的不是GOAT——那什么才是GOAT的核心要素？数据？冠军？如果是冠军，那拿了5个欧冠的人岂不是宇宙GOAT？`;
  }

  if (side === "playerA" && vv(votes, "rings") === "playerB" && vv(votes, "goat") === "playerB") {
    return `冠军和GOAT都给了${otherName}——你站${sideName}的理由到底是什么？如果去掉情怀和集锦，你还能说出3个理由吗？`;
  }

  if (loyalty >= 0.4 && loyalty <= 0.6) {
    return `如果有人拿枪指着你说「选一个GOAT，只能选一个」——你选谁？别告诉我你还要分析，你有3秒钟。你的第一反应就是你的真实答案。`;
  }

  return pick([
    `换个角度：如果你是俱乐部主帅，只能选一个球员建队，你选${sideName}还是${otherName}？注意，这次没有情怀分，只有赢球。`,
    `最后一个问题：10年后回头看，你觉得自己今天的投票会让你觉得「当时真准」还是「当时真傻」？`,
    `如果${sideName}和${otherName}同时出现在你面前，你能当着${otherName}的面说「${sideName}比你强」吗？`,
  ]);
}

function generateFanFiction(data: JudgeRequest, loyalty: number): string {
  const { votes, side, playerAScore, playerBScore } = data;
  const { nameA, nameB } = resolveNames(data);
  const sideName = side === "playerA" ? nameA : nameB;
  const otherName = side === "playerA" ? nameB : nameA;

  if (loyalty >= 1.0) {
    return side === "playerA"
      ? `【平行宇宙日记】2035年，你终于集齐了${nameA}所有球衣、球鞋、签名球，把整个房间变成了${nameA}博物馆。你的对象走进来看了一眼，转身把结婚证撕了。你看着ta离去的背影，默默穿上10号球衣，对着墙颠了一记任意球——空心入网，甚至没有散步。你觉得，值了。`
      : `【平行宇宙日记】2035年，你把${nameB}的所有数据纹在了背上——900+进球、200+助攻、5座金球。你去游泳池的时候所有人都盯着你看，甚至还有人喊 King Sunday。不是因为帅，是因为你背上密密麻麻的数字看起来像一张Excel表格。`;
  }

  if (loyalty <= 0.3) {
    return `【平行宇宙日记】你参加了${sideName}球迷线下聚会，被问到最喜欢的${sideName}时刻，你张口就说了${otherName}的名场面。整个房间安静了3秒。你被请出去的速度比${otherName}的反击还快。`;
  }

  if (vv(votes, "clutch") === "playerA" && vv(votes, "goat") === "playerB") {
    return `【平行宇宙日记】你穿越到一场关键决赛的最后时刻，教练问你最后一脚交给谁。你的嘴说「${nameA}」，但你的手把球传给了坐在对面替补席上的${nameB}。全场懵了。裁判也懵了。你自己也懵了。`;
  }

  if (side === "playerA" && vv(votes, "rings") === "playerB") {
    return `【平行宇宙日记】你在${nameA}球迷群里分享了你的测试结果。冠军那一轮投了${nameB}的截图被人放大高亮发了出来。你被踢出群的时候收到最后一条消息：「叛徒，10号和7号都不会原谅你。」`;
  }

  if (side === "playerB" && vv(votes, "mentality") === "playerA" && vv(votes, "clutch") === "playerA") {
    return `【平行宇宙日记】你在${nameB}球迷群里说「但是${nameA}关键球确实强、精神力确实猛」。群里瞬间炸了。有人发了一张${nameB}飞身头球的GIF，配文「这就是精神力」。你默默竖起大拇指，但心里在放${nameA}帽子戏法的集锦。`;
  }

  if (playerAScore === playerBScore) {
    return `【平行宇宙日记】你被选为「${nameA} vs ${nameB}世纪辩论赛」的裁判。辩论结束后你宣布「平局」，两边球迷同时向你扔爆米花。你大喊 Factos 👍 在爆米花雨中微笑——终于有人跟你一样选择困难了。`;
  }

  const winner = playerAScore > playerBScore ? "playerA" : "playerB";
  const winnerName = winner === "playerA" ? nameA : nameB;
  const loserName = winner === "playerA" ? nameB : nameA;

  return pick([
    `【平行宇宙日记】2030年，AI进化到可以模拟球员的意识。你付了999元让AI-${winnerName}看你的投票结果。AI-${winnerName}看完沉默了5秒说：「${playerAScore}:${playerBScore}？我以为会更悬殊。你对${loserName}太手软了。」`,
    `【平行宇宙日记】你把这个测试发给了你暗恋的人。ta做完之后发现你们选了同一边。你觉得这是命中注定。ta觉得这只是概率50%。你们的爱情故事，就像这场辩论——永远达不成共识。`,
    `【平行宇宙日记】你带着${playerAScore}:${playerBScore}的战绩去面试。面试官恰好是${loserName}死忠粉。你没通过面试。HR的邮件写着：「综合能力优秀，但价值观不匹配。」`,
  ]);
}

export function generateVerdict(data: JudgeRequest): JudgeResponse {
  const { votes, side, playerAScore, playerBScore } = data;
  const { nameA, nameB } = resolveNames(data);
  const totalRounds = votes.length;
  const loyalty = totalRounds > 0
    ? votes.filter((x) => x.winner === side).length / totalRounds
    : 0;
  const loyaltyPct = Math.round(loyalty * 100);
  const sideName = side === "playerA" ? nameA : nameB;
  const otherName = side === "playerA" ? nameB : nameA;

  let verdict: string;
  let analysis: string;
  let confidence: number;

  if (loyalty >= 1.0) {
    verdict = pick([
      `${totalRounds}轮全投一个人？本AI建议你立刻去医院挂号，检查一下脑子里是不是长了结晶体。`,
      `忠诚度100%——经过VAR长达0.003秒的回放确认，你不是球迷，你是${sideName}的人形自走复读机。`,
      `全票投给${sideName}，连AI都觉得你离谱。系统判定：重度结晶，失去理智，拉黑处理。`,
    ]);
    analysis = `系统扫描了你的 ${totalRounds} 次投票轨迹，发现你的大脑皮层中负责「客观分析」的区域彻底坏死。你的行为模式与「巴甫洛夫的狗」高度重合——只要看到 ${sideName} 的名字就无条件按赞。诊断结果：晚期狂热饭圈粉，已丧失抢救价值。`;
    confidence = pick([98, 99, 100]);
  } else if (loyalty <= 0.3 && totalRounds >= 5) {
    verdict = pick([
      `选了站队${sideName}，票却全投给${otherName}——你是内鬼吧？本AI已将你的IP发送给全球反黑站。`,
      `忠诚度 ${loyaltyPct}%，这叛变速度比当年菲戈转会皇马还要丝滑。`,
    ]);
    analysis = `你口口声声说自己是 ${sideName} 的拥趸，但实际投票中却在疯狂给 ${otherName} 上分。本AI的反串黑检测雷达已经爆表。结论很明确：你是一个披着羊皮的狼，在赛博绿茵场上疯狂进行无间道表演。`;
    confidence = pick([94, 95, 96, 97]);
  } else if (
    side === "playerA" &&
    (vv(votes, "rings") === "playerB" || vv(votes, "goat") === "playerB") &&
    (vv(votes, "mvp") === "playerB")
  ) {
    verdict = pick([
      `你选了${nameA}但冠军/GOAT/金球全投给了${nameB}——AI判定你是一个被数据背叛的感性球迷。`,
      `嘴上${nameA}精神，手上全是${nameB}数据。你的内心住着一个不敢出柜的${nameB}粉。`,
      `${nameA}粉的身份，${nameB}粉的投票。本AI建议你先跟自己和解。`,
    ]);
    analysis = `你用感情选了${nameA}，却在最关键的几轮用理性投了${nameB}。冠军、金球、GOAT——这三个维度你都站了对面。本AI经过深度分析，认为你本质上是一个被名场面洗脑、但内心深处知道数据站哪边的矛盾体。`;
    confidence = pick([88, 90, 92]);
  } else if (
    side === "playerB" &&
    vv(votes, "clutch") === "playerA" &&
    (vv(votes, "mentality") === "playerA" || vv(votes, "iconic") === "playerA")
  ) {
    verdict = pick([
      `${nameB}粉承认了${nameA}关键球更强、精神力更猛？你的内心深处住着一个不敢出柜的${nameA}粉。`,
      `你站${nameB}，但把最燃的几轮全给了${nameA}——你选的是赢家，但你心里崇拜的是战士。`,
      `数据归${nameB}，灵魂归${nameA}。本AI判定你是足球界的「理智与情感」。`,
    ]);
    analysis = `关键球、精神力、标志性时刻——这些最让人热血沸腾的维度，你全投了${nameA}。你用Excel选了${nameB}，用心跳选了${nameA}。本AI认为，你是一个活在数据时代的浪漫主义者。`;
    confidence = pick([85, 88, 90]);
  } else if (vv(votes, "clutch") === "playerA" && vv(votes, "goat") === "playerB") {
    verdict = pick([
      `关键球投${nameA}，GOAT投${nameB}——所以最强的那个关键时刻不行？你的投票逻辑比加时赛还混乱。`,
      `AI发现你的投票存在严重的逻辑漏洞：认为${nameA}关键球更强，却不认为他是GOAT。这就像说「厨师做菜更好吃但不是最好的厨师」。`,
    ]);
    analysis = `你在「关键球」维度选了${nameA}，说明你相信他在最重要的时刻更可靠。但「GOAT」维度你又选了${nameB}。本AI的逻辑引擎进行了14次自检，确认这不是我的bug——是你的。`;
    confidence = pick([82, 85, 87]);
  } else if (side === "playerA" && vv(votes, "loyalty") === "playerA" && vv(votes, "rings") === "playerB") {
    verdict = pick([
      `忠诚投了${nameA}，冠军投了${nameB}——所以你觉得忠诚的人拿的冠军少？这是在夸${nameA}还是损${nameA}？`,
      `${nameA}粉把「忠诚」给了${nameA}但「冠军」给了${nameB}。本AI的情感分析模块已短路。`,
    ]);
    analysis = `你认为${nameA}更忠诚，但冠军含金量不如${nameB}。换句话说，你承认了「忠诚不等于赢」。本AI觉得这个结论虽然扎心，但可能是你投票中最诚实的部分。`;
    confidence = pick([80, 83, 86]);
  } else if (loyalty >= 0.4 && loyalty <= 0.6) {
    verdict = pick([
      `${playerAScore}:${playerBScore}，几乎五五开——你要么是真正的足球理性人，要么是天生的选择困难症。本AI倾向于后者。`,
      `两边都投了差不多——本AI经过0.7秒的深度思考，判定你是那种点菜要半小时的人。`,
      `比分${playerAScore}:${playerBScore}，均匀得让人怀疑你是不是在掷硬币。`,
    ]);
    analysis = `你的投票分布接近50/50，本AI的阵营分类器已陷入死循环。你既不算${nameA}粉也不算${nameB}粉——你是薛定谔的球迷，在被观测之前同时属于两个阵营。建议：下次投票前先想清楚自己是谁。`;
    confidence = pick([51, 55, 58, 62]);
  } else if (loyalty >= 0.6) {
    verdict = pick([
      `忠诚度${loyaltyPct}%，偶尔也给对面投了几票——本AI判定你是一个「有底线的偏心球迷」。`,
      `大部分投了${sideName}，但也承认${otherName}有几轮确实更强。恭喜，你是这个游戏里少数有脑子的人。`,
      `${loyaltyPct}%忠诚度。本AI的评价：你有立场，但还没疯。差一点点就到了。`,
    ]);
    analysis = `你${loyaltyPct}%的票投给了${sideName}，但在几个维度上诚实地选了${otherName}。本AI的结论是：你有自己的立场但还保留了最后一丝理性。这在互联网球迷中已经属于珍稀物种。建议博物馆收藏。`;
    confidence = pick([72, 75, 78]);
  } else {
    verdict = pick([
      `本AI分析了你的投票，发现你的逻辑自洽度为${Math.floor(Math.random() * 30 + 40)}%。换句话说，你自己可能也不知道自己在投什么。`,
      `${playerAScore}:${playerBScore}，投票模式无法归类。本AI怀疑你是随机数生成器的化身。`,
      `你的投票数据已成功让本AI的分类算法崩溃。恭喜，你是第一个让AI困惑的人类。`,
    ]);
    analysis = `本AI尝试了7种算法来分析你的投票模式，全部返回了NaN。你既不是坚定的${sideName}粉丝，也不是典型的骑墙派，你的投票轨迹像一条喝醉的蛇——有方向，但看不出来。AI建议：再玩一次，这次带上你的大脑。`;
    confidence = pick([42, 48, 53]);
  }

  return {
    verdict,
    analysis,
    confidence,
    prescription: generatePrescription(data, loyalty),
    challenge: generateChallenge(data, loyalty),
    fanFiction: generateFanFiction(data, loyalty),
    personality: analyzePersonality(data),
  };
}
