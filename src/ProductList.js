import { useEffect, useState } from "react";
import "./ProductList.css";  // Import CSS file

function ProductList() {
    const [message, setMessage] = useState('');
    const [list, setList] = useState([]);

    // Fetch welcome message
    useEffect(() => {
        fetch('http://localhost:8080/getdata')
            .then(res => res.text())
            .then(data => setMessage(data));
    }, []);

    // Fetch product list
    useEffect(() => {
        fetch('http://localhost:8080/list')
            .then(res => res.json()) // ✅ backend should return JSON array of objects
            .then(data => setList(data))
            .catch(() => setList([]));
    }, []);

    return (

        <div className="container">
            <h3 className="title">{message}</h3>
            <h4 className="subtitle">Product List:</h4>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {list.length > 0 ? (
                        list.map((product, index) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.qty}</td>
                                <td>{product.phno}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
