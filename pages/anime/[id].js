import React from 'react'
import styles from '../../styles/anime.module.css'
import Header from '../../components/Header'
import Layout from '../../components/Layout'

export default function anime({ animeResposta }) {
  return (
    <Layout>
      <title>{animeResposta.data.title}</title>
      <div className={styles.Wrapper}>
        <div className={styles.animeWrapper}>
          <div className={styles.animeTitle}>{animeResposta.data.title}</div>
          <div className={styles.centerPoster}>
            <img className={styles.poster}
              src={animeResposta.data.images.webp.image_url}
            />
          </div>
          <div className={styles.borderTop}>
            <span className={styles.animeType}>Type:</span>
            <span className={styles.animeDescription}>{animeResposta.data.type}</span>
          </div>
          <div className={styles.animePadding}>
            <span className={styles.animeType}>Episodes:</span>
            <span className={styles.animeDescription}>
              {!animeResposta.data.episodes ? "???" : animeResposta.data.episodes}
            </span>
          </div>
          <div className={styles.animePadding}>
            <span className={styles.animeType}>Status:</span>
            <span className={styles.animeDescription}>{animeResposta.data.status}</span>
          </div>
          <div className={styles.animePadding}>
            <span className={styles.animeType}>Genres:</span>
            <div className={styles.animeFlex}>
              <span className={styles.animeDescription}>
                {animeResposta.data.genres.map((element, index) => {
                  if (animeResposta.data.genres.length - 1 === index) {
                    return (<span key={index}>{element.name}</span>)
                  } else {
                    return (<span key={index}>{element.name}, </span>)
                  }
                })
                }
              </span>
            </div>
          </div>
          <div className={styles.animePadding}>
            <span className={styles.animeType}>Score:</span>
            <span className={styles.animeDescription}>{animeResposta.data.score}</span>
          </div>
        </div>
        <div className={styles.synops}>
          <div className={styles.trailerTitle}>Trailer</div>
          <div className={styles.trailerWrapper}>
            <div className={styles.trailerRight}>
              <iframe className={styles.animeTrailer} allow="accelerometer; fullscreen;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                src={animeResposta.data.trailer.embed_url}>
              </iframe>
            </div>
            <div className={styles.animeProducers}>Producers:
              <span>
                {animeResposta.data.producers.map((element, index) => {
                  if (animeResposta.data.producers.length - 1 === index) {
                    return (<span className={styles.producersName} key={index}>{element.name}</span>)
                  } else {
                    return (<span className={styles.producersName} key={index}>{element.name},<p></p></span>)
                  }
                })
                }
              </span>
            </div>
          </div>
          <div className={styles.synopsTitle}>Synopsis</div>
          <div className={styles.animeSynopsis}>{animeResposta.data.synopsis}</div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  const baseurl = "https://api.jikan.moe/v4";

  const { id } = context.query
  const anime = await fetch(`${baseurl}/anime/${id}`)
  const animeResposta = await anime.json()
  console.log(animeResposta)
  return { props: { animeResposta } }
}
