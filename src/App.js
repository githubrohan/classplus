import React, { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/heading";
import Loader from "./components/loader";
import Image from "./components/image";
import Searchbox from "./components/searchbox";
import SuggestionBox from "./components/suggestionbox";
import Model from "./components/model";
import Notfound from "./components/notfound";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import InfiniteScrool from "react-infinite-scroll-component";
import { parseString } from "xml2js";
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding:0;
    box-sizing: border-box
  }
  body{
    font-family: sans-serif;
    padding:1rem;
    background: radial-gradient(#fff, #edf8fa);

  }
`;

const WrapperImage = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {
  const [images, setImages] = useState([]);
  const [formData, setformData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchbox, setSearchbox] = useState(false);
  const [searchQuery, setSearchQuery] = useLocalStorage("searchQuery", []);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = (condition) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
          process.env.React_APP_ACCESSKEY
        }&tags=${formData === "" ? "nyc" : formData}&per_page=20page=1`
      )
      .then((res) => {
        parseString(res.data, (err, result) => {
          if (result.rsp.photos[0].photo === undefined) {
            setImages([]);
          } else {
            result.rsp.photos[0].photo.map((data) => {
              var url = `https://live.staticflickr.com/${data.$.server}/${data.$.id}_${data.$.secret}.jpg`;

              if (condition === "newSearch") {
                setImages([url]);
                if (formData.trim() !== "") {
                  var index = searchQuery.indexOf(formData);
                  if (index < 0) {
                    setSearchQuery(formData);
                  }
                }
              } else {
                setImages([...images, url]);
              }
              return url;
            });
          }
        });
      });
  };

  const handleChange = (event) => {
    setformData(event.target.value);
    setSearchbox(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchbox(false);
    fetchImages("newSearch");
  };

  const handleQuerySelect = (query) => {
    setformData(query);
    setSearchbox(false);
    fetchImages("newSearch");
  };

  return (
    <div className="App">
      <Header />
      <Searchbox
        onChange={handleChange}
        submit={handleSubmit}
        value={formData}
      />
      {searchbox && searchQuery.length > 0 && formData && (
        <SuggestionBox
          searchQuery={searchQuery}
          onQuerySelect={handleQuerySelect}
        />
      )}

      <GlobalStyle />

      <InfiniteScrool
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={images.length > 0 && <Loader />}
      >
        <WrapperImage>
          {images.length === 0 ? (
            <Notfound />
          ) : (
            images.map((image) => (
              <Image
                url={image}
                key={`${image}+${new Date()}`}
                setSelectedImage={setSelectedImage}
              />
            ))
          )}
        </WrapperImage>
      </InfiniteScrool>
      {selectedImage && (
        <Model
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </div>
  );
}

export default App;
