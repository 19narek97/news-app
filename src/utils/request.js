export default function Request(method,headers,params,pageName) {
   return  fetch(` https://newsapi.org/v2/${pageName === "sources" ? "everything" : "top-headlines"}?${params}&apiKey=6eff99d7b47d47c79cd7203ebb74a74b`, {
        method: method,
        headers: {
            ...headers
        },
    })
}