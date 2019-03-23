// Dependencies
import React from 'react';
import styled from 'styled-components';
import { Task } from './task';

// LOGIC
export class TaskManager extends React.Component {
  state = {
    tasks: [
      {
        id: 'react',
        title: 'Learn React',
        description: 'Learn reactjs & redux',
      },
      { id: 'angular', title: 'Learn Angular', description: 'Learn angularjs' },
      {
        id: 'vue',
        title: 'Learn Vue',
        description: 'Learn vue and all its stuff',
      },
    ],
    completed: [],
  };

  onTaskClick = completedTaskId => {
    console.log('Completed Task ID: ', completedTaskId);
    const { tasks, completed } = this.state;

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

  render() {
    const { tasks, completed } = this.state;

    return (
      <Container>
        <Sidebar>Add Task</Sidebar>
        <ContentContainer>
          <Content>
            {tasks &&
              tasks
                .sort((a, b) => a.id > b.id)
                .map(task => (
                  <Task
                    key={task.id}
                    task={task}
                    onClick={() => this.onTaskClick(task.id)}
                  />
                ))}
          </Content>
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
