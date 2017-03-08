import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from '../actions/index';
import {Link} from 'react-router';

class PostIndex extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { // => runs automagically when the component is shown
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/post/new" className="btn btn-primary">
                    Add New Post
                    </Link>
                </div>
                <h3>Blog Post List</h3>
                <div>[Blog post list goes here]</div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchPosts
    }, dispatch);
}

function mapStateToProps({posts}) {
    return {posts};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);
