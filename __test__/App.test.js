import renderer from 'react-test-renderer';
import { TestSnapshot } from '../src/components/App.jsx';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <TestSnapshot page="http://www.facebook.com">Facebook</TestSnapshot>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
