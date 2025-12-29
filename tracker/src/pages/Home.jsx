import Dashboard from "../components/Dashboard"
import Siderbar from "../components/Sidebar"



const Home = () => {
  return (
    <div className="min-h-screen">

        <div className="flex ">
            
            <Siderbar/>
            <Dashboard/>
        </div>
    </div>
  )
}

export default Home