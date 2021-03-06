import React, { Component } from "react";
import Fade from "react-reveal/Fade";
// import "../Styles/About.css";
class About extends Component {
  render() {
    return (
      <section id="about">
        <div id="about" className="about">
          {/* <div className="left-content"> */}
          <Fade right>
            <h1>Our Mission</h1>
          </Fade>
          {/* </div> */}
          {/* <div className="right-content"> */}
          <Fade left>
            <p className="about-page">
              We want to develop an app which helps to recommend foods based on
              ingredients you have on hand and or your tastes.
              <br /> <br />
              Our app would not only be a convenient edition to your everyday
              life, but it can also become a necessary time-saving commodity in
              your everyday routine.
              <br /> <br />
              With no more indecisive choices when looking for restaurants and
              struggling when you have minimal ingredients, this app allows you
              to make the most of what you have and give you new ideas you might
              not have had before.
            </p>
          </Fade>
          {/* {/* </div> */}
        </div>
      </section>
    );
  }
}

export default About;
