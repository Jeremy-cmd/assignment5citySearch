import React, {Component} from 'react';
import '../App.css'
import axios from 'axios';
import { Button, Table, NavLink, InputGroup, FormControl, Jumbotron} from 'react-bootstrap';
import ResultTable from "./ResultTable.js"

class CitySearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
            //data returned from API
            citydata: [],
            //City name user entered
            city: "",
            //checks if results were returned or not
            results: false
        }
    }

    zipcodeChange = (event) => {

        //store data written
        this.setState({city: event.target.value.toUpperCase()});

    }



    handleSearch = () =>{

        let city = this.state.city;
        //API call
        let API = 'http://ctp-zip-api.herokuapp.com/city/' + city;
        fetch(API).then((response) => {
            if(response.status === 404){
                return;
            }
            return response.json();

        }).then((data) => {
           //turn data into string
            let citydata = JSON.stringify((data));
            //set results to true because API call was successful and store data
            this.setState({citydata: citydata, results: true});
        }).catch((error) => {
            console.log('Error', error);
        })
    }



    dataList = () => {

        let result = this.state.results;
        console.log("results " + result);

        //return empty table if no data
        if(!result){
            return <ResultTable empty = "true"/>
        }
        else{
            //set table with data
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
                            {/*change data as user enters */}
                            <input type="text" className="form-control" id="inputPassword" placeholder="10016"
                                   onChange={this.zipcodeChange}/>
                            {/*call handlesearch when submit is pressed*/}
                            <Button variant="primary" onClick={this.handleSearch}>Search</Button>
                        </div>
                    </div>
                </form>,
                <table  className="table-responsive-sm table-bordered table-hover d-sm-table  table-striped zipcode-table">
                    <tbody>
                    {/*data from API*/}
                    {this.dataList()}
                    </tbody>
                </table>

            </div>


        );

    }
}

export default CitySearch;