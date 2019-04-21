import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

function Footer(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Social media
      </Typography>
      <Typography>Footer</Typography>
    </footer>
  );
}

const styles = theme => ({
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 2}px 0`,
    [theme.breakpoints.down(660)]: {
      marginTop: theme.spacing.unit *2,
    }
  }
});

export default withStyles(styles)(Footer);
