import React, { useEffect, useState, useCallback } from "react";
import api from "../api/axiosConfig";
function Budgets() {
  const currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const [budgets, setBudgets] = useState([]);

  const [form, setForm] = useState({
    category: "FOOD",
    monthlyLimit: "",
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const [editingId, setEditingId] = useState(null);

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

  // FIXED FETCH FUNCTION
  const fetchBudgets = useCallback(async () => {
    try {
      const response = await api.get(`/budgets?month=${month}&year=${year}`);
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  }, [month, year]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      category: "FOOD",
      monthlyLimit: "",
      month,
      year,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/budgets/${editingId}`, form);
      } else {
        await api.post("/budgets", form);
      }

      resetForm();
      fetchBudgets();
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  const handleEdit = (budget) => {
    setForm({
      category: budget.category,
      monthlyLimit: budget.monthlyLimit,
      month: budget.month,
      year: budget.year,
    });
    setEditingId(budget.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/budgets/${id}`);
      fetchBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="page-container">
      <h2>Budget Management</h2>

        {/* FILTER */}
        <div className="filter-row">
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            placeholder="Month"
          />

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            placeholder="Year"
          />

          <button onClick={fetchBudgets}>Load Budgets</button>
        </div>

        {/* FORM */}
        <div className="form-card">
          <h3>{editingId ? "Update Budget" : "Set Budget"}</h3>

          <form onSubmit={handleSubmit} className="grid-form">

            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="monthlyLimit"
              placeholder="Monthly Limit"
              value={form.monthlyLimit}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="month"
              placeholder="Month"
              value={form.month}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              required
            />

            <button type="submit">
              {editingId ? "Update" : "Save"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}

          </form>
        </div>

        {/* TABLE */}
        <div className="table-card">
          <h3>Budget List</h3>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Limit</th>
                <th>Month</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {budgets.length > 0 ? (
                budgets.map((budget) => (
                  <tr key={budget.id}>
                    <td>{budget.category}</td>
                    <td>₹ {budget.monthlyLimit}</td>
                    <td>{budget.month}</td>
                    <td>{budget.year}</td>

                    <td>
                      <button onClick={() => handleEdit(budget)}>
                        Edit
                      </button>

                      <button onClick={() => handleDelete(budget.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No budgets found</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
  );
}

export default Budgets;