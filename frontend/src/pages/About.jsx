import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="flex flex-col items-center ">
      {/* ---------- Title Section ---------- */}
      <div className="text-center text-4xl pt-10 text-gray-600 font-bold mb-12">
        <p>ABOUT <span className="text-primary font-bold">US</span></p>
      </div>

      {/* ---------- Content Section ---------- */}
      <div className="my-10 flex flex-col md:flex-row gap-12 max-w-6xl px-6">
        <img
          className="w-full md:max-w-[400px] rounded-lg hover:shadow-lg transition-shadow duration-300"
          src={assets.about_image}
          alt="About Us"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-lg text-gray-700 leading-relaxed">
          <p>
            Welcome to <b className="text-primary">DocAppointment</b>, your reliable partner in simplifying healthcare access and managing appointments with ease. We know how challenging it can be to find the right doctor and schedule an appointment that works for you, which is why we've built <b>DocAppointment</b> to address that need.
          </p>
          <p>
            At <b className="text-primary">DocAppointment</b>, our goal is to make healthcare accessible and convenient for everyone. With just a few clicks, you can connect with top-rated doctors, book appointments, and manage your healthcare needs without the stress of long waits and complicated processes.
          </p>
          <b className="text-gray-800 text-xl">Our Vision</b>
          <p>
            Our vision is to bridge the gap between patients and healthcare providers by offering a user-friendly platform that makes booking appointments seamless and hassle-free. We aim to empower users by providing easy access to healthcare, anytime, anywhere.
          </p>
        </div>
      </div>

      {/* ---------- Why Choose Us Section ---------- */}
      <div className="text-4xl my-12 text-gray-600 font-bold">
        <p>WHY <span className="text-primary font-bold">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl px-6 mb-20">
        <div className="border border-gray-200 rounded-lg px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-lg hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer shadow-lg hover:shadow-primary/50">
          <b className="text-xl">Efficiency:</b>
          <p>Experience fast and hassle-free appointment booking that fits into your busy schedule.</p>
        </div>

        <div className="border border-gray-200 rounded-lg px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-lg hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer shadow-lg hover:shadow-primary/50">
          <b className="text-xl">Convenience:</b>
          <p>Connect with a wide network of trusted doctors and healthcare providers, all available at your fingertips.</p>
        </div>

        <div className="border border-gray-200 rounded-lg px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-lg hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer shadow-lg hover:shadow-primary/20">
          <b className="text-xl">Personalization:</b>
          <p>Get personalized recommendations and reminders for your health checkups, appointments, and follow-ups.</p>
        </div>
      </div>
    </div>
  );
};

export default About;