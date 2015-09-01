var State = {
    AppState: {
        numberingpositionatstart:true,
        tweetstormtext:localStorage.getItem('tweetstormtext') != null ? localStorage.getItem('tweetstormtext') : '', 
        queuedtweets:[],        
    },
    UIState: {
        tweetbutton:null,
        composebox: true 
    }
}

module.exports = State;