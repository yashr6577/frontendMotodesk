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
  { id: 1011, company: "Tata", name: "Tiago", model: "Top", color: "White", quantity: 5, price: 610000, miles: 20, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/5ae046a3-7066-48b2-9657-6ee54b6c015b/tiago-banner.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-5ae046a3-7066-48b2-9657-6ee54b6c015b-nFq6qTh", transmission: "Automatic", fuel: "Petrol", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 1021, company: "Tata", name: "Tiago", model: "Mid", color: "Red", quantity: 2, price: 580000, miles: 15, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/b3f6aa34-bd45-4044-8122-514694b6d8d1/Tiago_A.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-b3f6aa34-bd45-4044-8122-514694b6d8d1-ntQUyz6", transmission: "Manual", fuel: "Petrol", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 1031, company: "Tata", name: "Tiago", model: "Base", color: "Black", quantity: 8, price: 560000, miles: 10, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/3172cbbe-e46b-4758-9119-2098cb711659/tiago-A1.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-3172cbbe-e46b-4758-9119-2098cb711659-nFq6qTh", transmission: "Manual", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 2011, company: "Tata", name: "Altroz", model: "Top", color: "Blue", quantity: 3, price: 750000, miles: 20, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/0cb7fdaf-cb48-4e7c-b145-4e8f21f3ae7e/altroz.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-0cb7fdaf-cb48-4e7c-b145-4e8f21f3ae7e-nFq6qTh", transmission: "Automatic", fuel: "Petrol", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 2021, company: "Tata", name: "Altroz", model: "Mid", color: "White", quantity: 3, price: 720000, miles: 18, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/1efadcb4-542c-437e-91d7-30cbdd21f5c0/Altroz-D4.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-1efadcb4-542c-437e-91d7-30cbdd21f5c0-nFq6qTh", transmission: "Automatic", fuel: "Petrol", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 2031, company: "Tata", name: "Altroz", model: "Base", color: "Black", quantity: 2, price: 680000, miles: 15, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/477b5f0e-d576-4f4e-bc8a-07d291ef0b90/altroz-variant.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-477b5f0e-d576-4f4e-bc8a-07d291ef0b90-nFq6qTh", transmission: "Manual", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 3011, company: "Tata", name: "Nexon", model: "Top", color: "White", quantity: 4, price: 1020000, miles: 20, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/b35cbbf8-42cc-4c89-b545-7589bbf5e818/nexon.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-b35cbbf8-42cc-4c89-b545-7589bbf5e818-nFq6qTh", transmission: "Automatic", fuel: "Petrol", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 3021, company: "Tata", name: "Nexon", model: "Mid", color: "Black", quantity: 3, price: 960000, miles: 15, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/30ca4df1-c78c-47f0-8eb6-9e78ca8499c0/nexon-variant.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-30ca4df1-c78c-47f0-8eb6-9e78ca8499c0-nFq6qTh", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 3031, company: "Tata", name: "Nexon", model: "Base", color: "Red", quantity: 5, price: 850000, miles: 10, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/b35cbbf8-42cc-4c89-b545-7589bbf5e818/nexon.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-b35cbbf8-42cc-4c89-b545-7589bbf5e818-nFq6qTh", transmission: "Manual", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 4011, company: "Tata", name: "Harrier", model: "Top", color: "White", quantity: 4, price: 1110000, miles: 20, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/a2565731-2057-4643-8342-1ccf062c4506/harrier.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-a2565731-2057-4643-8342-1ccf062c4506-nFq6qTh", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 4021, company: "Tata", name: "Harrier", model: "Mid", color: "Black", quantity: 3, price: 1040000, miles: 15, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/8b6c0d98-d53f-47ca-a6b9-b4b25c6a5472/harrier-variant.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-8b6c0d98-d53f-47ca-a6b9-b4b25c6a5472-nFq6qTh", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 4031, company: "Tata", name: "Harrier", model: "Base", color: "Red", quantity: 6, price: 900000, miles: 10, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/4c9f1c1a-0833-43ed-9331-9aa57a49cf52/harrier-1.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-4c9f1c1a-0833-43ed-9331-9aa57a49cf52-nFq6qTh", transmission: "Manual", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 5011, company: "Tata", name: "Safari", model: "Top", color: "White", quantity: 4, price: 2000000, miles: 25, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/abcf3bfb-9494-4ca3-bb98-cfda64661fd0/safari.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-abcf3bfb-9494-4ca3-bb98-cfda64661fd0-nFq6qTh", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 5021, company: "Tata", name: "Safari", model: "Mid", color: "Black", quantity: 3, price: 1900000, miles: 20, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/798d8415-5a53-4f99-8cf0-3b90c4bcbb49/safari-1.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-798d8415-5a53-4f99-8cf0-3b90c4bcbb49-nFq6qTh", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 5031, company: "Tata", name: "Safari", model: "Base", color: "Red", quantity: 4, price: 1600000, miles: 18, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/f7f5f2d2-e441-49a2-9c1f-9fa452f6f98a/safari-2.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-f7f5f2d2-e441-49a2-9c1f-9fa452f6f98a-nFq6qTh", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" },
  { id: 5041, company: "Tata", name: "Safari", model: "Top", color: "Blue", quantity: 2, price: 2000000, miles: 20, image: "https://cdn.tatamotors.com/wps/wcm/connect/tatamotors/63f504eb-c8c1-4857-9c0d-8f6cdb21c515/safari-3.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-63f504eb-c8c1-4857-9c0d-8f6cdb21c515-nFq6qTh", transmission: "Automatic", fuel: "Diesel", year: 2023, mileage: "19-20.09 Kmpl" }
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
