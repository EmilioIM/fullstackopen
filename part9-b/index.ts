import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: bmi
    });
  } else {
    res.status(400).send({ error: "Malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  // Comprueba si los parámetros están presentes
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).json({ error: "parameters missing" });
  }
  
  const { daily_exercises, target } = req.body;

  // Comprueba formato de los parámetros
  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    res.status(400).send({ error: "Malformatted parameters" });
  } else {
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});