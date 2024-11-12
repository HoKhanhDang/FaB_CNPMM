import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import * as React from "react";
import { stepperList } from "./stepper.constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface StepperComponentProps {
    status?: string;
}

const StepperComponents: React.FC<StepperComponentProps> = ({ status }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div className="w-full p-5 bg-white border p-5 rounded-md">
            <Box sx={{ width: "100%" }}>
                <Stepper
                    activeStep={stepperList.findIndex((item) => item.label === status)}
                    alternativeLabel={!isMobile}
                    orientation={isMobile ? "vertical" : "horizontal"}
                >
                    {stepperList.map((item, index) => {
                        const labelProps: {
                            optional?: React.ReactNode;
                            error?: boolean;
                        } = {
                            error:
                                stepperList.findIndex(
                                    (item) => item.label === status
                                ) === 4 &&
                                stepperList.findIndex(
                                    (item) => item.label === status
                                ) === index
                                    ? true
                                    : false,
                        };

                        return (
                            <Step key={item.label}>
                                <StepLabel {...labelProps}>
                                    {item.label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>
        </div>
    );
};

export default StepperComponents;
