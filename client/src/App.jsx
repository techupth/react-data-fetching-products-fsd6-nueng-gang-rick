import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const product = await axios.get("http://localhost:4001/products");
      setProduct(product.data.data);
    } catch (error) {
      console.log("Error fetching the products", error);
    }
  };

  const removeProduct = async (id, index) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProduct(updatedProducts);
    } catch (error) {
      console.log("Error deleting the product", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {product.map((product, index) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src={product.image}
                alt={product.name}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => removeProduct(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
