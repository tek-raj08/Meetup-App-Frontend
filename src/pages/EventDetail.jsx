import React from "react";
import useFetch from "../components/useFetch";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";

function EventDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://meetup-app-git-main-tek-rajs-projects.vercel.app/events/${id}`
  );

  const event = data?.event;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  if (!event) return <p>No event found.</p>;

  return (
    <>
      <Nav />
     
     
     
    
      
      <div className="py-4 row ps-4 bg-light">
        
      <hr />
       
        <div className="col-md-6 ms-5 ">
          <h2>{event.title}</h2>
          <small>Hosted By:</small>
          <p>
            <strong>{event.hostedBy}</strong>
          </p>

          <img src={event.imgUrl} alt={event.title} className="img-fluid mb-3" />

          <h5>Details:</h5>
          <p>{event.details}</p>

          <h5>Additional Information:</h5>
          <p>
            <strong>Dress Code:</strong> <small>{event.dressCode}</small>
          </p>
          <p>
            <strong>Age Restriction:</strong>{" "}
            <small>{event.ageRestrictions}</small>
          </p>

          <h5>Event Tags:</h5>
          {event.eventTag?.map((tag) => (
            <button className="btn btn-danger me-3 p-1">{tag}</button>
          ))}
        </div>

        <div className="col-md-4  ms-auto  container">
          <div className="bg-white px-4 py-2">
            <p>{event.eventDate}</p>

            <p>{event.venue}</p>

            <p>{event.price}</p>
          </div>

          <h5 className="mt-3">Speaker: ({event.speakers.length || 0})</h5>

          <div className="d-flex gap-2 flex-wrap">
            {event.speakers?.map((s, i) => (
              <div
                key={i}
                className="card p-2 text-center m-2"
                style={{ width: "180px", height: "150px" }}
              >
                <div>
                <img
                  src={s.profileImgUrl}
                  className="rounded-circle"
                  alt={s.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                
                </div>
                <strong>{s.name}</strong>
                <small>{s.role}</small>
              </div>
            ))}
          </div>
          {event.speakers.length === 2 ? (
            <div className="d-flex justify-content-center align-items-center me-5 mt-2 ">
          <button className="btn btn-danger  w-50">RSVP</button>
        </div>
          ) : (
            <div className="mt-2 ">
          <button className="btn btn-danger w-25 ms-4">RSVP</button>
        </div>
          )
           
        }
          
        </div>
      </div>
    </>
  );
}

export default EventDetail;
