import React, { useRef, useState } from "react";
import axios from "axios";

const StarWarsTable = () => {
  const fetch = useRef(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [total, setTotal] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async (url) => {
    try {
      await axios
        .get(url)
        .then((response) => {
          setNextUrl(response?.data?.next);
          setPreviousUrl(response?.data?.previous);
          setTotal(response?.data?.count);
          setData(response?.data?.results);
          setIsLoading(false);
        })
        .finally(() => {
          fetch.current = false;
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (fetch.current) {
    fetchData("https://swapi.dev/api/people/?page=1");
  }

  const handlePreviousPage = () => {
    setIsLoading(true);
    fetchData(previousUrl);
    setPage(previousUrl.match(/page=(\d+)/)[1]);
  };

  const handleNextPage = () => {
    setIsLoading(true);
    fetchData(nextUrl);
    setPage(nextUrl.match(/page=(\d+)/)[1]);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const getPageRange = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, total);
    return `${startIndex} to ${endIndex} of ${total}`;
  };

  return (
    <>
      {fetch.current && (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
      <div className="container">
        <div className="flexbox">
          <h1>Star Wars Characters</h1>
          <div style={{ border: "1px solid #c7c7c7", borderRadius: "6px" }}>
            <input type="file" onChange={handleFileUpload} />
          </div>
        </div>
        <table className="star-wars-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Gender</th>
              <th>Birth Year</th>
              <th>Eye Color</th>
              <th>Hair Color</th>
            </tr>
          </thead>
          <tbody>
            {!fetch?.current && isLoading ? (
              <div className="small-loader-wrapper">
                <div className="small-loader"></div>
              </div>
            ) : (
              data.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.height} cm</td>
                  <td>{item.mass} kg</td>
                  <td>{item.gender}</td>
                  <td>{item.birth_year}</td>
                  <td>{item.eye_color}</td>
                  <td>{item.hair_color}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!fetch?.current && (
          <div
            className="pagination"
            style={{
              marginTop: !fetch?.current && isLoading ? "10rem" : "0",
            }}
          >
            <div style={{ marginRight: "1rem" }}>{getPageRange(page)}</div>
            <button onClick={handlePreviousPage} disabled={!previousUrl}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={!nextUrl}>
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default StarWarsTable;
