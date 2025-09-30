import { useState } from "react";
import "./UpdateProduct.css"; // 👈 Import CSS

function UpdateProduct() {
    const [form, setForm] = useState({ id: '', name: '', price: '', qty: '', phno: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/update/${form.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                price: form.price,
                qty: form.qty,
                phno: form.phno
            })
        })
            .then(res => res.text())
            .then(data => {
                setMessage(data);
                setForm({ id: '', name: '', price: '', qty: '', phno: '' });
            });
    };

    return (
        <div className="form-container">
            <h3 className="form-title">Update Product</h3>
            <form onSubmit={handleSubmit} className="product-form">
                <input
                    className="form-input"
                    name="id"
                    type="number"
                    value={form.id}
                    onChange={handleChange}
                    placeholder="Product ID"
                    required
                />
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
                <button type="submit" className="submit-btn">Update Product</button>
            </form>
            {message && <p className="response-msg">{message}</p>}
        </div>
    );
}

export default UpdateProduct;
