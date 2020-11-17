import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ItemCardDetailed from '../../components/ItemCardDetailed/ItemCardDetailed';
import './SingleItemPage.css';

function SingleItemPage() {
  const selected = useSelector((state) => state.selectedItem.selectedItem);
  const token = useSelector((state) => state.login.token);
  const errorMessage = useSelector((state) => state.selectedItem.errorMessage);

  return (
    <div className="singleItemPage page">
      {!selected.itemName || !token || errorMessage
        ? <div className="singleItemErrorMessage">{ errorMessage || 'Something went wrong. Please, sign in or try again later.'}</div>
        : (
          <div className="itemAndButtonContainer">
            <ItemCardDetailed
              itemName={selected.itemName}
              price={selected.price}
              description={selected.description}
              itemImg={selected.itemImg}
              seller={selected.seller}
              buyer={selected.buyer}
            />
            <Link to="/store" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="primary">
                BACK TO STORE
              </Button>
            </Link>
          </div>
        )}

    </div>
  );
}

export default SingleItemPage;
