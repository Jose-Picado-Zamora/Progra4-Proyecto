import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BIN = '681cf12f8a456b796699e7ce'; 
const PROJECTS_API_URL = 'https://api.jsonbin.io/v3/b/681cf12f8a456b796699e7ce'+ BIN;
const API_KEY = '$2a$10$3dXKCW5tKrG09Iwfsx0Xi.GU6IPerttg6BUT8UdlJ0VhuQbkH.Rny';

const fetchProjects = async () => {
    
  
  try{
  const response = await axios.get(PROJECTS_API_URL, {
      headers:{
        'X-Access-Key': API_KEY,
      } 
  });
    return response.data.record;  // assumes response.data has the shape { id, record, metadata }
}
catch(error){
    console.error('Error fetching projects:', error);

return [];

  }
};

export const useProjects = () =>{
return useQuery({
queryKey: ['projects'],
queryFn: fetchProjects,
staleTime: 5 * 60*1000,
retry: 1,
});
};