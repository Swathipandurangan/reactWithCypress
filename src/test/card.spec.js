
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import NewsCard from '../Components/card/Card';

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

it("Expect NewsCard rendered properly", () => {
    act(() => {
      render(<NewsCard />, container);
    });
    expect(container).toBeTruthy();
});

const isReadNow = false;
const cardData = { title: 'Title', author: 'Author', description: 'Description', urlToImage: 'http://'};
const onReadLater = jest.fn();
it("Expect the Card component", () => {
    act(() => {
        render(<NewsCard isReadNow={isReadNow} card={cardData} readLater={onReadLater} />, container);
    });
    expect(container.querySelector('[data-type="newsCard"]')).toBeTruthy();
});

it("Expect the Card Image", () => {
    act(() => {
        render(<NewsCard isReadNow={isReadNow} card={cardData} readLater={onReadLater} />, container);
    });
    expect(container.querySelector('[data-image="newsCardImage"]')).toBeTruthy();
});

it("Expect the Card Title", () => {
    act(() => {
        render(<NewsCard isReadNow={isReadNow} card={cardData} readLater={onReadLater} />, container);
    });
    expect(container.querySelector('[data-title="newsCardTitle"]').textContent).toBe(cardData.title);
});

it("Expect the Read Later Button", () => {
    act(() => {
        render(<NewsCard isReadNow={isReadNow} card={cardData} readLater={onReadLater} />, container);
    });
    const button = container.querySelector('[data-readlater="readLater"]');
    expect(button.innerHTML).toBe("Read Later");
});

it("Test Read Later Button", () => {
    act(() => {
        render(<NewsCard isReadNow={isReadNow} card={cardData} readLater={onReadLater} />, container);
    });
    const button = container.querySelector('[data-readlater="readLater"]');
    act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onReadLater).toHaveBeenCalledTimes(1);
});