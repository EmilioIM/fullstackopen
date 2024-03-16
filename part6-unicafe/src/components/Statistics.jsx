import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {
    let total = good + neutral + bad
    // let average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * (-1)) / total
    // let positive = total === 0 ? 0 : (good / total) * 100

    if (total === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    else {
        return (
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    {/* <StatisticLine text="all" value={total} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positive} /> */}
                </tbody>
            </table>
        )
    }
}

export default Statistics