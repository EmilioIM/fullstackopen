export const Filter = ({searchText, handleChange}) => {

  return (
    <div style={{ marginBottom: '20px' }}>
      <span>find countries </span>
      <input value={searchText} onChange={handleChange} />
    </div>
  );
}