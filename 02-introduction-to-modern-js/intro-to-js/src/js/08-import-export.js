import { heroes } from "./08-heroes.js";


export const getHeroesById = (id) => heroes.find(hero => hero.id === id);

console.log(getHeroesById(2));

const getHeroesByOwner = (owner) => heroes.filter(hero => hero.owner === owner);

console.log(getHeroesByOwner('Marvel'));