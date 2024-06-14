import { mount, shallowMount } from "@vue/test-utils";
import DemoComponent from "~/components/DemoComponent.vue";

function mountComponent<T>(component: T) {
  return mount(component);
}

type WrapperType<T> = ReturnType<typeof mountComponent<T>>;

describe("DemoComponent", () => {
  let wrapper: WrapperType<typeof DemoComponent>;

  beforeEach(() => {
    wrapper = shallowMount(DemoComponent);
  });

  test("render DemoComponent", () => {
    expect(wrapper.text()).toContain("This is a text");
  });
});
