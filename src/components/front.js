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
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
        let tar = e.target.name;
        var city = e.target.elements.city.value;
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

    render() {
        return <div style={{ display: " ".concat('', ((this.state.compare) ? "flex" : "grid")) }}>
            <div style={{ margin: "auto" }}>
                <div className="inputForm">
                    <form name="form1" onSubmit={this.formSubmit} >

                        <input className="inputbox" type="text" name="city" placeholder="city" />

                        <button className="submitbutton" type="submit" value="submit">Get weather</button>

                    </form></div>
                <div className="inputForm">
                    <div className="tempform">
                        <button name="temp1" className={"tempunit".concat(' ', ((this.state.unit1) === "imperial" ? "active" : "notactive"))} type="button" onClick={this.fareinclick} value="fareinheit">F{'\u00b0'}</button>
                        <button name="temp1" className={"tempunitc".concat(' ', ((this.state.unit1) === "metric" ? "active" : "notactive"))} type="button" onClick={this.celciusclick} value="fareinheit">C{'\u00b0'}</button>
                        <button name="compare" className={"tempunitc".concat(' ', ((this.state.compare) ? "active" : "notactive"))} type="button" onClick={this.compareClick} value="Compare">Compare</button>
                    </div>
                </div>
                <WeatherDesc citydata={this.state.citydata1} display={this.state.data_available1} />
            </div>

            {/*-------------------------------------------------------------------------------------------------------*/}

            <div style={{ margin: "auto", display: " ".concat('', ((this.state.compare) ? "block" : "none")) }}>
                <div className="inputForm">
                    <form name="form2" onSubmit={this.formSubmit} >

                        <input className="inputbox" type="text" name="city" placeholder="city" required />

                        <button className="submitbutton" type="submit" value="submit">Get weather</button>

                    </form></div>
                <div style={{ margin: "auto" }}>

                    <div className="inputForm">
                        <div className="tempform">
                            <button name="temp2" className={"tempunit".concat(' ', ((this.state.unit2) === "imperial" ? "active" : "notactive"))} type="button" onClick={this.fareinclick} value="fareinheit">F{'\u00b0'}</button>
                            <button name="temp2" className={"tempunitc".concat(' ', ((this.state.unit2) === "metric" ? "active" : "notactive"))} type="button" onClick={this.celciusclick} value="fareinheit">C{'\u00b0'}</button>
                        </div>
                    </div>
                    <WeatherDesc citydata={this.state.citydata2} display={this.state.data_available2} />
                </div>
            </div>
        </div>


    }
}
export default Front;