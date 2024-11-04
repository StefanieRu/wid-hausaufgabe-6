import {
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as React from "react";

function Reframe() {
  // const URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
  const [service, setService] = React.useState("");

  const handleChange = (event) => {
    setService(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <h1>Koordinaten-Transformation</h1>
      <FormControl fullWidth>
        <InputLabel id="reframe-service-label">Reframe Service</InputLabel>
        <Select
          labelId="reframe-service-label"
          id="reframe-service-select"
          value={service}
          label="Reframe Service"
          onChange={handleChange}
        >
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </Select>
      </FormControl>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Paper></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>Easting</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>Northing</Paper>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        Transformbutton
      </Grid>
      <Grid item xs={6}>
        <Paper></Paper>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Paper>Transformed X</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>Transformed Y</Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reframe;
