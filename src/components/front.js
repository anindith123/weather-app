import React, {Component}from 'react';
import axios from 'axios';
import WeatherDesc from './weatherdesc';
class Front extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citydata1 : [],
            citydata2 : [],
            data_available1:false,
            data_available2:false,

            unit:"imperial"
            
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.fareinclick = this.fareinclick.bind(this);
        this.celciusclick = this.celciusclick.bind(this);
    }
    formSubmit(e){
        e.preventDefault();
        var city = e.target.elements.city.value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.state.unit}&appid=2c59be56d368f91e6857fe42090f8bd8`;
        axios.get(url)
        .then(function (response) {
            let x = response.data;
            
            this.setState({citydata1 : x, data_available1: true})
            
        }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
    };

    fareinclick() {
        this.setState({unit: "imperial"});
    };

    celciusclick() {
        this.setState({unit: "metric"});
    }

    render() {
       console.log(this.state.citydata1);
        return <div style={{display:"flex"}}>
        <div style={{margin:"auto"}}>
            <div className="inputForm">
            <form onSubmit={this.formSubmit} >
               
                <input className="inputbox" type="text" name="city" placeholder="city" />
                
                <button className="submitbutton" type="submit" value="submit">Submit</button>
                
            </form></div>
            <div className="inputForm">
            <div className="tempform">
            <button className={"tempunit".concat(' ',((this.state.unit) === "imperial"? "active" : "notactive"))} type="button" onClick={this.fareinclick} value="fareinheit">F{'\u00b0'}</button>
            <button className={"tempunitc".concat(' ',((this.state.unit) === "metric"? "active" : "notactive"))} type="button" onClick={this.celciusclick} value="fareinheit">C{'\u00b0'}</button>
            </div>
            </div>
                <WeatherDesc citydata={this.state.citydata1} display={this.state.data_available1}/>
                </div>

{/*-------------------------------------------------------------------------------------------------------*/}

                <div style={{margin:"auto"}}>
                 <div className="inputForm">
            <form onSubmit={this.formSubmit} >
               
                <input className="inputbox" type="text" name="city" placeholder="city" />
                
                <button className="submitbutton" type="submit" value="submit">Submit</button>
                
           </form></div>
           <div style={{margin:"auto"}}>
           
            <div className="inputForm">
            <div className="tempform">
            <button className={"tempunit".concat(' ',((this.state.unit) === "imperial"? "active" : "notactive"))} type="button" onClick={this.fareinclick} value="fareinheit">F{'\u00b0'}</button>
            <button className={"tempunitc".concat(' ',((this.state.unit) === "metric"? "active" : "notactive"))} type="button" onClick={this.celciusclick} value="fareinheit">C{'\u00b0'}</button>
            </div>
            </div>
                <WeatherDesc citydata={this.state.citydata2} display={this.state.data_available2}/>
           </div>
           </div>
           </div>
          
        
    }
}
export default Front;