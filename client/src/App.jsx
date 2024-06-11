import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPop();
  }, []);

  const getPop = async () => {
    const getPopimi = await axios.get("http://localhost:4001/products");
    setData(getPopimi.data.data);
    console.log(getPopimi.data.data)
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`)
    getPop();
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {data.map((item) => {
        return (
          <div className="product-list" key={item.id}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>

              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price:{item.price} </h2>
                <p>Product description: {item.description}</p>
              </div>
              <button className="delete-button" onClick={(event) => {handleDelete(item.id)}}>x</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
