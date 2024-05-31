import dynamic from 'next/dynamic'
import Modal from './modal'
import { useModalAction,useModalState } from '@/contexts/modal.context'
import Register from '@/components/molecules/auth/Register'
import LoginForm from '../auth/Login'
import RegisterForm from '@/components/molecules/auth/Register'
const ManagedModal = () => {
    const { isOpen, view } = useModalState()
    const { closeModal } = useModalAction()

    return (
        <Modal open={isOpen} onClose={closeModal}>
            {view === 'LOGIN_VIEW' && <LoginForm />}
            {view === 'REGISTER' && <RegisterForm />}
        </Modal>
    )
}

export default ManagedModal
