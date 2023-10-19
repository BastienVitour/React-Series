import './App.scss';
import Notifications from './components/notifications/Notifications';
import Router from './components/routes/Router';

function App() {
  	return (
    	<div className="App">
			<Notifications />
			<Router />
    	</div>
  	);
}

export default App;