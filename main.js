const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    console.log(response.data)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}



const create_table = (position, first_name, last_name, nationality, sponsor_name, wins, points, wiki) =>{
    const html = `<tr><td>${position}</td><td>${first_name} ${last_name}</td><td>${nationality}</td><td>${sponsor_name}</td><td>${wins}</td><td>${points}</td><td><a href="${wiki}">More Info</a></td></tr>`
    document.getElementById('racerbody').insertAdjacentHTML('beforeend', html)


}

const load_data = async () => {
    clear_table()
    let query_season = document.getElementById('season').value
    let query_round = document.getElementById('yearround').value
    //console.log(query_season, query_round)
    const myracer = await getData(query_season, query_round)
    //console.log(new_standings)
    //position -- sponsor, points
    myracer.forEach( element => create_table(element.position, element.Driver.givenName, element.Driver.familyName, element.Driver.nationality, element.Constructors[0].name, element.wins, element.points, element.Driver.url))

}

const clear_table = () => {
    document.getElementById('racerbody').innerHTML = ''
}