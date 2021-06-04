import Layout from '../components/Layout';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Header />
        <section className={styles.studyPhotoContainer}>
          <img src="/images/mathilde.jpg"   className={styles.studyPhoto} />
        </section>

        <div className={styles.studyTextCont}>
          <h2 className={styles.studyTitle}>Lorem Ipsum Dolar <br />Sit Amet Consectetur</h2>
          <p className={styles.studyText}>Lorem ipsum dolar sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidudent ut laborer et dolore magna aliqua. Ut enim ad minim veniam, quis bistryd execcutation yllamco</p>
          <div className={styles.applyButtonCont}>
            <button className={styles.applyButton}>Apply Now</button>
          </div>
        </div>
          <section className={styles.mainSection}>
            <div className={styles.spaceGrid}>
              <div className={styles.spaceImage}>
                <img src="/images/toa.jpg"   />
              </div>
              <div className={styles.spaceBoxCont}>
                <div className={styles.spaceBox}>
                  <h2 className={styles.spaceBoxTitle}>A new space designed for visibility and monetization</h2>
                  <p className={styles.spaceBoxText}>The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valuable time back so you grow your business and make the most of the moment when you hit a spark of creativity</p>
                </div>
              </div>
            </div>
            <div className={styles.clientTextCont}>
              <h2 className={styles.clientTitle}>Expand your client network and <br /> propel new sales</h2>
              <p className={styles.clientText}>Lorem ipsum dolar sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidiunt ut lavore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud execirarion ullamaco lavoiea nisi ut aliquip ex ea commodo conswquat.</p>
            </div>
            <div className={styles.spaceGrid}>
              <div className={styles.spaceBoxCont}>
              <div className={styles.spaceBox}>
                <h2 className={styles.spaceBoxTitle}>Earn income while you focus on growing your brand</h2>
                <p className={styles.spaceBoxText}>Lorem ipsum dolar sit amet, consectectur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minum veniam, quis nostrud exercitation ullamaco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              </div>
              <div className={styles.spaceImage}>
                <img src="/images/jean.jpg"  />
              </div>
            </div>
            <div className={styles.clientTextCont}>
              <h2 className={styles.clientTitle}>Maximize Earnings while you grow <br /> your core design business </h2>
              <p className={styles.clientText}>Lorem ipsum dolar sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidiunt ut lavore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud execirarion ullamaco lavoiea nisi ut aliquip ex ea commodo conswquat.</p>
            </div>
            <div className={styles.spaceGrid}>
              <div className={styles.spaceImage}>
                <img src="/images/nathan.jpg" />
              </div>
              <div className={styles.spaceBoxCont}>
                <div className={styles.spaceBox}>
                  <h2 className={styles.spaceBoxTitle}>The most efficient to build your business</h2>
                  <p className={styles.spaceBoxText}>Lorem ipsum dolar sit amet, consectectur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minum veniam, quis nostrud exercitation ullamaco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.processSection}>
            <div className={styles.spaceGrid}>
              <div className={styles.spaceImage}>
                <img src="/images/mathilde-black.jpg" />
              </div>
              <div className={styles.processTextCont}>
                <div className={styles.processText}>
                  <h2 className={styles.processTitle}>the process</h2>
                  <p className={styles.processContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis notstrud exercitation ullamco</p>
                </div>
                <div className={styles.worksButtonCont}>
                  <button className={styles.worksButton}>see how it works</button>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.lastSection}>
            <h2 className={styles.lastTitle}>lorem ipsum dolor <br /> sit amet consectetur</h2>
            <p className={styles.lastText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloare magna aliqua. Ut enim ad minim veniam, quis notstrud execritation ullamco laboris</p>
            <div className={styles.startedButtonCont}>
              <button className={styles.startedButton}>get started</button>
            </div>
          </section>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </Layout>
  );
}
