import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
import './index.css';
import TextAreaProvider from './contexts/TextAreaContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<TextAreaProvider>
			<RouterProvider router={router} />
		</TextAreaProvider>
	</React.StrictMode>
);

reportWebVitals();
