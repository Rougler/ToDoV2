import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import './Tabs.css'

export default function ColorTabs({ value, onChange, tabs, addTab, setTabs, setManagerNames, children }) {
  const [isAdding, setIsAdding] = React.useState(false);
  const [newTabLabel, setNewTabLabel] = React.useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [managerName, setManagerName] = useState('');

  React.useEffect(() => {
    getAllProject();
    return () => {

    };
  }, []);

  const handleAddClick = () => {
    setIsAdding(true);
    openModal();
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const getAllProject = async () => {
    const response = await axios.get("http://127.0.0.1:8000/todo/projects/");
    const projects = response.data;

    const transformedTabs = projects.map((project, index) => ({
      value: `tab${index}`,
      label: project.projname
    }));

    const transformedManagers = {};
    projects.forEach((project, index) => {
      transformedManagers[`tab${index}`] = project.assignedTo[0];
    });

    setTabs(transformedTabs);
    setManagerNames(transformedManagers);
  }


  const postProject = async () => {
    try {
      const data = {
        "projname": newTabLabel,
        "assignedTo": [managerName]
      }
      const response = await axios.post("http://127.0.0.1:8000/todo/api/create_project/", data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTag = () => {
    if (newTabLabel.trim() !== "") {
      addTab(newTabLabel, managerName);
      setNewTabLabel('');
      setManagerName("");
      setIsAdding(false);
      postProject();
      closeModal();
    }
  };


  const saveData = () => {
    console.log('Task Name:', taskName);
    console.log('Manager Name:', managerName);
    postProject();
    closeModal();
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      marginTop: '50px'
    },

    openButton: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    modal: {
      display: 'block',
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
      backgroundColor: '#fefefe',
      margin: '15% auto',
      padding: '20px',
      border: '1px solid #888',
      width: '300px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      animation: 'slide-down 0.4s',
    },
    close: {
      color: '#aaa',
      float: 'right',
      fontSize: '28px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    form: {
      margin: '0',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
    },
    saveButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    }
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tabs
          value={value}
          onChange={onChange}
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          sx={{
            flexGrow: 1,
            '& .MuiTabs-scrollButtons': {
              color: 'black', // change the color to your desired value
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} value={tab.value} label={tab.label} />
          ))}
        </Tabs>


        <Button className='AddProject'onClick={handleAddClick} variant="contained" color="primary" sx={{ ml: 2 }}>
          + Add Project
        </Button>
      </Box>

      <div style={styles.container}>
        {modalVisible && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <span style={styles.close} onClick={closeModal}>&times;</span>
              <form style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="taskName">Task Name</label>
                  <TextField
                    label="Project Name"
                    value={newTabLabel}
                    onChange={(e) => setNewTabLabel(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 2 }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="managerName">Select Manager</label>
                  <select
                    style={styles.input}
                    id="managerName"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                  >
                    <option value="">Select Manager</option>

                    <option value="nitesh.saw">nitesh.saw</option>
                    <option value="s.r">s.r</option>
                    <option value="sahil.ullah">sahil.ullah</option>
                  </select>
                </div>
                <Button onClick={handleAddTag} variant="contained" color="primary">
                  Add
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>

      {children}
    </Box>
  );
}
