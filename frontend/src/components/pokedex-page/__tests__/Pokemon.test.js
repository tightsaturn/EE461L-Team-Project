import React from "react";
import { mount } from "enzyme"
import Pokemon from "../Pokemon";

describe("Pokemon tests", function() {
    let wrapper;
    let tbPage;
    beforeEach(async () => {
        wrapper =  mount(<Pokemon />)
        tbPage = wrapper.instance();
        jest.setTimeout(20000)
    })
    it("check pokemon fetch", async function() {
        await tbPage.fetchOnePokemon(1)

        const pokemonBox = wrapper.state('pokemon')[0][0]
        expect(pokemonBox.props.name).toBe("Bulbasaur")
    });
    it("check capitalize", function(){
        expect(tbPage.capitalize('bulbasaur')).toBe("Bulbasaur")
    })
})
