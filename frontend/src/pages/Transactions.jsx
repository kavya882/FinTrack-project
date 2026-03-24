import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    title: "",
    note: "",
    type: "EXPENSE",
    category: "FOOD",
    amount: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState({
    category: "",
    type: "",
    startDate: "",
    endDate: "",
  });

  const categories = [
    "FOOD",
    "RENT",
    "TRAVEL",
    "SHOPPING",
    "UTILITIES",
    "SALARY",
    "ENTERTAINMENT",
    "HEALTH",
    "EDUCATION",
    "OTHER",
  ];

  const types = ["INCOME", "EXPENSE"];

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      note: "",
      type: "EXPENSE",
      category: "FOOD",
      amount: "",
      date: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/transactions/${editingId}`, form);
      } else {
        await api.post("/transactions", form);
      }

      resetForm();
      fetchTransactions();
    } catch (error) {
      console.error("Error saving transaction", error);
    }
  };

  const handleEdit = (transaction) => {
    setForm({
      title: transaction.title,
      note: transaction.note || "",
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
    });
    setEditingId(transaction.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  const applyFilters = async () => {
    try {
      const params = new URLSearchParams();

      if (filter.category) params.append("category", filter.category);
      if (filter.type) params.append("type", filter.type);
      if (filter.startDate) params.append("startDate", filter.startDate);
      if (filter.endDate) params.append("endDate", filter.endDate);

      const response = await api.get(`/transactions/filter?${params.toString()}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error filtering transactions", error);
    }
  };

  return (
    <div className="page-container">
      <h2>Manage Transactions</h2>

        <div className="form-card">
          <h3>{editingId ? "Update Transaction" : "Add Transaction"}</h3>
          <form onSubmit={handleSubmit} className="grid-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="note"
              placeholder="Note"
              value={form.note}
              onChange={handleChange}
            />
            <select name="type" value={form.type} onChange={handleChange}>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <button type="submit">{editingId ? "Update" : "Add"}</button>
            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="form-card">
          <h3>Filter Transactions</h3>
          <div className="grid-form">
            <select name="type" value={filter.type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select name="category" value={filter.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
            />

            <input
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
            />

            <button onClick={applyFilters}>Apply Filters</button>
            <button onClick={fetchTransactions}>Reset</button>
          </div>
        </div>

        <div className="table-card">
          <h3>Transaction History</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Note</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>{txn.title}</td>
                    <td>{txn.note}</td>
                    <td>{txn.type}</td>
                    <td>{txn.category}</td>
                    <td>₹ {txn.amount}</td>
                    <td>{txn.date}</td>
                    <td>
                      <button onClick={() => handleEdit(txn)}>Edit</button>
                      <button onClick={() => handleDelete(txn.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default Transactions;