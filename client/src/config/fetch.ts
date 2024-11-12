const fetchData = async (url: string) => {
    const data = await fetch(`http://localhost:3000${url}`, {      
    });
    return data.json();
}

export default fetchData;