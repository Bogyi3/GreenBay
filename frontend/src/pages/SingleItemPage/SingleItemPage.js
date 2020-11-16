import React from 'react';
import { useSelector } from 'react-redux';
import ItemCardDetailed from '../../components/ItemCardDetailed/ItemCardDetailed';
import './SingleItemPage.css';

function SingleItemPage() {
  const selected = useSelector((state) => state.selectedItem.selectedItem);
  const errorMessage = useSelector((state) => state.selectedItem.errorMessage);

  return (
    <div className="singleItemPage page">
      {!selected.itemName || errorMessage
        ? <div className="singleItemErrorMessage">{ errorMessage || 'Something went wrong. Please try again later.'}</div>
        : (
          <ItemCardDetailed
            itemName={selected.itemName}
            price={selected.price}
            description={selected.description}
            itemImg={selected.itemImg}
            seller={selected.seller}
            buyer={selected.buyer}
          />
        )}

    </div>
  );
}

export default SingleItemPage;
