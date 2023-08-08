// Libs
import { useEffect } from 'react';
import WebFontLoader from 'webfontloader';

import Whiteboard from './pages/whiteboard';

// Stores
import { initializeStore, Provider } from './models/root';

const store = initializeStore();

const App = () => {
  useEffect(() => {
    // Fetch necessary fonts.
    WebFontLoader.load({
      google: {
        families: ["Open Sans:400,700", "Montserrat:400,700",]
      },
      fontactive: () => {
        
      }
    });
  }, []);
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
