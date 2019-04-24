import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Paper,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import ReviewsPageContainer from "../containers/ReviewsPageContainer"

class CompanyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openBlock: false,
      openReview: false,
      banReason: "",
      rating: 0,
      comment: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadCompany(id);
  }

  handleClickOpenBlockDialog = () => {
    this.setState({ openBlock: true });
  };

  handleClickOpenReviewDialog = () => {
    this.setState({ openReview: true });
  };

  handleCloseBlockDialog = () => {
    this.setState({ openBlock: false });
  };

  handleCloseReviewDialog = () => {
    this.setState({ openReview: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBlockCompany = () => {
    this.props.blockCompany({
      companyId: this.props.company._id,
      banReason: this.state.banReason
    });
    this.handleClose();
  };

  handleUnblockCompany = () => {
    this.props.unblockCompany({
      companyId: this.props.company._id
    });
  };

  handleReviewCompany = () => {
    this.props.reviewCompany({
      rating: this.state.rating,
      comment: this.state.comment,
      companyId: this.props.company._id
    });
    this.handleCloseReviewDialog();
  };

  handleClickOrder = () => {
    const { _id, workingDays, typesOfCleaning, location } = this.props.company;
    this.props.chooseCompany(_id, workingDays, typesOfCleaning, location);
  };

  render() {
    const { classes, company, toc } = this.props;
    if (company.companyName) {
      return (
        <div className={classes.root}>
          <Paper className={classes.main}>
            <div className={classes.AvatarAndEdit}>
              <Typography>
                <b>{company.companyName.toUpperCase()}</b>
              </Typography>
              <Avatar
                alt="Avatar"
                src="https://pp.userapi.com/c633823/v633823597/35168/2nFUBN3UBqI.jpg"
                className={classes.bigAvatar}
              />
            </div>
            <div className={classes.buttonsBlock}>
              {this.props.role !== "company" ? (
                <Button
                  onClick={this.handleClickOrder}
                  color="primary"
                  className={classes.button}
                >
                  <b>Book cleaning</b>
                </Button>
              ) : null}
              {this.props.role === "user" ||
              (this.props.role === "admin" && !company.isBlocked) ? (
                <Button
                  onClick={this.handleClickOpenReviewDialog}
                  name="openReview"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  <b>Review company</b>
                </Button>
              ) : null}
              {this.props.role === "admin" && !company.isBanned ? (
                <Button
                  onClick={this.handleClickOpenBlockDialog}
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                >
                  <b>block company</b>
                </Button>
              ) : null}
              {this.props.role === "admin" && company.isBanned === true ? (
                <>
                  <span>Blocked, reason: {company.banReason}</span>
                  <Button
                    onClick={this.handleUnblockCompany}
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    <b>unblock company</b>
                  </Button>
                </>
              ) : null}
            </div>
            <Dialog
              open={this.state.openBlock}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Ban</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={this.state.banReason}
                  onChange={this.handleChangeReason}
                  label="Reason"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseBlockDialog}>Back</Button>
                <Button
                  onClick={this.handleBlockCompany}
                  variant="outlined"
                  color="secondary"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.openReview}
              onClose={this.handleCloseReviewDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Review company</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  name="rating"
                  value={this.state.rating}
                  onChange={this.handleChange}
                  label="Rating(between 0 and 5)"
                  fullWidth
                />
                <TextField
                  autoFocus
                  name="comment"
                  value={this.state.comment}
                  onChange={this.handleChange}
                  label="Comment"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseReviewDialog}>Back</Button>
                <Button
                  onClick={this.handleReviewCompany}
                  variant="outlined"
                  color="secondary"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            <h4 className={classes.divider}>
              <span>INFORMATION</span>
            </h4>
            <div className={classes.profileInfo}>
              <Typography>
                <b>Phone number:</b> {company.phone}
              </Typography>
              <Typography>
                <b>City:</b> {company.location}
              </Typography>
              <Typography>
                <b>Company name:</b> {company.companyName}
              </Typography>
              <Typography>
                <b>Description:</b> {company.description}
              </Typography>
              <h4 className={classes.divider}>
                <span>PRICING</span>
              </h4>
              <Typography>
                <b>Standart small room:</b> {toc.standart.standartSmallRoom}
              </Typography>
              <Typography>
                <b>Standart big room:</b> {toc.standart.standartBigRoom}
              </Typography>
              <Typography>
                <b>Standart bathroom:</b> {toc.standart.standartBathRoom}
              </Typography>
              <Typography>
                <b>General small room:</b> {toc.general.generalSmallRoom}
              </Typography>
              <Typography>
                <b>General big room:</b> {toc.general.generalBigRoom}
              </Typography>
              <Typography>
                <b>General bathroom:</b> {toc.general.generalBathRoom}
              </Typography>
              <Typography>
                <b>After repair small room:</b>{" "}
                {toc.afterRepair.afterRepairSmallRoom}
              </Typography>
              <Typography>
                <b>After repair big room:</b>{" "}
                {toc.afterRepair.afterRepairBigRoom}
              </Typography>
              <Typography>
                <b>After repair bathroom:</b>{" "}
                {toc.afterRepair.afterRepairBathRoom}
              </Typography>
              <Typography>
                <b>Carpet small:</b> {toc.carpet.smallCarpet}
              </Typography>
              <Typography>
                <b>Carpet big:</b> {toc.carpet.bigCarpet}
              </Typography>
              <Typography>
                <b>Office:</b> {toc.office}
              </Typography>
              <Typography>
                <b>Furniture:</b> {toc.furniture}
              </Typography>
              <Typography>
                <b>Industrial:</b> {toc.industrial}
              </Typography>
              <Typography>
                <b>Pool:</b> {toc.pool}
              </Typography>
            </div>
            <div>
              <ReviewsPageContainer id={this.props.match.params.id} />
            </div>
          </Paper>
        </div>
      );
    } else {
      return <p>Company not found</p>;
    }
  }
}

const styles = theme => ({
  root: {
    padding: 25,
    marginLeft: theme.spacing.unit * 8,
    [theme.breakpoints.down(660)]: {
      marginLeft: "57px"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonsBlock: {
    display: "flex",
    flexDirection: "column"
  },
  main: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down(660)]: {
      width: "auto"
    },
    width: 500,
  },
  button: {},
  bigAvatar: {
    width: 160,
    height: 160
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
    alignItems: "center"
  },
  AvatarAndInfo: {
    display: "flex"
  }
});

export default withStyles(styles)(CompanyPage);
