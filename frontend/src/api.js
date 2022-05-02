const apiBaseUrl =
    process.env.NODE_ENV === 'production'
        ? "https://cf-cinema-backend.herokuapp.com"
        : "http://localhost:9000"


export default apiBaseUrl;