import React, { useEffect, useState, useCallback } from "react";
import api from "../api/axiosConfig";

import { BarChart3, PieChart as PieIcon, Download } from "lucide-react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function Dashboard() {
  const currentDate = new Date();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const [summary, setSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const [summaryRes, alertRes] = await Promise.all([
        api.get(`/analytics/monthly-summary?month=${month}&year=${year}`),
        api.get(`/budgets/alerts?month=${month}&year=${year}`),
      ]);

      setSummary(summaryRes.data);
      setAlerts(alertRes.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to load dashboard data. Please try again.";

      setError(errorMessage);
      console.error("Dashboard error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDashboardData();
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchDashboardData]);

  const downloadCsv = async () => {
    try {
      const response = await api.get("/reports/csv", { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = "transactions.csv";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV download failed", error);
    }
  };

  const downloadPdf = async () => {
    try {
      const response = await api.get("/reports/pdf", { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = "transactions.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed", error);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
  };

  if (error) {
    return (
      <div className="page-container">
        <h2>Analytics Dashboard</h2>

        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchDashboardData}>Try Again</button>
        </div>
      </div>
    );
  }

  if (isLoading || !summary) {
    return (
      <div className="page-container">
        <h2>Analytics Dashboard</h2>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  const pieData = {
    labels: Object.keys(summary.categoryExpenses || {}),
    datasets: [
      {
        label: "Category Expenses",
        data: Object.values(summary.categoryExpenses || {}),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
          "#8dd17e",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Monthly Finance",
        data: [
          summary.totalIncome || 0,
          summary.totalExpense || 0,
          summary.balance || 0,
        ],
        backgroundColor: ["#2ecc71", "#e74c3c", "#3498db"],
      },
    ],
  };

  return (
    <div className="page-container">
      <h2>Analytics Dashboard</h2>

        <div className="filter-row">
          <input
            type="number"
            value={month}
            min="1"
            max="12"
            placeholder="Month"
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 12) {
                setMonth(value);
              }
            }}
          />

          <input
            type="number"
            value={year}
            placeholder="Year"
            onChange={(e) => setYear(Number(e.target.value))}
          />

          <button onClick={fetchDashboardData}>Refresh</button>
        </div>

        <div className="summary-cards">
          <div className="card income-card">
            <h3>Total Income</h3>
            <p>₹ {summary.totalIncome?.toLocaleString()}</p>
          </div>

          <div className="card expense-card">
            <h3>Total Expense</h3>
            <p>₹ {summary.totalExpense?.toLocaleString()}</p>
          </div>

          <div className="card balance-card">
            <h3>Balance</h3>
            <p>₹ {summary.balance?.toLocaleString()}</p>
          </div>
        </div>

        <div className="chart-grid">

          <div className="chart-card" style={{ height: "350px" }}>
            <h3>
              <BarChart3 size={18}/> Income vs Expense
            </h3>
            <Bar data={barData} options={chartOptions} />
          </div>

          <div className="chart-card" style={{ height: "350px" }}>
            <h3>
              <PieIcon size={18}/> Expense by Category
            </h3>

            {Object.keys(summary.categoryExpenses || {}).length > 0 ? (
              <Pie data={pieData} options={chartOptions} />
            ) : (
              <p>No category expense data available</p>
            )}
          </div>

        </div>

        <div className="report-buttons">
          <button onClick={downloadCsv}>
            <Download size={16}/> CSV Report
          </button>

          <button onClick={downloadPdf}>
            <Download size={16}/> PDF Report
          </button>
        </div>

        <div className="alerts-section">
          <h3>Budget Alerts</h3>

          {alerts.length === 0 ? (
            <p>No budget alerts found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Limit</th>
                  <th>Spent</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {alerts.map((alert, index) => (
                  <tr key={index}>
                    <td>{alert.category}</td>

                    <td>₹ {alert.limitAmount?.toLocaleString()}</td>

                    <td>₹ {alert.spentAmount?.toLocaleString()}</td>

                    <td
                      style={{
                        color:
                          alert.status === "LIMIT EXCEEDED"
                            ? "#dc2626"
                            : "#16a34a",
                        fontWeight: "bold",
                      }}
                    >
                      {alert.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
  );
}

export default Dashboard;