import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { authActions } from '@/store/modules/auth';
import { ROUTES } from '@/constants/routes';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const closeModal = () => {
    onClose();
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    onOpen();
    dispatch(authActions.logoutMiddleware());
  }, [onOpen, dispatch]);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader pt={30} fontSize="lg" fontWeight="bold">
            로그아웃 되었습니다.
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeModal}>
              확인
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Logout;
