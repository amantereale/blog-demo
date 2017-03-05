import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';

const Greeting = () => {
    return <div>Welcome to React</div>;
};

// children components are passed to the parent in this.props.children
export default(
    <Route path="/" component={App}>
        <Route path="greet" component={Greeting}/>
        <Route path="greet2" component={Greeting}/>
        <Route path="greet3" component={Greeting}/>
    </Route>
);
