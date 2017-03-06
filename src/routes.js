import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import PostIndex from './components/post-index';
import PostNew from './components/post-new';

// children components => are passed to the parent in this.props.children
// IndexRoute => the component to show if the route matches the parent but not the children
export default(
    <Route path="/" component={App}>
        <IndexRoute component={PostIndex}/>
        <Route path="/post/new" component={PostNew}/>
    </Route>
);
