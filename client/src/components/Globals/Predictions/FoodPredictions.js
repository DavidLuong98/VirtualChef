import React, { useState } from "react";
import { Container } from "reactstrap";
import Fade from "react-reveal/Fade";

import AutoFillDictionary from "./AutoFillDictionary";
import FoodList from "./FoodList";
import BackgroundPrediction from "../../../images/background_prediction.png";

import Alert from "../../Alert";

const FoodPredictions = ({
  idFromButtonClick,
  userFood,
  handleClickPrediction,
  setUserFood,
  buttonClick,
  findPrediction,
  predictions,
  predictionsRecipes,
  handleToogle,
  isToggled,
  idFromFoodButtonClick,
  isLoading,
  open,
  setOpen,
  options,
  loading,
  props,
  userID,
  foodFavoritesArray,
  // submitFavorites,
}) => {
  const [alert, setAlert] = useState({ show: false });

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  return (
    <div className="prediction-container">
      <div className="predictions">
        <div className="left-content">
          <Fade up>
            <img src={BackgroundPrediction}></img>
          </Fade>
        </div>
        <div className="right-content">
          <Fade up>
            <h1>Find Your Food!</h1>
            <AutoFillDictionary
              open={open}
              setOpen={setOpen}
              options={options}
              loading={loading}
              userFood={userFood}
              setUserFood={setUserFood}
            />

            <br></br>
            <button
              className="button"
              type="button"
              onClick={handleClickPrediction}
            >
              View Food
            </button>
           
            {/*---------------DISPLAY THE FOOD FROM THE FLASK API ---------------*/}
            <div>
              {alert.show && <Alert type={alert.type} text={alert.text} />}
              <Alert />
              {buttonClick ? (
                <div className="foodie">
                  {findPrediction ? (
                    <FoodList
                      props={props}
                      predictions={predictions}
                      handleToogle={handleToogle}
                      isToggled={isToggled}
                      idFromFoodButtonClick={idFromFoodButtonClick}
                      predictionsRecipes={predictionsRecipes}
                      isLoading={isLoading}
                      foodFavoritesArray={foodFavoritesArray}
                      userID={userID}
                      handleAlert={handleAlert}
                    />
                  ) : (
                    <div>
                      <p>Sorry, we couldn't indentify this food yet.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="foodie">
                  <p>Let us predict for you!</p>
                </div>
              )}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default FoodPredictions;
