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
import { FaShoppingCart, FaTruckLoading, FaWarehouse } from "react-icons/fa";

const inventoryData = {
  totalAvailableCars: 120,
  totalOrderedCars: 30,
};

function InventoryContent({ userlogin }) {
  const [activeTab, setActiveTab] = useState(0); // 0 = Order Car, 1 = Order Tracking, 2 = Inventory Updates
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    color: "",
    quantity: 0,
  });
  const [inventoryFormData, setInventoryFormData] = useState({
    name: "",
    model: "",
    color: "",
    quantity: 0,
    costPrice: 0,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    // Fetch orders from backend when component mounts
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://motodesk2-o.onrender.com/order/getOrder"
        );
        const data = await response.json();
        setOrdersData(data.orders); // Set orders data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    const fetchInventory = async () => {
      try {
        const response = await fetch(
          `https://motodesk2-o.onrender.com/inventory/user/${userlogin}`
        ); // Adjust the endpoint as needed
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
      const response = await fetch(
        `https://motodesk2-o.onrender.com/order/addnew/${userlogin}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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

  const handleAddInventory = async () => {
    try {
      const response = await fetch(
        `https://motodesk2-o.onrender.com/inventory/add/${userlogin}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inventoryFormData),
        }
      );
      const result = await response.json();
      setResponseMessage(result.message || "Inventory item added");
    } catch (error) {
      console.error("Error adding inventory:", error);
      setResponseMessage("Error adding item");
    }
  };

  // Fetch `id` based on name, model, and color selection
const handleInventoryInputChange = (e) => {
  const { name, value } = e.target;
  setInventoryFormData((prevData) => {
    const updatedData = { ...prevData, [name]: value };

    // Get the id based on the selected name, model, and color
    const selectedItem = inventoryData.find(
      (item) =>
        item.name === updatedData.name &&
        item.model === updatedData.model &&
        item.color === updatedData.color
    );
    if (selectedItem) {
      updatedData.id = selectedItem._id; // Set id if match found
    } else {
      updatedData.id = null; // Reset id if no match
    }

    return updatedData;
  });
};

const handleUpdateInventory = async (id) => {
  try {
    const response = await fetch(`https://motodesk2-o.onrender.com/inventory/update/${id}/${userlogin}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryFormData),
    });
    const result = await response.json();
    setResponseMessage(result.message || "Inventory updated successfully.");
  } catch (error) {
    console.error("Error updating inventory:", error);
    setResponseMessage("Failed to update inventory.");
  }
};

const handleDeleteInventory = async (id) => {
  try {
    const response = await fetch(`https://motodesk2-o.onrender.com/inventory/delete/${id}/${userlogin}`, {
      method: "DELETE",
    });
    const result = await response.json();
    setResponseMessage(result.message || "Inventory deleted successfully.");
  } catch (error) {
    console.error("Error deleting inventory:", error);
    setResponseMessage("Failed to delete inventory.");
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
                <Typography
                  sx={{
                    color: getStatusColor(order.status),
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </Typography>
              </TableCell>
              <TableCell>₹{(order.costPrice || 0) * order.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderInventoryForm = () => {
    // Get unique car names for the Name select dropdown
    const carNames = [...new Set(inventoryData.map(item => item.name))];
  
    // Get filtered models and colors based on the selected name
    const filteredModels = inventoryData
      .filter(item => item.name === inventoryFormData.name)
      .map(item => item.model);
  
    const filteredColors = inventoryData
      .filter(item => item.name === inventoryFormData.name)
      .map(item => item.color);
  
    return (
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Name</InputLabel>
          <Select
            name="name"
            value={inventoryFormData.name}
            onChange={handleInventoryInputChange}
            required
          >
            {carNames.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl fullWidth>
          <InputLabel>Model</InputLabel>
          <Select
            name="model"
            value={inventoryFormData.model}
            onChange={handleInventoryInputChange}
            required
            disabled={!inventoryFormData.name} // Disable until a name is selected
          >
            {[...new Set(filteredModels)].map((model, index) => (
              <MenuItem key={index} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl fullWidth>
          <InputLabel>Color</InputLabel>
          <Select
            name="color"
            value={inventoryFormData.color}
            onChange={handleInventoryInputChange}
            required
            disabled={!inventoryFormData.name} // Disable until a name is selected
          >
            {[...new Set(filteredColors)].map((color, index) => (
              <MenuItem key={index} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={inventoryFormData.quantity}
          onChange={handleInventoryInputChange}
          required
          fullWidth
        />
  
        <TextField
          label="Cost Price"
          name="costPrice"
          value={inventoryFormData.costPrice}
          onChange={handleInventoryInputChange}
          required
          fullWidth
        />
  
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleUpdateInventory(inventoryFormData.id)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteInventory(inventoryFormData.id)}
          >
            Delete
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

  const renderAddInventoryForm = () =>{
    return (
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          value={inventoryFormData.name}
          onChange={handleInventoryInputChange}
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Model</InputLabel>
          <Select
            name="model"
            value={inventoryFormData.model}
            onChange={handleInventoryInputChange}
            required
          >
            <MenuItem value="top">top</MenuItem>
            <MenuItem value="mid">mid</MenuItem>
            <MenuItem value="base">base</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Color"
          name="color"
          value={inventoryFormData.color}
          onChange={handleInventoryInputChange}
          required
          fullWidth
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={inventoryFormData.quantity}
          onChange={handleInventoryInputChange}
          required
          fullWidth
        />
        <TextField
          label="Cost Price"
          name="costPrice"
          value={inventoryFormData.costPrice}
          onChange={handleInventoryInputChange}
          required
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddInventory}
          >
            Add Car
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
  }
  
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
      <Box
        sx={{ flex: 2, maxWidth: "100%", minWidth: "700px", width: "700px" }}
      >
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
          <Tab icon={<FaWarehouse />} label="Inventory" />
          <Tab icon={<FaWarehouse />} label="Inventory Updates" />
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
          {activeTab === 0
            ? renderOrderForm()
            : activeTab === 1
            ? renderOrderTrackingTable()
            : activeTab === 2
            ? renderAddInventoryForm()
            : renderInventoryForm()}
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
