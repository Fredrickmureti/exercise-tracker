import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaClock, FaCheckCircle, FaTasks, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Footer from './Footer';
import Header from './Header';

const HomePage = () => {
  const navigate = useNavigate();
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500 });
  const slideIn = useSpring({ transform: 'translateY(0px)', from: { transform: 'translateY(-50px)' }, delay: 700 });

  return (
    <div className="homepage">
      <Header />
      <div className="background-image"></div> {/* Background image div */}
      <div className="content">
        <animated.h1 style={fadeIn}>Welcome to Exercise Tracker</animated.h1>
        <animated.p style={slideIn}>
          Track your exercises, set alarms, and stay motivated to keep time. Keeping track of your progress is the key to success!
        </animated.p>
        <animated.div style={slideIn} className="features">
          <div className="feature">
            <FaClock size={50} />
            <h3>Set Alarms</h3>
            <p>Never miss a workout with our alarm feature.</p>
          </div>
          <div className="feature">
            <FaCheckCircle size={50} />
            <h3>Track Progress</h3>
            <p>Monitor your exercise routines and stay on track.</p>
          </div>
          <div className="feature">
            <FaTasks size={50} />
            <h3>Manage Tasks</h3>
            <p>Organize your exercises and tasks efficiently.</p>
          </div>
        </animated.div>
        <animated.div style={slideIn} className="navigation-icons">
          <div className="nav-icon" onClick={() => navigate('/login')}>
            <FaSignInAlt size={50} />
            <p>Explore</p>
          </div>
        </animated.div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;