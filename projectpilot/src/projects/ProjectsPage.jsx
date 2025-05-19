
//import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';
import { useState, useEffect } from 'react';
import { projectAPI } from './projectAPI';


function ProjectsPage() {
    //const [projects, setProjects] = useState(MOCK_PROJECTS);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const saveProject = (project) => {
        //console.log('Saving project: ', project);
        let updatedProjects = projects.map((p) => {
            return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
    };

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                //const data = await projectAPI.get(1);
                const data = await projectAPI.get(currentPage);
                setError(null);
                //setProjects(data);
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data]);
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage]);

    return (
        <>
            <h1>Projects</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse "></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}

            {/* <ProjectList projects={MOCK_PROJECTS} onSave={saveProject} /> */}
            <ProjectList onSave={saveProject} projects={projects} />
            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </>
    );
}

export default ProjectsPage;
