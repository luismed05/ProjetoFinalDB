import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignInPage from './Pages/SignInPage';
import LadingPage from './Pages/LadingPage';
import SignUpPage from './Pages/SignUpPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignInPage}/>
        <Route path="/home" exact component={LadingPage}/>
        <Route path="/Cadastrar" exact component={SignUpPage}/>

      </Switch>
    </Router>
  );
}

export default App;
