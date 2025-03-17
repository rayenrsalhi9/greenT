const objectives = {
  daily: [
    { description: "Log in to the app", done: true, points: 5 }, // One-time task
    { description: "Collect and donate at least 5 plastic items", goal: 5, currentProgress: 1, points: 10 }, // Progress-based task
    { description: "Send a message to at least one community member", done: false, points: 5 }, // One-time task
    { description: "Post an update about your recycling progress", done: true, points: 10 } // One-time task
  ],
  weekly: [
    { description: "Participate in a group cleanup event", done: false, points: 50 }, // One-time task
    { description: "Invite a new user to the platform", done: true, points: 30 }, // One-time task
    { description: "Post at least 3 updates this week", goal: 3, currentProgress: 1, points: 20 }, // Progress-based task
    { description: "Contact at least 3 people about plastic exchange", goal: 3, currentProgress: 1, points: 15 } // Progress-based task
  ],
  monthly: [
    { description: "Complete your profile (add location & phone number)", done: false, points: 50 }, // One-time task
    { description: "Donate at least 50 plastic items in total", goal: 50, currentProgress: 30, points: 200 }, // Progress-based task
    { description: "Earn 500 points in total", goal: 500, currentProgress: 320, points: 500 }, // Progress-based task
    { description: "Post at least 10 updates this month", goal: 10, currentProgress: 4, points: 100 } // Progress-based task
  ],
  oneTime: [
    { description: "Reach 1,000 points", goal: 1000, currentProgress: 750, points: 1000 }, // Progress-based task
    { description: "Host a plastic recycling workshop", done: false, points: 500 }, // One-time task
    { description: "Complete your profile (add picture, bio, interests)", done: false, points: 50 }, // One-time task
    { description: "Start a plastic recycling initiative in your community", done: false, points: 1000 } // One-time task
  ]
};

export const getObjectives = (tab) => {
  return objectives[tab];
};