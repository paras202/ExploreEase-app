import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
  name: string;
  role: string;
  info: string;
  reg: string;
}

interface Mentor {
  name: string;
  role: string;
  info: string;
}

const AboutPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { name: 'Paras Singla', reg: '2140162', role: 'Frontend Developer', info: 'Passionate about creating intuitive user interfaces.' },
    { name: 'Gurwinder Singh',reg: "2140156 ", role: 'Backend Developer', info: 'Experienced in building scalable server-side applications.' },
    { name: 'Jasmehar Singh',reg: "2140143", role: 'UI/UX Designer', info: 'Skilled in creating visually appealing and user-friendly designs.' },
  ];

  const mentor: Mentor = {
    name: 'Dr. Sukhpreet Singh',
    role: 'Project Mentor',
    info: 'Assistant Professor with expertise in Software Engineering and Project Management.',
  };

  const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => (
    <div className="relative h-80 bg-gray-100 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(/team-member-${index + 1}.jpg)` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-70"></div>
      </div>
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-white z-10">
        <div className="w-32 h-32 mb-4 rounded-full border-4 border-white overflow-hidden shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110">
          <Image
            src={`/profile-${index + 1}.jpg`}
            alt={member.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 ease-in-out group-hover:text-indigo-300">
          {member.name}
        </h3>
        <p className="text-sm mb-2 opacity-80">{member.reg}</p>
        <p className="text-sm mb-2 opacity-80">{member.role}</p>
        <p className="text-sm text-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          {member.info}
        </p>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* College Logo and Name */}
        <div className="flex flex-col items-center justify-center mb-16 animate-fade-in">
          <Link href="http://sliet.ac.in/">
          <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 shadow-lg">
            <Image 
              src="/logo.jpg" 
              alt="SLIET Logo" 
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          </Link>
          <Link href="http://sliet.ac.in/">
          <h1 className="text-4xl font-bold text-center text-indigo-600 transition-colors duration-300 ease-in-out hover:text-gray-900">
            Sant Longowal Institute of Engineering and Technology
          </h1>
          </Link>
          <p className="mt-2 text-xl text-gray-600">Longowal, Sangrur, Punjab</p>
        </div>


        {/* Project Description */}
        <section className="mb-16 animate-slide-in-left">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 transition-colors duration-300 ease-in-out hover:text-indigo-600">Our Project</h2>
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
            <Image src="/project.jpg" alt="Project Overview" width={400} height={300} className="w-full md:w-1/2 object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
            <div className="w-full md:w-1/2 p-6">
              <p className="text-gray-700 mb-4">
                Our college project focuses on developing an innovative Travel and Tourism Web Application to revolutionize 
                the way tourists explore, plan, and book their trips. We aim to create a comprehensive platform that 
                provides a seamless user experience across devices while offering a complete solution for all travel needs.
              </p>
              <p className="text-gray-700 mb-4">
                Through this project, were applying our knowledge in React.js, Next.js, Node.js, and MongoDB to create 
                a real-world impact and gain hands-on experience in project development and teamwork.
              </p>
              <a 
                href="https://github.com/paras202/ExploreEase-app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16 animate-slide-in-right">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 transition-colors duration-300 ease-in-out hover:text-indigo-600">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Interactive Mapping", description: "Powered by Google Maps API for dynamic, location-based insights" },
              { title: "Online Ticketing System", description: "Book tickets for attractions with secure payment integrations" },
              { title: "User-Centric Design", description: "Seamless experience across devices with responsive design" },
              { title: "Personalized Recommendations", description: "Tailored travel suggestions based on user preferences" },
              { title: "Tourist Information Pages", description: "Detailed pages with descriptions, images, and user reviews" },
              { title: "Advanced Search & Filter", description: "Find destinations based on categories, price range, and popularity" }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <h3 className="text-xl font-semibold mb-2 text-indigo-600">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mentor Information */}
        <section className="mb-16 animate-slide-in-left">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 transition-colors duration-300 ease-in-out hover:text-indigo-600">Our Mentor</h2>
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-xl">
            <Image src="/sukhpreetsir.jpg" alt={mentor.name} width={200} height={200} className="rounded-full object-cover mb-4 md:mb-0 md:mr-8 transition-transform duration-300 ease-in-out hover:scale-105" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 transition-colors duration-300 ease-in-out hover:text-indigo-600">{mentor.name}</h3>
              <p className="text-xl text-gray-600 mb-2">{mentor.role}</p>
              <p className="text-gray-700">{mentor.info}</p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="animate-slide-in-bottom py-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center transition-colors duration-300 ease-in-out hover:text-indigo-600">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;