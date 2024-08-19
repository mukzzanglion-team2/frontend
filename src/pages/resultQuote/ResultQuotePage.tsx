import { instance } from 'api/instance';
import Button from 'components/common/Button';
import { QuoteImage } from 'components/common/constants/QuoteImage';
import Comment from 'components/resultQuote/Comment';
import ResultQuote from 'components/resultQuote/ResultQuote';
import WriteComment from 'components/resultQuote/WriteComment';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface UserType {
  email: string;
  id: number;
  nickname: string;
  profile_image: string;
}

interface CommentType {
  id: number;
  quote: number;
  content: string;
  created_at: string;
  user: UserType;
}

const ResultQuotePage = () => {
  const [isLike, setIsLike] = useState(false);
  const isLikeRef = useRef(isLike); // useRef로 isLike 값을 저장할 ref 생성
  const [quoteData, setQuoteData] = useState({
    author: '',
    content: '',
    description: '',
    image: '',
  });
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState('');
  const [imageURL, setImageURL] = useState('');
  const isLoggedIn = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        try {
          const quoteResponse = await instance.get(`quote/${id}/`);
          setQuoteData({
            author: quoteResponse.data.author,
            content: quoteResponse.data.content,
            description: quoteResponse.data.description,
            image: quoteResponse.data.image,
          });
          setImageURL(
            quoteResponse.data.image ||
              QuoteImage[Math.floor(Math.random() * QuoteImage.length)],
          );
        } catch (error) {
          alert(error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    isLikeRef.current = isLike;

    return () => {
      const fetchLiked = async () => {
        if (isLikeRef.current) {
          try {
            const headers = {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            };

            const response = await instance.post(
              `quote/${id}/like/`,
              {},
              {
                headers,
              },
            );
            if (response.status === 200) {
              console.log('성공');
            }
          } catch (error) {
            alert(error);
          }
        }
      };
      fetchLiked();
    };
  }, [isLike]); // id가 변경될 때마다 useEffect 재실행

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentResponse = await instance.get(`quote/${id}/comment/`);
        setCommentData(commentResponse.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, [comment]);

  const handleClick = async () => {
    navigate('/userList');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCommentClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };

      const response = await instance.post(
        `quote/${id}/comment/`,
        { content: comment },
        {
          headers,
        },
      );
      if (response.status === 200) {
        setComment('');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLike = () => {
    setIsLike(!isLike);
    console.log(commentData);
  };

  return (
    <div className="flex flex-col items-center p-[30px] gap-[30px]">
      <div className="flex flex-col gap-[20px] w-full rounded-xl bg-white shadow-custom p-5">
        <ResultQuote
          imageUrl={imageURL}
          quote={quoteData.content}
          author={quoteData.author}
          isLike={isLike}
          description={quoteData.description}
          handleLike={handleLike}
        />
        <WriteComment
          comment={comment}
          handleChange={handleChange}
          handleCommentClick={handleCommentClick}
        />
        <div className="flex flex-col h-[140px] gap-[40px] overflow-scroll scrollbar-hide">
          {commentData.map((comment: CommentType) => (
            <Comment
              key={comment.id}
              profileImage={comment.user.profile_image}
              nickname={comment.user.nickname}
              date={new Date(comment.created_at).toLocaleDateString()}
              comment={comment.content}
            />
          ))}
        </div>
      </div>
      <Button text="둘러보기" handleClick={handleClick} />
      <div className="w-full h-[80px]"></div>
    </div>
  );
};

export default ResultQuotePage;
