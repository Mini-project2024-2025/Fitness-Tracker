// components/GoalSettingPage.js

import React from 'react';
import GoalSetting from '../pages/GoalSetting';

const GoalSettingPage = () => {
  const userId = 'someUserId'; // Replace this with actual userId logic

  const styles = {
    goalHeading: {
      marginTop: '80px',
      marginLeft: '170px',
      fontSize: '3.5rem',
      color: 'yellow',
      textAlign: 'center',
    },
  };

  return (
    <div className="goal-setting-page-container">
      <h1 style={styles.goalHeading}>Set Your Goals and Reminders</h1>
      <GoalSetting userId={userId} />
    </div>
  );
};

export default GoalSettingPage;
