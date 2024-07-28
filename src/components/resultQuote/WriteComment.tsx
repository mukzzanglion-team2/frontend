import React, { ChangeEvent, useState } from 'react';

const WriteComment = () => {
  const [comment, setComment] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleClick = () => {
    console.log(comment);
    // 댓글 post 요청
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <span className="text-sm font-semibold">댓글</span>
      <div className="relative w-[260px] h-[110px] border border-gray-200 rounded-xl p-3">
        <textarea
          className="w-[236px] h-[50px] resize-none outline-none scrollbar-hide text-xs"
          placeholder="댓글 작성하기"
          value={comment}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute right-3 bottom-3 border border-gray-200 rounded-xl w-[60px] h-[30px] text-xs"
          onClick={handleClick}
        >
          입력
        </button>
      </div>
    </div>
  );
};

export default WriteComment;
