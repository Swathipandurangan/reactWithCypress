import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Footer from '../Components/footer/Footer';

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

it("Expect Footer rendered properly", () => {
    act(() => {
      render(<Footer />, container);
    });
    expect(container).toBeTruthy();
});
  
it("Expect the Navbar", () => {
    act(() => {
        render(<Footer />, container);
    });
    expect(container.querySelector('[data-foo="footerNavbar"]')).toBeTruthy();
});
  
it("Expect No Brand Image", () => {
    act(() => {
        render(<Footer />, container);
    });
    expect(container.querySelector('[data-foo="brandImage"]')).toBe(null);
});
  
it("Expect the CopyRight Text", () => {
    act(() => {
        render(<Footer />, container);
    });
    expect(container.textContent).toBe("News Headlines@Copyright");
});