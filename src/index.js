import { React, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Feed from './feed'
import PrivateRoute  from "./protected_route";
import history from './history';

function Index(){

  const [authenticated, setAuthenticated ] = useState(false);

  return(
    <div className="App">
      <Switch>
        <Route exact path="/" component={()=><Login setAuthenticated={setAuthenticated}/>} />
        <PrivateRoute path="/home" authed={authenticated} component={()=><App setAuthenticated={setAuthenticated}/>}/>
        <Route path="/register" component={Register} />
        <PrivateRoute path="/feed" authed={authenticated} component={Feed} />  
      </Switch>
      </div>
  
  );
}

ReactDOM.render(

  <Router history={history}>
    <Index></Index>
  </Router>,
  document.getElementById('root')
)

