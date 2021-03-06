import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';

const FIELDS = {
    title: {
        type: 'input',
        label: 'Title',
        error: 'Please enter a title'
    },
    categories: {
        type: 'input',
        label: 'Categories',
        error: 'Please enter categories'
    },
    content: {
        type: 'textarea',
        label: 'Post Content',
        error: 'Please enter some content'
    }
} //['title', 'categories', 'content'];

class PostNew extends Component {
    static contextTypes = { // => get access to the context used by the router for redirecting
        router: PropTypes.object
    };

    onSubmit(props) { // => these props are not the component props, but the form props
        this.props.createPost(props). // (from action creator function)
        then(() => {
            // blog post has been created, navigate user to index
            this.context.router.push('/');
        });
    }

    renderField(fieldConfig, field) {
        const fieldHelper = this.props.fields[field];

        return (
            <div className={getFormClasses(fieldHelper)} key={fieldConfig.label}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
                <div className="text-help">
                    {fieldHelper.touched
                        ? fieldHelper.error
                        : ''}
                </div>
            </div>
        );
    }

    render() {
        //redux-form gives us some props, one of which is the handleSubmit function
        const {handleSubmit} = this.props; // => same as const handleSubmit = this.props.handleSubmit;

        // the {...whatever} below deconstructs the object and passes it to the field
        // so that title.onChange="function() {}", for example, becomes onChange="function() {}"
        // in the input itself
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create New Post</h3>
                {_.map(FIELDS, this.renderField.bind(this))}

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
    _.each(FIELDS, (type, field) => {
        if (!values[field]) {
            errors[field] = type.error;
        }
    });
    return errors;
}

//redux-form has the same functionality as connect, so it can inject action creators
// connect: 1st property is mapStateToProps, 2nd is mapDispatchToProps
// redux-form: 1st propert is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
    // configuration for reduxform goes here so it knows which
    // inputs to look out for
    form: 'PostNew',
    fields: _.keys(FIELDS), //=> returns an array of keys in the object
    validate //=> validate: validate
}, null, {createPost})(PostNew); // {createPost} is shorthand for mapDispatchToProps
