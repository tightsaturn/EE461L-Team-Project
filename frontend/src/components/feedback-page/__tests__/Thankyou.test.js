import React from "react";
import { shallow } from "enzyme"
import Thankyou from "../Thankyou"
import chai from 'chai'

const assert = chai.assert

it("check thank you message", () => {
    const wrapper = shallow(<Thankyou />);
    const message = wrapper.find('h1').text();

    expect(message).toBe("Thank you for your feedback!");
});