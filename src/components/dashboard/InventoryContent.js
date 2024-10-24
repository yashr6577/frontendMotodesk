import React, { useState, useEffect } from "react"; // Import useEffect
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";
import { FaShoppingCart, FaTruckLoading } from "react-icons/fa";

const inventoryData = {
  totalAvailableCars: 120,
  totalOrderedCars: 30,
};

function InventoryContent() {
  const [activeTab, setActiveTab] = useState(0); // 0 = Order Car, 1 = Order Tracking
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    color: "",
    quantity: 0,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [ordersData, setOrdersData] = useState([]); // State for orders data

  const [inventoryData, setInventoryData] = useState([]); // State for inventory data


  useEffect(() => {
    // Fetch orders from backend when component mounts
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://motodesk2-o.onrender.com/order/getOrder");
        const data = await response.json();
        setOrdersData(data.orders); // Set orders data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    const fetchInventory = async () => {
      try {
        const response = await fetch("https://motodesk2-o.onrender.com/inventory/"); // Adjust the endpoint as needed
        const data = await response.json();
        setInventoryData(data); // Set inventory data
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchOrders();
    fetchInventory(); // Call the fetch function
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "pending":
        return "orange";
      case "delivered":
        return "blue";
      default:
        return "black";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://motodesk2-o.onrender.com/order/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.text();
        setResponseMessage(result);
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Server Error");
    }
  };

  const renderOrderForm = () => {
    return (
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Model</InputLabel>
          <Select
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="top">top</MenuItem>
            <MenuItem value="mid">mid</MenuItem>
            <MenuItem value="base">base</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Colour"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ maxWidth: "200px" }}
            type="submit"
          >
            Place Order
          </Button>
        </Box>
        {responseMessage && (
          <Typography
            color="primary"
            variant="h6"
            sx={{ textAlign: "center", mt: 2 }}
          >
            {responseMessage}
          </Typography>
        )}
      </Box>
    );
  };

 
  const renderOrderTrackingTable = () => (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader aria-label="order tracking table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Cost Price</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.model}</TableCell>
              <TableCell>₹{order.costPrice || "N/A"}</TableCell>
              <TableCell>{order.color}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>
                <Typography sx={{ color: getStatusColor(order.status), fontWeight: "bold" }}>
                  {order.status}
                </Typography>
              </TableCell>
              <TableCell>
                ₹{(order.costPrice || 0) * order.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        p: 4,
        height: "100vh",
        backgroundColor: "#eef2f6",
      }}
    >
      <Box sx={{ flex: 2, maxWidth: "100%", minWidth: "700px", width:"700px"}}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          centered
          sx={{
            "& .MuiTab-root": {
              color: "#3f51b5",
              "&:hover": { color: "white", backgroundColor: "#3f51b5" },
            },
          }}
        >
          <Tab icon={<FaShoppingCart />} label="Order Car" />
          <Tab icon={<FaTruckLoading />} label="Order Tracking" />
        </Tabs>
        <Box
          sx={{
            mt: 2,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          {activeTab === 0 ? renderOrderForm() : renderOrderTrackingTable()}
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            boxShadow: 2,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <FaShoppingCart style={{ fontSize: "40px", color: "#4caf50" }} />
          <Box>
            <Typography variant="h6">Total Available Cars</Typography>
            <Typography variant="h4" color="primary">
            {inventoryData.reduce((total, inv) => total + inv.quantity, 0)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            boxShadow: 2,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <FaShoppingCart style={{ fontSize: "40px", color: "#ff9800" }} />
          <Box>
            <Typography variant="h6">Total Ordered Cars</Typography>
            <Typography variant="h4" color="primary">
            {ordersData.reduce((total, order) => total + order.quantity, 0)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InventoryContent;
