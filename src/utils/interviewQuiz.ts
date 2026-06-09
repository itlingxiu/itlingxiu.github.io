export interface QuizQuestion {
  id: number;
  category: string;
  difficulty: '简单' | '中等' | '困难';
  question: string;
  answer: string;
  acceptance: number;
}

/** 每日新增题目数 */
export const DAILY_NEW_COUNT = 4;

/** 题库首发日期 */
const EPOCH = new Date(2026, 0, 1);

const todayStart = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** 题目首次上线日期 */
export const getPublishDate = (id: number): Date => {
  const dayIndex = Math.floor((id - 1) / DAILY_NEW_COUNT);
  const d = new Date(EPOCH);
  d.setDate(d.getDate() + dayIndex);
  d.setHours(0, 0, 0, 0);
  return d;
};

const daysSinceEpoch = (): number =>
  Math.floor((todayStart().getTime() - EPOCH.getTime()) / 86400000);

const getRolloutDays = (total: number): number => Math.ceil(total / DAILY_NEW_COUNT);

/** 题目是否已发布（历史题目永久保留） */
export const isPublished = (id: number): boolean => getPublishDate(id) <= todayStart();

/** 今日更新题目 ID */
export const getTodayQuestionIds = (questions: QuizQuestion[]): number[] => {
  const rolloutDays = getRolloutDays(questions.length);
  const days = daysSinceEpoch();
  const today = todayStart();

  if (days < rolloutDays) {
    return questions
      .filter((q) => getPublishDate(q.id).getTime() === today.getTime())
      .map((q) => q.id);
  }

  const rotationDay = days - rolloutDays;
  const startIdx = (rotationDay * DAILY_NEW_COUNT) % questions.length;
  return Array.from({ length: DAILY_NEW_COUNT }, (_, i) => questions[(startIdx + i) % questions.length].id);
};

export const isTodayUpdate = (id: number, questions: QuizQuestion[]): boolean =>
  getTodayQuestionIds(questions).includes(id);

export const formatQuizDate = (d: Date): string =>
  `${d.getMonth() + 1}月${d.getDate()}日`;

export const sortQuestions = (questions: QuizQuestion[], todayIds: number[]): QuizQuestion[] => {
  const todaySet = new Set(todayIds);
  return [...questions].sort((a, b) => {
    const aToday = todaySet.has(a.id);
    const bToday = todaySet.has(b.id);
    if (aToday !== bToday) return aToday ? -1 : 1;
    return getPublishDate(b.id).getTime() - getPublishDate(a.id).getTime();
  });
};
