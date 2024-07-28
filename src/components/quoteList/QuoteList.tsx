import React, { useState } from 'react';
import { mockData } from './temporaryMockData';
import QuoteItem from './QuoteItem';

const QuoteList = () => {
  const [data, setData] = useState(mockData);
  const [loadMore, setLoadMore] = useState(5);

  const onClickHeart = (targetId: number, heart: boolean) => {
    setData(
      data.map((element) => {
        if (element.id === targetId && !heart)
          return { ...element, likes: element.likes + 1 };
        if (element.id === targetId && heart)
          return { ...element, likes: element.likes - 1 };
        return { ...element };
      }),
    );
  };

  const filteredData = () => {
    return data.filter((element) => element.id < loadMore);
  };

  return (
    <form className="p-3 flex flex-col gap-2  bg-yellow-FF">
      <div className="px-3 my-4 text-xl flex justify-between">
        <h2>명언</h2>
        <div>셀렉트바(키워드 필터)</div>
      </div>
      <section>
        <ul>
          {filteredData().map((element) => (
            <div key={element.id} className="flex flex-col mb-12 mx-4 gap-8">
              <li>
                <QuoteItem element={element} onClickHeart={onClickHeart} />
              </li>
              {element.id === loadMore - 1 && element.id !== data.length - 1 ? (
                <button
                  className="border rounded-lg bg-black text-white p-3"
                  type="button"
                  onClick={() => setLoadMore(loadMore + 5)}
                >
                  더보기
                </button>
              ) : null}
            </div>
          ))}
        </ul>
      </section>
    </form>
  );
};

export default QuoteList;
