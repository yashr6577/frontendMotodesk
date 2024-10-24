import React, { useState, useEffect } from "react";
import { FaClipboardList, FaTruck } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import "./styles/DashboardContent.css";

const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatYAxisValue = (value) => {
  if (value >= 1_00_00_000) return `${(value / 1_00_00_000).toFixed(1)} Cr`;
  if (value >= 1_00_000) return `${(value / 1_00_000).toFixed(1)} Lakh`;
  return value;
};

function DashboardContent() {
  const [salesData, setSalesData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDelivered, setTotalDelivered] = useState(0);


  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch("https://motodesk2-o.onrender.com/sales/getSales");
        const data = await response.json();
    
        const monthlyData = monthOrder.reduce(
          (acc, month) => {
            acc.sales[month] = 0;
            acc.profits[month] = 0;
            return acc;
          },
          { sales: {}, profits: {} }
        );
    
        let calculatedTotalProfit = 0;
        let totalDeliveredCount = 0; // Initialize total delivered count
    
        // Populate sales and profit values from fetched data
        data.sales.forEach((sale) => {
          const month = new Date(sale.date).toLocaleString("default", { month: "short" });
    
          // Ensure sellPrice, profit, and quantity are treated as numbers
          const sellPrice = Number(sale.sellPrice) || 0; // Default to 0 if not a number
          const profit = Number(sale.profit) || 0; // Default to 0 if not a number
          const quantity = Number(sale.quantity) || 0; // Default to 0 if not a number
    
          calculatedTotalProfit += profit;
          monthlyData.sales[month] += sellPrice;
          monthlyData.profits[month] += profit;
    
          // Sum the quantity for total delivered count
          totalDeliveredCount += quantity; // Increment total delivered count
        });
    
        const formatChartData = (dataObj) =>
          Object.entries(dataObj).map(([month, value]) => ({ name: month, value }));
    
        const salesChartData = formatChartData(monthlyData.sales);
        const profitChartData = formatChartData(monthlyData.profits);
    
        setSalesData(salesChartData);
        setProfitData(profitChartData);
    
        // Set total profit and delivered count states
        setTotalProfit(calculatedTotalProfit);
        setTotalDelivered(totalDeliveredCount);
    
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <Box className="dashboard-content" sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {[
              { icon: <FaClipboardList size={40} color="#ff6f61" />, title: "Total Orders", value: 359 },
              { icon: <FaTruck size={40} color="#26a69a" />, title: "Total Delivered", value: totalDelivered },
              {
                icon: <BiRupee size={40} color="#ffca28" />,
                title: "Total Profit",
                value: `${formatYAxisValue(totalProfit)} ₹`, // Updated to display total profit correctly
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent>
                    {stat.icon}
                    <Typography variant="h6">{stat.title}</Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "12px",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Sales Performance
              </Typography>
              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 250 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatYAxisValue} />
                    <Tooltip formatter={(value) => `${formatYAxisValue(value)} ₹`} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "12px",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Profit Performance
              </Typography>
              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 250 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatYAxisValue} />
                    <Tooltip formatter={(value) => `${formatYAxisValue(value)} ₹`} />
                    <Bar dataKey="value" fill="#82ca9d">
                      {profitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardContent;
