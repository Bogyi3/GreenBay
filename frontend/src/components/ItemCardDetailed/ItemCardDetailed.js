import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import generalFetch from '../../utilities/generalFetch';
import { getSingle } from '../../actions/selectItemAction';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    padding: '1rem',
    display: 'flex',
    flexFlow: 'column',
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      margin: '0 auto',
      marginTop: '2rem',
    },
  },
  imgContainer: {
    padding: '0.5rem',
    display: 'flex',
    height: '15rem',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #49d290',
    borderRadius: '0.25rem',
  },
  cardMedia: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  cardText: {
    width: '100%',
    paddingTop: '1rem',
    display: 'flex',
    flexFlow: 'column',
    color: '#333333',
  },
  nameAndPrice: {
    width: '100%',
    display: 'flex',
    padding: '0 1rem',
  },
  itemName: {
    flexGrow: 1,
    fontSize: '1.5rem',
  },
  itemPrice: {
    fontSize: '1.5rem',
  },
  description: {
    fontSize: '1.125rem',
    padding: '1rem',
  },
  sellerAndBuy: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1rem',
  },
  seller: {
    fontSize: '1.25rem',
    flexGrow: 1,
  },
  buyer: {
    fontSize: '1.25rem',
    paddingRight: '1rem',
  },
}));

function ItemCardDetailed({
  itemImg,
  itemName,
  price,
  description,
  seller,
  id = undefined,
  buyer = undefined,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [buyId, setBuyId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector((state) => state.login.token);
  const username = useSelector((state) => state.login.username);

  useEffect(() => {
    if (buyId !== '') {
      // eslint-disable-next-line no-shadow
      const buyItem = async (buyId, username) => {
        try {
          const boughtItemData = await generalFetch('transaction', 'PUT', {
            itemId: buyId,
            buyer: username,
          }, token);
          if (boughtItemData.response.message) {
            setErrorMessage(boughtItemData.response.message);
          }
          if (boughtItemData.status === 200) {
            dispatch(getSingle(buyId, token));
          }
          return boughtItemData;
        } catch (error) {
          setErrorMessage(error.message);
          return null;
        }
      };
      buyItem(buyId, username);
    }
  }, [buyId]);

  return (
    <Card className={classes.root}>
      <div className="errorMessage">{errorMessage}</div>
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
        <div className={classes.nameAndPrice}>
          <Typography color="primary" className={classes.itemName}>
            {itemName}
          </Typography>
          <Typography className={classes.itemPrice}>
            {`$${price}`}
          </Typography>
        </div>
        <Typography className={classes.description}>
          {description}
        </Typography>
        <div className={classes.sellerAndBuy}>
          <Typography className={classes.seller}>
            {`Seller: ${seller}`}
          </Typography>
          {!buyer && <Button onClick={() => { setBuyId(id); }} id={id} size="medium" variant="contained" color="primary">BUY ITEM</Button>}
          {buyer && <Typography className={classes.buyer}>{`Buyer: ${buyer}`}</Typography>}
        </div>
      </div>
    </Card>
  );
}

ItemCardDetailed.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemImg: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.number.isRequired,
  seller: PropTypes.number.isRequired,
};

export default ItemCardDetailed;
