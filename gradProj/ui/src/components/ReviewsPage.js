import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles, Button, Paper } from "@material-ui/core";
import ReviewsList from "./ReviewList";

class ReviewsPage extends Component {
  componentDidMount() {
    const { id } = this.props;
    if (!this.props.reviews.docs) {
      this.props.loadReviews({ page: 1, companyId: id });
    }
  }

  handleLoadMore = () => {
    const { id } = this.props;
    this.props.loadMoreReviews({ page: this.props.page + 1, companyId: id });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <List className={classes.list}>
          {this.props.reviews ? (
            <ReviewsList reviews={this.props.reviews} />
          ) : null}
        </List>
        {this.props.total > this.props.limit * this.props.page ? (
          <Button
            onClick={this.handleLoadMore}
            variant="outlined"
            color="primary"
          >
            Load more
          </Button>
        ) : null}
      </Paper>
    );
  }
}

const styles = theme => ({
  root: {
    marginTop: 20,
    padding: 25,
    paddingTop: 8,
    [theme.breakpoints.down(660)]: {
      padding: 0
    }
  },
  listAndFilters: {
    display: "flex",
    justifyContent: "space-between"
  },
  list: {
    width: "100%",
    paddingTop: 0
  },
  inline: {
    display: "inline"
  },
  sortAndList: {
    width: "100%"
  }
});

export default withStyles(styles)(ReviewsPage);
