const getUniqueGameData = async function(id){

    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/game?id='+id;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9ca9de10cbmsh683d07b1900b52bp1b83f3jsn970cfbe37bf4',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const response = await fetch(url,options)

    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }

    console.log(response)
}

export default getUniqueGameData;