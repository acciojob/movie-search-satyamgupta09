// import { useEffect, useState } from "react";

// export default function Search() {
//   const [movie, setMovie] = useState("");
//   const [data, setData] = useState({});
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const movie = e.target.value;
//     // console.log(movie);
//     setMovie(movie);
//   };

//   const handleFetch = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `https://www.omdbapi.com/?apikey=99eb9fd1&t=${movie}`
//       );
//       const res = await response.json();
//       //   console.log(res);
//       if (res.Response === "False") {
//         setError("Invalid movie name. Please try again.");
//       } else {
//         setData(res);
//         setError("");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleFetch}>
//         <input type="text" onChange={handleChange} />
//         <button type="submit">Search</button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       {data && (
//         <ul>
//           <li>
//             <h2>{data.Title}</h2>
//             <img src={data.Poster} />
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";

export default function Search() {
  const [movie, setMovie] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setMovie(e.target.value);
  };

  const handleFetch = (e) => {
    e.preventDefault();

    fetch(`https://www.omdbapi.com/?apikey=99eb9fd1&s=${movie}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.Response === "False") {
          setError("Invalid movie name. Please try again.");
          setData({});
        } else {
          console.log(res.Search);
          setData(res.Search);
          setError("");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleFetch}>
        <input type="text" onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {data && (
        <ul>
          {data?.map((movie, index) => (
            <li key={index}>
              <h2>{movie.Title}</h2>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
