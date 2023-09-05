import { React } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { useDataState } from '../context/SheetContext2';
import { toast } from "react-toastify";
import addNotification from "react-push-notification";
import useMediaQuery from "@mui/material/useMediaQuery";


const Machine_info = ({
    machine_status,
    sensor_status
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const{ 
     machine1Readings,
     machine2Readings,
     machine3Readings,
     machine4Readings,
     machine5Readings,
     machine6Readings,
     machine7Readings,
     handleMachineSelect,
     selectedMachine,
      } = useDataState();
     
    const machineReadingsMap = {
        Machine_1: machine1Readings,
        Machine_2: machine2Readings,
        Machine_3: machine3Readings,
        Machine_4: machine4Readings,
        Machine_5: machine5Readings,
        Machine_6: machine6Readings,
        Machine_7: machine7Readings,
    };

    
    const notify2 = (parameter, machineName) => {

        addNotification({
            title: 'Warning',
            subtitle: 'This is a subtitle',
            message: `${parameter} happened in ${machineName}`,
            native: true,
            duration: 50000,
            onClick: () => {
                // Redirect the user to /machine2 when they click on the notification
               // navigate('/machine2');
            },
        });
    };
    const notify = (parameter, machineName) => {
        toast.error(`${parameter} happened in ${machineName}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const getAlertColor = (reading1, reading2) => 
         reading1 < reading2 ? colors.redAccent[500] : colors.greenAccent[500];

    const checkIfErrorHappened = (machineReadings, machineName) => {

        const {
           Machine_Status,
           Sensor_Status
        } = machineReadings;
        
        if( (Machine_Status === '1') && (Sensor_Status === '0')){
          notify("Error", machineName);
        //   notify2("Error", machineName);
          return colors.redAccent[500];
        }
        return colors.greenAccent[700];
    };

const selectedMachineReadings = machineReadingsMap[selectedMachine] || {};

   const {
           Machine_Status,
           Sensor_Status
        } = selectedMachineReadings;

    const alertColors = { 
         alertColorStatus: selectedMachine 
             ? getAlertColor(Machine_Status, Sensor_Status) 
             : colors.grey[500]
    };
    
        const { 
         alertColorStatus} = alertColors;

    return (
        <Box
            display="grid"
            gridTemplateColumns={isNonMobile ? "2fr repeat(2, 1fr)" : ""}
            gridTemplateRows="repeat(5, 1fr)"
            overflow="auto"
            whiteSpace="nowrap"
            columnGap="20px"
            border="5px solid"
            borderColor={colors.greenAccent[500]}
            borderRadius="10px"
            py="10px"
        >
            <Box
                gridArea="1 / 1 / 2 / 4"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pb="10px"
                mb="10px"
                borderBottom="5px solid"
                borderColor={colors.greenAccent[500]}
                gap="10px"
            >
                <Typography variant="h1" color={colors.blueAccent[500]}>
                    {" "}
                    {selectedMachine} (
                </Typography>
                <Box display="flex" justifyContent="space-between" gap="10px">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: `${colors.greenAccent[700]}` }}
                    >
                        Online
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: `${colors.redAccent[500]}` }}
                    >
                        Error
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: `${colors.grey[500]}` }}
                    >
                        Offline
                    </Button>
                </Box>
                <Typography variant="h1" color={colors.blueAccent[500]}>
                    )
                </Typography>
            </Box>
            <Box
                gridArea="2 / 1 / 6 / 2"
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gridTemplateRows="repeat(4, 1fr)"
                gap="20px"
            >
                <Box
                    gridArea="1 / 1 / 2 / 2"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_1")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine1Readings.Machine_Status === "0"
                                ? colors.grey[500]
                                : checkIfErrorHappened(machine1Readings, "Machine 1")
                                }`,
                        }}
                    >
                        Machine 1
                    </Button>
                </Box>
                <Box
                    gridArea="1 / 2 / 2 / 3"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_2")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine2Readings.Machine_Status === "0"
                                ? colors.grey[500]
                                : checkIfErrorHappened(machine2Readings, "Machine 2")
                                }`,
                        }}
                    >
                        Machine 2
                    </Button>
                </Box>
                <Box
                    gridArea="1 / 3 / 2 / 4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_3")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine3Readings.Machine_Status === "0"
                                ? colors.grey[500]
                                : checkIfErrorHappened(machine3Readings, "Machine 3")
                                }`,
                        }}
                    >
                        Machine 3
                    </Button>
                </Box>
                <Box
                    gridArea="2 / 1 / 3 / 2"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_4")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine4Readings.Machine_Status === "0"
                                ? colors.grey[500]
                                : checkIfErrorHappened(machine4Readings, "Machine 4")
                                }`,
                        }}
                    >
                        Machine 4
                    </Button>
                </Box>
                <Box
                    gridArea="2 / 2 / 3 / 3"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_5")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine5Readings.Machine_Status === "0"
                                ? colors.grey[500]
                                : checkIfErrorHappened(machine5Readings, "Machine 5")
                                }`,
                        }}
                    >
                        Machine 5
                    </Button>
                </Box>
                <Box
                    gridArea="2 / 3 / 3 / 4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_6")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine6Readings.Machine_Status === "0"
                                ? colors.grey[500]
                                : checkIfErrorHappened(machine6Readings, "Machine 6")
                                }`,
                        }}
                    >
                        Machine 6
                    </Button>
                </Box>
                <Box
                    gridArea="3 / 1 / 4 / 2"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_7")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine7Readings.Machine_Status === "0"
                                ? colors.grey[500]
                                : checkIfErrorHappened(machine7Readings, "Machine 7")
                                }`,
                        }}
                    >
                        Machine 7
                    </Button>
                </Box>
            </Box>
            <Box gridArea="2 / 2 / 3 / 3" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Machine Status : &nbsp;
                </Typography>
                <Typography variant="h3" color={( Machine_Status === '0') ? (colors.grey[500]) :  alertColorStatus }>
                    {machine_status}
                </Typography>
            </Box>
            <Box gridArea="2 / 3 / 3 / 4" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Sensor Status : &nbsp;
                </Typography>
                <Typography variant="h3" color={ ( Machine_Status === '0') ? (colors.grey[500]) :  alertColorStatus                }>
                    {sensor_status}
                </Typography>
            </Box>
        </Box>
    );
};

export default Machine_info;
