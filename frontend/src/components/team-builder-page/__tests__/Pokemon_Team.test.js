import React from "react";
import { mount } from "enzyme"
import Pokemon_Team from "../Pokemon_Team";

describe("Teambuilder tests", function() {
    it("check number of pokemon", function() {
        const wrapper = mount(<Pokemon_Team />);
        const tbPage = wrapper.instance();
        expect(wrapper.state('pokemonCards').length).toBe(6)
    });
    it("check reset button", function() {
        const wrapper = mount(<Pokemon_Team/>)
        const tbPage = wrapper.instance();
        tbPage.resetTeam()

        for(let i = 0; i < 6; i++){
            expect(wrapper.state('pokemonCards')[i].name).toBe("Who's that Pokemon?")
        }
    })
})

