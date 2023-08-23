import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import SnackbarProvider from 'react-simple-snackbar'
import { LikeProvider, SavedVideosProvider, PlaylistProvider, VideosProvider, AuthProvider } from "./Contexts/index"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <VideosProvider>
        <AuthProvider>
          <LikeProvider>
            <SavedVideosProvider>
              <PlaylistProvider>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </PlaylistProvider>
            </SavedVideosProvider>
          </LikeProvider>
        </AuthProvider>
      </VideosProvider>
    </Router>
  </React.StrictMode>,
)
