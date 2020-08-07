import { shallowMount } from "@vue/test-utils";
import Plant from "@/components/Plant.vue";

describe("Plant.vue", () => {
  it("renders props.plant when passed", () => {
    const plant = {
      name: "Test plant",
      joinedat: "2020-01-01"
    };
    const wrapper = shallowMount(Plant, {
      propsData: { plant }
    });
    expect(wrapper.text()).toMatch(plant);
  });
});
