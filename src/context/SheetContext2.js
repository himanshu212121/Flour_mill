import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";

const DataStateContext = createContext();

export function useDataState() {
  return useContext(DataStateContext);
}

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("Machine_1");
  const [count_5, setCount_5] = useState(parseInt(localStorage.getItem('count_5')) || 0);
  const [count_10, setCount_10] = useState(parseInt(localStorage.getItem('count_10')) || 0);
  const [count_15, setCount_15] = useState(parseInt(localStorage.getItem('count_15')) || 0);
  const [count_20, setCount_20] = useState(parseInt(localStorage.getItem('count_20')) || 0);
  const [count_26, setCount_26] = useState(parseInt(localStorage.getItem('count_26')) || 0);
  const [count_30, setCount_30] = useState(parseInt(localStorage.getItem('count_30')) || 0);
  const [count_50, setCount_50] = useState(parseInt(localStorage.getItem('count_50')) || 0);

  let previousLoadCell = null;

  const SPREADSHEET_ID = "13BMrPhT_EHGZ1_uppf_RrLT6AX8p97iKVWwNcQe4Y1c";
  const API_KEY = "AIzaSyAYaSFnK5ONT1vk_TcqJiESvy-sHrD0IR0";
  const Sheet_Name = "Sheet1";
  const POLL_INTERVAL = 5000;

  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${Sheet_Name}?key=${API_KEY}`
      );
      const rows = response.data.values;

      const headerRow = rows[0];

      const dataObjects = rows.slice(1).map((row) => {
        const dataObject = {};
        headerRow.forEach((header, index) => {
          dataObject[header] = row[index];
        });
        return dataObject;
      });

      const LoadCell = getValueByConditions(
        dataObjects,
        "LD1252M1",
        "Modbus",
        "12",
        "3",
        "0"
      );
      if (previousLoadCell !== null) {
        const diff = LoadCell - previousLoadCell;
        if (4 <= diff && diff <= 6) {
          setCount_5(previousCount => {
            const newCount = previousCount + 1;
            localStorage.setItem('count_5', newCount);
            return newCount;
          });
        }
        if (9 <= diff && diff <= 11) {
          setCount_10(previousCount => {
            const newCount = previousCount + 1;
            localStorage.setItem('count_10', newCount); 
            return newCount;
          });
        }
        if (14 <= diff && diff <= 16) {
          setCount_15(previousCount => {
            const newCount = previousCount + 1;
            localStorage.setItem('count_15', newCount); 
            return newCount;
          });
        }
        if (19 <= diff && diff <= 21) {
          setCount_20(previousCount => {
            const newCount = previousCount + 1;
            localStorage.setItem('count_20', newCount); 
            return newCount;
          });
        }
        if (24 <= diff && diff <= 27) {
          setCount_26(previousCount => {
            const newCount = previousCount + 1;
            localStorage.setItem('count_26', newCount); 
            return newCount;
          });
        }
        if (29 <= diff && diff <= 31) {
          setCount_30(previousCount => {
            const newCount = previousCount + 1;
            localStorage.setItem('count_30', newCount); 
            return newCount;
          });
        }
        if (49 <= diff && diff <= 51) {
          setCount_50(previousCount => {
            const newCount = previousCount + 1;
            localStorage.setItem('count_50', newCount); 
            return newCount;
          });
        }
      }
      previousLoadCell = LoadCell;

      if (data)
        if (!isEqual(data, dataObjects)) {
          setData(dataObjects);
        }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Function to compare two arrays
  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].join(",") !== arr2[i].join(",")) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, POLL_INTERVAL);
    const storedCount5 = localStorage.getItem('count_5');
    if (storedCount5 !== null) {
      setCount_5(parseInt(storedCount5));
    }
    const storedCount10 = localStorage.getItem('count_10');
    if (storedCount10 !== null) {
      setCount_10(parseInt(storedCount10));
    }
    const storedCount15 = localStorage.getItem('count_15');
    if (storedCount15 !== null) {
      setCount_15(parseInt(storedCount15));
    }
    const storedCount20 = localStorage.getItem('count_20');
    if (storedCount20 !== null) {
      setCount_20(parseInt(storedCount20));
    }
    const storedCount26 = localStorage.getItem('count_26');
    if (storedCount26 !== null) {
      setCount_26(parseInt(storedCount26));
    }
    const storedCount30 = localStorage.getItem('count_30');
    if (storedCount30 !== null) {
      setCount_30(parseInt(storedCount30));
    }
    const storedCount50 = localStorage.getItem('count_50');
    if (storedCount50 !== null) {
      setCount_50(parseInt(storedCount50));
    }
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  

  function getValueByConditions(
    data,
    deviceName,
    protocol,
    slaveId,
    functionCode,
    registerAddress
  ) {
    const filteredData = data.filter(
      (item) =>
        item.Device === deviceName &&
        item.Protocol === protocol &&
        item.SlaveId === slaveId &&
        item.FunctionCode === functionCode &&
        item.Address === registerAddress
    );
    if (filteredData.length > 0) {
      return filteredData[0].Value;
    } else {
      return null;
    }
  }

  const Production = getValueByConditions(
    data,
    "LD1252M1",
    "Modbus",
    "12",
    "3",
    "0"
  );
  const Moisture = getValueByConditions(
    data,
    "MHT9612M",
    "Modbus",
    "7",
    "3",
    "1"
  );

  const machine1Readings = {
    Name: "Machine_1",
    Machine_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "13"),
    Sensor_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "32"),
  };

  const machine2Readings = {
    Name: "Machine_2",
    Machine_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "15"),
    Sensor_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "33"),
  };

  const machine3Readings = {
    Name: "Machine_3",
    Machine_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "16"),
    Sensor_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "35"),
  };

  const machine4Readings = {
    Name: "Machine_4",
    Machine_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "18"),
    Sensor_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "36"),
  };

  const machine5Readings = {
    Name: "Machine_5",
    Machine_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "22"),
    Sensor_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "37"),
  };

  const machine6Readings = {
    Name: "Machine_6",
    Machine_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "29"),
    Sensor_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "38"),
  };

  const machine7Readings = {
    Name: "Machine_7",
    Machine_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "31"),
    Sensor_Status: getValueByConditions(data, "Relay", "GPIO", "", "", "40"),
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

  const handleMachineSelect = (machineName) => {
    setSelectedMachine(machineName);
  };

  const selectedMachineReadings = useMemo(() => {
    if (selectedMachine in machineReadingsMap) {
      return machineReadingsMap[selectedMachine];
    }
    return null;
  }, [selectedMachine]);
  return (
    <DataStateContext.Provider
      value={{
        data,
        machine1Readings,
        machine2Readings,
        machine3Readings,
        machine4Readings,
        machine5Readings,
        machine6Readings,
        machine7Readings,
        handleMachineSelect,
        selectedMachineReadings,
        selectedMachine,
        Moisture,
        Production,
        count_50,
        count_30,
        count_26,
        count_20,
        count_15,
        count_10,
        count_5,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
}
