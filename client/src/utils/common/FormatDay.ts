export function FormatDay(date: string) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

export function FormatTimeStamps(date: string) {
    const d = new Date(date);
    return `${d.getDate()}/${
        d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}
