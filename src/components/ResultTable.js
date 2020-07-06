import React, {Component} from 'react';
import '../App.css'
import axios from 'axios';
import { Button, NavLink, InputGroup, FormControl, Jumbotron} from 'react-bootstrap';


class ResultTable extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        let table = [];
        //if data is empty return no results
        if(this.props.empty === "true") {
            table.push(<tr>No Results</tr>);
            return table;
        }
        else {

            try {
                //change data to JSON
                let x = JSON.parse(this.props.data);
                table.push(<th>ZipCodes</th>);

                //store html with zipcodes
                for(let i=0; i<x.length; i++){
                    table.push(

                        <tr>
                            <p> {x[i]} </p>

                        </tr>);
                }
                return table;
            }catch (e) {
                console.log("the error " + e.error);

            }

            return table;


        }
    }


}

export default ResultTable