import React, { useState, useEffect, useReducer, useCallback } from "react";
import { loadUser } from "../../actions/authActions";
import { connect, useDispatch, useSelector } from "react-redux";
import "./../Styles/Documentation.css";
import { genkey } from "../../actions/virtualchefActions";
import axios from "axios";

const Documentation = (props) => {
  const auth = useSelector((state) => state.auth);
  const tokenRecognized = useSelector((state) => state.auth.token);
  const [userID, setUserID] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    console.log(auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);
    }
  }, [auth.isAuthenicated, auth.user]);

  const createNewKey = () => {
    props.genkey(userID);
    console.log("create new key function finished");
  };

  const fetchExample = `fetch(https://floating-plains-35923.herokuapp.com/prediction/:id", {
    headers: {
      Authorization: "Bearer key",
    },
  })
    .then((res) => res.json())
    .then(function (data) {
      console.log(data); //expecting array
      res.status(200).send({ data });
    });`;
  return (
    <div className="documentation-page">
      {/* if auth.user has apikey, then show your api key, else, show the button */}
      <h2>API Documentation</h2>
      <p>
        Welcome to <strong>Virtual Chef API intergration guide!</strong>
      </p>
      <p>
        Virtual Chef provides helpful tools for developers. Explore our neural
        network that we use to make your food prediction.
      </p>

      <button type="button" className="button" onClick={createNewKey}>
        Get API Key
      </button>
      <p>Your API key will show up in the bottom of your profile.</p>

      <p>
        Virtual Chefuses API keys to authenticate requests, please request one
        if you don't have one{" "}
      </p>
      <p>
        Your API keys carry many privileges, so be sure to keep them secure! Do
        not share your secret API keys in publicly accessible areas such as
        GitHub, client-side code, and so forth.
      </p>

      <p>
        Base URL for prediction:
        https://floating-plains-35923.herokuapp.com/prediction
      </p>
      <p>${fetchExample}</p>

      <p>":id" should be the food you are searching</p>

      <p>
        Finally, the reponse will be ten foods or ingredients with the accuracy
        percentage from the neural network.
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  genkey,
})(Documentation);
