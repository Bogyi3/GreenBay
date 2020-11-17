/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ItemCardDetailed from '../../components/ItemCardDetailed/ItemCardDetailed';
import generalFetch from '../../utilities/generalFetch';
import { getSingle } from '../../actions/selectItemAction';
import './CreateItemPage.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CreateItemPage() {
  const [itemNameInput, setItemNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [itemImgInput, setItemImgInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);

  const token = useSelector((state) => state.login.token);
  const username = useSelector((state) => state.login.username);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createItem = async () => {
    try {
      const data = await generalFetch('item/new', 'POST', {
        itemParams: {
          itemName: itemNameInput,
          itemImg: itemImgInput,
          price: priceInput,
          description: descriptionInput,
          seller: username,
        },
      }, token);
      const newId = data.response.itemData[0].id;
      if (data.response.itemData[0].id) {
        dispatch(getSingle(newId, token));
        history.push('/singleItem');
      }
      if (data.response.message === 'jwt malformed') {
        throw new Error('Please sign in or register to continue.');
      }
      throw new Error(data.response.message || data.message || 'Something went wrong');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const onItemNameChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setItemNameInput(event.target.value);
  };

  const onPriceChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setPriceInput(event.target.value);
  };

  const onItemImageChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setItemImgInput(event.target.value);
  };

  const onDescriptionChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setDescriptionInput(event.target.value);
  };

  const addItemClick = (event) => {
    event.preventDefault();

    if (!itemNameInput || !priceInput || !itemImgInput || !descriptionInput) {
      setErrorMessage('All fields are required.');
      return null;
    }

    const numsOnly = /^\d+$/;
    if (!numsOnly.test(priceInput) || priceInput < 1) {
      setErrorMessage('The price must be a positive integer.');
    }

    // eslint-disable-next-line no-useless-escape
    const validUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    if (!validUrl.test(itemImgInput)) {
      setErrorMessage('You must enter a valid url.');
    }
    return createItem();
  };

  return (
    <div className="createItemPage page">
      {!token
        ? <div className="createItemErrorMessage">{ errorMessage || 'Something went wrong. Please try again later.'}</div>
        : (
          <form id="createItemForm">
            <i className="fas fa-plus-circle fa-4x" />
            <h1>Add New Item</h1>
            <div className="createItemErrorMessage">
              {errorMessage}
            </div>

            <label htmlFor="itemNameInput">
              Item Name
            </label>
            <input
              name="itemNameInput"
              value={itemNameInput}
              type="text"
              noValidate
              onChange={onItemNameChange}
            />

            <label htmlFor="priceInput">
              Price
            </label>
            <input
              name="priceInput"
              value={priceInput}
              type="text"
              noValidate
              onChange={onPriceChange}
            />

            <label htmlFor="itemImgInput">
              Image Url
            </label>
            <input
              name="itemImgInput"
              value={itemImgInput}
              type="text"
              noValidate
              onChange={onItemImageChange}
            />

            <label htmlFor="descriptionInput">
              Description
            </label>
            <textarea
              name="descriptionInput"
              value={descriptionInput}
              noValidate
              onChange={onDescriptionChange}
            />
            <div className="buttonContainer">
              {itemNameInput && itemImgInput && descriptionInput && priceInput && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
              >
                Preview
              </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={addItemClick}
              >
                Add Item
              </Button>
            </div>
          </form>
        )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ItemCardDetailed
            itemName={itemNameInput}
            price={priceInput}
            description={descriptionInput}
            itemImg={itemImgInput}
            seller={username}
          />
        </Fade>
      </Modal>

    </div>
  );
}

export default CreateItemPage;
