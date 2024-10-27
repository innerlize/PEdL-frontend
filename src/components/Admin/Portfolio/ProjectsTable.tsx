import { Project } from '../../../types/Portfolio';
import { AdminProjectCard } from './ProjectCard';
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult
} from '@hello-pangea/dnd';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { updateProjectOrder } from '../../../api/projects';
import clsx from 'clsx';
import { toast } from 'react-toastify';

interface AdminProjectsTableProps {
	projects: Project[];
	app: 'pedl' | 'cofcof';
}

export const AdminProjectsTable: React.FC<AdminProjectsTableProps> = ({
	projects,
	app
}) => {
	const [localProjects, setLocalProjects] = useState(
		[...projects].sort((a, b) => a.order[app] - b.order[app])
	);
	const { getCurrentUserToken } = useAuth();

	const handleOnDragEnd = useCallback(
		async (result: DropResult) => {
			const { source, destination } = result;
			if (!destination || source.index === destination.index) return;

			const previousProjects = [...localProjects];

			const reorderedProjects = [...localProjects];

			const [movedProject] = reorderedProjects.splice(source.index, 1);

			reorderedProjects.splice(destination.index, 0, movedProject);
			setLocalProjects(reorderedProjects);

			const token = await getCurrentUserToken();

			await updateProjectOrder(
				movedProject.id,
				destination.index + 1,
				app,
				token!
			)
				.then(() => {
					toast.success(`Project order for "${app}" successfully updated!`, {
						icon: () => '🎉',
						autoClose: 2000
					});
				})
				.catch(err => {
					console.error('Error updating project order: ', err);
					setLocalProjects(previousProjects);
					toast.error(
						`Error updating project order for "${app}"! Check the console for more details.`,
						{ autoClose: 2000 }
					);
				});
		},
		[localProjects, app, getCurrentUserToken]
	);

	useEffect(() => {
		setLocalProjects([...projects].sort((a, b) => a.order[app] - b.order[app]));
	}, [projects, app]);

	return (
		<div className='flex flex-col gap-4 justify-center items-center'>
			<h2
				className={clsx(
					'text-sm font-bold text-center uppercase mb-4 tracking-widest md:text-lg lg:text-xl 2xl:text-2xl',
					app === 'pedl' ? 'text-primary' : 'text-secondary'
				)}>
				{app} Projects
			</h2>

			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId={`${app}-projects-order`}>
					{provided => (
						<ul ref={provided.innerRef} {...provided.droppableProps}>
							{localProjects.map((project, index) => (
								<Draggable
									key={project.id}
									draggableId={project.id}
									index={index}>
									{provided => (
										<li
											className='mb-4'
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}>
											<AdminProjectCard
												id={project.id}
												name={project.name}
												thumbnail={project.thumbnail}
												app={app}
											/>
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};
