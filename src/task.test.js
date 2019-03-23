import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Task } from './task';

const task = {
  id: 'react',
  title: 'Learn React',
  description: 'Learn react & redux',
};

describe('Task', () => {
  const onComplete = jest.fn();
  it('should render correctly according to snapshot', () => {
    const element_tree = render(<Task task={task} />);

    expect(element_tree.container).toMatchSnapshot();
  });

  it('should render Title', () => {
    const { getByText } = render(<Task task={task} />);
    expect(getByText(new RegExp(task.title))).toBeDefined();
  });

  it('should invoke onClick', () => {
    const { getByText } = render(<Task task={task} onClick={onComplete} />);

    const component = getByText(/Learn React/);
    console.log('Component: ', component);

    // Click on Task title
    fireEvent.click(component);

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
