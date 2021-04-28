import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import React, { useEffect, useState } from 'react';

import { InstagramMedia } from '../../types/InstagramMedia';
import { useStyles } from './MasonGridList.styles';

export default function MasonGridList() {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const mediaResponse = await fetch('/api/instagram/v1/media');
      const fetchedData = await mediaResponse.json();
      /*const fetchedData = JSON.parse(
        `{"data":[{"id":"18130169530014571","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/88961488_153014922453602_3962324936424611945_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=q7i1x-C1XIwAX-QhXQU&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=86e738ce078e7b4ad757dc468d995971&oe=60A75F3B","media_type":"IMAGE"},{"id":"17888157256336289","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/58468856_413879866011559_5835193434207482613_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=hkG0f3eHwisAX-yp9xN&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=d1c7446ed3f2e2e93ed2fe10035745e0&oe=60A90F43","media_type":"IMAGE"},{"id":"17880594538341567","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/58902461_224535625170927_7926780589683853138_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=PG_lt2LOX78AX8GiyXk&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=6b1cd41d9251c1897a54b82de314032f&oe=60A95557","media_type":"IMAGE"},{"id":"17861063596015624","username":"zoolabus","media_url":"https://video-hou1-1.cdninstagram.com/v/t50.2886-16/14283195_689164884566658_1978005217_s.mp4?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=7HErN58qxTgAX8aUf5K&_nc_ht=video-hou1-1.cdninstagram.com&oh=5d329dd55985fb721f725e8211a99217&oe=60A7CD6A","media_type":"VIDEO"},{"id":"17851420948128518","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/14156667_161616834280029_23128649_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=UuM5e_jsFGgAX-9kQUB&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=1574da62fb953711ec444f9b3e9228d6&oe=60A671D6","media_type":"IMAGE"},{"id":"17860180528027536","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/13671934_863577370453435_1818343298_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=lapSy4r5_SgAX9gis-S&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=8e34f85e9486099cfa40f67f48ff33f0&oe=60A95A6D","media_type":"IMAGE"},{"id":"17850176041127716","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/13740987_347307038933567_1657603400_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=s-xCin_lR1AAX8YC3BJ&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=bde3eb57591c1fcf5f0302daa87aacc2&oe=60A89BF5","media_type":"IMAGE"},{"id":"17850531577122387","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/13722009_612878618881703_1181115293_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Qb20jH5G_L4AX9j2P0T&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=6cd5be5b71cc913cfbcb922509680cc6&oe=60A79527","media_type":"IMAGE"},{"id":"17841763708015791","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/10932368_848111748564965_1957180921_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=cIn_8bTzKxAAX8IHDp5&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=37eb7002336db9fe35d45d4b28239137&oe=60A86313","media_type":"IMAGE"},{"id":"17843472304015791","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/10890685_1418868915070634_720925404_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=9NlSuACwtRsAX_Xnb65&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=a12dfade8b29c2f94fe4e5ae10fd109d&oe=60A6300C","media_type":"IMAGE"},{"id":"17843050945015791","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/11358963_852570221482471_848697298_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=vMI8qJ2x78QAX_tVlwd&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=ac2a86615c46414ede2b1d2339959351&oe=60A7C29A","media_type":"IMAGE"},{"id":"17843046193015791","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/11378942_1595746177347479_623095731_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=ntqAlWgxHpUAX82lD58&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=e777ccd8e993449108bb017dacdd4a09&oe=60A67A63","media_type":"IMAGE"},{"id":"17843045359015791","username":"zoolabus","media_url":"https://scontent-hou1-1.cdninstagram.com/v/t51.2885-15/11378505_461061457396638_1287395561_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=GYqC544LZPwAX9uEQGx&_nc_ht=scontent-hou1-1.cdninstagram.com&oh=249d98bf72f9a3bb6820a94362f89dba&oe=60A96FAD","media_type":"IMAGE"}],"paging":{"cursors":{"before":"QVFIUlQ1bmV0TU51LUZAXemt4aGhxd2ltWWRoOEpwZA2hVZAWtHOXcyNDU0YXJNb3k3YWVwU0M1TllUQ1loZAVpoUW53YmdBN1hXZA2RDc2FKa0VxVlF1cEJnZAGlB","after":"QVFIUlBueWx6eHlob0tTN1NyN0ctX2djYVc3U0VoQ0REUXNIQkI4M0xIdjRFdVlhVU1qVzBnU053NWo4UnNjNW1SNTM5TEhjd2t5TlFQR2FQZA1F4cEU5aEp3"}}}`
      );*/
      const filteredData = fetchedData.data.filter((instagramMedia) => {
        return instagramMedia.media_type === 'IMAGE';
      });
      setData(filteredData);
      setIsFetching(false);
    };

    fetchData();
  }, []);

  const styles = useStyles();

  const Card = (instagramData: InstagramMedia) => {
    return (
      <GridListTile key={instagramData.id} cols={1}>
        <img
          className={styles.img}
          src={instagramData.media_url}
          alt={instagramData.caption || instagramData.id}
        />
      </GridListTile>
    );
  };

  return (
    <div className={styles.masonic}>
      <div>
        {data && !isFetching && (
          <GridList cellHeight={'auto'} className={styles.gridList} cols={3}>
            {data.map((tile) => Card(tile))}
          </GridList>
        )}
      </div>
      {isFetching && (
        <p className={styles.loading}>
          <span role="img" aria-label="camera">
            🤙🏼
          </span>{' '}
          Hang Tight..
        </p>
      )}
    </div>
  );
}
