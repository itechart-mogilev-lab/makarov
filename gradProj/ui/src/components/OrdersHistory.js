import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles, Paper } from "@material-ui/core";
import PagePicker from "./Pagination";
import OrdersHistoryList from "./OrdersHistoryList";
import OrderFiltersContainer from "../containers/OrderFiltersContainer";
import OrdersSortContainer from "../containers/OrdersSortContainer";

class OrdersHistory extends Component {
  componentDidMount() {
    this.props.loadBookings(this.props.search);
  }

  handleQueryChange = current => {
    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersBookings({
      query,
      name: "page",
      value: current,
      path
    });
  };

  render() {
    const { classes, page, limit, total } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.sortAndList}>
          <OrderFiltersContainer />
          <OrdersSortContainer />
          <List className={classes.list}>
            {this.props.bookings ? (
              <OrdersHistoryList bookings={this.props.bookings} />
            ) : null}
          </List>
          <PagePicker
            page={page}
            limit={limit}
            total={total}
            handleQueryChange={this.handleQueryChange}
          />
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 20,
    marginLeft: 84,
    padding: 25,
    paddingTop: 8,
    [theme.breakpoints.down(660)]: {
      width: "auto",
      padding: 0,
      margin: 0,
      marginLeft: 57
    }
  },
  listAndFilters: {
    display: "flex",
    justifyContent: "space-between"
  },
  list: {
    width: "auto",
    paddingTop: 0
  },
  inline: {
    display: "inline"
  },
  sortAndList: {
    [theme.breakpoints.down(660)]: {
      width: "auto"
    }
  }
});

export default withStyles(styles)(OrdersHistory);
