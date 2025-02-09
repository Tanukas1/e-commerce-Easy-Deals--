import { useState } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import Layout from "../layout/Layout";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "https://cdn4.iconfinder.com/data/icons/mixed-set-1-1/128/28-512.png",
  };

  const tabsData = [
    {
      label: "Order History",
      value: "orders",
      desc: "Track your orders and see details of your previous purchases.",
    },
    {
      label: "Profile Settings",
      value: "profile",
      desc: "Update your personal information, manage your account settings.",
    },
    {
      label: "Product Recommendations",
      value: "recommendations",
      desc: "Explore products based on your preferences and purchase history.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-6">
              <img
                src={userInfo.profilePicture}
                alt={`${userInfo.name}'s profile`}
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
            </div>
            <h3 className="text-center text-xl font-semibold text-gray-800">{userInfo.name}</h3>
            <p className="text-center text-gray-600">{userInfo.email}</p>

            <div className="mt-8 space-y-4">
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
              <button
                className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                aria-label="Log Out"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-4 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Dashboard</h2>
            
            <Tabs value={activeTab} onChange={(val) => setActiveTab(val)} orientation="horizontal">
              <TabsHeader className="flex justify-around border-b-2 border-gray-200 pb-4">
                {tabsData.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    className={`px-4 py-2 text-lg font-medium ${
                      activeTab === value
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>

              <TabsBody>
                {tabsData.map(({ value, desc }) => (
                  <TabPanel key={value} value={value} className="py-4">
                    <p className="text-gray-700">{desc}</p>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
