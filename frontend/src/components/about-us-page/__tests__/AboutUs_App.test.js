import React from "react";
import { mount } from "enzyme"
import AboutUs_App from "../AboutUs_App";

describe("about us tests", function() {
    it("check commits", () => {
        const wrapper = mount(<AboutUs_App />);
        const aboutPage = wrapper.instance();

        expect(wrapper.state('totalNumCommits')).toBe(0)

        aboutPage.componentDidMount();

        let totalCommits = 0
        for(let i = 0; i < 4; i++){
            totalCommits += wrapper.state('numCommits')[i]
        }

        expect(wrapper.state('totalNumCommits')).toBe(totalCommits);
    });
    it("check issues", () => {
        const wrapper = mount(<AboutUs_App />);
        const aboutPage = wrapper.instance();

        expect(wrapper.state('totalNumIssues')).toBe(0)

        aboutPage.componentDidMount();

        let totalIssues = 0
        for(let i = 0; i < 2; i++){
            totalIssues += wrapper.state('numIssues')[i]
        }

        expect(wrapper.state('totalNumIssues')).toBe(totalIssues);
    })
})
