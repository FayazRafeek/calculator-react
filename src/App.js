import './App.css';
import GlobalStyle from './GobalStyles'
import CalculatorSmall from './Components/CalculatorSmall';

function App() {
  return (
    <>
    <GlobalStyle />
      <div className="App" style={{display:'flex', width:'100%',height:'100vh'}}>
    
        <CalculatorSmall />
      
      </div>
    </>
  
  );
}

export default App;
