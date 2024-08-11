import { SquareObjCombinations, SquareObjCommonInfo, SquareObjTarget } from "../interfaces/SquareInterface";

const getSquaresData = () => {
  return fetch('http://localhost:8080/squares', { method: 'GET' })
}

const optionsSquareColor = ['blue', 'green', 'orange'];
const optionsSquareSize = ['small', 'large'];
const optionsDot = [true, false];

const getSquareAllPossibleCombinationsUsedDataCases = (dataLoaded: SquareObjCommonInfo[]): SquareObjCombinations[] => {
  const allCombinations: any = [];

  optionsSquareColor.forEach((color) => {
    optionsSquareSize.forEach((size) => {
      optionsDot.forEach((dot) => {

        const numberOfUsages: number = dataLoaded.filter(e =>
          e.color === color
          && e.size === size
          && e.dot === dot).length;

        allCombinations.push({
          color: color,
          size: size,
          dot: dot,
          numberOfUsedCases: numberOfUsages
        });
      });
    });
  });

  return allCombinations;
}

const getTargetPercentageBasedOnData = (data: SquareObjCommonInfo[], target: SquareObjCommonInfo): SquareObjTarget => {

  const totalData = data.length; //should be always 21

  //filter total cases by selected filter
  const totalByTarget_color = data.filter(e => e.color === target.color).length;
  const totalByTarget_size = data.filter(e => e.size === target.size).length;
  const totalByTarget_dot = data.filter(e => e.dot === target.dot).length;
  const totalByTarget_all = data.filter(e => e.color === target.color && e.size === target.size && e.dot === target.dot).length;

  //Generate a random number between 0 and max cases like target cases
  const randomTarget_color = Math.ceil(Math.random() * totalByTarget_color);
  const randomTarget_size = Math.ceil(Math.random() * totalByTarget_size);
  const randomTarget_dot = Math.ceil(Math.random() * totalByTarget_dot);
  const randomTarget_all = Math.ceil(Math.random() * totalByTarget_all);

  //Generate a random number between 0 and max cases but not target cases (max lenght)
  const randomTotal_color = Math.ceil(Math.random() * (totalData - randomTarget_color));
  const randomTotal_size = Math.ceil(Math.random() * (totalData - randomTarget_size));
  const randomTotal_dot = Math.ceil(Math.random() * (totalData - randomTarget_dot));
  const randomTotal_all = Math.ceil(Math.random() * (totalData - randomTarget_all));

  //random total + random target - 100% -> total data
  //random target                - X    -> Calculate random % for target

  const solution = {
    solution_color: { targetCases: randomTarget_color, notLikeTargetCases: randomTotal_color },
    solution_size: { targetCases: randomTarget_size, notLikeTargetCases: randomTotal_size },
    solution_dot: { targetCases: randomTarget_dot, notLikeTargetCases: randomTotal_dot },
    solution_all: { targetCases: randomTarget_all, notLikeTargetCases: randomTotal_all }
  }

  const percentagesResult: SquareObjTarget = {
    targetPercentage_color: (randomTarget_color * 100) / (randomTotal_color + randomTarget_color),
    targetPercentage_size: (randomTarget_size * 100) / (randomTotal_size + randomTarget_size),
    targetPercentage_dot: (randomTarget_dot * 100) / (randomTotal_dot + randomTarget_dot),
    targetPercentage_all: (randomTarget_all * 100) / (randomTotal_all + randomTarget_all),
    ...target,
    ...solution
  }
  return percentagesResult;

}

export { getSquaresData, getSquareAllPossibleCombinationsUsedDataCases, getTargetPercentageBasedOnData, optionsSquareColor, optionsSquareSize, optionsDot };