import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Dashboard from '../Components/dashboard/Dashboard';

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

it("Expect Dashboard rendered properly", () => {
    act(() => {
      render(<Dashboard />, container);
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
        render(<Dashboard />, container);
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
        render(<Dashboard />, container);
    });

    expect(container.querySelector('[data-foo="cardDeck"]')).toBeTruthy();
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("Expect the News Card with Title", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeNews)
        })
    );

    await act(async () => {
        render(<Dashboard />, container);
    });

    expect(container.querySelector('[data-title="newsCardTitle"]').textContent).toBe(fakeNews.articles[0].title);
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("Expect the News Card with Read Later Button", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeNews)
        })
    );

    await act(async () => {
        render(<Dashboard />, container);
    });

    expect(container.querySelector('[data-readlater="readLater"]')).toBeTruthy();
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("Expect as many News Cards as Headlines", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeNews)
        })
    );

    await act(async () => {
        render(<Dashboard />, container);
    });

    expect(container.querySelectorAll('[data-type="newsCard"]').length).toBe(4);
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("Test No of Rows, considering 3 per Row", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeNews)
        })
    );

    await act(async () => {
        render(<Dashboard />, container);
    });

    let expectedRows = 1;
    if (fakeNews.articles.length > 3) {
        const remainder = fakeNews.articles.length % 3;
        expectedRows = remainder > 0 ? (Math.floor(fakeNews.articles.length/3) + 1) : fakeNews.articles.length/3;
    }

    expect(container.querySelectorAll('[data-foo="cardsRow"]').length).toBe(expectedRows);
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});