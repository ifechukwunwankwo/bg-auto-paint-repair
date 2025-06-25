# B&G Auto Paint and Repair

A modern, responsive web application for B&G Auto Paint and Repair, a premium auto shop in Nkpor, Anambra State, Nigeria. The site showcases services, gallery, testimonials, and enables customers to book appointments or contact the business directly via WhatsApp.

---

## Features

- **Responsive Design:** Mobile-first, works seamlessly across devices.
- **Service Showcase:** Detailed descriptions of all services offered.
- **Gallery:** Dynamic gallery with images and videos, powered by Cloudinary.
- **Appointment Booking:** Secure, validated form with WhatsApp integration.
- **Contact Page:** Google Maps location, contact form, and direct WhatsApp messaging.
- **Team & Testimonials:** Meet the team and read real customer reviews.
- **Accessibility:** ARIA labels, keyboard navigation, and focus management.
- **Performance:** Lazy loading, optimized images, and smooth animations.
- **Modern Stack:** React 19, Tailwind CSS, Cloudinary, React Router, and more.

---

## Tech Stack

- **Frontend:** React 19, React Router, React Icons, React Slick, FsLightbox
- **Styling:** Tailwind CSS, custom CSS
- **Media:** Cloudinary for image/video hosting and transformations
- **Notifications:** react-hot-toast
- **Sanitization:** DOMPurify
- **Other:** Google Maps Embed, WhatsApp API

---

## Project Structure

```
client/
  ├── public/
  │   ├── index.html
  │   ├── manifest.json
  │   ├── robots.txt
  │   └── gallery-data.json
  ├── src/
  │   ├── components/
  │   │   ├── Navbar.js
  │   │   ├── Footer.js
  │   │   ├── CTA.js
  │   │   └── WhatsAppButton.js
  │   ├── constants/
  │   │   ├── aboutData.js
  │   │   └── services.js
  │   ├── pages/
  │   │   ├── Home.js
  │   │   ├── About.js
  │   │   ├── Services.js
  │   │   ├── Gallery.js
  │   │   ├── Contact.js
  │   │   ├── BookAppointment.js
  │   │   └── AppointmentConfirmation.js
  │   ├── utils/
  │   ├── App.js
  │   ├── index.js
  │   └── index.css
  ├── .env
  ├── package.json
  ├── tailwind.config.js
  └── postcss.config.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/BG_AutoPaintandRepair_Company.git
   cd BG_AutoPaintandRepair_Company/client
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `client/` directory with the following (replace with your actual values):

   ```
   REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
   REACT_APP_WHATSAPP_NUMBER=2348034000000
   ```

---

## Running the App

```sh
npm start
# or
yarn start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

- `npm start` — Runs the app in development mode.
- `npm run build` — Builds the app for production.
- `npm test` — Runs tests.

---

## Customization

- **Cloudinary:** Update your Cloudinary cloud name in `.env` for gallery and image hosting.
- **WhatsApp Number:** Set your business WhatsApp number in `.env` for direct messaging.
- **Services & Team:** Edit [`src/constants/services.js`](client/src/constants/services.js) and [`src/constants/aboutData.js`](client/src/constants/aboutData.js) to update services and team members.
- **Gallery:** Update `public/gallery-data.json` or configure Cloudinary for new images/videos.

---

## Accessibility & Best Practices

- Uses ARIA attributes and keyboard navigation.
- Form validation and sanitization with DOMPurify.
- Lazy loading for images and iframes.
- Responsive and mobile-friendly layouts.

---

## License

This project is licensed under the MIT License.

---

## Credits

- [Cloudinary](https://cloudinary.com/) for media hosting
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-slick](https://react-slick.neostack.com/)
- [FsLightbox](https://fslightbox.com/)

---

## Contact

For questions or support, please contact:

- **Phone:** +234 803 407 9987
- **Email:** chuccoanike@yahoo.com
- **Location:** 3, Kilometer, Umuoji Rd, Idemmili, Nkpor, Anambra State, Nigeria

---

> _Restoring Your Ride With Pride — B&G Auto Paint and Repair_