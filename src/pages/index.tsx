import Copyright from '@/components/Copyright/Copyright';
import { Card } from '@/components/shared/Card/index';
import { Button } from '@/components/shared/OutlineButton';
import { Box, Grid, Typography } from '@material-ui/core';
import Image from 'next/image';

import Layout from '../components/Layout';
import styles from './index.module.scss';

const image = [
  '/JacobSnavely.jpeg',
  '/bringdesignhome.jpg',
  '/annie-spratt.jpg',
  '/kelly-sikkema.jpg',
];

const efficient = {
  title: 'The most efficient way to build your business.',
  paragraph:
    'The Fine Find streamlines the process for you by connecting your brand to our entire network of premium suppliers and eager consumers. By creating your own corner of our network, you get to focus on design and one-on-one customer satisfaction, while we take care of everything else – monetization, transaction, expansion.',
  icon: <Image src='/Icons_finefind-12.png' alt='Fine Find Icon' width='250px' height='300px'/>,
};
const monetization = {
  title: 'A new platform designed for visibility and monetization.',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design \n' +
      'online. Consumers can shop like insiders – at any time, from anywhere – and you reap all the \n' +
      'benefits.',
  icon: <Image src='/Icons_finefind-09.png' alt='Fine Find Icon' width='250px' height='300px'/>,
};
const network = {
  title: 'Expand your client network and propel new sales.',
  paragraph:
    'The Fine Find network is a whole new world of designers, consumers, suppliers, and fellow forward-thinkers. By joining our network, you can expand your own. Tap into new clientele, the latest products and supplies, and a faster, sleeker way to build your brand.',
  icon: <Image src='/Icons_finefind-10.png' alt='Fine Find Icon' width='250px' height='300px'/>,
};
const earn = {
  title: 'Earn a passive income while you focus on your brand.',
  paragraph:
    'The Fine Find provides a unique monetization mechanism to help you get your valuable time back. No more grueling hours figuring out the business side of things; now you can focus on what you do best: design. Grow your business while you build your brand, whenever that creative spark hits.',
  icon: <Image src='/Icons_finefind-11.png' alt='Fine Find Icon' width='250px' height='300px' />
};
export default function Home() {
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <main className={styles.main}>
            <div
              style={{ position: 'relative', width: '98.8vw', height: '40vw', maxHeight: "auto", maxWidth: 'auto'  }}
            >
              <Image src={'/tina.jpeg'} layout="fill" objectFit="cover" />
            </div>
            <div>
              <Grid container className={styles.header}>
                {/* <Grid> */}
                <Grid item xs={6}>
                  <h2 className={styles.title}>
                    The Fine Find and You
                  </h2>
                </Grid>
                <Grid item xs={6} className={styles.headerbutton}>
                  <Button label="Apply now" textSize="2.2em" />
                </Grid>
                <Box ml={6} mr={6}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    className={styles.blocktext}
                  >
                    Welcome fellow innovator! You’ve taken the first step toward bigger and
                    greater things in your creative journey, and we’re here to keep pushing you forward. Our
                    platform was built with the most important part of our industry in mind: the designer. Check out
                    some of the ways we improve your business, increase sales, and maximize visibility for your
                    brand below.
                  </Typography>
                </Box>
              </Grid>
            </div>
            <div className={styles.grid}>
              <Grid container>
                <Grid item xs={8} className={styles.leftspace}>
                  <Card
                    title={monetization.title}
                    icon={monetization.icon}
                    paragraph={monetization.paragraph}
                  />
                </Grid>
                <Grid item xs={4} className={styles.rightspace}>
                  <Card src={image[0]} direction="right" />
                </Grid>
                <Grid item xs={4} className={styles.leftspace}>
                  <Card src={image[1]} direction="left" />
                </Grid>
                <Grid item xs={8} className={styles.rightspace}>
                  <Card
                    title={network.title}
                    icon={network.icon}
                    paragraph={network.paragraph}
                    direction="right"
                  />
                </Grid>
                <Grid item xs={8} className={styles.leftspace}>
                  <Card
                    title={earn.title}
                    paragraph={earn.paragraph}
                    icon={earn.icon}
                    direction="left"
                  />
                </Grid>
                <Grid item xs={4} className={styles.rightspace}>
                  <Card src={image[2]} direction="right" />
                </Grid>
                <Grid item xs={4} className={styles.leftspace}>
                  <Card src={image[3]} direction="left" />
                </Grid>
                <Grid item xs={8} className={styles.rightspace}>
                  <Card
                    title={efficient.title}
                    icon={efficient.icon}
                    paragraph={efficient.paragraph}
                    direction="right"
                  />
                </Grid>
              </Grid>
            </div>
            <div className={styles.process}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container className={styles.processtext}>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <h2 className={styles.processtitle}>
                        Want even more?
                      </h2>
                      <h4 className={styles.processfont}>
                        The Fine Find is accepting new members. If you’re ready to build your business, earn an income on your passions, and expand your creative mindset, join us today! Visit our FAQ page for more information.
                      </h4>
                    </Grid>
                    <Grid item className={styles.processbutton}>
                      <Button
                        label="The Process"
                        textSize="2em"
                        borderColor="#E8E8E8"
                        textColor="#E8E8E8"
                        backgroundColor="#222847"
                        width="20%"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </main>
        </div>
        <footer className={styles.footer}>
          <img
            src="/icon_navy.svg"
            alt="Fine Find Logo"
            className={styles.logo}
          />
          <Copyright />
        </footer>
      </Layout>
    </>
  );
}
