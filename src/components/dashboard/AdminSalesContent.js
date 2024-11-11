import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUserPlus,
  FaCar,
  FaDollarSign,
} from "react-icons/fa";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./styles/SalesContent.css"; // Ensure this file exists

const salesSummaryData = [
  {
    id: "summary-icon-sales",
    title: "Total Sales",
    value: "68,00,000",
    percentage: "+10%",
    icon: FaDollarSign,
    color: "#388e3c",
  },
  {
    id: "summary-icon-orders",
    title: "Total Orders",
    value: 7,
    percentage: "+8%",
    icon: FaShoppingCart,
    color: "#1976d2",
  },
  {
    id: "summary-icon-delivery",
    title: "Cars Delivered",
    value: 3,
    percentage: "+2%",
    icon: FaCar,
    color: "#f57c00",
  },
  {
    id: "summary-icon-customer",
    title: "New Customers",
    value: 12,
    percentage: "+3%",
    icon: FaUserPlus,
    color: "#9c27b0",
  },
];

const productData = [
  { name: "Altroz", popularity: 100, sales: 46 },
  { name: "Safari", popularity: 50, sales: 17 },
  { name: "Tiago", popularity: 60, sales: 19 },
  { name: "Harrier", popularity: 80, sales: 29 },
];

function AdminSalesContent({ userlogin }) {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    model: "",
    quantity: "",
    sellPrice: "",
  });
  const [inventoryData] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

//   useEffect(() => {
//     // Fetch inventory data on component mount
//     const fetchInventoryData = async () => {
//       try {
//         const response = await fetch(
//           `https://motodesk2-o.onrender.com/inventory/Admin@123`
//         );
//         const data = await response.json();
//         setInventoryData(data);
//       } catch (error) {
//         console.error("Error fetching inventory data:", error);
//       }
//     };

//     fetchInventoryData();
//   }, [userlogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    const endpoint = "https://motodesk2-o.onrender.com/sales/report";

    try {
      const response = await fetch(
        `${endpoint}?name=${formData.name}&model=${formData.model}&color=${formData.color}&quantity=${formData.quantity}&sellPrice=${formData.sellPrice}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sales_report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setResponseMessage("Report generated successfully.");
      } else {
        const errorData = await response.json();
        setResponseMessage(
          errorData.message || "An error occurred while generating the report."
        );
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("Server Error");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Left Section: Sales Summary Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {salesSummaryData.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <item.icon size={30} style={{ color: item.color }} />
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="h4">{item.value}</Typography>
                    <Typography color="textSecondary">
                      {item.percentage} from yesterday
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Earnings Section */}
            <Grid item xs={12}>
              <Card
                sx={{
                  backgroundColor: "#1e1e2f",
                  color: "white",
                  borderRadius: "12px",
                }}
              >
                <CardContent>
                  <Typography variant="h6">Earnings</Typography>
                  <Typography variant="h3">4,08,35,000</Typography>
                  <Typography>Profit is 48% More than last Month</Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: "10px",
                      backgroundColor: "#888",
                      borderRadius: "5px",
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: "80%",
                        height: "100%",
                        backgroundColor: "#36a2eb",
                        borderRadius: "5px",
                      }}
                    ></Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Top Products */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: "12px" }}>
                <CardContent>
                  <Typography variant="h6">Top Products</Typography>
                  {productData.map((product, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                    >
                      <Typography sx={{ width: "10%" }}>{index + 1}</Typography>
                      <Typography sx={{ width: "30%" }}>
                        {product.name}
                      </Typography>
                      <Box
                        sx={{
                          flexGrow: 1,
                          backgroundColor: "#E0E0E0",
                          height: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${product.popularity}%`,
                            backgroundColor: "#36a2eb",
                            height: "100%",
                            borderRadius: "5px",
                          }}
                        ></Box>
                      </Box>
                      <Typography sx={{ width: "10%", ml: 1 }}>
                        {product.sales}%
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section: Generate Report */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "12px" }}>
            <CardContent>
              <Typography variant="h6">Generate Report</Typography>
              <form onSubmit={handleGenerateReport}>
                <FormControl fullWidth sx={{ mb: 2, borderRadius: "12px" }}>
                  <InputLabel>Name</InputLabel>
                  <Select
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  >
                    {inventoryData.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2, borderRadius: "12px" }}>
                  <InputLabel>Color</InputLabel>
                  <Select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                  >
                    {/* {[...new Set(inventoryData.map((item) => item.color))].map((color) => (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2, borderRadius: "12px" }}>
                  <InputLabel>Model</InputLabel>
                  <Select
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  >
                    {/* {[...new Set(inventoryData.map((item) => item.model))].map((model) => (
                      <MenuItem key={model} value={model}>
                        {model}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    width: "100%",
                    borderRadius: "12px",
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                >
                  Generate Report
                </Button>
              </form>
              {responseMessage && (
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    color: responseMessage.startsWith("Report generated")
                      ? "green"
                      : "red",
                  }}
                >
                  {responseMessage}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminSalesContent;
