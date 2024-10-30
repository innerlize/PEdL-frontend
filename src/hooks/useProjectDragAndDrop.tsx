import { DropResult } from '@hello-pangea/dnd';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { updateProjectOrder } from '../api/projects';
import { Project, AppName } from '../types/Portfolio';
import { useAuth } from './useAuth';

export const useProjectDragAndDrop = (projects: Project[], app: AppName) => {
	const { getCurrentUserToken } = useAuth();
	const [localOrderedProjects, setLocalOrderedProjects] =
		useState<Project[]>(projects);

	useEffect(() => {
		setLocalOrderedProjects(
			[...projects].sort((a, b) => a.order[app] - b.order[app])
		);
	}, [projects, app]);

	const reorderLocalProjectsOnDrop = (sourceIdx: number, destIdx: number) => {
		const reordered = [...localOrderedProjects];
		const [movedProject] = reordered.splice(sourceIdx, 1);
		reordered.splice(destIdx, 0, movedProject);
		return reordered;
	};

	const handleOnDragEnd = useCallback(
		async (result: DropResult) => {
			const { source, destination } = result;
			if (!destination || source.index === destination.index) return;

			const previousLocalProjectsOrder = [...localOrderedProjects];
			const newOrder = reorderLocalProjectsOnDrop(
				source.index,
				destination.index
			);

			setLocalOrderedProjects(newOrder);

			try {
				const token = await getCurrentUserToken();
				await updateProjectOrder(
					newOrder[destination.index].id,
					destination.index + 1,
					app,
					token!
				);
				toast.success(`Project order for "${app}" successfully updated!`, {
					icon: () => '🎉',
					autoClose: 2000
				});
			} catch (err) {
				console.error('Error updating project order: ', err);
				setLocalOrderedProjects(previousLocalProjectsOrder);
				toast.error(
					`Error updating project order for "${app}"! Check the console for more details.`,
					{ autoClose: 2000 }
				);
			}
		},
		[localOrderedProjects, app, getCurrentUserToken]
	);

	return { localProjects: localOrderedProjects, handleOnDragEnd };
};
