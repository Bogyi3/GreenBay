import React from 'react';
import ItemCardDetailed from '../../components/ItemCardDetailed/ItemCardDetailed';
import './SingleItemPage.css';

function SingleItemPage() {
  return (
    <div className="singleItemPage page">
      <ItemCardDetailed
        itemName="MyItemName"
        price="56"
        description="awesome item, high quality, excellent condition, blah blah blah"
        itemImg="https://images-na.ssl-images-amazon.com/images/I/81gx3hw9EEL.jpg"
        seller="Mazsi"
        buyer="Bogi"
      />
    </div>
  );
}

export default SingleItemPage;
