import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, renderIntoDocument, scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";
import Register from '../Components/register/Register';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Expect Register rendered properly", () => {
    act(() => {
      render(<Register />, container);
    });
    expect(container).toBeTruthy();
});
  
it("Expect the Form", () => {
    act(() => {
        render(<Register />, container);
    });
    expect(container.querySelector('Form')).toBeTruthy();
});

it("Expect the Register Button", () => {
    act(() => {
        render(<Register />, container);
    });
    expect(container.querySelector('button').textContent).toBe('Register');
});

it("Expect 3 input fields", () => {
    const registerComponent = renderIntoDocument(<Register />);    
    const checkForInputs = scryRenderedDOMComponentsWithTag(registerComponent, 'input');
    expect(checkForInputs.length).toEqual(3);
});

