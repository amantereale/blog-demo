import React, {Component} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';

class PostShow extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.post.id);
    }

    render() {
        const post = this.props.post;

        if (!post) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <div>
                    <Link to="/">&lt; Back to index</Link>
                    <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
                    <h3>{post.title}</h3>
                    <p><strong>{post.categories}</strong></p>
                    <p>{post.content}</p>
                </div>
            );
        }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchPost, deletePost
    }, dispatch);
}

function mapStateToProps({posts}) {
    return {post: posts.post};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
