import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const getDatas = await axios.get("http://localhost:4001/products");
    setData(getDatas.data.data);
    console.log(getDatas.data.data)
  };

  const handleDelete = async (id, index) => {
    await axios.delete(`http://localhost:4001/products/${id}`)
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData);
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {data.map((item, index) => {
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
              <button className="delete-button" onClick={(event) => {handleDelete(item.id, index)}}>x</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
