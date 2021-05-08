import './App.css';
import { BrowserRouter as Route} from 'react-router-dom'
import DisplayUsers from './components/display/DisplayUsers'

function App() {
  return (
    <>
      <Route>
        <DisplayUsers />
      </Route>
    </>
  );
}

export default App;
