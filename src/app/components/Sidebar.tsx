const Sidebar = () => {
    return (
      <div className="bg-gray-800 text-white w-64 h-screen p-4 space-y-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul>
          <li className="hover:bg-gray-700 p-2 rounded">
            <a href="/user">Profile</a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <a href="/settings">Settings</a>
          </li>
          {/* Add more features here */}
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  