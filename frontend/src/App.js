import { Container, Card, FormLabel, FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${backendUrl}/tasks/all`);
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

 
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  
  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  // Formularabsendung
  const handleSubmit = async (e) => {
    e.preventDefault(); 

  
    const taskData = {
      title: newTitle,
      description: newDescription
    };

  
    try {
      const response = await fetch(`${backendUrl}/tasks/new`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(taskData), 
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Task added:', result);
        setNewTitle('');
        setNewDescription('');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  }

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${backendUrl}/tasks/delete/${taskId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Task deleted successfully');
        setTasks(tasks.filter(task => task._id !== taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  return (
    <Container>
      <div id="header">
        <h1>Task-Tracker</h1>
        </div>
        <div className="new-task">
          <h2>Add New Task</h2>
          <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter description"
            value={newDescription}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
      <br/>
      <div className="task-grid">
        {tasks.map((task, index) => (
          <Card key={index} className="task-card">
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Card.Text>
                <strong>Status:</strong> {task.completed ? "Completed" : "Not Completed"}
              </Card.Text>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default App;
