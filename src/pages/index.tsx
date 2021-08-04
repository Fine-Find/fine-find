import Copyright from '@/components/Copyright/Copyright';
import { Card } from '@/components/shared/Card/index';
import { Button } from '@/components/shared/OutlineButton';
import { Box, Grid, Typography } from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DevicesIcon from '@material-ui/icons/Devices';
import DomainIcon from '@material-ui/icons/Domain';
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
  title: '.The most efficient way to build your business',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valueable time back so you can grow your business and make the most of the moment when you hit a spark of creativity',
  icon: <img src='/Icons_finefind-12.png' alt='Fine Find Icon' width='125px' height='125px'/>,
};
const monetization = {
  title: 'A new space designed for visibility and monetization.',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valueable time back so you can grow your business and make the most of the moment when you hit a spark of creativity',
  icon: <img src='/Icons_finefind-09.png' alt='Fine Find Icon' width='125px' height='125px'/>,
};
const network = {
  title: 'Expand your client network and propel new sales.',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valueable time back so you can grow your business and make the most of the moment when you hit a spark of creativity',
  icon: <img src='/Icons_finefind-11.png' alt='Fine Find Icon' width='125px' height='125px'/>,
};
const earn = {
  title: '.Earn income while you focus',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design online so consumers can shop like an insider anytime and you can benefit from it. The Fine Find is a monetization mechanism that helps you get valueable time back so you can grow your business and make the most of the moment when you hit a spark of creativity',
  icon: <img src='/Icons_finefind-10.png' alt='Fine Find Icon' width='125px' height='125px'/>,
};
export default function Home() {
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <main className={styles.main}>
            <div
              style={{ position: 'relative', width: '100vw', height: '50vw' }}
            >
              <Image src={'/tina.jpeg'} layout="fill" objectFit="cover" />
            </div>
            <div>
              <Grid container className={styles.header}>
                {/* <Grid> */}
                <Grid item xs={6}>
                  <Typography variant="h2" gutterBottom>
                    Lorem Ipsum Dolor
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button label="Apply now" textSize="2.5em" />
                </Grid>
                <Box ml={6} mr={6}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    className={styles.blocktext}
                  >
                    lorem ipsum amet. consetetur ing elitr, sed diam numy rmod
                    porr in vidunt ut labor. et loremagna lquyan erat. sed diam
                    voluptua. at vereos et accusam et justo duo lores et ea.
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
                    direction="left"
                  />
                </Grid>
                <Grid item xs={4} className={styles.rightspace}>
                  <Card image={image[0]} direction="right" />
                </Grid>
                <Grid item xs={4} className={styles.leftspace}>
                  <Card image={image[1]} direction="left" />
                </Grid>
                <Grid item xs={8} className={styles.rightspace}>
                  <Card
                    title={earn.title}
                    icon={earn.icon}
                    paragraph={earn.paragraph}
                    direction="right"
                  />
                </Grid>
                <Grid item xs={8} className={styles.leftspace}>
                  <Card
                    title={network.title}
                    paragraph={network.paragraph}
                    icon={network.icon}
                    direction="left"
                  />
                </Grid>
                <Grid item xs={4} className={styles.rightspace}>
                  <Card image={image[2]} direction="right" />
                </Grid>
                <Grid item xs={4} className={styles.leftspace}>
                  <Card image={image[3]} direction="left" />
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
                      <Typography gutterBottom variant="h2" className={styles.font}>
                        Lorem Ipsum Dolor
                      </Typography>
                      <Typography variant="h4" gutterBottom className={styles.font}>
                        lorem ipsum amet. consetetur ing elitr, sed amet,
                        consetetur ing elitr, sed
                      </Typography>
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
