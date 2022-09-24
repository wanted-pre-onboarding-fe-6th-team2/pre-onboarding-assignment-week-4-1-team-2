/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  FormLabel,
  Input,
  Button,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
} from '@chakra-ui/react';
import userApiService from '@/api/userApiService';

const UserForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      <Button colorScheme="yellow" width="150px" onClick={onOpen}>
        유저 생성하기
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">유저 생성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={submitFormHandler}>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="profilePhotoUrl">프로필 URL: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="text"
                  id="profilePhotoUrl"
                  required
                  value={userInput.profilePhotoUrl}
                />
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="name">이름: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="text"
                  id="name"
                  required
                  value={userInput.name}
                />
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="email">이메일: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="text"
                  id="email"
                  required
                  value={userInput.email}
                />
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="password">비밀번호: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="password"
                  id="password"
                  required
                  value={userInput.password}
                />
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="age">나이: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="number"
                  id="age"
                  required
                  value={userInput.age}
                />
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="genderOrigin">주민등록번호상 성별: </FormLabel>
                <Select
                  onChange={userInputHandler}
                  id="genderOrigin"
                  required
                  value={userInput.genderOrigin}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </Select>
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="birthDate">생년월일: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="date"
                  id="birthDate"
                  required
                  min="1800-01-01"
                  max="2022-12-31"
                  value={userInput.birthDate}
                />
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="phoneNumber">핸드폰 번호: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="tel"
                  id="phoneNumber"
                  placeholder="010-0000-0000"
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  required
                  value={userInput.phoneNumber}
                />
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="address">주소: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="text"
                  id="address"
                  required
                  value={userInput.address}
                />
              </FormControl>
              <FormControl isRequired margin="10px 0">
                <FormLabel htmlFor="detailAddress">상세 주소: </FormLabel>
                <Input
                  onChange={userInputHandler}
                  type="text"
                  id="detailAddress"
                  required
                  value={userInput.detailAddress}
                />
              </FormControl>
              <ModalFooter>
                <Button colorScheme="yellow" mr={3} type="submit">
                  생성하기
                </Button>
                <Button mr={3} variant="ghost" type="submit" onClick={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserForm;
