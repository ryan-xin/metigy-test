import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Grid, Button, TextField, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { PauseCircleOutline, PlayCircleOutline, Settings as SettingsIcon } from '@material-ui/icons';
import makeStyles from '@material-ui/styles/makeStyles';
import '../style/components.css';

// Checkbox tick icon svg base url
const svgBaseURL = "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cpath" + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 ";
// Checkbox tick icon yellow
const tickIconYellow = svgBaseURL + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23FDBD01'/%3E%3C/svg%3E\")"
// Checkbox tick icon blue
const tickIconBlue = svgBaseURL + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%230086F9'/%3E%3C/svg%3E\")"
// Checkbox tick icon green
const tickIconGreen = svgBaseURL + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%2300A94D'/%3E%3C/svg%3E\")"

// Customize button and input style
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
  checkboxStyle: {
    marginRight: "-3px"
  },
  checkBoxLabel: {
    color: "#FFFFFF",
    fontWeight: "500",
    marginRight: "-8px"
  },
  checkboxIconBrowsers: {
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: "#29425E",
    "input:hover ~ &": {
      border: "1px solid #FDBD01",
    },
  },
  checkboxCheckedIconBrowsers: {
    border: "1px solid #FDBD01",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: tickIconYellow,
      content: "''",
    }
  },
  checkboxIconModes: {
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: "#29425E",
    "input:hover ~ &": {
      border: "1px solid #00A94D",
    },
  },
  checkboxCheckedIconModes: {
    border: "1px solid #00A94D",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: tickIconGreen,
      content: "''",
    }
  },
  checkboxIconActions: {
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: "#233952",
    "input:hover ~ &": {
      border: "1px solid #0086F9",
    },
  },
  checkboxCheckedIconActions: {
    border: "1px solid #0086F9",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: tickIconBlue,
      content: "''",
    }
  },
  inputFieldRoot: {
    width: "65px",
    icon: {
      fill: "#FFFFFF"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29425E"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29425E"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29425E"
    },
    "& .MuiOutlinedInput-input": {
      color: "#FFFFFF"
    }
  }
});

const Settings = () => {
  const SETTINGS_URL = 'http://localhost:8000/settings';
  
  const [settings, setSettings] = useState(undefined);
  const [settingsID, setSettingsID] = useState(0);
  
  // Update checkbox state
  const handleCheckbox = (e) => {
    const sectionName = e.target.value;
    const targetName = e.target.name;
    const currentChecked = e.target.checked;
    const checkboxID = `${sectionName}-${targetName}`
    // Change checkbox border color based on sectionName
    if (currentChecked === true) { 
      // When checked add checked class name
      if (sectionName === 'browsers') {
        document.getElementById(checkboxID).classList.add('yellow-border-checked');
      } else if (sectionName === 'modes') {
        document.getElementById(checkboxID).classList.add('green-border-checked');
      } else if (sectionName === 'actions') {
        document.getElementById(checkboxID).classList.add('blue-border-checked');
      }
    } else if (currentChecked === false) {
        // When unchecked remove checked class name
        if (sectionName === 'browsers') {
          document.getElementById(checkboxID).classList.remove('yellow-border-checked');
        } else if (sectionName === 'modes') {
          document.getElementById(checkboxID).classList.remove('green-border-checked');
        } else if (sectionName === 'actions') {
          document.getElementById(checkboxID).classList.remove('blue-border-checked');
        }
    }
    // Update settings state
    setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentChecked}});
  };
  
  // Update input state
  const handleInput = (e) => {
    const sectionName = e.target.attributes.id.nodeValue;
    const targetName = e.target.name;
    const currentValue = e.target.value;
    setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentValue}});
  };
  
  // Increment input with plus icon
  const handleIncrement = (e) => {
    const sectionName = e.target.attributes.section.nodeValue;
    const targetName = e.target.name;
    const currentValue = parseInt(e.target.value) + 1;
    setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentValue}});
  };

  // Decrement input with minus icon
  const handleDecrement = (e) => {
    const sectionName = e.target.attributes.section.nodeValue;
    const targetName = e.target.name;
    const currentValue = parseInt(e.target.value) - 1;
    if (currentValue >= 0) {
      setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentValue}});
    }
  };
  
  // Export Report function
  const handleExportClick = () => {
    alert('Export Report button clicked!');
  };
  
  // Stop function
  const handleStopClick = () => {
    alert('Stop button clicked!');
  };
  
  // Start function and save setting data to backend
  const handleStartClick = () => {
    alert('Setting data saved!');
    axios.post(`${SETTINGS_URL}/edit`, {
      settings: settings,
      id: settingsID
    })
    .then(res => {
      setSettings(res.data);
    })
    .catch(err => console.log(err));
  };
  
  // Get setting data from backend
  useEffect(() => {
    axios.get(SETTINGS_URL)
    .then(res => {
      setSettings(res.data.settings); // Save setting to settings
      setSettingsID(res.data.settings_id); // Save setting id to settingsID
    })
    .catch(err => console.log(err));
  }, []);
  
  const classes = useStyles();
  
  return (
    <div>
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
            <div>
              <Grid container item="true">
                <Grid item className="browser-container">
                  <Grid container spacing={2}>
                    <Grid item>
                      <div id="browsers-chrome" className={settings.browsers.chrome ? "checkbox-border yellow-border yellow-border-checked" : "checkbox-border yellow-border"}>
                        <FormControlLabel
                          control={<Checkbox name="chrome" size="small" checked={settings.browsers.chrome} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconBrowsers, classes.checkboxCheckedIconBrowsers)} />} icon={<span className={classes.checkboxIconBrowsers} />} value="browsers" />}
                          label={<Typography className={classes.checkBoxLabel}>Chrome</Typography>}
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div id="browsers-firefox" className={settings.browsers.firefox ? "checkbox-border yellow-border yellow-border-checked" : "checkbox-border yellow-border"}>
                        <FormControlLabel
                          control={<Checkbox name="firefox" size="small" checked={settings.browsers.firefox} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconBrowsers, classes.checkboxCheckedIconBrowsers)} />} icon={<span className={classes.checkboxIconBrowsers} />} value="browsers" />}
                          label={<Typography className={classes.checkBoxLabel}>Firefox</Typography>}
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div id="browsers-explorer" className={settings.browsers.explorer ? "checkbox-border yellow-border yellow-border-checked" : "checkbox-border yellow-border"}>
                        <FormControlLabel
                          control={<Checkbox name="explorer" size="small" checked={settings.browsers.explorer} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconBrowsers, classes.checkboxCheckedIconBrowsers)} />} icon={<span className={classes.checkboxIconBrowsers} />} value="browsers" />}
                          label={<Typography className={classes.checkBoxLabel}>Explorer</Typography>}
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div id="browsers-safari" className={settings.browsers.safari ? "checkbox-border yellow-border yellow-border-checked" : "checkbox-border yellow-border"}>
                        <FormControlLabel
                          control={<Checkbox name="safari" size="small" checked={settings.browsers.safari} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconBrowsers, classes.checkboxCheckedIconBrowsers)} />} icon={<span className={classes.checkboxIconBrowsers} />} value="browsers" />}
                          label={<Typography className={classes.checkBoxLabel}>Safari</Typography>}
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div id="browsers-opera" className={settings.browsers.opera ? "checkbox-border yellow-border yellow-border-checked" : "checkbox-border yellow-border"}>
                        <FormControlLabel
                          control={<Checkbox name="opera" size="small" checked={settings.browsers.opera} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconBrowsers, classes.checkboxCheckedIconBrowsers)} />} icon={<span className={classes.checkboxIconBrowsers} />} value="browsers" />}
                          label={<Typography className={classes.checkBoxLabel}>Opera</Typography>}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="incognito-container">
                  <div id="browsers-incognito" className={settings.browsers.incognito ? "checkbox-border yellow-border yellow-border-checked" : "checkbox-border yellow-border"}>
                    <FormControlLabel
                      control={<Checkbox name="incognito" size="small" checked={settings.browsers.incognito} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconBrowsers, classes.checkboxCheckedIconBrowsers)} />} icon={<span className={classes.checkboxIconBrowsers} />} value="browsers" />}
                      label={<Typography className={classes.checkBoxLabel}>Incognito</Typography>}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="horizontal-divider"></div>
            <div className="time-container">
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <p>Wait</p>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="wait_secs_min" value={settings.inputs.wait_secs_min} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="wait_secs_min" section="inputs" value={settings.inputs.wait_secs_min} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="wait_secs_min" section="inputs" value={settings.inputs.wait_secs_min} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="wait_secs_max" value={settings.inputs.wait_secs_max} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="wait_secs_max" section="inputs" value={settings.inputs.wait_secs_max} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="wait_secs_max" section="inputs" value={settings.inputs.wait_secs_max} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <p>seconds on the targeted website.</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox name="visit_within_site" size="small" checked={settings.inputs.visit_within_site} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconOptions, classes.checkboxCheckedIconOptions)} />} icon={<span className={classes.checkboxIconOptions} />} value="inputs" />}
                    label={<Typography className={classes.checkBoxLabel}>Visit the Page within the Site</Typography>}
                  />
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="page_nums" value={settings.inputs.page_nums} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="page_nums" section="inputs" value={settings.inputs.page_nums} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="page_nums" section="inputs" value={settings.inputs.page_nums} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <p>pages</p>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="page_visit_secs_min" value={settings.inputs.page_visit_secs_min} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="page_visit_secs_min" section="inputs" value={settings.inputs.page_visit_secs_min} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="page_visit_secs_min" section="inputs" value={settings.inputs.page_visit_secs_min} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="page_visit_secs_max" value={settings.inputs.page_visit_secs_max} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 10 } }} />
                        <button className="counter-button increment-button" name="page_visit_secs_max" section="inputs" value={settings.inputs.page_visit_secs_max} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="page_visit_secs_max" section="inputs" value={settings.inputs.page_visit_secs_max} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <p>visit from to second.</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <p>After the operation is complete</p>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="after_op_wait_secs_min" value={settings.inputs.after_op_wait_secs_min} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="after_op_wait_secs_min" section="inputs" value={settings.inputs.after_op_wait_secs_min} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="after_op_wait_secs_min" section="inputs" value={settings.inputs.after_op_wait_secs_min} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="after_op_wait_secs_max" value={settings.inputs.after_op_wait_secs_max} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="after_op_wait_secs_max" section="inputs" value={settings.inputs.after_op_wait_secs_max} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="after_op_wait_secs_max" section="inputs" value={settings.inputs.after_op_wait_secs_max} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <p>seconds wait.</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <p>Target site</p>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="target_sites" value={settings.inputs.target_sites} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="target_sites" section="inputs" value={settings.inputs.target_sites} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="target_sites" section="inputs" value={settings.inputs.target_sites} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <p>if not found times</p>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="target_site_wait_mins" value={settings.inputs.target_site_wait_mins} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="target_site_wait_mins" section="inputs" value={settings.inputs.target_site_wait_mins} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="target_site_wait_mins" section="inputs" value={settings.inputs.target_site_wait_mins} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <p>minutes wait.</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="auto_reset_times" value={settings.inputs.auto_reset_times} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="auto_reset_times" section="inputs" value={settings.inputs.auto_reset_times} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="auto_reset_times" section="inputs" value={settings.inputs.auto_reset_times} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <p>automatic reset after operation.</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item className="sub-container">
            <div className="mode-container">
              <Grid container spacing={2}>
                <Grid item>
                  <div id="modes-device_reset" className={settings.modes.device_reset ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                    <FormControlLabel
                      control={<Checkbox name="device_reset" size="small" checked={settings.modes.device_reset} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconModes, classes.checkboxCheckedIconModes)} />} icon={<span className={classes.checkboxIconModes} />} value="modes" />}
                      label={<Typography className={classes.checkBoxLabel}>Device Reset</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="modes-vinn_reset" className={settings.modes.vinn_reset ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                    <FormControlLabel
                      control={<Checkbox name="vinn_reset" size="small" checked={settings.modes.vinn_reset} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconModes, classes.checkboxCheckedIconModes)} />} icon={<span className={classes.checkboxIconModes} />} value="modes" />}
                      label={<Typography className={classes.checkBoxLabel}>Vinn Reset</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="modes-phone_reset" className={settings.modes.phone_reset ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                    <FormControlLabel
                      control={<Checkbox name="phone_reset" size="small" checked={settings.modes.phone_reset} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconModes, classes.checkboxCheckedIconModes)} />} icon={<span className={classes.checkboxIconModes} />} value="modes" />}
                      label={<Typography className={classes.checkBoxLabel}>Phone Reset</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="modes-mobile_data" className={settings.modes.mobile_data ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                    <FormControlLabel
                      control={<Checkbox name="mobile_data" size="small" checked={settings.modes.mobile_data} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconModes, classes.checkboxCheckedIconModes)} />} icon={<span className={classes.checkboxIconModes} />} value="modes" />}
                      label={<Typography className={classes.checkBoxLabel}>Mobile Data</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="modes-fly_mode" className={settings.modes.fly_mode ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                  <FormControlLabel
                    control={<Checkbox name="fly_mode" size="small" checked={settings.modes.fly_mode} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconModes, classes.checkboxCheckedIconModes)} />} icon={<span className={classes.checkboxIconModes} />} value="modes" />}
                    label={<Typography className={classes.checkBoxLabel}>Fly Mode</Typography>}
                  />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="horizontal-divider"></div>
            <div className="action-container">
              <Grid container spacing={2}>
                <Grid item>
                  <div id="actions-remove_cookies" className={settings.actions.remove_cookies ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="remove_cookies" size="small" checked={settings.actions.remove_cookies} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconActions, classes.checkboxCheckedIconActions)} />} icon={<span className={classes.checkboxIconActions} />} value="actions" />}
                      label={<Typography className={classes.checkBoxLabel}>Remove Cookies</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="actions-change_resolution" className={settings.actions.change_resolution ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="change_resolution" size="small" checked={settings.actions.change_resolution} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconActions, classes.checkboxCheckedIconActions)} />} icon={<span className={classes.checkboxIconActions} />} value="actions" />}
                      label={<Typography className={classes.checkBoxLabel}>Change Resolution</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="actions-mouse_tracks" className={settings.actions.mouse_tracks ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="mouse_tracks" size="small" checked={settings.actions.mouse_tracks} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconActions, classes.checkboxCheckedIconActions)} />} icon={<span className={classes.checkboxIconActions} />} value="actions" />}
                      label={<Typography className={classes.checkBoxLabel}>Mouse Tracks</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="actions-data_saving_mode" className={settings.actions.data_saving_mode ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="data_saving_mode" size="small" checked={settings.actions.data_saving_mode} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconActions, classes.checkboxCheckedIconActions)} />} icon={<span className={classes.checkboxIconActions} />} value="actions" />}
                      label={<Typography className={classes.checkBoxLabel}>Data Saving Mode</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="actions-random_generate" className={settings.actions.random_generate ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="random_generate" size="small" checked={settings.actions.random_generate} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconActions, classes.checkboxCheckedIconActions)} />} icon={<span className={classes.checkboxIconActions} />} value="actions" />}
                      label={<Typography className={classes.checkBoxLabel}>Random Generate</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="actions-analytics_protection" className={settings.actions.analytics_protection ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="analytics_protection" size="small" checked={settings.actions.analytics_protection} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconActions, classes.checkboxCheckedIconActions)} />} icon={<span className={classes.checkboxIconActions} />} value="actions" />}
                      label={<Typography className={classes.checkBoxLabel}>Analytics Protection</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="actions-remove_history" className={settings.actions.remove_history ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                  <FormControlLabel
                    control={<Checkbox name="remove_history" size="small" checked={settings.actions.remove_history} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconActions, classes.checkboxCheckedIconActions)} />} icon={<span className={classes.checkboxIconActions} />} value="actions" />}
                    label={<Typography className={classes.checkBoxLabel}>Remove History</Typography>}
                  />
                  </div>
                </Grid>
              </Grid>
            </div>
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
    </div>
  );
}

export default Settings;