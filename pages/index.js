import "isomorphic-fetch";
import Link from "next/link";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";

export default class extends React.Component {
  static async getInitialProps() {
    const req = await fetch("https://api.audioboom.com/channels/recommended");
    const { body: channels } = await req.json();

    return { channels };
  }

  render() {
    const { channels } = this.props;
    return (
      <Layout>
        <ChannelGrid channels={channels} />
      </Layout>
    );
  }
}
