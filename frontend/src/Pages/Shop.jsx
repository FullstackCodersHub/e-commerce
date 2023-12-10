import { Hero } from "../Components/Hero/Hero";
import { NewCollections } from "../Components/NewCollections/NewCollections";
import { NewsLetter } from "../Components/NewsLetter/NewsLetter";
import { Offer } from "../Components/Offer/Offer";
import { Popular } from "../Components/Popular/Popular";

export const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offer />
      <NewCollections />

      <NewsLetter />
    </div>
  );
};
