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
  '/nathan-oakley.jpg',
  '/toa-heftiba.jpg',
  '/tijana-drndarski1.jpg',
  '/banner.jpg',
];

const efficient = {
  title: 'The most efficient way to build your business.',
  paragraph:
    'The Fine Find streamlines the process for you by connecting your brand to our entire network of premium suppliers and eager consumers. By creating your own corner of our network, you get to focus on design and one-on-one customer satisfaction, while we take care of everything else – monetization, transaction, expansion.',
  icon: <DomainIcon />,
};
const monetization = {
  title: 'A new platform designed for visibility and monetization.',
  paragraph:
    'The Fine Find is a digital marketplace that brings the best of design \n' +
      'online. Consumers can shop like insiders – at any time, from anywhere – and you reap all the \n' +
      'benefits.',
  icon: <ApartmentIcon />,
};
const network = {
  title: 'Expand your client network and propel new sales.',
  paragraph:
    'The Fine Find network is a whole new world of designers, consumers, suppliers, and fellow forward-thinkers. By joining our network, you can expand your own. Tap into new clientele, the latest products and supplies, and a faster, sleeker way to build your brand.',
  icon: <AssignmentIcon />,
};
const earn = {
  title: 'Earn a passive income while you focus on your brand.',
  paragraph:
    'The Fine Find provides a unique monetization mechanism to help you get your valuable time back. No more grueling hours figuring out the business side of things; now you can focus on what you do best: design. Grow your business while you build your brand, whenever that creative spark hits.',
  icon: <DevicesIcon />,
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
                    The Fine Find and You
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button label="Apply now" textSize="2.5em" width="35%" />
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
                      <Typography gutterBottom variant="h2">
                        Want even more?
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        The Fine Find is accepting new members. If you’re ready to build your business, earn an income on your passions, and expand your creative mindset, join us today! Visit our FAQ page for more information.
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
            src="/icon_grullo.svg"
            alt="Fine Find Logo"
            className={styles.logo}
          />
          <Copyright />
        </footer>
      </Layout>
    </>
  );
}
