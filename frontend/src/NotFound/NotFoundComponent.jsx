import React, { Component } from 'react'
import './NotFoundCss.css'


class NotFoundComponent extends Component {


    render() {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="error-template">
                            <h1>Oops!</h1>
                            <h2>404 Not Found</h2>
                            <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                            </div>
                            <div className="error-actions">
                            <a href="/" className="btn btn-primary">
                                <i className="icon-home icon-white"></i> Take Me Home 
                            </a>
                            </div>
	                    </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default NotFoundComponent;