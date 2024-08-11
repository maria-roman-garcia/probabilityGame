export interface SquareObjCommonInfo {
  color: SquareColor,
  size: SquareSize,
  dot: boolean
}

export interface SquareObj extends SquareObjCommonInfo, IProps_Square {
  id: number,
}

export interface SquareObjTarget extends SquareObjCommonInfo, GameSolutionForAllCases {
  targetPercentage_color: number,
  targetPercentage_size: number,
  targetPercentage_dot: number,
  targetPercentage_all: number
}

export interface GameSolutionForAllCases {
  solution_color: SolutionItem,
  solution_size: SolutionItem,
  solution_dot: SolutionItem,
  solution_all: SolutionItem
}

export interface SolutionItem {
  targetCases: number,
  notLikeTargetCases: number
}

export interface SquareObjCombinations extends SquareObjCommonInfo {
  numberOfUsedCases: number
}

type SquareColor = 'blue' | 'green' | 'orange';
type SquareSize = 'small' | 'large';

interface IProps_Square {
  isSelected: boolean,
  onClick: (squareId: number) => void
}

export interface PercentagesObj {
  targetPercentage: number,
  actualPercentage: number,
}