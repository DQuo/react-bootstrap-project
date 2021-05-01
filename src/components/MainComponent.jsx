// Imports: React, React-Redux, React-Router
import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

// Imports: Components
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';


// Redux: Dispatch To Props
const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions())
}

// Redux: State To Props
const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

// Primary Component: <Main />
class Main extends Component {

  // Mount
  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
  }

  render() {

    // Local Component: <HomePage />
    const HomePage = () => {
      return (
        <Home
          campsite={this.props.campsites.campsites.filter((campsite) => campsite.featured)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
          promotionLoading={this.props.promotions.isLoading}
          promotionErrMess={this.props.promotions.errMess}
          partner={this.props.partners.filter((partner) => partner.featured)[0]}
        />
      );
    };

    // Local Component: <CampsiteWithId /> | <CampsiteInfo /> | React Router
    const CampsiteWithId = ({match}) => {
      return (
        <CampsiteInfo 
          campsite={this.props.campsites.campsites.filter((campsite) => campsite.id === +match.params.campsiteId)[0]}
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.campsiteId === +match.params.campsiteId)}
          commentsErrMess={this.props.comments.errMess}
          addComment={this.props.addComment}
        />
      )
    }

    // Return 
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/directory" render={() => { return <Directory campsites={this.props.campsites} />; }} />
          <Route path='/directory/:campsiteId' component={CampsiteWithId} />
          <Route path='/aboutus' render={() => <About partners={this.props.partners} />} />
          <Route exact path="/contactus" render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// Export: <Main />
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));