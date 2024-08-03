import TextAreaProvider from './contexts/TextAreaContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';


function App() {
	return (
			<TextAreaProvider>
				<RouterProvider router={router} />
			</TextAreaProvider>
	);
}

export default App;
