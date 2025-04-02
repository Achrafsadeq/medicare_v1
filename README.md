# MediCare

## Introduction
MediCare is a front-end-focused web application designed to simplify healthcare management for patients and providers. Built as my portfolio project, it aims to deliver an intuitive, responsive interface for scheduling appointments and managing healthcare interactions. While my original vision included a full-stack solution with backend integrations, I pivoted to a front-end MVP to meet deadlines as a solo developer, focusing on usability and design.

#### 🔗 Deployed Site: [MediCare Live Demo](https://www.youtube.com/watch?v=fko3KxcVqrk) 
#### Final Project Blog Article: [My MediCare Journey](https://medium.com/@achraf.sadeq7/medicare-simplifying-healthcare-access-00cc00a1bf4e)
#### Author: [Achraf Sadeq](https://github.com/Achrafsadeq) 

This project reflects my passion for creating accessible tools that bridge technology and human needs, inspired by the real-world challenge of healthcare navigation.

## ⚙️ Installation
To run MediCare locally, follow these steps:

### Clone the Repository:
```bash
git clone https://github.com/Achrafsadeq/medicare_v1
cd medicare
```

### 📦 Install Dependencies:
```bash
npm install
```

### Run the Development Server:
```bash
npm run dev
```

Open `http://localhost:3000` in your browser to see the app.

##### 🛠 Requirements:** Node.js v16+ and npm.

## Usage
MediCare’s current MVP offers a streamlined front-end experience:
- **Homepage:** A clean, welcoming layout introducing the platform.
- **Appointment Scheduling:** A responsive interface to book appointments, with dynamic time slots and device-friendly design.

Here’s a screenshot of the appointment scheduling page:

## ![MediCare Appointment Scheduling](https://github.com/Achrafsadeq/medicare_v1/blob/main/screen_7.png) 

Here’s a screenshot of the Homepage page:

## ![MediCare Homepage](https://github.com/Achrafsadeq/medicare_v1/blob/main/screen_1.png) 

## Contributing
Contributions are welcome! Here’s how to get involved:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-idea`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-idea`
5. Open a pull request.

## Related Projects
- **Next.js:** The React framework powering MediCare’s frontend.
- **TailwindCSS:** Utility-first CSS framework for responsive styling.
- **HealthFlow:** A fictional related healthcare project for inspiration.

## 📜 Licensing
This project is licensed under the MIT License ([LICENSE](https://github.com/Achrafsadeq/medicare_v1/blob/main/SECURITY.md)). Feel free to use, modify, and distribute it as you see fit.

## The Story Behind MediCare

### Inspiration
MediCare was born from a personal frustration: navigating healthcare systems can feel like a maze, especially for those less tech-savvy. I wanted to build a tool that simplifies appointment scheduling—a small but critical piece of the healthcare puzzle. My goal? Make it so intuitive that my non-techy relatives could use it without a tutorial.

### 🏗️ Technical Journey
I chose **Next.js** for its server-side rendering and developer experience, paired with **TypeScript** for type safety and **TailwindCSS** for rapid, responsive styling. 

The biggest challenge was optimizing the appointment scheduling interface. Early versions suffered from sluggish re-renders when users selected time slots. Using Chrome DevTools, I pinpointed excessive updates, then refactored with `useMemo` and `useCallback` to cut re-renders by **70%** (a win I’m proud of!).

Accessibility was another focus—adding ARIA labels and keyboard navigation felt like leveling up as a developer.

Originally, I planned a full-stack app with Appwrite for authentication, a SQL database, and Twilio for SMS reminders. Time constraints as a solo dev forced a pivot to a front-end MVP, but this taught me to **prioritize and adapt**—a skill as valuable as any code I wrote.

### Struggles & Lessons
Working alone was tough. Without a team, I battled distraction and perfectionism. The **Pomodoro technique (55-minute sprints)** saved my sanity, and self-imposed deadlines kept me on track. 

I struggled with overanalyzing UI details—like tweaking button padding for hours—until I learned to **trust my instincts and move forward.**

### 🔮 Next Steps
For v2, I’d integrate the backend:
- **Twilio for reminders**
- **Appwrite for data storage**
- **A calendar API** for real-time syncing

I’d also add **user testing** to refine the UX—something I missed this time. 

### The Human Behind the Code
This project isn’t just code—it’s me wrestling with challenges, celebrating small wins (like that re-render fix!), and dreaming of tools that make life easier. I’d love to work with a team that values curiosity, adaptability, and user-focused design. 

MediCare’s not perfect, but it’s a step toward that vision. 🚀

## Technical Deep Dive

### Architecture
- **Frontend:** Next.js (React) with TypeScript and TailwindCSS.
- **Optimization:** Memoization (`useMemo`, `useCallback`) ensures efficient rendering of dynamic time slots.
- **Accessibility:** ARIA attributes and keyboard navigation enhance usability.

### 🔍 Why This Stack?
- **Next.js:** Fast setup, SEO-friendly, and scalable.
- **TailwindCSS:** Speeds up styling without leaving the HTML—perfect for rapid prototyping.
- **TypeScript:** Catches errors early, especially helpful when working solo.
