import {
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  Button,
  Typography,
} from "@mui/material";
import * as React from "react";

function Reframe() {
  // const URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
  const [service, setService] = React.useState(0);

  const handleService = (event) => {
    setService(event.target.value);
  };

  const [ost, setOst] = React.useState("");

  const handleOst = (event) => {
    setOst(event.target.value);
  };

  const [nord, setNord] = React.useState("");

  const handleNord = (event) => {
    setNord(event.target.value);
  };

  const [ergebnis_Ost, setErgebnis_Ost] = React.useState("");
  const [ergebnis_Nord, setErgebnis_Nord] = React.useState("");

  const combineLink = (service, ost, nord) => {
    let link = "";
    if (service === 0) {
      link = `https://geodesy.geo.admin.ch/reframe/lv95towgs84?easting=${ost}&northing=${nord}&format=json`;
    } else if (service === 1) {
      link = `https://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting=${ost}&northing=${nord}&format=json`;
    }
    return link;
  };

  async function fetchKoordinaten(service, ost, nord) {
    if (!parseFloat(ost) || !parseFloat(nord)) {
      alert("Geben Sie bitte gültige Zahlen ein.");
    } else if (ost.includes(",") || nord.includes(",")) {
      alert("Verwenden Sie bitte einen Punkt anstelle des Kommas.");
    } else {
      const link = combineLink(service, ost, nord);
      const resp = await fetch(link);
      const data = await resp.json();
      setErgebnis_Ost(data.easting);
      setErgebnis_Nord(data.northing);
    }
  }

  return (
    <Box sx={{ width: 600 }}>
      <h1>Koordinaten-Transformation</h1>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="reframe-service-label">Reframe Service</InputLabel>
            <Select
              labelId="reframe-service-label"
              id="reframe-service-select"
              value={service}
              label="Reframe Service"
              onChange={handleService}
            >
              <MenuItem value={0}>LV95 zu WGS84</MenuItem>
              <MenuItem value={1}>WGS84 zu LV95</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Paper></Paper>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="Easting">Easting</InputLabel>
            <Input
              labelId="Easting"
              id="Easting-input"
              value={ost}
              label="Easting"
              onChange={handleOst}
              sx={{
                border: "1px solid grey",
                borderRadius: "4px",
                padding: "8px",
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="Northing">Northing</InputLabel>
            <Input
              labelId="Northing"
              id="Northing-input"
              value={nord}
              label="Northing"
              onChange={handleNord}
              sx={{
                border: "1px solid grey",
                borderRadius: "4px",
                padding: "8px",
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button
            sx={{
              border: "10px",
              backgroundColor: "blue",
              color: "white",
              width: "208%",
              padding: "8px",
            }}
            onClick={() => fetchKoordinaten(service, ost, nord)}
            disabled={ost === "" || nord === ""}
          >
            Transformation
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Paper></Paper>
        </Grid>
        <Grid item xs={6}>
          <Typography>Ergebnis X-Koordinate:</Typography>
          <Typography>{ergebnis_Ost}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Ergebnis Y-Koordinate:</Typography>
          <Typography>{ergebnis_Nord}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reframe;
