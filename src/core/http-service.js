import axios from 'axios'


const apiKey = '07b7fabea367c741afbbfe5096fc61aa'


export const httpService = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
})


httpService.interceptors.request.use((config) => {
    config.params = {
      ...config.params, // Preserve existing parameters
      appid: apiKey,
      units: 'Metric',
    };
    return config;
  });