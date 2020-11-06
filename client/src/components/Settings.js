import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import PauseCircleOutline from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import { Settings as SettingsIcon } from '@material-ui/icons';
import makeStyles from '@material-ui/styles/makeStyles';
import '../style/components.css';

const useStyles = makeStyles({
  exportButton: {
    background: "#FDBD01",
    color: "#FFFFFF",
    width: "100%",
    "&:hover": {
      background: "#E8AE01"
    }
  },
  stopButton: {
    background: "#0086F9",
    color: "#FFFFFF",
    width: "100%",
    "&:hover": {
      background: "#007AE2"
    }
  },
  startButton: {
    background: "#00A94D",
    color: "#FFFFFF",
    width: "100%",
    "&:hover": {
      background: "#009946"
    }
  },
  checkboxIcon: {
    color: "#FFFFFF",
    marginRight: "-5px",
    "&$checked": {
      iconStyle: {
        fill: "#FFFFFF"
      }
    }
  },
  checkBoxLabel: {
    color: "#FFFFFF"
  }
});

const Settings = () => {
  const SETTINGS_URL = 'http://localhost:8000/settings';
  
  const [settings, setSettings] = useState(undefined);
  
  const handleCheckbox = (e) => {
    console.log(e);
    const sectionName = e.target.value;
    const targetName = e.target.name;
    const currentChecked = e.target.checked;
    console.log(sectionName);
    console.log(targetName);
    console.log(currentChecked);
    setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentChecked}});
  };
  
  const handleInput = (e) => {
    console.log(e);
    const targetName = e.target.name;
    const sectionName = e.target.attributes.section.nodeValue;
    const currentValue = e.target.value;
    console.log(sectionName);
    console.log(targetName);
    console.log(currentValue);
    // setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentValue}});
  };
  
  const handleExportClick = () => {
    alert('Export Report button clicked!')
  };
  
  const handleStopClick = () => {
    alert('Stop button clicked!')
  };
  
  const handleStartClick = () => {
    alert('Start button clicked!')
  };
  
  useEffect(() => {
    console.log(settings);
    axios.get(SETTINGS_URL)
    .then(res => {
      console.log(res.data);
      setSettings(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  
  const classes = useStyles();
  
  return (
    <Grid>
      {
        settings && (
        <Grid container direction="column" spacing={2} className="component-container">
          <Grid item className="sub-heading">
            <Grid container spacing={1}>
              <Grid item>
                <SettingsIcon className="settings-icon" />
              </Grid>
              <Grid item>
                <h2>Settings</h2>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="sub-container">
            <Grid container>
              <Grid item xs={9} className="browser-container">
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox name="chrome" size="small" checked={settings.browsers.chrome} onChange={handleCheckbox} className={classes.checkboxIcon} value="browsers" />}
                      label={<Typography className={classes.checkBoxLabel}>Chrome</Typography>}
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox name="firefox" size="small" checked={settings.browsers.firefox} onChange={handleCheckbox} className={classes.checkboxIcon} value="browsers" />}
                      label={<Typography className={classes.checkBoxLabel}>Firefox</Typography>}
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox name="explorer" size="small" checked={settings.browsers.explorer} onChange={handleCheckbox} className={classes.checkboxIcon} value="browsers" />}
                      label={<Typography className={classes.checkBoxLabel}>Explorer</Typography>}
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox name="safari" size="small" checked={settings.browsers.safari} onChange={handleCheckbox} className={classes.checkboxIcon} value="browsers" />}
                      label={<Typography className={classes.checkBoxLabel}>Safari</Typography>}
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox name="opera" size="small" checked={settings.browsers.opera} onChange={handleCheckbox} className={classes.checkboxIcon} value="browsers" />}
                      label={<Typography className={classes.checkBoxLabel}>Opera</Typography>}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3} className="incognito-container">
                <FormControlLabel
                  control={<Checkbox name="incognito" size="small" checked={settings.browsers.incognito} onChange={handleCheckbox} className={classes.checkboxIcon} value="browsers" />}
                  label={<Typography className={classes.checkBoxLabel}>Incognito</Typography>}
                />
              </Grid>
            </Grid>
            <div className="horizontal-divider"></div>
            <Grid className="time-container">
              <div>
                <p>Wait</p>
                <input type="number" section="inputs" name="wait_seconds_1" min={0} max={100} value={settings.inputs.wait_seconds_1} onChange={handleInput} />
                <input type="number" name="wait_seconds_2" min={0} max={100} value={settings.inputs.wait_seconds_2} />
                <p>seconds on the targeted website.</p>
              </div>
              <div>
                <label>
                  <input type="checkbox" name="visit_within_site" checked={settings.inputs.visit_within_site} />
                  Visit the Page within the Site
                </label>
              </div>
              <div>
                <input type="number" name="page_numbers" min={0} max={100} value={settings.inputs.page_numbers} />
                <p>pages</p>
                <input type="number" name="page_visit_seconds_1" min={0} max={100} value={settings.inputs.page_visit_seconds_1} />
                <input type="number" name="page_visit_seconds_2" min={0} max={100} value={settings.inputs.page_visit_seconds_2} />
                <p>visit from to second.</p>
              </div>
              <div>
                <p>After the operation is complete</p>
                <input type="number" name="after_operation_wait_seconds_1" min={0} max={100} value={settings.inputs.after_operation_wait_seconds_1} />
                <input type="number" name="after_operation_wait_seconds_2" min={0} max={100} value={settings.inputs.after_operation_wait_seconds_2} />
                <p>seconds wait.</p>
              </div>
              <div>
                <p>Target site</p>
                <input type="number" name="target_sites" min={0} max={100} value={settings.inputs.target_sites} />
                <p>if not found times</p>
                <input type="number" name="target_site_wait_minutes" min={0} max={100} value={settings.inputs.target_site_wait_minutes} />
                <p>minutes wait.</p>
              </div>
              <div>
                <input type="number" name="auto_reset_times" min={0} max={100} value={settings.inputs.auto_reset_times} />
                <p>automatic reset after operation.</p>
              </div>
            </Grid>
          </Grid>
          <Grid item className="sub-container">
            <Grid container className="device-container">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="device_reset" size="small" checked={settings.devices.device_reset} onChange={handleCheckbox} className={classes.checkboxIcon} value="devices" />}
                  label={<Typography className={classes.checkBoxLabel}>Device Reset</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="vinn_reset" size="small" checked={settings.devices.vinn_reset} onChange={handleCheckbox} className={classes.checkboxIcon} value="devices" />}
                  label={<Typography className={classes.checkBoxLabel}>Vinn Reset</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="phone_reset" size="small" checked={settings.devices.phone_reset} onChange={handleCheckbox} className={classes.checkboxIcon} value="devices" />}
                  label={<Typography className={classes.checkBoxLabel}>Phone Reset</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="mobile_data" size="small" checked={settings.devices.mobile_data} onChange={handleCheckbox} className={classes.checkboxIcon} value="devices" />}
                  label={<Typography className={classes.checkBoxLabel}>Mobile Data</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="fly_mode" size="small" checked={settings.devices.fly_mode} onChange={handleCheckbox} className={classes.checkboxIcon} value="devices" />}
                  label={<Typography className={classes.checkBoxLabel}>Fly Mode</Typography>}
                />
              </Grid>
            </Grid>
            <div className="horizontal-divider"></div>
            <Grid container className="option-container">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="remove_cookies" size="small" checked={settings.options.remove_cookies} onChange={handleCheckbox} className={classes.checkboxIcon} value="options" />}
                  label={<Typography className={classes.checkBoxLabel}>Remove Cookies</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="change_resolution" size="small" checked={settings.options.change_resolution} onChange={handleCheckbox} className={classes.checkboxIcon} value="options" />}
                  label={<Typography className={classes.checkBoxLabel}>Change Resolution</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="mouse_tracks" size="small" checked={settings.options.mouse_tracks} onChange={handleCheckbox} className={classes.checkboxIcon} value="options" />}
                  label={<Typography className={classes.checkBoxLabel}>Mouse Tracks</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="data_saving_mode" size="small" checked={settings.options.data_saving_mode} onChange={handleCheckbox} className={classes.checkboxIcon} value="options" />}
                  label={<Typography className={classes.checkBoxLabel}>Data Saving Mode</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="random_generate" size="small" checked={settings.options.random_generate} onChange={handleCheckbox} className={classes.checkboxIcon} value="options" />}
                  label={<Typography className={classes.checkBoxLabel}>Random Generate</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="analytics_protection" size="small" checked={settings.options.analytics_protection} onChange={handleCheckbox} className={classes.checkboxIcon} value="options" />}
                  label={<Typography className={classes.checkBoxLabel}>Analytics Protection</Typography>}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="remove_history" size="small" checked={settings.options.remove_history} onChange={handleCheckbox} className={classes.checkboxIcon} value="options" />}
                  label={<Typography className={classes.checkBoxLabel}>Remove History</Typography>}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="sub-container">
            <Grid container xs={12} spacing={1} justify="space-between">
              <Grid item xs={6}>
                <Button size="large" variant="contained" className={classes.exportButton} onClick={handleExportClick}>EXPORT REPORT</Button>
              </Grid>
              <Grid item xs={3}>
                <Button size="large" variant="contained" className={classes.stopButton} startIcon={<PauseCircleOutline />} onClick={handleStopClick}>STOP</Button>
              </Grid>
              <Grid item xs={3}>
                <Button size="large" variant="contained" className={classes.startButton} startIcon={<PlayCircleOutline />} onClick={handleStartClick}>START</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        )
      }
    </Grid>
  );
}

export default Settings;