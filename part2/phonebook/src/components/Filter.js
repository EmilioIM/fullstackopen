export const Filter = ({newFilter, handleSearch}) => {
  return (
    <>
      <span>search: </span>
      <input value={newFilter} onChange={handleSearch} />
    </>
  )
}