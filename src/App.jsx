import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { useEffect, useState } from 'react';
import Header from './components/Header/index'

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  console.log(items)
  
  return (
    <>
    <Header />
      {items.map((item) => (
        <div key={item.id} style={{display:"inline"}}>
          <h1>{item.title}</h1>
          <img src={item.image} width={100} alt="" style={{display:"inline"}} />
          <p>{item.description}</p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default App;
