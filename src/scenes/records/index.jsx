import { Box, Skeleton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";                                                                    
import { useDataState } from '../../context/SheetContext2';

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
     machine1Readings,
     machine2Readings,
     machine3Readings,
     machine4Readings,
     machine5Readings,
     machine6Readings,
     machine7Readings
  } = useDataState();
  
 
  const machines = [
    { machineName: 'Machine 1', readings: machine1Readings },
    { machineName: 'Machine 2', readings: machine2Readings },
    { machineName: 'Machine 3', readings: machine3Readings },
    { machineName: 'Machine 4', readings: machine4Readings },
    { machineName: 'Machine 5', readings: machine5Readings },
    { machineName: 'Machine 6', readings: machine6Readings },
    { machineName: 'Machine 7', readings: machine7Readings },
  ];

  const transformedRows = machines.map((machine) => ({
    id: machine.machineName,
    Machine_Status:
    machine.readings?.Machine_Status,
    Sensor_Status: machine.readings?.Sensor_Status,
  }));


  const columns = [
    { field: "id", headerName: "Name", flex: 1 },
    { field: "Machine_Status", headerName: "Machine_Status", flex:1 },
    {
      field: "Sensor_Status",
      headerName: "Sensor_Status",
      flex: 1,
    },
]
  if ( !machine1Readings || !machine2Readings || !machine3Readings || !machine4Readings || !machine5Readings || !machine6Readings || !machine7Readings) {
    return (
        <Box my="30px" mx="20px" display="grid" gap="10px" overflow="hidden">
            <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
            <Skeleton  variant="rounded" height="60vh" />
        </Box>
    );
}

  
  return (
    <Box m="20px"
    >
      <Header
        title="Records"
      />
      <Box
        m="40px 0 0 0"
        height='75vh'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={transformedRows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Records;
