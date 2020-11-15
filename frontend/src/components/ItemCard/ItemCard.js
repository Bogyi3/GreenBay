import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { selectItemAction } from '../../actions/selectItemAction';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    padding: '1rem',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  imgContainer: {
    display: 'flex',
    height: '10rem',
    width: '45vw',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #49d290',
    borderRadius: '0.25rem',
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
}));

function ItemCard({
  itemImg, itemName, price, id,
}) {
  const dispatch = useDispatch();
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
            <Button onClick={() => { dispatch(selectItemAction(id)); }} className="selectItem" id={id} size="small" variant="outlined" color="primary">Check it out</Button>
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
