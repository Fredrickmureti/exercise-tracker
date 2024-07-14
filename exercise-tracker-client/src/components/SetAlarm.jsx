import React, { useState, useEffect } from 'react';
import './SetAlarm.css';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Sound from 'react-sound';

const SetAlarm = ({ isDetailPage = false }) => {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmLabel, setAlarmLabel] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [alarms, setAlarms] = useState(() => {
    const savedAlarms = localStorage.getItem('alarms');
    return savedAlarms ? JSON.parse(savedAlarms) : [];
  });
  const [editingAlarm, setEditingAlarm] = useState(null);
  const [playingAlarm, setPlayingAlarm] = useState(null);
  const [testSound, setTestSound] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    alarms.forEach(alarm => {
      if (alarm.time === currentTime) {
        setPlayingAlarm(alarm);
        confirmAlert({
          title: `Alarm for ${alarm.label}`,
          message: 'What would you like to do?',
          buttons: [
            {
              label: 'Stop',
              onClick: () => {
                setPlayingAlarm(null);
                setAlarms(prevAlarms => prevAlarms.filter(a => a !== alarm));
              }
            },
            {
              label: 'Snooze',
              onClick: () => {
                setPlayingAlarm(null);
                setTimeout(() => {
                  setPlayingAlarm(alarm);
                }, 600000); // Snooze for 10 minutes
              }
            }
          ]
        });

        setTimeout(() => {
          setPlayingAlarm(null);
        }, 60000); // Stop the alarm after 1 minute if no action is taken
      }
    });
  }, [currentTime, alarms]);

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  const handleSetAlarm = (e) => {
    e.preventDefault();
    if (editingAlarm) {
      setAlarms(alarms.map(alarm => alarm === editingAlarm ? { time: alarmTime, label: alarmLabel } : alarm));
      toast.success('Alarm modified successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEditingAlarm(null);
    } else {
      setAlarms([...alarms, { time: alarmTime, label: alarmLabel }]);
      toast.success('Alarm set successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setAlarmTime('');
    setAlarmLabel('');
  };

  const handleDeleteAlarm = (alarmToDelete) => {
    setAlarms(alarms.filter(alarm => alarm !== alarmToDelete));
    toast.success('Alarm deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleEditAlarm = (alarmToEdit) => {
    setEditingAlarm(alarmToEdit);
    setAlarmTime(alarmToEdit.time);
    setAlarmLabel(alarmToEdit.label);
  };

  const testAlarmSound = () => {
    setTestSound(true);
    setTimeout(() => {
      setTestSound(false);
    }, 5000); // Play the test sound for 5 seconds
  };

  return (
    <div className={isDetailPage ? "set-alarm-page" : "set-alarm"}>
      {isDetailPage && (
        <video className="background-video" autoPlay loop muted>
          <source src="/assets/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="set-alarm">
        <h2>{editingAlarm ? 'Modify Alarm' : 'Set Alarm'}</h2>
        <div className="current-time">
          <h3>Current Time: {currentTime}</h3>
        </div>
        <form onSubmit={handleSetAlarm}>
          <label>
            Alarm Time:
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              required
            />
          </label>
          <label>
            Label:
            <input
              type="text"
              value={alarmLabel}
              onChange={(e) => setAlarmLabel(e.target.value)}
              required
            />
          </label>
          <button type="submit">{editingAlarm ? 'Modify Alarm' : 'Set Alarm'}</button>
        </form>
        <div className="alarms-list">
          <h3>Set Alarms</h3>
          <ul>
            {alarms.map((alarm, index) => (
              <li key={index}>
                <span className="alarm-label">{alarm.label}</span>
                <span className="alarm-time">{alarm.time}</span>
                <button className="edit-button" onClick={() => handleEditAlarm(alarm)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-button" onClick={() => handleDeleteAlarm(alarm)}>
                  <FaTrash /> Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={testAlarmSound}>Test Alarm Sound</button>
        {playingAlarm && (
          <Sound
            url="/assets/ALARM.wav"
            playStatus={Sound.status.PLAYING}
            loop={true}
          />
        )}
        {testSound && (
          <Sound
            url="/assets/ALARM.wav"
            playStatus={Sound.status.PLAYING}
          />
        )}
      </div>
    </div>
  );
};

export default SetAlarm;