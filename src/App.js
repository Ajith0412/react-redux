
import './App.css';
import Navbar from './component/navbar';
import AddForm from './component/addTask';
import { Col, Row } from 'react-bootstrap';
import TaskList from './component/TaskList';


function App() {
  return (
    <section >
      <Navbar />
      <Row className="justify-content-md-center">
        <Col lg="4">
          <AddForm />
          <TaskList />
        </Col>
      </Row>

    </section>
  );
}

export default App;
