import React, { useState } from "react";
import UserRegistration from "./components/UserRegistration";
import AddExercise from "./components/AddExercise";
import ExerciseLog from "./components/ExerciseLog";
import Logout from "./components/Logout";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>Exercise Tracker</h1>
      {!user && <UserRegistration setUser={setUser} />}
      {user && (
        <>
          <h2>Welcome, {user.username}, (ID - {user._id})</h2>
          <Logout setUser={setUser} />
          <AddExercise userId={user._id} />
          <ExerciseLog userId={user._id} />
        </>
      )}
    </div>
  )
}

export default App;
