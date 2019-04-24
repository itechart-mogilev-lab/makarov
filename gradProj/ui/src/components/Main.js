import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MainPageCompaniesContainer from "../containers/MainPageCompaniesContainer";
import FilterContainer from "../containers/FilterContainer";
import Footer from "./Footer";

const styles = theme => ({
  layout: {
    width: "auto",
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },
  mainFeaturedPost: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
    backgroundImage: `url("https://scontent-frt3-2.xx.fbcdn.net/v/t1.0-9/56644817_852405828425930_6185508017325211648_o.jpg?_nc_cat=102&_nc_ht=scontent-frt3-2.xx&oh=17ba82f556ba2460aee63dae96feaa6b&oe=5D3556EE")`,
    backgroundSize: "cover",
    [theme.breakpoints.down(660)]: {
      margin: 4
    }
  },
  mainFeaturedPostContent: {
    [theme.breakpoints.down(660)]: {
      padding: 8
    },
    padding: `${theme.spacing.unit * 6}px`
  },
  subtitle: {
    [theme.breakpoints.down(660)]: {
      display: "none"
    }
  },
  onOpac: {
    opacity: 1
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    display: "flex",
    height: 200,
    [theme.breakpoints.down(660)]: {
      margin: 4
    }
  },
  cardDetails: {
    flex: 1,
    overflow: "auto"
  },
  cardMedia: {
    width: theme.spacing.unit * 20,
    height: theme.spacing.unit * 20,
    margin: theme.spacing.unit
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    marginBottom: 20,
    [theme.breakpoints.up(960)]: {
      marginRight: 40
    },
    boxShadow: `0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)`,
    [theme.breakpoints.down(660)]: {
      margin: 4,
      marginBottom: 20
    }
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3
  },
  listOfFilters: {
    listStyleType: "none",
    paddingLeft: 0
  },
  mainForm: {
    marginLeft: theme.spacing.unit * 8,
    [theme.breakpoints.down(660)]: {
      marginLeft: "57px"
    },
    marginTop: theme.spacing.unit * 2
  }
});

function Blog(props) {
  const { classes } = props;

  return (
    <div className={classes.mainForm}>
      <CssBaseline />
      <div className={classes.layout}>
        <main>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item md={"auto"}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                    className={classes.noOpac}
                  >
                    Welcome to Cleaning Services app
                  </Typography>
                  <Typography
                    variant="h5"
                    color="inherit"
                    paragraph
                    className={classes.subtitle}
                  >
                    Multiple lines of text that form the lede, informing new
                    readers quickly and efficiently about what&apos;s most
                    interesting in this post&apos;s contents…
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <Grid container className={classes.mainGrid}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                  Filters
                </Typography>
                <Typography>
                  By using the our application you’re confirming that you’re
                  happy to accept our terms of use.
                </Typography>
                <FilterContainer />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <MainPageCompaniesContainer />
            </Grid>
          </Grid>
        </main>
      </div>
      <Footer />
    </div>
  );
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Blog);
