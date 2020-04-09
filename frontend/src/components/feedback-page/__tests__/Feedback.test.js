import React from "react";
import { shallow } from "enzyme"
import Feedback from "../Feedback"
import chai from 'chai'


it("check feedback form", () => {
    const wrapper = shallow(<Feedback />);
    const emailForm = wrapper.find('#exampleFormControlInput1');

    expect(emailForm.text()).toBe("");
});