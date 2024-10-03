import React, { createContext, useEffect, useState } from 'react';
import {
	auth,
	provider,
	signInWithPopup,
	FirebaseUser
} from '../config/firebase';
import { revokeToken, verifyAdminAccess } from '../api/auth';
import { AxiosError } from 'axios';

interface AuthContextType {
	signInWithGoogle: () => Promise<void>;
	user: FirebaseUser | null;
	getCurrentUserToken: () => Promise<string | undefined>;
	logout: () => Promise<void>;
	loading: boolean;
	error: string | null;
	setError: (error: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [user, setUser] = useState<FirebaseUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			handleError(error);
		}
	};

	const getCurrentUserToken = async (): Promise<string | undefined> => {
		if (!auth.currentUser) return undefined;

		return await auth.currentUser.getIdToken();
	};

	const logout = async () => {
		try {
			const token = await getCurrentUserToken();

			if (!token) throw new Error('No token found');

			await revokeToken(token);
			await auth.signOut();

			setUser(null);
			setError(null);
		} catch (error) {
			handleError(error);
		}
	};

	const handleError = (error: unknown) => {
		if (error instanceof AxiosError) {
			setError(error.response?.data.message);
		} else if (error instanceof Error) {
			setError(error.message);
		} else {
			setError('Unknown error');
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async currentUser => {
			try {
				if (currentUser) {
					const token = await currentUser.getIdToken();

					await verifyAdminAccess(token);

					setUser(currentUser);
				} else {
					setUser(null);
				}
			} catch (error) {
				handleError(error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signInWithGoogle,
				user,
				getCurrentUserToken,
				logout,
				loading,
				error,
				setError
			}}>
			{loading ? <p>Loading...</p> : children}
		</AuthContext.Provider>
	);
};
