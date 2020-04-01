import React from "react";
import { shallow } from "enzyme"
import ImagComp from "../ImagComp"
import chai from 'chai'

const assert = chai.assert

it("check greeting", () => {
    const wrapper = shallow(<ImagComp text="Welcome!"/>);
    const greeting = wrapper.find('div.greeting').text();

    expect(greeting).toBe("Welcome!");
});