import React, {useState} from "react";
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import styled from 'styled-components';
import styles from "../styles/comments.module.css";
import {Button} from "react-bootstrap";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";


function getDisplayCardNumber(numberInput) {
  const placeholder = "****************";
  const newPlaceholder = placeholder.substr(numberInput.length);

  return numberInput.concat("", newPlaceholder).match(/.{1,4}/g);
}

const StyledCard = styled.div`
  font-family: "Space Mono", monospace;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  height: 200px;
  width: 320px;
  flex: 0 0 auto;
  margin-bottom: 10%;
  padding: 0 1em;

  .card {
    height: 100%;
    border-radius: 8px;
    box-shadow: 1px 1px #aaa3a3;
    margin-bottom: 10%;
    background: linear-gradient(45deg, #343a40, #666666, #343a40);
    color: #fff;

    .cardNumber {
      position: relative;
      top: 75px;
      display: flex;
      justify-content: space-between;
      font-size: 1.2em;
      word-spacing: 4px;
      letter-spacing: 2px;
      padding: 0 1em;
    }

    .cardInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      letter-spacing: 1px;
      line-height: 18px;
      text-transform: uppercase;
      position: relative;
      top: 110px;
      padding: 0 1em;

      span {
        font-size: 11px;
      }

      p {
        margin-top: 8px;
        font-size: 16px;
      }

      .cardExpiry {
        text-align: right;
      }
    }
  }
`;

const StyledTextInput = styled.div`
  color: #343a40;

  label {
    display: inline;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    outline: none;
    border: 1px solid #ebecee;
    padding: 10px;
    margin: 10px 0;
  }

  input:focus {
    border-color: #64b5f6;
}
`;

const StyledCardForm = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  width: 100%;
  height: 60%;
  overflow-y: scroll;
  padding: 1em 2em;
  box-shadow: 2px 2px 8px 0 rgba(0,0,0,0.5);

  //h2 {
  //  color: #343a40;
  //  margin: 0;
  //  padding-top: .25em;
  //  border-bottom: 1px solid #aeaeae;
  //  padding-bottom: .75em;
  //}
  //
  ul {
    list-style: none;
    padding: 0;
  
    li:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`;

const StyledApp = styled.main`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 3em;
justify-content: space-around;

  & > div:not(:last-child) {
    margin-bottom: 2em;
  }
`

const TextInput = ({ label, type = "text", id, value, ...props }) => (
  <StyledTextInput>
    {label && <label for={id}>{label}</label>}
    <input id={id} type={type} value={value} {...props} />
  </StyledTextInput>
);

const CreditCard = ({
  cardInfo: { name, number, expiryMonth, expiryYear, cvv }
}) => {
  let cardNumber = getDisplayCardNumber(number);
  let cardName = name < 1 ? "Name" : name;
  let expiry =
    expiryMonth < 1 && expiryYear < 1
      ? "00/00"
      : `${expiryMonth}/${expiryYear}`;

  return (
    <StyledCard>
      <div className="card">
        <div className="cardNumber">
          <span className="numberSection">{cardNumber[0]}</span>
          <span className="numberSection">{cardNumber[1]}</span>
          <span className="numberSection">{cardNumber[2]}</span>
          <span className="numberSection">{cardNumber[3]}</span>
          {cardNumber[4] && (
            <span className="numberSection">{cardNumber[4]}</span>
          )}
        </div>
        <div className="cardInfo">
          <div className="cardName">
            <span>Card Holder</span>
            <p>{cardName}</p>
          </div>
          <div className="cardExpiry">
            <span>Expires</span>
            <p>{expiry}</p>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

const CardForm = ({
  cardInfo: { name, number, expiryMonth, expiryYear, cvv },
  onChange
}) => (
  <StyledCardForm>
    <form>
      <ul>
        <li>
          <TextInput
            label="Card Holder Name"
            id="name"
            type="text"
            value={name}
            onChange={e => onChange({ key: "name", value: e.target.value })}
            minLength="1"
            maxLength="40"
            required
          />
        </li>
        <li>
          <TextInput
            label="Card Number"
            id="number"
            type="text"
            value={number}
            onChange={e => onChange({ key: "number", value: e.target.value })}
            placeholder="**** **** **** ****"
            minLength="12"
            maxLength="19"
            required
          />
        </li>
        <li>
          <TextInput
            label="Expiry Month"
            id="expiryMonth"
            type="text"
            value={expiryMonth}
            onChange={e =>
              onChange({ key: "expiryMonth", value: e.target.value })
            }
            placeholder="MM"
            minLength="2"
            maxLength="2"
            required
          />
        </li>
        <li>
          <TextInput
            label="Expiry Year"
            id="expiryYear"
            type="text"
            value={expiryYear}
            onChange={e =>
              onChange({ key: "expiryYear", value: e.target.value })
            }
            placeholder="YY"
            minLength="2"
            maxLength="4"
            required
          />
        </li>
        <li>
          <TextInput
            label="CVV"
            id="cvv"
            type="text"
            value={cvv}
            onChange={e => onChange({ key: "cvv", value: e.target.value })}
            minLength="3"
            maxLength="4"
          />
        </li>
      </ul>
    </form>
  </StyledCardForm>
);

const ModalCreditCard = (props) => {
  const initialState = {
    name: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  };
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflowY: 'scroll',
            height: '100%'

        },
        paper: {
            backgroundColor: 'whitesmoke',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            display: 'flex',
            flexDirection:'column',
            alignItems: 'space-between',
            alignContent: 'space-between',
            width: '90%',
            height: '90%'
        },
    }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


  const inputReducer = (state, action) => {
    return { ...state, [action.key]: action.value };
  };

  const [cardInfo, handleOnChange] = React.useReducer(
    inputReducer,
    initialState
  );

  return (
      <>
      <div className={styles.botones2} onClick={handleOpen}>
        <Button className={styles.botonI}>Datos de tarjeta</Button>{' '}
      </div>
    <StyledApp>


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
                    <div className={classes.paper}>
                        <h4 className={styles.espacio}>Datos de pago</h4>
                        <CreditCard cardInfo={cardInfo}/>
                        <CardForm cardInfo={cardInfo} onChange={handleOnChange}/>
                        <div className={styles.botones2} >
                            <Button className={styles.botonI2}>Pagar</Button>
                        </div>
                    </div>
                </Fade>

      </Modal>

    </StyledApp>
      </>

  );
};
export default ModalCreditCard;
