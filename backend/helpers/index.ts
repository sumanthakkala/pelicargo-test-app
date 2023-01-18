import fetch from "node-fetch";
import dotenv from "dotenv";
import { ImageData } from "../types";
dotenv.config();

const getFetchOptions = (externalApi: "unsplash" | "pexels") => {
  return {
    method: "GET",
    headers: {
      Authorization:
        externalApi === "pexels"
          ? `${process.env.PEXELS_TOKEN}`
          : `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  };
};

const getParsedPexelsData = (data: any) => {
  const photos = (data.photos as any[]) || [];
  const parsedPhotos: ImageData[] = photos.map((item) => {
    return {
      id: item.id,
      imgWidth: item.width,
      imgHeight: item.height,
      url: item.src.large,
      alt: item.alt,
    };
  });
  return parsedPhotos;
};

const getParsedUnsplashData = (data: any) => {
  const photos = (data.results as any[]) || [];
  const parsedPhotos: ImageData[] = photos.map((item) => {
    return {
      id: item.id,
      imgWidth: item.width,
      imgHeight: item.height,
      url: item.urls.regular,
      alt: item.alt_description,
    };
  });
  return parsedPhotos;
};

export const fetchResults = (searchKey: string, page: number) => {
  const pexelsUrl = `https://api.pexels.com/v1/search?query=${searchKey}&page=${page}&per_page=9`;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${searchKey}&page=${page}&per_page=9`;

  const pexelsFetch = fetch(pexelsUrl, getFetchOptions("pexels"))
    .then((res) => res.json())
    .then((json) => Promise.resolve(json))
    .catch((err) => Promise.reject(err));

  const unsplashFetch = fetch(unsplashUrl, getFetchOptions("unsplash"))
    .then((res) => res.json())
    .then((json) => Promise.resolve(json))
    .catch((err) => Promise.reject(err));

  return Promise.all([pexelsFetch, unsplashFetch])
    .then((values) => {
      return Promise.resolve({
        pexels: getParsedPexelsData(values[0]),
        unsplash: getParsedUnsplashData(values[1]),
        page,
      });
    })
    .catch((err) => Promise.reject(err));
};
