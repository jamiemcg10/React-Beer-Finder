import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class Table extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
        this.getBeerData(props.city);
    }

    listBeerLocs(obj){
        let locType = this.props.type;
        let list;
        if (locType === 'Beer Bars'){
            list = obj.filter(item => item.status === 'Beer Bar');
        } else if (locType === 'Beer Stores'){
            list = obj.filter(item => item.status === 'Beer Store');
        }
        else if (locType === 'Breweries/Brew Pubs'){
            list = obj.filter(item => (item.status === 'Brewery' | item.status === 'Brew Pub'));
        } else if (locType === 'Other') {
            list = obj.filter(item => (item.status !== 'Beer Bar' & item.status !== 'Beer Store' & item.status !== 'Brewery' & item.status !== 'Brew Pub'));
        }

        if (list === undefined){
            list = [];
        }

        return list;
        
    
    }
    

    getBeerData(){
        let location = this.props.city;
        const KEY = require('./key');
        let url;
        url = `http://beermapping.com/webservice/loccity/${KEY}/${location}&s=json`;


        fetch(url, {method: 'GET', cache: 'no-cache'})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
                let beerData = data;
                if (beerData[0].id == null){
                    ReactDOM.render(<p>No results found.</p>, document.getElementById('beer-data'));
                }
                else {
                    this.setState({
                        isLoaded: true,
                        items: this.listBeerLocs(beerData)
                    });
                }

        })
            .catch((e) => {
                this.setState({
                    isLoaded: true,
                    error: e
                });
            });
    }

    
    transformPhoneNumber(phoneNumber){

        phoneNumber = phoneNumber.replace(/\(/g,'');
        phoneNumber = phoneNumber.replace(/\)/g,'');
        phoneNumber = phoneNumber.replace(/-/g,'');
        phoneNumber = phoneNumber.replace(/ /g,'');
        phoneNumber = phoneNumber.toLowerCase().replace(/a/g,'2');
        phoneNumber = phoneNumber.toLowerCase().replace(/b/g,'2');
        phoneNumber = phoneNumber.toLowerCase().replace(/c/g,'2');
        phoneNumber = phoneNumber.toLowerCase().replace(/d/g,'3');
        phoneNumber = phoneNumber.toLowerCase().replace(/e/g,'3');
        phoneNumber = phoneNumber.toLowerCase().replace(/f/g,'3');
        phoneNumber = phoneNumber.toLowerCase().replace(/g/g,'4');
        phoneNumber = phoneNumber.toLowerCase().replace(/h/g,'4');
        phoneNumber = phoneNumber.toLowerCase().replace(/i/g,'4');
        phoneNumber = phoneNumber.toLowerCase().replace(/j/g,'5');
        phoneNumber = phoneNumber.toLowerCase().replace(/k/g,'5');
        phoneNumber = phoneNumber.toLowerCase().replace(/l/g,'5');
        phoneNumber = phoneNumber.toLowerCase().replace(/m/g,'6');
        phoneNumber = phoneNumber.toLowerCase().replace(/n/g,'6');
        phoneNumber = phoneNumber.toLowerCase().replace(/o/g,'6');
        phoneNumber = phoneNumber.toLowerCase().replace(/p/g,'7');
        phoneNumber = phoneNumber.toLowerCase().replace(/q/g,'7');
        phoneNumber = phoneNumber.toLowerCase().replace(/r/g,'7');
        phoneNumber = phoneNumber.toLowerCase().replace(/s/g,'7');
        phoneNumber = phoneNumber.toLowerCase().replace(/t/g,'8');
        phoneNumber = phoneNumber.toLowerCase().replace(/u/g,'8');
        phoneNumber = phoneNumber.toLowerCase().replace(/v/g,'8');
        phoneNumber = phoneNumber.toLowerCase().replace(/w/g,'9');
        phoneNumber = phoneNumber.toLowerCase().replace(/x/g,'9');
        phoneNumber = phoneNumber.toLowerCase().replace(/y/g,'9');
        phoneNumber = phoneNumber.toLowerCase().replace(/z/g,'9');

        return [phoneNumber.substr(0,3), phoneNumber.substr(3,3), phoneNumber.substr(6,4)];
    }
    
    render(){
        const {error, isLoaded, items} = this.state;
        if (items.length === 0){
            return (<table></table>)
        }

        if (error){
            return(this.props.type === "Beer Bars" &&
                 <Fragment>
                     <div id="error-screen">
                         <p>Sorry, something went wrong.</p>
                     <img id="error-img" src="./error.png" alt="error"/></div>
                 </Fragment>
            )

        } else if (!isLoaded) {
            return (
                <table>
                    <tbody>
                        <tr>
                            <td>Loading...
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        } else {
            return (
                <Fragment key={`${this.props.type}_${this.props.city}`} >
                    <h2>{this.props.type}</h2>
                    <table>
                        <thead><tr><td>Name</td><td>Street</td><td>City</td><td>State</td><td>Phone</td></tr></thead>
                        <tbody>{items.map(loc => (
                            <tr key={loc.id}>
                                {loc.url !== "" &&
                                    <td><a href={`http://www.${loc.url}`} target="__blank">{loc.name}</a></td>
                                }
                                {loc.url === "" &&
                                    <td>{loc.name}</td>
                                }
                                <td>{loc.street}</td>
                                <td>{loc.city}</td>
                                <td>{loc.state}</td>
                                <td>
                                    <a href={`tel:${this.transformPhoneNumber(loc.phone)[0]}-${this.transformPhoneNumber(loc.phone)[1]}-${this.transformPhoneNumber(loc.phone)[2]}`}>
                                        {loc.phone}</a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            )
        }
        
        
    }

}




export default Table;