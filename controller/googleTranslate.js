// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)

// Creates a client
const translate = new Translate({
    credentials:CREDENTIALS,
    projectId:CREDENTIALS.project_id
});


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


