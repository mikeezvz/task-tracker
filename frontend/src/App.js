import { Container, Row, Col, Card } from 'react-bootstrap';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks/all');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          setTasks(null);
        }
      } catch (error) {
        console.error('Can not fetch API', error);
      }
    };
  
    fetchTasks();
  }, []); 
  

  return (
    <Container>
      <Row>
        <Col>
          <div id="header">
            Task-Tracker
          </div>
        </Col>
        <Row>
        {tasks.map((task, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>
                  <strong>Status:</strong> {task.completed ? "Completed" : "Not Completed"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
        
      </Row>
    </Container>
  );
}

export default App;
