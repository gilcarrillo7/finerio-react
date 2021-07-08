import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppProvider from "./context/AppContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
	return (
		<Router>
			<Switch>
				<AppProvider>
					<Route exact path={["/", "/login"]} component={Login} />
					<Route exact path={"/dashboard"} component={Dashboard} />
				</AppProvider>
			</Switch>
		</Router>
	);
}

export default App;
