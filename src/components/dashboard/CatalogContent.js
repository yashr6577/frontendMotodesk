import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  CardActions,
  Divider,
} from "@mui/material";
import { Favorite, LocalGasStation, DirectionsCar } from "@mui/icons-material";
import SpeedIcon from '@mui/icons-material/Speed';
import { styled } from "@mui/system";

// Car data showing only Tata's different cars
const carData = [
  { id: 1011, company: "Tata", name: "Tiago", model: "Top", color: "White", quantity: 5, price: 610000, miles: 20, image: "/assets/cars/tataTiagoTopWhite.png", transmission: "Automatic", fuel: "Petrol", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 1021, company: "Tata", name: "Tiago", model: "Mid", color: "Red", quantity: 2, price: 580000, miles: 15, image: "/assets/cars/tataTiagoMidRed.png", transmission: "Manual", fuel: "Petrol", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 1031, company: "Tata", name: "Tiago", model: "Base", color: "Black", quantity: 8, price: 560000, miles: 10, image: "/assets/cars/tataTiagoBaseBlack.png", transmission: "Manual", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 2011, company: "Tata", name: "Altroz", model: "Top", color: "Blue", quantity: 3, price: 750000, miles: 20, image: "/assets/cars/tataAltrozTopBlue.png", transmission: "Automatic", fuel: "Petrol", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 2021, company: "Tata", name: "Harrier", model: "Luxury", color: "Gray", quantity: 6, price: 1120000, miles: 18, image: "/assets/cars/tataHarrierLuxGray.png", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 2031, company: "Tata", name: "Safari", model: "Premium", color: "Gold", quantity: 4, price: 2100000, miles: 25, image: "/assets/cars/tataSafariPremiumGolden.png", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
];

// Styled components
const StyledCard = styled(Card)({
  borderRadius: 15,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const PriceTag = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.25rem",
  color: "#2e7d32",
});

// A styled Box for showing the car color visually
const ColorBox = styled(Box)(({ color }) => ({
  width: 20,
  height: 20,
  backgroundColor: color,
  borderRadius: 3,
  display: "inline-block",
  marginRight: 8,
  border: "1px solid rgba(0, 0, 0, 0.2)",
}));

function CatalogContents() {
  const [filters, setFilters] = useState({
    model: "",
    priceRange: [0, 2500000],
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  // Since we're only showing Tata cars, we don't need to filter by company
  const filteredCars = carData.filter((car) => {
    return (
      (!filters.model || car.model === filters.model) &&
      car.price >= filters.priceRange[0] &&
      car.price <= filters.priceRange[1]
    );
  });

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Filters */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          gap: 3,
          backgroundColor: "#fff",
          p: 2,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Model</InputLabel>
          <Select
            name="model"
            value={filters.model}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            {["Top", "Mid", "Base", "Luxury", "Premium"].map((model) => (
              <MenuItem key={model} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ minWidth: 300 }}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={2500000}
            sx={{ color: "#2e7d32" }}
          />
        </Box>
      </Box>

      {/* Car Cards */}
      <Grid container spacing={3}>
        {filteredCars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <StyledCard>
              <CardMedia
                component="img"
                alt={car.name}
                height="180"
                image={car.image}
                sx={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >{`${car.company} ${car.name} – ${car.model}`}</Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <LocalGasStation fontSize="small" />
                  <Typography variant="body2" color="textSecondary">
                    {car.fuel}
                  </Typography>
                  <DirectionsCar fontSize="small" />
                  <Typography variant="body2" color="textSecondary">
                    {car.transmission}
                  </Typography>
                  <SpeedIcon fontSize="small" />
                  <Typography variant="body2" color="textSecondary">
                    {car.mileage}
                  </Typography>
                </Stack>

                <Divider />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <PriceTag>{`₹${car.price}`}</PriceTag>
                  <IconButton color="error" aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                </Stack>
              </CardContent>
              <CardActions sx={{ p: 1 }}>
                <Chip
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ColorBox color={car.color.toLowerCase()} /> {car.color}
                    </Box>
                  }
                  color="primary"
                />
                <Chip label="Special Offer" color="success" />
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CatalogContents;
