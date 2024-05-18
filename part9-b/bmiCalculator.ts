export function calculateBmi(height: number, weight: number): string {
  const bmi = weight / ((height / 100) ** 2);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

// Código para ejecutar la función con valores hard-coded
if (require.main === module) {
  const height = Number(process.argv[2]); // en centímetros
  const weight = Number(process.argv[3]); // en kilogramos
  
  if (!isNaN(height) && !isNaN(weight)) {
    console.log(calculateBmi(height, weight));
  } else {
    console.log('Por favor, proporciona la altura y el peso como argumentos');
  }
}