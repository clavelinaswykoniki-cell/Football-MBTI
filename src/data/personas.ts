type Side = "playerA" | "playerB";

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

export function getPersona(
  side: Side, 
  votes: Vote[], 
  totalRounds: number,
  nameA: string = "梅西",
  nameB: string = "C罗"
): Persona {
  const ownVotes = votes.filter((v) => v.winner === side).length;
  const loyalty = ownVotes / totalRounds;
  const otherSide: Side = side === "playerA" ? "playerB" : "playerA";

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
    return side === "playerA"
      ? { 
          title: `${nameA}吹原教旨主义者`, 
          emoji: "🐐", 
          description: `12轮全投${nameA}，一票都没给对面。你跟${nameA}的关系比他跟昔日俱乐部还忠诚——不，比铁石还坚硬。你的手机壁纸是不是${nameA}捧杯？别回答了，是的。`, 
          color: "text-accent-color-a" 
        }
      : { 
          title: nameB === "C罗" ? "SIUUU 永动机" : `${nameB}起步永动机`, 
          emoji: "👑", 
          description: nameB === "C罗" 
            ? "12轮全投C罗，忠诚度拉满。你每天是不是对着镜子练 SIUUU 起跳？别不承认，你连梦里进球了都要转体一圈半再落地。C 罗本人看到你的投票都得说一句：这哥们比我还自律。"
            : `12轮全投${nameB}，忠诚度拉满。你每天是不是在回放${nameB}的经典集锦？别不承认，你连梦里都在大喊${nameB}的名字。${nameB}本人看到你的投票都得给你点赞。`, 
          color: "text-accent-color-b" 
        };
  }

  // --- High-loyalty Player B fan locked on off-pitch resume ---
  if (side === "playerB" && loyalty >= 0.85 && v("era") === "playerB" && v("teammates") === "playerB" && v("mvp") === "playerB") {
    return { 
      title: `${nameB}的王牌合伙人`, 
      emoji: "🤝", 
      description: `票几乎全给 ${nameB}，时代影响力+队友功劳+个人荣誉一个不落。你不是看球的，你是看商业合同的——下次 ${nameB} 续约或签新代言你比谁都激动，手抖到打不开财务报表。`, 
      color: "text-accent-color-b" 
    };
  }

  // --- High-loyalty Player A fan locked on extreme vibes ---
  if (side === "playerA" && loyalty >= 0.85 && v("loyalty") === "playerA" && v("iconic") === "playerA") {
    return { 
      title: `${nameA}的精神守护者`, 
      emoji: "🧉", 
      description: `${nameA}的票几乎一张不落，忠诚和经典时刻更是闭眼投。看球具备专属信仰，吸管不离嘴；对面一发健身视频你立刻举报营销号。家里墙上贴的不是普通海报——是${nameA}的超级巨幅画像。`, 
      color: "text-accent-color-a" 
    };
  }

  // --- Against own side on BOTH rings and goat (the two biggest topics) ---
  if (votedForRings === otherSide && votedForGoat === otherSide) {
    return side === "playerA"
      ? { 
          title: `深柜${nameB}粉`, 
          emoji: "🚪", 
          description: `国家队大赛荣誉和 GOAT 都投了 ${nameB}——你为什么不直接换边？最重要的两题都反水你还自称${nameA}吹？兄弟出柜吧，${nameB}的球迷会等着你。`, 
          color: "text-red-400" 
        }
      : { 
          title: `深柜${nameA}粉`, 
          emoji: "🚪", 
          description: `国家队大赛荣誉和 GOAT 全投了 ${nameA}——你站 ${nameB} 站了个寂寞。最重要的两题都倒戈，你的忠诚度比教练换战术还频繁。`, 
          color: "text-red-400" 
        };
  }

  // --- All emotional topics for Player A, all stats topics for Player B ---
  const allEmotionalKobe = EMOTIONAL_IDS.every((id) => v(id) === "playerA");
  const allStatsLebron = STATS_IDS.every((id) => v(id) === "playerB");
  if (allEmotionalKobe && allStatsLebron) {
    return {
      title: "理性与感性分裂体",
      emoji: "🧠💔",
      description: `感情上全站 ${nameA}，数据上全站 ${nameB}——白天打开数据中心看进球和奖杯数默默点头，晚上关灯看 ${nameA} 的优雅艺术集锦偷偷抹泪。你的内心每天都在踢一场双雄大战，而且永远踢不完。`,
      color: "text-purple-400",
    };
  }

  // --- Player A everything EXCEPT goat (can't commit) ---
  const mainTopicIds = ["rings", "clutch", "skill", "mvp", "mentality", "defense", "finals", "teammates", "era", "iconic", "loyalty"];
  const allMainKobeExceptGoat = mainTopicIds.every((id) => v(id) === "playerA") && votedForGoat === "playerB";
  if (allMainKobeExceptGoat) {
    return {
      title: "临门一脚退缩者",
      emoji: "🥈",
      description: `11轮全投了一边，就 GOAT 这一轮投了对面。你心里啥都明白，就是历史地位上不敢拍板。这比无脑吹还扎心——你承认你心爱的那位差那么一丢丢。`,
      color: "text-accent-color-a",
    };
  }

  // --- Club dinosaur: all-era qualities locked on Player A ---
  if (side === "playerA" && loyalty >= 0.75 && v("skill") === "playerA" && v("loyalty") === "playerA" && v("iconic") === "playerA" && v("teammates") === "playerA") {
    return {
      title: `${nameA}时代的见证者`,
      emoji: "💙",
      description: `技术、忠诚、经典、队友体系全给${nameA}——你不是普通粉丝，你是只认${nameA}最巅峰黄金岁月的那段古典味儿的考古派。看他在场上过人调度，比念家谱还顺。`,
      color: "text-accent-color-a",
    };
  }

  // --- National team purist: rings + clutch + iconic locked on chosen side ---
  if (v("rings") === side && v("clutch") === side && v("iconic") === side && loyalty >= 0.6) {
    return side === "playerA"
      ? {
          title: "国家队巅峰信徒",
          emoji: "🏆",
          description: `国家队荣誉、关键球、经典时刻全投${nameA}——你不在乎俱乐部那些零碎，你只看大赛。夺冠那一夜你至少回看了 30 遍，每一次都在最后决定性瞬间停下来喝口水稳住情绪。`,
          color: "text-accent-color-a",
        }
      : {
          title: "国家队荣誉铁粉",
          emoji: "🦅",
          description: `国家队荣誉、关键球、经典时刻全投${nameB}——你不在乎俱乐部商业吹捧，你只看${nameB}代表国家队的大赛表现。那座国家队大赛奖杯是你心里${nameB}职业生涯的全部。`,
          color: "text-accent-color-b",
        };
  }

  // --- Heavy teammate card: gave teammates to Player A but main resume items to Player B ---
  if (v("teammates") === "playerA" && v("mvp") === "playerB" && v("finals") === "playerB" && v("rings") === "playerB") {
    return {
      title: "黄金体系推崇者",
      emoji: "🚀",
      description: `队友功劳给了${nameA}，但个人荣誉、决赛、国家队荣誉全给${nameB}。你承认${nameB}身边的阵容极其强大，同时坚称他是独立解决战斗的战术核心。这逻辑值得细细琢磨。`,
      color: "text-purple-400",
    };
  }

  // --- Traitor: <25% loyalty ---
  if (loyalty <= 0.25) {
    return side === "playerA"
      ? { 
          title: `卧底${nameB}粉`, 
          emoji: "🕵️", 
          description: `嘴上说站${nameA}，投票全给了${nameB}。你这转换比叛逃死敌还丝滑——人家好歹纠结了一下，你是直接穿着${nameA}球衣进了${nameB}粉丝会还坐到了主席台。`, 
          color: "text-red-400" 
        }
      : { 
          title: `卧底${nameA}粉`, 
          emoji: "🕵️", 
          description: `选了${nameB}的身份，票全投给了${nameA}。你的心口不一程度堪比嘴上说「团队利益最重要」然后镜头拍到自己没进球就在场边郁闷叹气。`, 
          color: "text-red-400" 
        };
  }

  // --- Data nerd: admits Player A is more skilled but bows to stats ---
  if (votedForClutch === "playerA" && votedForSkill === "playerA" && votedForGoat === "playerB") {
    return { 
      title: "数据统计原教旨", 
      emoji: "📊", 
      description: `承认${nameA}更有技术更能在小空间里把人晃晕，但最后还是跪在了硬核数据面前。你做决策是不是都要先打开数据中心对比一下？老哥，足球不是 Excel 报表。`, 
      color: "text-blue-400" 
    };
  }

  // --- Skill + iconic to Player A but goat to Player B ---
  if (votedForSkill === "playerA" && votedForIconic === "playerA" && votedForGoat === "playerB") {
    return { 
      title: "技术美学俘虏", 
      emoji: "🦷", 
      description: `技术和经典时刻都给了${nameA}，但 GOAT 最后还是给了${nameB}。你的理智在跟你的审美打架，伤口在心里，赛后还得硬挤出一句「没事，其实${nameB}才是历史第一」。`, 
      color: "text-blue-400" 
    };
  }

  // --- Split personality: clutch=playerB but loyalty=playerA ---
  if (votedForClutch === "playerB" && votedForLoyalty === "playerA") {
    return { 
      title: "逻辑自我盾对决", 
      emoji: "🤯", 
      description: `${nameA}更忠诚但关键球更差？你的投票逻辑像一场点球大战——左脑踢左边，右脑踢右边，最后球打到门柱弹回来砸自己脸上。`, 
      color: "text-purple-400" 
    };
  }

  // --- Stubborn Player A fan: gave MVP + finals to Player B but won't switch ---
  if (votedForFinals === "playerB" && votedForMvp === "playerB" && side === "playerA") {
    return { 
      title: `倔强型${nameA}粉`, 
      emoji: "😤", 
      description: `硬核荣誉和大场面都给了${nameB}，但立场纹丝不动。你的嘴硬程度堪比主教练发布会——虽然数据全输了还能面不改色地说「我们控制了比赛」。`, 
      color: "text-accent-color-a" 
    };
  }

  // --- Reverse stubborn: Player B fan who gave clutch + mentality + loyalty to Player A ---
  if (votedForClutch === "playerA" && votedForMentality === "playerA" && votedForLoyalty === "playerA" && side === "playerB") {
    return { 
      title: `倔强型${nameB}粉`, 
      emoji: "😤", 
      description: `关键球、精神力、忠诚全投了${nameA}——你内心住着一个${nameA}吹但嘴上偏要喊支持${nameB}。这叫什么？傲娇？嘴上不承认但身体很诚实。`, 
      color: "text-accent-color-b" 
    };
  }

  // --- High-loyalty Player B fan who concedes defense to Player A ---
  if (side === "playerB" && loyalty >= 0.75 && votedForDefense === "playerA") {
    return { 
      title: `${nameB}的理性拥趸`, 
      emoji: "🦵", 
      description: `大部分票都给${nameB}，但回防和防守你诚实地给了${nameA}——这点在铁粉里很罕见。每次进攻你都极度狂热，但你心里其实知道两边的优缺点。诚实是好事。`, 
      color: "text-accent-color-b" 
    };
  }

  // --- Fan who gave loyalty + teammates to Player B ---
  if (side === "playerA" && votedForLoyalty === "playerB" && votedForTeammates === "playerB") {
    return { 
      title: `${nameA}的动摇信徒`, 
      emoji: "🐷", 
      description: `选了${nameA}的边，但忠诚度和队友功劳都送给了${nameB}。你这跟背叛老东家一个味儿——区别是人家拿了高薪合同，你连球衣都没换。`, 
      color: "text-red-400" 
    };
  }

  // --- Fan who gave finals AND clutch to Player B ---
  if (side === "playerA" && votedForFinals === "playerB" && votedForClutch === "playerB") {
    return { 
      title: `大场面冷酷判官`, 
      emoji: "⚰️", 
      description: `${nameA}粉身份，但关键球和大场面都给了${nameB}——你这是亲自给心爱球员的防线挖坑。大赛决赛他没赢，可能就是输给你这种投票逻辑。`, 
      color: "text-red-400" 
    };
  }

  // --- Gave finals + iconic to Player B but mvp to Player A ---
  if (votedForFinals === "playerB" && votedForIconic === "playerB" && votedForMvp === "playerA") {
    return { 
      title: "经典名场面信徒", 
      emoji: "🛩️", 
      description: `决赛和经典时刻一并给了${nameB}，但个人荣誉你又承认是${nameA}的——这逻辑你打算怎么在球友群里圆过去？`, 
      color: "text-yellow-400" 
    };
  }

  // --- Clutch to Player A but finals to Player B ---
  if (votedForClutch === "playerA" && votedForFinals === "playerB") {
    return { 
      title: "大场面选择困难症", 
      emoji: "🌫️", 
      description: `关键球承认${nameA}，决赛却给${nameB}——所以大赛决赛不算关键球？你的脑回路比 VAR 画越位线还复杂。`, 
      color: "text-purple-400" 
    };
  }

  // --- MVP to Player A but goat to Player B ---
  if (votedForMvp === "playerA" && votedForGoat === "playerB") {
    return { 
      title: "硬荣誉否定派", 
      emoji: "🏆", 
      description: `金球与顶级个人荣誉承认是${nameA}的，但 GOAT 给了${nameB}——那荣誉评的到底是什么？最佳模特？你这逻辑递交评委会，他们能气得当场宣布大奖停办。`, 
      color: "text-blue-400" 
    };
  }

  // --- The contrarian: defense=playerB but era+iconic=playerA ---
  if (votedForDefense === "playerB" && votedForEra === "playerA" && votedForIconic === "playerA") {
    return { 
      title: "绿茵反向人", 
      emoji: "🤡", 
      description: `防守给了${nameB}但影响力和经典时刻给了${nameA}——每道题都精准避开主流答案。你在论坛的评论一定是那种零赞几十回复、盖了上百层楼的类型。`, 
      color: "text-yellow-400" 
    };
  }

  // --- The betrayer: Player A fan who gave rings to Player B ---
  if (side === "playerA" && votedForRings === "playerB" && votedForGoat === "playerA") {
    return { 
      title: "精神胜利法大师", 
      emoji: "🏅", 
      description: `国家队大赛荣誉给了${nameB}但 GOAT 给了${nameA}——你这是直接把大赛金杯涂掉重画？逻辑闭环跳得极其魔幻。`, 
      color: "text-accent-color-a" 
    };
  }

  // --- High loyalty ---
  if (loyalty >= 0.75) {
    return side === "playerA"
      ? { 
          title: `${nameA}的正统门徒`, 
          emoji: "🔥", 
          description: `大部分轮次站${nameA}，偶尔也承认对面有道理。你是粉丝里难得的清醒派——虽然你在社区里客观分析一句就会被同阵营狂热粉追着骂。坚持做自己！`, 
          color: "text-accent-color-a" 
        }
      : { 
          title: `${nameB}的理性拥趸`, 
          emoji: "⚡", 
          description: `大部分投了${nameB}但不是无脑吹。你是那种理性看球、重视战术和客观数据的人。在混乱的评论区里，你就是那个被双方拉拢的理智派。`, 
          color: "text-accent-color-b" 
        };
  }

  // --- Moderate loyalty ---
  if (loyalty >= 0.4 && loyalty <= 0.6) {
    return { 
      title: "绿茵金哨裁判", 
      emoji: "⚖️", 
      description: `两边投得极度均衡——你就像绿茵场上的 VAR 游标卡尺一样客观精准，不带个人偏见，只尊重纯粹的事实与逻辑。在狂热的球迷口水战中，你是最珍贵的理智守护者，每一项评分都经过了你严密的权衡。`, 
      color: "text-emerald-400" 
    };
  }

  return { 
    title: "理性分析派", 
    emoji: "⚖️", 
    description: `两边都投了不少，没有明显的单边偏向——你要么是真正的绿茵哲学家，要么就是看哪边论点排版更顺眼就选哪边。大概率是后者。`, 
    color: "text-white" 
  };
}

export function getRoast(
  side: Side, 
  votes: Vote[],
  nameA: string = "梅西",
  nameB: string = "C罗"
): string {
  const patterns: string[] = [];

  const v = (id: string) => votes.find((x) => x.topicId === id)?.winner;

  // --- Trash-talk patterns ---

  if (v("clutch") === "playerA" && v("finals") === "playerB") {
    patterns.push(`关键球投了${nameA}，大场面投了${nameB}？所以${nameA}关键球很强但决赛大场面不行？那大赛决赛是 PS 的？决赛打门是空气进的？你这投票自己打自己脸了知道吗。`);
  }

  if (v("skill") === "playerA" && v("mvp") === "playerB") {
    patterns.push(`技术投了${nameA}，个人荣誉投了${nameB}？你在说一个技术更差的人拿了更多金靴和金球？那荣誉评的是什么？选美大赛？你的逻辑已经被防线彻底铲碎了。`);
  }

  if (v("mentality") === "playerA" && v("goat") === "playerB") {
    patterns.push(`精神力投了${nameA}，GOAT 投了${nameB}？所以心态最稳的不是最伟大的？那${nameB}的硬汉自律人设是用来干嘛的？发图秀腹肌？精神力含金量被你亲手扔进垃圾桶。`);
  }

  if (v("loyalty") === "playerA" && v("teammates") === "playerB") {
    patterns.push(`忠诚给${nameA}，队友给${nameB}？一辈子留在母队的人比换了五家俱乐部的人队友配置还差？那忠诚有什么用？感动自己？${nameA}看到你这投票直接想挂靴。`);
  }

  if (v("defense") === "playerA" && v("era") === "playerB") {
    patterns.push(`回防给${nameA}，时代影响力给${nameB}？防守卖力的人影响力更小？那${nameB}几亿粉丝是怎么来的？是不是你买的？你这投票连预备队的战术板都上不去。`);
  }

  if (side === "playerA" && v("rings") === "playerB") {
    patterns.push(`你作为${nameA}粉，连国家队大赛荣誉都没投给${nameA}？你确定看球了？还是说你心里早就投奔对面了，只是嘴上不承认？`);
  }

  if (side === "playerB" && v("clutch") === "playerA") {
    patterns.push(`你站${nameB}，却承认${nameA}关键球更强？那最后一秒生死点球你把球给谁？你嘴上支持${nameB}，但你的手已经把球递给${nameA}去主罚了。这倒戈速度比防守反击还快。`);
  }

  if (v("rings") === "playerA" && v("goat") === "playerB") {
    patterns.push(`国家队荣誉给了${nameA}但 GOAT 给了${nameB}？所以最硬的国家队荣誉不是 GOAT 标准？那 GOAT 是看谁社交媒体粉丝多？还是看俱乐部虐菜？你自己都不知道你在投啥。`);
  }

  if (v("iconic") === "playerA" && v("finals") === "playerB") {
    patterns.push(`经典时刻给了${nameA}，大场面决赛给了${nameB}？你觉得${nameA}的高光都不在决赛？那些欧冠决赛和国家队大赛决赛进球你当不存在？你是不是只看了两部过人集锦就以为是全部？`);
  }

  if (side === "playerB" && v("loyalty") === "playerA" && v("mentality") === "playerA") {
    patterns.push(`你作为${nameB}粉，把忠诚和精神力都投给了${nameA}？你是不是觉得${nameB}就是个雇佣兵打工的？合同到期就撤、钱给得多就去？你这哪是球迷，你是对方的卧底。`);
  }

  if (side === "playerA" && v("mvp") === "playerB" && v("goat") === "playerB") {
    patterns.push(`金球和 GOAT 都给了${nameB}你还说自己粉${nameA}？最有含金量的两个硬指标全送对面。你不是死忠，你是最大的黑粉，俱乐部行政部请你当场删号。`);
  }

  if (v("skill") === "playerB" && v("clutch") === "playerB" && v("defense") === "playerB") {
    patterns.push(`技术、关键球、回防防守三项全投了${nameB}？你觉得${nameA}在球场上干什么？卖萌？你把足球最核心的三项能力全给了对面，${nameA}看了直接把球衣撕了。`);
  }

  if (v("era") === "playerA" && v("teammates") === "playerB" && v("goat") === "playerB") {
    patterns.push(`时代影响力给${nameA}，但队友配置和 GOAT 给${nameB}？所以影响力最大的人反而不是 GOAT？那影响力影响了个啥？影响了大家哭一场然后投票还是投对面？这逻辑能上辩论大专杯了。`);
  }

  if (v("mentality") === "playerB" && v("loyalty") === "playerB" && side === "playerA") {
    patterns.push(`精神力和忠诚都投了${nameB}？你作为${nameA}粉，把心态和坚守两张大牌全交给对面。${nameA}在场上看着你直摇头，估计在想：这哥们是不是走错主场了？`);
  }

  if (v("clutch") === "playerB" && v("rings") === "playerA") {
    patterns.push(`关键球给了${nameB}但国家队大赛荣誉给了${nameA}？所以关键球更强的人反而在最大场面拿不到金牌？你在暗示谁关键时刻隐身呢？`);
  }

  if (v("iconic") === "playerB" && v("skill") === "playerA") {
    patterns.push(`经典时刻给了${nameB}，技术给了${nameA}？你是说技术不行的人能创造经典名场面？那你倒说说，除了身体硬吃，对面还有哪个被全球公认的“技术微操名场面”？没有就别投这一票。`);
  }

  // --- Fallback ---

  if (patterns.length === 0) {
    if (side === "playerA") {
      return `你的投票倒是没什么自相矛盾——但你坚坚定定支持${nameA}这件事，在目前的球迷圈里毫无悬念。硬核战绩摆这了，你站他就跟说“地球是圆的”一样不需要论证。来点真的分析好吗？`;
    }
    return `你的投票逻辑自洽——跟追求高薪的雇佣兵合同一样自洽：哪里能赢去哪里。安全、稳健、但就是缺一点点足球情怀。你这种球迷就是商业球队最喜欢的类型——闷头看，不质疑，按时打卡高呼万岁。`;
  }

  return patterns[Math.floor(Math.random() * patterns.length)];
}

export interface StatBomb {
  stat: string;
  source: string;
  side: Side;
}

export const matchupStatBombs: Record<string, Record<string, StatBomb[]>> = {
  "messi-vs-ronaldo": {
    rings: [
      { stat: "C罗国家队大赛冠军只有 2 个（2016 欧洲杯+2019 欧国联），且 2016 决赛第 25 分钟就受伤下场，奖杯一半算埃德尔的。", source: "UEFA 官方", side: "playerA" },
      { stat: "梅西国家队前 14 年颗粒无收，3 次大赛决赛全输（2007 美洲杯/2014 世界杯/2015、2016 美洲杯），被全阿根廷骂叛徒。", source: "Conmebol 历史", side: "playerB" },
    ],
    clutch: [
      { stat: "梅西 2022 世界杯淘汰赛阶段 4 场 4 球 3 助攻，决赛点球大战首罚命中——这才是真正的大心脏。", source: "FIFA 官方数据", side: "playerA" },
      { stat: "C罗 2018 世界杯八强出局、2022 世界杯八强出局，两届淘汰赛阶段合计 0 个运动战进球。", source: "FIFA 技术报告", side: "playerB" },
    ],
    skill: [
      { stat: "梅西生涯过人成功次数 2400+，欧洲五大联赛历史第一，是第二名（C罗）的两倍以上。", source: "Opta 历史数据", side: "playerA" },
      { stat: "C罗职业生涯头球进球超过 145 个，是梅西头球进球（30+）的近 5 倍——空中霸权碾压。", source: "Transfermarkt", side: "playerB" },
    ],
    mvp: [
      { stat: "梅西 8 座金球奖（2009/2010/2011/2012/2015/2019/2021/2023），比 C 罗多 3 座。", source: "France Football", side: "playerA" },
      { stat: "C罗 2008 金球年他英超进球 31 个、欧冠 8 球助曼联欧冠夺冠——梅西同年只拿 16 球。", source: "法新社", side: "playerB" },
    ],
    mentality: [
      { stat: "梅西 2016 美洲杯因决赛失利崩溃而短暂退出国家队——心态脆弱性可见一斑。", source: "TyC Sports", side: "playerB" },
      { stat: "C罗 35 岁后体脂率仍维持在 7%，每天比队友早到 90 分钟训练——这种自律梅西做不到。", source: "尤文图斯队医访谈", side: "playerB" },
    ],
    defense: [
      { stat: "梅西生涯每 90 分钟跑动 8.3 公里，比 C 罗（9.2 公里）少一公里——你管这叫努力踢球？", source: "Whoscored", side: "playerB" },
      { stat: "C罗近 5 个赛季回防数据进入欧洲前锋后 15%——所谓自律不包括防守。", source: "Opta 高级数据", side: "playerA" },
    ],
    finals: [
      { stat: "梅西欧冠决赛 3 战 3 胜且在 2009、2011 决赛取得 2 球，主宰曼联防线。", source: "UEFA 官方", side: "playerA" },
      { stat: "C罗欧冠决赛 3 战 3 球，2017 加迪夫决赛梅开二度——单决赛进球数力压梅西。", source: "UEFA 官方", side: "playerB" },
    ],
    teammates: [
      { stat: "梅西巴萨时期队友有哈维、伊涅斯塔、苏亚雷斯、内马尔——MSN+宇宙队，你说他没帮手？", source: "Transfermarkt 阵容史", side: "playerB" },
      { stat: "C罗去尤文第二年带队欧冠被里昂淘汰，去曼联第二年带队第六踢欧联杯——没有顶级阵容就是不行。", source: "懂球帝战绩库", side: "playerA" },
    ],
    era: [
      { stat: "梅西迈阿密国际门票均价上涨 1700%，加盟首场比赛 MLS 俱乐部老板贝克汉姆+PlayerB+卡戴珊全到场。", source: "Forbes 2023", side: "playerA" },
      { stat: "C罗 INS 粉丝 6.5 亿，是 Instagram 第一人——梅西 5.0 亿排第二。", source: "Social Blade", side: "playerB" },
    ],
    iconic: [
      { stat: "梅西 2007 国王杯过 5 人复刻马拉多纳「世纪进球」——这是足球历史教科书级镜头。", source: "马卡报评选", side: "playerA" },
      { stat: "C罗 2018 欧冠对尤文图斯倒钩——尤文主场球迷起立鼓掌的传奇瞬间。", source: "UEFA 官方评选", side: "playerB" },
    ],
    goat: [
      { stat: "ESPN 2024 全球记者投票 GOAT 评选：梅西 79% vs C罗 12%，差距悬殊。", source: "ESPN GOAT Poll 2024", side: "playerA" },
      { stat: "C罗职业生涯总进球 900+，男足历史第一人——绝对数量上无人能及。", source: "RSSSF 历史进球榜", side: "playerB" },
    ],
    loyalty: [
      { stat: "梅西在巴萨踢了 21 年（2000-2021），效力时间是 C 罗最长俱乐部（曼联 6 年）的 3.5 倍。", source: "Transfermarkt 合同史", side: "playerA" },
      { stat: "梅西 2020 年也曾递交转会申请要离开巴萨——所谓一人一城是被财政逼走的，不是主动留下。", source: "西班牙体育报", side: "playerB" },
    ],
    whatif_swap: [
      { stat: "梅西 2020 年逼宫要走时，巴萨财政崩盘后没人接得起他的工资——所谓忠诚不过是没人买得起。", source: "ESPN FC 2021 报道", side: "playerB" },
      { stat: "C罗 2009 离开曼联后曼联 9 年欧冠 0 个 4 强——他走后球队直接垫底，证明带带能力真实存在。", source: "懂球帝战绩库", side: "playerA" },
    ],
    whatif_era: [
      { stat: "00 年代防守强度比现在高 30%，铲球规则更宽松——梅西在 06-12 年那种环境下依然过人 2400+，含金量翻倍。", source: "Opta 时代修正", side: "playerA" },
      { stat: "现代足球前锋平均寿命延长 4-5 年——C 罗 39 岁还能进球部分要归功于运动科学进步，时代红利。", source: "FIFA 医疗报告 2024", side: "playerB" },
    ],
    whatif_1v1: [
      { stat: "梅西生涯 1v1 突破成功率 58%，欧洲五大联赛历史前锋第一——单挑场景下无解。", source: "Opta 突破数据", side: "playerA" },
      { stat: "C罗生涯空中对抗成功率 73%，禁区内身体对抗压制——单挑高空球梅西没得比。", source: "Whoscored 对抗数据", side: "playerB" },
    ],
  },
  "pele-vs-maradona": {
    rings: [
      { stat: "贝利拥有 3 座世界杯冠军，是足球历史唯一达成此神迹的球员。", source: "FIFA 官方", side: "playerA" },
      { stat: "马拉多纳在 1986 年以 5 球 5 助攻几乎凭借单兵统治整届世界杯夺冠，孤胆英雄的巅峰表现。", source: "Conmebol 历史", side: "playerB" },
    ],
    clutch: [
      { stat: "马拉多纳在 1986 年 1/4 决赛对阵英格兰打入著名的世纪进球与上帝之手，生死关头无可阻挡。", source: "阿根廷历史库", side: "playerB" },
      { stat: "贝利在 1958 年决赛年仅 17 岁梅开二度，1970 决赛首开纪录并奉献惊世直塞。", source: "FIFA 官方", side: "playerA" },
    ],
    skill: [
      { stat: "马拉多纳魔幻的左脚盘带和人球合一是世界足球史浪漫主义的顶峰。", source: "马卡报", side: "playerB" },
      { stat: "贝利是技术完美的六边形战士，左右脚和头球全面无短板。", source: "FIFA 历史", side: "playerA" },
    ],
  },
  "zidane-vs-r9": {
    rings: [
      { stat: "齐达内率领法国连夺 1998 世界杯和 2000 欧洲杯，是国家队大满贯的绝对中场领袖。", source: "FFF 官方", side: "playerA" },
      { stat: "罗纳尔多一辈子没有摸过欧冠奖杯，而齐达内拥有 2002 决赛的惊天「天外飞仙」欧冠绝杀。", source: "UEFA 官方", side: "playerA" },
    ],
    clutch: [
      { stat: "齐达内 1998 决赛头球双响，2002 决赛天外飞仙，大场面属性无可匹敌。", source: "队报", side: "playerA" },
      { stat: "罗纳尔多在 2002 年世界杯从毁灭性膝伤废墟中站起，斩获 8 球夺冠上演王者救赎。", source: "FIFA 官方", side: "playerB" },
    ],
  }
};

export function getStatBombsForMatchup(matchupId: string | null): Record<string, StatBomb[]> {
  const defaultBombs = matchupStatBombs["messi-vs-ronaldo"];
  if (!matchupId) return defaultBombs;

  const key = matchupStatBombs[matchupId] ? matchupId : "messi-vs-ronaldo";
  const bombs = matchupStatBombs[key];

  return new Proxy(bombs, {
    get: (target, prop) => {
      const p = prop as string;
      if (target[p]) return target[p];
      return defaultBombs[p] || [];
    }
  }) as unknown as Record<string, StatBomb[]>;
}
