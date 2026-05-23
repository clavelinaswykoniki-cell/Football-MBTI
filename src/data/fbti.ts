// ============================================================================
// FBTI — Football Brain Type Indicator
//
// 4 dimensions, 2 poles each → 16 personality types:
//   H/T — Hero vs Team (个人英雄 vs 团队体系)
//   D/F — Data vs Feeling (数据派 vs 情怀派)
//   G/P — Grace vs Power (优雅 vs 力量)
//   L/N — Loyalty vs Nomad (一城一队 vs 强者跟随)
//
// 50 questions total. First 30 are core (精简版). Q50 is open-ended.
// ============================================================================

export type QuestionType = "binary" | "multi" | "open";
export type DimensionKey = "HT" | "DF" | "GP" | "LN";
export type PoleKey = "H" | "T" | "D" | "F" | "G" | "P" | "L" | "N";

export interface FbtiQuestion {
  id: number;
  type: QuestionType;
  dimension: DimensionKey | "all";
  core: boolean;
  question: string;
  optionA?: { text: string; pole: PoleKey };
  optionB?: { text: string; pole: PoleKey };
  options?: Array<{ text: string; scores: Partial<Record<PoleKey, number>> }>;
  placeholder?: string;
}

export interface FbtiAnswer {
  questionId: number;
  selected?: "A" | "B";
  selectedIndices?: number[];
  text?: string;
}

export interface FbtiType {
  code: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  spiritPlayer: string;
  spiritPlayerWhy: string;
  strengths: string[];
  weaknesses: string[];
  compatibility: string;
  nemesis: string;
  shareText?: string;
}

// ---------------------------------------------------------------------------
// Questions (filled in below)
// ---------------------------------------------------------------------------

export const fbtiQuestions: FbtiQuestion[] = [
{
    id: 1,
    type: "binary",
    dimension: "HT",
    core: true,
    question: "上帝塞给你一项足球超能力，你选哪个？",
    optionA: { text: "巅峰罗纳尔多式的盘带，三人包夹也能蹚出条路", pole: "H" },
    optionB: { text: "哈维式的传球视野，闭眼都能找到队友脚下", pole: "T" },
  },
{
    id: 2,
    type: "binary",
    dimension: "DF",
    core: true,
    question: "朋友说\"梅西就是 GOAT\"，你的第一反应是？",
    optionA: { text: "打开 Transfermarkt，8 个金球 / 672 球巴萨纪录甩脸上", pole: "D" },
    optionB: { text: "不用查，加迪夫那球、卡塔尔那晚就够了", pole: "F" },
  },
{
    id: 3,
    type: "binary",
    dimension: "GP",
    core: true,
    question: "最后一分钟点球，你最想看谁站上点球点？",
    optionA: { text: "齐祖式勺子，优雅得像在喝下午茶", pole: "G" },
    optionB: { text: "C 罗式抡圆了爆射，球网都给他打穿", pole: "P" },
  },
{
    id: 4,
    type: "binary",
    dimension: "LN",
    core: true,
    question: "2009 年卡卡转会皇马那阵，你心里的感觉是？",
    optionA: { text: "AC 米兰球迷哭晕在厕所，10 号留下才叫传奇", pole: "L" },
    optionB: { text: "银河战舰 2.0，强强联合才好看", pole: "N" },
  },
{
    id: 5,
    type: "binary",
    dimension: "HT",
    core: false,
    question: "你重看 2014 世界杯决赛，最爱回放哪段？",
    optionA: { text: "格策接厄齐尔传球凌空垫射绝杀", pole: "T" },
    optionB: { text: "梅西单点突破被拉姆侧身放倒那次", pole: "H" },
  },
{
    id: 6,
    type: "binary",
    dimension: "DF",
    core: true,
    question: "评价 C 罗的欧冠 5 冠，你的角度是？",
    optionA: { text: "5 冠 + 欧冠历史射手王 140 球，数据封神", pole: "D" },
    optionB: { text: "尤文那记倒钩 + 马竞帽子戏法，画面比数字震撼", pole: "F" },
  },
{
    id: 7,
    type: "binary",
    dimension: "GP",
    core: false,
    question: "看小罗那个无视角传球助攻，你的反应？",
    optionA: { text: "这不是踢球，这是在跳桑巴", pole: "G" },
    optionB: { text: "好看是好看，但赢球才是硬道理", pole: "P" },
  },
{
    id: 8,
    type: "binary",
    dimension: "LN",
    core: true,
    question: "托蒂一辈子在罗马，赚的钱可能不到 C 罗一年，你怎么看？",
    optionA: { text: "一城一队的浪漫，这才是足球该有的样子", pole: "L" },
    optionB: { text: "浪费天赋，巅峰期该去争冠球队", pole: "N" },
  },
{
    id: 10,
    type: "binary",
    dimension: "DF",
    core: false,
    question: "姆巴佩 vs 哈兰德谁更强，你的判断依据？",
    optionA: { text: "翻 FotMob 看 xG、过人成功率、关键传球", pole: "D" },
    optionB: { text: "看世界杯决赛大场面谁顶得住", pole: "F" },
  },
{
    id: 11,
    type: "binary",
    dimension: "GP",
    core: true,
    question: "\"巴西足球\"四个字让你想到什么？",
    optionA: { text: "小罗在伯纳乌让皇马起立鼓掌的那种灵气", pole: "G" },
    optionB: { text: "邓加 94 年那种铁血中场，赢就完了", pole: "P" },
  },
{
    id: 12,
    type: "binary",
    dimension: "LN",
    core: false,
    question: "姆巴佩 2024 终于加盟皇马，你的评价？",
    optionA: { text: "想拿金球就得来银河战舰，正常操作", pole: "N" },
    optionB: { text: "大巴黎养你这么多年，说走就走？", pole: "L" },
  },
{
    id: 13,
    type: "binary",
    dimension: "HT",
    core: true,
    question: "你看比赛最享受的镜头是？",
    optionA: { text: "一个人贴地斩硬过四人", pole: "H" },
    optionB: { text: "一脚 30 米直塞撕开整条防线", pole: "T" },
  },
{
    id: 15,
    type: "binary",
    dimension: "GP",
    core: false,
    question: "看伊布那记倒钩世界波，你的关注点是？",
    optionA: { text: "35 米外凌空，那个滞空和爆发力，纯肌肉美学", pole: "P" },
    optionB: { text: "那种把不可能变可能的灵感，神来一笔", pole: "G" },
  },
{
    id: 16,
    type: "binary",
    dimension: "LN",
    core: true,
    question: "你支持的俱乐部连续 3 年中游，老板还不投资，你怎么办？",
    optionA: { text: "主队就是主队，输赢都得看", pole: "L" },
    optionB: { text: "找支踢得好看 / 在争冠的队再开一个号", pole: "N" },
  },
{
    id: 17,
    type: "binary",
    dimension: "HT",
    core: false,
    question: "\"tiki-taka\"听起来像？",
    optionA: { text: "把对手跑死的艺术，足球的最高形态", pole: "T" },
    optionB: { text: "没有梅西的 tiki-taka 就是横传 + 倒脚", pole: "H" },
  },
{
    id: 18,
    type: "binary",
    dimension: "DF",
    core: true,
    question: "有人说\"贝利不如梅西因为没有视频佐证\"，你怎么回？",
    optionA: { text: "没数据没视频，光听老一辈讲故事不算数", pole: "D" },
    optionB: { text: "三届世界杯冠军这种东西，不需要 4K 录像", pole: "F" },
  },
{
    id: 19,
    type: "binary",
    dimension: "GP",
    core: false,
    question: "你心目中\"完美前锋\"的模板是？",
    optionA: { text: "亨利那种又快又飘，进球像艺术片", pole: "G" },
    optionB: { text: "莱万那种永远站对位置，门前杀手", pole: "P" },
  },
{
    id: 20,
    type: "binary",
    dimension: "LN",
    core: false,
    question: "菲戈从巴萨转会皇马，诺坎普\"猪头事件\"那场，你站？",
    optionA: { text: "巴萨球迷扔得对，叛徒就该被骂", pole: "L" },
    optionB: { text: "职业球员追求更好的合同 + 平台，正常职业选择", pole: "N" },
  },
{
    id: 21,
    type: "binary",
    dimension: "HT",
    core: true,
    question: "2022 卡塔尔决赛你最难忘哪一幕？",
    optionA: { text: "梅西连过法国中场单骑闯关", pole: "H" },
    optionB: { text: "阿根廷整个中场绞杀 + 边路套上的体系", pole: "T" },
  },
{
    id: 22,
    type: "binary",
    dimension: "DF",
    core: false,
    question: "你和朋友吵 C 罗 vs 梅西，你最常掏出来的论据是？",
    optionA: { text: "金球数、欧冠数、国家队大赛奖杯一字排开", pole: "D" },
    optionB: { text: "加迪夫倒钩、卡塔尔之夜、SIUUU 那种画面感", pole: "F" },
  },
{
    id: 24,
    type: "binary",
    dimension: "LN",
    core: true,
    question: "\"队魂\"这个词你的第一反应是谁？",
    optionA: { text: "杰拉德之于利物浦，托蒂之于罗马", pole: "L" },
    optionB: { text: "没有所谓队魂，强者去强队才是足球世界规则", pole: "N" },
  },
{
    id: 26,
    type: "binary",
    dimension: "DF",
    core: true,
    question: "评价齐达内 2006 头顶马特拉齐被红牌，你的态度？",
    optionA: { text: "大赛决赛上头是硬伤，影响历史评价", pole: "D" },
    optionB: { text: "那一下头槌让齐祖更加传奇，人味儿才动人", pole: "F" },
  },
{
    id: 27,
    type: "binary",
    dimension: "GP",
    core: false,
    question: "你看比赛截图发朋友圈，最爱发哪种？",
    optionA: { text: "球员一个停球 / 一个转身的瞬间，姿态像雕塑", pole: "G" },
    optionB: { text: "球员肌肉爆出来跟人对抗的瞬间，雄性荷尔蒙", pole: "P" },
  },
{
    id: 28,
    type: "binary",
    dimension: "LN",
    core: false,
    question: "你最佩服的转会决定是？",
    optionA: { text: "梅西巴萨青训踢到 35 岁才离开", pole: "L" },
    optionB: { text: "C 罗一路 Sporting → 曼联 → 皇马 → 尤文 → 利雅得，哪好去哪", pole: "N" },
  },
{
    id: 29,
    type: "binary",
    dimension: "HT",
    core: true,
    question: "你看到\"过五人破门\"这种集锦标题就点进去，因为？",
    optionA: { text: "个人能力撕碎防线，足球最爽的镜头", pole: "H" },
    optionB: { text: "还行吧，更想看一脚精妙直塞", pole: "T" },
  },
{
    id: 30,
    type: "binary",
    dimension: "DF",
    core: true,
    question: "有人说\"梅西没赢世界杯之前不算 GOAT\"，你的看法？",
    optionA: { text: "同意，大赛荣誉缺一不可，数据要齐", pole: "D" },
    optionB: { text: "不同意，加迪夫那年都该封神了，奖杯是注脚", pole: "F" },
  },
{
    id: 31,
    type: "binary",
    dimension: "GP",
    core: true,
    question: "你心目中最\"美\"的进球是？",
    optionA: { text: "博格巴爸爸博格坎普那记停球转身破门", pole: "G" },
    optionB: { text: "范巴斯滕 88 决赛那记零角度凌空抽射", pole: "P" },
  },
{
    id: 33,
    type: "binary",
    dimension: "HT",
    core: false,
    question: "你怎么看 2010 西班牙队？",
    optionA: { text: "历史最佳团队，把足球踢成数学题", pole: "T" },
    optionB: { text: "没有比利亚 / 伊涅斯塔的关键球，他们也夺不了冠", pole: "H" },
  },
{
    id: 34,
    type: "binary",
    dimension: "DF",
    core: false,
    question: "看到推特上\"xG 5.2 但只进 1 球\"这种数据帖，你？",
    optionA: { text: "认真看完，xG 是评价球员效率的好工具", pole: "D" },
    optionB: { text: "划走，足球不是 Excel，看着踢得好就行", pole: "F" },
  },
{
    id: 35,
    type: "binary",
    dimension: "GP",
    core: false,
    question: "你形容齐达内会用哪个词？",
    optionA: { text: "优雅得像在跳芭蕾，球粘脚上", pole: "G" },
    optionB: { text: "关键大赛能背 90 分钟的硬汉中场", pole: "P" },
  },
{
    id: 36,
    type: "binary",
    dimension: "LN",
    core: false,
    question: "内马尔从巴萨去大巴黎拿 2.22 亿欧，你的判断？",
    optionA: { text: "想跳出梅西阴影争金球，可以理解但失策", pole: "N" },
    optionB: { text: "巴萨青训出来又走，本来 MSN 能成历史最佳三叉戟", pole: "L" },
  },
{
    id: 38,
    type: "binary",
    dimension: "DF",
    core: true,
    question: "你逛足球论坛最常打开哪种帖子？",
    optionA: { text: "\"数据告诉你为什么 X 球员被低估\"", pole: "D" },
    optionB: { text: "\"那个夏天，齐达内的最后一支舞\"", pole: "F" },
  },
{
    id: 39,
    type: "binary",
    dimension: "GP",
    core: false,
    question: "你看后腰，最爱哪一类？",
    optionA: { text: "皮尔洛那种慢悠悠传出 50 米贴地斩", pole: "G" },
    optionB: { text: "坎特那种 90 分钟跑 13 公里抢断 12 次", pole: "P" },
  },
{
    id: 40,
    type: "binary",
    dimension: "LN",
    core: true,
    question: "你支持的队卖了队内头牌去夺冠，你的心情？",
    optionA: { text: "难受，他不该走，1 亿欧也买不回情怀", pole: "L" },
    optionB: { text: "理解，球员有自己的职业生涯规划，祝福他", pole: "N" },
  },
{
    id: 41,
    type: "binary",
    dimension: "HT",
    core: false,
    question: "你的梦中阵容更接近哪种？",
    optionA: { text: "1 个梅西 + 10 个跑动型工兵", pole: "H" },
    optionB: { text: "11 个会传球的中场，谁都能控球", pole: "T" },
  },
{
    id: 42,
    type: "binary",
    dimension: "DF",
    core: false,
    question: "有人发\"C 罗职业生涯 900+ 进球\"截图，你？",
    optionA: { text: "转发 + 配文\"数据封神，毫无悬念\"", pole: "D" },
    optionB: { text: "数字归数字，他在皇马欧冠决赛的那种气场更重要", pole: "F" },
  },
{
    id: 44,
    type: "binary",
    dimension: "LN",
    core: true,
    question: "你怎么看 35 岁的 C 罗去沙特？",
    optionA: { text: "商业选择，赢家继续找最适合自己的舞台", pole: "N" },
    optionB: { text: "多少有点掉价，巅峰传奇该有更体面的谢幕", pole: "L" },
  },
{
    id: 45,
    type: "binary",
    dimension: "HT",
    core: true,
    question: "让你 30 秒回忆\"足球之美\"，先冒出来的画面是？",
    optionA: { text: "一个人沿边线狂奔，过掉所有人破门", pole: "H" },
    optionB: { text: "一脚 4 人配合一脚出去，门将都没反应过来", pole: "T" },
  },
{
    id: 46,
    type: "binary",
    dimension: "DF",
    core: false,
    question: "评价梅罗时代，你 100 年后会怎么跟孙子讲？",
    optionA: { text: "拿出数据库：金球、欧冠、进球数、助攻一条龙", pole: "D" },
    optionB: { text: "讲那些故事：诺坎普 vs 伯纳乌、卡塔尔那一夜、SIUUU", pole: "F" },
  },
{
    id: 47,
    type: "binary",
    dimension: "GP",
    core: false,
    question: "你最讨厌哪种被吹爆的球员风格？",
    optionA: { text: "一脚一脚力大砖飞，没有任何美感", pole: "G" },
    optionB: { text: "永远在踩单车 + 摆造型，关键时刻拉胯", pole: "P" },
  },
{
    id: 48,
    type: "binary",
    dimension: "LN",
    core: false,
    question: "莱万 33 岁离开拜仁去巴萨，你的看法？",
    optionA: { text: "拜仁那么多年，最后闹掰离队，不体面", pole: "L" },
    optionB: { text: "想要新挑战 + 更好合同，球员有选择权", pole: "N" },
  },
{
    id: 49,
    type: "binary",
    dimension: "HT",
    core: false,
    question: "你会更兴奋地把哪种集锦塞给朋友？",
    optionA: { text: "梅西阿根廷 vs 墨西哥那记 25 米贴地斩独造杀机", pole: "H" },
    optionB: { text: "曼城 11 脚传递撕开阿森纳的团队进球", pole: "T" },
  },
{
    id: 9,
    type: "multi",
    dimension: "HT",
    core: true,
    question: "组队踢 11 人制，你最想要的核心是？",
    options: [
      { text: "一个梅西，给球就能解决问题", scores: { H: 2 } },
      { text: "一个哈维 + 伊涅斯塔，把球控死", scores: { T: 2 } },
      { text: "一个齐达内，关键时刻一锤定音", scores: { H: 2 } },
      { text: "一个卡塞米罗 + 莫德里奇 + 克罗斯，中场绞肉机", scores: { T: 2 } },
    ],
  },
{
    id: 14,
    type: "multi",
    dimension: "DF",
    core: true,
    question: "评价一个球员\"伟大\"，你最看重什么？",
    options: [
      { text: "金球数 + 大赛冠军", scores: { D: 2 } },
      { text: "关键战的传奇时刻", scores: { F: 2 } },
      { text: "进球数、助攻、xG 这些硬指标", scores: { D: 2 } },
      { text: "球员人格、忠诚、对俱乐部的意义", scores: { F: 2 } },
    ],
  },
{
    id: 23,
    type: "multi",
    dimension: "GP",
    core: true,
    question: "你最受不了哪种踢法？",
    options: [
      { text: "11 个人摆大巴 + 长传冲吊，赢了也无聊", scores: { G: 2 } },
      { text: "花里胡哨踩单车不进球，秀给自己看", scores: { P: 2 } },
      { text: "不讲对抗的\"养生足球\"", scores: { P: 2 } },
      { text: "看着像橄榄球的高强度肉搏", scores: { G: 2 } },
    ],
  },
{
    id: 25,
    type: "multi",
    dimension: "HT",
    core: false,
    question: "让你当教练，落后 1 球还剩 10 分钟，你的部署？",
    options: [
      { text: "球给我们队最强的那个，他自己解决", scores: { H: 2 } },
      { text: "边路传中找中锋，强攻禁区", scores: { H: 2 } },
      { text: "多打几脚配合撕开防线，别急", scores: { T: 2 } },
      { text: "全员压上 + 高位逼抢，制造机会", scores: { T: 2 } },
    ],
  },
{
    id: 32,
    type: "multi",
    dimension: "LN",
    core: true,
    question: "让你给儿子选一个球员当偶像，你选？",
    options: [
      { text: "梅西，一队踢到老的浪漫主义者", scores: { L: 2 } },
      { text: "C 罗，全世界打卡式的赢家", scores: { N: 2 } },
      { text: "托蒂，罗马城的国王", scores: { L: 2 } },
      { text: "伊布，到哪都是大爹的狂人", scores: { N: 2 } },
    ],
  },
{
    id: 37,
    type: "multi",
    dimension: "HT",
    core: true,
    question: "最适合你的比赛节奏是？",
    options: [
      { text: "一个 10 号在前场自由发挥的古典足球", scores: { H: 2 } },
      { text: "瓜帅式的位置流，谁都能在谁的位置上", scores: { T: 2 } },
      { text: "弗格森 92 班那种边路套上 + 中场掌控", scores: { T: 2 } },
      { text: "马拉多纳 86 年那种一个人扛着队伍走", scores: { H: 2 } },
    ],
  },
{
    id: 43,
    type: "multi",
    dimension: "GP",
    core: true,
    question: "你形容自己的足球审美会用哪些关键词？",
    options: [
      { text: "灵气、创造力、即兴发挥", scores: { G: 2 } },
      { text: "强度、对抗、肌肉记忆", scores: { P: 2 } },
      { text: "流畅、艺术、像舞蹈", scores: { G: 2 } },
      { text: "高效、纪律、终结能力", scores: { P: 2 } },
    ],
  },
  {
    id: 50,
    type: "open",
    dimension: "all",
    core: false,
    question: "用一句话总结你对足球的核心信念。",
    placeholder: "用一句话总结你对足球的核心信念",
  },
];

// ---------------------------------------------------------------------------
// 16 Types (filled in below from Doubao 16-type data + manual additions)
// ---------------------------------------------------------------------------

export const fbtiTypes: Record<string, FbtiType> = {
  HDGL: {
    code: "HDGL",
    name: "罗马城孤胆侠",
    emoji: "🐺",
    tagline: "独守一城的优雅孤胆战神",
    description: "你不信什么体系能救落魄的罗马，就信托蒂的马赛回旋能单骑破局。数据上他的队史250球、700+出场硬邦邦，谁黑他你能把数据列满一屏，绝不跟你扯虚的。",
    spiritPlayer: "弗朗切斯科·托蒂",
    spiritPlayerWhy: "他用25年生涯诠释了一人一城的优雅孤胆，用个人能力扛着球队前行。",
    strengths: ["辩论时一定能扛得住团队论调，「一个梅西够了」是你的口头禅", "每个数据都是你的弹药，对面只能搬「你不懂足球」", "看球像看画展，每个停球都值得截图"],
    weaknesses: ["「英雄不出场就没戏」让你常在配合型比赛里看哭", "朋友跟你聊球，你聊数据，话题死在第三句", "哈兰德这种功能型杀手你是看不上眼的，朋友吐槽你「精英病」"],
    compatibility: "HDPN",
    nemesis: "TFPN",
    shareText: "足球 MBTI 测出来我是「罗马城孤胆侠」🐺——独守一城的优雅孤胆战神",
  },
  HDGN: {
    code: "HDGN",
    name: "桑巴游牧金靴",
    emoji: "⚡",
    tagline: "浪迹天涯的优雅数据怪",
    description: "你就爱大罗那种钟摆过人的极致优雅，谁跟你扯忠诚你就甩他三座金球+181粒联赛进球的数据。你觉得天才就该去最强的舞台，反正你追的是球技，不是队徽。",
    spiritPlayer: "罗纳尔多",
    spiritPlayerWhy: "他浪迹多队却始终保持顶级数据，用优雅球风征服所有赛场。",
    strengths: ["辩论时一定能扛得住团队论调，「一个梅西够了」是你的口头禅", "每个数据都是你的弹药，对面只能搬「你不懂足球」", "看球像看画展，每个停球都值得截图"],
    weaknesses: ["「英雄不出场就没戏」让你常在配合型比赛里看哭", "朋友跟你聊球，你聊数据，话题死在第三句", "哈兰德这种功能型杀手你是看不上眼的，朋友吐槽你「精英病」"],
    compatibility: "HDPL",
    nemesis: "TFPL",
    shareText: "足球 MBTI 测出来我是「桑巴游牧金靴」⚡——浪迹天涯的优雅数据怪",
  },
  HDPL: {
    code: "HDPL",
    name: "圣詹姆斯重炮",
    emoji: "🔨",
    tagline: "守着小城的力量数据怪",
    description: "你就服希勒那种扛着后卫爆射的力量感，谁跟你扯情怀你就甩他英超260球的历史纪录。你觉得他留在纽卡不是妥协，是靠自己把小城球队扛成了强队，这才是真本事。",
    spiritPlayer: "阿兰·希勒",
    spiritPlayerWhy: "他守着纽卡二十年，用力量型打法刷爆了英超进球纪录。",
    strengths: ["辩论时一定能扛得住团队论调，「一个梅西够了」是你的口头禅", "每个数据都是你的弹药，对面只能搬「你不懂足球」", "不被花活忽悠，看 90 分钟跑动 12 公里的工兵也能感动"],
    weaknesses: ["「英雄不出场就没戏」让你常在配合型比赛里看哭", "朋友跟你聊球，你聊数据，话题死在第三句", "小罗那种花活进球你嘴上夸两句，心里嫌华而不实"],
    compatibility: "HDGN",
    nemesis: "TFGN",
    shareText: "足球 MBTI 测出来我是「圣詹姆斯重炮」🔨——守着小城的力量数据怪",
  },
  HDPN: {
    code: "HDPN",
    name: "魔人布欧推土机",
    emoji: "🚀",
    tagline: "走到哪刷到哪的力量怪",
    description: "你就爱哈兰德那种碾压后卫的推土机踢法，谁跟你扯别的你就甩他单赛季52球的恐怖数据。你觉得球员就该去最强的舞台刷数据，去哪强就去哪，这才是职业球员的本分。",
    spiritPlayer: "埃尔林·哈兰德",
    spiritPlayerWhy: "他走到哪就把进球纪录刷到哪，用力量型打法统治赛场。",
    strengths: ["辩论时一定能扛得住团队论调，「一个梅西够了」是你的口头禅", "每个数据都是你的弹药，对面只能搬「你不懂足球」", "不被花活忽悠，看 90 分钟跑动 12 公里的工兵也能感动"],
    weaknesses: ["「英雄不出场就没戏」让你常在配合型比赛里看哭", "朋友跟你聊球，你聊数据，话题死在第三句", "小罗那种花活进球你嘴上夸两句，心里嫌华而不实"],
    compatibility: "HDGL",
    nemesis: "TFGL",
    shareText: "足球 MBTI 测出来我是「魔人布欧推土机」🚀——走到哪刷到哪的力量怪",
  },
  HFGL: {
    code: "HFGL",
    name: "斑马王子守夜人",
    emoji: "🕯️",
    tagline: "守着斑马的优雅情怀党",
    description: "你就迷皮耶罗区域那种四两拨千斤的优雅，当年尤文降级他没走的瞬间你哭了一整晚。你才不管什么进球数据，就冲这份守了球队20年的忠诚，他就是你心里永远的斑马王子。",
    spiritPlayer: "德尔·皮耶罗",
    spiritPlayerWhy: "他在尤文低谷时不离不弃，用优雅球风守护了斑马军团二十年。",
    strengths: ["辩论时一定能扛得住团队论调，「一个梅西够了」是你的口头禅", "朋友圈发的足球感悟没人不点赞", "看球像看画展，每个停球都值得截图"],
    weaknesses: ["「英雄不出场就没戏」让你常在配合型比赛里看哭", "数据派朋友把你按在地上摩擦，反驳全靠「你不懂」", "哈兰德这种功能型杀手你是看不上眼的，朋友吐槽你「精英病」"],
    compatibility: "HFPN",
    nemesis: "TDPN",
    shareText: "足球 MBTI 测出来我是「斑马王子守夜人」🕯️——守着斑马的优雅情怀党",
  },
  HFGN: {
    code: "HFGN",
    name: "浪游天外飞仙",
    emoji: "🌌",
    tagline: "浪迹天涯的优雅情怀党",
    description: "你就迷齐达内那脚天外飞仙的极致优雅，那个瞬间你记了二十年。你才不管他从尤文转会皇马，你觉得天才就该去最顶级的舞台，那些刻进DNA的传奇瞬间，比什么队徽都重要。",
    spiritPlayer: "齐内丁·齐达内",
    spiritPlayerWhy: "他浪迹多队却留下无数经典瞬间，用优雅球风留下无数传奇。",
    strengths: ["辩论时一定能扛得住团队论调，「一个梅西够了」是你的口头禅", "朋友圈发的足球感悟没人不点赞", "看球像看画展，每个停球都值得截图"],
    weaknesses: ["「英雄不出场就没戏」让你常在配合型比赛里看哭", "数据派朋友把你按在地上摩擦，反驳全靠「你不懂」", "哈兰德这种功能型杀手你是看不上眼的，朋友吐槽你「精英病」"],
    compatibility: "HFPL",
    nemesis: "TDPL",
    shareText: "足球 MBTI 测出来我是「浪游天外飞仙」🌌——浪迹天涯的优雅情怀党",
  },
  HFPL: {
    code: "HFPL",
    name: "伊斯坦布尔战神",
    emoji: "⚓",
    tagline: "守着红军的力量情怀党",
    description: "你永远忘不了伊斯坦布尔那个下半场，杰拉德带着球队3-3翻盘的瞬间你哭到缺氧。你才不管什么进球数据，就冲他一辈子守着利物浦，扛着球队往前冲，他就是你心里永远的红军队长。",
    spiritPlayer: "史蒂文·杰拉德",
    spiritPlayerWhy: "他用伊斯坦布尔的奇迹诠释了力量与忠诚，一辈子守护红军。",
    strengths: ["辩论时一定能扛得住团队论调，「一个梅西够了」是你的口头禅", "朋友圈发的足球感悟没人不点赞", "不被花活忽悠，看 90 分钟跑动 12 公里的工兵也能感动"],
    weaknesses: ["「英雄不出场就没戏」让你常在配合型比赛里看哭", "数据派朋友把你按在地上摩擦，反驳全靠「你不懂」", "小罗那种花活进球你嘴上夸两句，心里嫌华而不实"],
    compatibility: "HFGN",
    nemesis: "TDGN",
    shareText: "足球 MBTI 测出来我是「伊斯坦布尔战神」⚓——守着红军的力量情怀党",
  },
  HFPN: {
    code: "HFPN",
    name: "加迪夫倒钩天王",
    emoji: "👑",
    tagline: "追强者的力量型情怀党",
    description: "你永远忘不了加迪夫那脚逆天倒钩，那个瞬间你直接从沙发上跳起来。你才不管他转了多少次会，你就爱他那种自律到极致的力量感，那些关键时刻的绝杀，比什么忠诚的口号都重要。",
    spiritPlayer: "克里斯蒂亚诺·罗纳尔多",
    spiritPlayerWhy: "他辗转多队却始终在关键时刻站出来，用自律和力量创造无数传奇。",
    strengths: ["辩论时一定能扛得住团队论调，「一个梅西够了」是你的口头禅", "朋友圈发的足球感悟没人不点赞", "不被花活忽悠，看 90 分钟跑动 12 公里的工兵也能感动"],
    weaknesses: ["「英雄不出场就没戏」让你常在配合型比赛里看哭", "数据派朋友把你按在地上摩擦，反驳全靠「你不懂」", "小罗那种花活进球你嘴上夸两句，心里嫌华而不实"],
    compatibility: "HFGL",
    nemesis: "TDGL",
    shareText: "足球 MBTI 测出来我是「加迪夫倒钩天王」👑——追强者的力量型情怀党",
  },
  TDGL: {
    code: "TDGL",
    name: "拉玛西亚数据师",
    emoji: "🎼",
    tagline: "拉玛西亚的传控数据怪",
    description: "你是tiki-taka的原教旨主义者，就爱看巴萨那种一脚出球的传控配合。你会算传球成功率、跑动距离这些数据，谁黑体系你就把数据甩他脸上，你守了巴萨一辈子，就信这套能赢所有比赛。",
    spiritPlayer: "哈维",
    spiritPlayerWhy: "他是拉玛西亚体系的核心，用传控数据统治了整个足坛。",
    strengths: ["看比赛能讲战术，朋友约你看球前都打好心理准备", "每个数据都是你的弹药，对面只能搬「你不懂足球」", "看球像看画展，每个停球都值得截图"],
    weaknesses: ["看到一个人 solo 过 5 人破门，你心里其实有点酸", "朋友跟你聊球，你聊数据，话题死在第三句", "哈兰德这种功能型杀手你是看不上眼的，朋友吐槽你「精英病」"],
    compatibility: "TDPN",
    nemesis: "HFPN",
    shareText: "足球 MBTI 测出来我是「拉玛西亚数据师」🎼——拉玛西亚的传控数据怪",
  },
  TDGN: {
    code: "TDGN",
    name: "丁丁传控游侠",
    emoji: "🎯",
    tagline: "浪游的传控体系数据怪",
    description: "你就爱曼城那种瓜式传控的流畅配合，丁丁的手术刀传球你能看一百遍。你会算助攻数、预期助攻这些数据，谁黑转会你就说职业球员就该去最强的体系，你追的是最强的团队，不是队徽。",
    spiritPlayer: "凯文·德布劳内",
    spiritPlayerWhy: "他辗转多队，最终在曼城的体系里把传控数据刷到了极致。",
    strengths: ["看比赛能讲战术，朋友约你看球前都打好心理准备", "每个数据都是你的弹药，对面只能搬「你不懂足球」", "看球像看画展，每个停球都值得截图"],
    weaknesses: ["看到一个人 solo 过 5 人破门，你心里其实有点酸", "朋友跟你聊球，你聊数据，话题死在第三句", "哈兰德这种功能型杀手你是看不上眼的，朋友吐槽你「精英病」"],
    compatibility: "TDPL",
    nemesis: "HFPL",
    shareText: "足球 MBTI 测出来我是「丁丁传控游侠」🎯——浪游的传控体系数据怪",
  },
  TDPL: {
    code: "TDPL",
    name: "圣西罗绞杀机",
    emoji: "⚙️",
    tagline: "守米兰的体系力量数据怪",
    description: "你是米兰体系的死忠，就爱加图索那种中场绞杀的力量感，是皮尔洛身边的完美拼图。你会算抢断数、跑动覆盖这些数据，谁黑体系你就把数据甩他脸上，你守了米兰一辈子，就信这套搭配能赢所有。",
    spiritPlayer: "格纳罗·加图索",
    spiritPlayerWhy: "他一辈子守着米兰，用力量型的防守数据撑起了米兰的中场体系。",
    strengths: ["看比赛能讲战术，朋友约你看球前都打好心理准备", "每个数据都是你的弹药，对面只能搬「你不懂足球」", "不被花活忽悠，看 90 分钟跑动 12 公里的工兵也能感动"],
    weaknesses: ["看到一个人 solo 过 5 人破门，你心里其实有点酸", "朋友跟你聊球，你聊数据，话题死在第三句", "小罗那种花活进球你嘴上夸两句，心里嫌华而不实"],
    compatibility: "TDGN",
    nemesis: "HFGN",
    shareText: "足球 MBTI 测出来我是「圣西罗绞杀机」⚙️——守米兰的体系力量数据怪",
  },
  TDPN: {
    code: "TDPN",
    name: "中场扫荡铁闸",
    emoji: "🛡️",
    tagline: "追强者的体系力量数据怪",
    description: "你就爱那句没有过不去的坎只有过不去的坎特，那种覆盖整个中场的扫荡你爱惨了。你会算抢断、解围这些数据，谁跟你扯忠诚你就说职业球员就该去最强的体系，你追的是能赢球的团队，不是老东家。",
    spiritPlayer: "恩戈洛·坎特",
    spiritPlayerWhy: "他辗转多队，用顶级的防守数据撑起了每个队的防守体系。",
    strengths: ["看比赛能讲战术，朋友约你看球前都打好心理准备", "每个数据都是你的弹药，对面只能搬「你不懂足球」", "不被花活忽悠，看 90 分钟跑动 12 公里的工兵也能感动"],
    weaknesses: ["看到一个人 solo 过 5 人破门，你心里其实有点酸", "朋友跟你聊球，你聊数据，话题死在第三句", "小罗那种花活进球你嘴上夸两句，心里嫌华而不实"],
    compatibility: "TDGL",
    nemesis: "HFGL",
    shareText: "足球 MBTI 测出来我是「中场扫荡铁闸」🛡️——追强者的体系力量数据怪",
  },
  TFGL: {
    code: "TFGL",
    name: "南非绝杀守夜人",
    emoji: "💙",
    tagline: "守巴萨的传控优雅情怀党",
    description: "你永远忘不了南非世界杯伊涅斯塔那个绝杀，还有巴萨六冠王的那些传控瞬间，你哭了一整晚。你才不管什么传球数据，就冲他守了巴萨一辈子，那些刻进DNA的传控情怀，比什么都重要。",
    spiritPlayer: "安德烈斯·伊涅斯塔",
    spiritPlayerWhy: "他一辈子守着巴萨，用优雅的传控留下了无数传奇情怀瞬间。",
    strengths: ["看比赛能讲战术，朋友约你看球前都打好心理准备", "朋友圈发的足球感悟没人不点赞", "看球像看画展，每个停球都值得截图"],
    weaknesses: ["看到一个人 solo 过 5 人破门，你心里其实有点酸", "数据派朋友把你按在地上摩擦，反驳全靠「你不懂」", "哈兰德这种功能型杀手你是看不上眼的，朋友吐槽你「精英病」"],
    compatibility: "TFPN",
    nemesis: "HDPN",
    shareText: "足球 MBTI 测出来我是「南非绝杀守夜人」💙——守巴萨的传控优雅情怀党",
  },
  TFGN: {
    code: "TFGN",
    name: "魔笛浪游宗师",
    emoji: "🎻",
    tagline: "浪游的传控优雅情怀党",
    description: "你永远忘不了2018年莫德里奇带着皇马欧冠三连，还有克罗地亚的世界杯奇迹，哪怕当年金球奖有争议，你也站他。你才不管他从热刺转会皇马，你就爱他那种优雅的传控，那些传奇瞬间比什么队徽都重要。",
    spiritPlayer: "卢卡·莫德里奇",
    spiritPlayerWhy: "他辗转多队，用优雅的传控留下了欧冠三连的传奇情怀。",
    strengths: ["看比赛能讲战术，朋友约你看球前都打好心理准备", "朋友圈发的足球感悟没人不点赞", "看球像看画展，每个停球都值得截图"],
    weaknesses: ["看到一个人 solo 过 5 人破门，你心里其实有点酸", "数据派朋友把你按在地上摩擦，反驳全靠「你不懂」", "哈兰德这种功能型杀手你是看不上眼的，朋友吐槽你「精英病」"],
    compatibility: "TFPL",
    nemesis: "HDPL",
    shareText: "足球 MBTI 测出来我是「魔笛浪游宗师」🎻——浪游的传控优雅情怀党",
  },
  TFPL: {
    code: "TFPL",
    name: "巴萨后防狮王",
    emoji: "🦁",
    tagline: "守巴萨的体系力量情怀党",
    description: "你永远忘不了普约尔那个奋不顾身的门线救险，还有巴萨梦二梦三的那些铁血防守，你哭了一整晚。你才不管什么防守数据，就冲他守了巴萨一辈子，那些刻进DNA的铁血情怀，比什么都重要。",
    spiritPlayer: "卡莱斯·普约尔",
    spiritPlayerWhy: "他一辈子守着巴萨，用铁血的力量撑起了巴萨的后防体系，留下无数传奇。",
    strengths: ["看比赛能讲战术，朋友约你看球前都打好心理准备", "朋友圈发的足球感悟没人不点赞", "不被花活忽悠，看 90 分钟跑动 12 公里的工兵也能感动"],
    weaknesses: ["看到一个人 solo 过 5 人破门，你心里其实有点酸", "数据派朋友把你按在地上摩擦，反驳全靠「你不懂」", "小罗那种花活进球你嘴上夸两句，心里嫌华而不实"],
    compatibility: "TFGN",
    nemesis: "HDGN",
    shareText: "足球 MBTI 测出来我是「巴萨后防狮王」🦁——守巴萨的体系力量情怀党",
  },
  TFPN: {
    code: "TFPN",
    name: "九五之尊游侠",
    emoji: "💎",
    tagline: "追强者的体系力量情怀党",
    description: "你永远忘不了莱万那9分钟5球的神迹，那个瞬间你直接看傻了，这辈子都忘不掉。你才不管他从多特转会拜仁再到皇马，你就爱他那种力量型的中锋，那些刻进DNA的传奇瞬间，比什么忠诚的口号都重要。",
    spiritPlayer: "罗伯特·莱万多夫斯基",
    spiritPlayerWhy: "他辗转多队，用力量型的打法留下了9分钟5球的传奇神迹。",
    strengths: ["看比赛能讲战术，朋友约你看球前都打好心理准备", "朋友圈发的足球感悟没人不点赞", "不被花活忽悠，看 90 分钟跑动 12 公里的工兵也能感动"],
    weaknesses: ["看到一个人 solo 过 5 人破门，你心里其实有点酸", "数据派朋友把你按在地上摩擦，反驳全靠「你不懂」", "小罗那种花活进球你嘴上夸两句，心里嫌华而不实"],
    compatibility: "TFGL",
    nemesis: "HDGL",
    shareText: "足球 MBTI 测出来我是「九五之尊游侠」💎——追强者的体系力量情怀党",
  },
};

const FALLBACK_TYPE: FbtiType = {
  code: "XXXX",
  name: "薛定谔球迷",
  emoji: "🌀",
  tagline: "你的答题组合罕见到系统都分不清你站哪",
  description: "观测前你既梅又罗，既铁血又花哨——这种球迷比 4 字母 MBTI 还稀有。",
  spiritPlayer: "汉斯·克兰克尔（你听都没听过的奥地利锋霸）",
  spiritPlayerWhy: "和你一样，谁都没法精准 label",
  strengths: ["不被任何叙事绑架"],
  weaknesses: ["论坛对线时没人能跟你站到底"],
  compatibility: "XXXX",
  nemesis: "XXXX",
};

export function computeFbtiCode(answers: FbtiAnswer[]): string {
  const scores: Record<PoleKey, number> = {
    H: 0, T: 0, D: 0, F: 0, G: 0, P: 0, L: 0, N: 0,
  };

  for (const answer of answers) {
    const question = fbtiQuestions.find((q) => q.id === answer.questionId);
    if (!question) continue;
    if (question.type === "open") continue;

    if (question.type === "binary" && answer.selected) {
      if (answer.selected === "A" && question.optionA) {
        scores[question.optionA.pole] += 2;
      } else if (answer.selected === "B" && question.optionB) {
        scores[question.optionB.pole] += 2;
      }
    }

    if (question.type === "multi" && answer.selectedIndices && question.options) {
      for (const idx of answer.selectedIndices) {
        const option = question.options[idx];
        if (!option) continue;
        for (const [pole, value] of Object.entries(option.scores)) {
          scores[pole as PoleKey] += value;
        }
      }
    }
  }

  const dim1 = scores.H >= scores.T ? "H" : "T";
  const dim2 = scores.D >= scores.F ? "D" : "F";
  const dim3 = scores.G >= scores.P ? "G" : "P";
  const dim4 = scores.L >= scores.N ? "L" : "N";

  return `${dim1}${dim2}${dim3}${dim4}`;
}

export function getFbtiType(code: string): FbtiType {
  return fbtiTypes[code] ?? FALLBACK_TYPE;
}

export function getCoreQuestions(): FbtiQuestion[] {
  return fbtiQuestions.filter((q) => q.core);
}
