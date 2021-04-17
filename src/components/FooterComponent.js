import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-4 col-sm-2 offset-1">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><Link to='/home'>Home</Link></li>
              <li><Link to='/directory'>Directory</Link></li>
              <li><Link to='/aboutus'>About</Link></li>
              <li><Link to='/contactus'>Contact</Link></li>
            </ul>
          </div>
          <div className="col-6 col-sm-3 text-center">
            <h5>Social</h5>
            <a href="http://instagram.com/" className="btn btn-social btn-instagram">
              <i className="fa fa-instagram"></i>{' '}
            </a>
            <a href="http://facebook.com/" className="btn btn-social btn-facebook">
              <i className="fa fa-instagram"></i>{' '}
            </a>
            <a href="http://twitter.com/" className="btn btn-social btn-twitter">
              <i className="fa fa-instagram"></i>{' '}
            </a>
            <a href="http://youtube.com/" className="btn btn-social btn-youtube">
              <i className="fa fa-instagram"></i>{' '}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}