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
  const [summary, setSummary] = useState({
    total: 0,
    average: 0,
    highRisk: 0,
  });
  const [trendMessage, setTrendMessage] = useState("");
  const [recommendation, setRecommendation] = useState("");

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

      const formatted = data.map((item) => {
        const ts = new Date(item.timestamp).getTime();
        return {
          date: new Date(ts).toLocaleString(),
          timestamp: ts, // keep numeric time for regression
          probability: item.probability,
          label: item.prediction,
        };
      });

      // Summary
      const total = formatted.length;
      const average = total
        ? formatted.reduce((s, d) => s + d.probability, 0) / total
        : 0;
      const highRisk = formatted.filter((d) => d.probability >= 0.7).length;
      setSummary({ total, average, highRisk });

      if (formatted.length > 1) {
        // Linear regression (least squares)
        const xs = formatted.map((d) => d.timestamp);
        const ys = formatted.map((d) => d.probability);
        const n = xs.length;
        const meanX = xs.reduce((a, b) => a + b, 0) / n;
        const meanY = ys.reduce((a, b) => a + b, 0) / n;

        let num = 0,
          den = 0;
        for (let i = 0; i < n; i++) {
          num += (xs[i] - meanX) * (ys[i] - meanY);
          den += (xs[i] - meanX) ** 2;
        }
        const slope = den === 0 ? 0 : num / den;
        const intercept = meanY - slope * meanX;

        // Add a trend value for EVERY point so the line overlays correctly
        const withTrend = formatted.map((d) => {
          const t = slope * d.timestamp + intercept;
          // clamp to [0,1] just in case
          const trend = Math.max(0, Math.min(1, t));
          return { ...d, trend };
        });

        setHistory(withTrend);

        // Simple human-readable trend message (overall delta across period)
        const deltaPct = slope * (xs[n - 1] - xs[0]) * 100; // % change over period
        if (deltaPct > 2) {
    setTrendMessage(
      `📈 Your stroke risk is trending upward (~${deltaPct.toFixed(
        1
      )}% over the period).`
    );
    setRecommendation([
      "Book a medical check-up soon for professional advice.",
      "Monitor your blood pressure and cholesterol regularly.",
      "Adopt a low-salt, balanced diet with more fruits and vegetables.",
      "Increase daily physical activity (e.g., walking, light exercise).",
      "Avoid smoking and limit alcohol intake."
    ]);
  } else if (deltaPct < -2) {
    setTrendMessage(
      `📉 Your stroke risk is trending downward (~${Math.abs(
        deltaPct
      ).toFixed(1)}% over the period).`
    );
    setRecommendation([
      "Great progress! Keep following your current lifestyle.",
      "Continue regular physical activity.",
      "Maintain a healthy, balanced diet.",
      "Keep monitoring your vitals (blood pressure, blood sugar).",
      "Stay consistent with your habits to prevent relapse."
    ]);
  } else {
  setTrendMessage("➖ Your stroke risk is relatively stable over the period.");
  setRecommendation([
    "Maintain your current lifestyle habits.",
    "Schedule regular health check-ups to stay on track.",
    "Stay physically active and manage stress effectively.",
    "Continue monitoring your blood pressure and glucose.",
    "Watch for any sudden changes and adjust promptly."
  ]);
}
      } else {
        // 0 or 1 point — no trend possible
        setHistory(formatted);
        setTrendMessage("");
        setRecommendation("");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-body">
        <h2 className="dashboard-title">📊 Your Prediction Dashboard</h2>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card total">
            <h3>Total Predictions</h3>
            <p>{summary.total}</p>
          </div>
          <div className="card average">
            <h3>Average Risk</h3>
            <p>{(summary.average * 100).toFixed(1)}%</p>
          </div>
          <div className="card high-risk">
            <h3>High-Risk Predictions</h3>
            <p>{summary.highRisk}</p>
          </div>
        </div>

        {/* Line Chart with Trendline */}
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
                formatter={(value, name) =>
                  name === "trend"
                    ? `${(value * 100).toFixed(2)}% (trend)`
                    : `${(value * 100).toFixed(2)}%`
                }
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
              <Line
                type="linear"
                dataKey="trend"
                stroke="#ff9800"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Message */}
        {trendMessage && (
          <div
            className={`trend-message-card ${
              trendMessage.includes("upward")
                ? "trend-bad"
                : trendMessage.includes("downward")
                ? "trend-good"
                : "trend-neutral"
            }`}
          >
            <span className="trend-icon">
              {trendMessage.includes("upward") && "⚠️"}
              {trendMessage.includes("downward") && "✅"}
              {trendMessage.includes("stable") && "ℹ️"}
            </span>
            <p className="trend-text">{trendMessage}</p>
          </div>
        )}

        {/* Recommendation */}
        {/* Recommendation */}
  {recommendation.length > 0 && (
  <div className="recommendation-card">
    <h3>💡 Recommendations Based on Previous Results</h3>
    <ul>
      {recommendation.map((rec, i) => (
        <li key={i}>{rec}</li>
      ))}
    </ul>
  </div>
  )}

      </div>
    </div>
  );
};

export default Dashboard;
