import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Détails Tweet");
  }

  async getHtml() {
    const nu = this.params.id;
   
    async function getData(url) {
      const response = await fetch(url);

      return response.json();
    }

    const data = await getData("/static/js/views/tweet.json");    
    
    let tweets = data["twitter_user"]["tweets"];
    let tweetDetails = tweets.find((item) => item.id === nu);
    //Convertir la date 
    //Référence: https://stackoverflow.com/questions/27025218/converting-twitters-created-at-date-using-javascript

    let date = tweetDetails["created_at"];
    date.split(' ').splice(1,2).join(' ');   
    let split = date.split(' ');
    let dateSplit = split.splice(1,2);
    let year = split[split.length-1];
    dateSplit.push(year);
    dateSplit = dateSplit.join(' ');  


    //Affichage des détails de tweet
    let Tweet = `<div class="container">`;
                    
          Tweet += `            
            <div class="card mt-3">

              <div class="card-header d-flex justify-content-between ">
                <div>  ${dateSplit} </div> 
                <div class=" d-flex">
                    <div class=" d-flex"><img src="/static/svg/retweet-svg.svg" width="25" class="me-2"> ${tweetDetails["retweets_count"]}</div>                
                    <div class=" d-flex"><img src="/static/svg/like-svg.svg" width="19" class="ms-4 me-2"> ${tweetDetails["likes"]}</div> 
                </div>                 
              </div>

              <div class="card-body">
                <p class="card-text"> ${ tweetDetails["text"]} </p>
                <a href="/ " class="btn btn-primary" data-link>
                  Retour
                </a>
              </div>
            </div>
          `;
    
          Tweet += `</div>`;

    return Tweet;
  }
}
