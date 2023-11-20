export const Persons = ({persons, newFilter, handleClick}) => {
  return(
    <>
      {persons
        .filter(person => person.name
                          .toLowerCase()
                          .includes(newFilter.toLowerCase()))
        .map(person => 
          <div key={person.number}>
            <span>{person.name} </span>
            <span>{person.number} </span>
            <button onClick={() => handleClick(person.id)}>Delete</button>
          </div>
        )}
    </>
  )
}

