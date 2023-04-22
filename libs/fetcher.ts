import axios from 'axios';

// This is a function that takes a URL and returns the result of an HTTP GET request to that URL using the axios library.

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
