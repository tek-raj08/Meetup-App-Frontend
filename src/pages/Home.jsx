import React, { useState } from "react";
import useFetch from "../components/useFetch";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";


function Home() {
  const { data, loading, error } = useFetch("https://meetup-app-git-main-tek-rajs-projects.vercel.app/events");

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleSearch = (term) => {
    setSearch(term.toLowerCase());
  };

  const selectedEvents = data?.event?.filter((e) => {
    const matchesEventType = filter === "" || filter === "Both" || e.eventType === filter;
    const matchesTitleAndTags =
      e.title.toLowerCase().includes(search) ||
      e.eventTag?.some((tag) => tag.toLowerCase().includes(search));

    return matchesEventType && matchesTitleAndTags;
  });

  if(loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <>
      <Nav onSearch={handleSearch} />
      <div className=" pt-3 bg-light">
        <div className="container">
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Meetup Events</h2>
          <select
            className="form-select w-auto"
            value={filter}
            onChange={handleFilter}
            
          >
            <option value=""  >
              Select Event Type
            </option>
            <option value="Online Event">Online Events</option>
            <option value="Offline Event">Offline Events</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="row">
          {selectedEvents?.map((e) => (
            <div className="col-sm-4 mb-2" key={e._id}>
              <Link to={`/events/${e._id}`} className="text-decoration-none text-dark">
              <div className="card">
                <img src={e.imgUrl} alt={e.title} style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }} />
                <span
                  className={`badge position-absolute top-0 start-0 m-2 px-2 py-1 ${
                    e.eventType === "Online Event"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                  style={{ borderRadius: "0.5rem", fontSize: "0.8rem" }}
                >
                  {e.eventType}
                </span>
                <div className="card-body">
                  <small>{e.eventDate}</small>
                  <h5>{e.title}</h5>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;
