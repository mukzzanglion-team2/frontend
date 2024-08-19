import React, { useState } from 'react';

interface ResultQuoteProps {
  imageUrl: string;
  quote: string;
  author: string;
  isLike: boolean;
  description: string;
  handleLike: () => void;
}

const ResultQuote = ({
  imageUrl,
  quote,
  author,
  isLike,
  description,
  handleLike,
}: ResultQuoteProps) => {
  const [flipped, setFlipped] = useState(false);

  const onClickCard = () => {
    setFlipped(!flipped);
  };

  const onClickLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 막기
    handleLike();
  };

  const fetchedDescription = () => {
    return description.split('.')[0];
  };

  return (
    <div>
      <div
        tabIndex={0}
        role="button"
        onClick={onClickCard}
        onKeyDown={onClickCard}
        className="perspective-1100 relative p-10 flex items-center justify-center w-full h-[200px] rounded-xl"
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0 rounded-xl"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div
          className={`transition-md h-full relative transformStyle-preserve-3d ${flipped ? 'transform-rotY180' : ''}`}
        >
          <div className="backface-hidden h-full flex justify-center align-middle">
            <div className="flex flex-col gap-[20px] z-10 h-full items-center">
              <span className="text-center font-bold">{quote}</span>
              <span className="text-center font-bold">{author}</span>
            </div>
          </div>

          <div className="transform-rotY180 h-full flex w-full justify-center absolute top-5 [text-shadow:_10px_10px_7px_rgb(0,0,0,50%)] backface-hidden">
            <span className="text-center font-bold block">
              {fetchedDescription()}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClickLike}
          className="absolute top-[15px] right-[15px] z-30"
        >
          <img
            src={isLike ? '/icons/heart-solid.svg' : '/icons/heart-white.svg'}
            alt="찜"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
};

export default ResultQuote;
