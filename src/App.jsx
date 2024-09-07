import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import 'src/components/Notification'
import { axiosSetting } from 'src/components/AxiosSetting'
import Main from "./components/Main";
import { Processbar } from 'src/components/Processbar'
import 'nprogress/nprogress.css';

axiosSetting();

function App() {
  return (
    <div className="bg-bg-light min-h-screen grid grid-rows-[64px_1fr_auto] grid-cols-1 grid-areas-layout">
      <Processbar />
      <Header className="sticky top-0 backdrop-blur-sm z-50 border-b border-border-100 xl:col-span-2 2xl:col-span-3 grid-in-head" />
      <div className='bg-bg-dark'>
        <Main className="z-10 mx-4 flex flex-col grid-in-main pt-4" />
      </div>
      <Footer className="xl:col-span-2 2xl:col-span-3 text-center text-txt-100 grid-in-footer bg-bg-dark" />
    </div>
  )
}

export default App