import { Route, Switch, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import Home from "./Pages/Home";
import User from "./Pages/User";
import Calender from "./Pages/Calender";
import Documents from "./Pages/Documents";
import Projects from "./Pages/Projects";
import ApplicationList from "./Pages/ApplicationList";
import Device from "./Pages/Device";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Application from "./components/application";
import EditApplicationForm from "./components/editApplicationForm";

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function App() {
  const location = useLocation();
  return (
    <>
      <Sidebar />
      <Pages>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/calender" component={Calender} />
            <Route path="/documents" component={Documents} />
            <Route path="/projects" component={Projects} />
            <Route path="/devices" component={ApplicationList} />
            <Route path="/device/:id" component={Device} />
            <Route path="/specific/:name" component={Application} />
            <Route path="/applications/:name" component={EditApplicationForm} />
          </Switch>
        </AnimatePresence>
      </Pages>
    </>
  );
}

export default App;
