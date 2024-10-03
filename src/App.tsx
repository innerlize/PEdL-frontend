import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TextAreaProvider from './contexts/TextAreaContext';
import ConfirmModalProvider from './contexts/ConfirmModalContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false
		}
	}
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ConfirmModalProvider>
					<TextAreaProvider>
						<RouterProvider router={router} />
					</TextAreaProvider>
				</ConfirmModalProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
