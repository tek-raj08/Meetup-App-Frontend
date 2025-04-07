import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="bg-light">
      <nav className="navbar navbar-expand-lg container">
        <Link id="logo" to="/" className="navbar-brand">
          Meetup
        </Link>
        <div className="input-group ms-auto" style={{ maxWidth: "300px" }}>
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search by title and tag"
            value={search}
            onChange={handleSearch}
          />
        </div>
      
      </nav>
      
    </div>
  );
}
