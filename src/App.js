import { ImageList, ImageListItem, ImageListItemBar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`http://${process.env.REACT_APP_API_URL}/images`);
      const images = await response.json();
      setData(images.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData([]);
    const response = await fetch(`http://${process.env.REACT_APP_API_URL}/images?tags=${searchData}`);
    const images = await response.json();
    setData(images.data);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Flikr Public Image</h1>
      <form>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search.."
          className="search mb-5 mr-5 bg-slate-100 py-2 px-3 rounded-lg"
        />
        <Button
          variant="contained"
          type="submit"
          onClick={search}
          className="bg-gray-800 text-white py-2 px-3 rounded-lg"
        >
          Go
        </Button>
      </form>
      <div className="img-container">
      {loading ? <p>loading...</p> :
          data.length === 0 ? <p>image not found.</p> : 
          <ImageList variant="masonry" cols={4} gap={20}>
            {data.map((item) => (
              <ImageListItem key={item.title}>
                <img src={item.url_img} alt={item.title} loading="lazy" />
                <ImageListItemBar position="below" title={item.title} />
              </ImageListItem>
            ))}
          </ImageList>
      }
      </div>

    </div>
  );
}

export default App;