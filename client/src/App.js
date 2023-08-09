import './App.css';
import Welds from './pages/Welds';
import { Route, Routes } from 'react-router-dom';
import SingleWeld from './pages/SingleWeld';
import { AppProvider } from './AppContext';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <AppProvider>
        <Routes>
          <Route path='/' element={<Welds />} />
          <Route path='/Welds/:id' element={<SingleWeld />} />
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
