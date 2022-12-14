import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import Head from "next/head";

import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import ResultsTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";

// import { getFilteredEvents } from "../../helpers/api-util";

const FilteredEventsPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-events-project-c8bc8-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let headPageData = (
    <Head>
      <title>Filtered events</title>
      <meta name="description" content="A list of filtered events" />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {headPageData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numberYear = +filteredYear;
  const numberMonth = +filteredMonth;

  headPageData = (
    <Head>
      <title>Filtered events</title>
      <meta
        name="description"
        content={`All events for ${numberMonth}/${numberYear}`}
      />
    </Head>
  );

  if (
    isNaN(numberYear) ||
    isNaN(numberMonth) ||
    numberYear > 2023 ||
    numberYear < 2021 ||
    numberMonth < 1 ||
    numberMonth > 12 ||
    error
  ) {
    return (
      <>
        {headPageData}
        <ErrorAlert>
          <p>Invalid filter. Please select one more time!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numberYear &&
      eventDate.getMonth() === numberMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {headPageData}
        <ErrorAlert>
          <p>No events has been planned for selected period</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numberYear, numberMonth - 1);

  return (
    <div>
      {headPageData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filteredData = params.slug;

//   const filteredYear = filteredData[0];
//   const filteredMonth = filteredData[1];

//   const numberYear = +filteredYear;
//   const numberMonth = +filteredMonth;

//   if (
//     isNaN(numberYear) ||
//     isNaN(numberMonth) ||
//     numberYear > 2023 ||
//     numberYear < 2021 ||
//     numberMonth < 1 ||
//     numberMonth > 12
//   ) {
//     return { props: { hasError: true } };
//   }

//   const filteredEventsList = await getFilteredEvents({
//     year: numberYear,
//     month: numberMonth,
//   });

//   return {
//     props: {
//       events: filteredEventsList,
//       date: {
//         year: numberYear,
//         month: numberMonth,
//       },
//     },
//   };
// }
