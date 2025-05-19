import { Project } from './Project';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useState } from 'react';

function ProjectList({ projects, onSave }) {
    const [projectBeingEdited, setProjectBeingEdited] = useState();

    const handleEdit = (project) => {
        //console.log(project);
        setProjectBeingEdited(project);
    };

    const cancelEditing = () => {
        setProjectBeingEdited(null);
    };

    return (
        <div className="row">
            {projects.map((project) => (
                <div key={project.id} className="cols-sm">
                    <div className="card">
                        {/* <img src={project.imageUrl} alt={project.name} />
                        <section className="section dark">
                            <h5 className="strong">
                                <strong>{project.name}</strong>
                            </h5>
                            <p>{project.description}</p>
                            <p>Budget : {project.budget.toLocaleString()}</p>
                        </section>
                    </div> */}
                        {/* <ProjectCard project={project} onEdit={handleEdit} />
                        <ProjectForm /> */}
                        {project === projectBeingEdited ? (
                            <ProjectForm
                                project={project}
                                onSave={onSave}
                                onCancel={cancelEditing} />
                        ) : (
                            <ProjectCard project={project} onEdit={handleEdit} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
    onSave: PropTypes.func.isRequired
};

export default ProjectList;