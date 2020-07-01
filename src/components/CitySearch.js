import React, {Component} from 'react';
import '../App.css'
import axios from 'axios';
import { Button, Table, NavLink, InputGroup, FormControl, Jumbotron} from 'react-bootstrap';
import ResultTable from "./ResultTable.js"

class CitySearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
            citydata: [],
            city: "",
            results: false
        }
    }

    zipcodeChange = (event) => {
        console.log("it calls zipcode");
        console.log(event.target.value);
        this.setState({city: event.target.value.toUpperCase()});
        console.log(this.state.city);

    }



    handleSearch = () =>{
        let city = this.state.city;
        let API = 'http://ctp-zip-api.herokuapp.com/city/' + city;
        console.log("the zipcode sent is " + city);
        fetch(API).then((response) => {
            if(response.status === 404){
                return;
            }
            return response.json();

        }).then((data) => {
            console.log("synchrounous data " + JSON.stringify(data));
            let citydata = JSON.stringify((data));
            this.setState({results: true });
            console.log("shows if state is being changed or not " + this.state.results);
            this.setState({citydata: citydata, results: true});
        }).catch((error) => {
            console.log('Error', error);
        })
    }



    dataList = () => {
        let result = this.state.results;
        console.log("results " + result);
        if(!result){
            return <ResultTable empty = "true"/>
        }
        else{
            console.log("reaches here");
            console.log("the data before it is sent " + this.state.citydata);
            return <ResultTable empty = "false" data = {this.state.citydata} />
        }

    }



    render() {
        return (
            <div>
                <div className="black">

                    <h1>City Search</h1>

                </div>
                ,
                <form>

                    <div id="input" className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">City:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword" placeholder="10016"
                                   onChange={this.zipcodeChange}/>
                            <Button variant="primary" onClick={this.handleSearch}>Search</Button>
                        </div>
                    </div>
                </form>,
                <table  className="table-responsive-sm table-bordered table-hover d-sm-table  table-striped zipcode-table">
                    <tbody>
                    {this.dataList()}
                    </tbody>
                </table>

            </div>


        );

    }
}

export default CitySearch;