import { instance } from 'api/instance';
import Button from 'components/common/Button';
import Textarea from 'components/writeQuote/Textarea';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WriteQuotePage = () => {
  const [quote, setQuote] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoggedIn = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  const handleClick = async () => {
    const formData = new FormData();
    formData.append('content', quote);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data',
    };

    try {
      const response = await instance.post('quote/quote-register/', formData, {
        headers,
      });
      if (response.status === 201) {
        alert('등록되었습니다.');
        navigate('/');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleQuoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuote(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-[40px] gap-[30px]">
      <div className="flex flex-col items-center w-full p-5 rounded-xl bg-white shadow-custom gap-[20px]">
        <p className="font-semibold">나만의 명언 만들기</p>
        <div className="relative p-10 flex items-center justify-center w-full h-[200px] rounded-xl">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0 rounded-xl"
            style={{
              backgroundImage: `url(${imagePreviewUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <span className="z-10 text-center font-bold">{quote}</span>
        </div>
        <Textarea
          title="명언"
          placeholder="등록하고 싶은 명언을 입력해주세요"
          handleChange={handleQuoteChange}
        />
        <Textarea
          title="설명"
          placeholder="등록하고자 하는 명언에 대해 설명해주세요"
          handleChange={handleDescriptionChange}
        />
        <button
          type="button"
          className="border border-gray-300 rounded-xl w-[150px] p-3 text-sm font-semibold hover:border-black cursor-pointer"
          onClick={handleFileSelect}
        >
          배경 이미지 선택
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      <Button text="등록하기" handleClick={handleClick} />
      <div className="w-full h-[80px]"></div>
    </div>
  );
};

export default WriteQuotePage;
