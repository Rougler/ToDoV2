import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
// import VolumeUp from '@mui/icons-material/VolumeUp';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

export default function InputSlider() {
  const [value, setValue] = React.useState(0); // Set initial value to zero
  const [confirmedValue, setConfirmedValue] = React.useState(null); // State to track confirmed value
  const [confirmDisabled, setConfirmDisabled] = React.useState(true); // State to track confirm button disabled status

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setConfirmDisabled(newValue === confirmedValue); // Enable confirm button if new value is not equal to confirmed value
  };

  const handleConfirm = () => {
    setConfirmedValue(value); // Set confirmed value when confirm button is clicked
    setValue(value); // Reset slider to confirmed value
    setConfirmDisabled(true); // Disable confirm button after confirmation
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Progress
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <PublishedWithChangesIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={confirmedValue !== null ? confirmedValue : 0} // Set the min property to confirmed value or zero
          />
        </Grid>
        <Grid item>
          <Typography variant="body2">{value}%</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            disabled={confirmDisabled} // Disable confirm button if new value is equal to confirmed value
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
