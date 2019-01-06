import Link from "next/link";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
import PodcastList from "../components/PodcastList";

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const idChannel = query.id;
    const [reqChannel, reqAudio, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ]);

    const [dataChannel, dataAudio, dataSeries] = await Promise.all([
      reqChannel.json(),
      reqAudio.json(),
      reqSeries.json()
    ]);

    const { channel } = dataChannel.body;
    const podcasts = dataAudio.body.audio_clips;
    const series = dataSeries.body.channels;

    return { channel, podcasts, series };
  }

  render() {
    const { channel, podcasts, series } = this.props;

    return (
      <Layout title={channel.title}>
        <div
          className="banner"
          style={{
            backgroundImage: `url(${channel.urls.banner_image.original})`
          }}
        />

        <h1>{channel.title}</h1>

        <h2>Series</h2>
        <ChannelGrid channels={series} />

        <h2>Ultimos podcasts</h2>
        <PodcastList podcasts={podcasts} />

        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>
      </Layout>
    );
  }
}
