// App.js


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails"; 

function App() {
  return (
    <div>
      
      <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
