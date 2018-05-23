import expect from 'expect';  //Assertion Library
import React from 'react';
import {mount, shallow} from 'enzyme';  // Helper library
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage Course Form', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      authors: [],
      course: {id: '', watchHref:'', title: '', authorId: '', lenght: '', category: ''},
      actions: {saveCourse: () => {return Promise.resolve(); }}
    };

    const wrapper = mount(<ManageCoursePage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be atleast 5 characters.');
  });
});
