import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import { useState } from 'react';


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let average = total === 0 ? 0 : (good*1 + neutral*0 + bad*(-1)) / total
  let positive = total === 0 ? 0 : (good/total) * 100

  if(total===0){
    return(
    <p>No feedback given</p>
    )
  }
  else{
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={total}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positive}/>
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood((prevState) => prevState + 1)
  const addNeutral = () => setNeutral((prevState) => prevState + 1)
  const addBad = () => setBad((prevState) => prevState + 1)

  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={() => addGood()} text={"good"} />
      <Button handleClick={() => addNeutral()} text={"neutral"} />
      <Button handleClick={() => addBad()} text={"bad"} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
