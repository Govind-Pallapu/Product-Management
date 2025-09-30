import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import "./App.css"; // 👈 Import CSS file

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Welcome To Vcube Product Company</h1>

        <nav className="navbar">
          <Link to="/" className="nav-link">Product List</Link>
          <Link to="/add" className="nav-link">Add Product</Link>
          <Link to="/update" className="nav-link">Update Product</Link>
          <Link to="/delete" className="nav-link">Delete Product</Link>
        </nav>

        <hr className="divider" />

        <div className="content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update" element={<UpdateProduct />} />
            <Route path="/delete" element={<DeleteProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
