import React from "react";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import { withStyles } from "@material-ui/core";

function PagePicker(props) {

  const { limit, page, total, handleQueryChange, classes } = props;
  return (
      <Pagination
      className = {classes.pagination}
        showQuickJumper
        hideOnSinglePage={true}
        pageSize={limit}
        currrent={page}
        onChange={handleQueryChange}
        total={total}
        locale={localeInfo}
      />
  );
}

const styles = theme => ({
  pagination: {
    display: "flex",
    justifyContent: "center"
  }
})

export default withStyles(styles)(PagePicker);