import {Modal} from 'react-native';
import React from 'react';

interface FuncProps {
  isVisible: boolean;
  toggleModal: () => void;
  children: any;
}
const ModalComponent = ({isVisible, toggleModal, children}: FuncProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
