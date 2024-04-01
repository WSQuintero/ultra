import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

function FormRow({ title, description, labelWidth, children }) {
  return (
    <Grid display="flex" padding={2} flexWrap="wrap" gap={2}>
      <Grid
        display="flex"
        flexDirection="column"
        sx={(t) => ({
          width: (labelWidth||"40%"),
          [t.breakpoints.down("md")]: {
            width: "100%",
          },
        })}
      >
        <Typography variant="h2" fontSize={18} fontWeight={700} color="primary">
          {title}
        </Typography>
        {description && <Typography>{description}</Typography>}
      </Grid>
      <Grid flexGrow={1}>{children}</Grid>
    </Grid>
  );
}

FormRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FormRow;
