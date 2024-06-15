import { styled, Paper } from "@mui/material";

export const DataItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
}));
