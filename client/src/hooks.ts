import { useState, useEffect } from "react";

export function useGiphy(keyword: string) {
  const [giphy, setGiphy] = useState("");

  useEffect(() => {
    const fetchGiphy = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${
            process.env.REACT_APP_GIPHY_API
          }&q=${keyword.split(" ").join("")}&limit=1`
        );
        const { data } = await response.json();
        setGiphy(data[0]?.images.downsized_medium.url);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGiphy();
  }, [keyword]);

  return giphy;
}
