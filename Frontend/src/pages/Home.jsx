import { Link } from "react-router-dom";
import heroImg from "../assets/thinkbox-illustration.png";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
    
    <div className="text-center md:text-left">
      <h1 className="text-4xl font-bold text-purple-700 mb-4 leading-tight">
        Welcome to ThinkBox 🧠
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md mx-auto md:mx-0">
        Your AI-powered hub for structured problem solving. Break down challenges, visualize ideas,
        and make confident decisions using smart tools like Mind Maps, SWOT, and Notes.
      </p>

      <div className="space-x-4">
        {user ? (
          <>
            <Link
              to="/submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
            >
              Submit a Problem
            </Link>
            <Link
              to="/problems"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded"
            >
              My Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>

   
    <div className="flex justify-center md:justify-end">
     <img
     src={heroImg}
    alt="ThinkBox"
    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain rounded-3xl"
/>
    </div>
  </div>
</section>


      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">Core Tools</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Feature icon="📝" title="Rich Notes" desc="Capture and refine ideas, drafts, and action plans." />
          <Feature icon="🌳" title="Mind Mapping" desc="Visualize complex ideas and see the big picture." />
          <Feature icon="🔍" title="SWOT Analysis" desc="Understand internal strengths and external threats." />
          <Feature icon="📄" title="Export to PDF" desc="Download organized reports for team reviews or documentation." />
        </div>
      </section>

     
      <section className="py-16 px-8 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Why Choose ThinkBox?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're solving real-life dilemmas, designing a business plan, or working on an academic project —
            ThinkBox gives you clarity, structure, and insight through guided thinking tools.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-6">
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-md">
            <li>Organize messy thoughts with structured templates.</li>
            <li>Boost creativity and critical thinking through visual tools.</li>
            <li>Collaborate, reflect, and revise ideas easily.</li>
            <li>Perfect for students, entrepreneurs, and professionals.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-purple-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
