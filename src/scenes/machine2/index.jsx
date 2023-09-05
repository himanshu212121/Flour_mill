import { Box, useTheme, Skeleton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDataState } from '../../context/SheetContext2';
import Machine from "../../components/machine"
import Machineinfo from "../../components/machine_info";




const Machine_Profile2 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const{
     machine1Readings,
     machine2Readings,
     machine3Readings,
     machine4Readings,
     machine5Readings,
     machine6Readings,
     machine7Readings,
     selectedMachine,
     } = useDataState();
//alert(selectedMachineReadings.Sensor_Status);
const checkIfErrorHappened = (machineReadings) => {

        const {
           Machine_Status,
           Sensor_Status
        } = machineReadings;
        
        if( (Machine_Status === '1') && (Sensor_Status === '0')){
          return colors.redAccent[500];
        }
        return colors.greenAccent[700];
    };
  const machineReadingsMap = {
        Machine_1: machine1Readings,
        Machine_2: machine2Readings,
        Machine_3: machine3Readings,
        Machine_4: machine4Readings,
        Machine_5: machine5Readings,
        Machine_6: machine6Readings,
        Machine_7: machine7Readings,
    }; 
   const selectedMachineReadings = machineReadingsMap[selectedMachine] || {};

   const {
           Machine_Status,
           Sensor_Status
        } = selectedMachineReadings;
        


    if (!selectedMachine || !selectedMachineReadings || !machine1Readings || !machine2Readings || !machine3Readings || !machine4Readings || !machine5Readings || !machine6Readings || !machine7Readings) {
        return (
            <Box my="30px" mx="20px" display="grid" gap="10px">
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rectangular" height="40vh" />
                <Skeleton variant="rounded" height="30vh" />
            </Box>
        );
    }
    return (<>

        <Box m="20px">
            {/* HEADER */}
            <Box
                textAlign="center"
                my="10px"
            >
                <Header title="Machine Profile" />
            </Box>



            {/* Grid */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(6, 1fr)"
                gridTemplateRows="140px"
                gap="20px"
            >

                {/* Machine_images */}
                <Box
                    display="flex"
                    overflow="auto"
                    whiteSpace="nowrap"
                    gridColumn="span 6"
                    gridRow="span 3"
                >
                    <Machine
                        status={(machine1Readings.Machine_Status === '1') ? "Online" : "Offline"}
                        color={(machine1Readings.Machine_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine1Readings))}
                        color_1 = {(machine1Readings.Sensor_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine1Readings))}
                        id="Machine_1"
                        to="Machine"
                    />
                    <Machine
                        status={(machine2Readings.Machine_Status === '1') ? "Online" : "Offline"}
                        color={(machine2Readings.Machine_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine2Readings))}
                        color_1 = {(machine2Readings.Sensor_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine2Readings))}
                        id="Machine_2"
                        to="Machine"
                    />
                    <Machine
                      status={(machine3Readings.Machine_Status === '1') ? "Online" : "Offline"}
                        color={(machine3Readings.Machine_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine3Readings))}
                        color_1 = {(machine3Readings.Sensor_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine3Readings))}
                        id="Machine_3"
                        to="Machine"
                    />
                    <Machine
                        status={(machine4Readings.Machine_Status === '1') ? "Online" : "Offline"}
                        color={(machine4Readings.Machine_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine4Readings))}
                        color_1 = {(machine4Readings.Sensor_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine4Readings))}
                        id="Machine_4"
                        to="Machine"
                    />
                    <Machine
                       status={(machine5Readings.Machine_Status === '1') ? "Online" : "Offline"}
                        color={(machine5Readings.Machine_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine5Readings))}
                        color_1 = {(machine5Readings.Sensor_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine5Readings))}
                        id="Machine_5"
                        to="Machine"
                    />
                    <Machine
                        status={(machine6Readings.Machine_Status === '1') ? "Online" : "Offline"}
                        color={(machine6Readings.Machine_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine6Readings))}
                        color_1 = {(machine6Readings.Sensor_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine6Readings))}
                        id="Machine_6"
                        to="Machine"
                    />
                    <Machine
                        status={(machine7Readings.Machine_Status === '1') ? "Online" : "Offline"}
                        color={(machine7Readings.Machine_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine7Readings))}
                        color_1 = {(machine7Readings.Sensor_Status === '0') ? (colors.grey[500]) : (checkIfErrorHappened(machine7Readings))}
                        id="Machine_7"
                        to="Machine"
                    />
                </Box>


                {/* Machine Info  */}
                <Box
                    gridColumn="span 6"
                    id="Machine"
                >
                    <Machineinfo
                    machine_status = {(Machine_Status === '1')? "Online" : "Offline"}
                    sensor_status = {(Sensor_Status === '1')? "Online" : "Offline"}
                    
                    />
                </Box>
            </Box>
        </Box>
    </>
    );
};

export default Machine_Profile2;