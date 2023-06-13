import logo from './logo.svg';
import './App.css';
// import Title from './components/atoms/Title/Title'
import { Route, Routes } from 'react-router-dom';
import UploadForm from './components/atoms/UploadForm/Uploadform';
import Register from './components/atoms/Register/Register';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/uploadform' element={<UploadForm />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
      {/* <Title /> */}

    </div>
  );
}

export default App;
