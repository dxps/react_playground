import ListOfTodos from './components/ListOfTodos'
import { TodosProvider } from './contexts/TodosContext'
import TodosStats from './components/TodosStats'

function App() {
	return (
		<TodosProvider>
			<ListOfTodos />
			<TodosStats />
		</TodosProvider>
	)
}

export default App
