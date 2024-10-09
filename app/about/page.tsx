import React from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  info: string;
}

interface Mentor {
  name: string;
  role: string;
  info: string;
}

const AboutPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { name: 'John Doe', role: 'Frontend Developer', info: 'Passionate about creating intuitive user interfaces.' },
    { name: 'Jane Smith', role: 'Backend Developer', info: 'Experienced in building scalable server-side applications.' },
    { name: 'Mike Johnson', role: 'UI/UX Designer', info: 'Skilled in creating visually appealing and user-friendly designs.' },
  ];

  const mentor: Mentor = {
    name: 'Dr. Emily Brown',
    role: 'Project Mentor',
    info: 'Associate Professor with expertise in Software Engineering and Project Management.',
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* College Logo and Name */}
        <div className="flex items-center justify-center mb-12">
          <Image src="/placeholder.png" alt="College Logo" width={64} height={64} className="mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">Your College Name</h1>
        </div>

        {/* Project Description */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Project</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image src="/project-placeholder.jpg" alt="Project Overview" width={400} height={300} className="w-full md:w-1/2 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-8" />
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 mb-4">
                Our college project focuses on developing an innovative solution to address [specific problem or challenge]. 
                We aim to create a [brief description of the project] that will [main goals or benefits].
              </p>
              <p className="text-gray-700">
                Through this project, we're applying our knowledge in [relevant fields or technologies] to create a real-world 
                impact and gain hands-on experience in project development and teamwork.
              </p>
            </div>
          </div>
        </section>

        {/* Mentor Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mentor</h2>
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6">
            <Image src="/mentor-placeholder.jpg" alt={mentor.name} width={200} height={200} className="rounded-full object-cover mb-4 md:mb-0 md:mr-8" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">{mentor.name}</h3>
              <p className="text-xl text-gray-600 mb-2">{mentor.role}</p>
              <p className="text-gray-700">{mentor.info}</p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image src={`/team-member-${index + 1}.jpg`} alt={member.name} width={300} height={200} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <p className="text-gray-700">{member.info}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;