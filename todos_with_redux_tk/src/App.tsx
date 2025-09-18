import ListOfTodos from './components/ListOfTodos'
import TodosStats from './components/TodosStats'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
	return (
		<Provider store={store}>
			<ListOfTodos />
			<TodosStats />
		</Provider>
	)
}

export default App
