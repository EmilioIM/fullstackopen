// Interface para el objeto de resultados
interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// Función para calcular los ejercicios
export function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day > 0).length;
  const totalHours = dailyHours.reduce((acc, curr) => acc + curr, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job, you met your target!';
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to work harder to meet your target';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

const parseArguments = (args: Array<string>): { dailyHours: number[], target: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [, , target, ...hours] = args;
  if (!isNaN(Number(target)) && hours.every(hour => !isNaN(Number(hour)))) {
    return {
      target: Number(target),
      dailyHours: hours.map(hour => Number(hour))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  } else {
    console.log('An unexpected error occurred');
  }
}