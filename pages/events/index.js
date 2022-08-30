import { useRouter } from "next/router";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";

const AllEventsPage = (props) => {
  const router = useRouter();

  const { events } = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
