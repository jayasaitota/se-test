const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1074547b3e934518b50cddb64fef6df3');

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
export const getTopHeadLines = async ()=>{
return await  newsapi.v2.topHeadlines({
  language: 'en',
  country: 'us'
}).then(response => {
  return {
    status: "ok",
    articles: [...response.articles]
  }
}).catch(err=>{
  console.log(err)
  return {
    error:'ok',
    err:err
  }
})
}

// To query /v2/everything
// You must include at least one q, source, or domain
export const getNewsByTopic = async (topic)=>{
return await newsapi.v2.everything({
  q: topic,
  from: new Date().toISOString().split('T')[0],
  sortBy: 'popularity',
}).then(response => {
  return {
    status: "ok",
    articles: [...response.articles]
  }
}).catch(err=>{
  return {
    error:'ok',
    err:err
  }
})
}
