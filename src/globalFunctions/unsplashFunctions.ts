import axios, { AxiosInstance } from "axios";
const apiKeyUnsplash = import.meta.env.VITE_ACCESS_KEY;
import { Options } from "../components/Context/ImageProvider";
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
    currentPage: number,
    options:Options,
): Promise<FetchResponse | undefined> {
    const searchParams = new URLSearchParams({
        query: encodeURIComponent(query),
        per_page: "30",
        page: currentPage.toString(),
    });
    // Dodajemy parametr orientation tylko, jeśli jego wartość nie jest pusta
    if (options.orientation) {
        searchParams.append("orientation", options.orientation);
    }
    if (options.color) {
        searchParams.append("color", options.color);
    }
    if (query) {
        const url = `?${searchParams}`;
        const response = await clientAxiosUnsplash.get(url);
        console.log(response.data);
        return response.data;
    }
    return;
}

