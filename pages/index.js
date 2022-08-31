import Head from "next/head";

import NewsletterRegistration from "../components/input/newsletter-registration";
import EventList from "../components/events/event-list";

import { getFeaturedEvents } from "../helpers/api-util";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS events in the town</title>
        <meta
          name="description"
          content="A lot of fun events! Find one for yourself and become a better version of yourself"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
