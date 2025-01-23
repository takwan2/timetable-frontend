import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface BaseModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onRegister: () => void;
  show: boolean;
}

export default function BaseModal({ title, children, onClose, onRegister, show }: BaseModalProps) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>キャンセル</Button>
          <Button variant="primary" onClick={onRegister}> 登録 </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}