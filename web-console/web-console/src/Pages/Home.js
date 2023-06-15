import Application from "../components/application";
import MotionHoc from "./MotionHoc";

const HomeComponent = () => {
  return <Application/>;
};

const Home = MotionHoc(HomeComponent);

export default Home;
