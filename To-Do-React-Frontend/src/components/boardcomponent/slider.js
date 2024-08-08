import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
 
export default function InputSlider() {
  const [value, setValue] = React.useState(0);
  const [confirmedValue, setConfirmedValue] = React.useState(null);
  const [confirmDisabled, setConfirmDisabled] = React.useState(true);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setConfirmDisabled(newValue === confirmedValue);
  };

  const handleConfirm = () => {
    setConfirmedValue(value);
    setValue(value);
    setConfirmDisabled(true);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Progress
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <ModelTrainingIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={confirmedValue !== null ? confirmedValue : 0}
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
            disabled={confirmDisabled}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
