import React, {Component} from 'react';
import {Button, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


// Local Component: <CommentForm />
class CommentForm extends Component {

  constructor(props) {
    super(props);

    // State
    this.state = { isModalOpen: false };

    // Binds
    this.modalToggle = this.modalToggle.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // Methods
  modalToggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen})
  }

  handleFormSubmit(formData) {
    this.modalToggle();
    this.props.postComment(this.props.campsiteId, formData.rating, formData.author, formData.text);
  }

  // Render
  render() {
    return (
      <>
        <Button outline onClick={this.modalToggle}>
          <i className="fa fa-pencil fa-lg" />{' '}
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.modalToggle}>
          <ModalHeader toggle={this.modalToggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(formData) => this.handleFormSubmit(formData)}>
              <Row>
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Control.select model=".rating" id="rating" className="form-control mb-3">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label htmlFor="author">Your Name</Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Control.text 
                    model=".author" 
                    id="author" 
                    name="author" 
                    className="form-control mb-3" 
                    validators={
                      {required,
                      minLength: minLength(2),
                      maxLength: maxLength(15)}
                    }
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      required: "Required",
                      minLength: "Must be at least 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label htmlFor="text">Comment</Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Control.textarea model=".text" id="text" name="text" className="form-control mb-3" rows="6" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}


// Local Component: <RenderCampsite />
function RenderCampsite({campsite}) {
  return (
    <div className="col-md-5 m-1">
      <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
        <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}


// Local Component: <RenderComments />
function RenderComments({comments, postComment, campsiteId}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {
            comments.map((comment) => {
              return (
                <Fade in key={comment.id}>
                  <p>
                    {comment.text}
                    <br />
                    -- {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                  </p>
                </Fade>
              );
            })
          }
        </Stagger>
        <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  }

  return <div></div>;
}


// Primary Component: <CampsiteInfo />
function CampsiteInfo(props) {

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    )
  }

  if (props.campsite) {
    return (
      <div className="container">

        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>

        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments 
            comments={props.comments}
            postComment={props.postComment}
            campsiteId={props.campsite.id} 
          />
        </div>

      </div>
    );
  } else {
    return <div />
  }

}


export default CampsiteInfo;