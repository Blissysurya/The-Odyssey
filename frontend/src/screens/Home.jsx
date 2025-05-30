import React,{useContext, useState, useEffect} from 'react'
import {UserContext} from '../context/user.context'
import axios from '../config/axios.js'
import { useNavigate } from 'react-router-dom'
import { use } from 'react'

const Home = () => {
    const {user} = useContext(UserContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectName, setProjectName] = useState(null)
    const [projects, setProjects] = useState([])
    const [users,setUsers] = useState([])
    const navigate = useNavigate()

    const fetchProjects = () => {
        axios.get('/projects/all')
            .then((res) => {
                console.log('Projects data:', res.data);
                setProjects(res.data.projects || []);
            })
            .catch((error) => {
                console.log('Fetch projects error:', error);
            });
    }

    function createProject(e) {
        e.preventDefault();
        console.log('Creating project with name:', projectName);
        axios.post('/projects/create', {
            name: projectName,
        }).then((res) => {
            console.log('Project created successfully:', res);
            setIsModalOpen(false);
            setProjectName(''); // Clear form
            fetchProjects(); // Refresh projects after creating
        }).catch((error) => {
            console.error('Create project error:', error);
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
            }
        });
    }

    useEffect(() => {
        fetchProjects();
    }, []);
  
    

  return (
    <main
        className='p-4'>

            <div className='projects flex flex-wrap gap-3'>
                <button 
                onClick={()=> setIsModalOpen(true)}
                className='project p-4 font-bold  border border-slate-300 rounded-md '>
                    New Project
                    <i className="ri-link ml-2"></i>
                </button>
            {
                projects.map((project)=>(
                 <div onClick={()=> navigate(`/project`,{state: {project}})} key={project._id} className='project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200'>
                    <h2 className='font-semibold group-hover:text-blue-600'>
                        {project.name}
                    </h2>
                    
                    <div className='flex gap-2 items-center text-gray-600'>
                        <p><i className="ri-user-line hover:text-blue-500 transition-colors duration-200"></i>Collaborators:</p>
                        {project.users?.length || 0}
                    </div>

                 </div>
                ))

            }
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
                        <form
                            onSubmit={createProject}
                        >
                            <div className="mb-4">
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                                    Project Name
                                </label>
                                <input
                                    onChange={(e)=> setProjectName(e.target.value)}
                                    value={projectName || ''}
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

           
    </main>
  )
}

export default Home
