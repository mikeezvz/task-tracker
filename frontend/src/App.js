import { Container, Card } from 'react-bootstrap';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks/all');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error('Can not fetch API', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Container>
      <div id="header">
        <h1>Task-Tracker</h1>
      </div>
      <div className="task-grid">
        {tasks.map((task, index) => (
          <Card key={index} className="task-card">
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Card.Text>
                <strong>Status:</strong> {task.completed ? "Completed" : "Not Completed"}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default App;
