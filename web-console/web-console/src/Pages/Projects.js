import ApplicationForm from "../components/applicationForm";
import MotionHoc from "./MotionHoc";

const ProjectsComponent = () => {
  // return <h1>Projects</h1>;
  return <ApplicationForm/>
};

const Projects = MotionHoc(ProjectsComponent);

export default Projects;
