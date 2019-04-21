import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

function CompanyCard(props) {
  const { classes, company } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image="https://www.allbusiness.com/asset/2018/01/Janitors.jpg"
        title="Live from space album cover"
      />
      <div className={classes.contentWrap}>        
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {company.companyName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className={classes.nonDispalyed}>
          {company.description}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          City: {company.location}
        </Typography>
      </CardContent>
      <Grid className={classes.grid}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={classes.rating}
        >
          <span className="stars stars--large">
            <span style={{ width: `${(company.rating / 5.3) * 100}%` }} />
          </span>

          {company.rating}
        </Typography>
        <CardActions className={classes.cardAction}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            component={Link}
            to={{
              pathname: `/companies/${props.id}`
            }}
          >
            <b>view</b>
          </Button>
        </CardActions>
      </Grid>
      
      </div>
    </Card>
  );
}

const styles = theme => ({
  cover: {
    width: 151,
    [theme.breakpoints.down(660)]: {
      display: "none"
    }
  },
  grid: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  contentWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  nonDispalyed: {
    [theme.breakpoints.down(660)]: {
      display: "none"
    }
  },
  content: {
    maxWidth: "60%",
    overflowX: "hidden"
  },
  card: {
    display: "flex",
    textAlign: "left",
    
    marginBottom: theme.spacing.unit * 2,
    height: theme.spacing.unit * 20
  }
});

export default withStyles(styles)(CompanyCard);
