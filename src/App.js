import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Content from './Content';

let loc;

document.addEventListener("DOMContentLoaded", (event)=>{

  let btn = document.getElementById('search');

  document.addEventListener("keyup", (event)=> {
      if (event.keyCode === 13){
          if (document.getElementById('location') !== ""){
              btn.click();
          }
      }
  });


  
});

function updateLocation(){
  let field = document.getElementById('location');
  loc = field.value.replace(', ', ',');

  if (loc !== ""){
    let element = (
      <Content key ={loc} location={loc}/>
    );

    ReactDOM.render(element, document.getElementById('beer-data'));
  } else {
    ReactDOM.render(<p>Please enter a valid location.</p>, document.getElementById('beer-data'));
  }

}



function App() {

  return (
    <div>
      
        <div className="header-container">
            <img src="./beer-finder-logo.png" alt="logo"/>
            <h1>Beer Finder</h1><p>Find places to get beer near you.</p>
            <div className="search">
            <input type="text" name="location" id="location" placeholder="Enter location" autoFocus></input><button className="myButton" id='search'onClick={updateLocation}>→</button>
            </div>
            <span id="warning"></span>

        </div>


        <div id="beer-data"></div>
        
        
    </div>
  );
}


export default App;
