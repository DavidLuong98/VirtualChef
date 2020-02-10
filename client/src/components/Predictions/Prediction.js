import React from "react";

class Prediction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFood: "",
      domElementsObj: [],
      ingredientList: []
    };
  }

  handleChange = event => {
    this.setState({ usersFood: event.target.value });
    this.setState({ domElementsObj: [] });
  };

  getPredictions = () => {
    let myObj = [];
    fetch(`http://localhost:8000/prediction/${this.state.usersFood}`, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(myJson => {
        myObj = myJson;
        if (myObj === "Sorry, we couldn't indentify this food yet.") {
          this.setState({ domElementsObj: [] });
        } else {
          this.setState({ domElementsObj: myJson });
          myObj.map(function(obj, i) {
            myObj[i] = obj[0];
          });
        }
      })
      .catch(function(error) {
        console.error();
      }); //end of prediction fetch
  };
  getIngredients = params => {
    // https://developer.edamam.com/admin/applications/1409619036598?service_id=2555417725632
    //example :https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free
    let ingredientObj = [];
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "1379f77e";
    const YOUR_APP_KEY = "5c98e2c53e8e6a98a17d608177ac37c1";
    fetch(`${base}?q=${params}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
      .then(res => {
        if (res.ok) {
          // console.log(res.json());
          return res.json();
        } else {
          throw new Error(res);
        }
      })
      .then(resJson => {
        ingredientObj = resJson;
        console.log(ingredientObj);
        //gets the recipe
        this.setState({ ingredientList: [] });
        ingredientObj.hits.forEach(hit =>
          this.setState(ingredientList => ({
            ingredientList: [
              ...this.state.ingredientList,
              hit.recipe.ingredientLines
            ]
          }))
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    let predictionDOM = this.state.domElementsObj.map((obj, i) => {
      return (
        <div>
          <li key={obj[0]}>
            <button onClick={() => this.getIngredients(obj[0])}>
              {obj[0] + " -----"}
            </button>
            <span> ---- % of accuracy : {obj[1]} --</span>
            <button> Save to favorites</button>
          </li>
        </div>
      );
    });
    let ingredients = this.state.ingredientList.map(i => {
      return (
        <div>
          <span> {i}</span>
        </div>
      );
    });
    return (
      <div>
        <h1>testing api</h1>
        <p>Enter in your food :</p>
        <input
          type="text"
          value={this.state.usersFood}
          onChange={this.handleChange}
          placeholder="Enter your food"
        />
        <button onClick={this.getPredictions}>Make Predictions</button>
        {predictionDOM}
        {ingredients}
      </div>
    );
  }
}
export default Prediction;