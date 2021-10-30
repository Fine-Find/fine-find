import Head from 'next/head';
import { withRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const createPageEndpoint = '/api/createPage';

const createPage = async (body) => {
  const response = await fetch(`${createPageEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetcher = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      body,
    }),
  }).then((res) => res.json());

function About({ router: { query } }) {
  const object = JSON.parse(query.object);

  async function handleClick(e) {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('whoopie');
    const link: string = await createPage({ imageUrl: object });

    return link;
    // const { data, error } = useSwr("/api/createPage", fetcher("test"));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Link</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Your Post</h1>
      <Image src={object} alt="Dashboard" />

      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
        onClick={handleClick}
      >
        Create Link
      </button>
    </div>
  );
}

export default withRouter(About);
