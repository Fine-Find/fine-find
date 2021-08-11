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
    'The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valueable time back so you can grow your business and make the most of the moment when you hit a spark of creativity.',
  icon: <Image src='/Icons_finefind-12.png' alt='Fine Find Icon' width='250px' height='300px'/>,
};
const monetization = {
  title: 'A new space designed for visibility and monetization.',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valueable time back so you can grow your business and make the most of the moment when you hit a spark of creativity.',
  icon: <Image src='/Icons_finefind-09.png' alt='Fine Find Icon' width='250px' height='300px'/>,
};
const network = {
  title: 'Expand your client network and propel new sales.',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valueable time back so you can grow your business and make the most of the moment when you hit a spark of creativity.',
  icon: <Image src='/Icons_finefind-10.png' alt='Fine Find Icon' width='250px' height='300px'/>,
};
const earn = {
  title: 'Earn income while you focus.',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valueable time back so you can grow your business and make the most of the moment when you hit a spark of creativity.',
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
                    Lorem Ipsum Dolor
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
                    lorem ipsum amet. consetetur ing elitr, sed diam numy rmod
                    porr in vidunt ut labor. et loremagna lquyan erat. sed diam
                    voluptua. at vereos et accusam et justo duo lores et ea
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
                        Lorem Ipsum Dolor
                      </h2>
                      <h4 className={styles.processfont}>
                        lorem ipsum amet. consetetur ing elitr, sed amet,
                        consetetur ing elitr, sed
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
