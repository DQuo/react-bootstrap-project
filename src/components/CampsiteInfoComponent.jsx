import React, {Component} from 'react';
import {Button, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
    this.modalToggle = this.modalToggle.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  modalToggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen})
  }

  handleFormSubmit(formData) {
    console.log("Current state is: " + JSON.stringify(formData));
    alert("Current state is: " + JSON.stringify(formData));
  }

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


function RenderCampsite({campsite}) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardTitle>{campsite.name}</CardTitle>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({comments}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <>
              <p>
                {comment.text}
                <br />
                -- {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
              </p>
            </>
          );
        })}
        <CommentForm />
      </div>
    );
  }

  return <div></div>;
}


function CampsiteInfo(props) {

  const render = ( 
    props.campsite ? 
      ( 
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
            <RenderComments comments={props.comments} />
          </div>
        </div>
      ) : 
      ( 
        <div>

        </div> 
      ) 
  );

    return render;
}


export default CampsiteInfo;