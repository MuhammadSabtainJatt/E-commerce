import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import './App.scss';
import Routes from './Routes'
import { useState } from 'react';
function App() {
  const [loading, setLoading] = useState(true)

  setInterval(() => {
    setLoading(false)
  }, 3000);
  return (
    <>{
      loading ?
      <div className='body'>
        <span className="loader"> </span>
      </div> :
        <Routes />
    }
    </>
  );
}

export default App;
