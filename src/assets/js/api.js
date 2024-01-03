async function fetchToday() {
    
    dt = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"})
    wk = new Date().getDay()
    week = ["日","月","火","水","木","金","土"][wk]
    datestr = `${dt} (${week})`

    response = (await fetch(`https://tokikk.github.io/${dt.replaceAll('/', '')}`))
    result = ""
    if (response.ok) {
        result = response.text()
        if (result === "") {
            if (wk === 0) {
                result = "日曜日"
            } else if (wk === 6) {
                result = "土曜日" 
            } else {
                result = "平日"
            }
        }
    } else {
        if (wk === 0) {
            result = "日曜日"
        } else if (wk === 6) {
            result = "土曜日" 
        } else {
            result = "平日"
        }
    }
    return {
        date: datestr,
        name: result
    }
}

async function fetchNextHoli() {
    today =new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '')
    response = (await fetch(`https://tokikk.github.io/holidaylist`))
    result = ""
    if (response.ok) {
        result = await response.text()
        holidays = result.split("\n")
        nextholiday = holidays.find( day => {
            return day.slice(0,8) > today
        });
        holistr = nextholiday.split(",")[0]

        year = holistr.slice(0, 4); 
	    month = holistr.slice(4, 6); 
	    day = holistr.slice(6, 8); 
        dt = new Date(year, month-1, day)
        wk = dt.getDay()
        week = ["日","月","火","水","木","金","土"][wk]

        return {
            date : `${dt.toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"})} (${week})`,
            name : nextholiday.split(",")[1]
        }
    }
}