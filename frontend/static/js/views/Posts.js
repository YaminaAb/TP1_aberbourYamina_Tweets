import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Tweets");
  }

  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    const data = await getData("/static/js/views/tweet.json");
    //Récuperer tout les tweets de tweet.json
    let tweets = data["twitter_user"]["tweets"];    

    //Affichage des tweets
    let allTweets = `<div class="container">
                    <div class="d-flex"> 
                        <h3 class=" modal-title mt-2"> ${data["twitter_user"]["screen_name"]} </h3>                       
                    </div>`;                  


    for (let key in tweets) {

    //Convertir la date 
    //Référence: https://stackoverflow.com/questions/27025218/converting-twitters-created-at-date-using-javascript

    let date = tweets[key]["created_at"];
    date.split(' ').splice(1,2).join(' ');   
    let split = date.split(' ');
    let dateSplit = split.splice(1,2);
    let year = split[split.length-1];
    dateSplit.push(year);
    dateSplit = dateSplit.join(' ');
    allTweets += `     

        <div class="card mt-3">
          <div class="card-header">${dateSplit}</div>
          <div class="card-body">
            
            <p class="card-text"> ${tweets[key]["text"]}             
            </p>
            <a href="/${ tweets[key]["id"]} " class="btn btn-primary" data-link>
              Afficher
            </a>
          </div>
        </div>
      `;
    }   

    allTweets+= `</div>`    
    return  allTweets;
  }
}
