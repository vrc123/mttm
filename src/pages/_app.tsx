import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../../store'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}