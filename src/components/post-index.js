import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from '../actions/index';

class PostIndex extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { // => runs automagically when the component is shown
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>Blog post list</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPosts}, dispatch);
}

function mapStateToProps({posts}) {
    return {posts};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);
