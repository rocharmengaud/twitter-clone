import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import '@/styles/globals.css';
import { Modal } from '@/components/Modal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal isOpen title="Test Modal" actionLabel="Submit" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
