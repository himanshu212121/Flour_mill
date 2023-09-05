import { Box, Typography, useTheme, Skeleton } from "@mui/material";
import { tokens } from "../../theme";
import { React } from "react";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import Header from "../../components/Header";
import StatBox2 from "../../components/StatBox2";
import { useDataState } from "../../context/SheetContext2";

const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {  Moisture,
     count_50,
     count_30,
     count_26,
     count_20,
     count_15,
     count_10,
     count_5, } = useDataState();

    if (!Moisture) {
        return (
            <Box my="30px" mx="20px" display="grid" gap="10px">
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rectangular" height="40vh" />
                <Skeleton variant="rounded" height="30vh" />
            </Box>
        );
    }

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Home" />
            </Box>


            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                gridTemplateRows="repeat(3, 1fr)"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <Box width="100%" py="20px" m="0px 20px" height='100%'>
                        <Box>
                            <Box>
                                <BusinessOutlinedIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    fontSize="5rem"
                                    fontWeight="bold"
                                    sx={{ color: colors.grey[100] }}
                                >
                                    {((5*count_5)+ (10*count_10)+ (15*count_15)+ (20*count_20)+ (26*count_26)+ (30*count_30)+ (50*count_50))+ "Kg"}
                                </Typography>
                            </Box>
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="h3" sx={{ color: colors.greenAccent[500] }}>
                                Production
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <Box width="100%" py="20px" m="0px 20px" height='100%'>
                        <Box>
                            <Box>
                                <TrendingDownOutlinedIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    fontSize="5rem"
                                    fontWeight="bold"
                                    sx={{ color: colors.grey[100] }}
                                >
                                    {Moisture/10 + "%"}
                                </Typography>
                            </Box>
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="h3" sx={{ color: colors.greenAccent[500] }}>
                                Moisture
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={count_5}
                        subtitle="5 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={count_10}
                        subtitle="10 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={count_15}
                        subtitle="15 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={count_20}
                        subtitle="20 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={count_26}
                        subtitle="26 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={count_30}
                        subtitle="30 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={count_50}
                        subtitle="50 kg"
                    />
                </Box>

            </Box>
        </Box>
    );
};

export default Home;
