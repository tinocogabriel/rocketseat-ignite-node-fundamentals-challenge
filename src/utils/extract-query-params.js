export function ExtractQueryParams(query){
    return query.substr(1).split('&').reduce((queryParams, item)=>{
        const [key, value] = item.split('=');
        queryParams[key] = value;

        return queryParams;
    },{})
}