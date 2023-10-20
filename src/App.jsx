import './App.scss';
import Navbar from './components/navbar/Navbar';
import Router from './components/routes/Router';

function App() {
  	return (
    	<div className="App">
			<Navbar />
			<Router />
    	</div>
  	);
}

export default App;
