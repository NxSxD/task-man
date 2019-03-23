import React from 'react';
import styled from 'styled-components';

export const Task = ({ task, ...restOfProps }) => {
  return (
    <TaskContainer {...restOfProps}>
      <TaskTitle>{task.title}</TaskTitle>
      <TaskDescription>{task.description}</TaskDescription>
    </TaskContainer>
  );
};

const TaskContainer = styled.div`
  margin: 8px;
  background: #fff;
  height: 120px;
  width: 120px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const TaskTitle = styled.span`
  font-size: 18px;
  color: #444;
`;

const TaskDescription = styled.span`
  font-size: 14px;
  color: #666;
`;
