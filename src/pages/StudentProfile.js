import React from 'react';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { id } = useParams(); // Extract the profile ID from the URL

    // Mock data for the profile
    const profileData = {
        id: 1,
        photo: 'profile-photo.jpg',
        name: 'John Doe',
        department: 'Engineering',
        currentLevel: 'Intermediate',
        session: '2023',
        coursesRegistered: ['Course A', 'Course B', 'Course C'],
    };

      // Find the profile based on the ID
    const profile = profileData.find((profile) => profile.id === parseInt(id, 10));

//   const profile = data.find((profile) => profile.id === id);

    if (!profile) {
        return <div>Profile not found!</div>;
    }
  return (
    <div className='profile'>
      <img src={profile.photo} alt="student" />
      <div>
        <p htmlFor="name">Name:</p>
        <input type="text" id="name" value={profile.name} disabled />
      </div>
      <div>
        <p htmlFor="department">Department:</p>
        <input type="text" id="department" value={profile.department} disabled />
      </div>
      <div>
        <p htmlFor="currentLevel">Current Level:</p>
        <select id="currentLevel" value={profile.currentLevel} disabled>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <p htmlFor="session">Session:</p>
        <input type="text" id="session" value={profile.session} disabled />
      </div>
      <div>
        <p htmlFor="coursesRegistered">Courses Registered:</p>
        <input type="text" id="coursesRegistered" value={profile.coursesRegistered} disabled />
      </div>
      <div>
        <p>Courses Registered:</p>
        <select multiple value={profile.coursesRegistered} readOnly>
          {profile.coursesRegistered.map((course, index) => (
            <option key={index}>{course}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StudentProfile;
