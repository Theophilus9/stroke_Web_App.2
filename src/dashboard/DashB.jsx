import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "./supabaseClient";
import { auth } from "../sign/firebase";
import Navbar from "../homepage/Navbar";
import "./styles/dashboard.css";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const { data, error } = await supabase
        .from("predictions")
        .select("prediction, probability, timestamp")
        .eq("user_id", user.uid)
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error fetching history:", error);
        return;
      }

      const formatted = data.map((item) => ({
        date: new Date(item.timestamp).toLocaleString(),
        probability: item.probability,
        label: item.prediction,
      }));

      setHistory(formatted);
    };

    fetchHistory();
  }, []);

  return (
    <div className="dashboard-container">
      {/* ✅ Navbar at the top */}
      <div className="dashboard-header">
        <Navbar />
      </div>

      <div className="dashboard-body">
        <h2 className="dashboard-title">📊 Your Prediction History</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[0, 1]}
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
              />
              <Tooltip
                formatter={(value) => `${(value * 100).toFixed(2)}%`}
                labelFormatter={(label, payload) => {
                  const entry = payload?.[0]?.payload;
                  return `${label} • ${entry?.label || ""}`;
                }}
              />
              <Line
                type="monotone"
                dataKey="probability"
                stroke="#683ddf"
                strokeWidth={3}
                dot={{ r: 5, stroke: "#683ddf", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
