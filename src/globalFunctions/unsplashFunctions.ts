import axios, { AxiosInstance } from "axios";
const apiKeyUnsplash = import.meta.env.VITE_ACCESS_KEY;
const clientAxiosUnsplash: AxiosInstance = axios.create({
    baseURL: `https://api.unsplash.com/search/photos`,
    params: {
        client_id: apiKeyUnsplash,
    },
});

clientAxiosUnsplash.interceptors.request.use((config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log("Pełna ścieżka URL:", fullUrl);
    return config;
});

interface Urls {
    full: string;
    raw: string;
    regular: string; 
    small: string; 
    small_s3: string; 
    thumb: string;
}

export interface Image {
    id: number;
    alt_description: string;
    urls: Urls;
}

interface FetchResponse {
    results: Image[];
    total: number;
    total_pages: number;
}

export async function fetchPicturesPerPage1(
    query: string,
    currentPage: number
): Promise<FetchResponse | undefined> {
    const searchParams = new URLSearchParams({
        query: query,
        //   image_type: "photo",
        //   orientation: "horizontal",
          per_page: "10",
          page: currentPage.toString(),
    });
    if (query) {
        const url = `?${searchParams}`;
        console.log(url);
        const response = await clientAxiosUnsplash.get(url);
        
        console.log(response.data);
        return response.data;
    }
    return;
}