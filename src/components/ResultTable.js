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
        if(this.props.empty === "true") {
            table.push(<tr>No Results</tr>);
            return table;
        }
        else {
            console.log("the data " + this.props.data);
            try {
                let x = JSON.parse(this.props.data);
                table.push(<th>ZipCodes</th>);
                for(let i=0; i<this.props.data.length; i++){
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