import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TextAreaProvider from './contexts/TextAreaContext';
import ConfirmModalProvider from './contexts/ConfirmModalContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false
		}
	}
});

function App() {
	return (
		<>
			<ToastContainer />

			<QueryClientProvider client={queryClient}>
				<ConfirmModalProvider>
					<TextAreaProvider>
						<RouterProvider router={router} />
					</TextAreaProvider>
				</ConfirmModalProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
