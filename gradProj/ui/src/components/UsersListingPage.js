import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
import PagePicker from "./Pagination";
import UsersList from "./UsersList";
import UsersFiltersContainer from "../containers/UsersFiltersContainer";

class Users extends Component {
  componentDidMount() {
    this.props.loadCustomers(this.props.search);
  }

  handleQueryChange = current => {
    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersCompanies({
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
        <div className={classes.listAndFilters}>
          <UsersFiltersContainer />
          <div className={classes.sortAndList}>
            <List className={classes.list}>
              {this.props.users ? (
                <UsersList
                  users={this.props.users}
                  role={this.props.role}
                />
              ) : null}
            </List>
          </div>
        </div>
        <PagePicker
          page={page}
          limit={limit}
          total={total}
          handleQueryChange={this.handleQueryChange}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    [theme.breakpoints.up(660)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.down(660)]: {
      marginLeft: theme.spacing.unit *8,
      marginRight: theme.spacing.unit
    }
  },
  list: {
    width: "100%",
    paddingTop: 0
  },
  sortAndList: {
    width: "100%"
  }
});

export default withStyles(styles)(Users);
