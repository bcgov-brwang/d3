import NodeForm from "../components/nodeForm";
import MotionHoc from "./MotionHoc";

const UserComponent = () => {
  // return <h1>User</h1>;
  return <NodeForm/>
};

const User = MotionHoc(UserComponent);

export default User;
