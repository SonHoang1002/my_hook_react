import './App.css';
import MyCallbackExample from './components/my_callback';
import MyContextExample from './components/my_context';
import MyUseActionStateExample from './components/my_use_action_state';

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <MyContextExample />
      </header>
    </div>
  );
}

export default App;
