// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)

// Creates a client
const translate = new Translate({
    credentials:CREDENTIALS,
    projectId:CREDENTIALS.project_id
});

// let data =[
//     {
//         "name": "Stock Market Live News Updates Sensex Nifty50 NiftyBank live: Fed FOMC raises rates as expected, Russia-Ukrain - CNBCTV18",
//         "url": "https://images.cnbctv18.com/wp-content/uploads/2021/09/bse-1019x573.jpg",
//         "description": "Stock Market LIVE Updates: Indian equity benchmarks Sensex and Nifty50 built on initial gains after a gap-up start on Thursday tracking strength across global markets, after the Fed's first hike in interest rates in more than three years, as expected. Gains a…",
//         "link": "https://www.cnbctv18.com/market/stocks/bse-sensex-nse-nifty50-fed-rate-hike-jerome-powell-fomc-boe-rate-decision-russia-ukraine-war-peace-talks-amazon-future-paytm-zomato-share-price-brent-crude-oil-gold-price-bitcoin-rate-12858692.htm"
//     },
//     {
//         "name": "Coronavirus vs. cold: Is my ‘scratchy throat’ COVID-19 or a result of changing weather? - Times of India",
//         "url": "https://static.toiimg.com/photo/90270469.cms",
//         "description": "As COVID-19 cases plummet in and around the world, people have started to go about their daily routine. There is an air of relief and many are now more relaxed and less concerned about the deadly virus. However, the onset of any cold-like symptom still compel…",
//         "link": "https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/coronavirus-vs-cold-is-my-scratchy-throat-covid-19-or-a-result-of-changing-weather/photostory/90270433.cms"
//     },
//     {
//         "name": "Russia-Ukraine war news LIVE updates: 1 killed, 3 wounded as downed Russian missile hits residential building - CNBCTV18",
//         "url": "https://images.cnbctv18.com/wp-content/uploads/2022/03/Reefugee-1019x573.jpg",
//         "description": "Russia-Ukraine War LIVE Updates: Russia's invasion of Ukraine entered its 21st day on Thursday with Moscow yet to capture any of Ukraine's biggest cities despite the largest assault on a European state since World War Two. In the capital Kyiv, at least one pe…",
//         "link": "https://www.cnbctv18.com/world/russia-ukraine-war-live-updates-emergency-un-meeting-vladimir-putin-zelenskyy-fed-rate-hike-oil-prices-icj-orders-mariupol-joe-biden-12858372.htm"
//     },
//     {
//         "name": "Sharmaji Namkeen Trailer: Rishi Kapoor Retires To The Kitchen In His Last Role - NDTV Movies",
//         "url": "https://c.ndtvimg.com/2022-03/tmetd7ho_rishi_625x300_17_March_22.jpg",
//         "description": "Presenting Rishi Kapoor as Sharmaji and Paresh Rawal also as Sharmaji",
//         "link": "https://www.ndtv.com/entertainment/sharmaji-namkeen-trailer-rishi-kapoor-retires-to-the-kitchen-in-his-last-role-2828010"
//     }
// ]

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'Hello, world!';
const target = 'hi';

async function translateText(transData) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(transData, target);
  translations = Array.isArray(translations) ? translations : [translations];
  translations.forEach((translation, i) => {
  });

  return translations
}

async function translateData(data) {
    let alltranslateDataPromise = data.map(async(item)=>{
        let arrText = Object.values(item)
        return await translateText(arrText)
    })

    let translatedData = await Promise.all(alltranslateDataPromise)

    let finalTranslatedData = data.map(async(item,index)=>{
        let obj={}
        let newsObjKeys = Object.keys(item)
        
        newsObjKeys.forEach((keys,i)=>{
            obj[keys] = translatedData[index][i]
        })
        return obj
    })

    return Promise.all(finalTranslatedData)
  }
module.exports = translateData;


