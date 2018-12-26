import React, { Component } from 'react';
import axios from 'axios';
import WeatherDesc from './weatherdesc';
class Front extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citydata1: [],
            citydata2: [],
            data_available1: false,
            data_available2: false,
            unit1: "imperial",
            unit2: "imperial",
            compare: false
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.fareinclick = this.fareinclick.bind(this);
        this.celciusclick = this.celciusclick.bind(this);
        this.compareClick = this.compareClick.bind(this);
    }
    formSubmit(e) {

        e.preventDefault();
        let tar = e.target.name;
        var city = e.target.elements.city.value;
        if(city === '') {
            this.nodata(tar);
        }
        else {
        let unit = tar === "form1" ? this.state.unit1 : this.state.unit2;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=2c59be56d368f91e6857fe42090f8bd8`;
        axios.get(url)
            .then(function (response) {
                let x = response.data;
                tar === "form1" ? this.setState({ citydata1: x, data_available1: true }) : this.setState({ citydata2: x, data_available2: true })

            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
        }
    };

    fareinclick(e) {

        let tar = e.target.name;
        tar === "temp1" ? this.setState({ unit1: "imperial" }) : this.setState({ unit2: "imperial" })
    };

    celciusclick(e) {

        let tar = e.target.name;
        tar === "temp1" ? this.setState({ unit1: "metric" }) : this.setState({ unit2: "metric" })
    };

    compareClick() {

        this.setState({ compare: !this.state.compare });
    };

    nodata(tar){
        const div = document.createElement('div');
        div.className = "alert";
        div.appendChild(document.createTextNode('Enter city name'));
        const container = document.querySelector('#'.concat('', ((tar) === 'form1' ? 'formcontainer1' : 'formcontainer2')));
        const form = document.querySelector('#'.concat('', ((tar) === 'form1' ? 'form1' : 'form2')));
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(),3000);

    }

    render() {
        return <div className={((this.state.compare) ? "compare" : "nocompare")}>
            <div id="formcontainer1">
                {/*<div id="inputform1" className="inputForm">*/}
                    <form name="form1" id="form1" onSubmit={this.formSubmit} >

                        <input className="inputbox" type="text" name="city" placeholder="city" />

                        <button className="submitbutton" type="submit" value="submit">Get weather</button>

                    </form>
                
                {/*<div className="inputForm">*/}
                    <div className="tempform">
                        <button name="temp1" className={"tempunit".concat(' ', ((this.state.unit1) === "imperial" ? "active" : "notactive"))} type="button" onClick={this.fareinclick} value="fareinheit">F{'\u00b0'}</button>
                        <button name="temp1" className={"tempunitc".concat(' ', ((this.state.unit1) === "metric" ? "active" : "notactive"))} type="button" onClick={this.celciusclick} value="fareinheit">C{'\u00b0'}</button>
                        <button name="compare" className={"tempunitc".concat(' ', ((this.state.compare) ? "active" : "notactive"))} type="button" onClick={this.compareClick} value="Compare">Compare</button>
                    </div>
                
                <WeatherDesc citydata={this.state.citydata1} display={this.state.data_available1} />
            </div>

            {/*-------------------------------------------------------------------------------------------------------*/}

            <div id="formcontainer2" style={{ display: " ".concat('', ((this.state.compare) ? "block" : "none")) }}>
            
                
                    <form name="form2" id="form2" onSubmit={this.formSubmit} >

                        <input className="inputbox" type="text" name="city" placeholder="city" />

                        <button className="submitbutton" type="submit" value="submit">Get weather</button>

                    </form>
                

                   
                        <div className="tempform2">
                            <button name="temp2" className={"tempunit".concat(' ', ((this.state.unit2) === "imperial" ? "active" : "notactive"))} type="button" onClick={this.fareinclick} value="fareinheit">F{'\u00b0'}</button>
                            <button name="temp2" className={"tempunitc".concat(' ', ((this.state.unit2) === "metric" ? "active" : "notactive"))} type="button" onClick={this.celciusclick} value="fareinheit">C{'\u00b0'}</button>
                        </div>
                   
                    <WeatherDesc citydata={this.state.citydata2} display={this.state.data_available2} />
                
            </div>
            
        </div>


    }
}
export default Front;