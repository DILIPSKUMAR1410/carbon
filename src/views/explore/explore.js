import React, { Component } from "react";
import NavBar from "../../components/navbar";

import "./explore.css";

class Explore extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="explore__table">
          <div className="explore__link">
            <a href="https://www.huffpost.com/entry/7-instant-ways-to-reduce-your-carbon-footprint_b_59321992e4b00573ab57a383?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAALXFqiXYIH36FMjtRdkYINZ2BAJ5zTKmCp7GwASvZpVmbAgKvoMqOIututeeq3k-NFTqg5gxJoOYwtyqWX5_1qilSuLjrPxmEh0jW9KGnQ9ya8MdYMh2Zq1PCZcvilwOmjf7RwSYSSYyn1J8vk20FgdD3TUvbwBradHMFAjg1C6_">
              7 ways to reduce carbon footprint
            </a>
          </div>
          <div className="explore__link">
            <a href="https://www.healthline.com/nutrition/how-to-reduce-carbon-footprint">
              How to reduce carbon footprint
            </a>
          </div>
          <div className="explore__link">
            <a href="https://cotap.org/reduce-carbon-footprint/">
              Cotap article on how to reduce carbon footprint
            </a>
          </div>
          <div className="explore__link">
            <a href="http://www.globalstewards.org/reduce-carbon-footprint.htm">
              Global stewards article on how to reduce carbon footprint
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Explore;
