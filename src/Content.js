import React, {Fragment} from 'react';
import Table from './Table'


class Content extends React.Component{

    render(){
        if (this.props.location !== ''){
            return(
                <Fragment>      
                    <Table type='Beer Bars' city={this.props.location}/>
                    
                    <Table type='Beer Stores' city={this.props.location}/>

                    <Table type='Breweries/Brew Pubs' city={this.props.location}/>

                    <Table type="Other" city={this.props.location}/>   
                </Fragment>
            );
              
        }
    }

}




export default Content;