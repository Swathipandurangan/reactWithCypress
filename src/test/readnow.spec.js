import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReadNow from '../Components/readNow/ReadNow';

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

it("Expect ReadNow rendered properly", () => {
    act(() => {
      render(<ReadNow />, container);
    });
    expect(container).toBeTruthy();
});

const fakeNews = {
    articles: [{
        title: "React version 18 released",
        author: "Times Now",
        description: "React version 18 released",
        urlToImage: "http://"
    },
    {
        title: "React version 17 released",
        author: "Times Now",
        description: "React version 17 released",
        urlToImage: "http://"
    },
    {
        title: "React version 16 released",
        author: "Times Now",
        description: "React version 16 released",
        urlToImage: "http://"
    },
    {
        title: "React version 15 released",
        author: "Times Now",
        description: "React version 15 released",
        urlToImage: "http://"
    }]
};

it("Expect the news api call", async () => {    
    const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeNews)
        })
    );

    await act(async () => {
        render(<ReadNow />, container);
    });

    expect(fetchSpy).toBeCalled();
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("renders Card Deck", async () => {    
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeNews)
        })
    );

    await act(async () => {
        render(<ReadNow />, container);
    });

    expect(container.querySelector('[data-foo="cardDeck"]')).toBeTruthy();
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("Expect the News Card without Read Later Button", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeNews)
        })
    );

    await act(async () => {
        render(<ReadNow />, container);
    });

    expect(container.querySelector('[data-readlater="readLater"]')).toBe(null);
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

