import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EntrepreneursList from "../Components/EntrepreneurList";
import AddEntrepreneursButton from "../Components/AddEntrepreneursButton";
import { useAuth } from "../Context/AuthContext.js";
import Login from "../Components/Login.js";

const EntrepreneursPage = () =>{
    const queryClient  = new QueryClient();
    const { user } = useAuth(); 
    return(
     <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <div className="p-4">
            <AddEntrepreneursButton/>
           <EntrepreneursList/>
          </div>
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
    );
}

export default EntrepreneursPage;