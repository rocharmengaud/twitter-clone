import { useLoginModal } from '@/hooks/useLoginModal';
import { useCallback, useState } from 'react';
import { Input } from '../Input';
import { Modal } from '../Modal';

export const LoginModal = () => {
  const loginModal = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setisLoading(true);
      // TODO ADD LOGIN
      // await sign in ...

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }, [loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
      <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
