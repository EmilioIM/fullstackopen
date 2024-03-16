import Button from "./components/Button"
import Statistics from "./components/Statistics"
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { good, ok, bad, reset } from './features/counter/counterSlice';


const App = () => {
    const count = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    
    return (
      <>
        <h2>give feedback</h2>
        <Button handleClick={() => dispatch(bad())} text={"bad"} />
        <Button handleClick={() => dispatch(ok())} text={"neutral"} />
        <Button handleClick={() => dispatch(good())} text={"good"} />
        <h2>statistics</h2>
        <Statistics good={count.good} neutral={count.ok} bad={count.bad}/>
        <br/>
        <Button handleClick={() => dispatch(reset())} text={"RESET"} />
      </>
    )
  }

  export default App