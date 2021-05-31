import { useState } from 'react';
import {
  InstagramMedia,
  InstagramMediaPaging,
  InstagramMediaResponse,
} from 'types/Instagram/InstagramMedia';

import { fineFindApis } from '../utils/urls';

// TODO: Split this into smaller files as this one is getting big.

const RESPONSE_TIME_IN_MS = 1000;

interface NextInstagramPage {
  exists: boolean;
  uri?: string;
}

interface Response {
  nextPage: NextInstagramPage;
  data: InstagramMedia[];
}

export function useLoadInstagramMedia() {
  const [isLoading, setIsLoading] = useState(false);
  const [instagramMediaList, setInstagramMediaList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextPageUri, setNextPageUri] = useState(null);
  const [error, setError] = useState<Error>();

  async function loadMore() {
    setIsLoading(true);
    try {
      const { data, nextPage: newNextPage } = await loadInstagramItems(
        nextPageUri
      );
      setInstagramMediaList((current) => [...current, ...data]);
      setHasNextPage(newNextPage.exists);
      setNextPageUri(newNextPage.uri);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, instagramMediaList, hasNextPage, error, loadMore };
}

// TODO: Add Error Handling
async function loadInstagramItems(nextPageUri?: string): Promise<Response> {
  const instagramMediaUri = nextPageUri ?? fineFindApis.instagramMedia;

  return new Promise((resolve) => {
    setTimeout(async () => {
      const mediaResponse = await fetch(instagramMediaUri);
      const fetchedData: InstagramMediaResponse = await mediaResponse.json();
      /*const fetchedData = JSON.parse(
          `{"data":[{"id":"17886037328103821","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180438109_302559628158312_2670973691070323763_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Wst7kmAVbhoAX8rW0nM&_nc_oc=AQksgz-_bIz3kLlb1EZzsgKKIkgbL9dz0Lpx5x4rq8UZxZY6cChe86wYVbS_uGMKHIQ&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=05978e691447a3c710b80e3693f46ab0&oe=60B6428C","media_type":"IMAGE"},{"id":"17848103462579463","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/181257425_800137857603813_3591646372402940827_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=qkgFH9N-y6AAX9KVFYV&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=ec380e28e0f4ec8212e1aceaa8760bc9&oe=60B37BF2","media_type":"IMAGE"},{"id":"17888057921162208","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180359695_1871817542987076_1634214768396903499_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=6hxeLS15WnUAX_pkNf6&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=7c707e320ab144ddbf5961bd95d5bfc8&oe=60B54519","media_type":"IMAGE"},{"id":"17887311296174214","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180824669_915160982619015_8915465365222111263_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=0ovqKjyQuqcAX_eJTkI&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=a5eb735f3d389c2ab088791f2326a818&oe=60B3D59B","media_type":"IMAGE"},{"id":"17936504125479555","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180993487_469109444203717_8280197853087518948_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=4_mDLE3LfckAX_bjhN-&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=0926794ba9e3101a0bae98e639d5f7c4&oe=60B5C007","media_type":"IMAGE"},{"id":"17883683258235454","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180719611_3833999166721600_1841770631783141182_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Wf0smCWckPsAX8a8zk3&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=087636f2b4a7a9313179effced671b05&oe=60B323A6","media_type":"IMAGE"},{"id":"17915807905716522","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180452076_182107907104933_157631612730643825_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Hx8zv0Io8YAAX9VpFul&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=9e9a3475a5228163b5566102d91b1c9c&oe=60B414BA","media_type":"IMAGE"},{"id":"17874472415315092","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/181161226_247301780464526_4767428605321533405_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=B0nKyXgfFb4AX9ONP6w&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=af882cafe7e69fa39ce8c7e0b3033077&oe=60B39ED7","media_type":"IMAGE"},{"id":"18222488626053573","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180269486_301669821462477_7245761815863139349_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=uOEL0PUMrqcAX9usMoL&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=911091a9736eb747ef270faec186e1c1&oe=60B3B057","media_type":"IMAGE"},{"id":"17862550100514850","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/181405050_172557274754568_3529079286894673470_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=J6DLMhn4wZUAX9zhX1M&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=74172dbc412a6301d77ba26871298302&oe=60B40C7F","media_type":"IMAGE"},{"id":"17890450301121982","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180438111_558563055107794_827660950287796724_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=cuowdPcYKb4AX_Bs2K-&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=6c47107f0fcc8ce9c37e141958e52a76&oe=60B380FE","media_type":"IMAGE"},{"id":"17889634841129417","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180757938_317540829734991_6752358122876922511_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=zOvZb0jXAfkAX86rloK&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=b07c6ba0b39c533a5d58bab6e511c281&oe=60B4511B","media_type":"IMAGE"},{"id":"17892602761994367","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180550294_295656088717118_8069462586144467308_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=oQ67ZqPES4oAX9iXBzc&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=563fb602e8ad4fa26ceeef9b111f23aa&oe=60B2D167","media_type":"IMAGE"},{"id":"17891923349077917","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180010405_374101457215388_3100964133240527333_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=YAEas4RqynUAX8PiQAs&_nc_oc=AQkPV3Ke6MynIbW2hvuHq39DVNUr8DE_TpTSTG3EQXM1HZ4WlyMB_qnyIbf7tqiut1k&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=44445b4c785cf700ac3837a5826a5e4c&oe=60B5FF48","media_type":"IMAGE"},{"id":"17871316646465923","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180515183_294705092317190_4108130563436788630_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=GBJsz0DHf2AAX-3Xnk0&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=c6a46f2e3e0312b5d5efdc537a54fccb&oe=60B51405","media_type":"IMAGE"},{"id":"17875273388303932","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180970408_506576477283488_7217987108966677808_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=JRtMXgDEjXUAX8Jga2r&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=1cbef691f82804c90355b98267adef17&oe=60B3A3E6","media_type":"IMAGE"},{"id":"17887600448173341","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/179753801_455759268849728_5512942270030856879_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=n2sXCHvnWuYAX-YkQuv&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=5d14296edc104323b2b914b1c294c4fa&oe=60B64248","media_type":"IMAGE"},{"id":"17888879828069153","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180262889_135999291909859_5416687362741500313_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=i7onHRjUq-sAX8Jcxd3&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=e6a04ceaf04eaba8d651704ae9ca0d08&oe=60B3A267","media_type":"IMAGE"},{"id":"18165623074120882","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180359678_316173306535674_6628745520312183452_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=PMpZHYfehFcAX8WwOJd&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=c34259cfae3785a22b7bb634273174c0&oe=60B3DCAF","media_type":"IMAGE"},{"id":"17872026995462943","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180032386_482947119493047_8585657036216312620_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=NFXSF6uwGLYAX_cSnsR&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=53b7d2ce699710900c5e405d9d9d3db5&oe=60B3B47C","media_type":"IMAGE"},{"id":"18084112774259337","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180274806_208290784180321_5322222599615059348_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=9GjU3WUiBLgAX9tLVUo&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=df8df61a38e188f4c976e5a14386d589&oe=60B2DF4A","media_type":"IMAGE"},{"id":"17922823396565681","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180775291_1406606826360482_5713208852296150598_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=w0QT07zwkIwAX_VOiOs&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=21d03120d569dadb08128a806557cfac&oe=60B43160","media_type":"IMAGE"},{"id":"17894375051056846","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/181443580_283770506735354_8922403175396658073_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=tWZ9bKPkxCwAX_Mjtea&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=16fb0a5dbc08a423845aaf155f16a88c&oe=60B5833B","media_type":"IMAGE"},{"id":"17875978892288698","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180073125_791785745047990_3666922437887996021_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=koXRqCWVBa4AX-6vrwl&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=6365e0289b4dffd1f75b3156d4783af6&oe=60B5417E","media_type":"IMAGE"},{"id":"17923961419594639","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.29350-15/180633380_478759833238500_409691963893911525_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=qU7xh0l2ObIAX85jQfU&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=c11efab03af608b065d0a5ca21dbc65b&oe=60B577D2","media_type":"IMAGE"}],"paging":{"cursors":{"before":"QVFIUkktNGNISmEzdU56RW5ELXVfQlBCTllrS2E0c3o2TkM5Wld1eU4yQkc2ZAVJJOGR3b1ZAXSXlMeXJ3WG1OQUo2dmsxV04tSVZAlcDhoTkNVS3ZAxTkdUWHVn","after":"QVFIUkhkTWxRVm9vRUlOVmtTZAnFSckQyOWdLTzRIcG4zSU1vcklsakk3ZAnNIbUhqV1Y1VkZAGY1NOb2p6MkZASZAEMyMm1xY2ZA5a0FYUTVsdVRzajJhZAzJ1LVd3"},"next":"https://graph.instagram.com/v9.0/17841400473707006/media?access_token=IGQVJXVEFzQzBQRlJXTkdPRHNJV3VKUXFuX1pkdWxNQmJiR0ZAtSnBSdDdTM1c4TDRsMklJTDdSVEFuQUs2Rjd1ZAEdzdHpQU0xIQ2RiSWdXaEJSYWloNXRPMjRPMG9BRElCUWNZAb2RocmpONEUyVTY0UQZDZD&fields=id%2Cusername%2Cmedia_url%2Cmedia_type&limit=25&after=QVFIUkhkTWxRVm9vRUlOVmtTZAnFSckQyOWdLTzRIcG4zSU1vcklsakk3ZAnNIbUhqV1Y1VkZAGY1NOb2p6MkZASZAEMyMm1xY2ZA5a0FYUTVsdVRzajJhZAzJ1LVd3"}}`
        );*/
      // TODO: What happens when someone has multiple pictures in a single instagram post? Is that filtered out?
      const filteredData: InstagramMedia[] = filterInstagramMedia(
        fetchedData.data
      );

      const nextInstagramPage: NextInstagramPage = determineNextPage(
        fetchedData
      );

      resolve({
        nextPage: nextInstagramPage,
        data: filteredData,
      });
    }, RESPONSE_TIME_IN_MS);
  });
}

function filterInstagramMedia(
  mediaToFilter: InstagramMedia[]
): InstagramMedia[] {
  return mediaToFilter
    .filter((instagramMedia) => {
      return (
        instagramMedia.media_type === 'IMAGE' ||
        (instagramMedia.media_type === 'CAROUSEL_ALBUM' &&
          instagramMedia.children)
      );
    })
    .flatMap((instagramMedia) => {
      if (instagramMedia.media_type === 'IMAGE') {
        return instagramMedia;
      }

      const mappedAlbum: InstagramMedia[] = mapInstagramAlbum(instagramMedia);
      return mappedAlbum;
    });
}

function mapInstagramAlbum(album: InstagramMedia): InstagramMedia[] {
  return album.children.data
    .filter((instagramMediaChild) => {
      return instagramMediaChild.media_type === 'IMAGE';
    })
    .map((instagramMediaChild) => {
      const instagramMedia: InstagramMedia = { ...instagramMediaChild };
      return instagramMedia;
    });
}

function determineNextPage(
  instagramMediaResponse: InstagramMediaResponse
): NextInstagramPage {
  const nextPageExists = pageExists(instagramMediaResponse);

  const nextPageUri = nextPageExists
    ? getNextInstagramPageUri(instagramMediaResponse.paging)
    : null;

  return {
    exists: nextPageExists,
    uri: nextPageUri,
  };
}

function pageExists(instagramMediaResponse: InstagramMediaResponse): boolean {
  return instagramMediaResponse.paging && instagramMediaResponse.paging.next
    ? true
    : false;
}

function getNextInstagramPageUri(instagramMediaPaging: InstagramMediaPaging) {
  return instagramMediaPaging.next;
}
