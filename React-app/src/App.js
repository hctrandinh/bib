import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Home} from './Home';
import {Bib} from './Bib';
import {Maitre} from './Maitre';
import {BibMaitre} from './BibMaitre';
import {NoMatch} from './NoMatch';
import {Layout} from './components/Layout';
import {NavigationBar} from './components/NavigationBar';
import {Jumbotron} from './components/Jumbotron';


class App extends Component {
  render(){
    return(
      <React.Fragment>
        <NavigationBar></NavigationBar>
        <Jumbotron></Jumbotron>
        <Layout>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/bib' component={Bib} />
              <Route path='/maitre' component={Maitre} />
              <Route path='/bibmaitre' component={BibMaitre} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    )
  }
}

export default App;
