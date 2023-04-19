import { useLoginModal } from '@/hooks/useLoginModal';
import { useCallback, useState } from 'react';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { useRegisterModal } from '@/hooks/useRegisterModal';

export const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setisLoading(true);
      // TODO ADD LOGIN AND REGISTER
      // await sign in ...

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }, [registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
      <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
      <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} />
      <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
