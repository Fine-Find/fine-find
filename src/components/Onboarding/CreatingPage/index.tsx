import { UserType } from '@/types/profile.types';
import {
  DesignerMetafields,
  DesignerPage,
  DesignerProduct,
  
} from '@/types/shopify/Designer';
// import { updateShopifyUrl } from '@/utils/firebaseFirestore';
import { fineFindApis, fineFindPages } from '@/utils/urls';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

import styles from './CreatingPage.module.scss';

type PageCreationProps = {
  user: UserType;
  userIdToken: string;
};

const buildRequest = (user: UserType): DesignerPage => {
  const sluggedCompany = slugify(user.businessProfile.companyName, {
    remove: /\./g,
    trim: true,
    lower: true,
  });
  const metaFields: DesignerMetafields = {
    hero_image_link: '',
    bio_text_1: 'sample',
    book_time_link: 'https://google.com',
    profile_image_link: user.businessImage,
    instagram_link: `https://www.instagram.com/${user.application.instagramHandle}/`,
    website_link: user.businessProfile.website,
    company_name: user.businessProfile.companyName,
    bio_text_2: user.businessProfile.description,
    num_posts: 0,
    posts: {},
  };

  if (user.businessProfile.hourlyRate) {
    metaFields.book_time_link = `https://thefinefind.com/products/${sluggedCompany}-1-1-video-consultation`;
  }

  const pageObj: DesignerPage = {
    title: user.businessProfile.companyName,
    handle: sluggedCompany,
    template_suffix: 'designer_page',
    metafields: [
      {
        namespace: 'designer',
        key: 'data',
        value_type: 'json_string',
        value: JSON.stringify(metaFields),
      },
    ],
  };

  return pageObj;
};
export const buildProductBody = ({ username, handle, price }): DesignerProduct => {
  return {
    title: `Book time with ${username}`,
    vendor: `${username}`,
    handle: `${handle}-1-1-video-consultation`,
    product_type: 'video consultation',
    variants: [{price: `${price}`}],
  };
};

export const CreatingPage = ({ user, userIdToken }: PageCreationProps) => {
  const [designerUrl, setDesignerUrl] = useState<string>(user.shopifyUrl);
  const [preparing, setPreparing] = useState<boolean>(true);
  const [prepTimer, setPrepTimer] = useState<boolean>(false);
  const [liftOff, setLiftOff] = useState<boolean>(false);
  const [launching, setLaunching] = useState<boolean>(false);
  const [stage, setStage] = useState<string>(
    `Preparing ${user?.businessProfile?.companyName} for launch`
  );

  const liftOffText = 'And we have liftoff!';
  const launchingText = `Launching ${user?.businessProfile?.companyName} on FineFind!`;
  useEffect(() => {
    if (!prepTimer && preparing && user) {
      setPrepTimer(true);
      setTimeout(function () {
        setLaunching(true);
        setPrepTimer(false);
        setStage(launchingText);
        setPreparing(false);
      }, 1500);
    }
  }, []);

  useEffect(() => {
    if (!prepTimer && launching) {
      setPrepTimer(true);

      const requestBody = buildRequest(user);

      fetch(fineFindApis.createDesignerPage, {
        method: 'POST',
        headers: {
          authorization: `bearer ${userIdToken}`,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
           
            const url = `https://thefinefind.com/pages/${requestBody.handle}`;
            setDesignerUrl(url);
            
          } else {
           
            const url = `https://thefinefind.com/pages/${requestBody.handle}`;
            setDesignerUrl(url);
            console.error('page created!!!',response);
          }
        })
        .catch((error) => {
          //TODO: proper error handling
          console.error('error ending...',error);

        })
        .finally(() => {
          setLaunching(false);
          setLiftOff(true);
          setPrepTimer(false);
          setStage(liftOffText);
        });
    }
  }, [preparing]);

  return (
    <div className={styles.container}>
      <Typography variant="h3" className={styles.text}>
        {stage}
      </Typography>
      {liftOff && (
        <>
          <Typography variant="h5" className={styles.text}>
            Your shopify page is now ready
          </Typography>
        </>
      )}
      {!liftOff && (
        <div className={styles.progress}>
          <LinearProgress color="secondary" />
        </div>
      )}
      {designerUrl && (
        <div className={styles.links}>
          <Link href={fineFindPages.createCollections} passHref>
            <Button variant="outlined">Create a Post</Button>
          </Link>
          <Link href={designerUrl} passHref>
            <Button variant="outlined">Go to FineFind</Button>
          </Link>
          <Link href={fineFindPages.dashboard} passHref>
            <Button variant="outlined">View Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
