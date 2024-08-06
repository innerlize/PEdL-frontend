import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TextAreaProvider from './contexts/TextAreaContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';

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
			<TextAreaProvider>
				<RouterProvider router={router} />
			</TextAreaProvider>
		</QueryClientProvider>
	);
}

export default App;
