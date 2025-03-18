export const objectives = {
  daily: [
    { 
      taskID: "app-login",
      description: "Log in to the app", 
      done: true, 
      points: 5
    },
    { 
      taskID: "plastic-15",
      description: "Post at least 15 plastic items", 
      goal: 15, 
      currentProgress: 15, 
      done: true,
      points: 10
    },
    { 
      taskID: "send-message",
      description: "Send a message to a community member", 
      done: false, 
      points: 5
    },
    { 
      taskID: "plastic-post",
      description: "Share a plastic post with the community", 
      done: true, 
      points: 10
    }
  ],
  weekly: [
    { 
      taskID: "event-participate",
      description: "Participate in a group cleanup event", 
      done: false, 
      points: 50
    },
    { 
      taskID: "user-invite",
      description: "Invite a new user to the platform", 
      done: true, 
      points: 30
    },
    { 
      taskID: "post-3",
      description: "Post at least 3 posts this week", 
      goal: 3, 
      currentProgress: 1, 
      points: 20,
      done: false
    },
    { 
      taskID: "contact-3",
      description: "Contact at least 3 people about plastic exchange", 
      goal: 3, 
      currentProgress: 1, 
      done: false,
      points: 15
    }
  ],
  monthly: [
    { 
      taskID: "10-contacts",
      description: "Reach out 10 people about plastic exchange", 
      done: false, 
      points: 50
    },
    { 
      taskID: "donate-50",
      description: "Donate at least 50 plastic items in one post", 
      goal: 50, 
      currentProgress: 33, 
      done: false,
      points: 200
    },
    { 
      taskID: "earn-500",
      description: "Earn 500 points in total", 
      goal: 500, 
      currentProgress: 320, 
      done: false,
      points: 500
    },
    { 
      taskID: "post-10",
      description: "Post at least 10 updates this month", 
      goal: 10, 
      currentProgress: 4, 
      points: 100
    }
  ],
  oneTime: [
    { 
      taskID: "reach-1000",
      description: "Reach 1,000 points", 
      goal: 1000, 
      currentProgress: 750, 
      done: false,
      points: 1000
    },
    { 
      taskID: "workshop-host",
      description: "Host a plastic recycling workshop", 
      done: false, 
      points: 500
    },
    { 
      taskID: "refer-friend",
      description: "Refer a friend to the platform", 
      done: false, 
      points: 50
    },
    { 
      taskID: "social-media-share",
      description: "Share the platform on social media", 
      done: false, 
      points: 1000
    },
    {
      taskID: "profile-complete",
      description: "Complete your profile (add location & phone number)", 
      done: false, 
      points: 300
    }
  ]
};

export const getObjectives = (tab) => {
  return objectives[tab];
};