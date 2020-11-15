import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from '../../components/ItemCard/ItemCard';
import { getSellable } from '../../actions/listSellableActions';

import './StorePage.css';

function StorePage() {
  const itemsData = useSelector((state) => state.sellable);
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellable(token));
  }, [dispatch, token]);

  return (
    <div className="storePage page">
      {!itemsData.sellableList || itemsData.errorMessage
        ? <div className="userErrorMessage">{itemsData.errorMessage || 'Something went wrong. Please try again later.'}</div>
        : itemsData.sellableList.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            itemName={item.itemName}
            itemImg={item.itemImg}
            price={item.price}
          />
        ))}
    </div>
  );
}

export default StorePage;
