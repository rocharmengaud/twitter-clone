import { useLoginModal } from '@/hooks/useLoginModal';
import { useCallback, useState } from 'react';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setisLoading] = useState(false);

  // POST request to the /api/register endpoint, then signs the user in using next-auth and closes the modal window.
  // The useCallback hook is used to memoize the function and prevent unnecessary re-renders.
  const onSubmit = useCallback(async () => {
    try {
      setisLoading(true);
      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      });

      toast.success('Account created.');

      signIn('credentials', {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setisLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
      <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
      <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} />
      <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 mt-4 text-center">
      <p>
        Already have an account? {''}
        <span onClick={onToggle} className="hover:underline text-white cursor-pointer">
          Sign in
        </span>
      </p>
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
      footer={footerContent}
    />
  );
};
