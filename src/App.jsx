import './App.scss';
import Navbar from './components/navbar/Navbar';
import Notifications from './components/notifications/Notifications';
import Router from './components/routes/Router';

function App() {
  	return (
    	<div className="App">
			<Navbar />
			{/* <Notifications /> */}
			<Router />
    	</div>
  	);
}

export default App;
