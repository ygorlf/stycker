import Whiteboard from './pages/whiteboard';

// Stores
import { initializeStore, Provider } from './models/root';

const store = initializeStore();

const App = () => {
  return (
    <>
      <Provider
        value={store}
      >
        <Whiteboard />
      </Provider>
    </>
  )
}

export default App
