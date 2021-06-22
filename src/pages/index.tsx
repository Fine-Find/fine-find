import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MenuIcon from '@material-ui/icons/Menu';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/wyo5kzm.css" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerGrid}>
          <div className={styles.logo}>
            <a><img src="/images/main_navy.png" /></a>
          </div>
          <div className={styles.nav}>
            <ul className={styles.links}>
              <li>home</li>
              <li>designers</li>
              <li>the process</li>
            </ul>
            <div className={styles.navButtonContainer}>
              <button className={styles.navButton}>apply now</button>
            </div>
          </div>
          <div className={styles.mobileMenu}>
            <MenuIcon />
          </div>
        </div>
      </header>
      <section className={styles.studyPhotoContainer}>
        <img src="/images/mathilde.jpg" className={styles.studyPhoto} />
      </section>

      <div className={styles.studyTextCont}>
        <h2 className={styles.studyTitle}>Lorem Ipsum Dolar <br />Sit Amet Consectetur</h2>
        <p className={styles.studyText}>A monetization tool built for visibility in design, The Fine Find is a platform that enables consumers to shop your designs like an insider.</p>
        <div className={styles.applyButtonCont}>
          <button className={styles.applyButton}>Apply Now</button>
        </div>
      </div>
      <section className={styles.mainSection}>
        <div className={styles.spaceGrid}>
          <div id="mobile-padding" className={styles.spaceImage}>
            <img src="/images/toa.jpg" />
          </div>
          <div className={styles.spaceBoxCont}>
            <div className={styles.spaceBox}>
              <h2 className={styles.spaceBoxTitle}>Maximize Earnings while you <br />grow your design business</h2>
              <p className={styles.spaceBoxText}>The global online home decor market is slated to grow to $82.32 billion by 2024. Your digital presence on the Fine Find gives new clients immediate access to your custom products, passively growing your revenue while you manage the rest of your business. Our data-driven process takes care of your distribution while leveraging your influence by enhancing your visibility so you can do what you do best: design.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.clientTextCont}>
          <h2 className={styles.clientTitle}>EXPAND YOUR CLIENT NETWORK AND PROPEL NEW SALES</h2>
          <p className={styles.clientText}>The Fine Find is the premier industry network that helps you monetize content, build brand awareness, and increase your online presence in order to drive sales. Our goal is to create value between suppliers, designers, and consumers through our proprietary network in order to benefit the design community.</p>
        </div>
        <div className={styles.spaceGrid}>
          <div id="mobile-padding" className={styles.spaceBoxCont}>
            <div className={styles.spaceBox}>
              <h2 className={styles.spaceBoxTitle}>EARN INCOME WHILE YOU<br />FOCUS ON GROWING YOUR BRAND</h2>
              <p className={styles.spaceBoxText}>Leveraging your skill set through time management and creating your brand through business development take time, and there’s only so many hours in the day. With the Fine Find, you can expand your network, scale your product offering, and get your time back since your audience can discover exactly what they’re looking for directly through the Fine Find.</p>
            </div>
          </div>
          <div className={styles.spaceImage}>
            <img src="/images/jean.jpg" />
          </div>
        </div>
        <div className={styles.clientTextCont}>
          <h2 className={styles.clientTitle}>The most efficient way to build your business</h2>
          <p className={styles.clientText}>The Fine Find is a digital platform that helps you build a new revenue channel and gives new clients quick access to custom design. Our unique platform enables easier sourcing, automated distribution, and more accessible design everywhere while you focus on your core business.</p>
        </div>
        <div className={styles.spaceGrid}>*/
          <div id="mobile-padding" className={styles.spaceImage}>
            <div className={styles.spaceImage}>
              <img src="/images/nathan.jpg" />
            </div>
            <div className={styles.spaceBoxCont}>
              <div className={styles.spaceBox}>
                <h2 className={styles.spaceBoxTitle}>The most efficient to build your business</h2>
                <p className={styles.spaceBoxText}>The Fine Find is a digital platform that gives shoppers quick-click access to hundreds of highly-coveted hand-selected design finds, but it originated to give designers like you connections to buyers across the globe without the overhead of a storefront studio. And all this is done while you are consulting on a project or sourcing for a concept.</p>
              </div>
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
              <p className={styles.processContent}>Excited by what you’re reading? Come see how to up-level your brand as we show you how the process works:</p>
            </div>
            <div className={styles.worksButtonCont}>
              <button className={styles.worksButton}>see how it works</button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.lastSection}>
        <h2 className={styles.lastTitle}>Ready to _____?</h2>
        {/*<p className={styles.lastText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloare magna aliqua. Ut enim ad minim veniam, quis notstrud execritation ullamco laboris</p>*/}
        <div className={styles.startedButtonCont}>
          <button className={styles.startedButton}>get started</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerLogo}>
            <a><img src="/images/icon_navy.png" /></a>
            <div className={styles.copyrightCont}>
              <span className={styles.copyright}>© 2021 The Fine Find <br /> All rights reserved</span>
            </div>
          </div>
          <div className={styles.nav}>
            <ul className={styles.links}>
              <li>home</li>
              <li>designers</li>
              <li>the process</li>
            </ul>
            <div className={styles.footerButtonCont}>
              <button className={styles.navButton}>apply now</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
