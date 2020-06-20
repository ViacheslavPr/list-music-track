import React from 'react';
import { Provider } from 'mobx-react';
import { stores } from './stores/root-store';
import MainPage from './pages/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <Provider {...stores}>
      <div className="App">
        <MainPage/>
      </div>
    </Provider>
  );
}

export default App;
