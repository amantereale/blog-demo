import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';

class PostShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.post.id).then(() => {
            this.context.router.push('/');
        });
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
                    <p>
                        <strong>{post.categories}</strong>
                    </p>
                    <p>{post.content}</p>
                </div>
            );
        }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchPost,
        deletePost
    }, dispatch);
}

function mapStateToProps({posts}) {
    return {post: posts.post};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
