import { useProjectDragAndDrop } from '../../../hooks/useProjectDragAndDrop';
import { AppName, Project } from '../../../types/Portfolio';
import { AdminProjectCard } from './ProjectCard';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import clsx from 'clsx';

interface AdminProjectsListProps {
	projects: Project[];
	app: AppName;
}

export const AdminProjectsList: React.FC<AdminProjectsListProps> = ({
	projects,
	app
}) => {
	const { localProjects, handleOnDragEnd } = useProjectDragAndDrop(
		projects,
		app
	);

	return (
		<div className='flex flex-col gap-4 justify-center items-center'>
			<h2
				className={clsx(
					'text-sm font-bold text-center uppercase mb-4 tracking-widest md:text-lg lg:text-xl 2xl:text-2xl',
					app === 'pedl' ? 'text-primary' : 'text-secondary'
				)}>
				{app} Projects
			</h2>

			<div data-test={`${app}-projects-list`}>
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
												data-test='projects-list-item'
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
		</div>
	);
};
