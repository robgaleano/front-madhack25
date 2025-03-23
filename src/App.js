import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {QubicConnectCombinedProvider} from './contexts/QubicConnectContext'
import {HM25Provider} from './contexts/HM25Context'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import StartPage from './pages/StartPage'
import EchoPage from './pages/EchoPage'
import BurnPage from './pages/BurnPage'
import PlayerPage from './pages/Player/PlayerPage'
import PlayerDetail from './pages/Player/PlayerDetail'
import {Toaster} from 'react-hot-toast'
import {ConfigProvider} from "./contexts/ConfigContext"

import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Layout({children}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-1 flex flex-col bg-neutral-100">{children}</main>
            <Footer className="mt-auto"/>
        </div>
    )
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
        <ConfigProvider>
            <QubicConnectCombinedProvider>
                <HM25Provider>
                    <BrowserRouter>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<StartPage/>}/>
                                <Route path="/echo" element={<EchoPage/>}/>
                                <Route path="/burn" element={<BurnPage/>}/>
                                <Route path="/player" element={<PlayerPage/>}/>
                                <Route path="/player/:id" element={<PlayerDetail/>}/>
                            </Routes>
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    style: {
                                        background: "#202E3C",
                                        color: "#fff",
                                    },
                                }}
                            />
                        </Layout>
                    </BrowserRouter>
                </HM25Provider>
            </QubicConnectCombinedProvider>
        </ConfigProvider>
        </QueryClientProvider>
    )
}

export default App
