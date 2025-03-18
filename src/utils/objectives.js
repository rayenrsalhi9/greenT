export const dailyObjectives = [
  { 
    type: 'daily',
    taskID: "app-login",
    description: "Log in to the app", 
    done: false, 
    points: 5
  },
  { 
    type: 'daily',
    taskID: "plastic-15",
    description: "Post at least 15 plastic items", 
    goal: 15, 
    currentProgress: 0, 
    done: false,
    points: 10
  },
  { 
    type: 'daily',
    taskID: "send-message",
    description: "Send a message to a community member", 
    done: false, 
    points: 5
  },
  { 
    type: 'daily',
    taskID: "plastic-post",
    description: "Share a plastic post with the community", 
    done: false, 
    points: 10
  }
];

export const weeklyObjectives = [
  { 
    type: 'weekly',
    taskID: "event-participate",
    description: "Participate in a group cleanup event", 
    done: false, 
    points: 50
  },
  { 
    type: 'weekly',
    taskID: "user-invite",
    description: "Invite a new user to the platform", 
    done: false, 
    points: 30
  },
  { 
    type: 'weekly',
    taskID: "post-3",
    description: "Post at least 3 posts this week", 
    goal: 3, 
    currentProgress: 0, 
    points: 20,
    done: false
  },
  { 
    type: 'weekly',
    taskID: "contact-3",
    description: "Contact at least 3 people about plastic exchange", 
    goal: 3, 
    currentProgress: 0, 
    done: false,
    points: 15
  }
];

export const monthlyObjectives = [
  { 
    type: 'monthly',
    taskID: "10-contacts",
    description: "Reach out 10 people about plastic exchange", 
    done: false, 
    points: 50
  },
  { 
    type: 'monthly',
    taskID: "donate-50",
    description: "Donate at least 50 plastic items in one post", 
    goal: 50, 
    currentProgress: 0, 
    done: false,
    points: 200
  },
  { 
    type: 'monthly',
    taskID: "earn-500",
    description: "Earn 500 points in total", 
    goal: 500, 
    currentProgress: 0, 
    done: false,
    points: 500
  },
  { 
    type: 'monthly',
    taskID: "post-10",
    description: "Post at least 10 updates this month", 
    goal: 10, 
    currentProgress: 0, 
    points: 100
  }
];

export const oneTimeObjectives = [
  { 
    type: 'oneTime',
    taskID: "reach-1000",
    description: "Reach 1,000 points", 
    goal: 1000, 
    currentProgress: 0, 
    done: false,
    points: 1000
  },
  { 
    type: 'oneTime',
    taskID: "workshop-host",
    description: "Host a plastic recycling workshop", 
    done: false, 
    points: 500
  },
  { 
    type: 'oneTime',
    taskID: "refer-friend",
    description: "Refer a friend to the platform", 
    done: false, 
    points: 50
  },
  { 
    type: 'oneTime',
    taskID: "social-media-share",
    description: "Share the platform on social media", 
    done: false, 
    points: 1000
  },
  {
    type: 'oneTime',
    taskID: "profile-complete",
    description: "Complete your profile (add location & phone number)", 
    done: false, 
    points: 300
  }
];

export const objectives = [...dailyObjectives, ...weeklyObjectives, ...monthlyObjectives, ...oneTimeObjectives]