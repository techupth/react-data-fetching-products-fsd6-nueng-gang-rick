import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  let [products, setProducts] = useState([]);
  let [loading,setLoading] = useState(false)
  let main = async () => {
    try{
      setLoading(true)
    let post = await axios.get("http://localhost:4001/products");
    console.log(post.data.data);
    setProducts(post.data.data);
    setLoading(false)
    }catch(error){
      console.error("Fetching Error...");
    }
  }
  useEffect(() => {
    main();
  }, []);
  let removePost = async (id)=>{
    await axios.delete(`http://localhost:4001/products/${id}`);
  }
  useEffect(()=>{
    removePost()
  },[])
  
  let toggleRemove =(index)=>{
    let product = products[index]
    removePost(product.id)
  }
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>{!loading ? products.map((item,index) => {
        return (
          <div className="product-list" key={item.id}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt={item.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>
              <button className="delete-button" onClick={()=>toggleRemove(index)}>x</button>
            </div>
          </div>
        );
      }):<h1>Loading...</h1>}
      
    </div>
  );
}

export default App;

