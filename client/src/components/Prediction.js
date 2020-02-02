import React from "react";

class Prediction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersFood: "", domElementsObj: [] };
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
        // console.log(myJson);
        // document.getElementById("text-area").innerHTML = myJson;

        //getting individual words from the json file, now each element is formatted [{food, 0.9...}, {food2, 0.99}...]
        myObj = myJson;
        this.setState({ domElementsObj: myJson });
        myObj.map(function(obj, i) {
          myObj[i] = obj[0];
        });
        console.log(myObj);
        //fetch the ingredients, but we wil change our approach
        // this.getIngredients(myObj);
        // this.createUI(myObj);
      })
      .catch(function(error) {
        console.error();
      }); //end of prediction fetch
  };
  getIngredients = params => {
    // https://developer.edamam.com/admin/applications/1409619036598?service_id=2555417725632
    //example :https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free

    //what we will do is make each predicted food a button, when the user click it - > they will be able to see the ingredient
    console.log(params);
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "1379f77e";
    const YOUR_APP_KEY = "5c98e2c53e8e6a98a17d608177ac37c1";
    params.map(function(x, i) {
      console.log(i);
      fetch(
        `${base}?q=${params[0]}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
        .then(response => {
          console.log(response.json());
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  };
  render() {
    let predictionDOM = this.state.domElementsObj.map(i => {
      return <li>{i}</li>;
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
      </div>
    );
  }
}
export default Prediction;
