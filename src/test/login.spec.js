import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from "react-dom/test-utils";
import Login from '../Components/login/Login';

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

it("Expect Login rendered properly", () => {
    act(() => {
      render(<Login />, container);
    });
    expect(container).toBeTruthy();
});
  
it("Expect the Form", () => {
    act(() => {
        render(<Login />, container);
    });
    expect(container.querySelector('Form')).toBeTruthy();
});

it("Expect the Register Button", () => {
    act(() => {
        render(<Login />, container);
    });
    expect(container.querySelector('[data-type="registerButton"]')).toBeTruthy();
});

it("Expect username invalid form error", () => {
    const loginComponent = renderIntoDocument(<Login />);    
    const checkForInputs = scryRenderedDOMComponentsWithTag(loginComponent, 'input');
    expect(checkForInputs.length).toBe(2);
    const userName = checkForInputs[0];
    userName.value = "hh";
    Simulate.change(userName, { bubbles: true });
    expect(loginComponent.state.formErrors.username).toEqual("is invalid");
});

it("Expect password invalid form error", () => {
    const loginComponent = renderIntoDocument(<Login />);    
    const checkForInputs = scryRenderedDOMComponentsWithTag(loginComponent, 'input');
    expect(checkForInputs.length).toBe(2);
    const password = checkForInputs[1];
    password.value = "hh";
    Simulate.change(password, { bubbles: true });
    // let changeEvent = new Event("change", { bubbles: true });
    // act(() => {
    //     password.dispatchEvent(changeEvent);
    // });
    expect(loginComponent.state.formErrors.password).toEqual("is too short");
});
