// get Method
export  const getData= async()=> {
        const url = 'https://69a7bb832cd1d055269167fa.mockapi.io/api/v1/cart';
        let result = await fetch(url)

        const response = await result.json();
        return response;
        
}