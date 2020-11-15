import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '90vw',
    display: 'flex',
    padding: '1rem',
  },
  imgContainer: {
    display: 'flex',
    height: '10rem',
    width: '45vw',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMedia: {
    objectFit: 'contain',
  },
  cardText: {
    width: '45vw',
    paddingLeft: '1rem',
    display: 'flex',
    flexFlow: 'column',
  },
  itemName: {
    fontSize: '1.25rem',
    paddingBottom: '0.5rem',
  },
  itemPrice: {
    fontSize: '1.5rem',
    flexGrow: 1,
    color: '#333333',
  },
  buttonContainer: {
    display: 'flex',
    flexFlow: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
});

function ItemCard({ itemImg, itemName, price }) {
  const classes = useStyles();

  return (
    <div className="itemCard">
      <Card className={classes.root}>
        <div className={classes.imgContainer}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            height="140"
            alt={itemName}
            image={itemImg}
          />
        </div>
        <div className={classes.cardText}>
          <Typography color="primary" className={classes.itemName}>
            {itemName}
          </Typography>
          <Typography className={classes.itemPrice}>
            {`$${price}`}
          </Typography>
          <div className={classes.buttonContainer}>
            <Button size="small" variant="outlined" color="primary">Check it out</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

ItemCard.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemImg: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ItemCard;
