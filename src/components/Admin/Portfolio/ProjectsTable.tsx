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
			);
		},
		[localProjects, app, getCurrentUserToken]
	);

	useEffect(() => {
		setLocalProjects([...projects].sort((a, b) => a.order[app] - b.order[app]));
	}, [projects, app]);

	return (
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
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}>
										<AdminProjectCard
											id={project.id}
											name={project.name}
											thumbnail={project.thumbnail}
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
	);
};
