import React, { Component } from 'react';
import '../styles/styles.css'
import sunrise from '../styles/media/sunrise.png'
import sunset from '../styles/media/sunset.png'
import humidity from '../styles/media/humidity.png'
import pressure from '../styles/media/pressure.png'
import visibility from '../styles/media/view.png'
import hightemp from '../styles/media/high-temperature.png'
import lowtemp from '../styles/media/low-temperature.png'

class WeatherDesc extends Component {
    constructor(props) {
        super(props);
        this.converttime = this.converttime.bind(this);
    }

    converttime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }


    render() {
        let data = this.props.citydata;
        let display = this.props.display;
        let view = display ? "block" : "none";


        return <div id="data" style={{ display: view }}>

            <section>

                <div className="container topData">
                    <h1>{data.name ? data.name : "laoding"}</h1>
                    <div className="temp">{data.main ? data.main["temp"] : "laoding"}{'\u00b0'}</div><div className="weather">{data.weather ? data.weather[0].description : "loading"}</div>
                    <div><img className="" src={sunrise} alt="sunrise" />
                        {data.sys ? this.converttime(data.sys.sunrise) : "loading"}
                        <img className="" src={sunset} alt="sunset" />
                        {data.sys ? this.converttime(data.sys.sunset) : "loading"}
                    </div>

                    <div className="container bottomData">
                        <div><img src={humidity} alt="humidity" />Humidity : {data.main ? data.main["humidity"] : "loading"}% </div>
                        <div><img src={pressure} alt="pressure" />pressure : {data.main ? data.main["pressure"] : "loading"}hPa</div>
                        <div><img src={visibility} alt="visibility" />visibility : {data ? data.visibility : "loading"}ft.</div>
                        <div><img src={hightemp} alt="high temp" />High Temperature:{data.main ? data.main["temp_max"] : "loading"}{'\u00b0'}</div>
                        <div><img src={lowtemp} alt="low temp" />Low Temperature:{data.main ? data.main["temp_min"] : "loading"}{'\u00b0'}</div>


                    </div>


                </div>
            </section>













            {/*
            <h3>{data.name}</h3>  <h5>{data.weather ? data.weather[0].description : "loading"}</h5>
            <h4>Temperature:</h4>
            <h5>{data.main ? data.main["temp"] : "laoding"}</h5>
            <h5>Temperature High:{data.main ? data.main["temp_max"] : "loading"}</h5>
            <h5>Temperature Low:{data.main ? data.main["temp_min"] : "loading"}</h5>
            <h5>Humidity:{data.main ? data.main["humidity"] : "loading"}</h5>
            <h5>pressure:{data.main ? data.main["pressure"] : "loading"}</h5>
            <h5>sunrise:{data.main ? data.sys.sunrise : "loading"}</h5>
            <h5>sunset:{data.main ? data.sys.sunset : "loading"}</h5>
        <h5>visibility:{data.main ? data.visibility : "loading"}%</h5>*/}

        </div>
    }
}

export default WeatherDesc;