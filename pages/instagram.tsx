 export{}
// import Head from "next/head";
// import styles from "../styles/Home.module.css";
// import Instagram from "instagram-web-api";
// import Link from "next/link";
// import Image from "next/image";
//
// export default function Home({ posts }) {
//     return (
//         <div className={styles.container}>
//             <Head>
//                 <title>Instagram Posts</title>
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>
//
//             <h1>Instagram Posts</h1>
//             <div className={styles.grid}>
//                 {posts.map(({ node }, i) => {
//                     return (
//                         <Link
//                             href={{
//                                 pathname: "/createPage",
//                                 query: {
//                                     object: JSON.stringify(node.display_resources[0].src),
//                                 },
//                             }}
//                         >
//                             <a>
//                                 <div className={styles.card}>
//                                     <img src={node.thumbnail_resources[1].src} />
//                                     {/*<p>{node.edge_media_to_caption.edges[0]?.node.text}</p>*/}
//                                 </div>
//                             </a>
//                         </Link>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
//
// // export async function getStaticProps(context) {
// //     const client = new Instagram({
// //         username: "***",
// //         password: "***",
// //     });
// //     await client.login();
// //
// //     const response = await client.getPhotosByUsername({
// //         username: "thefinefind",
// //     });
// //
// //     return {
// //         props: {
// //             posts: response.user.edge_owner_to_timeline_media.edges,
// //         }, // will be passed to the page component as props
// //     };
// // }
