import { getHeroesById } from "./08-import-export.js"

const getHeroByIdAsync = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const hero = getHeroesById(id);
            hero ? resolve(hero.name) : reject('Not able to find hero..');
        }, 2000)
    })
}

getHeroByIdAsync(1)
    .then(console.log)
    .catch(console.warn)