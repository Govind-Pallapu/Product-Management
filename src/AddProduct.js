import { useState } from "react";
import "./AddProduct.css"; // 👈 Import CSS

function AddProduct() {
    const [form, setForm] = useState({ name: '', price: '', qty: '', phno: '' });
    const [response, setResponse] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => res.text())
            .then(data => {
                setResponse(data);
                setForm({ name: '', price: '', qty: '', phno: '' });
            });
    };

    return (
        <div className="form-container">
            <h3 className="form-title">Add Product</h3>
            <form onSubmit={handleSubmit} className="product-form">
                <input
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                />
                <input
                    className="form-input"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                <input
                    className="form-input"
                    name="qty"
                    type="number"
                    value={form.qty}
                    onChange={handleChange}
                    placeholder="Quantity"
                />
                <input
                    className="form-input"
                    name="phno"
                    value={form.phno}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
                <button type="submit" className="submit-btn">Add Product</button>
            </form>
            {response && <p className="response-msg">{response}</p>}
        </div>
    );
}

export default AddProduct;
