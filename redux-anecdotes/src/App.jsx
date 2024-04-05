import AnecdoteList from './components/AnecdoteList'; // Asegúrate de importar AnecdoteForm
import AnecdoteForm from './components/AnecdoteForm'; // Asegúrate de importar AnecdoteForm
import Notification from './components/Notification'; // Asegúrate de importar AnecdoteForm
import Filter from './components/Filter';

const App = () => {
  return (
    <>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App