import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';

class PostNew extends Component {
    render() {
        //redux-form gives us some props, one of which is the handleSubmit function
        const {handleSubmit} = this.props; // => same as const handleSubmit = this.props.handleSubmit;

        //in the "fields" prop, redux-form gives us an object that maps with the input once passed into the input
        const {
            fields: {
                title,
                categories,
                content
            }
        } = this.props; // => same as const title = this.props.fields.title;

        // the {...whatever} below deconstructs the object and passes it to the field
        // so that title.onChange="function() {}", for example, becomes onChange="function() {}"
        // in the input itself
        return (
            <form onSubmit={handleSubmit(this.props.createPost)}>
                <h3>Create New Post</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}/>
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea className="form-control" {...content}/>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        );
    }
}

//redux-form has the same functionality as connect, so it can inject action creators
// connect: 1st property is mapStateToProps, 2nd is mapDispatchToProps
// redux-form: 1st propert is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
    // configuration for reduxform goes here so it knows which
    // inputs to look out for
    form: 'PostNew',
    fields: ['title', 'categories', 'content'] //=> will need to be named in the form
}, null, { createPost })(PostNew); // {createPost} is shorthand for mapDispatchToProps
