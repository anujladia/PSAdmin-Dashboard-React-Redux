import expect from 'expect';  //Assertion Library
import React from 'react';
import TestUtils from 'react-addons-test-utils';  // Helper library
import CourseForm from './CourseForm';

//return the output of the component under test
function setup(saving) {
  let props = {
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

// describe is used to group & label your test
describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => {
    const { output } = setup();
    expect(output.type).toBe('form');
    let [ h1 ] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('save button is labelled "Save" when not saving', () => {
    const { output } = setup(false);
    let submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labelled "Saving..." when saving', () => {
    const { output } = setup(true);
    let submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  });
});
