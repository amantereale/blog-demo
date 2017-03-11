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

    renderPosts() {
        return this.props.posts.map((post) => {
            return (
                <li className="list-group-item" key={post.id}>
                    <span className="pull-xs-right">
                        {post.categories}
                    </span>
                    <strong>{post.title}</strong>
                </li>
            );
        });
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
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
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
    return {posts: posts.all};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);
