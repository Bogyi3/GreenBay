import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from '../../components/ItemCard/ItemCard';
import { getSellable } from '../../actions/listSellableActions';

import './StorePage.css';

function StorePage() {
  const itemsData = useSelector((state) => state.sellable);
  const token = useSelector((state) => state.login.token);
  //  const selectedItem = useSelector((state) => state.selectedItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellable(token));
  }, [dispatch, token]);

  return (
    <div className="storePage page">
      {!itemsData.sellableList || itemsData.errorMessage
        ? <div className="storeErrorMessage">{itemsData.errorMessage || 'Something went wrong. Please try again later.'}</div>
        : itemsData.sellableList.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            itemName={item.itemName}
            itemImg={item.itemImg}
            price={parseInt(item.price, 10)}
          />
        ))}
    </div>
  );
}

export default StorePage;
