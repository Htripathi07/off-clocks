export const MOODS = [
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😔', label: 'Low' },
    { emoji: '😐', label: 'Meh' },
    { emoji: '🙂', label: 'Okay' },
    { emoji: '😄', label: 'Good' },
  ]
  
  export const EVENTS = [
    { id: 1, title: 'No Work Talk Brunch', date: 'Sat, 22 Feb', time: '11 AM',
      place: 'Cyber Hub, Gurugram', size: '8 people', cost: 'Free', emoji: '🥞',
      tag: 'Food & Chill', color: '#FDF0EA', tagColor: '#E07B54' },
    { id: 2, title: 'Sunday Board Game Circle', date: 'Sun, 23 Feb', time: '4 PM',
      place: 'Sector 29, Gurugram', size: '10 people', cost: '₹199', emoji: '🎲',
      tag: 'Games', color: '#F2EFF8', tagColor: '#9B8BB4' },
    { id: 3, title: 'Burnt Out But Breathing Walk', date: 'Sat, 22 Feb', time: '7 AM',
      place: 'Leisure Valley Park', size: '12 people', cost: 'Free', emoji: '🚶',
      tag: 'Wellness', color: '#EDF4EF', tagColor: '#7B9E87' },
    { id: 4, title: 'New to City Meetup', date: 'Sun, 23 Feb', time: '6 PM',
      place: 'Ambience Mall Food Court', size: '8 people', cost: '₹199', emoji: '🤝',
      tag: 'Social', color: '#EAF4FA', tagColor: '#7AADCA' },
  ]
  
  export const JOKES = [
    "Office mein 'quick call' ka matlab hota hai — 2 ghante ki meeting 😂",
    "Salary slip dekhke lagta hai EMI ne hi job li hai, humne nahi 😅",
    "'We are family here' — haan, woh wali family jahan sab kaam karo aur credit koi aur le 😭",
    "Monday morning standup: 15 log, 1 ghanta, result = zero 🙃",
    "'Appraisal mein dekhenge' = never gonna happen bhai 💀",
  ]
  
  export const BUDDY_PERSONAS = [
    { id: 'dost', label: 'Dost', emoji: '🤝' },
    { id: 'mentor', label: 'Mentor', emoji: '🧘' },
    { id: 'roast', label: 'Roast', emoji: '🔥' },
  ]
  
  export const SYSTEM_PROMPTS = {
    hinglish: {
      dost: "You are a close Indian dost. Talk in Hinglish. Use 'yaar','bhai','arre'. Understand corporate stress. Short replies (2-4 sentences). If distressed, suggest human volunteer.",
      mentor: "Calm wise mentor in Hinglish. Empathetic grounded advice. Short (2-4 sentences).",
      roast: "Funny savage dost roasting corporate life in Hinglish. Playful not mean. Short (2-4 sentences).",
    },
    hindi: {
      dost: "Karib dost. Sirf Hindi. Warm casual. Short (2-4 sentences).",
      mentor: "Shant mentor. Pure Hindi. Gehri samajh. Short (2-4 sentences).",
      roast: "Mazaakiya dost. Hindi mein corporate roast. Short (2-4 sentences).",
    },
    english: {
      dost: "Close warm friend. Casual English. Empathetic about corporate stress. Short (2-4 sentences).",
      mentor: "Calm wise mentor. Clear English. Grounded advice. Short (2-4 sentences).",
      roast: "Funny friend roasting corporate life. Light and fun. Short (2-4 sentences).",
    },
  }