import React from 'react';
import Navbar from '../../components/navbar/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';

function HomePage() {
  useAuthRedirect();
  return (
    <div>
      <Navbar />
      <header className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to MediConnect</h1>
          <p className="text-lg mb-4">A modern healthcare platform</p>
          <button className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-primary-dark transition duration-300">
            Get Started
          </button>
        </div>
      </header>
      <main className="container mx-auto mt-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="max-w-sm mx-auto">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Feature 1</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae elit libero, a pharetra augue.
              </p>
            </div>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Feature 2</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae elit libero, a pharetra augue.
              </p>
            </div>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Feature 3</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae elit libero, a pharetra augue.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
