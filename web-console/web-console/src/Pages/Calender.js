import BarChart from "../components/barChart";
import MotionHoc from "./MotionHoc";

const CalenderComponent = () => {
  // return <h1>Calender</h1>;
  return <BarChart/>;
};

const Calender = MotionHoc(CalenderComponent);

export default Calender;
