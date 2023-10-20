import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import LoadingBar from 'react-top-loading-bar'

export default function About() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 500);
  }, [])
  return (
    <React.Fragment>
      <Header />
      <div>
        <LoadingBar
          color="#06B6D4"
          progress={progress}
          height={4}
          loaderSpeed={700}
          onLoaderFinished={() => setProgress(0)}
        />
      </div>
      درباره ما
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </React.Fragment>
  )
}
