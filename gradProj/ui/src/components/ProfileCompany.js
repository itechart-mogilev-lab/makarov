import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, Avatar } from "@material-ui/core";
import EditContainer from "../containers/EditContainer";
import Footer from "./Footer";
import { Button } from "@material-ui/core";

function CompanyProfile(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
    
      <Paper className={classes.main}>
        <div className={classes.AvatarAndEdit}>
          <Typography>
            <b>{props.username.toUpperCase()}</b>
          </Typography>
          <Avatar
            alt="Avatar"
            src="https://pp.userapi.com/c633823/v633823597/35168/2nFUBN3UBqI.jpg"
            className={classes.bigAvatar}
          />
          <Typography>{props.role.toUpperCase()}</Typography>
        </div>
        {props.role !== "company" ? (
          <Button
            onClick={this.handleClickOrder}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <b>Book cleaning</b>
          </Button>
        ) : null}
        <h4 className={classes.divider}>
          <span>INFORMATION</span>
        </h4>
        <div className={classes.profileInfo}>
          <Typography>
            <b>Phone number:</b> {props.phone}
          </Typography>
          <Typography>
            <b>City:</b> {props.location}
          </Typography>
          <Typography>
            <b>Company name:</b> {props.companyName}
          </Typography>
          <Typography>
            <b>Description:</b> {props.description}
          </Typography>
          <Typography>
            <b>TypesOfCleaning</b>
          </Typography>
          <Typography>
            <b>Standart small room:</b> {props.standartSmallRoom}
          </Typography>
          <Typography>
            <b>Standart big room:</b> {props.standartBigRoom}
          </Typography>
          <Typography>
            <b>Standart bathroom:</b> {props.standartBathRoom}
          </Typography>
          <Typography>
            <b>General small room:</b> {props.generalSmallRoom}
          </Typography>
          <Typography>
            <b>General big room:</b> {props.generalBigRoom}
          </Typography>
          <Typography>
            <b>General bathroom:</b> {props.generalBathRoom}
          </Typography>
          <Typography>
            <b>After repair small room:</b> {props.afterRepairSmallRoom}
          </Typography>
          <Typography>
            <b>After repair big room:</b> {props.afterRepairBigRoom}
          </Typography>
          <Typography>
            <b>After repair bathroom:</b> {props.afterRepairBathRoom}
          </Typography>
          <Typography>
            <b>Carpet small:</b> {props.smallCarpet}
          </Typography>
          <Typography>
            <b>Carpet big:</b> {props.bigCarpet}
          </Typography>
          <Typography>
            <b>Office:</b> {props.office}
          </Typography>
          <Typography>
            <b>Furniture:</b> {props.furniture}
          </Typography>
          <Typography>
            <b>Industrial:</b> {props.industrial}
          </Typography>
          <Typography>
            <b>Pool:</b> {props.pool}
          </Typography>
        </div>
        <h4 className={classes.divider}>
          <span>EDIT YOUR INFO</span>
        </h4>
        <EditContainer />
      </Paper>
      <Footer />
    </div>
  );
}

const styles = theme => ({
  root: {
    marginTop: 20,
    marginLeft: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  main: {
    padding: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  divider: {
    marginTop: theme.spacing.unit * 3
  },
  bigAvatar: {
    width: 160,
    height: 160
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  AvatarAndUsername: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 15,
    paddingBottom: 15,
    paddingRight: 15
  },
  AvatarAndEdit: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit,
    alignItems: "center"
  },
  editButton: {
    marginTop: 10,
    width: "100%",
    fontWeight: "bold"
  },
  AvatarAndInfo: {
    display: "flex"
  }
});

export default withStyles(styles)(CompanyProfile);
