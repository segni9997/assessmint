import useSWR, { mutate, useSWRConfig } from "swr";
import { useEffect, useState } from "react"
import { Search, MoreHorizontal, UserPlus, ChevronLeft, ChevronRight } from "lucide-react"
import QuestionModal from "../components/QuestionModal"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { fetchAllRoles, fetchAllUsers, Toggle_Activate_user } from "../action/Auth"
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";



export default function UserManagement() {
  const ONE_DAY = 1000 * 60 * 60 * 24;  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [statusFilter, setStatusFilter] = useState("All Status")
    // const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
  //  const { cache } = useSWRConfig();
const { data: users, error, isLoading } = useSWR("all_users_list", fetchAllUsers, {
  dedupingInterval: ONE_DAY,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  errorRetryCount:2
});
const { data: roles } = useSWR("all_roles", fetchAllRoles, {
  dedupingInterval: ONE_DAY,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  errorRetryCount:2
});

  //  handle activation and deactivation
const handleactivate = async (id) => {
  try {
    const res = await Toggle_Activate_user(id);
    if (res) {
      await mutate("all_users_list"); // Refresh SWR cache after update
    }
  } catch (error) {
    console.error("Activation error:", error);
  }
};


  // Filter users based on search query and filters
  const filteredUsers = users?.body.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||  user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())

const matchesRole =
  roleFilter === "All Roles" ||
  user.roles?.some((role) => role !== "USER" && role === roleFilter);
    const matchesStatus = statusFilter === "All Status"
    //   || 
    // user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })


  const getStatusBadgeClass = (status) => {
    switch (status) {
      case true:
        return "badge badge-outline"
      case false:
        return "badge badge-outline text-red-400"
    
      default:
        return "badge"
    }
  }
// pagination -start here
    const {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      indexOfFirstItem,
      indexOfLastItem,
      currentItems,
      handlePageChange,
      handleItemsPerPageChange,
    } = usePagination(filteredUsers, 5);
// pagination end here
  return (
    <div className="w-full bg-bg-light rounded-lg p-6  h-full dark:bg-gray-800 dark:text-bg-light ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-base-content/70">Manage users, assign roles, and control access</p>
        </div>
        <button className="btn bg-accent-teal-light text-white" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="join w-full relative">
            {/* <div className="join-item btn btn-square btn-ghost absolute left-1">
              <Search className="h-4 w-4   " />
            </div> */}
            <input
              type="text"
              placeholder="Search users..."
              className="input input-bordered join-item w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
       <select
  className="select select-bordered w-full md:w-[180px]"
  value={roleFilter}
  onChange={(e) => setRoleFilter(e.target.value)}
>
  <option value="All Roles">All Roles</option>
  {roles?.body
    ?.filter((role) => role !== "USER")
    .map((role) => (
      <option key={role} value={role}>
        {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
      </option>
    ))}
</select>
        <select
          className="select select-bordered w-full md:w-[180px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table bg-white dark:bg-gray-700 dark:text-bg-light">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
               <th>Status</th>
            {/*  <th>Last Active</th> */}
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <>
              <tbody>
                            <tr>
              <div className="animate animate-pulse duration-500 text-lg text-gray-400">Loading...</div>
  </tr> 
               </tbody>
            </>}
            {currentItems?.length > 0 && isLoading == false  ? (
              currentItems.map((user) => (
                <tr key={user.id} className="hover">
                  <td className="font-medium">{user?.firstName}</td>
                  <td className="font-medium">{user?.lastName}</td>
                  <td>{user?.email}</td>
                  <td>{user?.roles?.filter((role)=>role !== "USER")}</td>
                  <td>
                    <button onClick={()=>handleactivate(user.id)} className="cursor-pointer ">
                    <span className={`${getStatusBadgeClass(user?.isActive)} hover:bg-accent-teal-light hover:text-bg-light `}>{user?.isActive ? "Active" : "Inactive"}</span>

                    </button>
                  </td>
                 {/*  <td>{user.lastActive}</td> */}
                  <td className="text-right">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                        <MoreHorizontal className="h-4 w-4" />
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                          <a>View details</a>
                        </li>
                        <li>
                          <a>Edit user</a>
                        </li>
                        <li>
                          <a className="text-error">Delete user</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
         <tfoot>
  <tr>
    <td colSpan={6}>
      <div className="w-full">
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          handlePageChange={handlePageChange}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
        />
      </div>
    </td>
  </tr>
</tfoot>
        </table>
                   
      </div>
            
           <QuestionModal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false)
          }}>
            
      
          <h3 className="font-bold text-lg mb-4">Add New User</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Handle form submission logic here
              setIsModalOpen(false)
              // You would typically add the new user to your users array here
            }}
          >
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input type="text" placeholder="Enter full name" className="input input-bordered w-full" required />
            </div>

            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Enter email address" className="input input-bordered w-full" required />
            </div>

           <div className="form-control w-full mb-3">
  {/* <label className="label">
    <span className="label-text">Role</span>
  </label> */}
         <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    
    label="Role"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Admin</MenuItem>
    <MenuItem value={20}>Examiner</MenuItem>
    <MenuItem value={30}>Examinee</MenuItem>
  </Select>
</FormControl>
                  </div>
         

            <div className="form-control w-full mb-3">
              {/* <label className="label">
                <span className="label-text">Status</span>
              </label> */}
               <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    
    label="Status"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Active</MenuItem>
    <MenuItem value={20}>Inactive</MenuItem>
    <MenuItem value={30}>Pending</MenuItem>
  </Select>
</FormControl>
            </div>
                
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter password" className="input input-bordered w-full" required />
            </div>

            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input type="password" placeholder="Confirm password" className="input input-bordered w-full" required />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn bg-accent-teal-light text-white">
                Add User
              </button>
            </div>
          </form>
        
              <form method="dialog" className="modal-backdrop">
                  
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
   
  
          </QuestionModal>
         
    </div>
  )
}
