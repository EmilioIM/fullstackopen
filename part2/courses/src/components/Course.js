const Course = ({course}) => {
    const total = course.parts.reduce((total, part) => total + part.exercises, 0)
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={total} />
      </>
    )
  }
  
  const Header = ({ course }) => <h1>{course}</h1>
  
  const Total = ({ sum }) => <p>Number of exercises {sum}</p>
  
  const Content = ({ parts }) => 
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}    
    </>
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>


export default Course
