// Imports: React
import React from 'react';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

// Imports: Components
import { Loading } from './LoadingComponent';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



// Local Component: <RenderCard />
function RenderCard({item, isLoading, errMess}) {

    // Loading True?
    if (isLoading) {
      return <Loading />
    }

    // Error Message True?
    if (errMess) {
      return <h4>{errMess}</h4>
    }

    // Return: <Card />
    return (
      <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(50%)'}}>
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    )
}


// Main Component: <Home {...props} />
function Home(props) {

    // Return View
    return (
      <div className="container">
        <div className="row">
          <div className="col-md m-1">
            <RenderCard item={props.campsite} isLoading={props.campsitesLoading} errMess={props.campsitesErrMess} />
          </div>
          <div className="col-md m-1">
            <RenderCard item={props.promotion} isLoading={props.promotionLoading} errMess={props.promotionErrMess} />
          </div>
          <div className="col-md m-1">
            <RenderCard item={props.partner} />
          </div>
        </div>
      </div>
  );
}

export default Home;