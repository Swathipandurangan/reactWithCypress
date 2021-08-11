import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Header from '../Components/header/Header';

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

it("Expect Header rendered properly", () => {
  act(() => {
    render(<Header />, container);
  });
  expect(container).toBeTruthy();
});

it("Expect the Navbar", () => {
    act(() => {
      render(<Header />, container);
    });
    expect(container.querySelector('[data-navbar="navbar"]')).toBeTruthy();
});

it("Expect the Brand Image", () => {
    act(() => {
      render(<Header />, container);
    });
    expect(container.querySelector('[data-image="brandimage"]')).toBeTruthy();
});

it("Expect the Header Text", () => {
    act(() => {
      render(<Header />, container);
    });
    expect(container.querySelector('[data-navbrand="brand"').textContent).toBe(" News Headlines");
});

it("Expect Nav Link Read Now", () => {
  act(() => {
    render(<Header isReadNow={false} />, container);
  });
  expect(container.querySelector('[data-readnow="readnow"')).toBeTruthy();
});

it("Expect Nav Link Read Now to be null, when the prop isReadNow is false", () => {
  act(() => {
    render(<Header isReadNow={true} />, container);
  });
  expect(container.querySelector('[data-readnow="readnow"')).toBe(null);
});