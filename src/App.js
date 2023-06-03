import logo from './logo.svg';
import './App.css';
import Title from './components/atoms/Title/Title'
import UploadForm from './components/atoms/UploadForm/Uploadform';
function App() {
  return (
    <div className="App">
      <Title />
      <UploadForm />
    </div>
  );
}

export default App;
