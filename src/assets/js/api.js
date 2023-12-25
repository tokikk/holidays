function getToday() {
    
    dt = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"})
    wk = new Date().getDay()
    week = ["日","月","火","水","木","金","土"][wk]

    result = `${dt} (${week})`
    return result
}

async function fetchHoli() {
    dt =new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '')
    //result = await fetch(`https://tokikk.github.io/data/${dt}`)
    response = (await fetch(`https://tokikk.github.io/19550101`))
    result = ""
    if (!response.ok) {
        result = "祝日じゃない"
    } else {
        result = response.text()
        if (result == "") {
            result = ""
        }       
    }
    return result
};

async function fetchNextHoli() {
    today =new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '')
    response = (await fetch(`https://tokikk.github.io/holidaylist`))
    result = ""
    if (response.ok) {
        result = await response.text()
        console.log(result)
        holidays = result.split("\n")
        nextholidays = holidays.filter( day => {
            return day.slice(0,8) > today
        });
        return nextholidays.slice(0, 1)
    }
}

async function fetchHoliList() {
    today =new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '')
    response = (await fetch(`https://tokikk.github.io/holidaylist`))
    result = ""
    if (response.ok) {
        result = await response.text()
        console.log(result)
        holidays = result.split("\n")
        nextholidays = holidays.filter( day => {
            return day.slice(0,8) > today
        });
        return nextholidays.slice(0, 5)
    }
}