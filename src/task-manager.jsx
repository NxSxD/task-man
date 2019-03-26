// Dependencies
import React from 'react';
import styled from 'styled-components';
import { Task } from './task';
import AddTask from './AddTask';
import uuid from 'uuid';

// LOGIC
export class TaskManager extends React.Component {
  state = {
    tasks: [],
    completed: [],
    id: '',
    title: '',
    description: '',
    };

  onTaskClick = completedTaskId => {
    console.log('Completed Task ID: ', completedTaskId);
    const { tasks, completed} = this.state;

    const newTaskList = tasks.filter(task => task.id !== completedTaskId);
    console.log('New Task List: ', newTaskList);

    const completedTask = tasks.find(task => task.id === completedTaskId);

    this.setState({
      tasks: newTaskList,
      completed: [...completed, completedTask],
    });
  };

  onUndo = undoTaskId => {
    console.log('Undo Task ID: ', undoTaskId);
    const { tasks, completed } = this.state;

    const undoTask = completed.find(task => task.id === undoTaskId);
    console.log('Undo Task: ', undoTask);

    const newCompletedList = completed.filter(task => task.id !== undoTaskId);
    console.log('New Completed Task: ', newCompletedList);

    this.setState({
      tasks: [...tasks, undoTask],
      completed: newCompletedList,
    });
  };

  resetForm = () => {
    this.setState({
      id: '',
      title: '',
      description: ''
    });
  }

  idIncrementer = () => {
    let incrementer = 0;
    return ++incrementer;
  }

  onChangeHandler = event => {
    this.setState({
        [event.target.name]: event.target.value
    })
    console.log('On Change' + this.state)
  }

  onSubmitHandler = event => {
    event.preventDefault();
    const {tasks, title, description} = this.state;
    this.setState({
        tasks: [...tasks, {id: uuid(), title, description}]
    });
    this.resetForm()
  }

  render() {
    const { tasks, completed} = this.state;

    return (
      <Container>
        <Sidebar>
          <AddTask task={this.state} onChange={this.onChangeHandler} onSubmit={this.onSubmitHandler}/>
        </Sidebar>
        <ContentContainer>
          <Content>
            {tasks &&
              tasks
                .sort((a, b) => a.id > b.id)
                .map(task => (
                  <Task
                    key={task.id}
                    task={task}
                    onClick={this.onTaskClick}
                  />
                ))}
          </Content>
          {console.log(tasks)}
          <BottomBar>
            {completed &&
              completed.map(completedTask => (
                <Task
                  key={completedTask.id}
                  task={completedTask}
                  onDoubleClick={() => this.onUndo(completedTask.id)}
                />
              ))}
          </BottomBar>
        </ContentContainer>
      </Container>
    );
  }
}

// CSS
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.div`
  background: pink;
  flex: 1;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    margin-bottom: 5px;
    width: 90%;
  }

  input[type="button"]{
    cursor: pointer;
  }
  
`;

const ContentContainer = styled.div`
  background: lightblue;
  flex: 5;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  background: gray;
  flex: 4;
  display: flex;
  flex-direction: row;
`;

const BottomBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;
