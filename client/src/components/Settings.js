import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import PauseCircleOutline from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import { Settings as SettingsIcon } from '@material-ui/icons';
import makeStyles from '@material-ui/styles/makeStyles';
import '../style/components.css';

const svgBaseURL = "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cpath" + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 ";

const tickIconYellow = svgBaseURL + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23FDBD01'/%3E%3C/svg%3E\")"

const tickIconBlue = svgBaseURL + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%230086F9'/%3E%3C/svg%3E\")"

const tickIconGreen = svgBaseURL + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%2300A94D'/%3E%3C/svg%3E\")"

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
  checkboxIconDevices: {
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: "#29425E",
    "input:hover ~ &": {
      border: "1px solid #00A94D",
    },
  },
  checkboxCheckedIconDevices: {
    border: "1px solid #00A94D",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: tickIconGreen,
      content: "''",
    }
  },
  checkboxIconOptions: {
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: "#233952",
    "input:hover ~ &": {
      border: "1px solid #0086F9",
    },
  },
  checkboxCheckedIconOptions: {
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
  
  const handleCheckbox = (e) => {
    console.log(e);
    const sectionName = e.target.value;
    const targetName = e.target.name;
    const currentChecked = e.target.checked;
    const checkboxID = `${sectionName}-${targetName}`
    console.log(sectionName);
    console.log(targetName);
    console.log(currentChecked);
    console.log(checkboxID);
    if (currentChecked === true) {
      if (sectionName === 'browsers') {
        document.getElementById(checkboxID).classList.add('yellow-border-checked');
      } else if (sectionName === 'devices') {
        document.getElementById(checkboxID).classList.add('green-border-checked');
      } else if (sectionName === 'options') {
        document.getElementById(checkboxID).classList.add('blue-border-checked');
      }
    } else if (currentChecked === false) {
        if (sectionName === 'browsers') {
          document.getElementById(checkboxID).classList.remove('yellow-border-checked');
        } else if (sectionName === 'devices') {
          document.getElementById(checkboxID).classList.remove('green-border-checked');
        } else if (sectionName === 'options') {
          document.getElementById(checkboxID).classList.remove('blue-border-checked');
        }
    }
    setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentChecked}});
  };
  
  const handleInput = (e) => {
    console.log(e);
    const sectionName = e.target.attributes.id.nodeValue;
    const targetName = e.target.name;
    const currentValue = e.target.value;
    console.log(sectionName);
    console.log(targetName);
    console.log(currentValue);
    setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentValue}});
  };
  
  const handleIncrement = (e) => {
    console.log(e);
    const sectionName = e.target.attributes.section.nodeValue;
    const targetName = e.target.name;
    const currentValue = parseInt(e.target.value) + 1;
    console.log(sectionName);
    console.log(targetName);
    console.log(currentValue);
    setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentValue}});
  };

  const handleDecrement = (e) => {
    console.log(e);
    const sectionName = e.target.attributes.section.nodeValue;
    const targetName = e.target.name;
    const currentValue = parseInt(e.target.value) - 1;
    console.log(sectionName);
    console.log(targetName);
    console.log(currentValue);
    if (currentValue >= 0) {
      setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentValue}});
    }
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
                  <div id="browsers.incognito" className={settings.browsers.incognito ? "checkbox-border yellow-border yellow-border-checked" : "checkbox-border yellow-border"}>
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
                        <TextField type="number" size="small" name="wait_seconds_1" value={settings.inputs.wait_seconds_1} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="wait_seconds_1" section="inputs" value={settings.inputs.wait_seconds_1} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="wait_seconds_1" section="inputs" value={settings.inputs.wait_seconds_1} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="wait_seconds_2" value={settings.inputs.wait_seconds_2} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="wait_seconds_2" section="inputs" value={settings.inputs.wait_seconds_2} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="wait_seconds_2" section="inputs" value={settings.inputs.wait_seconds_2} onClick={handleDecrement}>-</button>
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
                        <TextField type="number" size="small" name="page_numbers" value={settings.inputs.page_numbers} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="page_numbers" section="inputs" value={settings.inputs.page_numbers} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="page_numbers" section="inputs" value={settings.inputs.page_numbers} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <p>pages</p>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="page_visit_seconds_1" value={settings.inputs.page_visit_seconds_1} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="page_visit_seconds_1" section="inputs" value={settings.inputs.page_visit_seconds_1} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="page_visit_seconds_1" section="inputs" value={settings.inputs.page_visit_seconds_1} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="page_visit_seconds_2" value={settings.inputs.page_visit_seconds_2} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 10 } }} />
                        <button className="counter-button increment-button" name="page_visit_seconds_2" section="inputs" value={settings.inputs.page_visit_seconds_2} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="page_visit_seconds_2" section="inputs" value={settings.inputs.page_visit_seconds_2} onClick={handleDecrement}>-</button>
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
                        <TextField type="number" size="small" name="after_operation_wait_seconds_1" value={settings.inputs.after_operation_wait_seconds_1} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="after_operation_wait_seconds_1" section="inputs" value={settings.inputs.after_operation_wait_seconds_1} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="after_operation_wait_seconds_1" section="inputs" value={settings.inputs.after_operation_wait_seconds_1} onClick={handleDecrement}>-</button>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="input-counter">
                        <TextField type="number" size="small" name="after_operation_wait_seconds_2" value={settings.inputs.after_operation_wait_seconds_2} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="after_operation_wait_seconds_2" section="inputs" value={settings.inputs.after_operation_wait_seconds_2} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="after_operation_wait_seconds_2" section="inputs" value={settings.inputs.after_operation_wait_seconds_2} onClick={handleDecrement}>-</button>
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
                        <TextField type="number" size="small" name="target_site_wait_minutes" value={settings.inputs.target_site_wait_minutes} min={0} max={100} onChange={handleInput} id="inputs" variant="outlined" className={classes.inputFieldRoot} InputProps={{ inputProps: { min: 0, max: 100 }}} />
                        <button className="counter-button increment-button" name="target_site_wait_minutes" section="inputs" value={settings.inputs.target_site_wait_minutes} onClick={handleIncrement}>+</button>
                        <button className="counter-button decrement-button" name="target_site_wait_minutes" section="inputs" value={settings.inputs.target_site_wait_minutes} onClick={handleDecrement}>-</button>
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
            <div className="device-container">
              <Grid container spacing={2}>
                <Grid item>
                  <div id="devices-device_reset" className={settings.devices.device_reset ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                    <FormControlLabel
                      control={<Checkbox name="device_reset" size="small" checked={settings.devices.device_reset} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconDevices, classes.checkboxCheckedIconDevices)} />} icon={<span className={classes.checkboxIconDevices} />} value="devices" />}
                      label={<Typography className={classes.checkBoxLabel}>Device Reset</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="devices-vinn_reset" className={settings.devices.vinn_reset ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                    <FormControlLabel
                      control={<Checkbox name="vinn_reset" size="small" checked={settings.devices.vinn_reset} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconDevices, classes.checkboxCheckedIconDevices)} />} icon={<span className={classes.checkboxIconDevices} />} value="devices" />}
                      label={<Typography className={classes.checkBoxLabel}>Vinn Reset</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="devices-phone_reset" className={settings.devices.phone_reset ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                    <FormControlLabel
                      control={<Checkbox name="phone_reset" size="small" checked={settings.devices.phone_reset} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconDevices, classes.checkboxCheckedIconDevices)} />} icon={<span className={classes.checkboxIconDevices} />} value="devices" />}
                      label={<Typography className={classes.checkBoxLabel}>Phone Reset</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="devices-mobile_data" className={settings.devices.mobile_data ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                    <FormControlLabel
                      control={<Checkbox name="mobile_data" size="small" checked={settings.devices.mobile_data} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconDevices, classes.checkboxCheckedIconDevices)} />} icon={<span className={classes.checkboxIconDevices} />} value="devices" />}
                      label={<Typography className={classes.checkBoxLabel}>Mobile Data</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="devices-fly_mode" className={settings.devices.fly_mode ? "checkbox-border green-border green-border-checked" : "checkbox-border green-border"}>
                  <FormControlLabel
                    control={<Checkbox name="fly_mode" size="small" checked={settings.devices.fly_mode} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconDevices, classes.checkboxCheckedIconDevices)} />} icon={<span className={classes.checkboxIconDevices} />} value="devices" />}
                    label={<Typography className={classes.checkBoxLabel}>Fly Mode</Typography>}
                  />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="horizontal-divider"></div>
            <div className="option-container">
              <Grid container spacing={2}>
                <Grid item>
                  <div id="options-remove_cookies" className={settings.options.remove_cookies ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="remove_cookies" size="small" checked={settings.options.remove_cookies} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconOptions, classes.checkboxCheckedIconOptions)} />} icon={<span className={classes.checkboxIconOptions} />} value="options" />}
                      label={<Typography className={classes.checkBoxLabel}>Remove Cookies</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="options-change_resolution" className={settings.options.change_resolution ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="change_resolution" size="small" checked={settings.options.change_resolution} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconOptions, classes.checkboxCheckedIconOptions)} />} icon={<span className={classes.checkboxIconOptions} />} value="options" />}
                      label={<Typography className={classes.checkBoxLabel}>Change Resolution</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="options-mouse_tracks" className={settings.options.mouse_tracks ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="mouse_tracks" size="small" checked={settings.options.mouse_tracks} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconOptions, classes.checkboxCheckedIconOptions)} />} icon={<span className={classes.checkboxIconOptions} />} value="options" />}
                      label={<Typography className={classes.checkBoxLabel}>Mouse Tracks</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="options-data_saving_mode" className={settings.options.data_saving_mode ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="data_saving_mode" size="small" checked={settings.options.data_saving_mode} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconOptions, classes.checkboxCheckedIconOptions)} />} icon={<span className={classes.checkboxIconOptions} />} value="options" />}
                      label={<Typography className={classes.checkBoxLabel}>Data Saving Mode</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="options-random_generate" className={settings.options.random_generate ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="random_generate" size="small" checked={settings.options.random_generate} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconOptions, classes.checkboxCheckedIconOptions)} />} icon={<span className={classes.checkboxIconOptions} />} value="options" />}
                      label={<Typography className={classes.checkBoxLabel}>Random Generate</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="options-analytics_protection" className={settings.options.analytics_protection ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                    <FormControlLabel
                      control={<Checkbox name="analytics_protection" size="small" checked={settings.options.analytics_protection} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconOptions, classes.checkboxCheckedIconOptions)} />} icon={<span className={classes.checkboxIconOptions} />} value="options" />}
                      label={<Typography className={classes.checkBoxLabel}>Analytics Protection</Typography>}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div id="options-remove_history" className={settings.options.remove_history ? "checkbox-border blue-border blue-border-checked" : "checkbox-border blue-border"}>
                  <FormControlLabel
                    control={<Checkbox name="remove_history" size="small" checked={settings.options.remove_history} onChange={handleCheckbox} className={classes.checkboxStyle} checkedIcon={<span className={clsx(classes.checkboxIconOptions, classes.checkboxCheckedIconOptions)} />} icon={<span className={classes.checkboxIconOptions} />} value="options" />}
                    label={<Typography className={classes.checkBoxLabel}>Remove History</Typography>}
                  />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item className="sub-container">
            <Grid container xs={13} spacing={1} justify="space-between">
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