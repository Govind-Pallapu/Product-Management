import { useState } from "react";
import "./DeleteProduct.css"; // 👈 Import CSS file

function DeleteProduct() {
    const [deleteId, setDeleteId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/remove/${deleteId}`, {
            method: 'DELETE'
        })
            .then(res => res.text())
            .then(data => {
                setMessage(data);
                setDeleteId('');
            });
    };

    return (
        <div className="form-container">
            <h3 className="form-title delete-title">Delete Product</h3>
            <form onSubmit={handleDelete} className="product-form">
                <input
                    type="number"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    placeholder="Enter Product ID"
                    required
                    className="form-input"
                />
                <button type="submit" className="delete-btn">Delete</button>
            </form>
            {message && <p className="response-msg">{message}</p>}
        </div>
    );
}

export default DeleteProduct;
