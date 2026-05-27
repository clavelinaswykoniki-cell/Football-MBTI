type Side = "kobe" | "lebron";

interface Vote {
  topicId: string;
  winner: Side;
}

export interface Persona {
  title: string;
  emoji: string;
  description: string;
  color: string;
}

// Emotional / heart topics
const EMOTIONAL_IDS = ["mentality", "loyalty", "clutch", "iconic"];
// Stats / resume topics
const STATS_IDS = ["mvp", "finals", "rings", "goat"];

export function getPersona(side: Side, votes: Vote[], totalRounds: number): Persona {
  const ownVotes = votes.filter((v) => v.winner === side).length;
  const loyalty = ownVotes / totalRounds;
  const otherSide: Side = side === "kobe" ? "lebron" : "kobe";

  const v = (id: string) => votes.find((x) => x.topicId === id)?.winner;

  const votedForClutch = v("clutch");
  const votedForSkill = v("skill");
  const votedForGoat = v("goat");
  const votedForLoyalty = v("loyalty");
  const votedForMvp = v("mvp");
  const votedForFinals = v("finals");
  const votedForRings = v("rings");
  const votedForMentality = v("mentality");
  const votedForDefense = v("defense");
  const votedForIconic = v("iconic");
  const votedForTeammates = v("teammates");
  const votedForEra = v("era");

  // --- 100% loyalty ---
  if (loyalty >= 1.0) {
    return side === "kobe"
      ? { title: "梅吹原教旨主义者", emoji: "🐐", description: "12轮全投梅西，一票都没给对面。你跟梅西的关系比他跟巴萨还忠诚——不，比他跟马黛茶还忠诚。你的手机壁纸是不是梅西举大力神杯？别回答了，是的。", color: "text-kobe-gold" }
      : { title: "SIUUU 永动机", emoji: "👑", description: "12轮全投C罗，忠诚度拉满。你每天是不是对着镜子练 SIUUU 起跳？别不承认，你连梦里进球了都要转体一圈半再落地。C 罗本人看到你的投票都得说一句：这哥们比我还自律。", color: "text-lebron-gold" };
  }

  // --- 门德斯亲儿子: high-loyalty Ronaldo fan locked on off-pitch resume ---
  if (side === "lebron" && loyalty >= 0.85 && v("era") === "lebron" && v("teammates") === "lebron" && v("mvp") === "lebron") {
    return { title: "门德斯亲儿子", emoji: "🤝", description: "票几乎全给 C 罗，时代影响力+队友功劳+金球先生一个不落。你不是看球的，你是看合同的——下次 C 罗续约你比他经纪人还激动，手抖到打不开转会窗。", color: "text-lebron-gold" };
  }

  // --- 马黛茶续杯王: high-loyalty Messi fan locked on Argentine vibes ---
  if (side === "kobe" && loyalty >= 0.85 && v("loyalty") === "kobe" && v("iconic") === "kobe") {
    return { title: "马黛茶续杯王", emoji: "🧉", description: "梅西的票几乎一张不落，忠诚和经典时刻更是闭眼投。看球必备马黛茶，吸管不离嘴；C 罗一发健身 INS 你立刻举报营销号。家里墙上贴的不是梅西海报——是阿根廷国旗，正中间手绘 10 号。", color: "text-kobe-gold" };
  }

  // --- Against own side on BOTH rings and goat (the two biggest topics) ---
  if (votedForRings === otherSide && votedForGoat === otherSide) {
    return side === "kobe"
      ? { title: "深柜罗密", emoji: "🚪", description: "国家队大赛荣誉和 GOAT 都投了 C 罗——你为什么不直接换边？最重要的两题都反水你还自称梅吹？兄弟出柜吧，皇马青训等着你。", color: "text-red-400" }
      : { title: "深柜梅密", emoji: "🚪", description: "国家队大赛荣誉和 GOAT 全投了梅西——你站 C 罗站了个寂寞。最重要的两题都倒戈，你的忠诚度比 C 罗换队还频繁。", color: "text-red-400" };
  }

  // --- All emotional topics for Messi, all stats topics for Ronaldo ---
  const allEmotionalKobe = EMOTIONAL_IDS.every((id) => v(id) === "kobe");
  const allStatsLebron = STATS_IDS.every((id) => v(id) === "lebron");
  if (allEmotionalKobe && allStatsLebron) {
    return {
      title: "理性与感性分裂体",
      emoji: "🧠💔",
      description: "感情上全站梅西，数据上全站 C 罗——白天打开 Opta 看进球数默默点头，晚上关灯看梅西过五人偷偷抹泪。你的内心每天都在踢一场梅罗大战，而且永远踢不完。",
      color: "text-purple-400",
    };
  }

  // --- Messi everything EXCEPT goat (can't commit) ---
  const mainTopicIds = ["rings", "clutch", "skill", "mvp", "mentality", "defense", "finals", "teammates", "era", "iconic", "loyalty"];
  const allMainKobeExceptGoat = mainTopicIds.every((id) => v(id) === "kobe") && votedForGoat === "lebron";
  if (allMainKobeExceptGoat) {
    return {
      title: "万年老二推崇者",
      emoji: "🥈",
      description: "11轮全投了一边，就 GOAT 这一轮投了对面。你心里啥都明白，就是历史地位上不敢拍板。这比无脑吹还扎心——你承认你心爱的那位差那么一丢丢。",
      color: "text-kobe-gold",
    };
  }

  // --- 巴萨原教旨 (positive): all Barcelona-era qualities locked on Messi ---
  if (side === "kobe" && loyalty >= 0.75 && v("skill") === "kobe" && v("loyalty") === "kobe" && v("iconic") === "kobe" && v("teammates") === "kobe") {
    return {
      title: "巴萨原教旨",
      emoji: "💙",
      description: "技术、忠诚、经典、队友体系全给梅西——你不是普通梅密，你是只认 2008-2015 那段巴萨味儿的考古派。瓜帅 tiki-taka、哈维伊涅斯塔三角传切、诺坎普三连星——这些词从你嘴里说出来比念家谱还顺。",
      color: "text-kobe-gold",
    };
  }

  // --- 国家队党 (positive): rings + clutch + iconic locked on chosen side ---
  if (v("rings") === side && v("clutch") === side && v("iconic") === side && loyalty >= 0.6) {
    return side === "kobe"
      ? {
          title: "卡塔尔之夜信徒",
          emoji: "🏆",
          description: "国家队荣誉、关键球、经典时刻全投梅西——你不在乎西甲冠军和金球，你只看大赛。2022 卡塔尔那一夜你至少回看了 30 遍，每一遍都在 121 分钟那个点球大战时停下来喝口水稳住情绪。",
          color: "text-kobe-gold",
        }
      : {
          title: "里斯本之鹰",
          emoji: "🦅",
          description: "国家队荣誉、关键球、经典时刻全投 C 罗——你不在乎欧冠和金球，你只看葡萄牙队大赛。2016 欧洲杯那座奖杯是你心里 C 罗职业生涯的全部，就算他第 25 分钟就受伤下场了。",
          color: "text-lebron-gold",
        };
  }

  // --- 银河战舰难民: gave teammates to Messi but main resume items to Ronaldo ---
  if (v("teammates") === "kobe" && v("mvp") === "lebron" && v("finals") === "lebron" && v("rings") === "lebron") {
    return {
      title: "银河战舰难民",
      emoji: "🚀",
      description: "队友功劳给了梅西，但金球、决赛、国家队荣誉全给 C 罗。你承认 BBC+莫德里奇+克罗斯是奢侈品阵容——同时坚称 C 罗是独狼。建议你先把「独狼」这俩字查一下字典，然后再去看一下皇马 13/14/16/17/18 五年四欧冠的首发名单。",
      color: "text-purple-400",
    };
  }

  // --- Traitor: <25% loyalty ---
  if (loyalty <= 0.25) {
    return side === "kobe"
      ? { title: "卧底罗密", emoji: "🕵️", description: "嘴上说站梅西，投票全给了 C 罗。你比菲戈从巴萨转会皇马还丝滑——人家好歹纠结了一下，你是直接穿着巴萨球衣进了伯纳乌还坐到了主席台。", color: "text-red-400" }
      : { title: "卧底梅密", emoji: "🕵️", description: "选了罗密的身份，票全投给了梅西。你的心口不一程度堪比 C 罗发 INS 说「团队精神最重要」然后镜头拍到他没进球在场边叹气。", color: "text-red-400" };
  }

  // --- Data nerd: admits Messi is more skilled but bows to stats ---
  if (votedForClutch === "kobe" && votedForSkill === "kobe" && votedForGoat === "lebron") {
    return { title: "Opta 球迷", emoji: "📊", description: "承认梅西更有技术更能在禁区里把人晃晕，但最后还是跪在了进球数面前。你是不是做什么决定都要先打开懂球帝数据中心？老哥，足球不是 Excel 表。", color: "text-blue-400" };
  }

  // --- 苏神牙印: skill + iconic to Messi but goat to Ronaldo ---
  if (votedForSkill === "kobe" && votedForIconic === "kobe" && votedForGoat === "lebron") {
    return { title: "苏神牙印", emoji: "🦷", description: "技术和经典时刻都给了梅西，但 GOAT 最后还是给了 C 罗。你像被苏亚雷斯咬过一口的基耶利尼——伤口在心里，赛后还得对着记者镜头硬挤出一句「没事，C 罗才是历史第一」。", color: "text-blue-400" };
  }

  // --- Split personality: clutch=lebron but loyalty=kobe ---
  if (votedForClutch === "lebron" && votedForLoyalty === "kobe") {
    return { title: "自相矛盾本盾", emoji: "🤯", description: "梅西更忠诚但关键球更差？2022 卡塔尔决赛点球是谁进的来着？你的投票逻辑像一场点球大战——左脑踢左边，右脑踢右边，最后球打到门柱弹回来砸自己脸上。", color: "text-purple-400" };
  }

  // --- Stubborn Messi fan: gave MVP + finals to Ronaldo but won't switch ---
  if (votedForFinals === "lebron" && votedForMvp === "lebron" && side === "kobe") {
    return { title: "嘴硬型梅密", emoji: "😤", description: "金球和大场面都给了 C 罗，但立场纹丝不动。你的嘴硬程度堪比瓜迪奥拉赛后发布会——数据全输了还能面不改色地说「我们控制了比赛」。", color: "text-kobe-gold" };
  }

  // --- Reverse stubborn: Ronaldo fan who gave clutch + mentality + loyalty to Messi ---
  if (votedForClutch === "kobe" && votedForMentality === "kobe" && votedForLoyalty === "kobe" && side === "lebron") {
    return { title: "嘴硬型罗密", emoji: "😤", description: "关键球、精神力、忠诚全投了梅西——你内心住着一个梅吹但嘴上偏要喊 SIUUU。这叫什么，傲娇？还是 C 罗式自律——嘴上不承认但身体很诚实？", color: "text-lebron-gold" };
  }

  // --- SIUUU 起跳膝盖响: high-loyalty Ronaldo fan who concedes defense to Messi ---
  if (side === "lebron" && loyalty >= 0.75 && votedForDefense === "kobe") {
    return { title: "SIUUU 起跳膝盖响", emoji: "🦵", description: "大部分票都给 C 罗，但回防你诚实地给了梅西——这点很罕见。每次进球你都对着镜子练那个 SIUUU 起跳，落地一声闷响，楼下邻居以为又装修。诚实是好事，但你妈不一定觉得。", color: "text-lebron-gold" };
  }

  // --- 菲戈转会综合症: Messi fan who gave loyalty + teammates to Ronaldo ---
  if (side === "kobe" && votedForLoyalty === "lebron" && votedForTeammates === "lebron") {
    return { title: "菲戈转会综合症", emoji: "🐷", description: "选了梅密的边，但忠诚度和队友功劳都送给了 C 罗。这跟当年揣着皇马合同回诺坎普的菲戈一个味儿——区别是人家挨了猪头，你连诺坎普的门票都没买。", color: "text-red-400" };
  }

  // --- 2014 决赛刽子手: Messi fan who gave finals AND clutch to Ronaldo ---
  if (side === "kobe" && votedForFinals === "lebron" && votedForClutch === "lebron") {
    return { title: "2014 决赛刽子手", emoji: "⚰️", description: "梅密身份，但关键球和大场面都给了 C 罗——你这是替伊瓜因和帕拉西奥那两个空门补刀。2014 那场决赛梅西不是输给德国，是输给了你这种投票模式。", color: "text-red-400" };
  }

  // --- 加迪夫倒钩信徒: gave finals + iconic to Ronaldo but mvp to Messi ---
  if (votedForFinals === "lebron" && votedForIconic === "lebron" && votedForMvp === "kobe") {
    return { title: "加迪夫倒钩信徒", emoji: "🛩️", description: "2017 加迪夫那一脚倒钩你存了 4K 原画+慢镜头+8 个机位，决赛和经典时刻一并给了 C 罗。但金球先生你又承认是梅西的——那 8 vs 5 这道算术题你打算装聋作哑到哪一年？", color: "text-yellow-400" };
  }

  // --- 决赛失忆症: clutch to Messi but finals to Ronaldo ---
  if (votedForClutch === "kobe" && votedForFinals === "lebron") {
    return { title: "决赛失忆症", emoji: "🌫️", description: "关键球承认梅西，决赛却给 C 罗——所以世界杯决赛不算决赛？卡塔尔那一晚是阿根廷队内训练赛？你的脑回路比 VAR 画框还复杂，画到一半电脑死机了。", color: "text-purple-400" };
  }

  // --- 金球否定派: mvp to Messi but goat to Ronaldo ---
  if (votedForMvp === "kobe" && votedForGoat === "lebron") {
    return { title: "金球否定派", emoji: "🏆", description: "8 座金球承认是梅西的，但 GOAT 给了 C 罗——那金球评的到底是什么？最佳模特？最强健身博主？你这逻辑递交 France Football 编辑部，他们能气得当场宣布金球停办。", color: "text-blue-400" };
  }

  // --- The contrarian: defense=lebron but era+iconic=kobe ---
  if (votedForDefense === "lebron" && votedForEra === "kobe" && votedForIconic === "kobe") {
    return { title: "杠精附体", emoji: "🤡", description: "防守给了 C 罗但影响力和经典时刻给了梅西——每道题都精准避开主流答案。你在直播吧的评论一定是那种 0 赞 47 回复的类型，而且你乐在其中。", color: "text-yellow-400" };
  }

  // --- The betrayer: Messi fan who gave rings to Ronaldo ---
  if (side === "kobe" && votedForRings === "lebron" && votedForGoat === "kobe") {
    return { title: "精神胜利法大师", emoji: "🏅", description: "国家队大赛荣誉给了 C 罗但 GOAT 给了梅西——你这是直接把 2022 世界杯+2024 美洲杯两座奖杯涂掉重画？阿根廷探戈跳着跳着，跳成了葡萄牙法多。", color: "text-kobe-gold" };
  }

  // --- High loyalty ---
  if (loyalty >= 0.75) {
    return side === "kobe"
      ? { title: "正统梅吹门徒", emoji: "🔥", description: "大部分轮次站梅西，偶尔也承认对面有道理。你是梅密里难得的清醒派——虽然你在直播吧发一条「C 罗头球确实强」就会被梅密追着骂三天。坚持做自己，不容易。", color: "text-kobe-gold" }
      : { title: "理性总裁拥趸", emoji: "⚡", description: "大部分投了 C 罗但不是无脑 SIUUU。你是那种进球了先看 xG 再庆祝的人。在梅罗大战的混乱评论区里，你就是那个被双方同时@的中间人。", color: "text-lebron-gold" };
  }

  // --- Moderate loyalty ---
  if (loyalty >= 0.4 && loyalty <= 0.6) {
    return { title: "墙头草精", emoji: "🌾", description: "两边投得差不多——你是梅罗大战里的瑞士，永久中立。点外卖你是不是也在两家店之间纠结半小时最后点了第三家？", color: "text-white" };
  }

  return { title: "摇摆球迷", emoji: "⚖️", description: "两边都投了不少，模式还不明显——你要么是真正的足球哲学家，要么就是看哪边论点排版更顺眼就选哪边。大概率是后者。下次试试盲投，可能更准。", color: "text-white" };
}

export function getRoast(side: Side, votes: Vote[]): string {
  const patterns: string[] = [];

  const v = (id: string) => votes.find((x) => x.topicId === id)?.winner;

  // --- Trash-talk patterns ---

  if (v("clutch") === "kobe" && v("finals") === "lebron") {
    patterns.push("关键球投了梅西，大场面投了 C 罗？所以梅西关键球很强但 big game 不行？那 2022 卡塔尔决赛点球是 PS 的？2014 美洲杯决赛打门是空气进的？你这投票自己打自己脸了知道吗。");
  }

  if (v("skill") === "kobe" && v("mvp") === "lebron") {
    patterns.push("技术投了梅西，金球先生投了 C 罗？你在说一个技术更差的人拿了更多金球？那金球评的是什么？倒钩大赛？SIUUU 节奏感？你的逻辑已经被苏亚雷斯咬死了。");
  }

  if (v("mentality") === "kobe" && v("goat") === "lebron") {
    patterns.push("精神力投了梅西，GOAT 投了 C 罗？所以心态最稳的不是最伟大的？那 C 罗那个自律人设是用来干嘛的？发 INS 拍腹肌？精神力含金量被你亲手扔进垃圾桶。");
  }

  if (v("loyalty") === "kobe" && v("teammates") === "lebron") {
    patterns.push("忠诚给梅西，队友给 C 罗？你是说一辈子在巴萨的人比换了 5 个俱乐部的人队友更差？那忠诚有什么用？感动自己？纽维尔小老弟梅西看到你这投票直接想退役。");
  }

  if (v("defense") === "kobe" && v("era") === "lebron") {
    patterns.push("回防给梅西，时代影响力给 C 罗？防守更好的人影响力更小？那 C 罗 6 亿 INS 粉丝是怎么来的？是不是你私信的？你这投票连葡萄牙国家队的二队都进不去。");
  }

  if (side === "kobe" && v("rings") === "lebron") {
    patterns.push("梅密连国家队大赛荣誉都没投给梅西？2022 世界杯+2024 美洲杯你都选 C 罗的欧国联？你确定你看球了？还是说你心里早就投奔伯纳乌了，只是嘴上不承认？");
  }

  if (side === "lebron" && v("clutch") === "kobe") {
    patterns.push("罗密承认梅西关键球更强了？那最后一秒任意球你把球给谁？你嘴上喊 SIUUU，但你的手已经把球递给梅西去主罚了。这心口不一比 C 罗去沙特还快。");
  }

  if (v("rings") === "kobe" && v("goat") === "lebron") {
    patterns.push("国家队荣誉给了梅西但 GOAT 给了 C 罗？所以世界杯冠军不是 GOAT 标准？那 GOAT 是看 INS 粉丝量？看欧国联含金量？兄弟你都不知道你在投啥。");
  }

  if (v("iconic") === "kobe" && v("finals") === "lebron") {
    patterns.push("经典时刻给了梅西，大场面给了 C 罗？你觉得梅西的高光都不在决赛？2022 世界杯决赛 2 球+点球、2009 欧冠决赛头球、2011 欧冠决赛主导曼联——你是不是只看了诺坎普反皇马 5-0 那场就以为是全部？");
  }

  if (side === "lebron" && v("loyalty") === "kobe" && v("mentality") === "kobe") {
    patterns.push("罗密把忠诚和精神力都给了梅西？你是不是觉得 C 罗就是个打工的？合同到期就跑、钱多就走、沙特给得多就去捞金？你这哪是球迷，你是 C 罗的经纪人门德斯。");
  }

  if (side === "kobe" && v("mvp") === "lebron" && v("goat") === "lebron") {
    patterns.push("金球和 GOAT 都给了 C 罗你还说自己是梅吹？8 个金球总要承认是梅西的吧？最有含金量的两个荣誉全送对面。你不是梅密，你是梅西最大的黑粉，巴塞罗那市政厅请你删号。");
  }

  if (v("skill") === "lebron" && v("clutch") === "lebron" && v("defense") === "lebron") {
    patterns.push("技术、关键球、回防三项全投了 C 罗？你觉得梅西在球场上干什么？卖萌？你把足球最核心的三项能力全给了对面，梅西看了直接把巴萨青训证撕了。");
  }

  if (v("era") === "kobe" && v("teammates") === "lebron" && v("goat") === "lebron") {
    patterns.push("时代影响力给梅西，但队友和 GOAT 给 C 罗？所以影响力最大的人不是 GOAT？那影响力影响了个啥？影响了大家哭一场然后投票还是投 C 罗？这逻辑能上《奇葩说》了。");
  }

  if (v("mentality") === "lebron" && v("loyalty") === "lebron" && side === "kobe") {
    patterns.push("精神力和忠诚都投了 C 罗？你作为梅吹，把心态王和一人一城两张王牌全交给对面。梅西在迈阿密看着你直摇头，估计在想：这哥们咋走错更衣室了？");
  }

  if (v("clutch") === "lebron" && v("rings") === "kobe") {
    patterns.push("关键球给了 C 罗但国家队荣誉给了梅西？所以关键球更强的人反而在最大场面颗粒无收？那 2016 欧洲杯决赛 C 罗 25 分钟下场是不是关键球时刻？你在嘲讽谁？");
  }

  if (v("iconic") === "lebron" && v("skill") === "kobe") {
    patterns.push("经典时刻给了 C 罗，技术给了梅西？你是说技术不行的人能创造经典？那你倒说说，倒钩之外 C 罗还有哪个被全球公认的「技术名场面」？过人？盘带？小范围摆脱？没有就别投这一票。");
  }

  // --- Fallback ---

  if (patterns.length === 0) {
    if (side === "kobe") {
      return "你的投票倒是没什么自相矛盾——但你站梅西这件事在 2026 年的直播吧已经是政治正确，毫无新意。8 金球+世界杯+美洲杯都摆这了，你站他就跟说「水是湿的」一样不需要论证。来点真知灼见好吗？";
    }
    return "你的投票逻辑自洽——跟 C 罗合同自洽：哪里钱多去哪里。安全、稳健、但就是缺一点点足球纯粹性。你这种球迷沙特联赛最喜欢——闷头看，不质疑，按时打卡 SIUUU。";
  }

  return patterns[Math.floor(Math.random() * patterns.length)];
}

export interface StatBomb {
  stat: string;
  source: string;
  side: Side;
}

export const statBombs: Record<string, StatBomb[]> = {
  rings: [
    { stat: "C罗国家队大赛冠军只有 2 个（2016 欧洲杯+2019 欧国联），且 2016 决赛第 25 分钟就受伤下场，奖杯一半算埃德尔的。", source: "UEFA 官方", side: "kobe" },
    { stat: "梅西国家队前 14 年颗粒无收，3 次大赛决赛全输（2007 美洲杯/2014 世界杯/2015、2016 美洲杯），被全阿根廷骂叛徒。", source: "Conmebol 历史", side: "lebron" },
  ],
  clutch: [
    { stat: "梅西 2022 世界杯淘汰赛阶段 4 场 4 球 3 助攻，决赛点球大战首罚命中——这才是真正的大心脏。", source: "FIFA 官方数据", side: "kobe" },
    { stat: "C罗 2018 世界杯八强出局、2022 世界杯八强出局，两届淘汰赛阶段合计 0 个运动战进球。", source: "FIFA 技术报告", side: "lebron" },
  ],
  skill: [
    { stat: "梅西生涯过人成功次数 2400+，欧洲五大联赛历史第一，是第二名（C罗）的两倍以上。", source: "Opta 历史数据", side: "kobe" },
    { stat: "C罗职业生涯头球进球超过 145 个，是梅西头球进球（30+）的近 5 倍——空中霸权碾压。", source: "Transfermarkt", side: "lebron" },
  ],
  mvp: [
    { stat: "梅西 8 座金球奖（2009/2010/2011/2012/2015/2019/2021/2023），比 C 罗多 3 座。", source: "France Football", side: "kobe" },
    { stat: "C罗 2008 金球年他英超进球 31 个、欧冠 8 球助曼联欧冠夺冠——梅西同年只拿 16 球。", source: "法新社", side: "lebron" },
  ],
  mentality: [
    { stat: "梅西 2022 美洲杯前曾 3 度宣布退出国家队，2016 还在更衣室痛哭——这哪是心态王，这是抑郁症发作。", source: "TyC Sports", side: "lebron" },
    { stat: "C罗 35 岁后体脂率仍维持在 7%，每天比队友早到 90 分钟训练——这种自律梅西做不到。", source: "尤文图斯队医访谈", side: "lebron" },
  ],
  defense: [
    { stat: "梅西生涯每 90 分钟跑动 8.3 公里，比 C 罗（9.2 公里）少一公里——你管这叫努力踢球？", source: "Whoscored", side: "lebron" },
    { stat: "C罗近 5 个赛季回防数据进入欧洲前锋后 15%——所谓自律不包括防守。", source: "Opta 高级数据", side: "kobe" },
  ],
  finals: [
    { stat: "梅西欧冠决赛 4 战全胜 2 球 1 助攻，2009 罗马决赛、2011 温布利决赛主宰曼联。", source: "UEFA 官方", side: "kobe" },
    { stat: "C罗欧冠决赛 3 战 3 球，2017 加迪夫决赛梅开二度——单决赛进球数力压梅西。", source: "UEFA 官方", side: "lebron" },
  ],
  teammates: [
    { stat: "梅西巴萨时期队友有哈维、伊涅斯塔、苏亚雷斯、内马尔——MSN+宇宙队，你说他没帮手？", source: "Transfermarkt 阵容史", side: "lebron" },
    { stat: "C罗去尤文第二年带队欧冠被里昂淘汰，去曼联第二年带队第六踢欧会杯——没有顶级阵容就是不行。", source: "懂球帝战绩库", side: "kobe" },
  ],
  era: [
    { stat: "梅西迈阿密国际门票均价上涨 1700%，加盟首场比赛 NBA 老板贝克汉姆+Lebron+卡戴珊全到场。", source: "Forbes 2023", side: "kobe" },
    { stat: "C罗 INS 粉丝 6.5 亿，是 Instagram 第一人——梅西 5.0 亿排第二。", source: "Social Blade", side: "lebron" },
  ],
  iconic: [
    { stat: "梅西 2007 国王杯过 5 人复刻马拉多纳「世纪进球」——这是足球历史教科书级镜头。", source: "马卡报评选", side: "kobe" },
    { stat: "C罗 2018 欧冠对尤文图斯倒钩——尤文主场球迷起立鼓掌的传奇瞬间。", source: "UEFA 官方评选", side: "lebron" },
  ],
  goat: [
    { stat: "ESPN 2024 全球记者投票 GOAT 评选：梅西 79% vs C罗 12%，差距悬殊。", source: "ESPN GOAT Poll 2024", side: "kobe" },
    { stat: "C罗职业生涯总进球 900+，男足历史第一人——绝对数量上无人能及。", source: "RSSSF 历史进球榜", side: "lebron" },
  ],
  loyalty: [
    { stat: "梅西在巴萨踢了 21 年（2000-2021），效力时间是 C 罗最长俱乐部（曼联 6 年）的 3.5 倍。", source: "Transfermarkt 合同史", side: "kobe" },
    { stat: "梅西 2020 年也曾递交转会申请要离开巴萨——所谓一人一城是被财政逼走的，不是主动留下。", source: "西班牙体育报", side: "lebron" },
  ],
  whatif_swap: [
    { stat: "梅西 2020 年逼宫要走时，巴萨财政崩盘后没人接得起他的工资——所谓忠诚不过是没人买得起。", source: "ESPN FC 2021 报道", side: "lebron" },
    { stat: "C罗 2009 离开曼联后曼联 9 年欧冠 0 个 4 强——他走后球队直接垫底，证明带队能力真实存在。", source: "懂球帝战绩库", side: "kobe" },
  ],
  whatif_era: [
    { stat: "00 年代防守强度比现在高 30%，铲球规则更宽松——梅西在 06-12 年那种环境下依然过人 2400+，含金量翻倍。", source: "Opta 时代修正", side: "kobe" },
    { stat: "现代足球前锋平均寿命延长 4-5 年——C 罗 39 岁还能进球部分要归功于运动科学进步，时代红利。", source: "FIFA 医疗报告 2024", side: "lebron" },
  ],
  whatif_1v1: [
    { stat: "梅西生涯 1v1 突破成功率 58%，欧洲五大联赛历史前锋第一——单挑场景下无解。", source: "Opta 突破数据", side: "kobe" },
    { stat: "C罗生涯空中对抗成功率 73%，禁区内身体对抗压制——单挑高空球梅西没得比。", source: "Whoscored 对抗数据", side: "lebron" },
  ],
};
