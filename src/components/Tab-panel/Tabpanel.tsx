import { Box } from "@mui/material";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div className={"mt-10"}>{children}</div>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
