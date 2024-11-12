export function GetTimeOnDate(date: string) {
    const time = new Date(date);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes}`;
}

export function GetDateOnDate(date: string) {
    const time = new Date(date);
    const day = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    return `${day}/${month+1}/${year}`;
}

export function GetTime(date:string){
    const time = new Date(date);
    const day = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const hours = time.getHours();
    const minutes =  time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    return `${hours}:${minutes} ${day}/${month+1}/${year}` ;
}