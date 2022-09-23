/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import userApiService from '@/api/userApiService';

const UserForm = () => {
  const [userInput, setUserInput] = useState({
    profilePhotoUrl: '',
    name: '',
    email: '',
    password: '',
    age: '',
    genderOrigin: 1,
    birthDate: '',
    phoneNumber: '',
    address: '',
    detailAddress: '',
  });

  const submitFormHandler = async e => {
    e.preventDefault();
    try {
      await userApiService.createUser(userInput);
      // eslint-disable-next-line no-alert
      alert('유저가 생성되었습니다.');
      setUserInput({
        profilePhotoUrl: '',
        name: '',
        email: '',
        password: '',
        age: '',
        genderOrigin: 1,
        birthDate: '',
        phoneNumber: '',
        address: '',
        detailAddress: '',
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const userInputHandler = e => {
    const { id } = e.target;
    let { value } = e.target;
    if (id === 'genderOrigin') {
      value = Number(value);
    }
    setUserInput(prev => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <form onSubmit={submitFormHandler}>
      <div>
        <label htmlFor="profilePhotoUrl">프로필 URL: </label>
        <input
          onChange={userInputHandler}
          type="text"
          id="profilePhotoUrl"
          required
          value={userInput.profilePhotoUrl}
        />
      </div>
      <div>
        <label htmlFor="name">이름: </label>
        <input onChange={userInputHandler} type="text" id="name" required value={userInput.name} />
      </div>
      <div>
        <label htmlFor="email">이메일: </label>
        <input
          onChange={userInputHandler}
          type="text"
          id="email"
          required
          value={userInput.email}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호: </label>
        <input
          onChange={userInputHandler}
          type="password"
          id="password"
          required
          value={userInput.password}
        />
      </div>
      <div>
        <label htmlFor="age">나이: </label>
        <input onChange={userInputHandler} type="number" id="age" required value={userInput.age} />
      </div>
      <div>
        <label htmlFor="genderOrigin">주민등록번호상 성별: </label>
        <select
          onChange={userInputHandler}
          id="genderOrigin"
          required
          value={userInput.genderOrigin}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
      <div>
        <label htmlFor="birthDate">생년월일: </label>
        <input
          onChange={userInputHandler}
          type="date"
          id="birthDate"
          required
          min="1800-01-01"
          max="2022-12-31"
          value={userInput.birthDate}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">핸드폰 번호: </label>
        <input
          onChange={userInputHandler}
          type="tel"
          id="phoneNumber"
          placeholder="010-0000-0000"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          required
          value={userInput.phoneNumber}
        />
      </div>
      <div>
        <label htmlFor="address">주소: </label>
        <input
          onChange={userInputHandler}
          type="text"
          id="address"
          required
          value={userInput.address}
        />
      </div>
      <div>
        <label htmlFor="detailAddress">상세 주소: </label>
        <input
          onChange={userInputHandler}
          type="text"
          id="detailAddress"
          required
          value={userInput.detailAddress}
        />
      </div>
      <button type="submit">생성하기</button>
    </form>
  );
};

export default UserForm;
