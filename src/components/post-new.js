import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';

class PostNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) { // => these props are not the component props, but the form props
        this.props.createPost(props) // (from action creator function)
            .then(() => {
                // blog post has been created, navigate user to index
                this.context.router.push('/');
            });
    }

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
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create New Post</h3>
                <div className={getFormClasses(title)}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}/>
                    <div className="text-help">
                        {title.touched
                            ? title.error
                            : ''}
                    </div>
                </div>
                <div className={getFormClasses(categories)}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                    <div className="text-help">
                        {categories.touched
                            ? categories.error
                            : ''}
                    </div>
                </div>
                <div className={getFormClasses(content)}>
                    <label>Content</label>
                    <textarea className="form-control" {...content}/>
                    <div className="text-help">
                        {content.touched
                            ? content.error
                            : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/" id="cancelBtn" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function getFormClasses(obj) {
    return `form-group ${obj.touched && obj.invalid
        ? 'has-danger'
        : ''}`
}

// values contains a list of fields as defined in export.
// filling errors object and returning it will activate the error for
// that specific field.
function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a title';
    }

    if (!values.categories) {
        errors.categories = 'Enter categories';
    }

    if (!values.content) {
        errors.content = 'Enter content';
    } else if (values.content.length < 50) {
        errors.content = 'Please enter content longer than 50 characters';
    }

    return errors;
}

//redux-form has the same functionality as connect, so it can inject action creators
// connect: 1st property is mapStateToProps, 2nd is mapDispatchToProps
// redux-form: 1st propert is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
    // configuration for reduxform goes here so it knows which
    // inputs to look out for
    form: 'PostNew',
    fields: [
        'title', 'categories', 'content'
    ], //=> will need to be named in the form
    validate //=> validate: validate
}, null, {createPost})(PostNew); // {createPost} is shorthand for mapDispatchToProps
