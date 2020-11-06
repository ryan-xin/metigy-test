import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/components.css';

const Settings = () => {
  const SETTINGS_URL = 'http://localhost:8000/settings';
  
  const [settings, setSettings] = useState(undefined);
  
  const handleCheckbox = (e) => {
    console.log(e);
    const targetName = e.target.name;
    const sectionName = e.target.attributes.section.nodeValue;
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
    setSettings({...settings, [sectionName]: {...settings[sectionName], [targetName]: currentValue}});
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
  
  return (
    <div>
      {
        settings && (
        <div>
          <h2>Settings</h2>
          <div>
            <label>
              <input type="checkbox" section="browsers" name="chrome" checked={settings.browsers.chrome} onChange={handleCheckbox}/>
              Chrome
            </label>
            <label>
              <input type="checkbox" name="firefox" checked={settings.browsers.firefox} />
              Firefox
            </label>
            <label>
              <input type="checkbox" name="explorer" checked={settings.browsers.explorer} />
              Explorer
            </label>
            <label>
              <input type="checkbox" name="safari" checked={settings.browsers.safari} />
              Safari
            </label>
            <label>
              <input type="checkbox" name="opera" checked={settings.browsers.opera} />
              Opera
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="incognito" checked={settings.incognito} />
              Incognito
            </label>
          </div>
          <div>
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
          </div>
          <div>
            <label>
              <input type="checkbox" name="device_reset" checked={settings.devices.device_reset} />
              Device Reset
            </label>
            <label>
              <input type="checkbox" name="devices.vinn_reset" checked={settings.devices.vinn_reset} />
              Vinn Reset
            </label>
            <label>
              <input type="checkbox" name="phone_reset" checked={settings.devices.phone_reset} />
              Phone Reset
            </label>
            <label>
              <input type="checkbox" name="mobile_data" checked={settings.devices.mobile_data} />
              Mobile Data
            </label>
            <label>
              <input type="checkbox" name="flyMode" checked={settings.devices.fly_mode} />
              Fly Mode
            </label>            
          </div>
          <div>
            <label>
              <input type="checkbox" name="remove_cookies" checked={settings.devices.remove_cookies} />
              Remove Cookies
            </label>
            <label>
              <input type="checkbox" name="change_resolution" checked={settings.devices.change_resolution} />
              Change Resolution
            </label>
            <label>
              <input type="checkbox" name="mouse_tracks" checked={settings.devices.mouse_tracks} />
              Mouse Tracks
            </label>
            <label>
              <input type="checkbox" name="data_saving_mode" checked={settings.devices.data_saving_mode} />
              Data Saving Mode
            </label>
            <label>
              <input type="checkbox" name="random_generate" checked={settings.devices.random_generate} />
              Random Generate
            </label>
            <label>
              <input type="checkbox" name="analytics_protection" checked={settings.devices.analytics_protection} />
              Analytics Protection
            </label>
            <label>
              <input type="checkbox" name="remove_history" checked={settings.devices.remove_history} />
              Remove History
            </label>
          </div>
          <div>
            <button onClick={handleExportClick}>EXPORT REPORT</button>
            <button onClick={handleStopClick}>STOP</button>
            <button onClick={handleStartClick}>START</button>
          </div>
        </div>
        )
      }
    </div>
  );
}

export default Settings;