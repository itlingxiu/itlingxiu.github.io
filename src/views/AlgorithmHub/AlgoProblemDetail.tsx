'use client';

import React from 'react';
import type { AlgoProblem } from '../../data/algoBank';
import { pickApproach, pickStatement } from './solutionLookup';
import SolutionCodePanel from './SolutionCodePanel';

interface AlgoProblemDetailProps {
  problem: AlgoProblem;
  compact?: boolean;
}

/** 题目描述 + 思路要点 + 多语言参考答案（与力扣风格一致） */
const AlgoProblemDetail: React.FC<AlgoProblemDetailProps> = ({ problem, compact }) => (
  <>
    <p className="detail-block">
      <strong>题目描述</strong>
      {pickStatement(problem)}
    </p>
    <p className="detail-block">
      <strong>思路要点</strong>
      {pickApproach(problem)}
    </p>
    <SolutionCodePanel problem={problem} compact={compact} />
  </>
);

export default AlgoProblemDetail;
