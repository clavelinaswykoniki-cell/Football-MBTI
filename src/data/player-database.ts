// ─────────────────────────────────────────────────────────────
// Player Database — 30 Football Legends for Custom Matchup System
// ─────────────────────────────────────────────────────────────
// Combines current-era top popularity + all-time historical status.
// Stats are career approximate values (well-known figures).
// All descriptive content in Chinese; code/comments in English.

export interface PlayerStats {
  goals: number;
  assists: number;
  appearances: number;
  ballonDor: number;
  championsLeague: number;
  leagueTitles: number;
  worldCup: number;
  internationalGoals: number;
  internationalCaps: number;
  goldenBoot: number;
}

export interface Player {
  id: string;
  name: string;
  nameCN: string;
  number: string;
  nickname: string;
  nicknameCN: string;
  color: string;
  era: string;
  position: string;
  stats: PlayerStats;
  achievements: string[];
  style: string;
  strengths: string[];
  controversies: string[];
  quote: string;
  philosophicalAngle: string;
}

// ─────────────────────────────────────────────────────────────
// The 30 Legends
// ─────────────────────────────────────────────────────────────

export const players: Player[] = [
  // ── 1. Lionel Messi ──
  {
    id: "messi",
    name: "Lionel Messi",
    nameCN: "莱昂内尔·梅西",
    number: "#10",
    nickname: "La Pulga",
    nicknameCN: "跳蚤",
    color: "messi-blue",
    era: "2000s-2020s",
    position: "RW/CF",
    stats: { goals: 720, assists: 360, appearances: 860, ballonDor: 8, championsLeague: 4, leagueTitles: 12, worldCup: 1, internationalGoals: 109, internationalCaps: 187, goldenBoot: 6 },
    achievements: [
      "8座金球奖——足球史上最多，远超所有人",
      "2022年世界杯冠军——卡塔尔决赛独造3球，封神之战",
      "巴萨单赛季91球——2012年打破盖德·穆勒尘封40年纪录",
      "4次欧冠冠军——巴萨梦二梦三王朝核心",
      "6次欧洲金靴——历史最多，进球效率无人能及",
      "职业生涯720+俱乐部进球360+助攻——攻守兼备的极致",
    ],
    style: "左脚魔术师，盘带如呼吸般自然，传球精准如外科手术。不需要花哨的庆祝动作——进球就是他的语言，助攻是他的标点。",
    strengths: [
      "盘带——低重心+爆发力，人球合一的极致体现",
      "视野——助攻王级别的传球能力，大师级最后一传",
      "射术——左脚任意球+内切远射，禁区内外无死角",
      "稳定性——连续15年30+进球赛季，从不断电",
    ],
    controversies: [
      "长期国家队无冠——2014决赛功亏一篑，多次美洲杯折戟",
      "税务问题——2017年因逃税被判刑21个月（缓刑）",
      "离开巴萨——2021年被迫离队，忠诚叙事碎裂",
    ],
    quote: "我不是来当最好的。我是来享受足球的。如果足球给了我奖杯，那是额外的礼物。",
    philosophicalAngle: "足球诗人——比赛是即兴创作，球场是画布，进球和助攻都是艺术品",
  },

  // ── 2. Cristiano Ronaldo ──
  {
    id: "ronaldo-cr7",
    name: "Cristiano Ronaldo",
    nameCN: "克里斯蒂亚诺·罗纳尔多",
    number: "#7",
    nickname: "CR7",
    nicknameCN: "C罗",
    color: "ronaldo-red",
    era: "2000s-2020s",
    position: "LW/ST",
    stats: { goals: 735, assists: 230, appearances: 950, ballonDor: 5, championsLeague: 5, leagueTitles: 7, worldCup: 0, internationalGoals: 135, internationalCaps: 215, goldenBoot: 4 },
    achievements: [
      "国际比赛进球纪录保持者——135球历史第一",
      "5座欧冠奖杯——跨曼联和皇马两个王朝",
      "5座金球奖——英超+西甲+意甲三联赛进球王",
      "2016年欧洲杯冠军——葡萄牙队史首座大赛奖杯",
      "皇马历史最佳射手——450球遥遥领先",
      "单赛季欧冠17球——淘汰赛全程进球的外星人",
    ],
    style: "从花哨边锋进化为终极射手，空中霸主+禁区杀手+任意球大师。用自律和训练把天赋打磨到极限——肉体凡胎的天花板。",
    strengths: [
      "头球——弹跳+滞空，空中统治力历史级",
      "射门——双脚远射+头球+点球，全方位得分手段",
      "身体素质——1米87的身体+极致自律，40岁仍是顶级射手",
      "大赛基因——欧冠淘汰赛67球历史第一，越到关键越强",
    ],
    controversies: [
      "世界杯无冠——2022年四分之一决赛被淘汰，国家队最大遗憾",
      "2018年逃税——被罚1900万欧元",
      "职业末期去沙特联赛——竞技水平争议",
    ],
    quote: "天赋不够就用努力补。努力不够就用更多努力补。没有捷径。",
    philosophicalAngle: "自律机器——足球是意志力的游戏，天赋有上限，努力没有",
  },

  // ── 3. Pelé ──
  {
    id: "pele",
    name: "Pelé",
    nameCN: "贝利",
    number: "#10",
    nickname: "O Rei",
    nicknameCN: "球王",
    color: "pele-yellow",
    era: "1950s-1970s",
    position: "CF/SS",
    stats: { goals: 680, assists: 200, appearances: 700, ballonDor: 0, championsLeague: 0, leagueTitles: 6, worldCup: 3, internationalGoals: 77, internationalCaps: 92, goldenBoot: 0 },
    achievements: [
      "3届世界杯冠军——1958/1962/1970，唯一一人",
      "17岁世界杯决赛梅开二度——足球史上最早的超级巨星",
      "职业生涯680+进球——桑托斯时代的进球机器",
      "1970年巴西队被称为'史上最伟大球队'的核心",
      "FIFA授予'世纪球员'——官方认证的20世纪最佳",
      "让足球成为真正的世界第一运动——文化影响力超越体育",
    ],
    style: "足球界的第一个超级巨星，全能前锋的原始模板。速度、力量、技术、射门、头球——在那个年代，贝利就是足球本身。",
    strengths: [
      "全能——速度+力量+技术+射门+头球，无短板的完美前锋",
      "世界杯——3冠军是任何球员都无法企及的高峰",
      "少年天才——17岁就站上了世界之巅",
      "文化影响——让足球从运动变成全球宗教",
    ],
    controversies: [
      "时代差异——1960年代竞争烈度和现代不可同日而语",
      "进球数争议——部分进球来自非正式比赛，统计口径不一",
      "没有欧洲联赛经历——一辈子在巴西联赛打球",
    ],
    quote: "足球是上帝赐给我的礼物。每一个进球都是对他的感恩。",
    philosophicalAngle: "足球之神——足球不需要复杂的战术理论，天赋就是最好的战术",
  },

  // ── 4. Diego Maradona ──
  {
    id: "maradona",
    name: "Diego Maradona",
    nameCN: "迭戈·马拉多纳",
    number: "#10",
    nickname: "El Pibe de Oro",
    nicknameCN: "上帝之子",
    color: "maradona-blue",
    era: "1980s-1990s",
    position: "CAM/SS",
    stats: { goals: 260, assists: 150, appearances: 490, ballonDor: 0, championsLeague: 0, leagueTitles: 1, worldCup: 1, internationalGoals: 34, internationalCaps: 91, goldenBoot: 0 },
    achievements: [
      "1986世界杯——单人扛着阿根廷夺冠，世纪最佳个人表现",
      "'上帝之手'+世纪进球——同一场比赛两个历史时刻",
      "带那不勒斯夺意甲——让一支中下游球队击败尤文米兰",
      "1986世界杯金球奖——5球5助攻的疯狂表演",
      "两次创造世界转会费纪录——足球商业化的推动者",
      "阿根廷民族英雄——地位超越体育本身",
    ],
    style: "左脚精灵，矮小身体里装着足球史上最大的心脏。盘带、传球、射门——马拉多纳不是在踢球，是在表演足球的极限可能。",
    strengths: [
      "盘带——世纪进球连过5人，足球史上最伟大的60米",
      "领袖气质——一个人就能改变一支球队的命运",
      "创造力——左脚传球和射门角度匪夷所思",
      "大赛表现——世界杯赛场上的绝对统治者",
    ],
    controversies: [
      "上帝之手——用手打进的进球，公平竞赛争议至今",
      "毒品丑闻——1994世界杯药检阳性被禁赛",
      "私生活混乱——酗酒、吸毒、多段争议关系",
    ],
    quote: "我在球场上犯过错，但足球从来没有惩罚过我。",
    philosophicalAngle: "天才叛逆者——足球是穷人的战争，用一只左脚对抗整个世界",
  },

  // ── 5. Zinédine Zidane ──
  {
    id: "zidane",
    name: "Zinédine Zidane",
    nameCN: "齐内丁·齐达内",
    number: "#10",
    nickname: "Zizou",
    nicknameCN: "齐祖",
    color: "zidane-white",
    era: "1990s-2000s",
    position: "CAM",
    stats: { goals: 125, assists: 150, appearances: 680, ballonDor: 1, championsLeague: 1, leagueTitles: 2, worldCup: 1, internationalGoals: 31, internationalCaps: 108, goldenBoot: 0 },
    achievements: [
      "1998世界杯决赛梅开二度——在本土登基为王",
      "2002欧冠决赛天外飞仙——左脚凌空抽射载入史册",
      "1座金球奖+3次FIFA年度最佳——十年内最佳中场",
      "世界杯+欧洲杯双冠——法国足球黄金时代的灵魂",
      "执教皇马三连欧冠——球员教练双重传奇",
      "马赛回旋成为足球技术的代名词",
    ],
    style: "优雅的化身，球到了齐达内脚下就像黏住了一样。马赛回旋、外脚背传球——每一次触球都是芭蕾舞般的精准和美感。",
    strengths: [
      "控球——第一脚触球史上最完美，球像黏在脚上",
      "大赛球员——世界杯+欧洲杯+欧冠决赛全部高光",
      "优雅——马赛回旋、外脚背，技术美感无人能及",
      "关键球——越到大场面越冷静越致命",
    ],
    controversies: [
      "2006世界杯决赛头顶马特拉齐——最后一舞变成最后一撞",
      "红牌大师——职业生涯14张红牌，脾气暴躁",
      "荣誉不够多——只有1座金球奖+1座欧冠，低于同级球员",
    ],
    quote: "足球是我表达自己的方式。当我踢球的时候，我是自由的。",
    philosophicalAngle: "足球美学——技术是优雅的极致，每一脚触球都应该是一件艺术品",
  },

  // ── 6. Ronaldo Nazário ──
  {
    id: "ronaldo-r9",
    name: "Ronaldo Nazário",
    nameCN: "罗纳尔多·纳扎里奥",
    number: "#9",
    nickname: "O Fenômeno",
    nicknameCN: "外星人",
    color: "r9-yellow",
    era: "1990s-2000s",
    position: "ST",
    stats: { goals: 295, assists: 80, appearances: 450, ballonDor: 2, championsLeague: 0, leagueTitles: 1, worldCup: 2, internationalGoals: 62, internationalCaps: 98, goldenBoot: 2 },
    achievements: [
      "2次世界杯冠军——1994年（替补）+2002年金靴射手",
      "2座金球奖——20岁拿第一座，史上最年轻级别",
      "2002世界杯8球——阿福头造型征服全世界",
      "巅峰期被公认为'足球史上最强单兵'",
      "3次FIFA年度最佳——跨巴萨、国米、皇马三个时代",
      "膝盖两次重伤后依然能回到世界之巅——意志力的奇迹",
    ],
    style: "外星人不是绰号，是事实描述。速度、力量、技术、射门全部拉满——巅峰大罗带球冲刺的时候，地球上没有后卫能拦住他。",
    strengths: [
      "爆发力——零到百米加速+带球速度，后卫的噩梦",
      "射门——门前嗅觉极致，任何角度都能破门",
      "全面性——能突能射能做球，前锋模板的天花板",
      "世界杯——2届冠军+15球，大赛之王",
    ],
    controversies: [
      "伤病——膝盖十字韧带两断，巅峰被偷走至少5年",
      "体重管理——后期体重失控，自律性存疑",
      "0座欧冠——俱乐部层面最高荣誉缺失",
    ],
    quote: "上帝给了我踢球的天赋，然后给了我考验天赋的膝盖。",
    philosophicalAngle: "天赋的极限——足球是天才的独舞，最纯粹的天赋可以碾压一切战术",
  },

  // ── 7. Ronaldinho ──
  {
    id: "ronaldinho",
    name: "Ronaldinho Gaúcho",
    nameCN: "罗纳尔迪尼奥",
    number: "#10",
    nickname: "Dinho",
    nicknameCN: "小罗",
    color: "dinho-blue",
    era: "2000s",
    position: "CAM/LW",
    stats: { goals: 205, assists: 160, appearances: 540, ballonDor: 2, championsLeague: 1, leagueTitles: 2, worldCup: 1, internationalGoals: 33, internationalCaps: 97, goldenBoot: 0 },
    achievements: [
      "2次金球奖——2004/2005年连庄，公认最佳",
      "2002世界杯冠军——巴西队核心之一",
      "2006欧冠冠军——带巴萨重返欧洲之巅",
      "伯纳乌全场起立鼓掌——对手球迷向他致敬，足球史上罕见",
      "2005年国际足联年度最佳——那两年地球上没人比他踢球好看",
      "牛尾巴过人成为足球文化的图腾级技术动作",
    ],
    style: "足球场上的魔术师，带着微笑玩花活。牛尾巴、不看人传球、踩单车——小罗踢球不是为了赢，是为了让所有人都开心，包括对手。",
    strengths: [
      "创造力——不按套路出牌，每一脚都是即兴发挥",
      "快乐足球——让队友、观众甚至对手都享受比赛",
      "技术——牛尾巴、假传真射、不看人传球，花活之王",
      "影响力——让一代人爱上足球",
    ],
    controversies: [
      "巅峰太短——真正统治级只有3-4年就迅速下滑",
      "自律性差——夜店文化、体重失控导致提前退化",
      "职业态度——巴萨因纪律问题将他出售",
    ],
    quote: "足球应该是快乐的。当你不再快乐，你就不再是自己了。",
    philosophicalAngle: "快乐足球——踢球不是工作，是游戏。让所有人开心才是足球的意义",
  },

  // ── 8. Kaká ──
  {
    id: "kaka",
    name: "Kaká",
    nameCN: "卡卡",
    number: "#22",
    nickname: "Ricky",
    nicknameCN: "卡卡",
    color: "kaka-red",
    era: "2000s",
    position: "CAM",
    stats: { goals: 170, assists: 100, appearances: 530, ballonDor: 1, championsLeague: 1, leagueTitles: 1, worldCup: 1, internationalGoals: 29, internationalCaps: 92, goldenBoot: 0 },
    achievements: [
      "2007年金球奖——打破梅罗二人垄断前的最后一位非梅罗得主",
      "2007欧冠冠军——半决赛+决赛全部进球，一己之力扛起AC米兰",
      "2002世界杯冠军——20岁入选巴西冠军队",
      "2007年欧冠金靴——10球碾压所有人",
      "AC米兰黄金时代的绝对核心",
      "皇马史上最贵转会之一——6500万欧元",
    ],
    style: "长途奔袭的闪电骑士，1米86的身高+惊人的加速度=后卫的终极噩梦。带球从中场狂奔到禁区一气呵成——优雅而致命。",
    strengths: [
      "速度——长途奔袭带球能力历史顶级",
      "射门——左右脚均衡，远射精准",
      "盘带——高速中的控球稳定性极强",
      "人品——足球先生中最儒雅的绅士",
    ],
    controversies: [
      "伤病——膝伤严重影响巅峰期，皇马时期大幅下滑",
      "巅峰太短——真正世界级只有2005-2007年",
      "皇马生涯失败——6500万身价未能兑现期望",
    ],
    quote: "我属于耶稣。（I belong to Jesus.）",
    philosophicalAngle: "优雅骑士——足球是带球狂奔的自由，速度和优雅可以共存",
  },

  // ── 9. Neymar ──
  {
    id: "neymar",
    name: "Neymar Jr.",
    nameCN: "内马尔",
    number: "#10",
    nickname: "Ney",
    nicknameCN: "内少",
    color: "neymar-yellow",
    era: "2010s-2020s",
    position: "LW/CAM",
    stats: { goals: 430, assists: 250, appearances: 620, ballonDor: 0, championsLeague: 1, leagueTitles: 6, worldCup: 0, internationalGoals: 79, internationalCaps: 128, goldenBoot: 0 },
    achievements: [
      "巴西国家队历史第二射手——79球仅次于贝利",
      "MSN组合核心——2015年与梅西苏亚雷斯组成史上最强三叉戟",
      "2015欧冠冠军——巴萨三冠王的关键一环",
      "2222万世界转会纪录——PSG用2.22亿欧元签下他",
      "桑巴足球新一代旗手——继承了巴西10号的荣光",
      "多次欧冠/联赛淘汰赛关键进球——大赛基因",
    ],
    style: "桑巴舞步的现代传人，花式过人是他的注册商标。彩虹过人、踩单车、穿裆——内马尔踢球永远在寻找让对手丢脸的方式。",
    strengths: [
      "盘带——花式过人库存无穷，突破成功率极高",
      "创造力——关键传球和任意球能力顶级",
      "大赛进球——欧冠和国家队比赛中屡有关键表现",
      "得分效率——430+俱乐部进球，射手级前腰",
    ],
    controversies: [
      "假摔——被公认为足球场上最爱假摔的球星",
      "伤病——频繁受伤缺席关键比赛，职业生涯断断续续",
      "PSG时期——2.22亿身价未能带来欧冠",
    ],
    quote: "足球是我的生命，但生活不仅仅是足球。",
    philosophicalAngle: "桑巴精灵——足球是街头的艺术，华丽就是力量",
  },

  // ── 10. Kylian Mbappé ──
  {
    id: "mbappe",
    name: "Kylian Mbappé",
    nameCN: "基利安·姆巴佩",
    number: "#7",
    nickname: "KM7",
    nicknameCN: "姆总",
    color: "mbappe-blue",
    era: "2010s-2020s",
    position: "LW/ST",
    stats: { goals: 300, assists: 120, appearances: 450, ballonDor: 0, championsLeague: 0, leagueTitles: 7, worldCup: 1, internationalGoals: 50, internationalCaps: 85, goldenBoot: 3 },
    achievements: [
      "2018世界杯冠军——19岁世界杯决赛进球，继贝利后最年轻",
      "2022世界杯决赛帽子戏法——尽管法国最终点球输了",
      "法甲7连冠核心——PSG时代的绝对王者",
      "加盟皇马——足球史上最受瞩目的自由转会",
      "多次法甲金靴——进球效率恐怖",
      "25岁已300+俱乐部进球——梅罗级别的数据轨迹",
    ],
    style: "速度怪兽，从零到极速只需一瞬。像一辆装了导弹的跑车——你知道他要突破，你知道他要射门，但你就是拦不住。",
    strengths: [
      "速度——人球结合速度可能是足球史上最快",
      "射门——左右脚均衡，近距离终结冷血",
      "大赛基因——世界杯已有12球，22岁就是世界杯金靴级别",
      "年轻——25岁已经有梅罗同龄时的数据量",
    ],
    controversies: [
      "0座金球奖——至今未获得个人最高荣誉",
      "0座欧冠——PSG时期多次在关键轮次出局",
      "皇马初期适应慢——转会后未能立即统治",
    ],
    quote: "我不想成为下一个谁。我要成为第一个姆巴佩。",
    philosophicalAngle: "速度就是一切——足球正在变得更快，谁最快谁就是未来的王",
  },

  // ── 11. David Beckham ──
  {
    id: "beckham",
    name: "David Beckham",
    nameCN: "大卫·贝克汉姆",
    number: "#7",
    nickname: "Becks",
    nicknameCN: "小贝",
    color: "beckham-red",
    era: "1990s-2000s",
    position: "RM",
    stats: { goals: 127, assists: 200, appearances: 720, ballonDor: 0, championsLeague: 1, leagueTitles: 6, worldCup: 0, internationalGoals: 17, internationalCaps: 115, goldenBoot: 0 },
    achievements: [
      "1999三冠王——曼联历史最伟大赛季的核心助攻手",
      "圆月弯刀任意球——重新定义了足球的弧线美学",
      "2001年对希腊最后一秒任意球——一脚把英格兰送进世界杯",
      "银河战舰成员——皇马巨星时代的招牌面孔",
      "创建迈阿密国际——从球员到老板的商业传奇",
      "足球史上最大的商业品牌——影响力超越任何球员",
    ],
    style: "右脚传中和任意球的艺术家——贝克汉姆的弧线球不是物理学，是魔法。加上完美的外表和商业嗅觉，他让足球变成了流行文化。",
    strengths: [
      "传中——右脚精准传中是足球史上的标杆",
      "任意球——圆月弯刀弧线，任意球进球数历史级",
      "商业影响——让足球进入流行文化和时尚界",
      "职业精神——从被红牌后的全国公敌到英格兰队长",
    ],
    controversies: [
      "技术有限——除了传中和任意球，其他技术维度不突出",
      "1998世界杯红牌——对阿根廷被罚下成为全国公敌",
      "商业大于足球——有人认为他的名气大于实力",
    ],
    quote: "我的右脚是上帝给我的礼物。其他一切都是我自己赚来的。",
    philosophicalAngle: "弧线之美——足球最美的瞬间是球在空中画出完美弧线的那一刻",
  },

  // ── 12. Luís Figo ──
  {
    id: "figo",
    name: "Luís Figo",
    nameCN: "路易斯·菲戈",
    number: "#10",
    nickname: "O Magnífico",
    nicknameCN: "菲戈",
    color: "figo-white",
    era: "1990s-2000s",
    position: "RW/CAM",
    stats: { goals: 115, assists: 160, appearances: 690, ballonDor: 1, championsLeague: 1, leagueTitles: 5, worldCup: 0, internationalGoals: 32, internationalCaps: 127, goldenBoot: 0 },
    achievements: [
      "2000年金球奖——当年度最佳球员",
      "足球史上最具争议的转会——从巴萨叛逃到皇马",
      "2002欧冠冠军——皇马银河战舰核心",
      "127次国家队出场——葡萄牙黄金一代的领袖",
      "西甲+意甲双赛区成功——巴萨+皇马+国米全部留下印记",
      "世纪叛逃诺坎普被扔猪头——足球最疯狂的一幕",
    ],
    style: "右路盘带之王，内切+传中+远射三位一体。菲戈在右边路的一对一几乎无人能挡——速度+脚下花活+选择正确，完美边锋。",
    strengths: [
      "盘带——右路一对一成功率极高",
      "传球——视野开阔，致命直塞和精准传中兼备",
      "大局观——进攻组织能力不输传统前腰",
      "领袖——葡萄牙队长，大赛中的定海神针",
    ],
    controversies: [
      "世纪叛逃——从巴萨转投皇马，被巴萨球迷视为叛徒",
      "诺坎普猪头事件——回巴萨踢球被扔猪头和瓶子",
      "世界杯无冠——2006半决赛输给法国，最接近的一次也没能夺冠",
    ],
    quote: "我离开巴塞罗那是因为我想赢得一切。我做到了。",
    philosophicalAngle: "野心驱动——足球是竞争，选择更强的舞台才能证明自己",
  },

  // ── 13. Thierry Henry ──
  {
    id: "henry",
    name: "Thierry Henry",
    nameCN: "蒂埃里·亨利",
    number: "#14",
    nickname: "Titi",
    nicknameCN: "亨利大帝",
    color: "henry-red",
    era: "2000s",
    position: "ST/LW",
    stats: { goals: 290, assists: 160, appearances: 580, ballonDor: 0, championsLeague: 1, leagueTitles: 4, worldCup: 1, internationalGoals: 51, internationalCaps: 123, goldenBoot: 3 },
    achievements: [
      "阿森纳不败赛季核心——2003-04赛季英超全赛季不败",
      "阿森纳历史最佳射手——228球的俱乐部纪录",
      "4次英超金靴——温格时代枪手的绝对王者",
      "1998世界杯+2000欧洲杯双冠——法国黄金时代核心",
      "2009欧冠冠军——巴萨六冠王成员",
      "从边锋改造为中锋的完美案例——温格的杰作",
    ],
    style: "优雅的射手，动作永远流畅如水。左脚内切+外脚背射门是招牌，高速中的从容是亨利独有的气质——快而不乱，帅而致命。",
    strengths: [
      "速度+优雅——高速奔跑中的冷静终结",
      "左脚射门——内切后外脚背弧线球，标志性进球方式",
      "全面性——进球+助攻双线输出，不只是射手",
      "大赛球员——世界杯+欧洲杯+欧冠全部夺冠",
    ],
    controversies: [
      "2009世预赛手球——用手把球传给队友导致法国晋级，爱尔兰冤屈",
      "0座金球奖——巅峰期被罗纳尔迪尼奥压制",
      "离开阿森纳——在枪手最需要他时去了巴萨",
    ],
    quote: "在阿森纳，我学会了如何从一个跑得快的人变成一个球员。",
    philosophicalAngle: "优雅杀手——进球不需要狰狞面孔，最致命的射手永远保持从容",
  },

  // ── 14. Zlatan Ibrahimović ──
  {
    id: "ibrahimovic",
    name: "Zlatan Ibrahimović",
    nameCN: "兹拉坦·伊布拉希莫维奇",
    number: "#11",
    nickname: "Ibracadabra",
    nicknameCN: "伊布",
    color: "ibra-black",
    era: "2000s-2020s",
    position: "ST",
    stats: { goals: 496, assists: 200, appearances: 760, ballonDor: 0, championsLeague: 0, leagueTitles: 13, worldCup: 0, internationalGoals: 62, internationalCaps: 122, goldenBoot: 0 },
    achievements: [
      "13座联赛冠军——横跨荷甲+意甲+西甲+法甲4国联赛",
      "职业生涯496俱乐部进球——进球数恐怖",
      "40岁AC米兰意甲冠军——老而弥坚的典范",
      "2012对英格兰倒钩——35米外的自行车射门，足球史上最佳进球之一",
      "瑞典历史最佳射手——62球国家队纪录",
      "跆拳道黑带——用武术招式踢足球的外星人",
    ],
    style: "1米95的身高+黑带级武术+杂耍般的脚法=足球界最独一无二的存在。倒钩、蝎子摆尾、后脚跟——伊布的进球方式需要重新定义物理学。",
    strengths: [
      "杂技式进球——倒钩+蝎子摆尾，进球方式超越想象",
      "身体素质——1米95+跆拳道黑带，空中和地面全能",
      "适应力——在荷甲意甲西甲法甲英超全部成功",
      "霸气——自信到狂妄，心理素质历史级",
    ],
    controversies: [
      "0座欧冠——13个联赛冠军却从未赢过欧冠",
      "巴萨失败——与瓜迪奥拉不和，巴萨生涯惨淡",
      "狂言——'我来之前这里是渔村'等言论惹争议",
    ],
    quote: "我来的时候，这里什么都没有。我走的时候，这里有了一座纪念碑。",
    philosophicalAngle: "自信即力量——足球需要霸气，嘴上说自己是神的人最终真的变成了神",
  },

  // ── 15. Erling Haaland ──
  {
    id: "haaland",
    name: "Erling Haaland",
    nameCN: "厄林·哈兰德",
    number: "#9",
    nickname: "The Terminator",
    nicknameCN: "哈兰德",
    color: "haaland-blue",
    era: "2020s",
    position: "ST",
    stats: { goals: 250, assists: 50, appearances: 300, ballonDor: 0, championsLeague: 1, leagueTitles: 4, worldCup: 0, internationalGoals: 35, internationalCaps: 40, goldenBoot: 2 },
    achievements: [
      "英超单赛季36球——2022-23赛季打破纪录",
      "2023欧冠冠军——曼城三冠王的进球核心",
      "欧冠最快进球纪录保持者——出道即巅峰",
      "英超最快50球/100球纪录——进球效率无人能及",
      "多特蒙德欧冠首秀帽子戏法——17岁一战成名",
      "24岁已250+俱乐部进球——对标梅罗同龄数据",
    ],
    style: "进球机器人，冷血终结者。不需要花活，不需要盘带——跑位+射门+力量=最纯粹的9号前锋。哈兰德踢球像一台程序化的进球工厂。",
    strengths: [
      "射门——左右脚均衡+头球，禁区内终结冰冷",
      "速度——1米94的身高却有后卫级别的冲刺速度",
      "效率——进球/分钟比恐怖，不浪费机会",
      "年轻——24岁的数据已经对标历史级射手",
    ],
    controversies: [
      "0座金球奖——个人最高荣誉尚未到手",
      "挪威国家队弱——无法参加世界杯/欧洲杯",
      "风格单一——除了进球其他方面参与度低",
    ],
    quote: "我不想做下一个谁。我只想进更多的球。",
    philosophicalAngle: "纯粹射手——足球的本质是进球，一切花活都是多余的",
  },

  // ── 16. Johan Cruyff ──
  {
    id: "cruyff",
    name: "Johan Cruyff",
    nameCN: "约翰·克鲁伊夫",
    number: "#14",
    nickname: "El Flaco",
    nicknameCN: "飞人",
    color: "cruyff-orange",
    era: "1970s",
    position: "CF/CAM",
    stats: { goals: 290, assists: 150, appearances: 520, ballonDor: 3, championsLeague: 3, leagueTitles: 10, worldCup: 0, internationalGoals: 33, internationalCaps: 48, goldenBoot: 0 },
    achievements: [
      "3座金球奖——1971/1973/1974连续获奖",
      "3座欧冠——阿贾克斯三连冠的灵魂",
      "全攻全守足球的化身——改变了足球战术的根本理念",
      "克鲁伊夫转身——以他命名的过人技术成为足球基本功",
      "巴塞罗那Tiki-taka的精神教父——影响了瓜迪奥拉整个体系",
      "球员+教练双重革命者——改变了足球理解方式",
    ],
    style: "全攻全守的先知，足球战术史上最重要的思想家。球员时代用克鲁伊夫转身戏耍后卫，教练时代用理念重塑巴塞罗那的DNA。",
    strengths: [
      "足球智商——战术理解力超越同时代所有人",
      "影响力——作为球员+教练双重改变了足球",
      "技术——克鲁伊夫转身，足球史上最优雅的过人",
      "领导力——全攻全守体系的核心引擎",
    ],
    controversies: [
      "1974世界杯决赛——荷兰输给西德，未能加冕",
      "性格强势——与队友和管理层冲突不断",
      "没有世界杯冠军——足球GOAT讨论中的最大缺失",
    ],
    quote: "踢球很简单，但踢简单的足球是最难的事。",
    philosophicalAngle: "足球哲学家——足球不是体力运动，是思维运动。位置是流动的，空间是创造的",
  },

  // ── 17. Franz Beckenbauer ──
  {
    id: "beckenbauer",
    name: "Franz Beckenbauer",
    nameCN: "弗朗茨·贝肯鲍尔",
    number: "#5",
    nickname: "Der Kaiser",
    nicknameCN: "足球皇帝",
    color: "kaiser-red",
    era: "1960s-1970s",
    position: "SW/CB",
    stats: { goals: 75, assists: 100, appearances: 630, ballonDor: 2, championsLeague: 3, leagueTitles: 5, worldCup: 1, internationalGoals: 14, internationalCaps: 103, goldenBoot: 0 },
    achievements: [
      "1974世界杯冠军队长——在本土举起大力神杯",
      "3座欧冠——拜仁三连冠的灵魂和队长",
      "2座金球奖——后卫位置获此殊荣极其罕见",
      "发明了自由人位置——永久改变了足球战术体系",
      "球员+教练双料世界杯冠军——1990年作为主教练再夺冠",
      "足球史上最伟大的后卫——'皇帝'不是绰号，是事实",
    ],
    style: "不是防守后卫，是带球向前推进的指挥官。贝肯鲍尔发明了自由人——从后场带球推进、组织进攻、控制节奏，后卫也能是球场上最耀眼的星。",
    strengths: [
      "创造自由人位置——永久改变了后卫的定义",
      "组织能力——从后场发起进攻的指挥官",
      "优雅——后卫踢出了中场的观赏性",
      "领袖——队长气质，球场上的绝对权威",
    ],
    controversies: [
      "2006世界杯申办腐败——涉及行贿丑闻",
      "时代久远——影像资料有限，难以与现代球员直接比较",
      "私生活——多段婚外情和私生子争议",
    ],
    quote: "球到了我脚下，我比任何中场都踢得好。我只是碰巧站在后卫的位置上。",
    philosophicalAngle: "位置革命——足球不应被位置限制，后卫也可以是场上最有创造力的人",
  },

  // ── 18. Alfredo Di Stéfano ──
  {
    id: "distefano",
    name: "Alfredo Di Stéfano",
    nameCN: "阿尔弗雷多·迪斯蒂法诺",
    number: "#9",
    nickname: "La Saeta Rubia",
    nicknameCN: "金箭头",
    color: "distefano-white",
    era: "1950s-1960s",
    position: "CF",
    stats: { goals: 370, assists: 100, appearances: 520, ballonDor: 2, championsLeague: 5, leagueTitles: 8, worldCup: 0, internationalGoals: 23, internationalCaps: 31, goldenBoot: 0 },
    achievements: [
      "5座欧冠——前5届全部夺冠，决赛场场进球",
      "2座金球奖——皇家马德里传奇的核心",
      "皇马王朝缔造者——缔造了欧冠5连冠伟业",
      "1960欧冠决赛独进3球——7-3大胜法兰克福",
      "8座西甲冠军——统治西班牙足球十余年",
      "欧冠历史最佳球员称号（UEFA认证）",
    ],
    style: "全能型前锋的原型，能攻能守能组织。迪斯蒂法诺不是一个位置的球员——他是全场所有位置的球员。在50年代就已经展现了现代全能型球员的雏形。",
    strengths: [
      "全能——能攻能守能组织，现代全能前锋的鼻祖",
      "欧冠——5连冠+每场决赛进球，欧战之王",
      "领导力——皇马王朝的灵魂人物",
      "持续输出——十余年保持最高竞技水平",
    ],
    controversies: [
      "时代太久远——1950年代的竞争强度难以评估",
      "无世界杯经历——代表阿根廷/哥伦比亚/西班牙三国，但都未参加世界杯",
      "影像资料稀缺——难以与现代球员对比",
    ],
    quote: "如果你在皇家马德里踢球，你就必须赢得一切。没有第二名。",
    philosophicalAngle: "全能即王道——足球没有固定位置，最好的球员应该无处不在",
  },

  // ── 19. Michel Platini ──
  {
    id: "platini",
    name: "Michel Platini",
    nameCN: "米歇尔·普拉蒂尼",
    number: "#10",
    nickname: "Le Roi",
    nicknameCN: "足球国王",
    color: "platini-blue",
    era: "1980s",
    position: "CAM",
    stats: { goals: 224, assists: 130, appearances: 430, ballonDor: 3, championsLeague: 1, leagueTitles: 2, worldCup: 0, internationalGoals: 41, internationalCaps: 72, goldenBoot: 0 },
    achievements: [
      "3座金球奖连庄——1983/1984/1985年",
      "1984欧洲杯冠军+金靴+金球——9球历史纪录至今未破",
      "1985欧冠冠军——尤文图斯史上最伟大的10号",
      "意甲2座联赛冠军——尤文图斯时代的灵魂",
      "法国足球黄金时代的开创者",
      "72场国际比赛41球——进球率极高",
    ],
    style: "法国足球艺术的巅峰，任意球大师+组织核心+进球高手三位一体。普拉蒂尼让10号球衣成为足球最浪漫的象征。",
    strengths: [
      "任意球——弧线精准，直接任意球进球数历史级",
      "得分能力——前腰位置场均进球率极高",
      "大赛表现——1984欧洲杯9球封神",
      "足球智商——组织进攻的大脑，法国中场的灵魂",
    ],
    controversies: [
      "世界杯无冠——1982半决赛/1986半决赛两次倒在门前",
      "FIFA腐败——后来担任UEFA主席期间涉嫌贪腐被禁足",
      "海瑟尔惨案——1985欧冠决赛背景下的人间悲剧",
    ],
    quote: "足球不是科学，是艺术。你不能用公式解释一脚完美的任意球。",
    philosophicalAngle: "浪漫主义——足球是法兰西式的优雅，任意球弧线就是最美的诗行",
  },

  // ── 20. Eusébio ──
  {
    id: "eusebio",
    name: "Eusébio",
    nameCN: "尤西比奥",
    number: "#10",
    nickname: "The Black Panther",
    nicknameCN: "黑豹",
    color: "eusebio-red",
    era: "1960s",
    position: "ST",
    stats: { goals: 473, assists: 100, appearances: 440, ballonDor: 1, championsLeague: 1, leagueTitles: 11, worldCup: 0, internationalGoals: 41, internationalCaps: 64, goldenBoot: 1 },
    achievements: [
      "1965年金球奖——非洲裔球员首次获此殊荣",
      "1962欧冠冠军——本菲卡黄金时代的核心射手",
      "1966世界杯金靴——9球成为赛事最佳射手",
      "473俱乐部进球——惊人的进球效率",
      "11座葡萄牙联赛冠军——本菲卡王朝的绝对核心",
      "葡萄牙足球的旗帜——为非洲和葡萄牙足球开辟道路",
    ],
    style: "速度+力量+射门三合一的原始杀器。在贝利和马拉多纳之间的年代，尤西比奥是欧洲足球最恐怖的进球机器。每一脚射门都像是发射炮弹。",
    strengths: [
      "射门力量——重炮射门是招牌，门将无法阻挡",
      "速度——黑豹般的爆发力和加速能力",
      "进球效率——473球/440场，超过1球/场",
      "大赛表现——1966世界杯9球，淘汰赛独挽狂澜",
    ],
    controversies: [
      "世界杯无冠——1966年半决赛输给英格兰",
      "联赛含金量——葡超竞争强度低于西甲/意甲/英超",
      "时代久远——难以与现代球员直接比较",
    ],
    quote: "我不需要用脑子踢球。球到了我脚下，我的腿自己知道该做什么。",
    philosophicalAngle: "本能射手——进球不需要思考，最纯粹的天赋就是最好的技术",
  },

  // ── 21. Paolo Maldini ──
  {
    id: "maldini",
    name: "Paolo Maldini",
    nameCN: "保罗·马尔蒂尼",
    number: "#3",
    nickname: "Il Capitano",
    nicknameCN: "马队",
    color: "maldini-red",
    era: "1980s-2000s",
    position: "LB/CB",
    stats: { goals: 33, assists: 40, appearances: 900, ballonDor: 0, championsLeague: 5, leagueTitles: 7, worldCup: 0, internationalGoals: 7, internationalCaps: 126, goldenBoot: 0 },
    achievements: [
      "5座欧冠——AC米兰25年的铁血队长",
      "900+场俱乐部出场——一人一城的极致诠释",
      "7座意甲冠军——AC米兰王朝的磐石",
      "126次国家队出场——意大利后防线的定海神针",
      "41岁才退役——职业寿命超过25年",
      "从未被罚下过红牌——完美防守者的代名词",
    ],
    style: "后卫中的艺术家。不靠飞铲，不靠犯规——马尔蒂尼的防守是预判和位置感的极致。当别人需要铲球的时候，他已经站在了正确的位置上。",
    strengths: [
      "位置感——永远出现在正确的位置，不需要犯规就能化解危机",
      "优雅——后卫踢出了美感，从不粗暴",
      "忠诚——AC米兰一人一城25年",
      "持久——41岁退役，职业生涯横跨四个十年",
    ],
    controversies: [
      "世界杯无冠——1994决赛点球大战失利，2006年退役未能参加",
      "0座金球奖——后卫位置很难获得个人最高荣誉",
      "父子同队争议——父亲切萨雷也是米兰传奇，被质疑'足球贵族'",
    ],
    quote: "如果我需要铲球，说明我的位置已经错了。",
    philosophicalAngle: "防守美学——最好的防守不是铲断，是让对手根本找不到空间",
  },

  // ── 22. Marco van Basten ──
  {
    id: "vanbasten",
    name: "Marco van Basten",
    nameCN: "马尔科·范巴斯滕",
    number: "#9",
    nickname: "The Swan of Utrecht",
    nicknameCN: "芭蕾王子",
    color: "vanbasten-orange",
    era: "1980s-1990s",
    position: "ST",
    stats: { goals: 218, assists: 80, appearances: 370, ballonDor: 3, championsLeague: 2, leagueTitles: 4, worldCup: 0, internationalGoals: 24, internationalCaps: 58, goldenBoot: 1 },
    achievements: [
      "3座金球奖——1988/1989/1992年",
      "1988欧洲杯决赛零度角凌空抽射——足球史上最伟大的进球之一",
      "2座欧冠——AC米兰萨基时代的核心射手",
      "1988欧洲杯冠军——荷兰三剑客的进球担当",
      "AC米兰+阿贾克斯双俱乐部传奇",
      "28岁因伤病被迫退役——如果健康可能是GOAT",
    ],
    style: "技术最完美的前锋，每一脚射门都是教学片。凌空抽射、头球、远射、盘带后射门——范巴斯滕的进球方式多到可以出一本教科书。",
    strengths: [
      "射门技术——凌空抽射历史最佳，零度角也能打进",
      "全面性——头球+左右脚+凌空，射门无死角",
      "金球——3座金球奖证明他的历史级统治力",
      "美感——每个进球都像芭蕾舞表演",
    ],
    controversies: [
      "28岁退役——脚踝伤病毁掉了本该更伟大的职业生涯",
      "世界杯无冠——荷兰始终未能夺冠",
      "巅峰太短——因伤病只有约8年高水平生涯",
    ],
    quote: "脚踝夺走了我的职业生涯，但没有人能夺走我的那些进球。",
    philosophicalAngle: "射门是艺术——一脚完美的射门可以让时间静止，让所有人屏住呼吸",
  },

  // ── 23. Luka Modrić ──
  {
    id: "modric",
    name: "Luka Modrić",
    nameCN: "卢卡·莫德里奇",
    number: "#10",
    nickname: "The Maestro",
    nicknameCN: "魔笛",
    color: "modric-white",
    era: "2010s-2020s",
    position: "CM",
    stats: { goals: 95, assists: 150, appearances: 730, ballonDor: 1, championsLeague: 5, leagueTitles: 5, worldCup: 0, internationalGoals: 25, internationalCaps: 175, goldenBoot: 0 },
    achievements: [
      "2018年金球奖——打破梅罗10年垄断",
      "5座欧冠——皇马中场的绝对核心",
      "2018世界杯亚军——率克罗地亚杀入决赛",
      "175次国家队出场——克罗地亚历史第一",
      "皇马中场大师——连续多年世界最佳中场",
      "从战争难民到金球奖——足球史上最励志的故事之一",
    ],
    style: "中场指挥官，1米72的身体里装着足球史上最精准的雷达。传球永远提前半拍到位，节奏控制如同指挥交响乐——莫德里奇让中场艺术达到新高度。",
    strengths: [
      "传球——精准度和创造力历史级，攻守转换的枢纽",
      "节奏控制——比赛节奏的操控者，想快就快想慢就慢",
      "持久——35岁+仍是世界级中场，从不衰退",
      "大赛——5座欧冠+世界杯亚军，大场面球员",
    ],
    controversies: [
      "世界杯无冠——2018决赛输给法国",
      "金球奖争议——2018年数据不如梅罗但获奖",
      "身体单薄——对抗能力是短板",
    ],
    quote: "当人们说你太矮太瘦不能踢球的时候，你只需要证明他们错了。",
    philosophicalAngle: "中场大师——足球的精髓在中场，控制节奏就是控制比赛",
  },

  // ── 24. Robert Lewandowski ──
  {
    id: "lewandowski",
    name: "Robert Lewandowski",
    nameCN: "罗伯特·莱万多夫斯基",
    number: "#9",
    nickname: "Lewy",
    nicknameCN: "莱万",
    color: "lewy-red",
    era: "2010s-2020s",
    position: "ST",
    stats: { goals: 580, assists: 120, appearances: 750, ballonDor: 0, championsLeague: 1, leagueTitles: 12, worldCup: 0, internationalGoals: 83, internationalCaps: 155, goldenBoot: 4 },
    achievements: [
      "9分钟5球——2015年拜仁vs沃尔夫斯堡，足球史上最疯狂的9分钟",
      "2020欧冠冠军——拜仁六冠王的核心射手",
      "12座联赛冠军——德甲+西甲统治级射手",
      "多次德甲金靴——拜仁时代进球数恐怖",
      "波兰历史最佳射手——83球国家队纪录",
      "2021年被公认为'被偷走金球奖的男人'",
    ],
    style: "禁区内最冷血的杀手，跑位+射门时机的大师。莱万不需要华丽的盘带——他总是出现在最致命的位置，用最简洁的方式把球送进球门。",
    strengths: [
      "跑位——禁区内嗅觉极致，永远在最致命的位置",
      "射门——左右脚+头球，全方位终结能力",
      "稳定性——连续10年30+进球赛季",
      "9分钟5球——单一时刻的进球爆发力历史最强",
    ],
    controversies: [
      "0座金球奖——2020年被取消评选，2021年输给梅西",
      "世界杯表现——波兰无法走远，大赛成绩差",
      "依赖拜仁体系——离开德甲后进球数据下降",
    ],
    quote: "9分钟可以改变一切。不仅仅是比赛，还有你对足球的理解。",
    philosophicalAngle: "效率即正义——足球不需要花里胡哨，用最少的动作进最多的球",
  },

  // ── 25. Gianluigi Buffon ──
  {
    id: "buffon",
    name: "Gianluigi Buffon",
    nameCN: "吉安路易吉·布冯",
    number: "#1",
    nickname: "Superman",
    nicknameCN: "布冯",
    color: "buffon-blue",
    era: "1990s-2020s",
    position: "GK",
    stats: { goals: 0, assists: 0, appearances: 1100, ballonDor: 0, championsLeague: 0, leagueTitles: 10, worldCup: 1, internationalGoals: 0, internationalCaps: 176, goldenBoot: 0 },
    achievements: [
      "2006世界杯冠军——零封全场的钢铁长城",
      "1100+场职业生涯——门将出场纪录",
      "176次国家队出场——意大利历史最多",
      "10座意甲冠军——尤文王朝的最后一道防线",
      "2003年世界最佳门将——连续多年世界第一门将",
      "从尤文降级仍然留队——忠诚的最高定义",
    ],
    style: "门线上的指挥官，最后的浪漫主义守门员。不靠反应靠预判——布冯永远知道球会往哪里飞。25年如一日的稳定，让门将位置有了和前锋一样的荣光。",
    strengths: [
      "扑救——门线反应和飞身扑救历史级",
      "领导力——后防线的指挥官和精神领袖",
      "持久——25年顶级生涯，门将长寿的典范",
      "忠诚——尤文降级时选择留队，诠释忠诚",
    ],
    controversies: [
      "0座欧冠——2017决赛被皇马4-1击败，最后一次机会",
      "赌球丑闻——2006年卷入意大利电话门",
      "红牌+争议言论——2018欧冠对皇马抱怨裁判",
    ],
    quote: "门将是最后一道防线。当所有人都犯错的时候，你不能犯错。",
    philosophicalAngle: "最后防线——足球的伟大不只属于进球者，守护球门同样是一种伟大",
  },

  // ── 26. Xavi Hernández ──
  {
    id: "xavi",
    name: "Xavi Hernández",
    nameCN: "哈维·埃尔南德斯",
    number: "#6",
    nickname: "The Puppeteer",
    nicknameCN: "哈维",
    color: "xavi-blue",
    era: "2000s-2010s",
    position: "CM",
    stats: { goals: 85, assists: 180, appearances: 760, ballonDor: 0, championsLeague: 4, leagueTitles: 8, worldCup: 1, internationalGoals: 13, internationalCaps: 133, goldenBoot: 0 },
    achievements: [
      "4座欧冠——巴萨梦二梦三王朝的中场灵魂",
      "2010世界杯+2008/2012欧洲杯——西班牙三连冠的核心引擎",
      "8座西甲冠军——Tiki-taka的终极执行者",
      "传球成功率常年90%+——足球史上最精准的传球手",
      "133次国家队出场——西班牙中场的代名词",
      "巴萨拉玛西亚最成功的毕业生——从青训到传奇",
    ],
    style: "传球机器，比赛节奏的操控者。哈维不需要速度不需要射门——他只需要传球。每一脚传球都恰到好处，让整支球队像一台精密的机器运转。",
    strengths: [
      "传球——成功率90%+，精准到厘米级的传球大师",
      "节奏——控制比赛节奏的能力无人能及",
      "体系——Tiki-taka的灵魂，让足球变成团队艺术",
      "大赛——世界杯+2届欧洲杯+4届欧冠全部核心",
    ],
    controversies: [
      "0座金球奖——巅峰期被梅西压制",
      "依赖体系——离开巴萨/西班牙体系是否同样出色？",
      "执教巴萨成绩不佳——球员时代的光环未能延续到教练席",
    ],
    quote: "在中场，你只需要做一件事：让球到达正确的人脚下。",
    philosophicalAngle: "传控至上——足球是11个人的运动，最好的进攻是永不丢球",
  },

  // ── 27. Andrés Iniesta ──
  {
    id: "iniesta",
    name: "Andrés Iniesta",
    nameCN: "安德烈斯·伊涅斯塔",
    number: "#8",
    nickname: "El Cerebro",
    nicknameCN: "小白",
    color: "iniesta-blue",
    era: "2000s-2010s",
    position: "CM/CAM",
    stats: { goals: 57, assists: 140, appearances: 700, ballonDor: 0, championsLeague: 4, leagueTitles: 9, worldCup: 1, internationalGoals: 13, internationalCaps: 131, goldenBoot: 0 },
    achievements: [
      "2010世界杯决赛绝杀——加时赛进球让西班牙首次登顶",
      "4座欧冠——巴萨黄金时代的中场魔术师",
      "2008/2012欧洲杯冠军——西班牙三连冠核心",
      "9座西甲冠军——巴萨一人一城的代表",
      "2012欧洲杯最佳球员——决赛夜的绝对主角",
      "从不被铲倒的男人——重心极低+触球极快",
    ],
    style: "球场上的幽灵，总是在最拥挤的空间里找到出路。伊涅斯塔的盘带不靠速度，靠的是重心和节奏变化——对手永远不知道他下一步往哪走。",
    strengths: [
      "狭小空间——在人群中穿针引线的能力历史最强",
      "关键球——世界杯决赛绝杀，大赛基因无人质疑",
      "盘带——低重心+快速变向，从不被铲倒",
      "大局观——传球和控球完美结合的中场大师",
    ],
    controversies: [
      "0座金球奖——巅峰期完全被梅西+C罗压制",
      "数据不够亮眼——进球+助攻数字不如其他顶级中场",
      "离开巴萨后的选择——去日本联赛被质疑过早退出顶级舞台",
    ],
    quote: "足球教会了我一件事：在最黑暗的时刻，总有一条路可以找到光。",
    philosophicalAngle: "关键先生——足球最美的瞬间是在最重要的时刻做出最正确的选择",
  },

  // ── 28. Andrea Pirlo ──
  {
    id: "pirlo",
    name: "Andrea Pirlo",
    nameCN: "安德烈亚·皮尔洛",
    number: "#21",
    nickname: "The Architect",
    nicknameCN: "睡皮",
    color: "pirlo-blue",
    era: "2000s-2010s",
    position: "CM/CDM",
    stats: { goals: 59, assists: 120, appearances: 650, ballonDor: 0, championsLeague: 2, leagueTitles: 6, worldCup: 1, internationalGoals: 13, internationalCaps: 116, goldenBoot: 0 },
    achievements: [
      "2006世界杯冠军——意大利中场的绝对灵魂",
      "2座欧冠——AC米兰黄金时代的组织核心",
      "6座联赛冠军——意甲中场大师",
      "2012欧洲杯勺子点球——对英格兰的冷血挑射",
      "任意球大师——直接任意球进球数历史级",
      "116次国家队出场——意大利中场的代名词",
    ],
    style: "站在中场像是在公园散步的男人。皮尔洛的传球不需要跑动——他站在那里，用一脚长传就能撕开整条防线。慵懒外表下是足球史上最精密的大脑。",
    strengths: [
      "长传——50米精准长传是招牌，一脚改变比赛格局",
      "任意球——弧线精准，直接任意球进球数极多",
      "视野——360度扫描雷达，传球永远先人一步",
      "淡定——大赛中越紧张越冷静，勺子点球就是证据",
    ],
    controversies: [
      "防守弱——需要队友保护，B2B中场能力不足",
      "AC米兰免费放走——最大的转会失误之一",
      "执教失败——尤文图斯主教练生涯草草收场",
    ],
    quote: "足球不复杂。你只需要把球传给正确的人。困难的是知道谁是正确的人。",
    philosophicalAngle: "不动如山——足球最高境界是不需要跑动，一脚传球就能解决一切",
  },

  // ── 29. Roberto Carlos ──
  {
    id: "robertocarlos",
    name: "Roberto Carlos",
    nameCN: "罗伯托·卡洛斯",
    number: "#3",
    nickname: "The Bullet",
    nicknameCN: "卡洛斯",
    color: "carlos-white",
    era: "1990s-2000s",
    position: "LB",
    stats: { goals: 70, assists: 100, appearances: 740, ballonDor: 0, championsLeague: 3, leagueTitles: 4, worldCup: 1, internationalGoals: 11, internationalCaps: 125, goldenBoot: 0 },
    achievements: [
      "3座欧冠——皇马银河战舰的左路核弹",
      "2002世界杯冠军——巴西梦幻阵容的左后卫",
      "1997年对法国的任意球——违反物理定律的弧线球，足球史上最著名的任意球",
      "4座西甲冠军——皇马11年的铁打主力",
      "125次巴西国家队出场——桑巴军团的左路飞翼",
      "重新定义了左后卫——进攻型后卫的鼻祖级人物",
    ],
    style: "左后卫？不，他是左路的坦克。1米68的身体里装着F1引擎——从后场到前场只需要几秒，然后用大力抽射把球打进球门或者打飞到看台。",
    strengths: [
      "大力抽射——左脚任意球能把球打到时速150公里",
      "速度——后卫位置的闪电侠，助攻跑到对方底线",
      "体能——上下翻飞90分钟不停歇",
      "物理弧线——那脚违反物理定律的任意球，至今无人复制",
    ],
    controversies: [
      "防守弱——进攻太猛导致后场经常空虚",
      "射门准度——除了那几脚名作，其实射偏的次数更多",
      "后期状态下滑——离开皇马后水平骤降",
    ],
    quote: "那脚任意球？我也不知道球为什么会那样飞。可能上帝在帮我。",
    philosophicalAngle: "力量美学——足球最震撼的瞬间是一脚大力抽射让球网和观众同时颤抖",
  },

  // ── 30. Mohamed Salah ──
  {
    id: "salah",
    name: "Mohamed Salah",
    nameCN: "穆罕默德·萨拉赫",
    number: "#11",
    nickname: "The Egyptian King",
    nicknameCN: "埃及法老",
    color: "salah-red",
    era: "2010s-2020s",
    position: "RW",
    stats: { goals: 350, assists: 160, appearances: 620, ballonDor: 0, championsLeague: 1, leagueTitles: 1, worldCup: 0, internationalGoals: 56, internationalCaps: 100, goldenBoot: 3 },
    achievements: [
      "英超单赛季32球纪录——2017-18赛季38轮制时代最多",
      "2019欧冠冠军——利物浦时隔14年重返欧洲之巅",
      "3次英超金靴——利物浦史上最伟大的前锋之一",
      "2019英超冠军——利物浦30年首座联赛奖杯的核心",
      "非洲足球先生多次获奖——阿拉伯世界的足球旗帜",
      "切尔西弃将逆袭——从蓝军替补到红军之王",
    ],
    style: "左脚内切射门的终极模板——从右路启动，向内切入，左脚弧线球兜远角。你知道他要这么做，但你就是防不住，因为他的第一步太快了。",
    strengths: [
      "内切射门——右路内切左脚弧线射门，招牌式进球",
      "速度——启动速度极快，一对一突破成功率高",
      "稳定——连续多年30+进球，从不断电",
      "文化影响——中东和非洲足球的旗帜性人物",
    ],
    controversies: [
      "0座金球奖——多次进入前三但从未获奖",
      "大赛表现——世界杯和非洲杯未能带领埃及走远",
      "合同纠纷——与利物浦多次续约拉锯战",
    ],
    quote: "我是来自埃及的男孩。每一个进球都是为了那些相信我的人。",
    philosophicalAngle: "逆袭者——足球是给失败者的第二次机会，被放弃的人更知道珍惜机会",
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export function getPlayerById(id: string): Player {
  const p = players.find((pl) => pl.id === id);
  if (!p) throw new Error(`Player not found: ${id}`);
  return p;
}
