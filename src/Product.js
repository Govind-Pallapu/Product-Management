import { useEffect, useState } from "react";

function Product() {
    const [message, setMessage] = useState('');
    const [list, setList] = useState('');

    const [response, setResponse] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const [form, setForm] = useState({
        name: '',
        price: '',
        qty: '',
        phno: ''
    });

    const [form2, setForm2] = useState({
        id: '',
        name: '',
        price: '',
        qty: '',
        phno: ''
    });

    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/getdata')
            .then(res => res.text())
            .then(data => setMessage(data))
            .catch(err => console.error('Error fetching message', err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/list')
            .then(res => res.text())
            .then(data => setList(data))
            .catch(err => console.error('Error fetching list', err));
    }, []);

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
                console.log("text,data", data)
                setResponse(data);
                setForm({ name: '', price: '', qty: '', phno: '' });
            })
            .catch(error => console.error('Error posting product:', error));
    };

    const handleChange2 = (e) => {
        setForm2({ ...form2, [e.target.name]: e.target.value });
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/update/${form2.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form2.name,
                price: form2.price,
                qty: form2.qty,
                phno: form2.phno
            })
        })
            .then(res => res.text())
            .then(data => {
                setUpdateMessage(data);
                setForm2({ id: '', name: '', price: '', qty: '', phno: '' });
            })
            .catch(error => console.error('Error updating product:', error));
    };

    // ✅ DELETE: Delete Product
    const handleDeleteChange = (e) => {
        setDeleteId(e.target.value);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/remove/${deleteId}`, {
            method: 'DELETE'
        })
            .then(res => res.text())
            .then(data => {
                setDeleteMessage(data);
                setDeleteId('');
            })
            .catch(err => console.error('Error deleting product:', err));
    };

    return (
        <>
            <div><h3>{message}</h3></div>

            <h4>List of Products:</h4>
            <div>{list}</div>

            <div>
                <h3>Add New Product</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required /><br />
                    <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required /><br />
                    <input type="number" name="qty" value={form.qty} onChange={handleChange} placeholder="Quantity" required /><br />
                    <input type="text" name="phno" value={form.phno} onChange={handleChange} placeholder="Phone No" required /><br />
                    <button type="submit">Add Product</button>
                </form>
                <p>{response}</p>
            </div>

            <div>
                <h3>Update Product</h3>
                <form onSubmit={handleSubmit2}>
                    <input type="number" name="id" value={form2.id} onChange={handleChange2} placeholder="Product ID" required /><br />
                    <input type="text" name="name" value={form2.name} onChange={handleChange2} placeholder="Name" required /><br />
                    <input type="number" name="price" value={form2.price} onChange={handleChange2} placeholder="Price" required /><br />
                    <input type="number" name="qty" value={form2.qty} onChange={handleChange2} placeholder="Qty" required /><br />
                    <input type="text" name="phno" value={form2.phno} onChange={handleChange2} placeholder="Phone No" required /><br />
                    <button type="submit" onClick={console.log("buttonclicked")}>Update Product</button>
                </form>
                <p>{updateMessage}</p>
            </div>

            <div>
                <h3>Delete Product</h3>
                <form onSubmit={handleDelete}>
                    <input type="number" value={deleteId} onChange={handleDeleteChange} placeholder="Enter Product ID to Delete" required /><br />
                    <button type="submit">Delete Product</button>
                </form>
                <p>{deleteMessage}</p>
            </div>
        </>
    );
}

export default Product;
