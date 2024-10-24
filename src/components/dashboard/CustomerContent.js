import React, { useState, useEffect } from "react";
import { 
  Box, Tabs, Tab, TextField, Button, Select, MenuItem, 
  InputLabel, FormControl, Typography, Rating 
} from "@mui/material";
import { FaUserPlus, FaStar, FaChartPie } from "react-icons/fa";
import Chart from "react-google-charts";

const customerSummary = {
  totalCustomers: 125,
  satisfiedCustomers: 95,
  unsatisfiedCustomers: 30,
};

const CustomerContent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [reviews, setReviews] = useState([]);  // State to store fetched reviews
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state
  const [rating, setRating] = useState(0);
  const [customerSummary, setCustomerSummary] = useState({
    satisfiedCustomers: 0,
    unsatisfiedCustomers: 0,
  }); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    car: "",
    model: "",
    color: "",
    status: "",
    description: "",
  });

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://motodesk2-o.onrender.com/customer/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (response.ok) {
        alert("Customer added successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          car: "",
          model: "",
          color: "",
          status: "",
          description: "",
        });
        setRating(0); 
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding customer. Please try again.");
    }
  };

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await fetch("https://motodesk2-o.onrender.com/customer/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();

      const satisfiedCount = data.customers.filter((c) => c.status === "satisfied").length;
      const unsatisfiedCount = data.customers.filter((c) => c.status === "unsatisfied").length;

      setReviews(data.customers);
      setCustomerSummary({
        satisfiedCustomers: satisfiedCount,
        unsatisfiedCustomers: unsatisfiedCount,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Customer Review</Typography>
            <TextField 
              label="Customer Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              fullWidth 
            />
            <TextField 
              label="Email ID" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              fullWidth 
            />
            <TextField 
              label="Phone Number" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              fullWidth 
            />
            <TextField 
              label="Address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
              fullWidth 
            />
            <TextField 
              label="Car Name" 
              name="car" 
              value={formData.car} 
              onChange={handleChange} 
              required 
              fullWidth 
            />
            <FormControl fullWidth>
              <InputLabel>Select Model</InputLabel>
              <Select 
                name="model" 
                value={formData.model} 
                onChange={handleChange} 
                required
              >
                <MenuItem value="top">Top</MenuItem>
                <MenuItem value="mid">Mid</MenuItem>
                <MenuItem value="base">Base</MenuItem>
              </Select>
            </FormControl>

            <TextField 
              label="Car Color" 
              name="color" 
              value={formData.color} 
              onChange={handleChange} 
              required 
              fullWidth 
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                required
              >
                <MenuItem value="satisfied">Satisfied</MenuItem>
                <MenuItem value="unsatisfied">Unsatisfied</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography>Rating: </Typography>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="large"
              />
            </Box>

            <TextField 
              label="Review Description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              multiline 
              rows={4} 
              required 
              fullWidth 
            />
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              sx={{ alignSelf: 'center', maxWidth: '200px' }}
            >
              Submit Review
            </Button>
          </Box>
        );

      case 1:
        if (loading) return <Typography>Loading reviews...</Typography>;
        if (error) return <Typography color="error">Error: {error}</Typography>;

        return (
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
            {reviews.map((review, index) => (
              <Box 
                key={index} 
                sx={{ 
                  boxShadow: 3, 
                  p: 2, 
                  borderRadius: 2, 
                  backgroundColor: 'white',
                  transition: 'transform 0.3s, background-color 0.3s',
                  '&:hover': { transform: 'scale(1.05)', backgroundColor: '#f0f4f8' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaStar style={{ color: '#ff9800' }} />
                  <Typography>{review.rating} Stars</Typography>
                </Box>
                <Typography sx={{ mt: 1 }}>{review.description}</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1, color: '#3f51b5' }}>
                  {review.name}
                </Typography>
                <Typography variant="subtitle2">
                  Car: {review.car} - {review.model}
                </Typography>
              </Box>
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 4, p: 4, height: '100vh', backgroundColor: '#eef2f6' }}>
      <Box sx={{ flex: 2, maxWidth: '60%', minWidth: '500px' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          centered 
          TabIndicatorProps={{ style: { backgroundColor: '#3f51b5' } }}
        >
          <Tab icon={<FaChartPie />} label="Customer Review" />
          <Tab icon={<FaStar />} label="Reviews" />
        </Tabs>
        <Box 
          sx={{ mt: 2, p: 3, boxShadow: 3, borderRadius: 2, 
          backgroundColor: 'white', overflowY: 'auto', maxHeight: '80vh' }}
        >
          {renderTabContent()}
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, boxShadow: 2, borderRadius: 2, backgroundColor: 'white' }}>
          <FaUserPlus style={{ fontSize: '40px', color: '#4caf50' }} />
          <Box>
            <Typography variant="h6">Total Customers</Typography>
            <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
              {reviews.length}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ boxShadow: 3, p: 3, borderRadius: 2, backgroundColor: 'white' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Customer Satisfaction</Typography>
          <Chart
            chartType="PieChart"
            data={[
              ["Status", "Count"],
              ["Satisfied Customers", customerSummary.satisfiedCustomers],
              ["Unsatisfied Customers", customerSummary.unsatisfiedCustomers],
            ]}
            options={{ pieHole: 0.4, colors: ['#4caf50', '#e57373'], legend: { position: 'bottom' } }}
            width={"100%"}
            height={"300px"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerContent;
